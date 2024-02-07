import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

//Scene View =============================================
const scene = new THREE.Scene();

//Perspective Camera ======================================
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(2, 5, 2); 
camera.rotation.x = THREE.MathUtils.degToRad(-60);
//Renderer ==============================================
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//Load Models >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//Ground ==============================================

const planeGeometry = new THREE.PlaneGeometry(200, 200);

const planeMaterial = new THREE.MeshBasicMaterial({color: 0x222222, side: THREE.DoubleSide});

const plane = new THREE.Mesh(planeGeometry, planeMaterial);

plane.rotation.x = -Math.PI / 2;

plane.position.y = -1

scene.add(plane);

//Tank ================================================
const loader = new GLTFLoader();

let tank;
loader.load('./models/Tank.glb', (gltf) => {

  tank = gltf.scene;
  tank.position.y = -0.2;
  tank.scale.set(1, 1, 1);
  scene.add(tank);
});

//Wall ==================================================
let wall;
loader.load('./models/Wall.glb', (gltf) => {

  wall = gltf.scene;
  wall.position.y = -0.5;
  wall.scale.set(0.5, 0.5, 0.5); 
  scene.add(wall);
});

const camRadius = 5;
let camAngle = 0;

//Lighting ==============================================
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

//Handle window resize ================================================
window.addEventListener('resize', () => {

  const newWidth = window.innerWidth;
  const newHeight = window.innerHeight;

  camera.aspect = newWidth / newHeight;

  camera.updateProjectionMatrix();
  renderer.setSize(newWidth, newHeight);
});

//Movement ================================================
window.addEventListener('keydown', (event) => {
  if (event.key === 'w' || event.key === 'W') {
    
    if (tank) {
      const speed = 0.5;
      const forwardVector = new THREE.Vector3(0, 0, +speed);
      tank.position.add(forwardVector);
      camera.position.add(forwardVector);
    }
  }
  if (event.key === 's' || event.key === 'S') {
    
    if (tank) {
      const speed = 0.5;
      const backwardVector = new THREE.Vector3(0, 0, -speed);
      tank.position.add(backwardVector);
      camera.position.add(backwardVector);
    }
  }
});

// Animation loop =====================================================
const animate = () => {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
};

animate();