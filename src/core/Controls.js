import * as THREE from 'three';

/**
 * Controlador en Primera Persona con Pointer Lock, teclado WASD y detección de colisiones AABB
 */
export class Controls {
  constructor(camera, domElement, audioManager) {
    this.camera = camera;
    this.domElement = domElement;
    this.audio = audioManager;

    this.isLocked = false;
    this.isEnabled = true;

    // Teclas presionadas
    this.moveForward = false;
    this.moveBackward = false;
    this.moveLeft = false;
    this.moveRight = false;
    this.isSprinting = false;

    this.velocity = new THREE.Vector3();
    this.direction = new THREE.Vector3();

    // Rotación de la cámara (pitch y yaw)
    this.euler = new THREE.Euler(0, 0, 0, 'YXZ');
    this.minPolarAngle = 0.05; // Límite para mirar arriba
    this.maxPolarAngle = Math.PI - 0.05; // Límite para mirar abajo

    this.stepTimer = 0;
    this.colliders = [];
    this.hasStarted = false;

    this.setupPointerLock();
    this.setupKeyboard();
  }

  setColliders(colliders) {
    this.colliders = colliders || [];
  }

  setupPointerLock() {
    const blocker = document.getElementById('instructions-overlay');
    const startBtn = document.getElementById('btn-start-investigation');

    const startGame = () => {
      this.hasStarted = true;
      if (blocker) {
        blocker.style.display = 'none';
      }
      this.domElement.focus();
      try {
        this.domElement.requestPointerLock();
      } catch (err) {
        console.warn("Pointer lock no activado:", err);
      }
    };

    if (startBtn) {
      startBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        startGame();
      });
    }

    if (blocker) {
      blocker.addEventListener('click', () => {
        startGame();
      });
    }

    // Soporte para arrastrar con el mouse si PointerLock no está disponible
    this.isMouseDown = false;
    this.domElement.addEventListener('mousedown', (e) => {
      if (e.button === 0) this.isMouseDown = true;
    });
    window.addEventListener('mouseup', () => {
      this.isMouseDown = false;
    });

    // Al hacer clic en el canvas del juego una vez iniciado, reanudar Pointer Lock
    this.domElement.addEventListener('click', () => {
      if (this.hasStarted && this.isEnabled && !this.isLocked) {
        try {
          this.domElement.requestPointerLock();
        } catch (err) {
          console.warn("Pointer lock no activado:", err);
        }
      }
    });

    document.addEventListener('pointerlockchange', () => {
      this.isLocked = document.pointerLockElement === this.domElement;
    });

    document.addEventListener('mousemove', (event) => {
      if (!this.isEnabled) return;
      // Si está bloqueado el puntero, o si se mantiene pulsado el ratón (arrastrar)
      if (!this.isLocked && !this.isMouseDown) return;

      const movementX = event.movementX || 0;
      const movementY = event.movementY || 0;

      this.euler.setFromQuaternion(this.camera.quaternion);

      this.euler.y -= movementX * 0.0022;
      this.euler.x -= movementY * 0.0022;

      // Limitar ángulo de inclinación vertical (no rotar 360 grados de cabeza)
      this.euler.x = Math.max(Math.PI / 2 - this.maxPolarAngle, Math.min(Math.PI / 2 - this.minPolarAngle, this.euler.x));

      this.camera.quaternion.setFromEuler(this.euler);
    });
  }

  setupKeyboard() {
    const onKeyDown = (event) => {
      if (!this.isEnabled) return;
      if (event.target && (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA' || event.target.isContentEditable)) {
        return;
      }

      switch (event.code) {
        case 'KeyW':
        case 'ArrowUp':
          this.moveForward = true;
          break;
        case 'KeyS':
        case 'ArrowDown':
          this.moveBackward = true;
          break;
        case 'KeyA':
        case 'ArrowLeft':
          this.moveLeft = true;
          break;
        case 'KeyD':
        case 'ArrowRight':
          this.moveRight = true;
          break;
        case 'ShiftLeft':
        case 'ShiftRight':
          this.isSprinting = true;
          break;
      }
    };

    const onKeyUp = (event) => {
      switch (event.code) {
        case 'KeyW':
        case 'ArrowUp':
          this.moveForward = false;
          break;
        case 'KeyS':
        case 'ArrowDown':
          this.moveBackward = false;
          break;
        case 'KeyA':
        case 'ArrowLeft':
          this.moveLeft = false;
          break;
        case 'KeyD':
        case 'ArrowRight':
          this.moveRight = false;
          break;
        case 'ShiftLeft':
        case 'ShiftRight':
          this.isSprinting = false;
          break;
      }
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
  }

  unlock() {
    if (document.exitPointerLock) {
      document.exitPointerLock();
    }
    this.isLocked = false;
  }

  setEnabled(enabled) {
    this.isEnabled = enabled;
    if (!enabled) {
      this.moveForward = false;
      this.moveBackward = false;
      this.moveLeft = false;
      this.moveRight = false;
      this.velocity.set(0, 0, 0);
    }
  }

  update(delta) {
    if (!this.isEnabled || (!this.isLocked && !this.hasStarted)) return;

    // Fricción / desaceleración
    this.velocity.x -= this.velocity.x * 10.0 * delta;
    this.velocity.z -= this.velocity.z * 10.0 * delta;

    this.direction.z = Number(this.moveForward) - Number(this.moveBackward);
    this.direction.x = Number(this.moveRight) - Number(this.moveLeft);
    this.direction.normalize();

    const speed = this.isSprinting ? 6.5 : 4.0;

    if (this.moveForward || this.moveBackward) {
      this.velocity.z -= this.direction.z * speed * 8.0 * delta;
    }
    if (this.moveLeft || this.moveRight) {
      this.velocity.x += this.direction.x * speed * 8.0 * delta;
    }

    // Calcular desplazamiento según la orientación de la cámara
    const forward = new THREE.Vector3(0, 0, -1).applyEuler(new THREE.Euler(0, this.euler.y, 0));
    const side = new THREE.Vector3(1, 0, 0).applyEuler(new THREE.Euler(0, this.euler.y, 0));

    const moveVector = new THREE.Vector3()
      .addScaledVector(forward, -this.velocity.z * delta)
      .addScaledVector(side, this.velocity.x * delta);

    // Posición tentativa del jugador
    const targetPos = this.camera.position.clone().add(moveVector);

    // Bounding Box del detective (radio 0.4m, altura 1.8m)
    const playerRadius = 0.35;
    const playerBoxX = new THREE.Box3(
      new THREE.Vector3(targetPos.x - playerRadius, 0.1, this.camera.position.z - playerRadius),
      new THREE.Vector3(targetPos.x + playerRadius, 1.8, this.camera.position.z + playerRadius)
    );
    const playerBoxZ = new THREE.Box3(
      new THREE.Vector3(this.camera.position.x - playerRadius, 0.1, targetPos.z - playerRadius),
      new THREE.Vector3(this.camera.position.x + playerRadius, 1.8, targetPos.z + playerRadius)
    );

    // Comprobar colisiones eje X y eje Z por separado para permitir deslizarse por paredes
    let canMoveX = true;
    let canMoveZ = true;

    for (const box of this.colliders) {
      if (box.intersectsBox(playerBoxX)) canMoveX = false;
      if (box.intersectsBox(playerBoxZ)) canMoveZ = false;
    }

    if (canMoveX) this.camera.position.x = targetPos.x;
    if (canMoveZ) this.camera.position.z = targetPos.z;

    // Efecto de pasos sonoros
    const isMoving = (this.moveForward || this.moveBackward || this.moveLeft || this.moveRight);
    if (isMoving) {
      this.stepTimer += delta * (this.isSprinting ? 2.8 : 2.0);
      if (this.stepTimer >= 1.0) {
        this.stepTimer = 0;
        this.audio.playFootstep();
      }
    } else {
      this.stepTimer = 0.8;
    }
  }
}
