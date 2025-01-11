// Import Three.js
import * as THREE from 'three';

//Para efeito de iluminação no sol:
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();



renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Load the texture (your 2D image of the planet)
const textureLoader = new THREE.TextureLoader();
const earthTexture = textureLoader.load('public/2k_sun.jpg');
// 2k_sun.jpg
//earth_land_cloud.jpg

textureLoader.load('public/stars_milkway_skybox.jpg', function(texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = texture;
	texture.colorSpace = THREE.SRGBColorSpace;
	texture.needsUpdate = true;
});


// Earth's geometry and material
const sphereGeometry = new THREE.SphereGeometry(5, 32, 32); // Radius 5, 32 segments
const sphereMaterial = new THREE.MeshBasicMaterial({ map: earthTexture });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

// Add the sphere to the scene
scene.add(sphere);

const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight), 
    1.5, // Strength of bloom
    0.4, // Radius
    0.85 // Threshold
);
composer.addPass(bloomPass);

const ambientLight = new THREE.AmbientLight(0x333333); // Soft ambient light
scene.add(ambientLight);

const sunLight = new THREE.PointLight(0xffffff, 1, 100);
sunLight.position.set(0, 0, 0); // Position the light at the Sun's position
scene.add(sunLight);

// Set the camera position so the sphere is visible
camera.position.z = 20;

// Create the render loop
function animate() {
    requestAnimationFrame(animate);
    sphere.rotation.y += 0.005; // Optional: Rotate the sphere for a spinning effect
    renderer.render(scene, camera);
}
animate();
