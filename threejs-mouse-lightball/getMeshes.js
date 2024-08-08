import * as THREE from 'three'

export function getBody() {
    const size = 0.5;
    const range = 3;

    const x = Math.random() * range - 1 ;
    const y = Math.random() * range - 1 ;
    const z = Math.random() * range - 1 ;

    // console.log('x: ', x, ', y: ', y, ', z: ', z)
    const geometry = new THREE.IcosahedronGeometry(size, 1);
    const material = new THREE.MeshStandardMaterial({
        color: 0x00ff00,
        flatShading: true
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = x;
    mesh.position.y = y;
    mesh.position.z = z;
    return {mesh};
}

export function getMouseBall() {
    const mouseBallSize = 0.3;
    const geometry = new THREE.IcosahedronGeometry(mouseBallSize, 8);
    const material = new THREE.MeshStandardMaterial({
        emissive: 0xffffff
    });
    const mouseMesh = new THREE.Mesh(geometry, material);
    
    const mouseLight = new THREE.PointLight(0xffffff, 2);

    mouseMesh.add(mouseLight);

    function update(mousePosition) {
        const mouseDistanceFromLight = 1;
        let {x, y, z} = { x: mousePosition.x * mouseDistanceFromLight, y: mousePosition.y * mouseDistanceFromLight, z: mousePosition.z * mouseDistanceFromLight};

        mouseMesh.position.set(x, y, z)
    }
    return {mouseMesh, update}
}