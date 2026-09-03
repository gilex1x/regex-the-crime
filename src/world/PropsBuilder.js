import * as THREE from 'three';

/**
 * Generador procedural de texturas pixel art y props 3D low-poly para estética indie retro
 */
export class PropsBuilder {
  /**
   * Crea una textura pixelada procedural a partir de una función de pintado en canvas
   */
  static createPixelTexture(width, height, drawFn) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    drawFn(ctx, width, height);

    const texture = new THREE.CanvasTexture(canvas);
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
  }

  /**
   * Textura de ladrillo oscuro estilo callejón noir
   */
  static getBrickTexture() {
    return this.createPixelTexture(32, 32, (ctx, w, h) => {
      ctx.fillStyle = '#1c1b22';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#121118';
      // Mortero
      for (let y = 0; y < h; y += 8) {
        ctx.fillRect(0, y, w, 1);
      }
      for (let y = 0; y < h; y += 16) {
        for (let x = 0; x < w; x += 16) ctx.fillRect(x, y, 1, 8);
        for (let x = 8; x < w; x += 16) ctx.fillRect(x, y + 8, 1, 8);
      }
      // Ruido pixelado
      for (let i = 0; i < 40; i++) {
        ctx.fillStyle = Math.random() > 0.5 ? '#272530' : '#0f0e14';
        ctx.fillRect(Math.floor(Math.random() * w), Math.floor(Math.random() * h), 1, 1);
      }
    });
  }

  /**
   * Textura de asfalto mojado con charcos
   */
  static getAsphaltTexture() {
    return this.createPixelTexture(32, 32, (ctx, w, h) => {
      ctx.fillStyle = '#0d0f12';
      ctx.fillRect(0, 0, w, h);
      for (let i = 0; i < 60; i++) {
        const val = Math.floor(10 + Math.random() * 20);
        ctx.fillStyle = `rgb(${val}, ${val + 2}, ${val + 5})`;
        ctx.fillRect(Math.floor(Math.random() * w), Math.floor(Math.random() * h), 2, 2);
      }
    });
  }

  /**
   * Textura de cinta policial 'CRIME SCENE DO NOT CROSS'
   */
  static getPoliceTapeTexture() {
    return this.createPixelTexture(128, 16, (ctx, w, h) => {
      ctx.fillStyle = '#eab308';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#000000';
      ctx.font = 'bold 9px monospace';
      ctx.fillText('CRIME SCENE • DO NOT CROSS • POLICE', 4, 11);
    });
  }

  /**
   * Textura de papel envejecido para notas
   */
  static getPaperTexture(text = 'EVIDENCIA') {
    return this.createPixelTexture(64, 64, (ctx, w, h) => {
      ctx.fillStyle = '#e2d5b5';
      ctx.fillRect(0, 0, w, h);
      // Bordes envejecidos
      ctx.fillStyle = '#b8a682';
      ctx.strokeRect(1, 1, w - 2, h - 2);
      // Líneas de texto simuladas
      ctx.fillStyle = '#4a4031';
      for (let y = 14; y < h - 10; y += 6) {
        ctx.fillRect(6, y, Math.floor(Math.random() * 20 + 35), 2);
      }
      // Marca de sangre o sello
      ctx.fillStyle = 'rgba(180, 20, 20, 0.4)';
      ctx.fillRect(40, 40, 14, 14);
    });
  }

  /**
   * Textura de azulejos clínicos para la morgue / laboratorio
   */
  static getHospitalTileTexture() {
    return this.createPixelTexture(32, 32, (ctx, w, h) => {
      ctx.fillStyle = '#1e292b';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#101718'; // Juntas de azulejos
      for (let y = 0; y < h; y += 8) ctx.fillRect(0, y, w, 1);
      for (let x = 0; x < w; x += 8) ctx.fillRect(x, 0, 1, h);
      // Manchas y reflejos cerámicos
      for (let i = 0; i < 25; i++) {
        ctx.fillStyle = Math.random() > 0.6 ? '#2a3a3d' : '#142022';
        ctx.fillRect(Math.floor(Math.random() * w), Math.floor(Math.random() * h), 2, 2);
      }
    });
  }

  /**
   * Textura de metal acanalado industrial para contenedores de los muelles
   */
  static getContainerMetalTexture() {
    return this.createPixelTexture(32, 32, (ctx, w, h) => {
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(0, 0, w, h);
      // Corrugación vertical
      for (let x = 0; x < w; x += 4) {
        ctx.fillStyle = x % 8 === 0 ? '#334155' : '#0f172a';
        ctx.fillRect(x, 0, 2, h);
      }
      // Óxido y suciedad portuaria
      for (let i = 0; i < 30; i++) {
        ctx.fillStyle = Math.random() > 0.5 ? '#7c2d12' : '#451a03';
        ctx.fillRect(Math.floor(Math.random() * w), Math.floor(Math.random() * h), 1, 1);
      }
    });
  }

  /**
   * Textura de sillería de piedra rúnica para el santuario subterráneo
   */
  static getRuneStoneTexture() {
    return this.createPixelTexture(32, 32, (ctx, w, h) => {
      ctx.fillStyle = '#120f17';
      ctx.fillRect(0, 0, w, h);
      // Bloques de sillería
      ctx.fillStyle = '#0a080d';
      for (let y = 0; y < h; y += 8) ctx.fillRect(0, y, w, 1);
      for (let x = 0; x < w; x += 16) ctx.fillRect(x, 0, 1, h);
      // Grietas y símbolos rúnicos rojos tenues
      for (let i = 0; i < 20; i++) {
        ctx.fillStyle = Math.random() > 0.7 ? '#4a1525' : '#1c1624';
        ctx.fillRect(Math.floor(Math.random() * w), Math.floor(Math.random() * h), 1, 2);
      }
    });
  }

  /**
   * Textura de parquet victoriano de caoba para la Mansión / Club Privado
   */
  static getWoodParquetTexture() {
    return this.createPixelTexture(32, 32, (ctx, w, h) => {
      ctx.fillStyle = '#2e1810';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#1a0d08';
      for (let y = 0; y < h; y += 8) ctx.fillRect(0, y, w, 1);
      for (let x = 0; x < w; x += 16) ctx.fillRect(x, 0, 1, h);
      for (let i = 0; i < 30; i++) {
        ctx.fillStyle = Math.random() > 0.5 ? '#3b2015' : '#22120b';
        ctx.fillRect(Math.floor(Math.random() * w), Math.floor(Math.random() * h), 2, 1);
      }
    });
  }

  /**
   * Textura de metal oxidado y remaches industriales para la Sala de Calderas
   */
  static getBoilerMetalTexture() {
    return this.createPixelTexture(32, 32, (ctx, w, h) => {
      ctx.fillStyle = '#261e1b';
      ctx.fillRect(0, 0, w, h);
      // Óxido rojizo
      for (let i = 0; i < 40; i++) {
        ctx.fillStyle = Math.random() > 0.6 ? '#6e2b17' : '#3d251e';
        ctx.fillRect(Math.floor(Math.random() * w), Math.floor(Math.random() * h), 2, 2);
      }
      // Remaches
      ctx.fillStyle = '#0f0a08';
      ctx.fillRect(4, 4, 2, 2);
      ctx.fillRect(26, 4, 2, 2);
      ctx.fillRect(4, 26, 2, 2);
      ctx.fillRect(26, 26, 2, 2);
    });
  }

  /**
   * Textura de panel de relés y circuitos para la Central de Servidores
   */
  static getServerRackTexture() {
    return this.createPixelTexture(32, 32, (ctx, w, h) => {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#020617';
      for (let y = 0; y < h; y += 6) ctx.fillRect(0, y, w, 1);
      // Luces LED de relés
      for (let y = 3; y < h; y += 6) {
        ctx.fillStyle = Math.random() > 0.4 ? '#10b981' : '#f59e0b';
        ctx.fillRect(4, y, 2, 2);
        ctx.fillStyle = Math.random() > 0.5 ? '#06b6d4' : '#ef4444';
        ctx.fillRect(10, y, 2, 2);
      }
    });
  }

  /**
   * Textura de roca del abismo con magma y vetas de fuego azul
   */
  static getAbyssRockTexture() {
    return this.createPixelTexture(32, 32, (ctx, w, h) => {
      ctx.fillStyle = '#09050d';
      ctx.fillRect(0, 0, w, h);
      // Grietas de azufre y energía azul etérea
      for (let i = 0; i < 35; i++) {
        const isCyan = Math.random() > 0.6;
        ctx.fillStyle = isCyan ? '#06b6d4' : '#6366f1';
        ctx.fillRect(Math.floor(Math.random() * w), Math.floor(Math.random() * h), 1, 3);
      }
    });
  }

  /**
   * Farola callejera estilo noir con luz volumétrica simulada
   */
  static createStreetLamp(x, z) {
    const group = new THREE.Group();
    group.position.set(x, 0, z);

    // Poste
    const postGeo = new THREE.CylinderGeometry(0.08, 0.12, 4.5, 6);
    const postMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.8 });
    const post = new THREE.Mesh(postGeo, postMat);
    post.position.y = 2.25;
    group.add(post);

    // Brazo curvo
    const armGeo = new THREE.BoxGeometry(0.8, 0.1, 0.1);
    const arm = new THREE.Mesh(armGeo, postMat);
    arm.position.set(0.35, 4.4, 0);
    group.add(arm);

    // Cabeza de lámpara
    const lampGeo = new THREE.ConeGeometry(0.35, 0.4, 6);
    const lampMat = new THREE.MeshStandardMaterial({ color: 0x27272a });
    const lamp = new THREE.Mesh(lampGeo, lampMat);
    lamp.position.set(0.7, 4.3, 0);
    lamp.rotation.z = Math.PI;
    group.add(lamp);

    // Foco de luz cálida de alta potencia y amplio radio
    const light = new THREE.PointLight(0xfef08a, 24, 18, 1.0);
    light.position.set(0.7, 4.1, 0);
    light.castShadow = true;
    group.add(light);

    // Cono de luz amarillenta tenue (pixel volumetric)
    const coneGeo = new THREE.ConeGeometry(2.2, 4.2, 8, 1, true);
    const coneMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.12,
      side: THREE.DoubleSide,
      depthWrite: false
    });
    const lightCone = new THREE.Mesh(coneGeo, coneMat);
    lightCone.position.set(0.7, 2.1, 0);
    group.add(lightCone);

    return group;
  }

  /**
   * Contenedor de basura metálico
   */
  static createDumpster(x, z, rotY = 0) {
    const group = new THREE.Group();
    group.position.set(x, 0, z);
    group.rotation.y = rotY;

    const bodyGeo = new THREE.BoxGeometry(1.8, 1.3, 1.1);
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.7 });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 0.65;
    group.add(body);

    // Tapa inclinada
    const lidGeo = new THREE.BoxGeometry(1.9, 0.1, 1.2);
    const lidMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.5 });
    const lid = new THREE.Mesh(lidGeo, lidMat);
    lid.position.set(0, 1.35, 0);
    lid.rotation.x = 0.15;
    group.add(lid);

    return group;
  }

  /**
   * Objeto interactivo de pista (nota, recorte o carpeta) con marcador visual
   */
  static createClueObject(clueData) {
    const group = new THREE.Group();
    group.position.set(...clueData.position);
    group.userData = {
      isClue: true,
      clueId: clueData.id,
      clueData: clueData
    };

    // Representación física según el tipo
    let mesh;
    if (clueData.objectName === 'crumpled_paper') {
      const geo = new THREE.DodecahedronGeometry(0.2, 0);
      const mat = new THREE.MeshStandardMaterial({
        color: 0xfef08a,
        roughness: 0.9,
        flatShading: true
      });
      mesh = new THREE.Mesh(geo, mat);
    } else if (clueData.objectName === 'license_plate_log') {
      const geo = new THREE.BoxGeometry(0.4, 0.05, 0.3);
      const mat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        roughness: 0.5,
        flatShading: true
      });
      mesh = new THREE.Mesh(geo, mat);
    } else if (clueData.objectName === 'telephone_desk') {
      const geo = new THREE.BoxGeometry(0.35, 0.25, 0.35);
      const mat = new THREE.MeshStandardMaterial({ color: 0x09090b, roughness: 0.3 });
      mesh = new THREE.Mesh(geo, mat);
    } else if (clueData.objectName === 'hidden_safe') {
      const geo = new THREE.BoxGeometry(0.7, 0.7, 0.5);
      const mat = new THREE.MeshStandardMaterial({
        color: 0x475569,
        metalness: 0.7,
        roughness: 0.3
      });
      mesh = new THREE.Mesh(geo, mat);
    } else {
      // Documento / libreta genérica
      const geo = new THREE.BoxGeometry(0.45, 0.06, 0.35);
      const mat = new THREE.MeshStandardMaterial({
        color: 0xfde047,
        roughness: 0.6,
        flatShading: true
      });
      mesh = new THREE.Mesh(geo, mat);
    }

    mesh.castShadow = true;
    group.add(mesh);

    // Indicador sutil de pulso / brillo detective (marcador dorado)
    const ringGeo = new THREE.RingGeometry(0.25, 0.32, 16);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xfacc15,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.7
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = -0.15;
    group.add(ring);
    group.userData.ring = ring;

    // Pequeña luz de pista
    const clueLight = new THREE.PointLight(0xfde047, 2, 2.5);
    clueLight.position.y = 0.3;
    group.add(clueLight);

    return group;
  }
}
