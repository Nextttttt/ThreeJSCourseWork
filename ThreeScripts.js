import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

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
let wall1, wall2;
loader.load('./models/Wall.glb', (gltf) => {

  wall1 = gltf.scene;
  wall1.position.x = -3;
  wall1.scale.set(0.5, 0.5, 0.5); 
  scene.add(wall1);
});

loader.load('./models/Wall.glb', (gltf) => {

  wall2 = gltf.scene;
  wall2.position.x = 4;
  wall2.position.z = -5;
  wall2.rotation.y = 30;
  wall2.scale.set(0.5, 0.5, 0.5); 
  scene.add(wall2);
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
      const forwardVector = new THREE.Vector3(+speed, 0, 0);
      tank.position.add(forwardVector);
      camera.position.add(forwardVector);
    }
  }
  if (event.key === 's' || event.key === 'S') {
    
    if (tank) {
      const speed = 0.5;
      const backwardVector = new THREE.Vector3(-speed, 0, 0);
      tank.position.add(backwardVector);
      camera.position.add(backwardVector);
    }
  }
});
// Orbite ==============================================================================

const controls = new OrbitControls(camera, renderer.domElement);

controls.enableZoom = true; // Enable zooming
controls.enablePan = true;  // Enable panning
controls.maxPolarAngle = Math.PI / 2; // Prevent the camera from going below the ground

controls.rotateSpeed = 1.0;
controls.zoomSpeed = 1.2;
controls.panSpeed = 0.8;

// Animation ==============================================================================
const animate = () => {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
};

animate();