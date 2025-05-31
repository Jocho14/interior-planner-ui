import { useStage } from "@/context/StageContext";
import { UUID } from "@/types/uuid";
import { useGLTF, TransformControls } from "@react-three/drei";
import { useRef, useEffect, useMemo } from "react";
import * as THREE from "three";

export interface IModel {
  id: UUID;
  position?: THREE.Vector3;
}

export interface ModelProps extends IModel {
  path: string;
  onDragStart?: () => void;
  onDragEnd?: () => void;
}

const Model = ({ id, path, position, onDragStart, onDragEnd }: ModelProps) => {
  const { scene } = useGLTF(path);
  const groupRef = useRef<THREE.Group>(null);
  const transformRef = useRef<any>(null);
  const { updateModel } = useStage();

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

  useEffect(() => {
    if (groupRef.current && transformRef.current) {
      transformRef.current.attach(groupRef.current);
    }

    return () => {
      if (transformRef.current) {
        transformRef.current.detach();
      }
    };
  }, [model]);

  useEffect(() => {
    const controls = transformRef.current;
    if (!controls) return;

    const handleMouseDown = () => onDragStart?.();
    const handleMouseUp = () => onDragEnd?.();

    controls.addEventListener("mouseDown", handleMouseDown);
    controls.addEventListener("mouseUp", handleMouseUp);

    return () => {
      controls.removeEventListener("mouseDown", handleMouseDown);
      controls.removeEventListener("mouseUp", handleMouseUp);
    };
  }, [onDragStart, onDragEnd]);

  useEffect(() => {
    const controls = transformRef.current;
    if (!controls) return;

    const handleChange = () => {
      const newPos = groupRef.current?.position;
      if (newPos) {
        updateModel(id, new THREE.Vector3(newPos.x, newPos.y, newPos.z));
      }
    };

    controls.addEventListener("change", handleChange);
    return () => controls.removeEventListener("change", handleChange);
  }, [id, updateModel]);

  return (
    <>
      {/*@ts-ignore*/}
      <TransformControls ref={transformRef} mode="translate" showY={false} />
      {/*@ts-check*/}
      <group ref={groupRef} position={position}>
        <primitive object={model} scale={5} />
      </group>
    </>
  );
};

export default Model;
