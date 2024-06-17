
# Les Chroniques de Lyra

![Lyra](./public/images/lyra_world.jpg)


Bienvenue dans **Les Chroniques de Lyra**, un projet immersif qui combine aventure fantastique et introspection personnelle. Ce projet est destiné aux personnes en reconversion professionnelle et aux élèves cherchant à découvrir leur véritable quête et passion dans la vie.

## Description du Projet

Les Chroniques de Lyra est une application interactive où les utilisateurs sont guidés par Elyan, un sage spirituel d'un monde fantastique appelé Lyra. À travers des interactions immersives, Elyan aide les utilisateurs à explorer leurs valeurs, passions et motivations profondes pour trouver un sens profond à leur existence.

## Fonctionnalités

- **Interaction immersive** avec Elyan, le guide spirituel.
- **Exploration de quêtes** et découvertes de missions personnelles.
- **Intégration d'un modèle 3D** pour une expérience plus riche.
- **Utilisation d'une API de traitement de langage naturel** pour des réponses intelligentes et adaptées.

## Installation

Suivez ces étapes pour installer et exécuter le projet localement :

### Prérequis

- Node.js (version 14 ou supérieure)
- npm (version 6 ou supérieure) ou yarn
- LM Studio (version spécifique pour l'API Llama3)
- Compte OpenAI pour utiliser l'API ChatGPT (si nécessaire)

### Cloner le dépôt

```bash
git clone https://github.com/Misterbra/Les-Chroniques-de-Lyra
cd les-chroniques-de-lyra
```

### Installer les dépendances
Utilisez npm ou yarn pour installer les dépendances :

```bash
npm install
# ou
yarn install
```

### Configuration
Pas besoin d'avoir un fichier .env à la racine du projet pour les clés API et autres configurations.
Utiliser votre clé OpenAI directement ou utiliser un modèle local.

### Lancer LM Studio
Si vous utilisez Llama3 avec LM Studio, assurez-vous de lancer LM Studio avant de démarrer l'application. 

Voici les étapes pour démarrer LM Studio :
1. Téléchargez et installez LM Studio depuis LM Studio.
2. Configurez LM Studio avec le modèle Meta-Llama-3-8B-Instruct-GGUF.
3. Lancez LM Studio et assurez-vous qu'il écoute sur le port 1234 (ou configurez le port dans le fichier .env).

### Lancer l'application

Pour démarrer l'application en mode développement, exécutez :

```bash
npm run dev
# ou
yarn dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) pour voir l'application dans votre navigateur.

### Utilisation
- **Page d'accueil** : Entrez votre nom et choisissez votre fournisseur d'API pour commencer l'aventure.
- **Quêtes** : Interagissez avec Elyan pour explorer vos passions et découvrir des missions significatives.
- **Profil** : Suivez vos progrès et les quêtes que vous avez découvertes.

### Contribution

Les contributions sont les bienvenues ! Si vous souhaitez contribuer, veuillez suivre ces étapes :
1. Forkez le projet.
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/ma-fonctionnalité`).
3. Commitez vos modifications (`git commit -m 'Ajouter ma fonctionnalité'`).
4. Poussez vers la branche (`git push origin feature/ma-fonctionnalité`).
5. Ouvrez une Pull Request.

### Auteur
MisterBra - Développeur principal - [Profil GitHub](https://github.com/Misterbra)

### License
Ce projet est sous licence MIT - voir le fichier LICENSE pour plus de détails.

### Remerciements
- OpenAI pour l'API de traitement de langage naturel.
- Spline pour l'outil de création de modèles 3D.
- Next.js pour le framework de développement.
