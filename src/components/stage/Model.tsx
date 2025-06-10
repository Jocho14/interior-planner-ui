import { useStage } from "@/context/StageContext";
import { useDrag } from "@/hooks/useDrag";
import { UUID } from "@/types/uuid";
import { useGLTF } from "@react-three/drei";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useRef, useMemo, useState } from "react";
import * as THREE from "three";

export interface IModel {
  id: UUID;
  position?: THREE.Vector3;
}

export interface ModelProps extends IModel {
  path: string;
  onDragStart?: () => void;
  onDragEnd?: () => void;
  isDragging?: boolean;
  isAnotherDragging?: boolean;
}

const Model = ({
  id,
  path,
  position,
  onDragStart,
  onDragEnd,
  isDragging,
  isAnotherDragging,
}: ModelProps) => {
  const { scene } = useGLTF(path);
  const rigidBodyRef = useRef<RapierRigidBody | null>(null);
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const { updateModel } = useStage();
  const bodyType = isDragging
    ? "dynamic"
    : isAnotherDragging
    ? "kinematicPosition"
    : "dynamic";

  const model = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.geometry = mesh.geometry.clone();
        mesh.material = Array.isArray(mesh.material)
          ? mesh.material.map((m) => m.clone())
          : mesh.material.clone();
      }
    });
    return clone;
  }, [scene]);

  useDrag(
    groupRef,
    rigidBodyRef.current,
    onDragStart,
    onDragEnd,
    (newPosition) => {
      updateModel(id, new THREE.Vector3(...newPosition.toArray()));
    }
  );

  return (
    <RigidBody
      ref={rigidBodyRef}
      type={bodyType}
      collisionGroups={0x00010002}
      position={position?.toArray() ?? [0, 0, 0]}
      colliders="cuboid"
      enabledRotations={[false, false, false]}
    >
      <group
        ref={groupRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onPointerDown={(e) => {
          e.stopPropagation();
          onDragStart?.();
        }}
        onPointerUp={(e) => {
          e.stopPropagation();
          onDragEnd?.();
        }}
      >
        <primitive object={model} scale={100} />
        {hovered && (
          <group scale={100}>
            {model.children.map((child, i) => {
              if ((child as THREE.Mesh).isMesh) {
                const mesh = child as THREE.Mesh;
                return (
                  <mesh
                    key={i}
                    geometry={mesh.geometry}
                    position={mesh.position}
                    rotation={mesh.rotation}
                    scale={mesh.scale}
                  >
                    <meshBasicMaterial
                      color="yellow"
                      wireframe
                      depthTest={false}
                      transparent
                    />
                  </mesh>
                );
              }
              return null;
            })}
          </group>
        )}
      </group>
    </RigidBody>
  );
};

export default Model;
