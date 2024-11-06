import React, { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const ModelViewer = ({ modelPath }) => {
	const model = useLoader(GLTFLoader, modelPath);

	useEffect(() => {
		// Laad model opnieuw als modelPath verandert
	}, [modelPath]);

	return (
		<Canvas>
			<ambientLight intensity={0.9} />
			<pointLight position={[10, 10, 10]} />
			<primitive object={model.scene} scale={1.2} />
			<OrbitControls />
		</Canvas>
	);
};

export default ModelViewer;
