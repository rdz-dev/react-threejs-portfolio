import React, { useRef, useEffect } from 'react';
import styled from 'styled-components/macro';
import { WebGLRenderer, Scene, PerspectiveCamera, PointLight, AmbientLight, DirectionalLight, TextureLoader, CameraHelper } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import caesarModelPath from 'assets/caesar.glb';
import uvTexturePath from 'assets/uv.jpg';
import ProjectedMaterial from 'utils/ProjectedMaterial';

export default function Caesar(props) {
  const canvasRef = useRef();
  const rendererRef = useRef();
  const sceneRef = useRef();
  const cameraRef = useRef();
  const animationRef = useRef();
  const controlsRef = useRef();

  useEffect(() => {
    const modelLoader = new GLTFLoader();
    const textureLoader = new TextureLoader();
    rendererRef.current = new WebGLRenderer({ canvas: canvasRef.current, alpha: true, antialias: true });
    sceneRef.current = new Scene();
    cameraRef.current = new PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 800);
    const ambientLight = new AmbientLight(0xFFFFFF, 0.8);
    const dirLight = new DirectionalLight(0xFFFFFF, 0.8);
    dirLight.position.set(30, 20, 32);
    sceneRef.current.add(ambientLight);
    sceneRef.current.add(dirLight);
    cameraRef.current.position.z = 24;
    rendererRef.current.setClearColor(0x000000, 0);
    rendererRef.current.setPixelRatio(8);
    rendererRef.current.gammaOutput = true;
    rendererRef.current.gammaFactor = 2.2;

    controlsRef.current = new OrbitControls(cameraRef.current, canvasRef.current);
    controlsRef.current.enableKeys = false;
    controlsRef.current.enablePan = false;
    controlsRef.current.enableZoom = false;
    controlsRef.current.enableDamping = true;
    controlsRef.current.enableRotate = true;
    controlsRef.current.autoRotate = true;
    controlsRef.current.autoRotateSpeed = -0.5;

    const textureCamera = new PerspectiveCamera(45, 1, 0.01, 6);
    textureCamera.position.set(0, 0, 4);
    textureCamera.lookAt(0, 0, 0);
    const helper = new CameraHelper(textureCamera);
    sceneRef.current.add(helper);
    const uvTexture = textureLoader.load(uvTexturePath);
    const material = new ProjectedMaterial({
      camera: cameraRef.current,
      texture: uvTexture,
      color: '#37E140',
    });

    modelLoader.load(caesarModelPath, model => {
      sceneRef.current.add(model.scene);
      model.scene.position.y = -8;
      console.log(model)
      render();
    });

    const render = () => {
      animationRef.current = requestAnimationFrame(render);
      controlsRef.current.update();
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    };

    return () => {
      rendererRef.current.dispose();
      rendererRef.current.forceContextLoss();
    };
  }, []);

  return (
    <ThreeCanvas ref={canvasRef} />
  );
}

const ThreeCanvas = styled.canvas`
  width: 100vw;
  height: 100vh;
`;
