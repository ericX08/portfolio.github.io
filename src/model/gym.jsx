import React, { useRef, useEffect, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { a } from "@react-spring/three";
import * as THREE from "three";
import gsap from "gsap";
import gymScene from "./Gym.glb";
import Locker from "../assets/locker";
import SkillDumbbell from "../assets/Skills";

const Hitbox = ({ position, size, onClick }) => {
  return (
    <mesh position={position} onClick={onClick}>
      <boxGeometry args={size} />
      <meshBasicMaterial opacity={0} transparent />
    </mesh>
  );
};

const Gym = ({ onCameraChange, currentView, onPopupTrigger, playAnimation  }) => {
  const gymRef = useRef();
  const { nodes, materials } = useGLTF(gymScene);
  const leftDoorRef = useRef();
  const rightDoorRef = useRef();
  const [showHitboxes, setShowHitboxes] = useState(false);
  const characterRef = useRef();
  const barbellRef = useRef();

  useEffect(() => {
    if (playAnimation && characterRef.current) { 
      const bones = {
        upperArmL: characterRef.current.getObjectByName("upper_armL"),
        upperArmR: characterRef.current.getObjectByName("upper_armR"),
        forearmL: characterRef.current.getObjectByName("forearmL"),
        forearmR: characterRef.current.getObjectByName("forearmR"),
        wristL: characterRef.current.getObjectByName("handL"),
        wristR: characterRef.current.getObjectByName("handR"),
      };

      if (bones.upperArmL && bones.upperArmR && bones.forearmL && bones.forearmR) {
        gsap.set(bones.forearmR.rotation, { x: 0, y: 0, z: 0 });
        gsap.set(bones.upperArmR.rotation, { x: 0, y: 0, z: 2.13 });
        gsap.set(bones.forearmL.rotation, { x: 0, y: 0, z: 0});
        gsap.set(bones.upperArmL.rotation, { x: 0, y: 0, z: -2.13});
        gsap.set(barbellRef.current.position, {x: -8.7, y: 1.36, z: -12.25});
        gsap.set(bones.wristL.rotation, { x: THREE.MathUtils.degToRad(-80), y: THREE.MathUtils.degToRad(0), z: 2.6});
        gsap.set(bones.wristR.rotation, { x: THREE.MathUtils.degToRad(-80), y: THREE.MathUtils.degToRad(0), z: -2.6});

        const timeline = gsap.timeline();
        
        timeline.to(bones.upperArmL.rotation, { 
          x: 0, y: 0, z: -.5, duration: 0.75,
          ease: "power2.out",
          onUpdate: () => bones.upperArmL.quaternion.normalize()
        }, 0);
        timeline.to(bones.upperArmR.rotation, { 
          x: 0, y: 0, z: .5, duration: 0.75,
          ease: "power2.out",
          onUpdate: () => bones.upperArmR.quaternion.normalize()
        }, 0);
        timeline.to(bones.forearmL.rotation, { 
          x: 0, y: 0, z: -1.6, duration: 0.75,
          ease: "power2.out",
          onUpdate: () => bones.forearmL.quaternion.normalize()
        }, 0);
        timeline.to(bones.forearmR.rotation, { 
          x: 0, y: 0, z: 1.6, duration: 0.75,
          ease: "power2.out",
          onUpdate: () => bones.forearmR.quaternion.normalize()
        }, 0);
        timeline.to(barbellRef.current.position, {
          x: -8.7, y: 1.135, z: -12.25, duration: 0.75,
          ease: "power2.out",
        }, 0.05);

        timeline.to(bones.upperArmL.rotation, { 
          x: 0, y: 0, z: -2.13, duration: 0.75,
          onUpdate: () => bones.upperArmL.quaternion.normalize()
        }, 0.75);
        timeline.to(bones.upperArmR.rotation, { 
          x: 0, y: 0, z: 2.13, duration: 0.75,
          onUpdate: () => bones.upperArmR.quaternion.normalize()
        }, 0.75);
        timeline.to(bones.forearmL.rotation, { 
          x: 0, y: .1, z: 0, duration: 0.75,
          onUpdate: () => bones.forearmL.quaternion.normalize()
        }, 0.75);
        timeline.to(bones.forearmR.rotation, { 
          x: 0, y: -.1, z: 0, duration: 0.75,
          onUpdate: () => bones.forearmR.quaternion.normalize()
        }, 0.75);
        timeline.to(barbellRef.current.position, {
          x: -8.7, y: 1.36, z: -12.25, duration: 0.45,
        }, 0.8);

      } else {
        console.error("Some bones were not found");
      }
    }
  }, [playAnimation]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onCameraChange("reception");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (currentView === "reception") {
      gsap.to(leftDoorRef.current.rotation, { z: Math.PI / 2, duration: 1 });
      gsap.to(rightDoorRef.current.rotation, { z: -Math.PI / 2, duration: 1 });
      setShowHitboxes(true);
    } else if (currentView === "about") {
      setShowHitboxes(true);
    } else {
      setShowHitboxes(false);
    }
  }, [currentView]);

  return (
    <>
      <a.group ref={gymRef}>
        <group name="Scene">
          <group
            name="Menu"
            position={[2.01, 1.41, -10.58]}
            rotation={[Math.PI, -0.401, Math.PI]}
            scale={0.5}
          >
            <mesh
              name="Cube003"
              geometry={nodes.Cube003.geometry}
              material={materials.menu}
            />
            <mesh
              name="Cube003_1"
              geometry={nodes.Cube003_1.geometry}
              material={materials.rubber}
            />
            <mesh
              name="Cube003_2"
              geometry={nodes.Cube003_2.geometry}
              material={materials.Material}
            />
            {showHitboxes && (
              <>
                <Hitbox
                  position={[-0.375, 0.3, 0.1]}
                  size={[0.75, 0.2, 0.1]}
                  onClick={() => onCameraChange("projects")}
                />
                <Hitbox
                  position={[-0.25, 0.1, 0.1]}
                  size={[1, 0.2, 0.1]}
                  onClick={() => onCameraChange("about")}
                />
                <Hitbox
                  position={[-0.5, -0.1, 0.1]}
                  size={[0.5, 0.2, 0.1]}
                  onClick={() => onCameraChange("skills")}
                />
                <Hitbox
                  position={[-0.25, -0.3, 0.1]}
                  size={[1, 0.2, 0.1]}
                  onClick={() => onCameraChange("game")}
                />
              </>
            )}
          </group>
          <group ref={characterRef} name="character_3" position={[-8.7, 0.9, -10.726]} >
            <group name="character3">
              <skinnedMesh
                name="character3_1" //torso
                geometry={nodes.character3_1.geometry}
                material={materials["red rubber"]}
                skeleton={nodes.character3_1.skeleton}
              />
              <skinnedMesh
                name="character3_2" //legs
                geometry={nodes.character3_2.geometry}
                material={materials.rubber}
                skeleton={nodes.character3_2.skeleton}
              />
              <skinnedMesh
                name="character3_3" //arms and legs
                geometry={nodes.character3_3.geometry}
                material={materials.skin}
                skeleton={nodes.character3_3.skeleton}
              />
              <skinnedMesh
                name="character3_4"
                geometry={nodes.character3_4.geometry}
                material={materials.sock}
                skeleton={nodes.character3_4.skeleton}
              />
            </group>
            <primitive object={nodes.Bone} />
          </group>
          <group ref={barbellRef} name="barbell_game" position={[-8.7, 1.664, -12.5]} rotation={[Math.PI / 2, 0, 0]}>
            <mesh
              name="gym_model_079001"
              castShadow
              receiveShadow
              geometry={nodes.gym_model_079001.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_079001_1"
              castShadow
              receiveShadow
              geometry={nodes.gym_model_079001_1.geometry}
              material={materials.weights}
            />
          </group>
          <Locker
            nodes={nodes}
            materials={materials}
            position={[3.37, 0.1, 9.08]}
            rotation={[Math.PI / 2, 0, 0]}
            onClick={() => onPopupTrigger("interactivePortfolio")}
            canInteract={true}
          />
          <Locker
            nodes={nodes}
            materials={materials}
            position={[4.62, 0.1, 9.08]}
            rotation={[Math.PI / 2, 0, 0]}
            onClick={() => onPopupTrigger("ecommerceIntegration")}
            canInteract={true}
          />
          <Locker
            nodes={nodes}
            materials={materials}
            position={[5.87, 0.1, 9.08]}
            rotation={[Math.PI / 2, 0, 0]}
            onClick={() => onPopupTrigger("netMauiApp")}
            canInteract={true}
          />
          <Locker
            nodes={nodes}
            materials={materials}
            position={[7.12, 0.1, 9.08]}
            rotation={[Math.PI / 2, 0, 0]}
            onClick={() => onPopupTrigger("securityPlayground")}
            canInteract={true}
          />
          <Locker
            nodes={nodes}
            materials={materials}
            position={[8.37, 0.1, 9.08]}
            rotation={[Math.PI / 2, 0, 0]}
            onClick={() => onPopupTrigger("upcomingProject")}
            canInteract={true}
          />
          <Locker
            nodes={nodes}
            materials={materials}
            position={[9.62, 0.1, 9.08]}
            rotation={[Math.PI / 2, 0, 0]}
            onClick={() => console.log("Locker 5 clicked")}
            canInteract={false}
          />
          <Locker
            nodes={nodes}
            materials={materials}
            position={[10.87, 0.1, 9.08]}
            rotation={[Math.PI / 2, 0, 0]}
            onClick={() => console.log("Locker 6 clicked")}
            canInteract={false}
          />
          <Locker
            nodes={nodes}
            materials={materials}
            position={[12.12, 0.1, 9.08]}
            rotation={[Math.PI / 2, 0, 0]}
            onClick={() => console.log("Locker 7 clicked")}
            canInteract={false}
          />
          <Locker
            nodes={nodes}
            materials={materials}
            position={[13.37, 0.1, 9.08]}
            rotation={[Math.PI / 2, 0, 0]}
            onClick={() => console.log("Locker 8 clicked")}
            canInteract={false}
          />
          <group
            name="treadmills005"
            position={[9.7, 0.11, -12.5]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh
              name="gym_model_122005"
              geometry={nodes.gym_model_122005.geometry}
              material={materials["plastic(grey)"]}
            />
            <mesh
              name="gym_model_122005_1"
              geometry={nodes.gym_model_122005_1.geometry}
              material={materials["rubber-grey"]}
            />
            <mesh
              name="gym_model_122005_2"
              geometry={nodes.gym_model_122005_2.geometry}
              material={materials.rubber}
            />
            <mesh
              name="gym_model_122005_3"
              geometry={nodes.gym_model_122005_3.geometry}
              material={materials.screen}
            />
            {currentView === "about" && (
              <Hitbox
                position={[0, -0.5, -1.1]}
                size={[0.25, 0.15, 0.25]}
                onClick={() => onPopupTrigger("aboutMe")}
              />
            )}
          </group>
          <group
            name="treadmills002"
            position={[8.1, 0.11, -12.5]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh
              name="gym_model_122006"
              geometry={nodes.gym_model_122006.geometry}
              material={materials["plastic(grey)"]}
            />
            <mesh
              name="gym_model_122006_1"
              geometry={nodes.gym_model_122006_1.geometry}
              material={materials["rubber-grey"]}
            />
            <mesh
              name="gym_model_122006_2"
              geometry={nodes.gym_model_122006_2.geometry}
              material={materials.rubber}
            />
            <mesh
              name="gym_model_122006_3"
              geometry={nodes.gym_model_122006_3.geometry}
              material={materials.screen}
            />
            {currentView === "about" && (
              <Hitbox
                position={[0, -0.5, -1.1]}
                size={[0.25, 0.15, 0.25]}
                onClick={() => onPopupTrigger("experience")}
              />
            )}
          </group>
          <group
            name="treadmills004"
            position={[11.3, 0.11, -12.5]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh
              name="gym_model_122008"
              geometry={nodes.gym_model_122008.geometry}
              material={materials["plastic(grey)"]}
            />
            <mesh
              name="gym_model_122008_1"
              geometry={nodes.gym_model_122008_1.geometry}
              material={materials["rubber-grey"]}
            />
            <mesh
              name="gym_model_122008_2"
              geometry={nodes.gym_model_122008_2.geometry}
              material={materials.rubber}
            />
            <mesh
              name="gym_model_122008_3"
              geometry={nodes.gym_model_122008_3.geometry}
              material={materials.screen}
            />
            {currentView === "about" && (
              <Hitbox
                position={[0, -0.5, -1.1]}
                size={[0.25, 0.15, 0.25]}
                onClick={() => onPopupTrigger("education")}
              />
            )}
          </group>
          <SkillDumbbell
            nodes={nodes}
            materials={materials}
            position={[-13.6, 1.17, 1.1]}
            rotation={[0, 0, 1.204]}
            scale={0.003}
            canInteract={true}
            level="Large"
            confidenceLevel = {75}
            svgPath="/icons/javascript.svg"
          />
          <SkillDumbbell
            nodes={nodes}
            materials={materials}
            position={[-13.6, 0.8, 1.1]}
            rotation={[0, 0, 1.204]}
            scale={0.004}
            canInteract={true}
            level="Medium"
            confidenceLevel = {50}
            svgPath="/icons/blender-original.svg"
          />
          <mesh
            name="small_skill_db"
            geometry={nodes.small_skill_db.geometry}
            material={materials["yellow rubber"]}
            position={[-13.6, 0.48, 1.1]}
            rotation={[0, 0, 1.204]}
          />
          <mesh
            name="large_skill_dumbbell001"
            geometry={nodes.large_skill_dumbbell001.geometry}
            material={materials.rubber}
            position={[-13.6, 1.17, 0.8]}
            rotation={[0, 0, 1.204]}
          />
          <mesh
            name="large_skill_dumbbell002"
            geometry={nodes.large_skill_dumbbell002.geometry}
            material={materials.rubber}
            position={[-13.6, 1.17, 0.5]}
            rotation={[0, 0, 1.204]}
          />
          <mesh
            name="medium_skill_dumbbell001"
            geometry={nodes.medium_skill_dumbbell001.geometry}
            material={materials["red rubber"]}
            position={[-13.6, 0.8, 0.8]}
            rotation={[0, 0, 1.204]}
          />
          <mesh
            name="medium_skill_dumbbell002"
            geometry={nodes.medium_skill_dumbbell002.geometry}
            material={materials["red rubber"]}
            position={[-13.6, 0.8, 0.5]}
            rotation={[0, 0, 1.204]}
          />
          <mesh
            name="small_skill_db001"
            geometry={nodes.small_skill_db001.geometry}
            material={materials["yellow rubber"]}
            position={[-13.6, 0.48, 0.8]}
            rotation={[0, 0, 1.204]}
          />
          <mesh
            name="small_skill_db002"
            geometry={nodes.small_skill_db002.geometry}
            material={materials["yellow rubber"]}
            position={[-13.6, 0.48, 0.5]}
            rotation={[0, 0, 1.204]}
          />
          {/* end of custom components and models */}
          <mesh
            name="Plane"
            geometry={nodes.Plane.geometry}
            material={nodes.Plane.material}
            position={[0, 0.01, 0]}
            scale={[50, 1, 50]}
          />
          <mesh
            name="Text"
            geometry={nodes.Text.geometry}
            material={nodes.Text.material}
            position={[2.35, 1.53, -10.74]}
            rotation={[Math.PI / 2, 0, 2.74]}
            scale={[0.1, 1, 0.1]}
          />
          <group
            name="pullupab_rack002"
            position={[7, 0.1, 1]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh
              name="gym_model_077002"
              geometry={nodes.gym_model_077002.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_077002_1"
              geometry={nodes.gym_model_077002_1.geometry}
              material={materials.rubber}
            />
          </group>
          <group
            name="inclined_bench003"
            position={[-5, 0.1, 1]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh
              name="gym_model_118003"
              geometry={nodes.gym_model_118003.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_118003_1"
              geometry={nodes.gym_model_118003_1.geometry}
              material={materials.rubber}
            />
          </group>
          <group
            name="gym_model_020001"
            position={[-1, 0.1, 1]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh
              name="gym_model_020003_1"
              geometry={nodes.gym_model_020003_1.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_020003_2"
              geometry={nodes.gym_model_020003_2.geometry}
              material={materials.weights}
            />
            <mesh
              name="gym_model_020003_3"
              geometry={nodes.gym_model_020003_3.geometry}
              material={materials.rubber}
            />
          </group>
          <group
            name="inclined_bench002"
            position={[-1, 0.1, 1]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh
              name="gym_model_118004"
              geometry={nodes.gym_model_118004.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_118004_1"
              geometry={nodes.gym_model_118004_1.geometry}
              material={materials.rubber}
            />
          </group>
          <group
            name="gym_model_020003"
            position={[-5, 0.1, 1]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh
              name="gym_model_020004"
              geometry={nodes.gym_model_020004.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_020004_1"
              geometry={nodes.gym_model_020004_1.geometry}
              material={materials.weights}
            />
            <mesh
              name="gym_model_020004_2"
              geometry={nodes.gym_model_020004_2.geometry}
              material={materials.rubber}
            />
          </group>
          <group
            name="squat_rack006"
            position={[3, 0.1, -3]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh
              name="gym_model_007006"
              geometry={nodes.gym_model_007006.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_007006_1"
              geometry={nodes.gym_model_007006_1.geometry}
              material={materials.weights}
            />
            <mesh
              name="gym_model_007006_2"
              geometry={nodes.gym_model_007006_2.geometry}
              material={materials.rubber}
            />
          </group>
          <group
            name="squat_rack002"
            position={[7, 0.1, -3]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh
              name="gym_model_007009"
              geometry={nodes.gym_model_007009.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_007009_1"
              geometry={nodes.gym_model_007009_1.geometry}
              material={materials.weights}
            />
            <mesh
              name="gym_model_007009_2"
              geometry={nodes.gym_model_007009_2.geometry}
              material={materials.rubber}
            />
          </group>
          <group
            name="squat_rack005"
            position={[-1, 0.1, -3]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh
              name="gym_model_007010"
              geometry={nodes.gym_model_007010.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_007010_1"
              geometry={nodes.gym_model_007010_1.geometry}
              material={materials.weights}
            />
            <mesh
              name="gym_model_007010_2"
              geometry={nodes.gym_model_007010_2.geometry}
              material={materials.rubber}
            />
          </group>
          <group
            name="squat_rack003"
            position={[11, 0.1, -3]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh
              name="gym_model_007011"
              geometry={nodes.gym_model_007011.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_007011_1"
              geometry={nodes.gym_model_007011_1.geometry}
              material={materials.weights}
            />
            <mesh
              name="gym_model_007011_2"
              geometry={nodes.gym_model_007011_2.geometry}
              material={materials.rubber}
            />
          </group>
          <group
            name="plate_holder_wplates001"
            position={[-9, 0.1, -4]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh
              name="gym_model_078003"
              geometry={nodes.gym_model_078003.geometry}
              material={materials.rubber}
            />
            <mesh
              name="gym_model_078003_1"
              geometry={nodes.gym_model_078003_1.geometry}
              material={materials.weights}
            />
            <mesh
              name="gym_model_078003_2"
              geometry={nodes.gym_model_078003_2.geometry}
              material={materials.metal}
            />
          </group>
          <group
            name="yoga_ball_rack002"
            position={[7.2, 0.1, 8]}
            rotation={[Math.PI / 2, 0, Math.PI]}
          >
            <mesh
              name="gym_model_017002"
              geometry={nodes.gym_model_017002.geometry}
              material={materials["light_blue rubber"]}
            />
            <mesh
              name="gym_model_017002_1"
              geometry={nodes.gym_model_017002_1.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_017002_2"
              geometry={nodes.gym_model_017002_2.geometry}
              material={materials.rubber}
            />
          </group>
          <group
            name="punching_bag001"
            position={[11, 0.1, 8.1]}
            rotation={[Math.PI / 2, 0, Math.PI]}
          >
            <mesh
              name="gym_model_021002"
              geometry={nodes.gym_model_021002.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_021002_1"
              geometry={nodes.gym_model_021002_1.geometry}
              material={materials.rubber}
            />
          </group>
          <group
            name="pull_up_wall003"
            position={[14.35, 2, -3]}
            rotation={[Math.PI / 2, 0, Math.PI / 2]}
          >
            <mesh
              name="gym_model_061003"
              geometry={nodes.gym_model_061003.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_061003_1"
              geometry={nodes.gym_model_061003_1.geometry}
              material={materials.rubber}
            />
          </group>
          <group
            name="pull_up_wall001"
            position={[14.35, 2, 4]}
            rotation={[Math.PI / 2, 0, Math.PI / 2]}
          >
            <mesh
              name="gym_model_061004"
              geometry={nodes.gym_model_061004.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_061004_1"
              geometry={nodes.gym_model_061004_1.geometry}
              material={materials.rubber}
            />
          </group>
          <group
            name="treadmills003"
            position={[12.9, 0.11, -12.5]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh
              name="gym_model_122007"
              geometry={nodes.gym_model_122007.geometry}
              material={materials["plastic(grey)"]}
            />
            <mesh
              name="gym_model_122007_1"
              geometry={nodes.gym_model_122007_1.geometry}
              material={materials["rubber-grey"]}
            />
            <mesh
              name="gym_model_122007_2"
              geometry={nodes.gym_model_122007_2.geometry}
              material={materials.rubber}
            />
            <mesh
              name="gym_model_122007_3"
              geometry={nodes.gym_model_122007_3.geometry}
              material={materials.screen}
            />
          </group>
          <group
            name="stationary_bike001"
            position={[6.5, 0.05, -7.5]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh
              name="gym_model_120005"
              geometry={nodes.gym_model_120005.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_120005_1"
              geometry={nodes.gym_model_120005_1.geometry}
              material={materials["plastic(grey)"]}
            />
            <mesh
              name="gym_model_120005_2"
              geometry={nodes.gym_model_120005_2.geometry}
              material={materials.rubber}
            />
            <mesh
              name="gym_model_120005_3"
              geometry={nodes.gym_model_120005_3.geometry}
              material={materials.screen}
            />
          </group>
          <group
            name="stationary_bike005"
            position={[12.9, 0.05, -7.5]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh
              name="gym_model_120006"
              geometry={nodes.gym_model_120006.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_120006_1"
              geometry={nodes.gym_model_120006_1.geometry}
              material={materials["plastic(grey)"]}
            />
            <mesh
              name="gym_model_120006_2"
              geometry={nodes.gym_model_120006_2.geometry}
              material={materials.rubber}
            />
            <mesh
              name="gym_model_120006_3"
              geometry={nodes.gym_model_120006_3.geometry}
              material={materials.screen}
            />
          </group>
          <group
            name="stationary_bike003"
            position={[9.7, 0.05, -7.5]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh
              name="gym_model_120007"
              geometry={nodes.gym_model_120007.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_120007_1"
              geometry={nodes.gym_model_120007_1.geometry}
              material={materials["plastic(grey)"]}
            />
            <mesh
              name="gym_model_120007_2"
              geometry={nodes.gym_model_120007_2.geometry}
              material={materials.rubber}
            />
            <mesh
              name="gym_model_120007_3"
              geometry={nodes.gym_model_120007_3.geometry}
              material={materials.screen}
            />
          </group>
          <group
            name="stationary_bike004"
            position={[11.3, 0.05, -7.5]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh
              name="gym_model_120008"
              geometry={nodes.gym_model_120008.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_120008_1"
              geometry={nodes.gym_model_120008_1.geometry}
              material={materials["plastic(grey)"]}
            />
            <mesh
              name="gym_model_120008_2"
              geometry={nodes.gym_model_120008_2.geometry}
              material={materials.rubber}
            />
            <mesh
              name="gym_model_120008_3"
              geometry={nodes.gym_model_120008_3.geometry}
              material={materials.screen}
            />
          </group>
          <group
            name="bench_press_w_bench001"
            position={[-12, 0.1, -12.5]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh
              name="gym_model_090001"
              geometry={nodes.gym_model_090001.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_090001_1"
              geometry={nodes.gym_model_090001_1.geometry}
              material={materials.rubber}
            />
            <mesh
              name="gym_model_090001_2"
              geometry={nodes.gym_model_090001_2.geometry}
              material={materials.weights}
            />
          </group>
          <group
            name="plate_holder_wplates003"
            position={[-2, 0.1, -1]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh
              name="gym_model_078004"
              geometry={nodes.gym_model_078004.geometry}
              material={materials.rubber}
            />
            <mesh
              name="gym_model_078004_1"
              geometry={nodes.gym_model_078004_1.geometry}
              material={materials.weights}
            />
            <mesh
              name="gym_model_078004_2"
              geometry={nodes.gym_model_078004_2.geometry}
              material={materials.metal}
            />
          </group>
          <group
            name="incline_ab001"
            position={[-5.4, 0.1, -6.3]}
            rotation={[Math.PI / 2, 0, Math.PI]}
          >
            <mesh
              name="gym_model_022001"
              geometry={nodes.gym_model_022001.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_022001_1"
              geometry={nodes.gym_model_022001_1.geometry}
              material={materials.rubber}
            />
          </group>
          <group
            name="incline_ab002"
            position={[-12, 0.1, -6.3]}
            rotation={[Math.PI / 2, 0, Math.PI]}
          >
            <mesh
              name="gym_model_022002"
              geometry={nodes.gym_model_022002.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_022002_1"
              geometry={nodes.gym_model_022002_1.geometry}
              material={materials.rubber}
            />
          </group>
          <group
            name="bench001"
            position={[-5.3, 1.7, 10.6]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh
              name="gym_model_006005"
              geometry={nodes.gym_model_006005.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_006005_1"
              geometry={nodes.gym_model_006005_1.geometry}
              material={materials.rubber}
            />
          </group>
          <group
            name="bench002"
            position={[-5.3, 1.7, 8.5]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh
              name="gym_model_006006"
              geometry={nodes.gym_model_006006.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_006006_1"
              geometry={nodes.gym_model_006006_1.geometry}
              material={materials.rubber}
            />
          </group>
          <group
            name="bench003"
            position={[-5.3, 1.7, 6.4]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh
              name="gym_model_006007"
              geometry={nodes.gym_model_006007.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_006007_1"
              geometry={nodes.gym_model_006007_1.geometry}
              material={materials.rubber}
            />
          </group>
          <group
            name="bench005"
            position={[-5.3, 1.7, 4.3]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh
              name="gym_model_006008"
              geometry={nodes.gym_model_006008.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_006008_1"
              geometry={nodes.gym_model_006008_1.geometry}
              material={materials.rubber}
            />
          </group>
          <group
            name="dumbbell_rack_5001"
            position={[-13.6, 0.1, 5]}
            rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          >
            <mesh
              name="gym_model_050002"
              geometry={nodes.gym_model_050002.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_050002_1"
              geometry={nodes.gym_model_050002_1.geometry}
              material={materials.weights}
            />
            <mesh
              name="gym_model_050002_2"
              geometry={nodes.gym_model_050002_2.geometry}
              material={materials.rubber}
            />
          </group>
          <group
            name="dumbbell_rack_1001"
            position={[-13.6, 0.1, 7]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh
              name="gym_model_131001"
              geometry={nodes.gym_model_131001.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_131001_1"
              geometry={nodes.gym_model_131001_1.geometry}
              material={materials.rubber}
            />
            <mesh
              name="gym_model_131001_2"
              geometry={nodes.gym_model_131001_2.geometry}
              material={materials["red rubber"]}
            />
            <mesh
              name="gym_model_131001_3"
              geometry={nodes.gym_model_131001_3.geometry}
              material={materials["yellow rubber"]}
            />
          </group>
          <group
            name="locker_benches001"
            position={[12.75, 0.23, 11]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh
              name="gym_model_004004"
              geometry={nodes.gym_model_004004.geometry}
              material={materials.wood}
            />
            <mesh
              name="gym_model_004004_1"
              geometry={nodes.gym_model_004004_1.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_004004_2"
              geometry={nodes.gym_model_004004_2.geometry}
              material={materials.rubber}
            />
          </group>
          <group
            name="locker_benches003"
            position={[7.25, 0.23, 11]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh
              name="gym_model_004005"
              geometry={nodes.gym_model_004005.geometry}
              material={materials.wood}
            />
            <mesh
              name="gym_model_004005_1"
              geometry={nodes.gym_model_004005_1.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_004005_2"
              geometry={nodes.gym_model_004005_2.geometry}
              material={materials.rubber}
            />
          </group>
          <group
            name="locker_benches004"
            position={[10, 0.23, 11]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh
              name="gym_model_004006"
              geometry={nodes.gym_model_004006.geometry}
              material={materials.wood}
            />
            <mesh
              name="gym_model_004006_1"
              geometry={nodes.gym_model_004006_1.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_004006_2"
              geometry={nodes.gym_model_004006_2.geometry}
              material={materials.rubber}
            />
          </group>
          <mesh
            name="yoga_mat_2011"
            geometry={nodes.yoga_mat_2011.geometry}
            material={materials["green rubber.001"]}
            position={[-2.75, 0.1, 9]}
            rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          />
          <mesh
            name="gym_floor"
            geometry={nodes.gym_floor.geometry}
            material={materials["rubber-grey"]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={[5, 5, 1]}
          />
          {/* <mesh
          name="gym_ceil"
          geometry={nodes.gym_floor.geometry}
          material={materials['plastic(grey)']}
          position={[0,3.5,0]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[5, 5, 1]}
        /> */}
          <mesh
            name="big_shelves_1"
            geometry={nodes.big_shelves_1.geometry}
            material={materials.dark_wood}
            position={[0, 0.1, -6.8]}
            rotation={[Math.PI / 2, 0, Math.PI]}
          />
          <group
            name="chair"
            position={[0, 0.1, -9.16]}
            rotation={[Math.PI / 2, 0, Math.PI]}
          >
            <mesh
              name="gym_model_115"
              geometry={nodes.gym_model_115.geometry}
              material={materials.rubber}
            />
            <mesh
              name="gym_model_115_1"
              geometry={nodes.gym_model_115_1.geometry}
              material={materials.metal}
            />
          </group>
          <mesh
            name="gym_model_135"
            geometry={nodes.gym_model_135.geometry}
            material={materials["plastic(grey)"]}
            position={[-2.94, 0, -14.5]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <group
              name="Left_door"
              position={[5.065, 0.115, 0]}
              ref={leftDoorRef}
            >
              <mesh
                name="gym_model_138"
                geometry={nodes.gym_model_138.geometry}
                material={materials.glass}
              />
              <mesh
                name="gym_model_138_1"
                geometry={nodes.gym_model_138_1.geometry}
                material={materials.rubber}
              />
            </group>
            <group
              name="Right_door"
              position={[0.717, 0.115, 0]}
              ref={rightDoorRef}
            >
              <mesh
                name="gym_model_137"
                geometry={nodes.gym_model_137.geometry}
                material={materials.glass}
              />
              <mesh
                name="gym_model_137_1"
                geometry={nodes.gym_model_137_1.geometry}
                material={materials.rubber}
              />
            </group>
          </mesh>
          <group
            name="front_desk"
            position={[0, 0.12, -9.94]}
            rotation={[Math.PI / 2, 0, Math.PI]}
          >
            <mesh
              name="gym_model_112"
              geometry={nodes.gym_model_112.geometry}
              material={materials.Material}
            />
            <mesh
              name="gym_model_112_1"
              geometry={nodes.gym_model_112_1.geometry}
              material={materials.metal}
            />
          </group>
          <group
            name="1-window-wall"
            position={[-14.5, 0, -8.72]}
            rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          >
            <mesh
              name="gym_model_133"
              geometry={nodes.gym_model_133.geometry}
              material={materials.glass}
            />
            <mesh
              name="gym_model_133_1"
              geometry={nodes.gym_model_133_1.geometry}
              material={materials["plastic(grey)"]}
            />
          </group>
          <group
            name="3-window-wall"
            position={[2.84, 0, -14.5]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh
              name="gym_model_136"
              geometry={nodes.gym_model_136.geometry}
              material={materials.glass}
            />
            <mesh
              name="gym_model_136_1"
              geometry={nodes.gym_model_136_1.geometry}
              material={materials["plastic(grey)"]}
            />
          </group>
          <mesh
            name="shelves_1"
            geometry={nodes.shelves_1.geometry}
            material={materials.dark_wood}
            position={[3.37, 0, 8.32]}
            rotation={[Math.PI / 2, 0, Math.PI]}
          />
          <group
            name="incline_ab"
            position={[-8.7, 0.1, -6.3]}
            rotation={[Math.PI / 2, 0, Math.PI]}
          >
            <mesh
              name="gym_model_022"
              geometry={nodes.gym_model_022.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_022_1"
              geometry={nodes.gym_model_022_1.geometry}
              material={materials.rubber}
            />
          </group>
          <group
            name="empty_bench"
            position={[-8.7, 0.1, -12.5]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh
              name="gym_model_059"
              geometry={nodes.gym_model_059.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_059_1"
              geometry={nodes.gym_model_059_1.geometry}
              material={materials.rubber}
            />
          </group>
          <group
            name="bench_press_w_bench"
            position={[-5.4, 0.1, -12.5]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh
              name="gym_model_090"
              geometry={nodes.gym_model_090.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_090_1"
              geometry={nodes.gym_model_090_1.geometry}
              material={materials.rubber}
            />
            <mesh
              name="gym_model_090_2"
              geometry={nodes.gym_model_090_2.geometry}
              material={materials.weights}
            />
          </group>
          <group
            name="pullupab_rack"
            position={[11, 0.1, 1]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh
              name="gym_model_077"
              geometry={nodes.gym_model_077.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_077_1"
              geometry={nodes.gym_model_077_1.geometry}
              material={materials.rubber}
            />
          </group>
          <group
            name="punching_bag"
            position={[13, 0.1, 8.1]}
            rotation={[Math.PI / 2, 0, Math.PI]}
          >
            <mesh
              name="gym_model_021"
              geometry={nodes.gym_model_021.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_021_1"
              geometry={nodes.gym_model_021_1.geometry}
              material={materials.rubber}
            />
          </group>
          <group
            name="gym_model_020"
            position={[3, 0.1, 1]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh
              name="gym_model_020_1"
              geometry={nodes.gym_model_020_1.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_020_2"
              geometry={nodes.gym_model_020_2.geometry}
              material={materials.weights}
            />
            <mesh
              name="gym_model_020_3"
              geometry={nodes.gym_model_020_3.geometry}
              material={materials.rubber}
            />
          </group>
          <mesh
            name="rolled_towel_2"
            geometry={nodes.rolled_towel_2.geometry}
            material={materials["blue rubber"]}
            position={[3.183, 1.141, 8.1]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <mesh
            name="yoga_mat_2"
            geometry={nodes.yoga_mat_2.geometry}
            material={materials["blue rubber"]}
            position={[-6.75, 0.1, 4.5]}
            rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          />
          <group
            name="dumbbell_rack_1"
            position={[-13.6, 0.1, 8.6]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh
              name="gym_model_131"
              geometry={nodes.gym_model_131.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_131_1"
              geometry={nodes.gym_model_131_1.geometry}
              material={materials.rubber}
            />
            <mesh
              name="gym_model_131_2"
              geometry={nodes.gym_model_131_2.geometry}
              material={materials["red rubber"]}
            />
            <mesh
              name="gym_model_131_3"
              geometry={nodes.gym_model_131_3.geometry}
              material={materials["yellow rubber"]}
            />
          </group>
          <group
            name="plate_holder_wplates"
            position={[7, 0.1, -1]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh
              name="gym_model_078"
              geometry={nodes.gym_model_078.geometry}
              material={materials.rubber}
            />
            <mesh
              name="gym_model_078_1"
              geometry={nodes.gym_model_078_1.geometry}
              material={materials.weights}
            />
            <mesh
              name="gym_model_078_2"
              geometry={nodes.gym_model_078_2.geometry}
              material={materials.metal}
            />
          </group>
          <group
            name="empty_dumbbell_rack_short"
            position={[-13.6, 0.1, -2.17]}
            rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          >
            <mesh
              name="gym_model_108"
              geometry={nodes.gym_model_108.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_108_1"
              geometry={nodes.gym_model_108_1.geometry}
              material={materials.rubber}
            />
          </group>
          <mesh
            name="empty_dumbbell_rack"
            geometry={nodes.empty_dumbbell_rack.geometry}
            material={materials.metal}
            position={[-13.6, 0, 0.19]}
            rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          />
          <group
            name="dumbbell_rack_5"
            position={[-13.6, 0.1, 2.8]}
            rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          >
            <mesh
              name="gym_model_050"
              geometry={nodes.gym_model_050.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_050_1"
              geometry={nodes.gym_model_050_1.geometry}
              material={materials.weights}
            />
            <mesh
              name="gym_model_050_2"
              geometry={nodes.gym_model_050_2.geometry}
              material={materials.rubber}
            />
          </group>
          <group
            name="half_yoga_ball"
            position={[8.67, 0.1, 8.054]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh
              name="gym_model_130"
              geometry={nodes.gym_model_130.geometry}
              material={materials["blue rubber"]}
            />
            <mesh
              name="gym_model_130_1"
              geometry={nodes.gym_model_130_1.geometry}
              material={materials.rubber}
            />
          </group>
          <group
            name="3-window-wall001"
            position={[8.601, 0, -14.5]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh
              name="gym_model_136001"
              geometry={nodes.gym_model_136001.geometry}
              material={materials.glass}
            />
            <mesh
              name="gym_model_136001_1"
              geometry={nodes.gym_model_136001_1.geometry}
              material={materials["plastic(grey)"]}
            />
          </group>
          <group
            name="3-window-wall002"
            position={[-8.72, 0, -14.5]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh
              name="gym_model_136002"
              geometry={nodes.gym_model_136002.geometry}
              material={materials.glass}
            />
            <mesh
              name="gym_model_136002_1"
              geometry={nodes.gym_model_136002_1.geometry}
              material={materials["plastic(grey)"]}
            />
          </group>
          <group
            name="3-window-wall003"
            position={[-14.5, 0, -14.5]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh
              name="gym_model_136003"
              geometry={nodes.gym_model_136003.geometry}
              material={materials.glass}
            />
            <mesh
              name="gym_model_136003_1"
              geometry={nodes.gym_model_136003_1.geometry}
              material={materials["plastic(grey)"]}
            />
          </group>
          <group
            name="1-window-wall001"
            position={[-14.5, 0, -2.947]}
            rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          >
            <mesh
              name="gym_model_133001"
              geometry={nodes.gym_model_133001.geometry}
              material={materials.glass}
            />
            <mesh
              name="gym_model_133001_1"
              geometry={nodes.gym_model_133001_1.geometry}
              material={materials["plastic(grey)"]}
            />
          </group>
          <group
            name="1-window-wall002"
            position={[-14.5, 0, 2.831]}
            rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          >
            <mesh
              name="gym_model_133002"
              geometry={nodes.gym_model_133002.geometry}
              material={materials.glass}
            />
            <mesh
              name="gym_model_133002_1"
              geometry={nodes.gym_model_133002_1.geometry}
              material={materials["plastic(grey)"]}
            />
          </group>
          <group
            name="1-window-wall003"
            position={[-14.5, 0, 8.597]}
            rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          >
            <mesh
              name="gym_model_133003"
              geometry={nodes.gym_model_133003.geometry}
              material={materials.glass}
            />
            <mesh
              name="gym_model_133003_1"
              geometry={nodes.gym_model_133003_1.geometry}
              material={materials["plastic(grey)"]}
            />
          </group>
          <group
            name="1-window-wall004"
            position={[-14.5, 0, 14.374]}
            rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          >
            <mesh
              name="gym_model_133004"
              geometry={nodes.gym_model_133004.geometry}
              material={materials.glass}
            />
            <mesh
              name="gym_model_133004_1"
              geometry={nodes.gym_model_133004_1.geometry}
              material={materials["plastic(grey)"]}
            />
          </group>
          <mesh
            name="gym_model_134002"
            geometry={nodes.gym_model_134002.geometry}
            material={materials["plastic(grey)"]}
            position={[-14.5, 0, 14.36]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={[5, 1, 1]}
          />
          <mesh
            name="gym_model_134005"
            geometry={nodes.gym_model_134005.geometry}
            material={materials["plastic(grey)"]}
            position={[14.36, 0, 14.5]}
            rotation={[Math.PI / 2, 0, -Math.PI / 2]}
            scale={[5.02, 1, 1]}
          />
          <mesh
            name="gym_model_134010"
            geometry={nodes.gym_model_134010.geometry}
            material={materials["plastic(grey)"]}
            position={[2.785, 0, 8.6]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={[2, 1, 1]}
          />
          <group
            name="locker_benches002"
            position={[4.5, 0.23, 11]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh
              name="gym_model_004002"
              geometry={nodes.gym_model_004002.geometry}
              material={materials.wood}
            />
            <mesh
              name="gym_model_004002_1"
              geometry={nodes.gym_model_004002_1.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_004002_2"
              geometry={nodes.gym_model_004002_2.geometry}
              material={materials.rubber}
            />
          </group>
          <group
            name="treadmills001"
            position={[6.5, 0.11, -12.5]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh
              name="gym_model_122001"
              geometry={nodes.gym_model_122001.geometry}
              material={materials["plastic(grey)"]}
            />
            <mesh
              name="gym_model_122001_1"
              geometry={nodes.gym_model_122001_1.geometry}
              material={materials["rubber-grey"]}
            />
            <mesh
              name="gym_model_122001_2"
              geometry={nodes.gym_model_122001_2.geometry}
              material={materials.rubber}
            />
            <mesh
              name="gym_model_122001_3"
              geometry={nodes.gym_model_122001_3.geometry}
              material={materials.screen}
            />
          </group>
          <group
            name="stationary_bike002"
            position={[8.1, 0.05, -7.5]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh
              name="gym_model_120002"
              geometry={nodes.gym_model_120002.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_120002_1"
              geometry={nodes.gym_model_120002_1.geometry}
              material={materials["plastic(grey)"]}
            />
            <mesh
              name="gym_model_120002_2"
              geometry={nodes.gym_model_120002_2.geometry}
              material={materials.rubber}
            />
            <mesh
              name="gym_model_120002_3"
              geometry={nodes.gym_model_120002_3.geometry}
              material={materials.screen}
            />
          </group>
          <group
            name="bench004"
            position={[-5.3, 1.7, 2.2]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh
              name="gym_model_006004"
              geometry={nodes.gym_model_006004.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_006004_1"
              geometry={nodes.gym_model_006004_1.geometry}
              material={materials.rubber}
            />
          </group>
          <group
            name="squat_rack001"
            position={[-5, 0.1, -3]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh
              name="gym_model_007001"
              geometry={nodes.gym_model_007001.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_007001_1"
              geometry={nodes.gym_model_007001_1.geometry}
              material={materials.weights}
            />
            <mesh
              name="gym_model_007001_2"
              geometry={nodes.gym_model_007001_2.geometry}
              material={materials.rubber}
            />
          </group>
          <group
            name="inclined_bench001"
            position={[3, 0.1, 1]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh
              name="gym_model_118001"
              geometry={nodes.gym_model_118001.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_118001_1"
              geometry={nodes.gym_model_118001_1.geometry}
              material={materials.rubber}
            />
          </group>
          <group
            name="pull_up_wall002"
            position={[14.35, 2, 0.5]}
            rotation={[Math.PI / 2, 0, Math.PI / 2]}
          >
            <mesh
              name="gym_model_061002"
              geometry={nodes.gym_model_061002.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_061002_1"
              geometry={nodes.gym_model_061002_1.geometry}
              material={materials.rubber}
            />
          </group>
          <group
            name="yoga_ball_rack001"
            position={[5.6, 0.1, 8]}
            rotation={[Math.PI / 2, 0, Math.PI]}
          >
            <mesh
              name="gym_model_017001"
              geometry={nodes.gym_model_017001.geometry}
              material={materials["light_blue rubber"]}
            />
            <mesh
              name="gym_model_017001_1"
              geometry={nodes.gym_model_017001_1.geometry}
              material={materials.metal}
            />
            <mesh
              name="gym_model_017001_2"
              geometry={nodes.gym_model_017001_2.geometry}
              material={materials.rubber}
            />
          </group>
          <mesh
            name="yoga_mat_2001"
            geometry={nodes.yoga_mat_2001.geometry}
            material={materials["green rubber"]}
            position={[-4.75, 0.1, 4.5]}
            rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          />
          <mesh
            name="yoga_mat_2002"
            geometry={nodes.yoga_mat_2002.geometry}
            material={materials["yellow rubber"]}
            position={[-2.75, 0.1, 4.5]}
            rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          />
          <mesh
            name="yoga_mat_2003"
            geometry={nodes.yoga_mat_2003.geometry}
            material={materials.rubber}
            position={[-0.75, 0.1, 4.5]}
            rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          />
          <mesh
            name="yoga_mat_2004"
            geometry={nodes.yoga_mat_2004.geometry}
            material={materials.rubber}
            position={[1.25, 0.1, 4.5]}
            rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          />
          <mesh
            name="yoga_mat_2005"
            geometry={nodes.yoga_mat_2005.geometry}
            material={materials["red rubber"]}
            position={[1.25, 0.1, 6.5]}
            rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          />
          <mesh
            name="yoga_mat_2006"
            geometry={nodes.yoga_mat_2006.geometry}
            material={materials["blue rubber"]}
            position={[-0.75, 0.1, 6.5]}
            rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          />
          <mesh
            name="yoga_mat_2007"
            geometry={nodes.yoga_mat_2007.geometry}
            material={materials.light_pink}
            position={[-2.75, 0.1, 6.5]}
            rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          />
          <mesh
            name="yoga_mat_2008"
            geometry={nodes.yoga_mat_2008.geometry}
            material={materials["yellow rubber"]}
            position={[-4.75, 0.1, 6.5]}
            rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          />
          <mesh
            name="yoga_mat_2009"
            geometry={nodes.yoga_mat_2009.geometry}
            material={materials["red rubber"]}
            position={[-6.75, 0.1, 6.5]}
            rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          />
          <mesh
            name="yoga_mat_2010"
            geometry={nodes.yoga_mat_2010.geometry}
            material={materials["green rubber"]}
            position={[-2.75, 0.1, 9]}
            rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          />
          <mesh
            name="rolled_towel_2001"
            geometry={nodes.rolled_towel_2001.geometry}
            material={materials["yellow rubber"]}
            position={[2.974, 1.153, 8.102]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <mesh
            name="rolled_towel_2002"
            geometry={nodes.rolled_towel_2002.geometry}
            material={materials.rubber}
            position={[2.982, 1.34, 8.162]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <mesh
            name="rolled_towel_2003"
            geometry={nodes.rolled_towel_2003.geometry}
            material={materials["green rubber"]}
            position={[3.178, 1.323, 8.159]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <mesh
            name="rolled_towel_2004"
            geometry={nodes.rolled_towel_2004.geometry}
            material={materials.light_pink}
            position={[3.494, 1.165, 8.11]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <mesh
            name="rolled_towel_2005"
            geometry={nodes.rolled_towel_2005.geometry}
            material={materials["yellow rubber"]}
            position={[3.694, 1.173, 8.114]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <mesh
            name="rolled_towel_2006"
            geometry={nodes.rolled_towel_2006.geometry}
            material={materials["green rubber"]}
            position={[3.817, 1.311, 8.159]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <mesh
            name="rolled_towel_2007"
            geometry={nodes.rolled_towel_2007.geometry}
            material={materials["red rubber"]}
            position={[3.612, 1.34, 8.167]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <mesh
            name="rolled_towel_2008"
            geometry={nodes.rolled_towel_2008.geometry}
            material={materials["yellow rubber"]}
            position={[3.837, 1.644, 8.266]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <mesh
            name="rolled_towel_2009"
            geometry={nodes.rolled_towel_2009.geometry}
            material={materials.rubber}
            position={[3.654, 1.656, 8.269]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <mesh
            name="rolled_towel_2010"
            geometry={nodes.rolled_towel_2010.geometry}
            material={materials["blue rubber"]}
            position={[3.816, 1.83, 8.326]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <mesh
            name="rolled_towel_2011"
            geometry={nodes.rolled_towel_2011.geometry}
            material={materials.light_pink}
            position={[3.22, 1.66, 8.267]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <mesh
            name="rolled_towel_2012"
            geometry={nodes.rolled_towel_2012.geometry}
            material={materials["green rubber"]}
            position={[3.024, 1.652, 8.263]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <mesh
            name="rolled_towel_2013"
            geometry={nodes.rolled_towel_2013.geometry}
            material={materials["red rubber"]}
            position={[3.223, 0.466, 8]}
          />
          <mesh
            name="rolled_towel_2014"
            geometry={nodes.rolled_towel_2014.geometry}
            material={materials["red rubber"]}
            position={[1.002, 1.236, -7]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <mesh
            name="rolled_towel_2015"
            geometry={nodes.rolled_towel_2015.geometry}
            material={materials["green rubber"]}
            position={[0.791, 1.242, -6.914]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <mesh
            name="rolled_towel_2016"
            geometry={nodes.rolled_towel_2016.geometry}
            material={materials["yellow rubber"]}
            position={[0.915, 1.422, -6.894]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <mesh
            name="rolled_towel_2017"
            geometry={nodes.rolled_towel_2017.geometry}
            material={materials["yellow rubber"]}
            position={[0.417, 1.236, -6.9]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <mesh
            name="rolled_towel_2018"
            geometry={nodes.rolled_towel_2018.geometry}
            material={materials["light_blue rubber"]}
            position={[-0.32, 1.22, -6.9]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <mesh
            name="rolled_towel_2019"
            geometry={nodes.rolled_towel_2019.geometry}
            material={materials.light_pink}
            position={[-0.47, 1.349, -6.9]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <mesh
            name="rolled_towel_2020"
            geometry={nodes.rolled_towel_2020.geometry}
            material={materials["blue rubber"]}
            position={[-0.718, 1.242, -6.9]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <mesh
            name="rolled_towel_2022"
            geometry={nodes.rolled_towel_2022.geometry}
            material={materials.rubber}
            position={[0.29, 1.749, -6.9]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <mesh
            name="rolled_towel_2023"
            geometry={nodes.rolled_towel_2023.geometry}
            material={materials.rubber}
            position={[0.76, 1.727, -6.942]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <mesh
            name="rolled_towel_2024"
            geometry={nodes.rolled_towel_2024.geometry}
            material={materials["red rubber"]}
            position={[-0.11, 1.749, -6.9]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <mesh
            name="rolled_towel_2025"
            geometry={nodes.rolled_towel_2025.geometry}
            material={materials["green rubber"]}
            position={[-0.305, 1.749, -6.9]}
            rotation={[Math.PI / 2, 0, 0]}
          />
        </group>
      </a.group>
    </>
  );
};

export default Gym;
