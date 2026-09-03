import * as THREE from 'three';
import { PropsBuilder } from '../PropsBuilder.js';

/**
 * Escenario 5: Los Muelles de Carga y Almacén Portuario
 */
export class Level5_Docks {
  constructor(scene, clueDataList) {
    this.scene = scene;
    this.clueDataList = clueDataList;
    this.group = new THREE.Group();
    this.colliders = [];
    this.animatedObjects = [];
    this.interactiveObjects = [];
  }

  build() {
    // 1. Suelo de muelle mojado
    const asphaltTex = PropsBuilder.getAsphaltTexture();
    asphaltTex.repeat.set(10, 20);

    const floorGeo = new THREE.PlaneGeometry(16, 32);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x181e29,
      map: asphaltTex,
      roughness: 0.35,
      metalness: 0.3
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(0, 0, -8);
    floor.receiveShadow = true;
    this.group.add(floor);

    // 2. Límites del muelle (Muros y barandillas de hierro)
    const metalTex = PropsBuilder.getContainerMetalTexture();
    metalTex.repeat.set(3, 2);

    // Contenedores industriales gigantes a los lados
    // Contenedor Rojo Frigorífico Izquierda
    const containerLeft = new THREE.Mesh(
      new THREE.BoxGeometry(3.2, 3.4, 8),
      new THREE.MeshStandardMaterial({ color: 0x7f1d1d, map: metalTex, roughness: 0.6, metalness: 0.5 })
    );
    containerLeft.position.set(-6, 1.7, -6);
    this.group.add(containerLeft);
    this.colliders.push(new THREE.Box3().setFromObject(containerLeft));

    // Luz ámbar de refrigeración activa
    const amberLightL = new THREE.PointLight(0xf59e0b, 1.5, 5);
    amberLightL.position.set(-4.2, 3.2, -4);
    this.group.add(amberLightL);

    // Contenedor Azul Derecha
    const containerRight = new THREE.Mesh(
      new THREE.BoxGeometry(3.2, 3.4, 8),
      new THREE.MeshStandardMaterial({ color: 0x1e3a5f, map: metalTex, roughness: 0.6, metalness: 0.5 })
    );
    containerRight.position.set(6, 1.7, -6);
    this.group.add(containerRight);
    this.colliders.push(new THREE.Box3().setFromObject(containerRight));

    // Contenedor de fondo que bloquea el muelle
    const containerBack = new THREE.Mesh(
      new THREE.BoxGeometry(10, 3.4, 2.8),
      new THREE.MeshStandardMaterial({ color: 0x1e293b, map: metalTex, roughness: 0.6, metalness: 0.5 })
    );
    containerBack.position.set(0, 1.7, -18);
    this.group.add(containerBack);
    this.colliders.push(new THREE.Box3().setFromObject(containerBack));

    // Pared invisible frontal para limitar jugador
    const frontWall = new THREE.Mesh(
      new THREE.BoxGeometry(16, 6, 0.5),
      new THREE.MeshBasicMaterial({ visible: false })
    );
    frontWall.position.set(0, 3, 6);
    this.group.add(frontWall);
    this.colliders.push(new THREE.Box3().setFromObject(frontWall));

    // 3. Pilas de cajas de madera aduaneras
    const crateMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.8 });
    const cratePositions = [
      [-2.5, 0.6, -3],
      [-2.5, 0.6, -1.8],
      [-2.5, 1.8, -2.4],
      [2.8, 0.6, -4],
      [2.8, 0.6, -2.8]
    ];
    cratePositions.forEach(([x, y, z]) => {
      const crate = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.2, 1.2), crateMat);
      crate.position.set(x, y, z);
      crate.castShadow = true;
      this.group.add(crate);
      this.colliders.push(new THREE.Box3().setFromObject(crate));
    });

    // 4. Mesa de apoyo / caja de inspección de aduanas central (donde va la pista)
    const inspectionCrate = new THREE.Mesh(
      new THREE.BoxGeometry(1.6, 0.85, 1.2),
      new THREE.MeshStandardMaterial({ color: 0x451a03, roughness: 0.7 })
    );
    inspectionCrate.position.set(0, 0.425, -2.5);
    inspectionCrate.castShadow = true;
    inspectionCrate.receiveShadow = true;
    this.group.add(inspectionCrate);
    this.colliders.push(new THREE.Box3().setFromObject(inspectionCrate));

    // 5. Poste con reflector portuario
    const pole = new THREE.Mesh(
      new THREE.CylinderGeometry(0.1, 0.12, 6, 8),
      new THREE.MeshStandardMaterial({ color: 0x1f2937, metalness: 0.8 })
    );
    pole.position.set(3.5, 3, -1);
    this.group.add(pole);

    const spotlight = new THREE.SpotLight(0x93c5fd, 4, 16, Math.PI / 4, 0.4);
    spotlight.position.set(3.5, 5.8, -1);
    spotlight.target = inspectionCrate;
    this.group.add(spotlight);

    // 6. Lluvia y niebla portuaria
    const rainCount = 1000;
    const rainGeo = new THREE.BufferGeometry();
    const rainPos = new Float32Array(rainCount * 3);
    for (let i = 0; i < rainCount * 3; i += 3) {
      rainPos[i] = (Math.random() - 0.5) * 16;
      rainPos[i + 1] = Math.random() * 9;
      rainPos[i + 2] = (Math.random() - 0.5) * 28 - 6;
    }
    rainGeo.setAttribute('position', new THREE.BufferAttribute(rainPos, 3));
    const rain = new THREE.Points(
      rainGeo,
      new THREE.PointsMaterial({ color: 0x93c5fd, size: 0.05, transparent: true, opacity: 0.6 })
    );
    this.group.add(rain);

    this.animatedObjects.push({
      update: () => {
        const positions = rain.geometry.attributes.position.array;
        for (let i = 1; i < rainCount * 3; i += 3) {
          positions[i] -= 0.35;
          if (positions[i] < 0) positions[i] = 8.5;
        }
        rain.geometry.attributes.position.needsUpdate = true;
      }
    });

    // 7. Renderizar pistas interactivas
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
