import { Engine } from './core/Engine.js';
import { AudioManager } from './core/AudioManager.js';
import { Controls } from './core/Controls.js';
import { Interaction } from './core/Interaction.js';
import { LevelManager } from './world/LevelManager.js';
import { NotebookUI } from './ui/NotebookUI.js';
import { AcademyUI } from './ui/AcademyUI.js';
import { CutsceneUI } from './ui/CutsceneUI.js';
import { CityMapUI } from './ui/CityMapUI.js';
import { InventoryUI } from './ui/InventoryUI.js';
import { DialogueUI } from './ui/DialogueUI.js';
import { LoadingScreenUI } from './ui/LoadingScreenUI.js';
import { HUD } from './ui/HUD.js';

window.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('app-container');

  // 1. Inicializar Audio
  const audioManager = new AudioManager();

  // 2. Inicializar Motor 3D Retro
  const engine = new Engine(container);

  // 3. Inicializar Controles Primera Persona
  const controls = new Controls(engine.camera, engine.renderer.domElement, audioManager);

  // 4. Inicializar Sistema de Interacción
  const interaction = new Interaction(engine.camera, audioManager);

  // 5. Inicializar UI de Pantalla de Carga
  const loadingScreenUI = new LoadingScreenUI(audioManager);

  // 6. Inicializar Administrador de Niveles con LoadingScreenUI
  const levelManager = new LevelManager(engine, controls, interaction, audioManager, loadingScreenUI);

  // 7. Inicializar UI de Cuaderno, Academia, Cinemáticas, Mapa, Inventario, Diálogos y HUD
  const notebookUI = new NotebookUI(audioManager, levelManager, controls);
  const academyUI = new AcademyUI(audioManager, controls);
  const cutsceneUI = new CutsceneUI(audioManager, controls);
  const cityMapUI = new CityMapUI(levelManager, audioManager);
  const inventoryUI = new InventoryUI(levelManager, audioManager);
  const dialogueUI = new DialogueUI(audioManager);
  new HUD(engine, levelManager, audioManager, academyUI, notebookUI, cutsceneUI, cityMapUI, inventoryUI);

  // Conectar evento de inspeccionar pista
  interaction.onInspectClue = (clueData) => {
    dialogueUI.hide();
    notebookUI.open(clueData, false);
  };

  // Conectar evento de hablar con NPC
  interaction.onTalkToNPC = (npcData) => {
    dialogueUI.show(npcData);
  };

  // Conectar evento de revisar pista desde el inventario
  inventoryUI.onOpenEvidence = (clueData) => {
    dialogueUI.hide();
    notebookUI.open(clueData, true);
  };

  // 7. Loop de actualización conectado a Three.js
  engine.onUpdate((time, delta) => {
    controls.update(delta);
    interaction.update();
    levelManager.update(time, delta);
  });

  // 8. No iniciar ningún caso automáticamente al arrancar
  // El caso se cargará al seleccionar un modo de juego
  
  // 9. Iniciar renderizado (fondo negro/vacío hasta que se cargue un nivel)
  engine.start();

  // Iniciar audio en primera interacción del usuario (Modo Normal)
  const startBtn = document.getElementById('btn-start-investigation');
  if (startBtn) {
    startBtn.addEventListener('click', () => {
      audioManager.init();
      audioManager.ensureContext();

      // Verificar en qué nivel quedó el jugador (primer caso no resuelto)
      let targetCaseIndex = 0;
      for (let i = 0; i < levelManager.levels.length; i++) {
        const caseId = levelManager.levels[i].id;
        if (!levelManager.isCaseSolved(caseId)) {
          targetCaseIndex = i;
          break;
        }
      }
      
      // Reproducir Prólogo si es la primera vez (solo si es el caso 0)
      const hasSeenPrologue = localStorage.getItem('regex_crime_prologue_seen');
      if (!hasSeenPrologue && targetCaseIndex === 0) {
        cutsceneUI.play('prologue', () => {
          localStorage.setItem('regex_crime_prologue_seen', 'true');
          levelManager.loadCase(targetCaseIndex);
        });
      } else {
        // Cargar el nivel requerido con pantalla de carga y tips REGEX
        levelManager.loadCase(targetCaseIndex);
      }
    });
  }

  // Iniciar directamente en Modo Academia
  const startAcademyBtn = document.getElementById('btn-start-academy');
  if (startAcademyBtn) {
    startAcademyBtn.addEventListener('click', () => {
      audioManager.init();
      audioManager.ensureContext();
      const blocker = document.getElementById('instructions-overlay');
      if (blocker) blocker.style.display = 'none';
      academyUI.open();
    });
  }
});
