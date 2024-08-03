import * as THREE from 'three';
import { getFXScene } from './FXScene.js';
import { getTransition } from './transition.js';

const container = document.getElementById('container');
const width = window.innerWidth;
const height = window.innerHeight;
const renderer = new THREE.WebGLRenderer({
    antialias: true
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(width, height);
// renderer.toneMapping = THREE.ACESFilmicToneMapping;
// renderer.outputColorSpace = THREE.SRGBColorSpace;
container.appendChild(renderer.domElement)

const materialA = new THREE.MeshBasicMaterial({
    color: 0xccff66,
    wireframe: true
})

const materialB = new THREE.MeshStandardMaterial({
    color: 0xff9900,
    flatShading: true,
})

const sceneA = getFXScene(renderer, materialA, 0x000000);

const sceneB = getFXScene(renderer, materialB, 0x000000, true);

const transition = getTransition(renderer, sceneA, sceneB);

const clock = new THREE.Clock();
function animate() {
    requestAnimationFrame(animate);
    transition.render(clock.getDelta());
}
animate()
