import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import React from "react";
import { WallRef } from "./Wall";

type Props = {
  wallRefs: React.RefObject<WallRef>[];
  modelPositions: THREE.Vector3[];
};

export const WallTransparencyController: React.FC<Props> = ({
  wallRefs,
  modelPositions,
}) => {
  const { camera } = useThree();
  const ray = new THREE.Raycaster();
  const tempDir = new THREE.Vector3();

  useFrame(() => {
    const camPos = camera.position;

    wallRefs.forEach((ref) => {
      if (!ref.current) return;
      const mesh = ref.current.mesh;
      let shouldHide = false;

      for (const modelPos of modelPositions) {
        tempDir.subVectors(modelPos, camPos).normalize();
        ray.set(camPos, tempDir);

        const intersectsWall = ray.intersectObject(mesh, false);
        if (intersectsWall.length === 0) {
          continue;
        }

        const distToWall = intersectsWall[0].distance;
        const distToModel = camPos.distanceTo(modelPos);

        if (distToWall + 1e-3 < distToModel) {
          shouldHide = true;
          break;
        }
      }

      ref.current.setVisible(!shouldHide);
    });
  });

  return null;
};
