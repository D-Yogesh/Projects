import * as THREE from 'three';

const container = document.getElementById('container');
const width = window.innerWidth;
const height = window.innerHeight;
const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
// renderer.toneMapping = THREE.ACESFilmicToneMapping;
// renderer.outputColorSpace = THREE.SRGBColorSpace;
container.appendChild(renderer.domElement)

const fov = 75;
const aspect = width / height;
const near = 0.1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 15;

const scene = new THREE.Scene();

const cubeGeometry = new THREE.BoxGeometry(5, 5, 5);
const cubeMaterial = new THREE.MeshStandardMaterial({color: 0x00ff00});
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.rotateX(45);
cube.rotateY(45);
scene.add(cube)

const hemilight = new THREE.HemisphereLight(0xffffff, 0x000000, 2);
scene.add(hemilight)

renderer.render(scene, camera);