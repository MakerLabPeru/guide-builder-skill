import { esSteps } from './es-steps';
import type { Copy } from './types';

export const es: Copy = {
  meta: {
    title: 'guide-builder · Una guía paso a paso para acompañar tu taller',
    description:
      'Un skill para tu agente de IA que te ayuda a preparar y probar una guía paso a paso para tu taller.',
    imageAlt: 'guide-builder: una guía paso a paso para acompañar tu taller.',
  },
  nav: { how: 'Cómo se usa', language: 'Idioma' },
  hero: {
    pill: 'MakerLab Perú',
    title: 'Una guía\npaso a paso\npara ',
    titleAccent: 'acompañar\ntu taller.',
    lede: 'Tu agente te ayuda a prepararla y probarla antes de compartirla.',
    installLabel: 'Instálalo en tu terminal',
    cta: 'Mira cómo se arma una guía ↓',
  },
  agentDemo: {
    folder: '~/mi-taller',
    ask: 'una guía para publicar una web',
    round: 'Definamos el alcance · ronda 1',
    q1: '¿Quién la lee?',
    a1: 'principiantes, en casa',
    q2: '¿Uso un navegador para capturar lo que vamos creando?',
    a2: 'sí',
    planApproved: 'Plan aprobado · 5 pasos',
    ranIt: 'Ejecutado · 9 capturas',
    link: 'mi-guia.vercel.app',
  },
  demo: {
    eyebrow: 'Cómo se usa',
    title: 'Así preparas la guía de tu taller',
    subtitle: 'Esta misma guía está hecha con el skill.',
    guideName: 'Cómo usar guide-builder',
    close: 'Cerrar',
    progress: 'Tu avance',
    stepWord: 'Paso',
    where: 'Dónde estás',
    see: 'Debes ver',
    fail: 'Si falla',
    next: 'Listo, siguiente paso →',
    finish: 'Terminar ✓',
    done: '✓ Hecho',
    continue: 'Continuar →',
    hint: '¿Ya lo ves en tu pantalla?',
    complete: '🎉 ¡Terminaste la guía!',
    back: 'Anterior',
    steps: esSteps,
  },
  tips: {
    eyebrow: 'Sácale más provecho',
    title: 'Consejos para una mejor guía',
    items: [
      {
        title: 'Pregúntale antes a tu grupo',
        text: 'Comparte con tu agente una encuesta corta, sin nombres, sobre qué sabe tu grupo y qué quiere lograr.',
      },
      {
        title: 'Dale tu material',
        text: 'Con tus diapositivas o notas, la guía sigue tu orden y tus palabras.',
      },
      {
        title: 'Pruébala con alguien',
        text: 'Pide a alguien que la siga solo antes del taller y aclara donde se trabe.',
      },
      {
        title: 'Mejórala después',
        text: 'Cuéntale al agente las dudas de tu grupo y actualizará la guía en el mismo enlace.',
      },
      {
        title: 'Deja que tu agente use un navegador',
        text: 'Pídeselo y él mismo instalará lo necesario para tomar las capturas.',
      },
      {
        title: 'Usa tus colores',
        text: 'Dile a tu agente tu paleta o tu logo y la guía los usará en lugar del rojo y negro.',
      },
    ],
  },
  copy: { idle: 'Copiar', done: 'Copiado' },
  footer: { inspired: 'Inspirado en', license: 'Licencia MIT' },
};
