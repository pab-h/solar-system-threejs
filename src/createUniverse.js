function createUniverse() {
    const starsTexture = textureLoader.load('./assets/textures/stars.jpg');
    const universeGeometry = new THREE.SphereGeometry(100, 64, 64);
    const universeMaterial = new THREE.MeshBasicMaterial({
        map: starsTexture,
        side: THREE.BackSide,
    });
    return new THREE.Mesh(universeGeometry, universeMaterial);
}