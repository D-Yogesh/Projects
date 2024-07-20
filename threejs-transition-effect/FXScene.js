import * as THREE from 'three';

const objectCount = 8000;
function getMeshProps() {
    const arr = [];
    for(let i = 0; i < objectCount; i++) {
        arr.push({
            position: {
                x: Math.random() * 10000 - 5000,
                y: Math.random() * 6000 - 3000,
                z: Math.random() * 8000 - 4000
            },
            rotation: {
                x: Math.random() * 2 * Math.PI,
                y: Math.random() * 2 * Math.PI,
                z: Math.random() * 2 * Math.PI
            },
            scale: Math.random() * 200 + 100
        })
    }
    return arr;
}

const objectsProps = getMeshProps();
function getMesh(material, needsAnimatedColor = false) {
    const size = 0.25;
    const geometry = new THREE.IcosahedronGeometry(size, 1);
    const mesh = new THREE.InstancedMesh(geometry, material, objectCount);

    const dummy = new THREE.Object3D();
    for(let i = 0; i < objectCount; i++) {
        const props = objectsProps[i];
        dummy.position.x = props.position.x;
        dummy.position.y = props.position.y;
        dummy.position.z = props.position.z;

        dummy.rotation.x = props.rotation.x;
        dummy.rotation.y = props.rotation.y;
        dummy.rotation.z = props.rotation.z;

        dummy.scale.set(props.scale, props.scale, props.scale);

        dummy.updateMatrix();

        mesh.setMatrixAt(i, dummy.matrix);
    }
    return mesh;
}

export function getFXScene(camera, renderer, material) {
    // const width = window.innerWidth;
    // const height = window.innerHeight;
    // const camera = new THREE.PerspectiveCamera(75, width / height, 1, 1000);
    // camera.position.z = 100;

    const scene = new THREE.Scene();

    const hemilight = new THREE.HemisphereLight(0xffffff, 0x555555, 1);
    scene.add(hemilight);

    const mesh = getMesh(material);
    scene.add(mesh)
    renderer.setAnimationLoop(() => {
        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.01;
        // mesh.rotation.z += 0.01;
        renderer.render(scene, camera)
    })
}