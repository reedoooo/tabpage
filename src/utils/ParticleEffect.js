import React, { useEffect, useRef } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { WebGLRenderer } from "three";
import * as THREE from "three";

const ParticleEffect = () => {
  const canvasRef = useRef(null);
  const webglCanvasRef = useRef(null);
  const camera = useRef(null);
  const scene = useRef(null);
  const renderer = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (camera.current) {
        camera.current.aspect = canvas.width / canvas.height;
        camera.current.updateProjectionMatrix(); // Update the camera's projection matrix
        renderer.current.setSize(canvas.width, canvas.height); // Update the renderer's size
      }
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const particles = [];

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.z = Math.random() * 200 - 100;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = `hsl(${Math.random() * 360}, 70%, 50%)`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        this.speedX += (Math.random() - 0.5) * 0.2;
        this.speedY += (Math.random() - 0.5) * 0.2;

        const maxSpeed = 3;
        this.speedX = Math.max(-maxSpeed, Math.min(this.speedX, maxSpeed));
        this.speedY = Math.max(-maxSpeed, Math.min(this.speedY, maxSpeed));
      }

      draw() {
        const perspective = 600;
        const scale = perspective / (perspective + this.z);
        const xPos = this.x * scale + canvas.width / 2;
        const yPos = this.y * scale + canvas.height / 2;
        const size = this.size * scale;

        context.fillStyle = this.color;
        context.beginPath();
        context.arc(xPos, yPos, size / 2, 0, Math.PI * 2);
        context.closePath();
        context.fill();
      }
    }

    const createParticles = () => {
      for (let i = 0; i < 300; i++) {
        particles.push(new Particle());
      }
    };

    const animateParticles = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }

      requestAnimationFrame(animateParticles);
    };

    createParticles();
    animateParticles();
    return () => {
        window.removeEventListener("resize", resizeCanvas);
        particles.length = 0;
      };
    }, []);
  

    useEffect(() => {
        const webglCanvas = webglCanvasRef.current;
      
        // Initialize Three.js scene
        scene.current = new THREE.Scene();
        camera.current = new THREE.PerspectiveCamera(
          75,
          window.innerWidth / window.innerHeight,
          0.1,
          1000
        );
        camera.current.position.z = 5;
      
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        scene.current.add(cube);
      
        renderer.current = new WebGLRenderer({ canvas: webglCanvas });
        renderer.current.setSize(window.innerWidth, window.innerHeight);
      
        const animateThree = () => {
          requestAnimationFrame(animateThree);
      
          cube.rotation.x += 0.01;
          cube.rotation.y += 0.01;
      
          renderer.current.render(scene.current, camera.current);
        };
      
        animateThree();
      
        return () => {
          // Clean up WebGL resources
          renderer.current.dispose();
        };
      }, []);
  
    useEffect(() => {
        const webglCanvas = webglCanvasRef.current;
        const controls = new OrbitControls(camera.current, webglCanvas);
        controls.enableRotate = true;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.5;
        controls.update();
    
        return () => {
          controls.dispose();
        };
      }, []);

      const canvasStyle = {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -5, // Change this value to a positive value
        transform: "translateZ(0)",
      };
      
      const backgroundStyle = {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -5, // Change this value to a lower value
      };
      

  return (
    <>
      <canvas ref={canvasRef} style={canvasStyle} />
      <canvas ref={webglCanvasRef} style={canvasStyle} />
      <div style={backgroundStyle} />
    </>
  );
};

export default ParticleEffect;
