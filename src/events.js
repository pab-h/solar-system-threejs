let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };

function setupMouseEvents() {
    window.addEventListener("mousedown", (e) => {
        isDragging = true;
        previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener("mousemove", (e) => {
        if (isDragging) handleDrag(e);
        handleHover(e);
    });

    window.addEventListener("mouseup", () => (isDragging = false));
    window.addEventListener("click", handleClick);

    window.addEventListener("dblclick", () => {
        for (const soundName in sounds) {
            const sound = sounds[soundName];
            if (!sound.paused) {
                sound.pause();
            }
        }
    });

}

function setupWheelEvent() {
    window.addEventListener("wheel", (e) => {
        cameraDistance = Math.max(5, Math.min(50, cameraDistance - e.deltaY * 0.05));
        spherical.radius = cameraDistance;
        updateCameraPosition();
    });
}

function handleDrag(event) {
    const deltaX = event.clientX - previousMousePosition.x;
    const deltaY = event.clientY - previousMousePosition.y;

    spherical.theta -= deltaX * 0.005;
    spherical.phi = Math.max(rotationLimits.minPolar, Math.min(rotationLimits.maxPolar, spherical.phi - deltaY * 0.005));

    previousMousePosition = { x: event.clientX, y: event.clientY };
    updateCameraPosition();
}

function handleHover(event) {
    updateMousePosition(event);

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(planets.map(({ planet }) => planet).concat(sun));

    if (intersects.length > 0) {
        const { name } = intersects[0].object;
        infoBox.style.display = "block";
        infoBox.style.left = `${event.clientX + 10}px`;
        infoBox.style.top = `${event.clientY + 10}px`;
        infoBox.textContent = astroInfo[name] || "Desconhecido";
    } else {
        infoBox.style.display = "none";
    }
}

function handleClick(event) {
    updateMousePosition(event);

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(planets.map(({ planet }) => planet).concat(sun));

    if (intersects.length > 0) {
        const { name } = intersects[0].object;
        const sound = sounds[name];
        if (sound) toggleSound(sound);
    }
}

function toggleSound(sound) {
    if (sound.paused) {
        sound.play();
    } else {
        sound.pause();
    }
}

function updateMousePosition(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function updateCameraPosition() {
    camera.position.setFromSpherical(spherical);
    camera.lookAt(0, 0, 0);
}

function setupKeyboardEvents() {
    window.addEventListener("keypress", updateSpeedFactor);
}

/**
 * Tecla | Função
 * 's' -> restaura o fator de velocidade. 
 * 'w' -> zera o fator de velocidade. 
 * 'a' -> decrementa o fator de velocidade. Mínimo é 0. 
 * 'd' -> incrementa o faotr de velocidade. O Máximo é 4.
*/

function updateSpeedFactor(e) {
    const {key} = e;

    if (key == "w") {
        speedFactor = 0;
    }

    if (key == "s") {
        speedFactor = 1;
    }

    if (key == "a") {
        speedFactor -= .01;
    }

    if (key == "d") {
        speedFactor += .01;
    }

    speedFactor = Math.max(0, speedFactor);
    speedFactor = Math.min(speedFactor, 4);
}
