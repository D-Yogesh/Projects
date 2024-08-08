import * as THREE from 'three';
import { getBody, getMouseBall } from './getBodies.js';
import RAPIER from 'https://cdn.skypack.dev/@dimforge/rapier3d-compat@0.11.2';

const width =  window.innerWidth;
const height = window.innerHeight;
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(width, height)
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.body.appendChild(renderer.domElement)

const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
camera.position.z = 10;

const scene=  new THREE.Scene();

const geometry = new THREE.IcosahedronGeometry(3, 2);
const material = new THREE.MeshStandardMaterial({
    color: 0xccff00,
    flatShading: true
});


await RAPIER.init();
const gravity = {x: 0, y: 0, z: 0};
const world = new RAPIER.World(gravity);
// const mesh = new THREE.Mesh(geometry, material)
// const mesh = getBody();
const numOfBodies = 100;
const bodies = [];
for(let i = 0; i < numOfBodies; i++){
    const body = getBody(RAPIER, world);
    bodies.push(body)
    scene.add(body.mesh)
}
// scene.add(mesh.mesh)

const mouseMesh = getMouseBall(RAPIER, world);
mouseMesh.update({x: 2, y: 2, z: 2})
scene.add(mouseMesh.mouseMesh)

const hemilight = new THREE.HemisphereLight(0x00ff00, 0x000000)
scene.add(hemilight)

let mousePos = new THREE.Vector2()
mousePos.x = 0;
mousePos.y = 0;
mousePos.z = 0;

function animate() {
    world.step()
    mouseMesh.update(mousePos)
    bodies.forEach(b => b.update())
    renderer.render(scene, camera)
    
}
renderer.setAnimationLoop(animate)

const handleMouseMoveHandler = (evt) => {
    mousePos.x = (evt.clientX * 2 - window.innerWidth) / 50;
    mousePos.y = -(evt.clientY * 2 - window.innerHeight) / 70;
}

window.addEventListener('mousemove', handleMouseMoveHandler, false)