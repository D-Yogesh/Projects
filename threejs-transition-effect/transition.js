import * as THREE from "three";
import { TWEEN } from "https://cdn.jsdelivr.net/npm/three@0.131/examples/jsm/libs/tween.module.min.js";
const transitionParams = {
  // useTexture: true,
  transition: 0,
  texture: 5,
  cycle: true,
  animate: true,
  // threshold: 0.3,
};

export function getTransition (renderer, sceneA, sceneB) {
  const width = window.innerWidth;
  const height = window.innerHeight;

  const camera =  new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, -10, 10);

  const textures = []
  const loader = new THREE.TextureLoader();

  for(let i = 0; i < 3; i++){
    textures[i] = loader.load(`./img/transition${i}.png`);
  }

  const material = new THREE.ShaderMaterial({
    uniforms: {
      tDiffuse1: {
        value: null,
      },
      tDiffuse2: {
        value: null,
      },
      mixRatio: {
        value: 0.0,
      },
      threshold: {
        value: 0.1,
      },
      useTexture: {
        value: 1,
      },
      tMixTexture: {
        value: textures[0],
      },
    },
    vertexShader: `varying vec2 vUv;
    void main() {
      vUv = vec2( uv.x, uv.y );
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

    }`,
    fragmentShader: `
      uniform float mixRatio;
      uniform sampler2D tDiffuse1;
      uniform sampler2D tDiffuse2;
      uniform sampler2D tMixTexture;
      uniform int useTexture;
      uniform float threshold;
      varying vec2 vUv;

      void main() {
      	vec4 texel1 = texture2D( tDiffuse1, vUv );
      	vec4 texel2 = texture2D( tDiffuse2, vUv );

      	if (useTexture == 1) {
      		vec4 transitionTexel = texture2D( tMixTexture, vUv );
      		float r = mixRatio * (1.0 + threshold * 2.0) - threshold;
      		float mixf=clamp((transitionTexel.r - r)*(1.0/threshold), 0.0, 1.0);

      		gl_FragColor = mix( texel1, texel2, mixf );
      	} else {
      		gl_FragColor = mix( texel2, texel1, mixRatio );
      	}
      }`,
  });

  const geometry = new  THREE.PlaneGeometry(width, height);
  const mesh =  new THREE.Mesh(geometry, material);
  
  const scene = new THREE.Scene();
  scene.add(mesh);

  material.uniforms.tDiffuse1.value = sceneA.fbo.texture;
  material.uniforms.tDiffuse2.value = sceneB.fbo.texture;

  new TWEEN.Tween(transitionParams)
    .to({transition: 1}, 4500)
    .repeat(Infinity)
    .delay(2000)
    .yoyo(true)
    .start();

  let needsTextureChange = false;
  const render = (delta) => {
    TWEEN.update();
    if(transitionParams.transition == 0 || transitionParams.transition == 1) {
      transitionParams.texture = (transitionParams.texture + 1) % textures.length;
      material.uniforms.tMixTexture.value = textures[transitionParams.texture];
    }

    // if (transitionParams.animate) {
    //   TWEEN.update();

    //   // Change the current alpha texture after each transition
    //   if (transitionParams.cycle) {
    //     if (
    //       transitionParams.transition == 0 ||
    //       transitionParams.transition == 1
    //     ) {
    //       if (needsTextureChange) {
    //         transitionParams.texture =
    //           (transitionParams.texture + 1) % textures.length;
    //         material.uniforms.tMixTexture.value =
    //           textures[transitionParams.texture];
    //         needsTextureChange = false;
    //       }
    //     } else {
    //       needsTextureChange = true;
    //     }
    //   } else {
    //     needsTextureChange = true;
    //   }
    // }

    material.uniforms.mixRatio.value = transitionParams.transition;

    if(transitionParams.transition === 0) {
      sceneA.update(delta);
      sceneB.render(delta, false);
    }
    else if(transitionParams.transition === 1) {
      sceneA.render(delta, false);
      sceneB.update(delta);
    }
    else {
      sceneA.render(delta, true);
      sceneB.render(delta, true);

      renderer.setRenderTarget(null);
      renderer.render(scene, camera);
    }
  }

  return {render};
}