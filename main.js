// Import Three.js
import * as THREE from 'three';

// Para controle de câmera:
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Para efeito de iluminação no sol:
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

import { Planet } from './Planet.js';

// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Orbit controls for camera movement
const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(-8, -8, 30);
controls.update();

// Set the camera position so the sphere is visible
camera.position.z = 25;

// Load the texture (your 2D image of the planet)
const textureLoader = new THREE.TextureLoader();
textureLoader.load('public/stars_milkway_skybox.jpg', function(texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = texture;
	texture.colorSpace = THREE.SRGBColorSpace;
	texture.needsUpdate = true;
});

const ambientLight = new THREE.AmbientLight(0x333333, 2); // Soft ambient light
scene.add(ambientLight);

const sun = new Planet(5, 'public/2k_sun.jpg', { x: 0, y: 0, z: 0 }, 0, scene, true);
const earth = new Planet(2, 'public/earth_land_cloud.jpg', { x: 8, y: 8, z: 2 }, 0.01, scene, false);

const sunLight = new THREE.PointLight(0xffffff, 1000, 100);
sunLight.castShadow = true;
sunLight.shadow.mapSize.width = 1024;
sunLight.shadow.mapSize.height = 1024;
sunLight.shadow.camera.near = 0.5;
sunLight.shadow.camera.far = 500;
sunLight.position.set(0, 0, 0); // Position the light at the Sun's position
scene.add(sunLight);

// Bloom effect setup
const renderScene = new RenderPass(scene, camera);
const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    1.5, // Bloom strength
    0.4, // Bloom radius
    0.85 // Bloom threshold
);

// Postprocessing composer
const composer = new EffectComposer(renderer);
composer.addPass(renderScene);
composer.addPass(bloomPass);

// Resize window handling
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
}

// Create the render loop
function animate() {
    requestAnimationFrame(animate);

    sun.update();
    earth.update();
    controls.update();
    composer.render(); // Use composer to render with postprocessing


    renderer.render(scene, camera);
}
animate();
