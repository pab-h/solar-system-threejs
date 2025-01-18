function createSun() {
    const sunTexture = textureLoader.load('./assets/textures/sun.jpg');
    const sunGeometry = new THREE.SphereGeometry(2, 32, 32);
    const sunMaterial = new THREE.MeshPhysicalMaterial({
        emissiveMap: sunTexture,
        emissive: 0xffff00,
        emissiveIntensity: 1.2
    });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    sun.name = "Sun";
    return sun;
}