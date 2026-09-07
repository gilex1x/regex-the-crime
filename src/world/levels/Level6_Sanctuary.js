import * as THREE from 'three';
import { PropsBuilder } from '../PropsBuilder.js';

/**
 * Escenario 6: El Santuario Subterráneo y Bóveda Demoníaca de Malphas
 */
export class Level6_Sanctuary {
  constructor(scene, clueDataList) {
    this.scene = scene;
    this.clueDataList = clueDataList;
    this.group = new THREE.Group();
    this.colliders = [];
    this.animatedObjects = [];
    this.interactiveObjects = [];
  }

  build() {
    // 1. Suelo de piedra de catacumba milenaria
    const stoneTex = PropsBuilder.getRuneStoneTexture();
    stoneTex.repeat.set(8, 8);

    const floorGeo = new THREE.PlaneGeometry(16, 16);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x18131e,
      map: stoneTex,
      roughness: 0.85,
      metalness: 0.15
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    this.group.add(floor);

    // 2. Muros de piedra con símbolos arcanos
    const wallMat = new THREE.MeshStandardMaterial({
      color: 0x110c17,
      map: stoneTex,
      roughness: 0.9
    });

    // Muro trasero con arco ciego
    const backWall = new THREE.Mesh(new THREE.BoxGeometry(16, 6.5, 0.6), wallMat);
    backWall.position.set(0, 3.25, -8);
    this.group.add(backWall);
    this.colliders.push(new THREE.Box3().setFromObject(backWall));

    // Muro frontal
    const frontWall = new THREE.Mesh(new THREE.BoxGeometry(16, 6.5, 0.6), wallMat);
    frontWall.position.set(0, 3.25, 8);
    this.group.add(frontWall);
    this.colliders.push(new THREE.Box3().setFromObject(frontWall));

    // Muro izquierdo
    const leftWall = new THREE.Mesh(new THREE.BoxGeometry(0.6, 6.5, 16), wallMat);
    leftWall.position.set(-8, 3.25, 0);
    this.group.add(leftWall);
    this.colliders.push(new THREE.Box3().setFromObject(leftWall));

    // Muro derecho
    const rightWall = new THREE.Mesh(new THREE.BoxGeometry(0.6, 6.5, 16), wallMat);
    rightWall.position.set(8, 3.25, 0);
    this.group.add(rightWall);
    this.colliders.push(new THREE.Box3().setFromObject(rightWall));

    // Bóveda / Techo gótico oscuro
    const ceiling = new THREE.Mesh(
      new THREE.PlaneGeometry(16, 16),
      new THREE.MeshStandardMaterial({ color: 0x07050a, roughness: 0.95 })
    );
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = 6.5;
    this.group.add(ceiling);

    // 3. Cuatro columnas de sillería de piedra
    const pillarMat = new THREE.MeshStandardMaterial({ color: 0x1e1728, roughness: 0.8 });
    const pillarPositions = [
      [-4.5, 3.25, -4],
      [4.5, 3.25, -4],
      [-4.5, 3.25, 3],
      [4.5, 3.25, 3]
    ];

    pillarPositions.forEach(([px, py, pz]) => {
      const pillar = new THREE.Mesh(new THREE.BoxGeometry(1.2, 6.5, 1.2), pillarMat);
      pillar.position.set(px, py, pz);
      this.group.add(pillar);
      this.colliders.push(new THREE.Box3().setFromObject(pillar));

      // Candelabro con llama en cada columna
      const torch = new THREE.PointLight(0xf97316, 1.8, 7);
      torch.position.set(px, 3.5, pz + (pz < 0 ? 0.8 : -0.8));
      this.group.add(torch);

      this.animatedObjects.push({
        update: (time) => {
          torch.intensity = 1.6 + Math.sin(time * 8 + px) * 0.4;
        }
      });
    });

    // 4. Círculo de invocación rúnico carmesí en el suelo
    const runeRingGeo = new THREE.RingGeometry(2.4, 2.7, 32);
    const runeRingMat = new THREE.MeshBasicMaterial({
      color: 0xd946ef,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.75
    });
    const runeRing = new THREE.Mesh(runeRingGeo, runeRingMat);
    runeRing.rotation.x = -Math.PI / 2;
    runeRing.position.set(0, 0.03, -2.2);
    this.group.add(runeRing);

    // Anillo interior
    const innerRingGeo = new THREE.RingGeometry(1.4, 1.55, 24);
    const innerRingMat = new THREE.MeshBasicMaterial({
      color: 0xef4444,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8
    });
    const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat);
    innerRing.rotation.x = -Math.PI / 2;
    innerRing.position.set(0, 0.04, -2.2);
    this.group.add(innerRing);

