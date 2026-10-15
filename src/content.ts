import { ActorConfig, ServiceId, WorldName } from './types';

export const characterScaleByWorld: Record<WorldName, number> = {
  exterior: 0.9,
  interior: 2.7
};

export const services: Array<{ id: ServiceId; label: string }> = [
  { id: 'student', label: 'Service étudiant' }, { id: 'admin', label: 'Service administratif' },
  { id: 'pedago', label: 'Service pédagogique' }, { id: 'tech', label: 'Service technique' }
];

export const actors: Record<WorldName, ActorConfig[]> = {
  exterior: [
    { id: 'guide', name: 'Ancien étudiant', sprite: '/characters/student.png', x: 100, y: 160, kind: 'npc', idleDirection: 'down', idleFrame: 1 },
    { id: 'delegate', name: 'Délégué de classe', sprite: '/characters/delegate.png', x: 480, y: 160, kind: 'npc', idleDirection: 'down', idleFrame: 1 },
    { id: 'entrance', name: 'Entrée du bâtiment', sprite: '', x: 304, y: 176, kind: 'door' }
  ],
  interior: [
    { id: 'student', name: 'Maya · accueil étudiant', sprite: '/characters/staff_student.png', x: 300, y: 300, kind: 'npc', service: 'student', idleDirection: 'down', idleFrame: 1 },
    { id: 'admin', name: 'Nour · administration', sprite: '/characters/staff_admin.png', x: 1030, y: 300, kind: 'npc', service: 'admin', idleDirection: 'down', idleFrame: 1 },
    { id: 'pedago', name: 'Samir · pédagogie', sprite: '/characters/staff_pedago.png', x: 1040, y: 620, kind: 'npc', service: 'pedago', idleDirection: 'down', idleFrame: 1 },
    { id: 'tech', name: 'Lina · assistance technique', sprite: '/characters/staff_tech.png', x: 300, y: 620, kind: 'npc', idleDirection: 'down', idleFrame: 1 },
    { id: 'exit', name: 'Sortie vers le campus', sprite: '', x: 760, y: 1000, kind: 'door' }
  ]
};

export const dialogues: Record<string, { name: string; lines: string[] }> = {
  guide: { name: 'Ancien étudiant', lines: ['Bienvenue à ISITCOM ! Je connais quelques bons réflexes pour une première journée.', 'Pour trouver une salle, repère d’abord le hall et les panneaux : les indications peuvent changer selon l’organisation du jour.', 'Un CM est généralement un cours magistral, un TD permet de travailler les notions, et un TP met l’accent sur la pratique.', 'N’hésite pas à demander ton chemin : prendre ses repères prend du temps quand on arrive à l’université.', 'Commence par l’entrée du bâtiment, puis découvre chaque service à ton rythme.'] },
  delegate: { name: 'Délégué de classe', lines: ['Salut ! Je peux t’aider à prendre tes marques sans inventer de règles propres à l’établissement.', 'Pour une salle ou un horaire, compare ton emploi du temps avec les affichages et les informations officielles.', 'Les services du bâtiment peuvent orienter les étudiants ; leurs rôles sont différents, alors pose une question précise.', 'La vie de première année, c’est aussi apprendre à s’organiser et à demander de l’aide au bon moment.', 'Si tu hésites entre CM, TD et TP, demande le format prévu dans ton emploi du temps.'] },
  student: { name: 'Maya · accueil étudiant', lines: ['Bienvenue ! Le service étudiant est un point d’orientation pour les questions liées à la vie étudiante.', 'Il peut t’aider à identifier le bon interlocuteur, mais vérifie toujours les informations précises auprès des sources officielles.', 'Pour te repérer, note les noms des espaces et garde une liste de tes questions.', 'Prends le temps de rencontrer d’autres étudiants : les échanges rendent le campus plus facile à découvrir.'] },
  admin: { name: 'Nour · administration', lines: ['Je peux t’expliquer le rôle général du service administratif.', 'Les démarches ne sont pas toutes identiques : les pièces et les dates doivent être vérifiées dans la source officielle correspondante.', 'Quand tu écris une question, indique clairement le sujet et conserve la réponse utile.', 'Une bonne organisation te laisse plus de temps pour les cours et la découverte du campus.'] },
  pedago: { name: 'Samir · pédagogie', lines: ['Le service pédagogique aide à comprendre l’organisation des apprentissages.', 'Un CM est généralement un cours magistral ; un TD accompagne la compréhension avec des exercices.', 'Un TP permet de mettre les notions en pratique, souvent avec du matériel ou une activité guidée.', 'Pour trouver une salle, lis attentivement ton emploi du temps et demande confirmation si un détail n’est pas clair.'] },
  tech: { name: 'Lina · assistance technique', lines: ['Le service technique peut orienter les questions liées aux outils numériques.', 'L’ENT désigne généralement un espace numérique regroupant des services de l’établissement.', 'Moodle est généralement une plateforme de cours et d’activités en ligne.', 'Les outils disponibles peuvent varier : utilise les indications officielles et demande de l’aide si une connexion bloque.'] }
};

