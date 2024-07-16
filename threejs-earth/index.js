import * as THREE from "three";
import { OrbitControls } from 'jsm/controls/OrbitControls.js';
import getStarfield from "./src/getStarfield.js";
import { getFresnelMat } from "./src/getFresnelMat.js";

const renderer = new THREE.WebGLRenderer({antialias: true});
const width = window.innerWidth;
const height = window.innerHeight;
renderer.setSize(width, height)
renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;

document.body.appendChild(renderer.domElement)

const fov = 75;
const aspect = width / height;
const near = 0.1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near,  far);
camera.position.z = 5;

new OrbitControls(camera, renderer.domElement)

const scene = new THREE.Scene()
const loader = new THREE.TextureLoader();
const geometry = new THREE.IcosahedronGeometry(1, 12);
const material = new THREE.MeshStandardMaterial({
  map: loader.load('./textures/00_earthmap1k.jpg'),
})
const earth = new THREE.Mesh(geometry, material);

const lightsMaterial = new THREE.MeshBasicMaterial({
  map: loader.load('./textures/03_earthlights1k.jpg'),
  blending: THREE.AdditiveBlending
})
const lightMesh = new THREE.Mesh(geometry, lightsMaterial)

const cloudsMaterial = new THREE.MeshStandardMaterial({
  map: loader.load('./textures/04_earthcloudmap.jpg'),
  transparent: true,
  opacity: 0.8,
  blending: THREE.AdditiveBlending,
  alphaMap: loader.load('./textures/05_earthcloudmaptrans.jpg')
})
const cloudsMesh = new THREE.Mesh(geometry, cloudsMaterial)
cloudsMesh.scale.setScalar(1.01)

// const fresnelMaterial = getFresnelMat();
// const glowMesh = new THREE.Mesh(geometry, fresnelMaterial)
// glowMesh.scale.setScalar(1.01)

const earthGroup = new THREE.Group();

earthGroup.add(earth)
earthGroup.add(lightMesh)
earthGroup.add(cloudsMesh)
// earthGroup.add(glowMesh)
earthGroup.rotation.z = -23.4 * Math.PI / 180;
scene.add(earthGroup);

const hemilight = new THREE.HemisphereLight(0xfcfce6, 0x737307, 2)
// scene.add(hemilight)

const sunlight = new THREE.DirectionalLight(0xffffff)
sunlight.position.set(-2, 0.5, 1.5);
sunlight.intensity = 2
scene.add(sunlight);

const stars = getStarfield({numStars: 2000});
scene.add(stars);

function animate() {
  requestAnimationFrame(animate)

  // earth.rotation.x += 0.001;
  earth.rotation.y += 0.002;
  lightMesh.rotation.y += 0.002;
  cloudsMesh.rotation.y += 0.002;
  // glowMesh.rotation.y += 0.002;
  stars.rotation.y -= 0.0004;
  renderer.render(scene, camera)
}
animate()