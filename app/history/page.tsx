"use client";

import Image from "next/image";

export default function History() {
  return (
    <div className="container text-white p-6 bg-gray-900 rounded-lg shadow-lg">
      <h1 className="text-5xl font-bold mb-6 text-center">L&apos;Histoire de Lyra</h1>
      
      <div className="mb-8">
        <p className="mb-4 text-lg leading-relaxed">
          Bienvenue dans le monde de Lyra, un royaume mystique où la magie et la technologie coexistent harmonieusement. 
          Lyra est un monde rempli de merveilles et de mystères, où les forêts sont enchantées, les montagnes touchent 
          le ciel, et les rivières chantent des mélodies anciennes. Les habitants de Lyra vivent en harmonie avec la 
          nature et possèdent une profonde sagesse.
        </p>
        <Image 
          src="/images/lyra_world.jpg" // Assurez-vous d'avoir cette image dans le dossier public/images
          alt="Le monde de Lyra"
          width={800}
          height={400}
          className="w-full rounded-lg"
        />
      </div>

      <h2 className="text-4xl font-bold mb-4">Lieux Importants de Lyra</h2>
      <ul className="list-disc list-inside mb-8 text-lg leading-relaxed">
        <li className="mb-4">
          <strong>La Vallée des Miroirs :</strong> 
          Une vallée enchantée où chaque miroir reflète une facette de l&apos;âme. Les voyageurs doivent répondre à des questions introspectives pour avancer.
          <Image 
            src="/images/valley_of_mirrors.jpg" // Assurez-vous d'avoir cette image dans le dossier public/images
            alt="La Vallée des Miroirs"
            width={800}
            height={400}
            className="w-full rounded-lg mt-2"
          />
        </li>
        <li className="mb-4">
          <strong>La Forêt des Âmes Perdues :</strong> 
          Une forêt où chaque arbre est une âme en quête de sa destinée. En aidant ces âmes, on découvre des indices sur sa propre quête.
          <Image 
            src="/images/forest_of_lost_souls.jpg" // Assurez-vous d'avoir cette image dans le dossier public/images
            alt="La Forêt des Âmes Perdues"
            width={800}
            height={400}
            className="w-full rounded-lg mt-2"
          />
        </li>
        <li className="mb-4">
          <strong>La Citadelle du Savoir :</strong> 
          Une ancienne bibliothèque gardée par le Sage Orion. Ici, on étudie les anciens textes et apprend des leçons importantes sur la vie et les quêtes.
          <Image 
            src="/images/citadel_of_knowledge.jpg" // Assurez-vous d'avoir cette image dans le dossier public/images
            alt="La Citadelle du Savoir"
            width={800}
            height={400}
            className="w-full rounded-lg mt-2"
          />
        </li>
        <li className="mb-4">
          <strong>Le Temple des Étoiles :</strong> 
          Un temple sacré où l&apos;on médite et communique avec les étoiles pour recevoir des visions du futur.
          <Image 
            src="/images/temple_of_stars.jpg" // Assurez-vous d'avoir cette image dans le dossier public/images
            alt="Le Temple des Étoiles"
            width={800}
            height={400}
            className="w-full rounded-lg mt-2"
          />
        </li>
      </ul>

      <h2 className="text-4xl font-bold mb-4">Conflit Principal</h2>
      <p className="mb-8 text-lg leading-relaxed">
        Une force obscure, appelée <strong>Le Corrupteur Éternel</strong>, menace de plonger Lyra dans le chaos. Cette 
        entité maléfique se nourrit des âmes perdues et sans but. La quête personnelle de chaque habitant de Lyra est 
        intrinsèquement liée à la défaite du Corrupteur Éternel. En trouvant leur propre chemin, ils contribuent à la 
        sauvegarde de Lyra.
      </p>

      <h2 className="text-4xl font-bold mb-4">Personnages Clés</h2>
      <ul className="list-disc list-inside mb-8 text-lg leading-relaxed">
        <li className="mb-4">
          <strong>Elyan :</strong> L&apos;Ancien Sage et guide spirituel.
          <Image 
            src="/images/Elyan.jpg" // Assurez-vous d'avoir cette image dans le dossier public/images
            alt="Orion"
            width={800}
            height={400}
            className="w-full rounded-lg mt-2"
          />
        </li>
        <li className="mb-4">
          <strong>Elara :</strong> Une guerrière mystérieuse avec une quête secrète, elle devient une alliée et amie.
          <Image 
            src="/images/elara.jpg" // Assurez-vous d'avoir cette image dans le dossier public/images
            alt="Elara"
            width={800}
            height={400}
            className="w-full rounded-lg mt-2"
          />
        </li>
        <li className="mb-4">
          <strong>Thalor :</strong> Un inventeur génial qui combine magie et technologie pour aider dans la quête.
          <Image 
            src="/images/thalor.jpg" // Assurez-vous d'avoir cette image dans le dossier public/images
            alt="Thalor"
            width={800}
            height={400}
            className="w-full rounded-lg mt-2"
          />
        </li>
        <li className="mb-4">
          <strong>Le Corrupteur Éternel :</strong> L&apos;antagoniste principal, une entité obscure qui cherche à détruire toute lumière et espoir.
          <Image 
            src="/images/corrupteur_eternel.jpg" // Assurez-vous d'avoir cette image dans le dossier public/images
            alt="Le Corrupteur Éternel"
            width={800}
            height={400}
            className="w-full rounded-lg mt-2"
          />
        </li>
        <li className="mb-4">
          <strong>L&apos;Élu :</strong> Un héros mystérieux dont le visage est caché, symbolisant chaque utilisateur. 
          <Image 
            src="/images/hero.jpg" // Assurez-vous d'avoir cette image dans le dossier public/images
            alt="L'Élu"
            width={800}
            height={400}
            className="w-full rounded-lg mt-2"
          />
        </li>
      </ul>
    </div>
  );
}
