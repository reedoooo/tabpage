import React, { useRef } from 'react';
import { Canvas, useFrame } from 'react-three-fiber';
import { Sphere } from 'three';

const Rasengan = () => {
  const sphereRef = useRef();

  useFrame(() => {
    sphereRef.current.rotation.x += 0.01;
    sphereRef.current.rotation.y += 0.01;
  });

  return (
    <mesh>
      <Sphere ref={sphereRef}>
        <meshStandardMaterial color="#FF0000" />
      </Sphere>
    </mesh>
  );
};

export default Rasengan;
