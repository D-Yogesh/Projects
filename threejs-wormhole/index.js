import * as THREE from "three";
import { OrbitControls } from 'jsm/controls/OrbitControls.js';

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
camera.position.z = 5;

const scene = new THREE.Scene()

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({
  color: 0xffff00
})
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

const hemilight = new THREE.HemisphereLight(0xffffff, 0x444444);
scene.add(hemilight)

function animate(){
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.02;
  renderer.render(scene, camera);
}

animate()