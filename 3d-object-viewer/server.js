const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const AdmZip = require("adm-zip");

const app = express();
const port = 5003;

// CORS middleware
app.use(
	cors({
		origin: "http://localhost:3000",
	})
);
app.use(express.json());

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

// Route for uploading ZIP files
app.post("/upload", upload.single("file"), (req, res) => {
	console.log("Received file upload request");

	if (!req.file) {
		console.log("No file uploaded.");
		return res.status(400).json({ message: "No file uploaded." });
	}

	const zipPath = path.join(__dirname, "uploads", req.file.filename);
	const zip = new AdmZip(zipPath);

	try {
		// Extract files to the uploads folder
		console.log("Extracting files...");
		zip.extractAllTo(path.join(__dirname, "uploads"), true);
		fs.unlinkSync(zipPath); // Verwijder het ZIP-bestand na extractie

		// Vind de .gltf-bestanden in de geëxtraheerde bestanden
		const extractedFiles = fs.readdirSync(path.join(__dirname, "uploads"));
		const gltfFileNames = extractedFiles.filter((file) => file.endsWith(".gltf"));

		console.log("Extracted GLTF files:", gltfFileNames);

		// Beantwoord met de lijst van .gltf-bestanden
		res.json({ message: "Files uploaded and extracted successfully", files: gltfFileNames });
	} catch (error) {
		console.error("Error extracting ZIP file:", error);
		res.status(500).json({ message: "Error extracting ZIP file.", error: error.message });
	}
});

// Serve the uploads folder
app.use("/uploads", express.static("uploads"));

// Start the server
app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});
