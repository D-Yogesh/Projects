import * as THREE from 'three'

const sceneMiddle = new THREE.Vector3(0, 0,0);

export function getBody(RAPIER, world) {
    const size = 0.2 + Math.random() * 0.5;
    const range = 6;

    const x = Math.random() * range - range * 0.5 ;
    const y = Math.random() * range - range * 0.5 + 3 ;
    const z = Math.random() * range - range * 0.5 ;

    // console.log('x: ', x, ', y: ', y, ', z: ', z)

    let rigidBodyDescription = RAPIER.RigidBodyDesc.dynamic().setTranslation(x, y, z);
    let rigid = world.createRigidBody(rigidBodyDescription);
    let colliderDescription = RAPIER.ColliderDesc.ball(size).setDensity(size)
    world.createCollider(colliderDescription, rigid)

    const geometry = new THREE.IcosahedronGeometry(size, 1);
    const material = new THREE.MeshStandardMaterial({
        color: 0x00ff00,
        flatShading: true
    });

    const mesh = new THREE.Mesh(geometry, material);

    function update() {
        rigid.resetForces(true);
        let {x, y, z} = rigid.translation();
        let pos = new THREE.Vector3(x, y, z);
        let dir = pos.clone().sub(sceneMiddle).normalize();
        rigid.addForce(dir.multiplyScalar(-5), true);
        mesh.position.set(x, y, z);
    }
    return { mesh, rigid, update };
}

export function getMouseBall(RAPIER, world) {
    const mouseBallSize = 0.5;
    const geometry = new THREE.IcosahedronGeometry(mouseBallSize, 8);
    const material = new THREE.MeshStandardMaterial({
        emissive: 0xffffff
    });
    const mouseMesh = new THREE.Mesh(geometry, material);
    
    const mouseLight = new THREE.PointLight(0xffffff, 2);

    mouseMesh.add(mouseLight);

    let mouseBodyDescription = RAPIER.RigidBodyDesc.kinematicPositionBased().setTranslation(0, 0, 0);
    let mouseRigidBody = world.createRigidBody(mouseBodyDescription);
    let dynamicCollider = RAPIER.ColliderDesc.ball(mouseBallSize * 3);
    world.createCollider(dynamicCollider, mouseRigidBody)

    function update(mousePosition) {
        mouseRigidBody.setTranslation({
            x: mousePosition.x ,
            y: mousePosition.y ,
            z: 0.2})
        let {x, y, z} = mouseRigidBody.translation();
        mouseMesh.position.set(x, y, z)
    }
    return {mouseMesh, update}
}