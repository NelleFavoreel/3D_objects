const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const AdmZip = require("adm-zip");
const unzipper = require("unzipper");
const app = express();
const port = 5003;

// CORS middleware
app.use(
	cors({
		origin: "http://localhost:3000", // Zorg ervoor dat je frontend goed is ingesteld
	})
);
app.use(express.json());

// Serve the uploads folder for static files (zorg dat bestanden toegankelijk zijn)
app.use("/uploads", express.static("uploads"));

// Set up multer for file uploads
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "uploads/"); // Zorg ervoor dat dit pad klopt met je directory
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + "-" + file.originalname); // Unieke bestandsnaam
	},
});
const upload = multer({ storage: storage });

// Functie om de uploads-map leeg te maken voordat je een nieuw bestand uploadt
const clearUploadsFolder = () => {
	const directory = path.join(__dirname, "uploads");

	fs.readdir(directory, (err, files) => {
		if (err) {
			console.error(`Error reading directory: ${directory}`, err);
			throw err;
		}

		files.forEach((file) => {
			const filePath = path.join(directory, file);

			fs.stat(filePath, (err, stats) => {
				if (err) {
					console.log(`Error checking stats for ${filePath}: ${err}`);
					return;
				}

				if (stats.isFile()) {
					// Verwijder bestand als het bestaat
					if (fs.existsSync(filePath)) {
						fs.unlink(filePath, (err) => {
							if (err) {
								console.log(`Error deleting file: ${filePath}`, err);
								throw err;
							} else {
								console.log(`File deleted: ${filePath}`);
							}
						});
					} else {
						console.log(`File not found for deletion: ${filePath}`);
					}
				} else if (stats.isDirectory()) {
					// Verwijder directory als het bestaat (recursief)
					if (fs.existsSync(filePath)) {
						fs.rm(filePath, { recursive: true, force: true }, (err) => {
							if (err) {
								console.log(`Error deleting directory: ${filePath}`, err);
								throw err;
							} else {
								console.log(`Directory deleted: ${filePath}`);
							}
						});
					} else {
						console.log(`Directory not found for deletion: ${filePath}`);
					}
				}
			});
		});
	});
};

// Route voor het uploaden van ZIP-bestanden
// Verander je server upload route zodat je de juiste bestandsnaam terugstuurt:
app.post("/upload", upload.single("file"), async (req, res) => {
	try {
		const file = req.file;
		if (!file) {
			return res.status(400).send("No file uploaded.");
		}
		console.log("File uploaded:", file.originalname);

		// Geef het pad van het bestand terug naar de frontend
		res.json({
			message: "Bestand succesvol geüpload",
			filePath: file.filename, // Dit geeft het pad terug
		});
	} catch (err) {
		console.error("Error uploading or extracting file:", err);
		res.status(500).send("Error uploading or extracting file");
	}
});

// Start de server
app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});
