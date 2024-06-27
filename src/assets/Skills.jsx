import React, { useState, useRef, useMemo, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';
import Logo from './logo';

const SkillDumbbell = ({ nodes, materials, position, rotation, scale, canInteract, level, confidenceLevel, svgPath }) => {
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef();

  const handlePointerOver = (event) => {
    if (canInteract) {
      event.stopPropagation();
      setHovered(true);
    }
  };

  const handlePointerOut = (event) => {
    if (canInteract) {
      event.stopPropagation();
      setHovered(false);
    }
  };

  const { progress } = useSpring({
    progress: hovered ? confidenceLevel / 100 : 0,
    config: { mass: 1, tension: 280, friction: 60 }
  });

  const shaderMaterial = useMemo(() => {
    let color2;
    switch (level) {
      case 'Large':
        color2 = new THREE.Color('limegreen');
        break;
      case 'Medium':
        color2 = new THREE.Color('yellow');
        break;
      case 'Small':
        color2 = new THREE.Color('red');
        break;
      default:
        color2 = new THREE.Color('limegreen');
    }

    return new THREE.ShaderMaterial({
      uniforms: {
        progress: { value: 0 },
        color1: { value: new THREE.Color('gray') },
        color2: { value: color2 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float progress;
        uniform vec3 color1;
        uniform vec3 color2;
        varying vec2 vUv;
        void main() {
          vec3 color = mix(color1, color2, step(vUv.x, progress));
          gl_FragColor = vec4(color, 1.0);
        }
      `,
    });
  }, [level]);

  let dumbbellMesh;
  switch (level) {
    case 'Large':
      dumbbellMesh = (
        <mesh
          name="large_skill_dumbbell001"
          geometry={nodes.large_skill_dumbbell001.geometry}
          material={materials["green rubber"]}
        />
      );
      break;
    case 'Medium':
      dumbbellMesh = (
        <mesh
          name="medium_skill_dumbbell001"
          geometry={nodes.medium_skill_dumbbell001.geometry}
          material={materials["yellow rubber"]}
        />
      );
      break;
    case 'Small':
      dumbbellMesh = (
        <mesh
          name="small_skill_db001"
          geometry={nodes.small_skill_db001.geometry}
          material={materials["red rubber"]}
        />
      );
      break;
    default:
      console.warn(`Unknown level: ${level}. Using default dumbbell.`);
      dumbbellMesh = (
        <mesh
          name="default_dumbbell"
          geometry={nodes.large_skill_dumbbell001.geometry}
          material={materials.rubber}
        />
      );
  }

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      {dumbbellMesh}
      <animated.mesh
        position={[.5, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
        visible={hovered}
      >
        <planeGeometry args={[1, 0.15]} />
        <primitive object={shaderMaterial} attach="material" />
        <animated.primitive object={shaderMaterial} attach="material" uniforms-progress-value={progress} />
      </animated.mesh>
      <Logo svgPath={svgPath} scale={scale} position={[0, -.25, 0]} />
    </group>
  );
};

export default SkillDumbbell;
