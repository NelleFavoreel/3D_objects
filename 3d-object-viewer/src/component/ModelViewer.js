import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const ModelViewer = ({ modelPath }) => {
	const model = useLoader(GLTFLoader, modelPath);

	return (
		<Canvas>
			<ambientLight intensity={0.5} />
			<pointLight position={[10, 10, 10]} />
			<primitive object={model.scene} />
			<OrbitControls />
		</Canvas>
	);
};

export default ModelViewer;
