export function createNebula(THREE){

  const geo = new THREE.SphereGeometry(6, 128, 128);

  const mat = new THREE.ShaderMaterial({
    uniforms:{
      time:      { value: 0 },
      intensity: { value: 1 }
    },
    vertexShader:`
      varying vec3 v;
      void main(){
        v = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
      }
    `,
    fragmentShader:`
      uniform float time;
      uniform float intensity;
      varying vec3 v;

      float n(vec3 p){
        return sin(p.x*4.0+time*0.6)*cos(p.y*4.0+time*0.4)*sin(p.z*3.0+time*0.3);
      }

      void main(){
        float noise = n(v) * 0.5 + 0.5;
        float noise2 = n(v * 1.8 + 1.3) * 0.5 + 0.5;

        // 冷银白 + 极淡香槟金，高级黑灰质感
        vec3 c1 = vec3(0.78, 0.80, 0.84);  // cool silver
        vec3 c2 = vec3(0.92, 0.90, 0.85);  // warm white / champagne
        vec3 c3 = vec3(0.55, 0.58, 0.62);  // steel grey

        vec3 col = mix(c1, c2, noise * 0.6);
        col = mix(col, c3, noise2 * 0.5);

        float a = smoothstep(0.25, 0.9, noise) * intensity * 0.28;

        gl_FragColor = vec4(col, a);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide
  });

  return new THREE.Mesh(geo, mat);
}
