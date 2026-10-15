import { ActorConfig, ServiceId, WorldName } from "./types";

export const characterScaleByWorld: Record<WorldName, number> = {
  exterior: 0.82,
  interior: 2.7,
};

export const services: Array<{ id: ServiceId; label: string }> = [
  { id: "student", label: "Service étudiant" },
  { id: "admin", label: "Service administratif" },
  { id: "pedago", label: "Service pédagogique" },
  { id: "tech", label: "Service technique" },
];

export const actors: Record<WorldName, ActorConfig[]> = {
  exterior: [
    {
      id: "guide",
      name: "Ancien étudiant",
      sprite: "/characters/student.png",
      x: 100,
      y: 160,
      kind: "npc",
      idleDirection: "down",
      idleFrame: 1,
    },
    {
      id: "delegate",
      name: "Délégué de classe",
      sprite: "/characters/delegate.png",
      x: 480,
      y: 160,
      kind: "npc",
      idleDirection: "down",
      idleFrame: 1,
    },
    {
      id: "entrance",
      name: "Entrée du bâtiment",
      sprite: "",
      x: 304,
      y: 160,
      kind: "door",
    },
  ],
  interior: [
    {
      id: "student",
      name: "Service Étudiant",
      sprite: "/characters/staff_student.png",
      x: 300,
      y: 300,
      kind: "npc",
      service: "student",
      idleDirection: "down",
      idleFrame: 1,
    },
    {
      id: "admin",
      name: "Administration",
      sprite: "/characters/staff_admin.png",
      x: 1030,
      y: 300,
      kind: "npc",
      service: "admin",
      idleDirection: "down",
      idleFrame: 1,
    },
    {
      id: "pedago",
      name: "Pédagogie",
      sprite: "/characters/staff_pedago.png",
      x: 1040,
      y: 620,
      kind: "npc",
      service: "pedago",
      idleDirection: "down",
      idleFrame: 1,
    },
    {
      id: "tech",
      name: "Service Technique",
      sprite: "/characters/staff_tech.png",
      x: 300,
      y: 620,
      kind: "npc",
      service: "tech",
      idleDirection: "down",
      idleFrame: 1,
    },
    {
      id: "exit",
      name: "Sortie vers le campus",
      sprite: "",
      x: 760,
      y: 1000,
      kind: "door",
    },
  ],
};

type Dialogue = {
  name: string;
  lines: string[];
};

