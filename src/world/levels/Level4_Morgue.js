import * as THREE from 'three';
import { PropsBuilder } from '../PropsBuilder.js';

/**
 * Escenario 4: La Morgue y Laboratorio Clandestino de la Dra. Cross
 */
export class Level4_Morgue {
  constructor(scene, clueDataList) {
    this.scene = scene;
    this.clueDataList = clueDataList;
    this.group = new THREE.Group();
    this.colliders = [];
    this.animatedObjects = [];
    this.interactiveObjects = [];
  }

  build() {
    // 1. Suelo de azulejos clínicos húmedos
    const tileTex = PropsBuilder.getHospitalTileTexture();
    tileTex.repeat.set(10, 10);

    const floorGeo = new THREE.PlaneGeometry(14, 14);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x1e292b,
      map: tileTex,
      roughness: 0.25,
      metalness: 0.35
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    this.group.add(floor);

    // 2. Paredes de la morgue
    const wallMat = new THREE.MeshStandardMaterial({
      color: 0x162224,
      map: tileTex,
      roughness: 0.5
    });

    // Pared trasera con nichos de refrigeración de cadáveres
    const backWall = new THREE.Mesh(new THREE.BoxGeometry(14, 5.5, 0.4), wallMat);
    backWall.position.set(0, 2.75, -7);
    this.group.add(backWall);
    this.colliders.push(new THREE.Box3().setFromObject(backWall));

    // Puertas metálicas de nichos mortuorios
    for (let x = -4; x <= 4; x += 2) {
      for (let y = 1; y <= 3.5; y += 1.2) {
        const lockerDoor = new THREE.Mesh(
          new THREE.BoxGeometry(1.6, 0.9, 0.1),
          new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.8, roughness: 0.3 })
        );
        lockerDoor.position.set(x, y, -6.75);
        this.group.add(lockerDoor);
      }
    }

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

    // Techo
    const ceiling = new THREE.Mesh(
      new THREE.PlaneGeometry(14, 14),
      new THREE.MeshStandardMaterial({ color: 0x0f1718, roughness: 0.9 })
    );
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = 5.5;
    this.group.add(ceiling);

    // 3. Mesa de disección / autopsia central de acero inoxidable
    const tableGroup = new THREE.Group();
    tableGroup.position.set(0, 0, -2);

    const tableTop = new THREE.Mesh(
      new THREE.BoxGeometry(1.6, 0.15, 3.2),
      new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9, roughness: 0.15 })
    );
    tableTop.position.y = 0.85;
    tableTop.castShadow = true;
    tableTop.receiveShadow = true;
    tableGroup.add(tableTop);

    const pedestal = new THREE.Mesh(
      new THREE.CylinderGeometry(0.35, 0.45, 0.8, 16),
      new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.8, roughness: 0.3 })
    );
    pedestal.position.y = 0.4;
    tableGroup.add(pedestal);

    this.group.add(tableGroup);
    this.colliders.push(new THREE.Box3().setFromObject(tableGroup));

    // 4. Lámpara quirúrgica cenital colgante
    const lampArm = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, 2.2, 8),
      new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.7 })
    );
    lampArm.position.set(0, 4.4, -2);
    this.group.add(lampArm);

    const lampDome = new THREE.Mesh(
      new THREE.SphereGeometry(0.8, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2),
      new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.85, roughness: 0.2, side: THREE.DoubleSide })
    );
    lampDome.rotation.x = Math.PI;
    lampDome.position.set(0, 3.3, -2);
    this.group.add(lampDome);

    // Luz quirúrgica fría intensa sobre la mesa
    const surgicalLight = new THREE.SpotLight(0x38bdf8, 5, 8, Math.PI / 3.5, 0.3);
    surgicalLight.position.set(0, 3.2, -2);
    surgicalLight.target = tableTop;
    this.group.add(surgicalLight);

    // 5. Estantes con frascos de órganos en formol
    for (let z = -3; z <= 3; z += 2.5) {
      const shelf = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 2.8, 1.8),
        new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.6 })
      );
      shelf.position.set(-6.6, 1.4, z);
      this.group.add(shelf);
      this.colliders.push(new THREE.Box3().setFromObject(shelf));

      // Frasco cilíndrico de vidrio con órgano
      const jar = new THREE.Mesh(
        new THREE.CylinderGeometry(0.18, 0.18, 0.5, 12),
        new THREE.MeshStandardMaterial({
          color: 0x22d3ee,
          transparent: true,
          opacity: 0.45,
          roughness: 0.1
        })
      );
      jar.position.set(-6.4, 2.0, z);
      this.group.add(jar);

      // Órgano interior con sutil brillo
      const organ = new THREE.Mesh(
        new THREE.DodecahedronGeometry(0.12),
        new THREE.MeshStandardMaterial({ color: 0xe11d48, roughness: 0.6 })
      );
      organ.position.set(-6.4, 2.0, z);
      this.group.add(organ);
    }

    // 6. Luz ambiental hospitalaria verde/azul
    const ambientLight = new THREE.AmbientLight(0x0f2a2e, 0.8);
    this.group.add(ambientLight);

    // 7. Renderizar pistas interactivas

    // -- DETALLES EXTRA: MORGUE --
    const bedGeo = new THREE.BoxGeometry(1.2, 0.9, 2.5);
    const bedMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.8 });
    for (let i = 0; i < 2; i++) {
      const bed = new THREE.Mesh(bedGeo, bedMat);
      bed.position.set(-3 + (i * 6), 0.45, -2);
      this.group.add(bed);
      this.colliders.push(new THREE.Box3().setFromObject(bed));
    }
    const bloodGeo = new THREE.CircleGeometry(0.8, 16);
    const bloodMat = new THREE.MeshBasicMaterial({ color: 0x7f1d1d, transparent: true, opacity: 0.6 });
    const blood = new THREE.Mesh(bloodGeo, bloodMat);
    blood.rotation.x = -Math.PI / 2;
    blood.position.set(-2, 0.02, -1);
    this.group.add(blood);
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
