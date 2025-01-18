
let speedFactor = 1;

// --- Configuração básica ---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

const infoBox = document.getElementById("infoBox");
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

let cameraDistance = 20; 
const spherical = new THREE.Spherical(cameraDistance, Math.PI / 4, Math.PI / 4);
const rotationLimits = { minPolar: 0.3, maxPolar: Math.PI - 0.3 };

// Atualize a posição da câmera com base na configuração inicial
updateCameraPosition();

// --- Iluminação ---
const ambientLight = new THREE.AmbientLight(0x404040, 1.5);
scene.add(ambientLight);

// --- Texturas e informações ---
const textureLoader = new THREE.TextureLoader();
const astroInfo = {
    Sun: "O Sol: Estrela no centro do sistema solar.",
    Mercury: "Mercúrio: O planeta mais próximo do Sol.",
    Venus: "Vênus: O planeta mais quente.",
    Earth: "Terra: Nosso lar.",
    Mars: "Marte: O planeta vermelho.",
    Jupiter: "Júpiter: O maior planeta.",
    Saturn: "Saturno: Famoso por seus anéis.",
    Uranus: "Urano: O planeta inclinado.",
    Neptune: "Netuno: O planeta mais distante.",
};
const sounds = setupSounds();

// --- Objetos na cena ---
const sun = createSun();
scene.add(sun);

// -- Iluminação no sol ---
const sunLight = new THREE.PointLight(0xffffcc, 1.5, 100);
sunLight.position.set(0, 0, 0); 
sun.add(sunLight); 

const universe = createUniverse();
scene.add(universe);

const planets = createPlanets();

// --- Configuração de eventos ---
setupMouseEvents();
setupWheelEvent();
setupKeyboardEvents();

// --- Animação ---
function animate() {
    requestAnimationFrame(animate);

    planets.forEach(({ planet, orbit, speed }) => {
        orbit.rotation.y += speed  * speedFactor;
        planet.rotation.y += 0.01;

        if (planet.satelliteOrbits) {
            for(const satelliteOrbit of planet.satelliteOrbits) {
                satelliteOrbit.rotation.z += 0.05;
            }
        }

    });

    renderer.render(scene, camera);
}

animate();