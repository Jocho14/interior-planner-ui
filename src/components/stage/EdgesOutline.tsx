// import { useMemo } from "react";
// import * as THREE from "three";
// import { extend } from "@react-three/fiber";

// extend({ LineSegments: THREE.LineSegments });

// export function EdgesOutline({ mesh, color = "yellow" }) {
//   const edges = useMemo(() => {
//     if (!mesh.geometry) return null;
//     return new THREE.EdgesGeometry(mesh.geometry, 20); // second param = threshold angle
//   }, [mesh.geometry]);

//   const material = useMemo(
//     () =>
//       new THREE.LineBasicMaterial({
//         color,
//         depthTest: false,
//         depthWrite: false,
//         transparent: true,
//         opacity: 1,
//       }),
//     [color]
//   );

//   if (!edges) return null;

//   return (
//     <primitive
//       object={new THREE.LineSegments(edges, material)}
//       scale={5}
//       renderOrder={1000}
//     />
//   );
// }

// export default EdgesOutline;
