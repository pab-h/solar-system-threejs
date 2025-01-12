import * as THREE from 'three';

export class Planet {
    constructor(radius, textureUrl, position, rotationSpeed, scene, lightEmissive) {
        // Create the planet geometry (a sphere)
        this.geometry = new THREE.SphereGeometry(radius, 32, 32);

        // Load the texture
        if(lightEmissive){
        const loader = new THREE.TextureLoader();
            loader.load(textureUrl, (texture) => {
                this.material = new THREE.MeshPhysicalMaterial({
                    emissiveMap: texture,
                    emissive: new THREE.Color(0xffff00), // Bright yellow
                    emissiveIntensity: 1.5, // Make the sun glow more 
                });

            // Create the planet mesh
            this.mesh = new THREE.Mesh(this.geometry, this.material);

            // Set position
            this.mesh.position.set(position.x, position.y, position.z);

            // Add the planet to the scene
            scene.add(this.mesh);
        });
    } else {
        const loader = new THREE.TextureLoader();
        loader.load(textureUrl, (texture) => {
            this.material = new THREE.MeshPhysicalMaterial({
                map: texture,
                color: (0xffffff),
            });

        // Create the planet mesh
        this.mesh = new THREE.Mesh(this.geometry, this.material);

        // Set position
        this.mesh.position.set(position.x, position.y, position.z);

        // Add the planet to the scene
        scene.add(this.mesh);
    });
    }
        // Rotation speed
        this.rotationSpeed = rotationSpeed || 0;
    }

    // Update the planet's rotation
    update() {
        if (this.mesh && this.rotationSpeed != 0) {
            this.mesh.rotation.y += this.rotationSpeed;
        }
    }
}
