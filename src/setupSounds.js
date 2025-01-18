function setupSounds() {
    const sounds = {
        Sun: new Audio('./assets/sounds/sun.mp3'),
        Mercury: new Audio('./assets/sounds/mercury.mp3'),
        Venus: new Audio('./assets/sounds/venus.mp3'),
        Earth: new Audio('./assets/sounds/earth.mp3'),
        Mars: new Audio('./assets/sounds/mars.mp3'),
        Jupiter: new Audio('./assets/sounds/jupiter.mp3'),
        Saturn: new Audio('./assets/sounds/saturn.mp3'),
        Uranus: new Audio('./assets/sounds/uranus.mp3'),
        Neptune: new Audio('./assets/sounds/neptune.mp3'),
    };
    for (const sound in sounds) sounds[sound].loop = true;
    return sounds;
}