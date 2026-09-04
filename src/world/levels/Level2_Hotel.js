import * as THREE from 'three';
import { PropsBuilder } from '../PropsBuilder.js';

/**
 * Nivel 2: El Cuarto 404 del Hotel Noir
 */
export class Level2_Hotel {
  constructor(scene, clueDataList) {
    this.scene = scene;
    this.clueDataList = clueDataList;
    this.group = new THREE.Group();
    this.colliders = [];
    this.animatedObjects = [];
    this.interactiveObjects = [];
  }

  build() {
    // 1. Suelo de parqué antiguo
    const floorGeo = new THREE.PlaneGeometry(12, 12);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x42291d,
      roughness: 0.45,
      metalness: 0.15
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    this.group.add(floor);

    // 2. Paredes de la habitación
    const wallMat = new THREE.MeshStandardMaterial({
      color: 0x192823, // Verde vintage decadente
      roughness: 0.8
    });

    // Pared trasera
    const backWall = new THREE.Mesh(new THREE.BoxGeometry(12, 5, 0.4), wallMat);
    backWall.position.set(0, 2.5, -6);
    this.group.add(backWall);
    this.colliders.push(new THREE.Box3().setFromObject(backWall));

    // Pared frontal (con puerta)
    const frontWall = new THREE.Mesh(new THREE.BoxGeometry(12, 5, 0.4), wallMat);
    frontWall.position.set(0, 2.5, 6);
    this.group.add(frontWall);
    this.colliders.push(new THREE.Box3().setFromObject(frontWall));

    // Pared izquierda
    const leftWall = new THREE.Mesh(new THREE.BoxGeometry(0.4, 5, 12), wallMat);
    leftWall.position.set(-6, 2.5, 0);
    this.group.add(leftWall);
    this.colliders.push(new THREE.Box3().setFromObject(leftWall));

    // Pared derecha
    const rightWall = new THREE.Mesh(new THREE.BoxGeometry(0.4, 5, 12), wallMat);
    rightWall.position.set(6, 2.5, 0);
    this.group.add(rightWall);
    this.colliders.push(new THREE.Box3().setFromObject(rightWall));

    // Techo con molduras
    const ceiling = new THREE.Mesh(new THREE.PlaneGeometry(12, 12), new THREE.MeshStandardMaterial({ color: 0x141817 }));
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = 5;
    this.group.add(ceiling);

    // 3. Ventilador de techo giratorio
    const fanGroup = new THREE.Group();
    fanGroup.position.set(0, 4.6, 0);
    const fanRod = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.7), new THREE.MeshStandardMaterial({ color: 0x18181b }));
    fanGroup.add(fanRod);

    const bladesGroup = new THREE.Group();
    bladesGroup.position.y = -0.35;
    for (let i = 0; i < 4; i++) {
      const blade = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.02, 0.18), new THREE.MeshStandardMaterial({ color: 0x3d2817 }));
      blade.rotation.y = (i * Math.PI) / 2;
      bladesGroup.add(blade);
    }
    fanGroup.add(bladesGroup);
    this.group.add(fanGroup);
    this.animatedObjects.push({
      update: (time, delta) => {
        bladesGroup.rotation.y += delta * 2.5;
      }
    });

    // 4. Cama de la víctima con cinta policial
    const bedGroup = new THREE.Group();
    bedGroup.position.set(-3.2, 0, -3.2);

    const bedFrame = new THREE.Mesh(new THREE.BoxGeometry(3, 0.6, 4.2), new THREE.MeshStandardMaterial({ color: 0x271911 }));
    bedFrame.position.y = 0.3;
    bedGroup.add(bedFrame);

    const mattress = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.5, 3.9), new THREE.MeshStandardMaterial({ color: 0x94a3b8 }));
    mattress.position.y = 0.75;
    bedGroup.add(mattress);

    // Almohada
    const pillow = new THREE.Mesh(new THREE.BoxGeometry(2, 0.2, 0.9), new THREE.MeshStandardMaterial({ color: 0xf8fafc }));
    pillow.position.set(0, 1.1, -1.3);
    bedGroup.add(pillow);

    this.group.add(bedGroup);
    this.colliders.push(new THREE.Box3().setFromObject(bedGroup));

    // 5. Mesa de trabajo con lámpara verde de banquero
    const deskGroup = new THREE.Group();
    deskGroup.position.set(3, 0, -2);

    const deskTop = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.1, 1.4), new THREE.MeshStandardMaterial({ color: 0x3f2e20 }));
    deskTop.position.y = 0.95;
    deskGroup.add(deskTop);

    // Patas de mesa
    for (const [x, z] of [[-1, -0.5], [1, -0.5], [-1, 0.5], [1, 0.5]]) {
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.95), new THREE.MeshStandardMaterial({ color: 0x221810 }));
      leg.position.set(x, 0.475, z);
      deskGroup.add(leg);
    }

    // Lámpara verde de banquero
    const lampBase = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 0.05), new THREE.MeshStandardMaterial({ color: 0xca8a04, metalness: 0.8 }));
    lampBase.position.set(0.6, 1.02, -0.3);
    deskGroup.add(lampBase);

    const lampShade = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.25, 0.18, 8), new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.2 }));
    lampShade.position.set(0.6, 1.3, -0.3);
    lampShade.rotation.z = 0.2;
    deskGroup.add(lampShade);

    const deskLight = new THREE.PointLight(0x86efac, 8, 9);
    deskLight.position.set(0.6, 1.2, -0.3);
    deskGroup.add(deskLight);

    this.group.add(deskGroup);
    this.colliders.push(new THREE.Box3().setFromObject(deskGroup));

    // 6. Lámpara central de techo e iluminación ambiental de habitación
    const ceilingLamp = new THREE.PointLight(0xfef3c7, 20, 16, 1.0);
    ceilingLamp.position.set(0, 4.2, 0);
    this.group.add(ceilingLamp);

    const roomFill = new THREE.HemisphereLight(0xfef3c7, 0x2e1c14, 1.3);
    this.group.add(roomFill);

    // Luz de luna por la ventana
    const moonLight = new THREE.DirectionalLight(0x93c5fd, 1.4);
    moonLight.position.set(5, 7, 3);
    this.group.add(moonLight);

    // 7. Pistas interactivas

    // -- DETALLES EXTRA: HOTEL --
    const rugGeo = new THREE.PlaneGeometry(5, 7);
    const rugMat = new THREE.MeshStandardMaterial({ color: 0x7f1d1d, roughness: 0.9 });
    const rug = new THREE.Mesh(rugGeo, rugMat);
    rug.rotation.x = -Math.PI / 2;
    rug.position.set(0, 0.01, -1);
    this.group.add(rug);

    const paintingGeo = new THREE.BoxGeometry(2.5, 3.5, 0.1);
    const paintingMat = new THREE.MeshStandardMaterial({ color: 0x0f172a });
    const painting = new THREE.Mesh(paintingGeo, paintingMat);
    painting.position.set(-5.9, 2.5, -1);
    this.group.add(painting);
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
