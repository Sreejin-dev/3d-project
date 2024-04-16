"use client"
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const ModelViewer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const loaderRef = useRef<GLTFLoader | null>(null);
  const modelRef = useRef<THREE.Object3D>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const isDraggingRef = useRef<boolean>(false);

  useEffect(() => {
    let scene, camera, renderer;

    if (!containerRef.current) return;

    const container = containerRef.current;

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(
      5,
      container.offsetWidth / container.offsetHeight,
      0.1,
      1000
    );
    camera.position.z = 10;
    cameraRef.current = camera;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const loader = new GLTFLoader();
    loader.load(
      "/sneakers_seen/scene.gltf",
      (gltf) => {
        modelRef.current = gltf.scene;
        modelRef.current.rotation.x = Math.PI / 5; // Initial rotation around the x-axis
        modelRef.current.rotation.y = Math.PI / 3; // Initial rotation around the y-axis
        scene.add(modelRef.current);
      },
      undefined,
      (error) => {
        console.error(error);
      }
    );
    loaderRef.current = loader;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 1, 0);
    scene.add(directionalLight);

    const handleMouseDown = (event: MouseEvent) => {
      isDraggingRef.current = true;
      mouseRef.current.x = event.clientX;
      mouseRef.current.y = event.clientY;
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!isDraggingRef.current || !modelRef.current) return;

      const deltaX = event.clientX - mouseRef.current.x;
      const deltaY = event.clientY - mouseRef.current.y;

      modelRef.current.rotation.y += deltaX * 0.01;
      modelRef.current.rotation.x += deltaY * 0.01;

      mouseRef.current.x = event.clientX;
      mouseRef.current.y = event.clientY;
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    container.addEventListener("mousedown", handleMouseDown);
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseup", handleMouseUp);

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      container.removeEventListener("mousedown", handleMouseDown);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseup", handleMouseUp);

      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      loaderRef.current = null;
    };
  }, []);

  return <div ref={containerRef} style={{ width: "100%", height: "80%" }} />;
};

export default ModelViewer;
