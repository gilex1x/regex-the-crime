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

    // -- DETALLES EXTRA: ALLEY ENRIQUECIDO --
    // Escalera de incendios en la pared izquierda
    const fireEscape = PropsBuilder.createFireEscape();
    fireEscape.position.set(-3.8, 0, -12);
    this.group.add(fireEscape);

    // Contenedor de basura industrial en la pared derecha
    const dumpster = PropsBuilder.createDumpster();
    dumpster.position.set(2.8, 0, -6);
    dumpster.rotation.y = -0.15;
    this.group.add(dumpster);
    this.colliders.push(new THREE.Box3().setFromObject(dumpster));

    // Farola clásica de hierro fundido en la esquina
    const lamp = PropsBuilder.createStreetLamp();
    lamp.position.set(-3.2, 0, 3.5);
    this.group.add(lamp);
    this.colliders.push(new THREE.Box3().setFromObject(lamp));

    // Cajas de madera con cinchas
    const crateGeo = new THREE.BoxGeometry(0.85, 0.85, 0.85);
    const crateMat = new THREE.MeshStandardMaterial({ color: 0x3d2817, roughness: 0.85, flatShading: true });
    for (let i = 0; i < 4; i++) {
      const crate = new THREE.Mesh(crateGeo, crateMat);
      crate.position.set(-2.8 + (i * 1.8), 0.425, -5 - (i * 3));
      crate.rotation.y = 0.2 * i;
      crate.castShadow = true;
      this.group.add(crate);
      this.colliders.push(new THREE.Box3().setFromObject(crate));
    }
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

    // -- PATRULLAS FUERA DE LA ESCENA --
    const patrol1 = PropsBuilder.createPoliceCar();
    patrol1.position.set(-2.5, 0, 9);
    patrol1.rotation.y = Math.PI / 4;
    this.group.add(patrol1);

    const patrol2 = PropsBuilder.createPoliceCar();
    patrol2.position.set(3, 0, 11);
    patrol2.rotation.y = -Math.PI / 6;
    this.group.add(patrol2);
    
    // Animación sirenas
    this.animatedObjects.push({
      update: (time) => {
        // Intercalar luces rojas y azules cada 0.3 segundos
        const state = (time % 0.6) > 0.3;
        
        [patrol1, patrol2].forEach(p => {
          const { redLight, blueLight, redMat, blueMat } = p.userData;
          if (state) {
            redLight.intensity = 15;
            redMat.emissiveIntensity = 1.0;
            blueLight.intensity = 0;
            blueMat.emissiveIntensity = 0.2;
          } else {
            redLight.intensity = 0;
            redMat.emissiveIntensity = 0.2;
            blueLight.intensity = 15;
            blueMat.emissiveIntensity = 1.0;
          }
        });
      }
    });

    // -- OFICIAL DE POLICÍA PATRULLANDO --
    const officer = PropsBuilder.createOfficer();
    officer.position.set(0, 0, -10);
    officer.userData = {
      isNPC: true,
      npcData: {
        name: "Oficial O'Malley",
        role: "Patrullero del Departamento",
        avatar: "👮",
        dialogues: [
          "Mala noche para un homicidio, Vance... La lluvia está borrando los rastros de pisadas y el forense aún no se aparece.",
          "Dicen que la víctima era un tipo honrado, pero en este callejón nadie muere por casualidad. Eche un vistazo a las cajas y al maletín.",
          "Tenga cuidado si va hacia los muelles más tarde. Los muchachos del turno nocturno juran que ven furgones negros sin matrícula."
        ]
      }
    };
    this.group.add(officer);
    this.interactiveObjects.push(officer);
    
    // Animación oficial (30 segundos ida y vuelta)
    this.animatedObjects.push({
      update: (time) => {
        const period = 30; // Segundos
        const phase = (time % period) / period; // 0 a 1
        
        // El callejón abarca aproximadamente Z = -24 a Z = 5
        let zPos = 0;
        let targetAngle = 0;
        
        if (phase < 0.5) {
          // Camina hacia adelante (de Z = -24 a Z = 5)
          const p = phase * 2; // 0 a 1
          zPos = -24 + (p * 29);
          targetAngle = 0; // Mira hacia el eje +Z
        } else {
          // Camina de regreso (de Z = 5 a Z = -24)
          const p = (phase - 0.5) * 2; // 0 a 1
          zPos = 5 - (p * 29);
          targetAngle = Math.PI; // Mira hacia el eje -Z
        }
        
        officer.position.z = zPos;
        
        // Interpolar rotación suavemente
        const currentAngle = officer.rotation.y;
        let diff = targetAngle - currentAngle;
        // Normalizar a [-PI, PI] para el giro más corto
        while (diff < -Math.PI) diff += Math.PI * 2;
        while (diff > Math.PI) diff -= Math.PI * 2;
        officer.rotation.y += diff * 0.1;
        
        // Animación de pasos (bobbing vertical)
        officer.position.y = Math.abs(Math.sin(time * 12)) * 0.08;
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
