import * as THREE from 'three'
import {OrbitControls} from 'jsm/controls/OrbitControls.js'

const renderer = new THREE.WebGLRenderer({antialias: true});
const width = window.innerWidth;
const height = window.innerHeight;
renderer.setSize(width, height)
document.body.appendChild(renderer.domElement)

const fov = 75; //camera's view angle for capturing view
const aspect = width / height;
const near = 0.1; //less than this value object will not be visible
const far = 10; // beyond this value object will not be visible
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 10;

const scene = new THREE.Scene();

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true;
controls.dampingFactor = 0.01;

const geometry = new THREE.IcosahedronGeometry(4.0, 2); //geometry of an object
const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    flatShading: true
}); // its about defining the appearance of the geometry like color.
const mesh = new THREE.Mesh(geometry, material); //mesh is responsible for putting material on geometry
scene.add(mesh)

const wireMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true
})
const wireMesh = new THREE.Mesh(geometry, wireMaterial);
wireMesh.scale.setScalar(1.001)
scene.add(wireMesh);

const hemilight = new THREE.HemisphereLight(0x0099ff, 0xaa5500);
scene.add(hemilight)

const points = [
    new THREE.Vector3(-10, 0, 0),
    new THREE.Vector3(0, 10, 0),
    new THREE.Vector3(10, 0, 0),
    new THREE.Vector3(-10, 0, 0)
];
const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
const lineMaterial = new THREE.LineBasicMaterial({color: 0x0000ff})
const line = new THREE.Line(lineGeometry, lineMaterial);
scene.add(line);
// let t = 0;
function animate() {
    // mesh.scale.setScalar(Math.cos(t * 0.001) + 1.0);
    // t+=10;
    wireMesh.rotation.x += 0.001;
    wireMesh.rotation.y += 0.001;

    mesh.rotation.x += 0.001;
    mesh.rotation.y += 0.001;

    renderer.render(scene, camera);
    controls.update()
}

renderer.setAnimationLoop(animate)
// renderer.render(scene, camera);