export interface QuizQuestion { id: string; question: string; answers: string[]; correct: number; explanation: string }
export const quizzes: Record<ServiceId, QuizQuestion[]> = {
  student: [
    { id: 'student-orientation', question: 'Quel réflexe aide à s’orienter pendant une première journée ?', answers: ['Lire les indications et demander confirmation', 'Deviner les salles', 'Suivre quelqu’un au hasard'], correct: 0, explanation: 'Les panneaux, l’emploi du temps et une question posée au bon interlocuteur facilitent l’orientation.' },
    { id: 'student-service', question: 'Quel est le rôle général d’un service étudiant ?', answers: ['Orienter vers les informations de vie étudiante', 'Attribuer toutes les notes', 'Remplacer les enseignants'], correct: 0, explanation: 'Un service étudiant peut orienter sur la vie étudiante ; les détails dépendent de l’établissement.' },
    { id: 'student-prep', question: 'Quelle habitude aide à débuter l’université ?', answers: ['Noter ses questions et repères', 'Attendre sans rien vérifier', 'Ignorer son emploi du temps'], correct: 0, explanation: 'Garder des notes aide à structurer ses démarches et ses premiers repères.' }
  ],
  admin: [
    { id: 'admin-check', question: 'Avant une démarche administrative, que faut-il faire ?', answers: ['Vérifier les informations officielles', 'Choisir des pièces au hasard', 'Se fier à une rumeur'], correct: 0, explanation: 'Les pièces et dates varient selon la démarche : la source officielle est la référence.' },
    { id: 'admin-question', question: 'Comment poser une question administrative efficacement ?', answers: ['Décrire clairement le sujet', 'Envoyer plusieurs demandes identiques', 'Omettre le contexte'], correct: 0, explanation: 'Un sujet clair et un contexte précis facilitent l’orientation, sans inventer de procédure.' },
    { id: 'admin-planning', question: 'Quel outil aide à organiser ses rendez-vous et cours ?', answers: ['Un agenda', 'Une supposition', 'Un écran éteint'], correct: 0, explanation: 'Un agenda ou calendrier aide à suivre ses échéances et son emploi du temps.' }
  ],
  pedago: [
    { id: 'pedago-cm', question: 'Que signifie généralement CM ?', answers: ['Cours magistral', 'Cours miniature', 'Contrôle mensuel'], correct: 0, explanation: 'Un CM est généralement un cours magistral.' },
    { id: 'pedago-td', question: 'Quel format accompagne souvent la compréhension par des exercices ?', answers: ['TD', 'CM uniquement', 'TP sans activité'], correct: 0, explanation: 'Un TD, travaux dirigés, accompagne généralement la compréhension et la mise en application.' },
    { id: 'pedago-tp', question: 'Quel format met l’accent sur la pratique ?', answers: ['TP', 'Titre provisoire', 'Temps de pause'], correct: 0, explanation: 'Un TP, travaux pratiques, privilégie la pratique guidée.' }
  ],
  tech: [
    { id: 'tech-ent', question: 'À quoi sert généralement un ENT ?', answers: ['Regrouper des services numériques de l’établissement', 'Remplacer les cours', 'Choisir une salle au hasard'], correct: 0, explanation: 'Un ENT regroupe généralement des services numériques ; son contenu exact dépend de l’établissement.' },
    { id: 'tech-moodle', question: 'Quel usage correspond généralement à Moodle ?', answers: ['Cours et activités en ligne', 'Transport sur le campus', 'Réservation d’un bâtiment'], correct: 0, explanation: 'Moodle est généralement une plateforme de cours et d’activités en ligne.' },
    { id: 'tech-help', question: 'Que faire si un outil numérique ne fonctionne pas ?', answers: ['Décrire le problème au bon interlocuteur', 'Multiplier les essais sans noter l’erreur', 'Abandonner immédiatement'], correct: 0, explanation: 'Décrire le contexte et le message affiché facilite l’aide, selon les moyens disponibles.' }
  ]
};
