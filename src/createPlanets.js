function createPlanets() {
    return planetsConfig
        .map(({ 
            name, 
            size, 
            texture, 
            distance, 
            speed, 
            ring, 
            satellites 
        }) => {
            const planet = createPlanet(
                name, 
                size, 
                texture, 
                distance, 
                ring, 
                satellites
            );

            scene.add(planet.orbit);

            return { ...planet, speed };
        });
}

function createPlanet(name, size, textureURL, distance, ringConfig, satellites) {
    const geometry = new THREE.SphereGeometry(size, 32, 32);
    const material = new THREE.MeshStandardMaterial({ 
        map: textureLoader.load(textureURL),
        metalness: 0.1,
        roughness: 0.8 
    });
    const planet = new THREE.Mesh(geometry, material);
    planet.position.x = distance;
    planet.name = name;

    const orbit = new THREE.Group();
    orbit.add(planet);

    if (ringConfig) {
        const ringGeometry = new THREE.RingGeometry(
            ringConfig.inner,
            ringConfig.outer,
            64
        );

        const ringMaterial = new THREE.MeshBasicMaterial({
            map: textureLoader.load(ringConfig.texture),
            side: THREE.DoubleSide,
            transparent: true,
        });

        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.rotation.x = -Math.PI / 3;

        planet.add(ring);
    }

    if (satellites) {

        satelliteOrbits = []

        for (const satellite of satellites) {
            const satelliteGeometry = new THREE.SphereGeometry(satellite.size, 32, 32);
            const satelliteMaterial = new THREE.MeshStandardMaterial({
                map: textureLoader.load(satellite.texture),
                metalness: 0.1,
                roughness: 0.8 
            });

            const satelliteObject = new THREE.Mesh(satelliteGeometry, satelliteMaterial);

            const satelliteOrbit = new THREE.Group();
            
            satelliteOrbit.position.copy(planet.position);
            satelliteObject.position.set(satellite.distance, 0, 0);
            satelliteOrbit.rotation.z = Math.PI / 3;

            satelliteOrbit.add(satelliteObject);
            orbit.add(satelliteOrbit);

            satelliteOrbits.push(satelliteOrbit);
        }

        planet.satelliteOrbits = satelliteOrbits;

    }

    return { planet, orbit };
}