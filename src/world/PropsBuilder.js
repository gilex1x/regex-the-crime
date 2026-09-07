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

  /**
   * Agrega un hitbox invisible para facilitar el raycasting contra el personaje
   */
  static addCharacterHitbox(group) {
    const hitboxGeo = new THREE.BoxGeometry(0.85, 2.1, 0.85);
    const hitboxMat = new THREE.MeshBasicMaterial({ visible: false });
    const hitbox = new THREE.Mesh(hitboxGeo, hitboxMat);
    hitbox.position.y = 1.05;
    group.add(hitbox);
  }

  /**
   * Helper para crear un par de piernas low-poly separadas con zapatos articulados
   */
  static createLegs(pantColor, shoeColor = 0x0a0a0a) {
    const group = new THREE.Group();
    const pantMat = new THREE.MeshStandardMaterial({ color: pantColor, roughness: 0.85, flatShading: true });
    const shoeMat = new THREE.MeshStandardMaterial({ color: shoeColor, roughness: 0.6, flatShading: true });

    // Pierna Izquierda y Derecha
    for (const x of [-0.13, 0.13]) {
      // Muslo / Pantorrilla
      const legMesh = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.8, 0.22), pantMat);
      legMesh.position.set(x, 0.45, 0);
      legMesh.castShadow = true;
      group.add(legMesh);

      // Zapato con talón y puntera angular
      const soleMesh = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.12, 0.32), shoeMat);
      soleMesh.position.set(x, 0.06, 0.04);
      soleMesh.castShadow = true;
      group.add(soleMesh);

      // Tacón
      const heelMesh = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.06, 0.12), shoeMat);
      heelMesh.position.set(x, 0.03, -0.06);
      group.add(heelMesh);
    }
    return group;
  }

  /**
   * Helper para crear una cabeza chiseled low-poly con mentón, nariz y orejas
   */
  static createHead(skinColor = 0xfcbda1) {
    const headGroup = new THREE.Group();
    const skinMat = new THREE.MeshStandardMaterial({ color: skinColor, roughness: 0.6, flatShading: true });

    // Cráneo principal
    const skull = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.28, 0.26), skinMat);
    skull.castShadow = true;
    headGroup.add(skull);

    // Nariz angular low-poly
    const nose = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.09, 0.07), skinMat);
    nose.position.set(0, -0.02, 0.155);
    headGroup.add(nose);

    // Orejas
    const earGeo = new THREE.BoxGeometry(0.04, 0.08, 0.06);
    const earL = new THREE.Mesh(earGeo, skinMat);
    earL.position.set(-0.14, 0.01, 0);
    const earR = new THREE.Mesh(earGeo, skinMat);
    earR.position.set(0.14, 0.01, 0);
    headGroup.add(earL, earR);

    return headGroup;
  }

  /**
   * 1. OFICIAL O'MALLEY (Escenario 1: Callejón) - Modelo Low-Poly de Alta Definición Retro
   */
  static createOfficer() {
    const group = new THREE.Group();
    
    // Piernas articuladas
    group.add(this.createLegs(0x1e293b, 0x090d16));

    // Pelvis y cinturón utilitario
    const beltMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.5, flatShading: true });
    const belt = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.12, 0.28), beltMat);
    belt.position.y = 0.9;
    group.add(belt);

    // Hebilla dorada
    const goldMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.85, roughness: 0.25, flatShading: true });
    const buckle = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.08, 0.03), goldMat);
    buckle.position.set(0, 0.9, 0.15);
    group.add(buckle);

    // Cartuchera de revólver en la cadera derecha
    const holster = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.22, 0.12), beltMat);
    holster.position.set(0.26, 0.82, 0.02);
    group.add(holster);
    // Culata de madera del revólver
    const grip = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.08, 0.06), new THREE.MeshStandardMaterial({ color: 0x451a03 }));
    grip.position.set(0.26, 0.95, 0.02);
    group.add(grip);

    // Torso con uniforme y hombreras
    const uniformMat = new THREE.MeshStandardMaterial({ color: 0x1d4ed8, roughness: 0.75, flatShading: true });
    const torso = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.65, 0.32), uniformMat);
    torso.position.y = 1.28;
    torso.castShadow = true;
    group.add(torso);

    // Placa dorada de 6 puntas
    const badge = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.1, 0.02), goldMat);
    badge.position.set(0.14, 1.45, 0.17);
    group.add(badge);

    // Corbata negra
    const tie = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.35, 0.02), beltMat);
    tie.position.set(0, 1.35, 0.17);
    group.add(tie);

    // Cuello de camisa blanco
    const collar = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.08, 0.14), new THREE.MeshStandardMaterial({ color: 0xf8fafc, flatShading: true }));
    collar.position.set(0, 1.62, 0.08);
    group.add(collar);

    // Brazos articulados
    const armMat = uniformMat;
    // Brazo izquierdo (apoyado en el cinturón)
    const armL = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.55, 0.18), armMat);
    armL.position.set(-0.34, 1.25, 0.04);
    armL.rotation.z = 0.12;
    group.add(armL);

    // Brazo derecho (sosteniendo linterna)
    const armR = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.55, 0.18), armMat);
    armR.position.set(0.34, 1.28, 0.1);
    armR.rotation.x = -Math.PI / 5;
    group.add(armR);

    // Linterna metálica en la mano derecha
    const metalMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.8, roughness: 0.3 });
    const torch = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.045, 0.28, 8), metalMat);
    torch.rotation.x = Math.PI / 2;
    torch.position.set(0.36, 1.05, 0.32);
    group.add(torch);

    // Lente de la linterna y haz sutil
    const lens = new THREE.Mesh(new THREE.CircleGeometry(0.045, 8), new THREE.MeshBasicMaterial({ color: 0xfef08a }));
    lens.position.set(0.36, 1.05, 0.46);
    group.add(lens);

    const torchLight = new THREE.PointLight(0xfef08a, 1.8, 4);
    torchLight.position.set(0.36, 1.05, 0.5);
    group.add(torchLight);

    // Cabeza
    const head = this.createHead(0xfcbda1);
    head.position.y = 1.85;
    group.add(head);

    // Gorra de policía de 8 puntas con visera y águila dorada
    const hatCap = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.18, 0.14, 8), beltMat);
    hatCap.position.set(0, 2.05, -0.02);
    group.add(hatCap);

    const hatBrim = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.03, 0.15), new THREE.MeshStandardMaterial({ color: 0x050505, roughness: 0.2 }));
    hatBrim.position.set(0, 1.98, 0.17);
    hatBrim.rotation.x = 0.15;
    group.add(hatBrim);

    const capBadge = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 0.02), goldMat);
    capBadge.position.set(0, 2.08, 0.15);
    group.add(capBadge);

    this.addCharacterHitbox(group);
    return group;
  }

  /**
   * 2. GUS, EL CONSERJE (Escenario 2: Hotel Savoy) - Con llaves, chaleco y elásticos
   */
  static createHotelClerk() {
    const group = new THREE.Group();

    // Piernas con pantalón marrón de pinzas
    group.add(this.createLegs(0x3e2723, 0x1c1917));

    // Torso: Camisa blanca y chaleco burdeos con 4 botones dorados
    const vestMat = new THREE.MeshStandardMaterial({ color: 0x581c1c, roughness: 0.7, flatShading: true });
    const torso = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.65, 0.3), vestMat);
    torso.position.y = 1.28;
    torso.castShadow = true;
    group.add(torso);

    const goldMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.9, roughness: 0.2 });
    for (let i = 0; i < 4; i++) {
      const button = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.025, 0.02), goldMat);
      button.position.set(0, 1.08 + (i * 0.1), 0.155);
      group.add(button);
    }

    // Pajarita / Corbata de lazo negra
    const bowMat = new THREE.MeshStandardMaterial({ color: 0x0f172a });
    const bowL = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.05, 0.03), bowMat);
    bowL.position.set(-0.04, 1.62, 0.16);
    bowL.rotation.z = 0.2;
    const bowR = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.05, 0.03), bowMat);
    bowR.position.set(0.04, 1.62, 0.16);
    bowR.rotation.z = -0.2;
    group.add(bowL, bowR);

    // Brazos con mangas blancas y elásticos negros
    const shirtMat = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.6, flatShading: true });
    const armL = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.58, 0.16), shirtMat);
    armL.position.set(-0.33, 1.25, 0);
    const armR = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.58, 0.16), shirtMat);
    armR.position.set(0.33, 1.28, 0.1);
    armR.rotation.x = -Math.PI / 4;
    group.add(armL, armR);

    // Elásticos en los brazos
    const garterMat = new THREE.MeshStandardMaterial({ color: 0x18181b });
    const garterL = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.04, 0.18), garterMat);
    garterL.position.set(-0.33, 1.35, 0);
    const garterR = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.04, 0.18), garterMat);
    garterR.position.set(0.33, 1.38, 0.07);
    garterR.rotation.x = -Math.PI / 4;
    group.add(garterL, garterR);

    // Manojo de llaves maestras con 3 llaves individuales
    const keyRing = new THREE.Mesh(new THREE.TorusGeometry(0.07, 0.015, 6, 12), goldMat);
    keyRing.position.set(0.36, 1.05, 0.32);
    group.add(keyRing);

    for (let k = 0; k < 3; k++) {
      const keyStem = new THREE.Mesh(new THREE.BoxGeometry(0.015, 0.12, 0.015), goldMat);
      keyStem.position.set(0.34 + (k * 0.02), 0.96, 0.32);
      keyStem.rotation.z = (k - 1) * 0.25;
      const keyBit = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.03, 0.015), goldMat);
      keyBit.position.set(0.34 + (k * 0.02) + 0.015, 0.92, 0.32);
      group.add(keyStem, keyBit);
    }

    // Cabeza
    const head = this.createHead(0xfed7aa);
    head.position.y = 1.85;
    group.add(head);

    // Pelo negro con raya al medio
    const hair = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.1, 0.28), new THREE.MeshStandardMaterial({ color: 0x1c1917, roughness: 0.9 }));
    hair.position.set(0, 1.98, -0.02);
    group.add(hair);

    // Lápiz amarillo detrás de la oreja derecha
    const pencil = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.12), new THREE.MeshStandardMaterial({ color: 0xfacc15 }));
    pencil.position.set(0.15, 1.9, -0.04);
    pencil.rotation.x = 0.4;
    group.add(pencil);

    this.addCharacterHitbox(group);
    return group;
  }

  /**
   * 3. SR. STERLING (Escenario 3: Oficina) - Traje a rayas, maletín con herrajes
   */
  static createBanker() {
    const group = new THREE.Group();

    // Piernas con pantalón carbón y zapatos oxford
    group.add(this.createLegs(0x1e293b, 0x0f172a));

    // Torso: Chaqueta cruzada con solapas en punta
    const suitMat = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.65, flatShading: true });
    const torso = new THREE.Mesh(new THREE.BoxGeometry(0.54, 0.68, 0.34), suitMat);
    torso.position.y = 1.28;
    torso.castShadow = true;
    group.add(torso);

    // Solapas de traje en V
    const lapelGeo = new THREE.BoxGeometry(0.12, 0.4, 0.03);
    const lapelL = new THREE.Mesh(lapelGeo, suitMat);
    lapelL.position.set(-0.14, 1.4, 0.18);
    lapelL.rotation.z = -0.25;
    const lapelR = new THREE.Mesh(lapelGeo, suitMat);
    lapelR.position.set(0.14, 1.4, 0.18);
    lapelR.rotation.z = 0.25;
    group.add(lapelL, lapelR);

    // Pañuelo de seda blanco en el bolsillo
    const pocketSquare = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.03, 0.02), new THREE.MeshStandardMaterial({ color: 0xf8fafc }));
    pocketSquare.position.set(-0.16, 1.48, 0.18);
    group.add(pocketSquare);

    // Corbata de seda burdeos
    const tie = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.42, 0.025), new THREE.MeshStandardMaterial({ color: 0x991b1b, roughness: 0.3 }));
    tie.position.set(0, 1.34, 0.18);
    group.add(tie);

    // Cadena de reloj de bolsillo
    const chainMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.9 });
    const watchChain = new THREE.Mesh(new THREE.TorusGeometry(0.08, 0.01, 6, 8, Math.PI), chainMat);
    watchChain.position.set(-0.08, 1.15, 0.18);
    watchChain.rotation.z = Math.PI;
    group.add(watchChain);

    // Brazos con puños blancos de camisa
    const armL = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.58, 0.18), suitMat);
    armL.position.set(-0.35, 1.25, 0.05);
    armL.rotation.x = -0.15;
    const armR = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.58, 0.18), suitMat);
    armR.position.set(0.35, 1.25, 0);
    group.add(armL, armR);

    // Maletín de cuero ejecutivo con cantoneras doradas
    const caseGroup = new THREE.Group();
    caseGroup.position.set(-0.46, 0.8, 0.08);
    const caseBody = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.36, 0.46), new THREE.MeshStandardMaterial({ color: 0x451a03, roughness: 0.7 }));
    caseGroup.add(caseBody);

    const lockMat = chainMat;
    const lock1 = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.04, 0.04), lockMat);
    lock1.position.set(0, 0.08, 0.12);
    const lock2 = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.04, 0.04), lockMat);
    lock2.position.set(0, 0.08, -0.12);
    caseGroup.add(lock1, lock2);
    group.add(caseGroup);

    // Cabeza y peinado canoso distinguido
    const head = this.createHead(0xfcbda1);
    head.position.y = 1.85;
    group.add(head);

    const hair = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.12, 0.28), new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.8 }));
    hair.position.set(0, 1.98, -0.02);
    group.add(hair);

    // Bigote fino
    const mustache = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.03, 0.03), new THREE.MeshStandardMaterial({ color: 0x334155 }));
    mustache.position.set(0, 1.76, 0.155);
    group.add(mustache);

    this.addCharacterHitbox(group);
    return group;
  }

  /**
   * 4. DR. HAROLD JONES (Escenario 4: Morgue) - Con estetoscopio, bata y mascarilla
   */
  static createDoctor() {
    const group = new THREE.Group();

    // Piernas con pantalones quirúrgicos verde azulado
    group.add(this.createLegs(0x0f766e, 0xf1f5f9));

    // Torso: Bata blanca sobre scrubs
    const coatMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.55, flatShading: true });
    const torso = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.72, 0.34), coatMat);
    torso.position.y = 1.26;
    torso.castShadow = true;
    group.add(torso);

    // V-neck interior con scrubs verde
    const scrubV = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.24, 0.02), new THREE.MeshStandardMaterial({ color: 0x0f766e }));
    scrubV.position.set(0, 1.48, 0.175);
    group.add(scrubV);

    // Estetoscopio con campana metálica
    const stethTubeMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.4 });
    const steth = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.018, 6, 12, Math.PI), stethTubeMat);
    steth.position.set(0, 1.62, 0.13);
    steth.rotation.z = Math.PI;
    const stethBell = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.02, 8), new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9 }));
    stethBell.position.set(0, 1.36, 0.185);
    stethBell.rotation.x = Math.PI / 2;
    group.add(steth, stethBell);

    // Brazos con guantes quirúrgicos celestes
    const armL = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.58, 0.18), coatMat);
    armL.position.set(-0.35, 1.25, 0);
    const armR = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.58, 0.18), coatMat);
    armR.position.set(0.35, 1.25, 0.08);
    armR.rotation.x = -Math.PI / 6;
    group.add(armL, armR);

    // Guantes de látex
    const gloveMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.3 });
    const gloveL = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.16, 0.19), gloveMat);
    gloveL.position.set(-0.35, 0.88, 0);
    const gloveR = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.16, 0.19), gloveMat);
    gloveR.position.set(0.35, 0.92, 0.15);
    group.add(gloveL, gloveR);

    // Cabeza
    const head = this.createHead(0xfcbda1);
    head.position.y = 1.85;
    group.add(head);

    // Gorro quirúrgico verde
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.12, 8), new THREE.MeshStandardMaterial({ color: 0x0f766e, roughness: 0.8 }));
    cap.position.set(0, 2.02, 0);
    group.add(cap);

    // Mascarilla quirúrgica con tirantes
    const mask = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.13, 0.06), new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.9 }));
    mask.position.set(0, 1.79, 0.155);
    group.add(mask);

    this.addCharacterHitbox(group);
    return group;
  }

  /**
   * 5. "SAL" MORETTI (Escenario 5: Muelles) - Chaquetón de marinero, cigarrillo y gorro
   */
  static createDockWorker() {
    const group = new THREE.Group();

    // Piernas con vaqueros y botas de estiba
    group.add(this.createLegs(0x1d4ed8, 0x451a03));

    // Torso: Chaquetón de marinero azul marino con cuello vuelto
    const coatMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.9, flatShading: true });
    const torso = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.72, 0.38), coatMat);
    torso.position.y = 1.28;
    torso.castShadow = true;
    group.add(torso);

    // Cuello de borrego / lana gris
    const collar = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.14, 0.18), new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.95 }));
    collar.position.set(0, 1.62, 0.12);
    group.add(collar);

    // Botones marineros dorados
    const buttonMat = new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.8 });
    for (const x of [-0.08, 0.08]) {
      for (let y = 1.15; y <= 1.45; y += 0.15) {
        const btn = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.03, 0.02), buttonMat);
        btn.position.set(x, y, 0.2);
        group.add(btn);
      }
    }

    // Brazos con guantes de trabajo
    const armL = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.58, 0.2), coatMat);
    armL.position.set(-0.37, 1.25, 0);
    const armR = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.58, 0.2), coatMat);
    armR.position.set(0.37, 1.25, 0);
    group.add(armL, armR);

    // Cabeza
    const head = this.createHead(0xe09f80);
    head.position.y = 1.85;
    group.add(head);

    // Gorro marinero amarillo ocre con pliegue
    const beanieMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.95, flatShading: true });
    const beanieCrown = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.17, 0.12, 8), beanieMat);
    beanieCrown.position.set(0, 2.05, 0);
    const beanieRim = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.06, 8), beanieMat);
    beanieRim.position.set(0, 1.96, 0);
    group.add(beanieCrown, beanieRim);

    // Cigarrillo encendido con brasa y humo low-poly
    const cig = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.1, 6), new THREE.MeshStandardMaterial({ color: 0xffffff }));
    cig.rotation.x = Math.PI / 2;
    cig.position.set(0.08, 1.76, 0.22);
    const ember = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.025, 0.025), new THREE.MeshBasicMaterial({ color: 0xf97316 }));
    ember.position.set(0.08, 1.76, 0.28);
    group.add(cig, ember);

    this.addCharacterHitbox(group);
    return group;
  }

  /**
   * 6. HERMANO THADDEUS (Escenario 6: Santuario) - Capucha gótica, grimorio y talismán
   */
  static createCultist() {
    const group = new THREE.Group();

    // Hábito talar gótico acampanado
    const robeMat = new THREE.MeshStandardMaterial({ color: 0x2e1065, roughness: 0.95, flatShading: true });
    const robe = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.58, 1.65, 10), robeMat);
    robe.position.y = 0.82;
    robe.castShadow = true;
    group.add(robe);

    // Cenefa rúnica dorada
    const trim = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.42, 0.1, 10), new THREE.MeshStandardMaterial({ color: 0xf59e0b, emissive: 0xb45309, emissiveIntensity: 0.4 }));
    trim.position.y = 1.35;
    group.add(trim);

    // Talismán esotérico de Malphas en el pecho
    const talisman = new THREE.Mesh(new THREE.OctahedronGeometry(0.07, 0), new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.9, roughness: 0.2 }));
    talisman.position.set(0, 1.25, 0.22);
    group.add(talisman);

    // Mangas amplias ceremoniales
    const sleeveL = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.55, 0.22), robeMat);
    sleeveL.position.set(-0.35, 1.22, 0.08);
    sleeveL.rotation.x = -Math.PI / 5;
    const sleeveR = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.55, 0.22), robeMat);
    sleeveR.position.set(0.35, 1.22, 0.08);
    sleeveR.rotation.x = -Math.PI / 5;
    group.add(sleeveL, sleeveR);

    // Grimorio prohibido sostenido en las manos
    const book = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.34, 0.08), new THREE.MeshStandardMaterial({ color: 0x1f140e, roughness: 0.8 }));
    book.position.set(0, 1.12, 0.32);
    book.rotation.x = -Math.PI / 4;
    group.add(book);

    // Capucha en cono profundo y sombras faciales
    const hoodMat = new THREE.MeshStandardMaterial({ color: 0x1e0b38, roughness: 0.9, flatShading: true });
    const hood = new THREE.Mesh(new THREE.ConeGeometry(0.32, 0.52, 8), hoodMat);
    hood.position.set(0, 1.95, -0.06);
    hood.rotation.x = -0.15;
    group.add(hood);

    // Ojos carmesí que arden en la oscuridad
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
    const eye1 = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.03, 0.04), eyeMat);
    eye1.position.set(-0.07, 1.82, 0.13);
    const eye2 = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.03, 0.04), eyeMat);
    eye2.position.set(0.07, 1.82, 0.13);
    group.add(eye1, eye2);

    this.addCharacterHitbox(group);
    return group;
  }

  /**
   * 7. LORD ARCHIBALD VANCE (Escenario 7: Mansión) - Frac de terciopelo, chistera y monóculo
   */
  static createAristocrat() {
    const group = new THREE.Group();

    // Piernas con pantalón negro de gala y zapatos de charol
    group.add(this.createLegs(0x0a0a0a, 0x050505));

    // Frac victoriano de terciopelo esmeralda con faldones posteriores
    const velvetMat = new THREE.MeshStandardMaterial({ color: 0x064e3b, roughness: 0.5, flatShading: true });
    const torso = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.65, 0.32), velvetMat);
    torso.position.y = 1.28;
    torso.castShadow = true;
    group.add(torso);

    // Faldones de frac detrás de las piernas
    const tails = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.45, 0.06), velvetMat);
    tails.position.set(0, 0.8, -0.15);
    tails.rotation.x = 0.1;
    group.add(tails);

    // Chaleco de brocado dorado
    const vest = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.4, 0.03), new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.6, roughness: 0.3 }));
    vest.position.set(0, 1.32, 0.17);
    group.add(vest);

    // Brazos elegantes con copa de coñac
    const armL = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.58, 0.18), velvetMat);
    armL.position.set(-0.34, 1.25, 0);
    const armR = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.58, 0.18), velvetMat);
    armR.position.set(0.34, 1.28, 0.1);
    armR.rotation.x = -Math.PI / 4;
    group.add(armL, armR);

    // Copa de coñac con licor ámbar
    const glass = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.02, 0.12, 8), new THREE.MeshStandardMaterial({ color: 0xd97706, transparent: true, opacity: 0.85, roughness: 0.1 }));
    glass.position.set(0.36, 1.1, 0.28);
    group.add(glass);

    // Cabeza
    const head = this.createHead(0xfcbda1);
    head.position.y = 1.85;
    group.add(head);

    // Monóculo dorado en ojo derecho con cadena
    const goldMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.95 });
    const monocle = new THREE.Mesh(new THREE.TorusGeometry(0.045, 0.008, 6, 12), goldMat);
    monocle.position.set(0.07, 1.88, 0.155);
    group.add(monocle);

    // Chistera alta con cinta esmeralda
    const hatMat = new THREE.MeshStandardMaterial({ color: 0x0a0a0a, roughness: 0.3 });
    const hatCrown = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.21, 0.38, 12), hatMat);
    hatCrown.position.set(0, 2.2, 0);
    const hatRibbon = new THREE.Mesh(new THREE.CylinderGeometry(0.215, 0.215, 0.06, 12), velvetMat);
    hatRibbon.position.set(0, 2.05, 0);
    const hatBrim = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.03, 12), hatMat);
    hatBrim.position.set(0, 2.01, 0);
    group.add(hatCrown, hatRibbon, hatBrim);

    this.addCharacterHitbox(group);
    return group;
  }

  /**
   * 8. MAC, EL MAQUINISTA (Escenario 8: Calderas) - Overol con grasa, gafas y llave inglesa
   */
  static createBoilerMechanic() {
    const group = new THREE.Group();

    // Mono de trabajo gris ceniza con botas de hierro
    group.add(this.createLegs(0x374151, 0x1f2937));

    // Torso con tirantes y pañuelo rojo al cuello
    const suitMat = new THREE.MeshStandardMaterial({ color: 0x374151, roughness: 0.9, flatShading: true });
    const torso = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.72, 0.38), suitMat);
    torso.position.y = 1.28;
    torso.castShadow = true;
    group.add(torso);

    const scarf = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.12, 0.14), new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.8 }));
    scarf.position.set(0, 1.62, 0.14);
    group.add(scarf);

    // Brazos arremangados y llave Stillson de fontanería
    const armL = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.58, 0.2), suitMat);
    armL.position.set(-0.38, 1.25, 0);
    const armR = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.58, 0.2), suitMat);
    armR.position.set(0.38, 1.25, 0.1);
    armR.rotation.x = -Math.PI / 5;
    group.add(armL, armR);

    // Llave inglesa heavy-duty
    const wrenchMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.85, roughness: 0.25 });
    const wrenchShaft = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.5, 0.04), wrenchMat);
    wrenchShaft.position.set(0.42, 0.95, 0.22);
    wrenchShaft.rotation.z = -Math.PI / 4;
    const wrenchJaw = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.1, 0.06), wrenchMat);
    wrenchJaw.position.set(0.55, 1.1, 0.22);
    group.add(wrenchShaft, wrenchJaw);

    // Cabeza con tizne
    const head = this.createHead(0xc27a58);
    head.position.y = 1.85;
    group.add(head);

    // Gafas de soldador con montura de latón sobre la frente
    const goggleMat = new THREE.MeshStandardMaterial({ color: 0xb45309, metalness: 0.8 });
    const g1 = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.04, 8), goggleMat);
    g1.rotation.x = Math.PI / 2;
    g1.position.set(-0.07, 1.98, 0.16);
    const g2 = g1.clone();
    g2.position.set(0.07, 1.98, 0.16);
    group.add(g1, g2);

    this.addCharacterHitbox(group);
    return group;
  }

  /**
   * 9. WALTER FINCH (Escenario 9: Servidores) - Gafas de carey, diadema de auriculares y portapapeles
   */
  static createServerTechnician() {
    const group = new THREE.Group();

    // Piernas con pantalón de pinzas marrón
    group.add(this.createLegs(0x442e1d, 0x1c1917));

    // Torso con camisa blanca y tirantes negros
    const shirtMat = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.7, flatShading: true });
    const torso = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.68, 0.32), shirtMat);
    torso.position.y = 1.28;
    torso.castShadow = true;
    group.add(torso);

    const suspenderMat = new THREE.MeshStandardMaterial({ color: 0x0f172a });
    const s1 = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.68, 0.02), suspenderMat);
    s1.position.set(-0.14, 1.28, 0.17);
    const s2 = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.68, 0.02), suspenderMat);
    s2.position.set(0.14, 1.28, 0.17);
    group.add(s1, s2);

    // Brazos sosteniendo el portapapeles
    const armL = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.58, 0.18), shirtMat);
    armL.position.set(-0.32, 1.26, 0.1);
    armL.rotation.x = -Math.PI / 4;
    const armR = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.58, 0.18), shirtMat);
    armR.position.set(0.32, 1.26, 0.1);
    armR.rotation.x = -Math.PI / 4;
    group.add(armL, armR);

    // Portapapeles con clip metálico y tarjeta perforada
    const board = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.42, 0.03), new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.8 }));
    board.position.set(0, 1.15, 0.32);
    board.rotation.x = -Math.PI / 4;
    const punchCard = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.34, 0.01), new THREE.MeshStandardMaterial({ color: 0xfef08a }));
    punchCard.position.set(0, 1.15, 0.34);
    punchCard.rotation.x = -Math.PI / 4;
    group.add(board, punchCard);

    // Cabeza
    const head = this.createHead(0xfcbda1);
    head.position.y = 1.85;
    group.add(head);

    // Gafas redondas de pasta con patillas
    const glasses = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.07, 0.04), new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.3 }));
    glasses.position.set(0, 1.88, 0.16);
    group.add(glasses);

    // Diadema metálica de auriculares
    const headsetMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.7 });
    const band = new THREE.Mesh(new THREE.TorusGeometry(0.15, 0.015, 6, 12, Math.PI), headsetMat);
    band.position.set(0, 1.95, 0);
    const ear1 = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.04, 8), headsetMat);
    ear1.rotation.z = Math.PI / 2;
    ear1.position.set(-0.16, 1.85, 0);
    const ear2 = ear1.clone();
    ear2.position.set(0.16, 1.85, 0);
    group.add(band, ear1, ear2);

    this.addCharacterHitbox(group);
    return group;
  }

  /**
   * 10. ESPÍRITU DE FRANKIE "DEDOS" (Escenario 10: Abismo) - Silueta fantasmal con eslabones y orbe
   */
  static createAbyssSpecter() {
    const group = new THREE.Group();

    // Material espectral etéreo translúcido
    const ghostMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.9,
      transparent: true,
      opacity: 0.72,
      roughness: 0.15,
      flatShading: true
    });

    // Torso fantasmal con chaqueta tétrica rasgada
    const torso = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.72, 0.32), ghostMat);
    torso.position.y = 1.35;
    group.add(torso);

    // Faldones de vapor que se disuelven hacia abajo en picos facetados
    const vapor = new THREE.Mesh(new THREE.ConeGeometry(0.35, 0.9, 6), ghostMat);
    vapor.position.y = 0.65;
    vapor.rotation.x = Math.PI;
    group.add(vapor);

    // Orbe de energía etérea pulsante en el pecho
    const orb = new THREE.Mesh(new THREE.DodecahedronGeometry(0.12, 0), new THREE.MeshBasicMaterial({ color: 0x67e8f9 }));
    orb.position.set(0, 1.35, 0.12);
    group.add(orb);

    // Brazos espectrales suplicantes
    const armL = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.62, 0.16), ghostMat);
    armL.position.set(-0.36, 1.35, 0.16);
    armL.rotation.x = -Math.PI / 3;
    const armR = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.62, 0.16), ghostMat);
    armR.position.set(0.36, 1.35, 0.16);
    armR.rotation.x = -Math.PI / 3;
    group.add(armL, armR);

    // Grilletes y eslabones de cadena flotantes
    const chainMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9, roughness: 0.2, transparent: true, opacity: 0.85 });
    for (const x of [-0.4, 0.4]) {
      const cuff = new THREE.Mesh(new THREE.TorusGeometry(0.08, 0.02, 6, 8), chainMat);
      cuff.position.set(x, 1.1, 0.35);
      group.add(cuff);

      for (let c = 0; c < 3; c++) {
        const link = new THREE.Mesh(new THREE.TorusGeometry(0.04, 0.012, 4, 8), chainMat);
        link.position.set(x, 1.0 - (c * 0.14), 0.35 + (c * 0.05));
        link.rotation.y = (c % 2 === 0) ? 0 : Math.PI / 2;
        group.add(link);
      }
    }

    // Cabeza fantasmal
    const head = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.28, 0.28), ghostMat);
    head.position.y = 1.95;
    group.add(head);

    // Luz mística espectral
    const ghostLight = new THREE.PointLight(0x06b6d4, 7, 7, 1.4);
    ghostLight.position.set(0, 1.5, 0);
    group.add(ghostLight);

    this.addCharacterHitbox(group);
    return group;
  }

  // ==========================================
  // UTILERÍA Y PROPS AMBIENTALES ENRIQUECIDOS
  // ==========================================

  /**
   * Escalera de incendios de hierro fundido (Escenario 1: Callejón)
   */
  static createFireEscape() {
    const group = new THREE.Group();
    const ironMat = new THREE.MeshStandardMaterial({ color: 0x1f2937, metalness: 0.85, roughness: 0.4, flatShading: true });

    // Plataforma principal con barandilla
    const platform = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.1, 3.2), ironMat);
    platform.position.y = 3.5;
    group.add(platform);

    // Barandillas laterales
    const railL = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.9, 3.2), ironMat);
    railL.position.set(-0.77, 4.0, 0);
    const railBack = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.9, 0.06), ironMat);
    railBack.position.set(0, 4.0, -1.57);
    group.add(railL, railBack);

    // Escalera vertical que baja
    for (let r = 0; r < 10; r++) {
      const rung = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.6, 6), ironMat);
      rung.rotation.z = Math.PI / 2;
      rung.position.set(0.3, 0.35 * r + 0.3, 1.6);
      group.add(rung);
    }
    const side1 = new THREE.Mesh(new THREE.BoxGeometry(0.04, 3.8, 0.04), ironMat);
    side1.position.set(0.0, 1.9, 1.6);
    const side2 = new THREE.Mesh(new THREE.BoxGeometry(0.04, 3.8, 0.04), ironMat);
    side2.position.set(0.6, 1.9, 1.6);
    group.add(side1, side2);

    return group;
  }

  /**
   * Farola clásica de hierro de New Haven 1947 con brazo curvo y luz cálida
   */
  static createStreetLamp() {
    const group = new THREE.Group();
    const ironMat = new THREE.MeshStandardMaterial({ color: 0x18181b, metalness: 0.9, roughness: 0.3, flatShading: true });

    // Base octogonal
    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.4, 0.8, 8), ironMat);
    base.position.y = 0.4;
    group.add(base);

    // Poste principal acanalado
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.12, 4.2, 8), ironMat);
    pole.position.y = 2.9;
    group.add(pole);

    // Linterna de gas clásica
    const lantern = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.18, 0.5, 6), new THREE.MeshStandardMaterial({ color: 0xfef08a, emissive: 0xf59e0b, emissiveIntensity: 0.6 }));
    lantern.position.y = 5.2;
    group.add(lantern);

    const cap = new THREE.Mesh(new THREE.ConeGeometry(0.35, 0.3, 6), ironMat);
    cap.position.y = 5.6;
    group.add(cap);

    // Luz de farola
    const lampLight = new THREE.PointLight(0xfef08a, 12, 14, 1.2);
    lampLight.position.set(0, 5.0, 0);
    lampLight.castShadow = true;
    group.add(lampLight);

    return group;
  }

  /**
   * Contenedor de basura industrial con tapa entreabierta
   */
  static createDumpster() {
    const group = new THREE.Group();
    const greenMat = new THREE.MeshStandardMaterial({ color: 0x164e63, roughness: 0.8, flatShading: true });

    // Cubeta principal
    const bin = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.3, 1.4), greenMat);
    bin.position.y = 0.75;
    bin.castShadow = true;
    group.add(bin);

    // Tapa izquierda cerrada y tapa derecha entreabierta
    const lidMat = new THREE.MeshStandardMaterial({ color: 0x0e3a47, roughness: 0.7 });
    const lidL = new THREE.Mesh(new THREE.BoxGeometry(1.25, 0.08, 1.5), lidMat);
    lidL.position.set(-0.6, 1.42, 0);
    const lidR = new THREE.Mesh(new THREE.BoxGeometry(1.25, 0.08, 1.5), lidMat);
    lidR.position.set(0.6, 1.62, 0);
    lidR.rotation.z = -0.35;
    group.add(lidL, lidR);

    // Bolsas de basura negras en el interior
    const bagMat = new THREE.MeshStandardMaterial({ color: 0x09090b, roughness: 0.4 });
    const bag1 = new THREE.Mesh(new THREE.DodecahedronGeometry(0.35, 0), bagMat);
    bag1.position.set(0.4, 1.25, 0.1);
    group.add(bag1);

    return group;
  }

  /**
   * Teléfono rotatorio vintage de baquelita (Escenario 2: Hotel)
   */
  static createVintagePhone() {
    const group = new THREE.Group();
    const bakelite = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.3, metalness: 0.4 });

    const base = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.12, 0.22), bakelite);
    group.add(base);

    const dial = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.02, 12), new THREE.MeshStandardMaterial({ color: 0xf1f5f9 }));
    dial.rotation.x = Math.PI / 4;
    dial.position.set(0, 0.08, 0.06);
    group.add(dial);

    const handset = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.06, 0.08), bakelite);
    handset.position.set(0, 0.12, -0.04);
    group.add(handset);

    return group;
  }

  /**
   * Máquina de escribir mecánica de los años 40 (Escenario 3: Oficina)
   */
  static createTypewriter() {
    const group = new THREE.Group();
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.5, metalness: 0.6 });

    const body = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.16, 0.42), bodyMat);
    body.position.y = 0.08;
    group.add(body);

    const roller = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.48, 12), new THREE.MeshStandardMaterial({ color: 0x09090b }));
    roller.rotation.z = Math.PI / 2;
    roller.position.set(0, 0.2, -0.08);
    group.add(roller);

    const paper = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.24, 0.005), new THREE.MeshStandardMaterial({ color: 0xfef08a }));
    paper.position.set(0, 0.3, -0.09);
    paper.rotation.x = -0.2;
    group.add(paper);

    return group;
  }

  /**
   * Gran reloj de pared de péndulo (Escenario 3: Oficina)
   */
  static createGrandClock() {
    const group = new THREE.Group();
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x271c19, roughness: 0.7, flatShading: true });

    const caseMesh = new THREE.Mesh(new THREE.BoxGeometry(0.6, 1.8, 0.25), woodMat);
    group.add(caseMesh);

    const dial = new THREE.Mesh(new THREE.CircleGeometry(0.2, 16), new THREE.MeshStandardMaterial({ color: 0xfef08a }));
    dial.position.set(0, 0.45, 0.13);
    group.add(dial);

    const pendulum = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.7), new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.9 }));
    pendulum.position.set(0, -0.2, 0.08);
    group.add(pendulum);

    return group;
  }

  /**
   * Carrito de instrumentos quirúrgicos con bisturís (Escenario 4: Morgue)
   */
  static createSurgicalCart() {
    const group = new THREE.Group();
    const steel = new THREE.MeshStandardMaterial({ color: 0xcbd5e1, metalness: 0.9, roughness: 0.2, flatShading: true });

    // Dos bandejas de acero
    for (const y of [0.4, 0.9]) {
      const tray = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.04, 0.5), steel);
      tray.position.y = y;
      tray.castShadow = true;
      group.add(tray);
    }

    // 4 patas tubulares con ruedas
    for (const [x, z] of [[-0.36, -0.21], [0.36, -0.21], [-0.36, 0.21], [0.36, 0.21]]) {
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.9), steel);
      leg.position.set(x, 0.45, z);
      group.add(leg);
    }

    // Instrumental quirúrgico en la bandeja superior
    const scalpel = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.01, 0.16), steel);
    scalpel.position.set(0.1, 0.93, 0.05);
    const boneSaw = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.02, 0.22), steel);
    boneSaw.position.set(-0.12, 0.93, 0);
    group.add(scalpel, boneSaw);

    return group;
  }

  /**
   * Bolardo de amarre de muelle con soga enrollada (Escenario 5: Docks)
   */
  static createDockBollard() {
    const group = new THREE.Group();
    const ironMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.6, metalness: 0.8 });
    const ropeMat = new THREE.MeshStandardMaterial({ color: 0xca8a04, roughness: 0.95 });

    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.24, 0.7, 10), ironMat);
    post.position.y = 0.35;
    post.castShadow = true;
    group.add(post);

    const crossArm = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.6, 8), ironMat);
    crossArm.rotation.z = Math.PI / 2;
    crossArm.position.y = 0.55;
    group.add(crossArm);

    const rope = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.06, 6, 12), ropeMat);
    rope.rotation.x = Math.PI / 2;
    rope.position.y = 0.2;
    group.add(rope);

    return group;
  }

  /**
   * Candelabro gótico de forja con múltiples velas derretidas (Escenario 6: Santuario)
   */
  static createCandelabra() {
    const group = new THREE.Group();
    const ironMat = new THREE.MeshStandardMaterial({ color: 0x1c1917, roughness: 0.9, flatShading: true });
    const waxMat = new THREE.MeshStandardMaterial({ color: 0xfef08a, roughness: 0.5 });

    // Fuste y trípode de forja
    const stand = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.06, 1.8, 6), ironMat);
    stand.position.y = 0.9;
    group.add(stand);

    // Brazos curvos con velas
    for (let i = 0; i < 3; i++) {
      const arm = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.04, 0.04), ironMat);
      arm.position.set(0, 1.7 + (i * 0.1), 0);
      arm.rotation.y = (i * Math.PI) / 3;
      group.add(arm);

      for (const side of [-0.22, 0.22]) {
        const candle = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.2, 6), waxMat);
        candle.position.set(side * Math.cos((i * Math.PI) / 3), 1.85 + (i * 0.1), side * Math.sin((i * Math.PI) / 3));
        group.add(candle);

        const flame = new THREE.PointLight(0xf97316, 2.5, 3.5);
        flame.position.set(candle.position.x, candle.position.y + 0.12, candle.position.z);
        group.add(flame);
      }
    }

    return group;
  }

  /**
   * Gramófono vintage con bocina de latón dorado (Escenario 7: Mansión)
   */
  static createGramophone() {
    const group = new THREE.Group();
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x3d1f14, roughness: 0.6, flatShading: true });
    const brassMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.85, roughness: 0.25 });

    const base = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.18, 0.42), woodMat);
    base.position.y = 0.09;
    group.add(base);

    const turntable = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.02, 16), new THREE.MeshStandardMaterial({ color: 0x0a0a0a }));
    turntable.position.set(0, 0.19, 0);
    group.add(turntable);

    // Bocina dorada cónica curvada
    const horn = new THREE.Mesh(new THREE.ConeGeometry(0.24, 0.55, 12, 1, true), brassMat);
    horn.rotation.x = -Math.PI / 3;
    horn.position.set(0, 0.5, 0.1);
    group.add(horn);

    return group;
  }

  /**
   * Cruce de tuberías industriales con válvulas de volante y manómetros (Escenario 8: Calderas)
   */
  static createIndustrialPipes() {
    const group = new THREE.Group();
    const pipeMat = new THREE.MeshStandardMaterial({ color: 0x7c2d12, metalness: 0.7, roughness: 0.4, flatShading: true });
    const valveMat = new THREE.MeshStandardMaterial({ color: 0xef4444, metalness: 0.5, roughness: 0.4 });

    const pipeH = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 3.5, 8), pipeMat);
    pipeH.rotation.z = Math.PI / 2;
    pipeH.position.y = 2.4;
    group.add(pipeH);

    const valve = new THREE.Mesh(new THREE.TorusGeometry(0.15, 0.03, 6, 12), valveMat);
    valve.position.set(0, 2.4, 0.12);
    group.add(valve);

    // Manómetro de presión con aguja
    const gauge = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.04, 12), new THREE.MeshStandardMaterial({ color: 0xfef08a }));
    gauge.position.set(0.6, 2.6, 0.08);
    gauge.rotation.x = Math.PI / 2;
    group.add(gauge);

    return group;
  }

  /**
   * Unidad de cómputo con válvulas de vacío y carretes de cinta magnética (Escenario 9: Servidores)
   */
  static createMainframeUnit() {
    const group = new THREE.Group();
    const rackMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.8, roughness: 0.3, flatShading: true });

    const rack = new THREE.Mesh(new THREE.BoxGeometry(1.2, 3.2, 0.8), rackMat);
    rack.position.y = 1.6;
    rack.castShadow = true;
    group.add(rack);

    // Dos carretes de cinta magnética
    const reelMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.9 });
    const r1 = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.04, 12), reelMat);
    r1.rotation.x = Math.PI / 2;
    r1.position.set(-0.25, 2.4, 0.42);
    const r2 = r1.clone();
    r2.position.set(0.25, 2.4, 0.42);
    group.add(r1, r2);

    // Banco de válvulas de vacío brillantes
    for (let v = 0; v < 4; v++) {
      const tube = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.14, 6), new THREE.MeshBasicMaterial({ color: 0x38bdf8 }));
      tube.position.set(-0.35 + (v * 0.24), 1.6, 0.42);
      group.add(tube);
    }

    return group;
  }

  /**
   * Monolito flotante de obsidiana rúnica (Escenario 10: Abismo)
   */
  static createAbyssMonolith() {
    const group = new THREE.Group();
    const obsidianMat = new THREE.MeshStandardMaterial({ color: 0x09060f, roughness: 0.2, metalness: 0.8, flatShading: true });

    const obelisk = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.45, 3.2, 6), obsidianMat);
    obelisk.position.y = 1.6;
    obelisk.castShadow = true;
    group.add(obelisk);

    // Glifo rúnico incrustado que emite luz azul
    const rune = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.8, 0.02), new THREE.MeshBasicMaterial({ color: 0x38bdf8 }));
    rune.position.set(0, 1.8, 0.38);
    group.add(rune);

    const runeLight = new THREE.PointLight(0x38bdf8, 3, 5);
    runeLight.position.set(0, 1.8, 0.5);
    group.add(runeLight);

    return group;
  }

  /**
   * Crea una patrulla de policía low-poly
   */
  static createPoliceCar() {
    const group = new THREE.Group();

    // Chasis principal (negro)
    const chassisGeo = new THREE.BoxGeometry(1.8, 0.6, 4.0);
    const blackMat = new THREE.MeshStandardMaterial({ color: 0x0a0a0a, roughness: 0.3, metalness: 0.6 });
    const chassis = new THREE.Mesh(chassisGeo, blackMat);
    chassis.position.y = 0.5;
    chassis.castShadow = true;
    chassis.receiveShadow = true;
    group.add(chassis);

    // Cabina (blanca)
    const cabinGeo = new THREE.BoxGeometry(1.6, 0.5, 2.0);
    const whiteMat = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.2, metalness: 0.4 });
    const cabin = new THREE.Mesh(cabinGeo, whiteMat);
    cabin.position.set(0, 1.05, -0.2);
    cabin.castShadow = true;
    group.add(cabin);

    // Llantas
    const wheelGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.2, 12);
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.9 });
    
    const w1 = new THREE.Mesh(wheelGeo, wheelMat);
    w1.rotation.z = Math.PI / 2;
    w1.position.set(0.9, 0.3, 1.2);
    const w2 = w1.clone();
    w2.position.set(-0.9, 0.3, 1.2);
    const w3 = w1.clone();
    w3.position.set(0.9, 0.3, -1.2);
    const w4 = w1.clone();
    w4.position.set(-0.9, 0.3, -1.2);
    group.add(w1, w2, w3, w4);

    // Sirenas (Barra superior)
    const sirenBarGeo = new THREE.BoxGeometry(1.0, 0.1, 0.3);
    const sirenBar = new THREE.Mesh(sirenBarGeo, blackMat);
    sirenBar.position.set(0, 1.35, -0.2);
    group.add(sirenBar);

    const redSirenGeo = new THREE.BoxGeometry(0.3, 0.15, 0.25);
    const redMat = new THREE.MeshStandardMaterial({ color: 0xef4444, emissive: 0xef4444, emissiveIntensity: 0.5 });
    const redSiren = new THREE.Mesh(redSirenGeo, redMat);
    redSiren.position.set(-0.35, 1.45, -0.2);
    group.add(redSiren);
    
    const blueSirenGeo = new THREE.BoxGeometry(0.3, 0.15, 0.25);
    const blueMat = new THREE.MeshStandardMaterial({ color: 0x3b82f6, emissive: 0x3b82f6, emissiveIntensity: 0.5 });
    const blueSiren = new THREE.Mesh(blueSirenGeo, blueMat);
    blueSiren.position.set(0.35, 1.45, -0.2);
    group.add(blueSiren);

    // Luces PointLight para las sirenas
    const redLight = new THREE.PointLight(0xef4444, 0, 10);
    redLight.position.set(-0.35, 1.6, -0.2);
    group.add(redLight);
    
    const blueLight = new THREE.PointLight(0x3b82f6, 0, 10);
    blueLight.position.set(0.35, 1.6, -0.2);
    group.add(blueLight);

    // Guardar referencias para animación
    group.userData = {
      redLight,
      blueLight,
      redMat,
      blueMat
    };

    return group;
  }
}
