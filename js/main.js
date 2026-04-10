import { createNebula } from "./nebula.js";

const canvas = document.getElementById("webgl");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 1000);
camera.position.set(0, 0, 8);

const nebula = createNebula(THREE);
scene.add(nebula);

// 星星粒子 — 冷白，稀疏，高级
const starGeo = new THREE.BufferGeometry();
const starCount = 800;
const positions = new Float32Array(starCount * 3);
const sizes = new Float32Array(starCount);
for(let i = 0; i < starCount; i++){
  positions[i*3]   = (Math.random() - 0.5) * 50;
  positions[i*3+1] = (Math.random() - 0.5) * 50;
  positions[i*3+2] = (Math.random() - 0.5) * 50;
  sizes[i] = Math.random() * 0.04 + 0.01;
}
starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
const starMat = new THREE.PointsMaterial({
  color: 0xe8eaed,
  size: 0.04,
  transparent: true,
  opacity: 0.55,
  sizeAttenuation: true
});
scene.add(new THREE.Points(starGeo, starMat));

let t = 0;
function animate(){
  requestAnimationFrame(animate);
  t += 0.005;

  nebula.material.uniforms.time.value += 0.008;
  nebula.rotation.y = t * 0.12;
  nebula.rotation.x = Math.sin(t * 0.07) * 0.15;

  camera.position.x = Math.sin(t * 0.2) * 0.8;
  camera.position.y = Math.cos(t * 0.15) * 0.4;
  camera.lookAt(0, 0, 0);

  renderer.render(scene, camera);
}
animate();

addEventListener("resize", () => {
  renderer.setSize(innerWidth, innerHeight);
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
});
