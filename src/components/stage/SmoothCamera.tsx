import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useEffect, useState } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from "three";

type Props = {
  targetPosition: THREE.Vector3;
  lookAt?: THREE.Vector3;
  trigger: boolean;
  onDone?: () => void;
};

const SmoothCamera: React.FC<Props> = ({
  targetPosition,
  lookAt = new THREE.Vector3(0, 0, 0),
  trigger,
  onDone,
}) => {
  const { camera, gl } = useThree();
  const controlsRef = useRef<OrbitControls | null>(null);
  const targetPosRef = useRef(new THREE.Vector3(...targetPosition));
  const lookAtRef = useRef(new THREE.Vector3(...lookAt.toArray()));
  const [isFlying, setIsFlying] = useState(trigger);

  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controlsRef.current = controls;

    const handleStart = () => {
      if (isFlying) {
        setIsFlying(false);
        onDone?.();
      }
    };

    controls.addEventListener("start", handleStart);

    return () => {
      controls.removeEventListener("start", handleStart);
      controls.dispose();
    };
  }, [camera, gl, isFlying]);

  useEffect(() => {
    if (trigger) {
      //@ts-ignore
      targetPosRef.current.set(...targetPosition);

      if (controlsRef.current) {
        // Sync controls.target with camera look direction before flight
        if (!lookAt) {
          const dir = new THREE.Vector3();
          camera.getWorldDirection(dir);
          lookAtRef.current.copy(camera.position.clone().add(dir));
        } else {
          lookAtRef.current.copy(lookAt);
        }

        controlsRef.current.target.copy(lookAtRef.current);
      }

      setIsFlying(true);
    }
  }, [trigger, targetPosition, lookAt]);

  useFrame(() => {
    if (controlsRef.current) controlsRef.current.update();

    if (isFlying) {
      camera.position.lerp(targetPosRef.current, 0.05);
      controlsRef.current?.target.lerp(lookAtRef.current, 0.05);

      if (
        camera.position.distanceTo(targetPosRef.current) < 0.1 &&
        controlsRef.current!.target.distanceTo(lookAtRef.current) < 0.1
      ) {
        setIsFlying(false);
        onDone?.();
      }
    }
  });

  return null;
};

export default SmoothCamera;
