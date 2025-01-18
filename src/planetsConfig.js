const planetsConfig = [
    { 
        name: "Mercury", 
        size: 0.3, 
        texture: './assets/textures/mercury.jpg', 
        distance: 4, 
        speed: 0.02 
    },
    { 
        name: "Venus", 
        size: 0.6, 
        texture: './assets/textures/venus.jpg', 
        distance: 6, 
        speed: 0.015 
    },
    { 
        name: "Earth", 
        size: 0.63, 
        texture: './assets/textures/earth.jpg', 
        distance: 8, 
        speed: 0.01,
        satellites: [
            {
                name: "Moon", 
                size: 0.25, 
                texture: './assets/textures/moon.jpg', 
                distance: 1, 
            }
        ]
    },
    { 
        name: "Mars", 
        size: 0.34, 
        texture: './assets/textures/mars.jpg', 
        distance: 10, 
        speed: 0.008 
    },
    { 
        name: "Jupiter", 
        size: 1.4, 
        texture: './assets/textures/jupiter.jpg', 
        distance: 15, 
        speed: 0.005 
    },
    { 
        name: "Saturn", 
        size: 1.2, 
        texture: './assets/textures/saturn.jpg', 
        distance: 20, 
        speed: 0.004,
        ring: { 
            inner: 1.7, 
            outer: 2.5, 
            texture: './assets/textures/saturnring.png' 
        } 
    },
    { 
        name: "Uranus", 
        size: 0.8, 
        texture: './assets/textures/uranus.jpg', 
        distance: 25, 
        speed: 0.003 
    },
    { 
        name: "Neptune", 
        size: 0.78, 
        texture: './assets/textures/neptune.jpg', 
        distance: 30, 
        speed: 0.002 
    },
];