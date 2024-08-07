import * as THREE from "three";
import { OrbitControls } from 'jsm/controls/OrbitControls.js';
import spline from "./spline.js";
import { EffectComposer } from "jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "jsm/postprocessing/RenderPass.js";
import {UnrealBloomPass} from "jsm/postprocessing/UnrealBloomPass.js";

const width = window.innerWidth;
const height = window.innerHeight;
const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.body.appendChild(renderer.domElement);

const fov = 75;
const aspect = width / height;
const near = 0.1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
camera.position.z = 15;

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true;
controls.dampingFactor = 0.03

const scene = new THREE.Scene()
scene.fog = new THREE.FogExp2(0x000000, 0.4)

const renderScene = new RenderPass(scene, camera);
const bloomPass = new UnrealBloomPass(new THREE.Vector2(width, height), 3.5, 1, 0.009);
console.log(bloomPass)
const composer = new EffectComposer(renderer)
composer.addPass(renderScene)
composer.addPass(bloomPass)

// const geometry = new THREE.BoxGeometry();
// const material = new THREE.MeshStandardMaterial({
//   color: 0xffff00
// })
// const cube = new THREE.Mesh(geometry, material)
// scene.add(cube)

// const points = spline.getPoints(100)
// const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)
// const lineMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 })
// const lineMesh = new THREE.Line(lineGeometry, lineMaterial)
// scene.add(lineMesh);

const tubeGeometry = new THREE.TubeGeometry(spline, 222, 1, 16, true);
// const tubeMaterial = new THREE.MeshBasicMaterial({
//   color: 0xffffff,
//   wireframe: true,
//   side: THREE.DoubleSide
// })
// const tube = new THREE.Mesh(tubeGeometry, tubeMaterial);
// scene.add(tube);

const edgesGeometry = new THREE.EdgesGeometry(tubeGeometry, 0.5);
const edgesMaterial = new THREE.LineBasicMaterial({ color: 0x9ddef2 });
const tubeLinesMesh = new THREE.LineSegments(edgesGeometry, edgesMaterial);
scene.add(tubeLinesMesh);

// camera.position.copy(spline.points[0])
// camera.lookAt(spline.points[1])
// console.log(spline)
// cube.position.copy(spline.points[0])
// cube.lookAt(spline.points[1])

// const hemilight = new THREE.HemisphereLight(0xffffff, 0x444444);
// scene.add(hemilight)

const numOfBoxes = 55;
const size = 0.075;
const boxGeometry = new THREE.BoxGeometry(size, size, size);

for(let i = 0 ; i < numOfBoxes; i++){
  const p = (i / numOfBoxes + Math.random() * 0.1) % 1;
  const pos = tubeGeometry.parameters.path.getPointAt(p);
  pos.x += Math.random() - 0.4;
  pos.z += Math.random() - 0.4;

  const edges = new THREE.EdgesGeometry(boxGeometry, 0.2);
  const color = new THREE.Color().setHSL(0.3 - p, 1,0.5);
  const lineMaterial = new THREE.LineBasicMaterial({color});
  const boxLines = new THREE.LineSegments(edges, lineMaterial);
  boxLines.position.copy(pos);
  scene.add(boxLines)
}

let tubePoint = 0;
function animate(){
  requestAnimationFrame(animate);

  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.02;
  const p = tubeGeometry.parameters.path.getPointAt(tubePoint);
  const lookAt = tubeGeometry.parameters.path.getPointAt((tubePoint + 0.03) % 1)
  camera.position.copy(p)
  camera.lookAt(lookAt)
  tubePoint += 0.0002;
  tubePoint %= 1;
  composer.render(scene, camera);
}
// console.log(tubeGeometry.parameters.path.getPoints(2))
// console.log(tubeGeometry.parameters.path.getPointAt(0))
// console.log(tubeGeometry.parameters.path.getPointAt(2))
animate()