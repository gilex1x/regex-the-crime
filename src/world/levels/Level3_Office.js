import * as THREE from 'three';
import { PropsBuilder } from '../PropsBuilder.js';

/**
 * Nivel 3: La Caja Fuerte del Banquero Corrupto
 */
export class Level3_Office {
  constructor(scene, clueDataList) {
    this.scene = scene;
    this.clueDataList = clueDataList;
    this.group = new THREE.Group();
    this.colliders = [];
    this.animatedObjects = [];
    this.interactiveObjects = [];
  }

  build() {
    // 1. Alfombra roja de lujo
    const floorGeo = new THREE.PlaneGeometry(14, 14);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x581c1c, // Rojo burdeos elegante
      roughness: 0.85
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    this.group.add(floor);

    // 2. Paredes de caoba y madera noble
    const wallMat = new THREE.MeshStandardMaterial({
      color: 0x1c130e,
      roughness: 0.7
    });

    // Pared trasera
    const backWall = new THREE.Mesh(new THREE.BoxGeometry(14, 5.5, 0.4), wallMat);
    backWall.position.set(0, 2.75, -7);
    this.group.add(backWall);
    this.colliders.push(new THREE.Box3().setFromObject(backWall));

    // Pared frontal
    const frontWall = new THREE.Mesh(new THREE.BoxGeometry(14, 5.5, 0.4), wallMat);
    frontWall.position.set(0, 2.75, 7);
    this.group.add(frontWall);
    this.colliders.push(new THREE.Box3().setFromObject(frontWall));

    // Pared izquierda (donde está la caja fuerte empotrada)
    const leftWall = new THREE.Mesh(new THREE.BoxGeometry(0.4, 5.5, 14), wallMat);
    leftWall.position.set(-7, 2.75, 0);
    this.group.add(leftWall);
    this.colliders.push(new THREE.Box3().setFromObject(leftWall));

    // Pared derecha (con librerías de caoba)
    const rightWall = new THREE.Mesh(new THREE.BoxGeometry(0.4, 5.5, 14), wallMat);
    rightWall.position.set(7, 2.75, 0);
    this.group.add(rightWall);
    this.colliders.push(new THREE.Box3().setFromObject(rightWall));

    // Techo
    const ceiling = new THREE.Mesh(new THREE.PlaneGeometry(14, 14), new THREE.MeshStandardMaterial({ color: 0x110c09 }));
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = 5.5;
    this.group.add(ceiling);

    // 3. Gran escritorio ejecutivo
    const deskGroup = new THREE.Group();
    deskGroup.position.set(0, 0, -2.5);

    const mainDesk = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.9, 2), new THREE.MeshStandardMaterial({ color: 0x2b1810, roughness: 0.4 }));
    mainDesk.position.y = 0.45;
    deskGroup.add(mainDesk);

    // Silla de piel del banquero
    const chair = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.6, 1), new THREE.MeshStandardMaterial({ color: 0x3b0764, roughness: 0.5 }));
    chair.position.set(0, 0.8, -1.6);
    deskGroup.add(chair);

    this.group.add(deskGroup);
    this.colliders.push(new THREE.Box3().setFromObject(deskGroup));

    // 4. Estanterías con libros antiguos en la pared derecha
    for (let z = -4; z <= 4; z += 2.8) {
      const shelf = new THREE.Mesh(new THREE.BoxGeometry(0.6, 4, 2.2), new THREE.MeshStandardMaterial({ color: 0x1f140e, roughness: 0.8 }));
      shelf.position.set(6.4, 2, z);
      this.group.add(shelf);
      this.colliders.push(new THREE.Box3().setFromObject(shelf));
    }

    // 5. Cuadro que cubre parcialmente la caja fuerte secreta
    const frameGeo = new THREE.BoxGeometry(0.1, 1.8, 1.5);
    const frameMat = new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.8 });
    const frame = new THREE.Mesh(frameGeo, frameMat);
    frame.position.set(-6.7, 2.6, -2.2);
    frame.rotation.y = 0.4; // Ligeramente entreabierto revelando la caja fuerte
    this.group.add(frame);

    // Caja fuerte de acero en la pared
    const vaultDoor = new THREE.Mesh(new THREE.BoxGeometry(0.4, 1.4, 1.2), new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.9, roughness: 0.2 }));
    vaultDoor.position.set(-6.7, 2.5, -2.8);
    this.group.add(vaultDoor);

    // LED de la caja fuerte (parpadeo verde/rojo)
    const ledLight = new THREE.PointLight(0x22c55e, 2, 3);
    ledLight.position.set(-6.4, 2.8, -2.8);
    this.group.add(ledLight);
    this.animatedObjects.push({
      update: (time) => {
        ledLight.intensity = Math.sin(time * 6) > 0 ? 2.5 : 0.4;
      }
    });

    // Foco de realce sobre la caja fuerte
    const vaultSpot = new THREE.PointLight(0x38bdf8, 6, 6);
    vaultSpot.position.set(-6.0, 2.8, -2.8);
    this.group.add(vaultSpot);

    // 6. Araña de luces antigua en el techo e iluminación ambiental de lujo
    const chandelier = new THREE.Group();
    chandelier.position.set(0, 4.4, -1);
    const chandelierLight = new THREE.PointLight(0xfef3c7, 26, 20, 1.0);
    chandelier.add(chandelierLight);
    this.group.add(chandelier);

    const officeFill = new THREE.HemisphereLight(0xfef3c7, 0x581c1c, 1.4);
    this.group.add(officeFill);

    // 7. Pistas interactivas

    // -- DETALLES EXTRA: OFFICE ENRIQUECIDO --
    const cabinetGeo = new THREE.BoxGeometry(1.2, 2.5, 0.8);
    const cabinetMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.5, flatShading: true });
    for (let i = 0; i < 3; i++) {
      const cabinet = new THREE.Mesh(cabinetGeo, cabinetMat);
      cabinet.position.set(-4 + (i * 1.3), 1.25, -5.5);
      this.group.add(cabinet);
      this.colliders.push(new THREE.Box3().setFromObject(cabinet));
    }

    // Máquina de escribir mecánica sobre el escritorio
    const typewriter = PropsBuilder.createTypewriter();
    typewriter.position.set(-0.6, 0.95, -0.2);
    typewriter.rotation.y = 0.2;
    this.group.add(typewriter);

    // Reloj señorial de péndulo contra la pared
    const grandClock = PropsBuilder.createGrandClock();
    grandClock.position.set(5.8, 1.8, -4.5);
    this.group.add(grandClock);
    this.colliders.push(new THREE.Box3().setFromObject(grandClock));
    this.clueDataList.forEach(clue => {
      const clueObj = PropsBuilder.createClueObject(clue);
      this.group.add(clueObj);
      this.interactiveObjects.push(clueObj);

      this.animatedObjects.push({
        update: (time) => {
          if (clueObj.userData.ring) {
            const s = 1 + Math.sin(time * 3.5) * 0.18;
            clueObj.userData.ring.scale.set(s, s, s);
          }
        }
      });
    });

    // -- NPC: SR. STERLING, AUDITOR FINANCIERO CORRUPTO --
    const banker = PropsBuilder.createBanker();
    banker.position.set(3.0, 0, -0.5);
    banker.rotation.y = -Math.PI / 3;
    banker.userData = {
      isNPC: true,
      npcData: {
        name: "Sr. Sterling",
        role: "Auditor del Banco Central",
        avatar: "💼",
        dialogues: [
          "¡Le juro que esos libros contables son legítimos, Vance! Yo solo firmo las órdenes de transferencia y los bonos al portador.",
          "Si Carmine Falcone se entera de que la policía revisa los expedientes de las cajas fuertes, mi cadáver terminará flotando en el puerto.",
          "Esa cuenta suiza no es mía... canaliza millones hacia la 'Clínica Renacer'. Pagan sumas monstruosas por furgones refrigerados cada medianoche."
        ]
      }
    };
    this.group.add(banker);
    this.interactiveObjects.push(banker);
    this.colliders.push(new THREE.Box3().setFromObject(banker));

    this.animatedObjects.push({
      update: (time) => {
        banker.rotation.y = -Math.PI / 3 + Math.sin(time * 1.6) * 0.04;
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
