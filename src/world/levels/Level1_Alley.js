import * as THREE from 'three';
import { PropsBuilder } from '../PropsBuilder.js';

/**
 * Nivel 1: El Chantaje en el Callejón Lluvioso
 */
export class Level1_Alley {
  constructor(scene, clueDataList) {
    this.scene = scene;
    this.clueDataList = clueDataList;
    this.group = new THREE.Group();
    this.colliders = [];
    this.animatedObjects = [];
    this.interactiveObjects = [];
  }

  build() {
    // 1. Suelo mojado con textura de asfalto reflectante
    const asphaltTex = PropsBuilder.getAsphaltTexture();
    asphaltTex.repeat.set(8, 24);

    const floorGeo = new THREE.PlaneGeometry(12, 36);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x272c36,
      map: asphaltTex,
      roughness: 0.4,
      metalness: 0.25
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(0, 0, -10);
    floor.receiveShadow = true;
    this.group.add(floor);

    // 2. Paredes de ladrillo del callejón
    const brickTex = PropsBuilder.getBrickTexture();
    brickTex.repeat.set(4, 2);

    const wallMat = new THREE.MeshStandardMaterial({
      color: 0x22242b,
      roughness: 0.9,
      map: brickTex
    });

    // Pared izquierda
    const leftWallGeo = new THREE.BoxGeometry(1, 8, 36);
    const leftWall = new THREE.Mesh(leftWallGeo, wallMat);
    leftWall.position.set(-5.5, 4, -10);
    this.group.add(leftWall);
    this.colliders.push(new THREE.Box3().setFromObject(leftWall));

    // Pared derecha
    const rightWallGeo = new THREE.BoxGeometry(1, 8, 36);
    const rightWall = new THREE.Mesh(rightWallGeo, wallMat);
    rightWall.position.set(5.5, 4, -10);
    this.group.add(rightWall);
    this.colliders.push(new THREE.Box3().setFromObject(rightWall));

    // Pared fondo (callejón sin salida con verja metálica)
    const backWallGeo = new THREE.BoxGeometry(12, 8, 1);
    const backWall = new THREE.Mesh(backWallGeo, wallMat);
    backWall.position.set(0, 4, -27);
    this.group.add(backWall);
    this.colliders.push(new THREE.Box3().setFromObject(backWall));

    // Pared frontal (salida tapada con cinta policial)
    const frontWallGeo = new THREE.BoxGeometry(12, 8, 1);
    const frontWall = new THREE.Mesh(frontWallGeo, wallMat);
    frontWall.position.set(0, 4, 7);
    this.group.add(frontWall);
    this.colliders.push(new THREE.Box3().setFromObject(frontWall));

    // 3. Cinta policial en la entrada
    const tapeMat = new THREE.MeshBasicMaterial({
      color: 0xfacc15,
      side: THREE.DoubleSide
    });
    const tapeGeo = new THREE.PlaneGeometry(8, 0.25);
    const tape = new THREE.Mesh(tapeGeo, tapeMat);
    tape.position.set(0, 1.1, 5.5);
    this.group.add(tape);

    // 4. Farolas callejeras y contenedores (Iluminación amplia)
    const lamp1 = PropsBuilder.createStreetLamp(3.8, -2);
    const lamp2 = PropsBuilder.createStreetLamp(-3.8, -12);
    const lamp3 = PropsBuilder.createStreetLamp(3.8, -22);
    this.group.add(lamp1);
    this.group.add(lamp2);
    this.group.add(lamp3);

    // Luz de luna y cielo nocturno que baña el callejón de manera uniforme
    const alleyHemiLight = new THREE.HemisphereLight(0xa5f3fc, 0x1e293b, 1.3);
    this.group.add(alleyHemiLight);

    const dumpster1 = PropsBuilder.createDumpster(3.5, -6, -0.2);
    const dumpster2 = PropsBuilder.createDumpster(-3.5, -12, 0.3);
    this.group.add(dumpster1);
    this.group.add(dumpster2);
    this.colliders.push(new THREE.Box3().setFromObject(dumpster1));
    this.colliders.push(new THREE.Box3().setFromObject(dumpster2));

    // 5. Letrero de Neón del club 'BLUE VELVET' (parpadeante y difuso)
    const neonGeo = new THREE.BoxGeometry(3.5, 1, 0.2);
    const neonMat = new THREE.MeshBasicMaterial({ color: 0xf43f5e });
    const neonSign = new THREE.Mesh(neonGeo, neonMat);
    neonSign.position.set(-4.9, 5.5, -3);
    neonSign.rotation.y = Math.PI / 2;
    this.group.add(neonSign);

    const neonLight = new THREE.PointLight(0xf43f5e, 8, 16);
    neonLight.position.set(-4.2, 5.5, -3);
    this.group.add(neonLight);
    this.animatedObjects.push({
      update: (time) => {
        // Parpadeo de neón averiado
        const flicker = Math.sin(time * 12) > 0.1 ? 1 : 0.2;
        neonLight.intensity = (Math.random() > 0.08 ? 3.5 : 0.5) * flicker;
      }
    });

    // 6. Charcos de agua con reflejo
    const puddleGeo = new THREE.CircleGeometry(1.4, 16);
    const puddleMat = new THREE.MeshStandardMaterial({
      color: 0x050709,
      roughness: 0.05,
      metalness: 0.8
    });
    const puddle = new THREE.Mesh(puddleGeo, puddleMat);
    puddle.rotation.x = -Math.PI / 2;
    puddle.position.set(0.5, 0.02, -8);
    this.group.add(puddle);

    // 7. Lluvia de partículas retro
    const rainCount = 1200;
    const rainGeo = new THREE.BufferGeometry();
    const rainPos = new Float32Array(rainCount * 3);
    for (let i = 0; i < rainCount * 3; i += 3) {
      rainPos[i] = (Math.random() - 0.5) * 12;
      rainPos[i + 1] = Math.random() * 9;
      rainPos[i + 2] = (Math.random() - 0.5) * 34 - 10;
    }
    rainGeo.setAttribute('position', new THREE.BufferAttribute(rainPos, 3));
    const rainMat = new THREE.PointsMaterial({
      color: 0x93c5fd,
      size: 0.06,
      transparent: true,
      opacity: 0.7
    });
    const rain = new THREE.Points(rainGeo, rainMat);
    this.group.add(rain);

    this.animatedObjects.push({
      update: () => {
        const positions = rain.geometry.attributes.position.array;
        for (let i = 1; i < rainCount * 3; i += 3) {
          positions[i] -= 0.35;
          if (positions[i] < 0) {
            positions[i] = 8.5;
          }
        }
        rain.geometry.attributes.position.needsUpdate = true;
      }
    });

    // 8. Crear las pistas físicas
    this.clueDataList.forEach(clue => {
      const clueObj = PropsBuilder.createClueObject(clue);
      this.group.add(clueObj);
      this.interactiveObjects.push(clueObj);

      // Animación de pulso del anillo dorado
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
