// src/component/ModelViewer.js
import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "@react-three/fiber";

function ModelViewer({ modelPath }) {
	const model = useLoader(GLTFLoader, modelPath);

	return (
		<Canvas>
			<ambientLight intensity={0.5} />
			<pointLight position={[10, 10, 10]} />
			<OrbitControls />
			<primitive object={model.scene} />
		</Canvas>
	);
}

export default ModelViewer;
