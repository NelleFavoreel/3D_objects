import React, { useState } from "react";

function UploadComponent({ onUpload }) {
	const [file, setFile] = useState(null);

	const handleUpload = async () => {
		if (!file) return;
		const formData = new FormData();
		formData.append("file", file); // 'file' moet hetzelfde zijn als in de backend

		const response = await fetch("http://localhost:5003/upload", {
			method: "POST",
			body: formData,
		});

		if (response.ok) {
			const data = await response.json();
			console.log(data); // Controleer de respons van de server

			// Geef het pad van het bestand door naar de parent component via onUpload
			onUpload(data.filePath); // Geef het pad van het bestand door
		} else {
			console.error("Upload failed:", response.statusText);
		}
	};

	return (
		<div>
			<input type="file" accept=".zip" onChange={(e) => setFile(e.target.files[0])} />
			<button onClick={handleUpload}>Upload 3D Object</button>
		</div>
	);
}

export default UploadComponent;
