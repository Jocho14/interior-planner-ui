//@ts-nocheck
import * as THREE from "three";
import { useRef, useReducer, useMemo, Suspense, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import {
  useGLTF,
  MeshDistortMaterial,
  Environment,
  Lightformer,
  OrbitControls,
  Loader,
} from "@react-three/drei";
import {
  CuboidCollider,
  BallCollider,
  Physics,
  RigidBody,
} from "@react-three/rapier";
import {
  Bloom,
  DepthOfField,
  EffectComposer,
  N8AO,
} from "@react-three/postprocessing";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";

const accents = ["#ffffff", "#20ffa0", "#ff4060", "#ffcc00"];
const shuffle = (accent = 0) =>
  Array.from({ length: 15 }, () => ({
    color: accents[accent],
    accent: true,
  }));

const LandingPreview = (props) => {
  const [accent, click] = useReducer((state) => ++state % accents.length, 0);
  const connectors = useMemo(() => shuffle(accent), [accent]);
  return (
    <div className="w-full h-[60vh] bg-black rounded-3xl">
      <Suspense fallback={<Loader />}>
        <Canvas
          className="w-full"
          onClick={click}
          shadows
          dpr={[1, 1.5]}
          gl={{ antialias: true }}
          camera={{ position: [0, 0, 18], fov: 17.5, near: 1 }}
          {...props}
        >
          <color attach="background" args={["#141622"]} />
          <ambientLight intensity={0.3} />
          <directionalLight position={[5, 10, 5]} intensity={0.6} castShadow />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            intensity={1}
            castShadow
          />
          <pointLight position={[0, 5, 0]} intensity={2} color="#ffffff" />
          <Physics gravity={[0, 0, 0]}>
            <Pointer />
            {connectors.map((props, i) => (
              <Connector key={i} {...props} />
            ))}
            <Connector position={[10, 10, 5]}>
              <Model>
                <THREE.MeshStandardMaterial
                  roughness={0.2}
                  metalness={0.8}
                  clearcoat={1}
                  clearcoatRoughness={0.1}
                />
              </Model>
            </Connector>
          </Physics>
          <EffectComposer>
            <N8AO distanceFalloff={1} aoRadius={1} intensity={4} />
          </EffectComposer>
          <Environment resolution={256}>
            <group rotation={[-Math.PI / 3, 0, 1]}>
              <Lightformer
                form="circle"
                intensity={4}
                rotation-x={Math.PI / 2}
                position={[0, 5, -9]}
                scale={2}
              />
              <Lightformer
                form="circle"
                intensity={2}
                rotation-y={Math.PI / 2}
                position={[-5, 1, -1]}
                scale={2}
              />
              <Lightformer
                form="circle"
                intensity={2}
                rotation-y={Math.PI / 2}
                position={[-5, -1, -1]}
                scale={2}
              />
              <Lightformer
                form="circle"
                intensity={2}
                rotation-y={-Math.PI / 2}
                position={[10, 1, 0]}
                scale={8}
              />
            </group>
          </Environment>
        </Canvas>
      </Suspense>
    </div>
  );
};

function Connector({
  position,
  children,
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
  accent,
  ...props
}) {
  const api = useRef();
  const pos = useMemo(() => position || [r(10), r(10), r(10)], []);
  useFrame((_, delta) => {
    delta = Math.min(0.1, delta);
    api.current?.applyImpulse(
      vec.copy(api.current.translation()).negate().multiplyScalar(0.2)
    );
  });

  useFrame(() => {
    if (api.current) {
      api.current.applyTorqueImpulse({ x: 0, y: 0.2, z: 0 }, true);
    }
  });
  return (
    <RigidBody
      linearDamping={4}
      angularDamping={3}
      friction={0.1}
      position={pos}
      ref={api}
      colliders={false}
    >
      <CuboidCollider args={[1, 1, 1]} />
      {children ? children : <Model {...props} />}
      {accent && <pointLight intensity={4} distance={9} color={props.color} />}
    </RigidBody>
  );
}

function Pointer({ vec = new THREE.Vector3() }) {
  const ref = useRef();
  useFrame(({ mouse, viewport }) => {
    ref.current?.setNextKinematicTranslation(
      vec.set(
        (mouse.x * viewport.width) / 2,
        (mouse.y * viewport.height) / 2,
        0
      )
    );
  });
  return (
    <RigidBody
      position={[0, 0, 0]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[1]} />
    </RigidBody>
  );
}
function Model({ children, color = "white", roughness = 0, ...props }) {
  const ref = useRef();
  const materials = useLoader(MTLLoader, "/models/empty.mtl");
  const obj = useLoader(OBJLoader, "/models/empty.obj", (loader) => {
    materials.preload();
    loader.setMaterials(materials);
  });

  const scale = 0.1;

  const centeredModel = useMemo(() => {
    const cloned = obj.clone(true);

    const box = new THREE.Box3().setFromObject(cloned);
    const center = new THREE.Vector3();
    box.getCenter(center);

    cloned.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color(color),
          roughness: 20,
          metalness: 1.2,
        });
        child.geometry.translate(-center.x, -center.y, -center.z);
      }
    });

    return cloned;
  }, [obj]);

  return <primitive ref={ref} object={centeredModel} scale={scale} />;
}

export default LandingPreview;
