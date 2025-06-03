import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useEffect, useState, useRef } from "react";
import { RapierRigidBody } from "@react-three/rapier";

export const useDrag = (
  ref: React.RefObject<THREE.Object3D>,
  rigidBody: RapierRigidBody | null,
  onStart?: () => void,
  onEnd?: () => void,
  onMove?: (newPosition: THREE.Vector3) => void
) => {
  const { camera, raycaster, mouse } = useThree();
  const [dragging, setDragging] = useState(false);
  const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  const intersection = new THREE.Vector3();
  const offset = useRef(new THREE.Vector3());
  const objectWorldPos = new THREE.Vector3();

  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      if (!ref.current || !rigidBody) return;

      const rect = (e.target as Element).getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(ref.current, true);

      if (intersects.length > 0) {
        setDragging(true);
        onStart?.();

        raycaster.ray.intersectPlane(plane, intersection);

        const rbTranslation = rigidBody.translation();
        objectWorldPos.set(rbTranslation.x, rbTranslation.y, rbTranslation.z);

        offset.current.copy(intersection).sub(objectWorldPos);
      }
    };

    const onPointerUp = () => {
      if (dragging) {
        onEnd?.();
      }
      setDragging(false);
    };

    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);

    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [ref, rigidBody]);

  useFrame(() => {
    if (!dragging || !ref.current || !rigidBody) return;

    raycaster.setFromCamera(mouse, camera);
    raycaster.ray.intersectPlane(plane, intersection);

    const targetPos = new THREE.Vector3()
      .copy(intersection)
      .sub(offset.current);
    rigidBody.setTranslation(targetPos, true);
    onMove?.(targetPos);
  });

  return dragging;
};