export const dialogues: Record<string, Dialogue> = {
  guide: {
    name: "Ancien étudiant",
    lines: [
      "Salut ! Bienvenue à ISITCOM ! Je me souviens encore de ma première journée ici. Au début, on a l'impression que tout est nouveau, mais tu vas vite prendre tes repères.",
      "Mon premier conseil : prends le temps de repérer les salles, les escaliers et les différents services. Regarde les panneaux et vérifie ton emploi du temps avant de te déplacer.",
      "Tu verras souvent les abréviations CM, TD et TP. Un CM est un cours magistral, un TD sert à approfondir les notions avec des exercices, et un TP permet de mettre les connaissances en pratique.",
      "Ne te contente pas de mémoriser ton emploi du temps. Essaie aussi de comprendre où se trouvent tes salles et prévois un peu de temps pour passer d'un cours à l'autre.",
      "Si tu as une question sur les cours, les groupes ou l'organisation de la journée, demande au délégué de classe ou au service concerné. C'est toujours mieux que de rester dans le doute.",
      "Pense aussi à consulter régulièrement les plateformes et les espaces numériques utilisés par tes enseignants pour vérifier les annonces, les supports de cours et les éventuels changements.",
      "Un autre conseil : garde tes cours bien organisés dès le début. Note les informations importantes, révise régulièrement et évite d'attendre la veille d'un contrôle pour commencer.",
      "Et surtout, n'aie pas peur de demander de l'aide. Tout le monde a été nouveau un jour, et prendre ses repères fait partie de l'expérience universitaire.",
      "Pour commencer, dirige-toi vers l'entrée du bâtiment, puis découvre les différents services. Avance étape par étape : tu n'as pas besoin de tout connaître dès le premier jour !",
    ],
  },
  delegate: {
    name: "Délégué de classe",
    lines: [
      "Salut ! Tu es nouveau ici ? Bienvenue à ISITCOM ! Si tu as du mal à t'y retrouver au début, ne t'inquiète pas, je peux t'aider à prendre tes repères.",
      "Le premier réflexe à avoir, c'est de bien consulter ton emploi du temps. Vérifie les salles, les horaires et les groupes pour éviter les mauvaises surprises.",
      "Si tu ne trouves pas une salle, regarde les panneaux d'affichage ou demande aux étudiants autour de toi. En cas de doute, vérifie toujours les informations officielles.",
      "Tu découvriras plusieurs services dans le bâtiment. Chacun a un rôle différent, alors explique clairement ta situation pour qu'on puisse t'orienter vers le bon interlocuteur.",
      "Petit rappel : CM signifie cours magistral, TD signifie travaux dirigés et TP signifie travaux pratiques. Le format prévu dépend de ton emploi du temps, alors prends le temps de le vérifier.",
      "Un conseil pour bien commencer l'année : note les informations importantes, garde tes documents organisés et consulte régulièrement les annonces de tes enseignants.",
      "Et si tu as un problème avec ton groupe, ton emploi du temps ou une information administrative, ne reste pas bloqué tout seul. Demande de l'aide au service concerné.",
      "Enfin, profite de cette première journée pour découvrir les lieux et faire connaissance avec les autres étudiants. Tu n'es pas obligé de tout maîtriser dès le premier jour !",
    ],
  },
  student: {
    name: "Accueil étudiant",
    lines: [
      "Bonjour et bienvenue à ISITCOM ! Tu découvres le campus ? Pas de souci, c'est normal de ne pas tout connaître dès le premier jour.",
      "Si tu ne sais pas vers qui te tourner, explique-moi ce que tu cherches. Je pourrai t'aider à identifier le service ou la personne à contacter.",
      "Un petit conseil : note les noms des différents espaces et les informations importantes que tu découvres aujourd'hui. Ça t'évitera de devoir tout rechercher plus tard.",
      "N'hésite pas non plus à discuter avec les autres étudiants. Ils pourront partager leurs expériences et t'aider à mieux comprendre la vie universitaire.",
      "Prends ton temps pour découvrir les lieux. Une fois que tu connaîtras les principaux repères, tu te sentiras beaucoup plus à l'aise !",
    ],
  },

  admin: {
    name: "Administration",
    lines: [
      "Bonjour ! Le service administratif s'occupe de différentes démarches liées à la gestion des dossiers et à la situation administrative des étudiants.",
      "Pour une démarche précise, vérifie toujours les documents nécessaires, les délais et les consignes auprès de la source officielle concernée. Mieux vaut vérifier que devoir recommencer !",
      "Lorsque tu poses une question, explique clairement ta situation et précise le sujet de ta demande. Cela facilite les échanges et permet de mieux t'orienter.",
      "Pense à conserver les documents importants et les réponses utiles que tu reçois. Un dossier bien organisé peut te faire gagner beaucoup de temps.",
      "Et surtout, si une consigne te semble ambiguë, demande une clarification avant d'entreprendre une démarche. C'est plus simple que de corriger une erreur par la suite.",
    ],
  },

  pedago: {
    name: "Service pédagogique",
    lines: [
      "Bonjour ! Tu veux mieux comprendre l'organisation des cours ? Commençons par les trois formats que tu rencontreras souvent à l'université.",
      "Le CM, ou cours magistral, sert principalement à présenter et expliquer les notions du programme. Il est souvent centré sur les explications de l'enseignant.",
      "Le TD, ou travaux dirigés, permet d'approfondir ces notions à travers des exercices, des applications et des échanges avec l'enseignant.",
      "Le TP, ou travaux pratiques, met davantage l'accent sur l'application concrète des connaissances. En informatique, cela peut notamment passer par la programmation et la manipulation d'outils.",
      "Ces trois formats sont complémentaires. Pour savoir où et quand tu dois assister à chacun, consulte ton emploi du temps et vérifie les éventuelles mises à jour.",
      "Si tu as un doute sur un groupe, une séance ou une salle, demande confirmation auprès de la personne ou du service compétent plutôt que de te fier à une information incertaine.",
    ],
  },

  tech: {
    name: "Service technique",
    lines: [
      "Salut ! Tu as une question sur les outils numériques ? Je peux t'expliquer quelques notions utiles pour bien commencer à l'université.",
      "L'ENT, ou espace numérique de travail, désigne généralement un portail qui regroupe différents services numériques liés à un établissement. Les fonctionnalités disponibles dépendent de la plateforme utilisée.",
      "Moodle est une plateforme d'apprentissage en ligne qui peut permettre de consulter des ressources pédagogiques, de réaliser des activités ou de suivre les consignes publiées par les enseignants.",
      "Premier réflexe en cas de problème de connexion : vérifie tes identifiants, ta connexion Internet et les éventuels messages d'erreur avant de réessayer.",
      "Si le problème persiste, note le message d'erreur et explique les étapes qui ont conduit au problème. Ces informations aideront la personne chargée de l'assistance à comprendre la situation.",
      "Enfin, utilise les liens et les instructions communiqués par les sources officielles de l'établissement. Ne suppose pas qu'un outil ou un service est disponible sans l'avoir vérifié.",
    ],
  },
};

