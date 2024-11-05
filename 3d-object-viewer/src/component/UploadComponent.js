import React, { useState } from "react";

function UploadComponent({ onUpload }) {
	const [file, setFile] = useState(null);

	const handleUpload = async () => {
		if (!file) return;
		const formData = new FormData();
		formData.append("file", file);

		const response = await fetch("http://localhost:5003/upload", {
			method: "POST",
			body: formData,
		});

		if (response.ok) {
			const data = await response.json();
			// Als er meerdere bestanden zijn, selecteer het eerste bestand als standaard
			if (data.files && data.files.length > 0) {
				onUpload(data.files[0]); // Stuur het eerste .gltf-bestand naar de viewer
			} else {
				console.error("No GLTF files found in the uploaded ZIP.");
			}
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
