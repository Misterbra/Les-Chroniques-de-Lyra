const quests = [
  {
    name: "Explorer le Laboratoire des Sciences",
    trigger: ["laboratoire", "sciences", "expériences"],
    experienceGain: 50,
    message: "Tu as découvert le Laboratoire des Sciences, un endroit fascinant rempli d'expériences passionnantes !",
    description: "Le Laboratoire des Sciences est un lieu où la curiosité et la découverte règnent. C'est l'endroit parfait pour explorer le monde de la science et de la technologie.",
    traits: ["Curieux", "Analytique"],
    insights: ["La science nous aide à comprendre le monde qui nous entoure et à résoudre des problèmes complexes."],
    potentialCareers: ["Scientifique", "Ingénieur", "Chercheur"],
    skills: ["Observation", "Analyse", "Résolution de problèmes"]
  },
  {
    name: "Visiter l'Atelier des Arts",
    trigger: ["atelier", "arts", "création"],
    experienceGain: 50,
    message: "Tu as visité l'Atelier des Arts, un espace où l'imagination prend vie !",
    description: "L'Atelier des Arts est un lieu vibrant où la créativité s'exprime sous toutes ses formes. C'est l'endroit idéal pour explorer tes talents artistiques.",
    traits: ["Créatif", "Expressif"],
    insights: ["L'art nous permet d'exprimer nos émotions et de voir le monde sous différents angles."],
    potentialCareers: ["Artiste", "Designer", "Architecte"],
    skills: ["Créativité", "Expression visuelle", "Pensée innovante"]
  },
  {
    name: "Participer au Débat des Idées",
    trigger: ["débat", "idées", "argumentation"],
    experienceGain: 75,
    message: "Tu as participé au Débat des Idées, où les mots ont le pouvoir de changer le monde !",
    description: "Le Débat des Idées est une arène intellectuelle où les opinions s'affrontent et les esprits s'aiguisent. C'est un lieu pour développer ton esprit critique et ta rhétorique.",
    traits: ["Éloquent", "Réfléchi"],
    insights: ["La capacité à communiquer efficacement et à défendre ses idées est cruciale dans de nombreux domaines."],
    potentialCareers: ["Avocat", "Journaliste", "Politicien"],
    skills: ["Communication", "Argumentation", "Pensée critique"]
  },
  {
    name: "Explorer la Forêt de la Compassion",
    trigger: ["forêt", "compassion", "entraide"],
    experienceGain: 60,
    message: "Tu as exploré la Forêt de la Compassion, où l'empathie et la bienveillance règnent en maître.",
    description: "La Forêt de la Compassion est un lieu où l'on apprend à comprendre et à aider les autres. C'est un endroit idéal pour développer tes compétences sociales et émotionnelles.",
    traits: ["Empathique", "Bienveillant"],
    insights: ["L'empathie et la compassion sont des qualités essentielles pour créer des relations positives et contribuer à la société."],
    potentialCareers: ["Psychologue", "Travailleur social", "Enseignant"],
    skills: ["Écoute active", "Empathie", "Résolution de conflits"]
  },
  {
    name: "Visiter la Tour de l'Innovation",
    trigger: ["tour", "innovation", "technologie"],
    experienceGain: 80,
    message: "Tu as visité la Tour de l'Innovation, où le futur prend forme !",
    description: "La Tour de l'Innovation est un lieu où les idées révolutionnaires naissent et se concrétisent. C'est l'endroit parfait pour explorer les technologies de pointe et imaginer l'avenir.",
    traits: ["Innovant", "Visionnaire"],
    insights: ["L'innovation est la clé pour résoudre les défis du futur et améliorer la vie des gens."],
    potentialCareers: ["Entrepreneur", "Développeur informatique", "Ingénieur en robotique"],
    skills: ["Pensée innovante", "Résolution de problèmes", "Adaptabilité"]
  },
  {
    name: "Explorer les Grottes de l'Introspection",
    trigger: ["grottes", "introspection", "connaissance de soi"],
    experienceGain: 70,
    message: "Tu as exploré les Grottes de l'Introspection, un voyage au cœur de toi-même.",
    description: "Les Grottes de l'Introspection sont un lieu calme et profond où tu peux réfléchir sur toi-même, tes valeurs et tes aspirations. C'est un endroit idéal pour la découverte de soi.",
    traits: ["Introspectif", "Conscient de soi"],
    insights: ["La connaissance de soi est le premier pas vers l'épanouissement personnel et professionnel."],
    potentialCareers: ["Coach personnel", "Écrivain", "Philosophe"],
    skills: ["Réflexion personnelle", "Conscience de soi", "Gestion des émotions"]
  }
];

export default quests;