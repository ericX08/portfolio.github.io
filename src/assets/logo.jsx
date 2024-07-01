import React, { useMemo } from 'react';
import { useLoader, extend } from '@react-three/fiber';
import * as THREE from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';

extend({ ExtrudeGeometry: THREE.ExtrudeGeometry });

const Logo = ({ svgPath, scale, rotation, tilt, fillColor, strokeColor, ...props }) => {
  const svgData = useLoader(SVGLoader, svgPath);
  
  const materials = useMemo(() => ({
    fill: new THREE.MeshBasicMaterial({ color: fillColor }),
    stroke: new THREE.LineBasicMaterial({ color: strokeColor })
  }), [fillColor, strokeColor]);

  const svgGroup = useMemo(() => {
    const group = new THREE.Group();
    const updateMap = [];

    svgData.paths.forEach((path) => {
      const shapes = SVGLoader.createShapes(path);
      shapes.forEach((shape) => {
        const meshGeometry = new THREE.ExtrudeGeometry(shape, {
          depth: 1,
          bevelEnabled: false,
        });
        const linesGeometry = new THREE.EdgesGeometry(meshGeometry);
        const mesh = new THREE.Mesh(meshGeometry, materials.fill);
        const lines = new THREE.LineSegments(linesGeometry, materials.stroke);

        mesh.rotation.x = tilt;
        lines.rotation.x = tilt;

        updateMap.push({ shape, mesh, lines });
        group.add(mesh, lines);
      });
    });

    const box = new THREE.Box3().setFromObject(group);
    const size = box.getSize(new THREE.Vector3());
    const yOffset = size.y / -2;
    const xOffset = size.x / -2;

    group.children.forEach((item) => {
      item.position.x = xOffset;
      item.position.y = yOffset;
    });
    
    group.rotation.set(rotation.x, rotation.y, rotation.z);

    return group;
  }, [svgData, tilt, rotation, materials]);

  const getCurrentSettings = () => ({
    rotation,
    tilt,
    fillColor,
    strokeColor
  });

  return (
    <primitive 
      object={svgGroup} 
      scale={scale} 
      {...props} 
      userData={{ getCurrentSettings }}
    />
  );
};

export default Logo;