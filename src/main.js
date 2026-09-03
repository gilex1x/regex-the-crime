import { Engine } from './core/Engine.js';
import { AudioManager } from './core/AudioManager.js';
import { Controls } from './core/Controls.js';
import { Interaction } from './core/Interaction.js';
import { LevelManager } from './world/LevelManager.js';
import { NotebookUI } from './ui/NotebookUI.js';
import { AcademyUI } from './ui/AcademyUI.js';
import { CutsceneUI } from './ui/CutsceneUI.js';
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

  // 5. Inicializar Administrador de Niveles
  const levelManager = new LevelManager(engine, controls, interaction, audioManager);

  // 6. Inicializar UI de Cuaderno, Academia, Cinemáticas y HUD
  const notebookUI = new NotebookUI(audioManager, levelManager, controls);
  const academyUI = new AcademyUI(audioManager, controls);
  const cutsceneUI = new CutsceneUI(audioManager, controls);
  new HUD(engine, levelManager, audioManager, academyUI, notebookUI, cutsceneUI);

  // Conectar evento de inspeccionar pista
  interaction.onInspectClue = (clueData) => {
    notebookUI.open(clueData);
  };

  // 7. Loop de actualización conectado a Three.js
  engine.onUpdate((time, delta) => {
    controls.update(delta);
    interaction.update();
    levelManager.update(time, delta);
  });

  // 8. Iniciar en Caso 1
  levelManager.loadCase(0);

  // 9. Iniciar renderizado
  engine.start();

  // Iniciar audio en primera interacción del usuario (Modo Normal)
  const startBtn = document.getElementById('btn-start-investigation');
  if (startBtn) {
    startBtn.addEventListener('click', () => {
      audioManager.init();
      audioManager.ensureContext();

      // Reproducir Prólogo si es la primera vez
      const hasSeenPrologue = localStorage.getItem('regex_crime_prologue_seen');
      if (!hasSeenPrologue) {
        cutsceneUI.play('prologue', () => {
          localStorage.setItem('regex_crime_prologue_seen', 'true');
        });
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
