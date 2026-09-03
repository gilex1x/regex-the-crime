import * as THREE from 'three';
import { PropsBuilder } from '../PropsBuilder.js';

/**
 * Escenario 8 (Tier 7): La Sala de Calderas y Subsuelo Industrial
 */
export class Level8_BoilerRoom {
  constructor(scene, clueDataList) {
    this.scene = scene;
    this.clueDataList = clueDataList;
    this.group = new THREE.Group();
    this.colliders = [];
    this.animatedObjects = [];
    this.interactiveObjects = [];
  }

  build() {
    // 1. Suelo de chapa industrial y hormigón
    const boilerTex = PropsBuilder.getBoilerMetalTexture();
    boilerTex.repeat.set(6, 6);

    const floorGeo = new THREE.PlaneGeometry(14, 16);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x221a16,
      map: boilerTex,
      roughness: 0.7,
      metalness: 0.4
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(0, 0, -2);
    floor.receiveShadow = true;
    this.group.add(floor);

    // 2. Paredes industriales manchadas de hollín
    const wallMat = new THREE.MeshStandardMaterial({ color: 0x17120e, roughness: 0.9 });

    // Pared trasera
    const backWall = new THREE.Mesh(new THREE.BoxGeometry(14, 6, 0.5), wallMat);
    backWall.position.set(0, 3, -10);
    this.group.add(backWall);
    this.colliders.push(new THREE.Box3().setFromObject(backWall));

    // Pared frontal
    const frontWall = new THREE.Mesh(new THREE.BoxGeometry(14, 6, 0.5), wallMat);
    frontWall.position.set(0, 3, 6);
    this.group.add(frontWall);
    this.colliders.push(new THREE.Box3().setFromObject(frontWall));

    // Pared izquierda
    const leftWall = new THREE.Mesh(new THREE.BoxGeometry(0.5, 6, 16), wallMat);
    leftWall.position.set(-7, 3, -2);
    this.group.add(leftWall);
    this.colliders.push(new THREE.Box3().setFromObject(leftWall));

    // Pared derecha
    const rightWall = new THREE.Mesh(new THREE.BoxGeometry(0.5, 6, 16), wallMat);
    rightWall.position.set(7, 3, -2);
    this.group.add(rightWall);
    this.colliders.push(new THREE.Box3().setFromObject(rightWall));

    // Techo
    const ceiling = new THREE.Mesh(new THREE.PlaneGeometry(14, 16), new THREE.MeshStandardMaterial({ color: 0x0c0806 }));
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = 6;
    ceiling.position.z = -2;
    this.group.add(ceiling);

    // 3. Gran caldera cilíndrica de vapor remachada
    const boilerGroup = new THREE.Group();
    boilerGroup.position.set(0, 2.0, -7);

    const boilerBody = new THREE.Mesh(
      new THREE.CylinderGeometry(1.6, 1.6, 6, 16),
      new THREE.MeshStandardMaterial({ color: 0x3d271e, map: boilerTex, metalness: 0.6, roughness: 0.4 })
    );
    boilerBody.rotation.z = Math.PI / 2;
    boilerGroup.add(boilerBody);

    // Patas de soporte de la caldera
    const leg1 = new THREE.Mesh(new THREE.BoxGeometry(0.4, 2, 2.8), new THREE.MeshStandardMaterial({ color: 0x1c130d }));
    leg1.position.set(-2, -1, 0);
    boilerGroup.add(leg1);

    const leg2 = new THREE.Mesh(new THREE.BoxGeometry(0.4, 2, 2.8), new THREE.MeshStandardMaterial({ color: 0x1c130d }));
    leg2.position.set(2, -1, 0);
    boilerGroup.add(leg2);

    this.group.add(boilerGroup);
    this.colliders.push(new THREE.Box3().setFromObject(boilerGroup));

    // 4. Red de tuberías de vapor
    const pipeMat = new THREE.MeshStandardMaterial({ color: 0x7c2d12, metalness: 0.8, roughness: 0.3 });
    const pipeTop = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 14, 8), pipeMat);
    pipeTop.rotation.z = Math.PI / 2;
    pipeTop.position.set(0, 4.8, -4);
    this.group.add(pipeTop);

    // Válvulas circulares rojas
    for (let x = -3; x <= 3; x += 3) {
      const valve = new THREE.Mesh(
        new THREE.TorusGeometry(0.22, 0.05, 8, 16),
        new THREE.MeshStandardMaterial({ color: 0xdc2626, metalness: 0.5, roughness: 0.3 })
      );
      valve.position.set(x, 4.8, -3.8);
      this.group.add(valve);
    }

    // 5. Mesa de mantenimiento industrial (donde va la pista)
    const workBench = new THREE.Mesh(
      new THREE.BoxGeometry(2.2, 0.85, 1.2),
      new THREE.MeshStandardMaterial({ color: 0x33241b, metalness: 0.5, roughness: 0.5 })
    );
    workBench.position.set(0, 0.425, -2.0);
    workBench.castShadow = true;
    workBench.receiveShadow = true;
    this.group.add(workBench);
    this.colliders.push(new THREE.Box3().setFromObject(workBench));

    // 6. Luz de alarma industrial roja parpadeante
    const alarmLight = new THREE.PointLight(0xef4444, 3, 10);
    alarmLight.position.set(0, 4.5, -2);
    this.group.add(alarmLight);

    this.animatedObjects.push({
      update: (time) => {
        alarmLight.intensity = 2.0 + Math.sin(time * 5) * 1.5;
      }
    });

    // Luz ambiental anaranjada de caldera
    const ambientLight = new THREE.AmbientLight(0x271406, 0.8);
    this.group.add(ambientLight);

    // 7. Pistas interactivas
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