    // Luz abisal que emana del círculo
    const abyssLight = new THREE.PointLight(0xa855f7, 3.5, 8);
    abyssLight.position.set(0, 0.8, -2.2);
    this.group.add(abyssLight);

    this.animatedObjects.push({
      update: (time) => {
        const glow = 0.6 + Math.sin(time * 2.5) * 0.3;
        runeRingMat.opacity = glow;
        innerRingMat.opacity = glow * 1.1;
        abyssLight.intensity = 2.8 + Math.sin(time * 3) * 0.8;
      }
    });

    // 5. Altar de piedra y atril del contrato
    const altarGroup = new THREE.Group();
    altarGroup.position.set(0, 0, -2.2);

    const altarBase = new THREE.Mesh(
      new THREE.BoxGeometry(2.0, 0.8, 1.2),
      new THREE.MeshStandardMaterial({ color: 0x271e33, roughness: 0.7, metalness: 0.2 })
    );
    altarBase.position.y = 0.4;
    altarBase.castShadow = true;
    altarBase.receiveShadow = true;
    altarGroup.add(altarBase);

    // Arcón o libro sobre el altar
    const chest = new THREE.Mesh(
      new THREE.BoxGeometry(0.8, 0.25, 0.5),
      new THREE.MeshStandardMaterial({ color: 0x450a0a, metalness: 0.6, roughness: 0.4 })
    );
    chest.position.y = 0.9;
    altarGroup.add(chest);

    this.group.add(altarGroup);
    this.colliders.push(new THREE.Box3().setFromObject(altarGroup));

    // 6. Luz ambiental violeta de la cripta
    const ambientLight = new THREE.AmbientLight(0x2e1065, 0.7);
    this.group.add(ambientLight);

    // 7. Renderizar pistas interactivas

    // -- DETALLES EXTRA: SANCTUARY ENRIQUECIDO --
    const pillarGeo = new THREE.CylinderGeometry(0.5, 0.5, 6, 8);
    const extraPillarMat = new THREE.MeshStandardMaterial({ color: 0x1c1917, roughness: 0.9, flatShading: true });
    for (let i = 0; i < 4; i++) {
      const pillar = new THREE.Mesh(pillarGeo, extraPillarMat);
      pillar.position.set(i % 2 === 0 ? -4 : 4, 3, -2 - Math.floor(i / 2) * 4);
      this.group.add(pillar);
      this.colliders.push(new THREE.Box3().setFromObject(pillar));

      const fire = new THREE.PointLight(0xf97316, 5, 8);
      fire.position.set(pillar.position.x, 2, pillar.position.z + 0.6);
      this.group.add(fire);
    }

    // Candelabros de forja gótica flanqueando el altar
    const candelabraL = PropsBuilder.createCandelabra();
    candelabraL.position.set(-2.4, 0, -4.2);
    const candelabraR = PropsBuilder.createCandelabra();
    candelabraR.position.set(2.4, 0, -4.2);
    this.group.add(candelabraL, candelabraR);
    this.colliders.push(new THREE.Box3().setFromObject(candelabraL), new THREE.Box3().setFromObject(candelabraR));

    // Círculo ritual rúnico en el suelo
    const circleRing = new THREE.Mesh(new THREE.RingGeometry(2.4, 2.7, 16), new THREE.MeshStandardMaterial({ color: 0xa855f7, emissive: 0x6b21a8, emissiveIntensity: 0.8, side: THREE.DoubleSide }));
    circleRing.rotation.x = -Math.PI / 2;
    circleRing.position.set(0, 0.02, -2.5);
    this.group.add(circleRing);
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

    // -- NPC: HERMANO THADDEUS, CULTISTA RENEGADO --
    const cultist = PropsBuilder.createCultist();
    cultist.position.set(-3.0, 0, -2.5);
    cultist.rotation.y = Math.PI / 4;
    cultist.userData = {
      isNPC: true,
      npcData: {
        name: "Hermano Thaddeus",
        role: "Guardián de las Cenizas del Santuario",
        avatar: "🕯️",
        dialogues: [
          "Las palabras no son simples letras, detective Vance... son ataduras cósmicas dictadas por Malphas en el amanecer de los tiempos.",
          "La Hermandad del Bisturí le entregó esta ciudad. Cada persona de sus listas contrajo una deuda con el demonio a cambio de milagros o riquezas.",
          "El arcón del altar solo cederá ante los patrones sagrados. La sintaxis del grimorio no perdona errores: un ancla fuera de lugar y su alma arderá."
        ]
      }
    };
    this.group.add(cultist);
    this.interactiveObjects.push(cultist);
    this.colliders.push(new THREE.Box3().setFromObject(cultist));

    this.animatedObjects.push({
      update: (time) => {
        cultist.rotation.y = Math.PI / 4 + Math.sin(time * 1.2) * 0.03;
      }
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
