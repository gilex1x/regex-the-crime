import * as THREE from 'three';

/**
 * Motor central de Three.js con soporte nativo para renderizado retro pixel-art
 */
export class Engine {
  constructor(canvasContainer) {
    this.container = canvasContainer;
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0a0c10);
    this.scene.fog = new THREE.FogExp2(0x0a0c10, 0.04);

    // Cámara en 1ra persona
    this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 100);
    this.camera.position.set(0, 1.7, 4); // Altura de ojos del detective

    this.scene.add(this.camera);

    // Iluminación global ambiental y direccional clara y atmosférica
    const ambientLight = new THREE.AmbientLight(0xe2e8f0, 1.3);
    this.scene.add(ambientLight);

    const mainSkyLight = new THREE.DirectionalLight(0xbfdbfe, 1.1);
    mainSkyLight.position.set(4, 14, 6);
    this.scene.add(mainSkyLight);

    // Renderer con baja resolución interna (efecto pixel art retro)
    this.renderer = new THREE.WebGLRenderer({
      antialias: false,
      powerPreference: 'high-performance'
    });
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.BasicShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.1;

    // Canvas styling
    this.renderer.domElement.id = 'retro-viewport';
    this.renderer.domElement.style.imageRendering = 'pixelated';
    this.renderer.domElement.style.imageRendering = 'crisp-edges';
    this.container.appendChild(this.renderer.domElement);

    // Ajuste de resolución retro
    this.pixelScale = 3; // Divide la resolución de pantalla para crear píxeles visibles
    this.onResize();
    window.addEventListener('resize', () => this.onResize());

    this.clock = new THREE.Clock();
    this.updateCallbacks = [];
  }

  onResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Resolución interna pixelada
    const renderW = Math.max(320, Math.floor(width / this.pixelScale));
    const renderH = Math.max(180, Math.floor(height / this.pixelScale));

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(renderW, renderH, false);
    this.renderer.domElement.style.width = '100vw';
    this.renderer.domElement.style.height = '100vh';
  }

  setPixelScale(scale) {
    this.pixelScale = Math.max(1, Math.min(5, scale));
    this.onResize();
  }

  onUpdate(cb) {
    this.updateCallbacks.push(cb);
  }

  start() {
    const animate = () => {
      requestAnimationFrame(animate);
      const delta = this.clock.getDelta();
      const time = this.clock.getElapsedTime();

      for (const cb of this.updateCallbacks) {
        cb(time, delta);
      }

      this.renderer.render(this.scene, this.camera);
    };
    animate();
  }
}
