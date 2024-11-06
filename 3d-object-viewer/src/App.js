// src/App.js
import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UploadComponent from "./component/UploadComponent"; // Ensure this path is correct
import ModelViewer from "./component/ModelViewer"; // Ensure this path is correct
import ModelDetails from "./component/ModelDetails"; // Ensure this path is correct

function App() {
	const [uploadedFilePath, setUploadedFilePath] = useState(null);

	const handleUpload = (filePath) => {
		setUploadedFilePath(filePath);
	};

	return (
		<Router>
			<div className="App">
				<h1>3D Object Uploader</h1>
				<UploadComponent onUpload={handleUpload} />
				{uploadedFilePath && (
					<>
						<p>Bestand geüpload naar: {uploadedFilePath}</p>
						<ModelViewer modelPath={`http://localhost:5003/uploads/${uploadedFilePath}?t=${Date.now()}`} />
					</>
				)}
			</div>
			<Routes>
				<Route path="/" element={<div></div>} />
				<Route path="/ModelDetails" element={<ModelDetails />} />
			</Routes>
		</Router>
	);
}

export default App;
