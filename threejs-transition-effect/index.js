import * as THREE from 'three';
import { getFXScene } from './FXScene.js';
import { OrbitControls } from 'jsm/controls/OrbitControls.js';

const container = document.getElementById('container');
const width = window.innerWidth;
const height = window.innerHeight;
const renderer = new THREE.WebGLRenderer({
    antialias: true
});
renderer.setSize(width, height);
// renderer.toneMapping = THREE.ACESFilmicToneMapping;
// renderer.outputColorSpace = THREE.SRGBColorSpace;
document.body.appendChild(renderer.domElement)

const fov = 75;
const aspect = width / height;
const near = 0.1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 10;

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.3;

// const scene = new THREE.Scene();

// const cubeGeometry = new THREE.BoxGeometry(5, 5, 5);
// const cubeMaterial = new THREE.MeshStandardMaterial({color: 0x00ff00});
// const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
// cube.rotateX(45);
// cube.rotateY(45);
// scene.add(cube)

// const hemilight = new THREE.HemisphereLight(0xffffff, 0x000000, 2);
// scene.add(hemilight)

// renderer.render(scene, camera);

const materialA = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true
})

const materialB = new THREE.MeshStandardMaterial({
    color: 0xff9900,
    flatShading: true
})

getFXScene(camera, renderer, materialA);