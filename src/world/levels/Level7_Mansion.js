import * as THREE from 'three';
import { PropsBuilder } from '../PropsBuilder.js';

/**
 * Escenario 7 (Tier 4): El Club Privado / Mansión de la Élite
 */
export class Level7_Mansion {
  constructor(scene, clueDataList) {
    this.scene = scene;
    this.clueDataList = clueDataList;
    this.group = new THREE.Group();
    this.colliders = [];
    this.animatedObjects = [];
    this.interactiveObjects = [];
  }

  build() {
    // 1. Suelo de parquet de caoba victoriano
    const parquetTex = PropsBuilder.getWoodParquetTexture();
    parquetTex.repeat.set(8, 8);

    const floorGeo = new THREE.PlaneGeometry(14, 14);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x3d1f14,
      map: parquetTex,
      roughness: 0.35,
      metalness: 0.15
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    this.group.add(floor);

    // Alfombra persa central
    const rugGeo = new THREE.PlaneGeometry(7, 5);
    const rugMat = new THREE.MeshStandardMaterial({ color: 0x6b1d2f, roughness: 0.9 });
    const rug = new THREE.Mesh(rugGeo, rugMat);
    rug.rotation.x = -Math.PI / 2;
    rug.position.set(0, 0.02, -2.2);
    this.group.add(rug);

    // 2. Paredes de boiserie verde esmeralda y caoba
    const wallMat = new THREE.MeshStandardMaterial({ color: 0x14231e, roughness: 0.65 });

    // Pared trasera con chimenea victoriana
    const backWall = new THREE.Mesh(new THREE.BoxGeometry(14, 5.5, 0.4), wallMat);
    backWall.position.set(0, 2.75, -7);
    this.group.add(backWall);
    this.colliders.push(new THREE.Box3().setFromObject(backWall));

    // Chimenea de piedra
    const firePlaceBase = new THREE.Mesh(
      new THREE.BoxGeometry(3.4, 2.2, 0.8),
      new THREE.MeshStandardMaterial({ color: 0x27272a, roughness: 0.8 })
    );
    firePlaceBase.position.set(0, 1.1, -6.6);
    this.group.add(firePlaceBase);
    this.colliders.push(new THREE.Box3().setFromObject(firePlaceBase));

    // Hueco del fuego
    const fireHole = new THREE.Mesh(
      new THREE.BoxGeometry(1.8, 1.2, 0.4),
      new THREE.MeshBasicMaterial({ color: 0x050505 })
    );
    fireHole.position.set(0, 0.8, -6.3);
    this.group.add(fireHole);

    // Luz y fuego de la chimenea
    const fireLight = new THREE.PointLight(0xf97316, 3.2, 9);
    fireLight.position.set(0, 0.9, -6.1);
    this.group.add(fireLight);

    this.animatedObjects.push({
      update: (time) => {
        fireLight.intensity = 2.8 + Math.sin(time * 7) * 0.5 + Math.cos(time * 13) * 0.3;
      }
    });

    // Cuadro al óleo sobre la chimenea
    const portrait = new THREE.Mesh(
      new THREE.BoxGeometry(2.2, 1.6, 0.1),
      new THREE.MeshStandardMaterial({ color: 0x854d0e, roughness: 0.4 })
    );
    portrait.position.set(0, 3.4, -6.7);
    this.group.add(portrait);

    // Pared frontal
    const frontWall = new THREE.Mesh(new THREE.BoxGeometry(14, 5.5, 0.4), wallMat);
    frontWall.position.set(0, 2.75, 7);
    this.group.add(frontWall);
    this.colliders.push(new THREE.Box3().setFromObject(frontWall));

    // Pared izquierda
    const leftWall = new THREE.Mesh(new THREE.BoxGeometry(0.4, 5.5, 14), wallMat);
    leftWall.position.set(-7, 2.75, 0);
    this.group.add(leftWall);
    this.colliders.push(new THREE.Box3().setFromObject(leftWall));

    // Pared derecha
    const rightWall = new THREE.Mesh(new THREE.BoxGeometry(0.4, 5.5, 14), wallMat);
    rightWall.position.set(7, 2.75, 0);
    this.group.add(rightWall);
    this.colliders.push(new THREE.Box3().setFromObject(rightWall));

    // Techo con molduras
    const ceiling = new THREE.Mesh(
      new THREE.PlaneGeometry(14, 14),
      new THREE.MeshStandardMaterial({ color: 0x181411, roughness: 0.9 })
    );
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = 5.5;
    this.group.add(ceiling);

    // 3. Mesa de té y tertulia central (donde va la pista)
    const tableGroup = new THREE.Group();
    tableGroup.position.set(0, 0, -2.2);

    const tableTop = new THREE.Mesh(
      new THREE.CylinderGeometry(1.2, 1.2, 0.1, 16),
      new THREE.MeshStandardMaterial({ color: 0x22130c, roughness: 0.3, metalness: 0.2 })
    );
    tableTop.position.y = 0.8;
    tableTop.castShadow = true;
    tableTop.receiveShadow = true;
    tableGroup.add(tableTop);

    const tableLeg = new THREE.Mesh(
      new THREE.CylinderGeometry(0.15, 0.3, 0.8, 12),
      new THREE.MeshStandardMaterial({ color: 0x120a06, roughness: 0.5 })
    );
    tableLeg.position.y = 0.4;
    tableGroup.add(tableLeg);

    // Licorera de cristal sobre la mesa
    const decanter = new THREE.Mesh(
      new THREE.CylinderGeometry(0.1, 0.16, 0.4, 12),
      new THREE.MeshStandardMaterial({ color: 0xfef08a, transparent: true, opacity: 0.6, roughness: 0.1 })
    );
    decanter.position.set(0.45, 1.05, 0.2);
    tableGroup.add(decanter);

    this.group.add(tableGroup);
    this.colliders.push(new THREE.Box3().setFromObject(tableGroup));

    // 4. Sillones Chesterfield de cuero
    const sofaMat = new THREE.MeshStandardMaterial({ color: 0x450a0a, roughness: 0.6 });
    // Sillón izquierdo
    const sofaLeft = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.1, 1.6), sofaMat);
    sofaLeft.position.set(-2.2, 0.55, -2.2);
    this.group.add(sofaLeft);
    this.colliders.push(new THREE.Box3().setFromObject(sofaLeft));

    // Sillón derecho
    const sofaRight = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.1, 1.6), sofaMat);
    sofaRight.position.set(2.2, 0.55, -2.2);
    this.group.add(sofaRight);
    this.colliders.push(new THREE.Box3().setFromObject(sofaRight));

    // Lámpara de araña cenital cálida
    const chandelierLight = new THREE.PointLight(0xfef08a, 2.5, 9);
    chandelierLight.position.set(0, 4.4, -2.2);
    this.group.add(chandelierLight);

    // Luz ambiental acogedora
    const ambientLight = new THREE.AmbientLight(0x271e16, 0.75);
    this.group.add(ambientLight);

    // 5. Pistas interactivas

    // -- DETALLES EXTRA: MANSION ENRIQUECIDA --
    const sofaGeo = new THREE.BoxGeometry(3, 1, 1.2);
    const extraSofaMat = new THREE.MeshStandardMaterial({ color: 0x4c1d95, roughness: 0.8, flatShading: true });
    const sofa = new THREE.Mesh(sofaGeo, extraSofaMat);
    sofa.position.set(0, 0.5, -1);
    this.group.add(sofa);
    this.colliders.push(new THREE.Box3().setFromObject(sofa));

    // Mesa auxiliar con fonógrafo clásico
    const sideTable = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 0.8, 8), new THREE.MeshStandardMaterial({ color: 0x271911, roughness: 0.7 }));
    sideTable.position.set(-3.2, 0.4, -2.2);
    this.group.add(sideTable);
    this.colliders.push(new THREE.Box3().setFromObject(sideTable));

    const gramo = PropsBuilder.createGramophone();
    gramo.position.set(-3.2, 0.8, -2.2);
    this.group.add(gramo);

    // Leños encendidos en la chimenea
    const logMat = new THREE.MeshStandardMaterial({ color: 0x2e1005, roughness: 0.9 });
    for (let l = 0; l < 3; l++) {
      const log = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.8, 6), logMat);
      log.rotation.z = Math.PI / 2;
      log.rotation.y = (l * Math.PI) / 3;
      log.position.set(0, 0.15, -6.2);
      this.group.add(log);
    }
    const fireEmber = new THREE.PointLight(0xf97316, 6, 6);
    fireEmber.position.set(0, 0.4, -6.0);
    this.group.add(fireEmber);
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

    // -- NPC: LORD ARCHIBALD VANCE, MECENAS DE LA ÉLITE --
    const aristocrat = PropsBuilder.createAristocrat();
    aristocrat.position.set(3.2, 0, -2.5);
    aristocrat.rotation.y = -Math.PI / 4;
    aristocrat.userData = {
      isNPC: true,
      npcData: {
        name: "Lord Archibald Vance",
        role: "Patrono del Club de la Élite",
        avatar: "🎩",
        dialogues: [
          "¿La moral, querido detective? Qué noción tan pintoresca de la clase trabajadora. La longevidad cuesta millones y un par de donantes anónimos.",
          "Mire mis manos: tengo setenta y ocho años y el vigor de un muchacho de treinta. La Dra. Evelyn Cross es una auténtica salvadora.",
          "Nadie en este club irá a prisión, Vance. Los jueces, los senadores y los jefes de policía son miembros honorarios de la Clínica Renacer."
        ]
      }
    };
    this.group.add(aristocrat);
    this.interactiveObjects.push(aristocrat);
    this.colliders.push(new THREE.Box3().setFromObject(aristocrat));

    this.animatedObjects.push({
      update: (time) => {
        aristocrat.rotation.y = -Math.PI / 4 + Math.sin(time * 1.3) * 0.03;
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
