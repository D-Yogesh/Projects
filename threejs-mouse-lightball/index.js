import * as THREE from 'three';
import { getBody, getMouseBall } from './getBodies.js';
import RAPIER from 'https://cdn.skypack.dev/@dimforge/rapier3d-compat@0.11.2';
import { EffectComposer } from "jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "jsm/postprocessing/UnrealBloomPass.js";

const width =  window.innerWidth;
const height = window.innerHeight;
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(width, height)
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.body.appendChild(renderer.domElement)

const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
camera.position.z = 5;

const scene=  new THREE.Scene();


await RAPIER.init();
const gravity = {x: 0, y: 0, z: 0};
const world = new RAPIER.World(gravity);

//post-processing
const renderScene = new RenderPass(scene, camera);
const bloomPass = new UnrealBloomPass(new THREE.Vector2(width, height), 1.5, 0.4, 100);
bloomPass.threshold = 0.005;
bloomPass.strength = 2.0;
bloomPass.radius = 0;
const composer = new EffectComposer(renderer);
composer.addPass(renderScene);
composer.addPass(bloomPass);

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

const hemilight = new THREE.HemisphereLight(0x00bbff, 0xaa00ff);
hemilight.intensity = 0.2;
scene.add(hemilight)

let mousePos = new THREE.Vector2()
mousePos.x = 0;
mousePos.y = 0;
mousePos.z = 0;

function animate() {
    world.step()
    mouseMesh.update(mousePos)
    bodies.forEach(b => b.update())
    // renderer.render(scene, camera);
    composer.render(scene, camera)
    
}
renderer.setAnimationLoop(animate)

const handleMouseMoveHandler = (evt) => {
    mousePos.x = (evt.clientX * 2 - window.innerWidth) / 100;
    mousePos.y = -(evt.clientY * 2 - window.innerHeight) / 150;
}

window.addEventListener('mousemove', handleMouseMoveHandler, false)