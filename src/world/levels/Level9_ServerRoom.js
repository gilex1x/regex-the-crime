import * as THREE from 'three';
import { PropsBuilder } from '../PropsBuilder.js';

/**
 * Escenario 9 (Tier 8): La Central de Relés y Servidores
 */
export class Level9_ServerRoom {
  constructor(scene, clueDataList) {
    this.scene = scene;
    this.clueDataList = clueDataList;
    this.group = new THREE.Group();
    this.colliders = [];
    this.animatedObjects = [];
    this.interactiveObjects = [];
  }

  build() {
    // 1. Suelo técnico de sala de cómputo
    const floorGeo = new THREE.PlaneGeometry(14, 14);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x0a0f1d,
      roughness: 0.2,
      metalness: 0.5
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    this.group.add(floor);

    // 2. Paredes blindadas con paneles aislantes acústicos
    const wallMat = new THREE.MeshStandardMaterial({ color: 0x090d16, roughness: 0.7 });

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
    const ceiling = new THREE.Mesh(new THREE.PlaneGeometry(14, 14), new THREE.MeshStandardMaterial({ color: 0x05070a }));
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = 5.5;
    this.group.add(ceiling);

    // 3. Racks de servidores y relés a los lados
    const rackTex = PropsBuilder.getServerRackTexture();
    rackTex.repeat.set(2, 4);

    const rackMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      map: rackTex,
      metalness: 0.6,
      roughness: 0.3
    });

    for (let z = -4; z <= 4; z += 2.6) {
      // Rack izquierdo
      const rackL = new THREE.Mesh(new THREE.BoxGeometry(1.2, 4.2, 2.0), rackMat);
      rackL.position.set(-5.8, 2.1, z);
      this.group.add(rackL);
      this.colliders.push(new THREE.Box3().setFromObject(rackL));

      // Rack derecho
      const rackR = new THREE.Mesh(new THREE.BoxGeometry(1.2, 4.2, 2.0), rackMat);
      rackR.position.set(5.8, 2.1, z);
      this.group.add(rackR);
      this.colliders.push(new THREE.Box3().setFromObject(rackR));

      // Bobina de cinta magnética giratoria
      const reel = new THREE.Mesh(
        new THREE.CylinderGeometry(0.35, 0.35, 0.08, 16),
        new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.8, roughness: 0.2 })
      );
      reel.rotation.x = Math.PI / 2;
      reel.position.set(-5.15, 3.2, z);
      this.group.add(reel);

      this.animatedObjects.push({
        update: (time) => {
          reel.rotation.z = time * 3;
        }
      });
    }

    // 4. Consola de teletipo y terminal central (donde va la pista)
    const consoleGroup = new THREE.Group();
    consoleGroup.position.set(0, 0, -2.0);

    const consoleDesk = new THREE.Mesh(
      new THREE.BoxGeometry(2.4, 0.85, 1.4),
      new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.7, roughness: 0.3 })
    );
    consoleDesk.position.y = 0.425;
    consoleDesk.castShadow = true;
    consoleDesk.receiveShadow = true;
    consoleGroup.add(consoleDesk);

    // Pantalla de fósforo verde
    const screen = new THREE.Mesh(
      new THREE.BoxGeometry(0.8, 0.6, 0.1),
      new THREE.MeshBasicMaterial({ color: 0x10b981 })
    );
    screen.position.set(0, 1.15, -0.2);
    consoleGroup.add(screen);

    this.group.add(consoleGroup);
    this.colliders.push(new THREE.Box3().setFromObject(consoleGroup));

    // 5. Luces de procesamiento ambiental (cian y esmeralda)
    const serverLight = new THREE.PointLight(0x06b6d4, 3, 10);
    serverLight.position.set(0, 3.5, -2);
    this.group.add(serverLight);

    const greenFlicker = new THREE.PointLight(0x10b981, 1.8, 6);
    greenFlicker.position.set(0, 1.2, -1.8);
    this.group.add(greenFlicker);

    this.animatedObjects.push({
      update: (time) => {
        greenFlicker.intensity = 1.4 + Math.sin(time * 6) * 0.4;
      }
    });

    const ambientLight = new THREE.AmbientLight(0x0a192f, 0.7);
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
