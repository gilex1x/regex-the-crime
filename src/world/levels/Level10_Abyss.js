import * as THREE from 'three';
import { PropsBuilder } from '../PropsBuilder.js';

/**
 * Escenario 10 (Tier 10): La Bóveda del Abismo y El Gran Exorcismo
 */
export class Level10_Abyss {
  constructor(scene, clueDataList) {
    this.scene = scene;
    this.clueDataList = clueDataList;
    this.group = new THREE.Group();
    this.colliders = [];
    this.animatedObjects = [];
    this.interactiveObjects = [];
  }

  build() {
    // 1. Suelo de plataforma ritual suspendida sobre el vacío
    const abyssTex = PropsBuilder.getAbyssRockTexture();
    abyssTex.repeat.set(6, 6);

    const floorGeo = new THREE.CylinderGeometry(8, 8.5, 1, 32);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x0f0b1a,
      map: abyssTex,
      roughness: 0.8,
      metalness: 0.3
    });
    const platform = new THREE.Mesh(floorGeo, floorMat);
    platform.position.set(0, -0.5, -2);
    platform.receiveShadow = true;
    this.group.add(platform);

    // Borde de la plataforma con luz abisal
    const ringGlowGeo = new THREE.RingGeometry(7.6, 8.2, 32);
    const ringGlowMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.7
    });
    const ringGlow = new THREE.Mesh(ringGlowGeo, ringGlowMat);
    ringGlow.rotation.x = -Math.PI / 2;
    ringGlow.position.set(0, 0.02, -2);
    this.group.add(ringGlow);

    // 2. Monolitos de obsidiana que custodian el abismo
    const monolithMat = new THREE.MeshStandardMaterial({ color: 0x07040a, roughness: 0.9 });
    const monolithCoords = [
      [-6, 4, -7],
      [6, 4, -7],
      [-7, 4, 1],
      [7, 4, 1]
    ];

    monolithCoords.forEach(([mx, my, mz]) => {
      const monolith = new THREE.Mesh(new THREE.BoxGeometry(1.6, 9, 1.6), monolithMat);
      monolith.position.set(mx, my, mz);
      this.group.add(monolith);
      this.colliders.push(new THREE.Box3().setFromObject(monolith));

      // Llama azul etérea en la cúspide de cada monolito
      const blueFlame = new THREE.PointLight(0x38bdf8, 2.8, 9);
      blueFlame.position.set(mx, 7, mz);
      this.group.add(blueFlame);

      this.animatedObjects.push({
        update: (time) => {
          blueFlame.intensity = 2.4 + Math.sin(time * 6 + mx) * 0.6;
        }
      });
    });

    // Muros invisibles para no caer de la plataforma
    const wallMat = new THREE.MeshBasicMaterial({ visible: false });
    const bWall = new THREE.Mesh(new THREE.BoxGeometry(18, 10, 1), wallMat);
    bWall.position.set(0, 4, -10);
    this.group.add(bWall);
    this.colliders.push(new THREE.Box3().setFromObject(bWall));

    const fWall = new THREE.Mesh(new THREE.BoxGeometry(18, 10, 1), wallMat);
    fWall.position.set(0, 4, 6);
    this.group.add(fWall);
    this.colliders.push(new THREE.Box3().setFromObject(fWall));

    const lWall = new THREE.Mesh(new THREE.BoxGeometry(1, 10, 18), wallMat);
    lWall.position.set(-8.5, 4, -2);
    this.group.add(lWall);
    this.colliders.push(new THREE.Box3().setFromObject(lWall));

    const rWall = new THREE.Mesh(new THREE.BoxGeometry(1, 10, 18), wallMat);
    rWall.position.set(8.5, 4, -2);
    this.group.add(rWall);
    this.colliders.push(new THREE.Box3().setFromObject(rWall));

    // 3. Atril sagrado y arcón primigenio del exorcismo (donde va la pista)
    const altarGroup = new THREE.Group();
    altarGroup.position.set(0, 0, -2.2);

    const altarPedestal = new THREE.Mesh(
      new THREE.CylinderGeometry(1.4, 1.8, 0.9, 8),
      new THREE.MeshStandardMaterial({ color: 0x1a0f26, roughness: 0.7, metalness: 0.3 })
    );
    altarPedestal.position.y = 0.45;
    altarPedestal.castShadow = true;
    altarPedestal.receiveShadow = true;
    altarGroup.add(altarPedestal);

    // Arcón arcano de hierro forjado donde arde el pacto
    const chest = new THREE.Mesh(
      new THREE.BoxGeometry(1.0, 0.4, 0.6),
      new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.9, roughness: 0.2 })
    );
    chest.position.y = 1.0;
    altarGroup.add(chest);

    this.group.add(altarGroup);
    this.colliders.push(new THREE.Box3().setFromObject(altarGroup));

    // 4. Luz mística del exorcismo (violeta y cian brillante)
    const exorcismLight = new THREE.PointLight(0x06b6d4, 4.5, 12);
    exorcismLight.position.set(0, 2.5, -2.2);
    this.group.add(exorcismLight);

    const abyssCoreLight = new THREE.PointLight(0x7c3aed, 3.5, 10);
    abyssCoreLight.position.set(0, -2, -2);
    this.group.add(abyssCoreLight);

    // 5. Partículas de energía etérea ascendente
    const sparkCount = 400;
    const sparkGeo = new THREE.BufferGeometry();
    const sparkPos = new Float32Array(sparkCount * 3);
    for (let i = 0; i < sparkCount * 3; i += 3) {
      sparkPos[i] = (Math.random() - 0.5) * 12;
      sparkPos[i + 1] = Math.random() * 8;
      sparkPos[i + 2] = (Math.random() - 0.5) * 12 - 2;
    }
    sparkGeo.setAttribute('position', new THREE.BufferAttribute(sparkPos, 3));
    const sparkMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.08,
      transparent: true,
      opacity: 0.8
    });
    const sparks = new THREE.Points(sparkGeo, sparkMat);
    this.group.add(sparks);

    this.animatedObjects.push({
      update: (time) => {
        const p = sparks.geometry.attributes.position.array;
        for (let i = 1; i < sparkCount * 3; i += 3) {
          p[i] += 0.06;
          if (p[i] > 8) p[i] = 0;
        }
        sparks.geometry.attributes.position.needsUpdate = true;
        exorcismLight.intensity = 3.8 + Math.sin(time * 3) * 0.8;
      }
    });

    const ambientLight = new THREE.AmbientLight(0x130e24, 0.6);
    this.group.add(ambientLight);

    // 6. Pistas interactivas
    this.clueDataList.forEach(clue => {
      const clueObj = PropsBuilder.createClueObject(clue);
      this.group.add(clueObj);
      this.interactiveObjects.push(clueObj);

      this.animatedObjects.push({
        update: (time) => {
          if (clueObj.userData.ring) {
            const s = 1 + Math.sin(time * 3) * 0.15;
            clueObj.userData.ring.scale.set(s, s, s);
          }
        }
      });
    });

    this.scene.add(this.group);
  }

  update(time, delta) {
    for (const obj of this.animatedObjects) {
      obj.update(time, delta);
    }
  }

  destroy() {
    this.scene.remove(this.group);
  }
}