export interface QuizQuestion {
  id: string;
  question: string;
  answers: string[];
  correct: number;
  explanation: string;
}

export const quizzes: Record<ServiceId, QuizQuestion[]> = {
  student: [
    {
      id: "student-orientation",
      question: "Tu cherches un service sur le campus. Quel est le meilleur réflexe ?",
      answers: [
        "Repérer les indications et demander son chemin si nécessaire",
        "Entrer dans la première salle venue",
        "Attendre que quelqu’un devine ce que tu cherches",
      ],
      correct: 0,
      explanation:
        "Les indications et les questions posées aux bonnes personnes permettent de s’orienter plus facilement.",
    },
    {
      id: "student-help",
      question: "Tu ne sais pas à qui poser une question sur la vie étudiante. Que faire ?",
      answers: [
        "Demander à être orienté vers le bon interlocuteur",
        "Poser la même question à tout le monde sans expliquer le problème",
        "Abandonner ta recherche",
      ],
      correct: 0,
      explanation:
        "Expliquer clairement sa question permet de trouver plus facilement le service ou la personne adaptée.",
    },
    {
      id: "student-integration",
      question: "Quelle attitude peut t’aider à mieux t’intégrer à l’université ?",
      answers: [
        "Échanger avec les autres étudiants et partager des informations utiles",
        "Éviter toute discussion avec tes camarades",
        "Garder pour toi toutes les informations importantes",
      ],
      correct: 0,
      explanation:
        "Les échanges avec les autres étudiants peuvent faciliter la découverte du campus et la vie universitaire.",
    },
    {
      id: "student-first-day",
      question: "Tu découvres plusieurs endroits importants pendant ta première journée. Que devrais-tu faire ?",
      answers: [
        "Noter leurs noms et retenir comment les retrouver",
        "Compter uniquement sur ta mémoire",
        "Ignorer leur emplacement puisque tu reviendras plus tard",
      ],
      correct: 0,
      explanation:
        "Garder des repères permet de retrouver plus facilement les lieux lors des prochaines visites.",
    },
  ],

  admin: [
    {
      id: "admin-documents",
      question: "Tu dois préparer un dossier administratif. Par quoi commencer ?",
      answers: [
        "Vérifier la liste officielle des documents demandés",
        "Rassembler des documents au hasard",
        "Utiliser la liste d’un autre étudiant sans la vérifier",
      ],
      correct: 0,
      explanation:
        "Les documents nécessaires dépendent de la démarche. Vérifie toujours les consignes officielles.",
    },
    {
      id: "admin-deadlines",
      question: "Tu dois effectuer une démarche avec une date limite. Quel est le meilleur réflexe ?",
      answers: [
        "Vérifier la date officielle et prévoir suffisamment de temps",
        "Attendre le dernier jour sans rien préparer",
        "Te fier à une date entendue dans une conversation",
      ],
      correct: 0,
      explanation:
        "Vérifier les délais et anticiper la préparation réduit le risque de manquer une échéance.",
    },
    {
      id: "admin-request",
      question: "Tu dois contacter l’administration pour résoudre un problème. Comment formuler ta demande ?",
      answers: [
        "Expliquer clairement le problème et donner le contexte nécessaire",
        "Envoyer un message sans préciser le sujet",
        "Envoyer plusieurs messages identiques immédiatement",
      ],
      correct: 0,
      explanation:
        "Une demande claire et suffisamment précise facilite la compréhension de ta situation.",
    },
    {
      id: "admin-records",
      question: "Après avoir reçu une réponse importante concernant une démarche, que faire ?",
      answers: [
        "Conserver la réponse et les documents associés",
        "Supprimer la réponse immédiatement",
        "Compter uniquement sur ta mémoire",
      ],
      correct: 0,
      explanation:
        "Conserver les informations utiles permet de les retrouver si tu dois vérifier une consigne plus tard.",
    },
  ],

  pedago: [
    {
      id: "pedago-cm",
      question: "Pendant un CM, quel est généralement l’objectif principal ?",
      answers: [
        "Découvrir et comprendre les notions présentées par l’enseignant",
        "Effectuer uniquement des démarches administratives",
        "Se déplacer entre les différents services du campus",
      ],
      correct: 0,
      explanation:
        "Un cours magistral présente principalement les notions et les connaissances du programme.",
    },
    {
      id: "pedago-td",
      question: "Tu veux approfondir une notion du cours en résolvant des exercices. Quel format correspond le mieux à cet objectif ?",
      answers: [
        "Un TD (travaux dirigés)",
        "Un rendez-vous administratif",
        "Une visite du campus",
      ],
      correct: 0,
      explanation:
        "Les TD permettent généralement de travailler les notions à travers des exercices et des applications.",
    },
    {
      id: "pedago-tp",
      question: "En informatique, quelle activité correspond le mieux à un TP ?",
      answers: [
        "Écrire et tester un programme dans un environnement de travail",
        "Vérifier une date limite administrative",
        "Chercher le bureau d’un service",
      ],
      correct: 0,
      explanation:
        "Les travaux pratiques permettent d’appliquer les connaissances, par exemple en programmant et en testant du code.",
    },
    {
      id: "pedago-schedule",
      question: "Ton emploi du temps indique un groupe et une salle pour un cours. Que dois-tu vérifier avant de t’y rendre ?",
      answers: [
        "L’horaire, la salle et le groupe indiqués",
        "Uniquement le nom du cours",
        "La salle utilisée par un autre étudiant au hasard",
      ],
      correct: 0,
      explanation:
        "Vérifier le groupe, l’horaire et la salle permet d’éviter les erreurs de déplacement.",
    },
    {
      id: "pedago-revision",
      question: "Tu ne comprends pas une notion après le cours. Quelle méthode est la plus utile ?",
      answers: [
        "Revoir le cours, essayer des exercices et demander une explication si nécessaire",
        "Ignorer la notion jusqu’à l’examen",
        "Mémoriser les réponses sans comprendre la méthode",
      ],
      correct: 0,
      explanation:
        "Revoir les notions, pratiquer et demander de l’aide permet de consolider progressivement ses connaissances.",
    },
  ],

  tech: [
    {
      id: "tech-troubleshooting",
      question: "Un ordinateur ou un outil numérique ne fonctionne pas comme prévu. Quel est le premier réflexe utile ?",
      answers: [
        "Observer le problème et noter le message d’erreur",
        "Modifier tous les paramètres sans vérifier",
        "Supprimer immédiatement les fichiers du projet",
      ],
      correct: 0,
      explanation:
        "Identifier le symptôme et conserver le message d’erreur aide à comprendre l’origine du problème.",
    },
    {
      id: "tech-reproduction",
      question: "Tu demandes de l’aide pour un problème informatique. Quelle information est la plus utile ?",
      answers: [
        "Les étapes effectuées et le résultat obtenu",
        "Uniquement le fait que l’ordinateur ne marche pas",
        "Une description sans rapport avec le problème",
      ],
      correct: 0,
      explanation:
        "Décrire les étapes et le résultat permet à la personne qui t’aide de mieux reproduire et diagnostiquer le problème.",
    },
    {
      id: "tech-restart",
      question: "Une application semble bloquée. Quelle première action raisonnable peux-tu essayer ?",
      answers: [
        "Attendre un instant, vérifier son état et essayer de la relancer si nécessaire",
        "Éteindre immédiatement tous les équipements disponibles",
        "Supprimer l’application sans vérifier le problème",
      ],
      correct: 0,
      explanation:
        "Une vérification simple et une relance prudente peuvent résoudre certains blocages. Si le problème persiste, demande de l’aide.",
    },
    {
      id: "tech-files",
      question: "Tu travailles sur un projet informatique important. Quelle habitude limite le risque de perdre ton travail ?",
      answers: [
        "Enregistrer régulièrement et conserver des copies de sauvegarde",
        "Garder toutes les modifications uniquement en mémoire",
        "Supprimer les anciennes versions sans conserver de copie",
      ],
      correct: 0,
      explanation:
        "L’enregistrement régulier et les sauvegardes permettent de récupérer son travail en cas de problème.",
    },
  ],
};
