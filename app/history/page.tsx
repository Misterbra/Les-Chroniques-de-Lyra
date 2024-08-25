"use client";

import Image from "next/image";

export default function History() {
  return (
    <div className="container text-white p-6 bg-gray-900 rounded-lg shadow-lg">
      <h1 className="text-5xl font-bold mb-6 text-center">Le Monde Magique de Lyra</h1>
      
      <div className="mb-8">
        <p className="mb-4 text-lg leading-relaxed">
          Bienvenue à Lyra, un monde fantastique où chaque lieu représente un domaine d&apos;études ou une carrière potentielle. 
          Ici, la magie de la découverte de soi se mêle à l&apos;exploration des métiers. Lyra est rempli d&apos;opportunités 
          passionnantes, où les forêts cachent des secrets sur les sciences naturelles, les montagnes défient les ingénieurs en herbe, 
          et les rivières murmurent des histoires aux futurs écrivains.
        </p>
        <Image 
          src="/images/lyra_world.jpg"
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
          Un lieu d&apos;introspection où tu découvres tes talents cachés et tes passions. Chaque miroir reflète un aspect différent de ta personnalité et de tes compétences.
          <Image 
            src="/images/valley_of_mirrors.jpg"
            alt="La Vallée des Miroirs"
            width={800}
            height={400}
            className="w-full rounded-lg mt-2"
          />
        </li>
        <li className="mb-4">
          <strong>La Forêt des Âmes Perdues :</strong> 
          Un endroit mystérieux où tu peux explorer différentes voies de carrière. Chaque arbre représente un métier différent, et en les aidant, tu découvres si cette voie te correspond.
          <Image 
            src="/images/forest_of_lost_souls.jpg"
            alt="La Forêt des Âmes Perdues"
            width={800}
            height={400}
            className="w-full rounded-lg mt-2"
          />
        </li>
        <li className="mb-4">
          <strong>La Citadelle du Savoir :</strong> 
          Une immense bibliothèque où tu peux en apprendre plus sur différents domaines d&apos;études. C&apos;est ici que tu découvres les connaissances nécessaires pour diverses carrières.
          <Image 
            src="/images/citadel_of_knowledge.jpg"
            alt="La Citadelle du Savoir"
            width={800}
            height={400}
            className="w-full rounded-lg mt-2"
          />
        </li>
        <li className="mb-4">
          <strong>Le Temple des Étoiles :</strong> 
          Un lieu de méditation où tu peux réfléchir à tes objectifs de vie et visualiser ton futur professionnel idéal.
          <Image 
            src="/images/temple_of_stars.jpg"
            alt="Le Temple des Étoiles"
            width={800}
            height={400}
            className="w-full rounded-lg mt-2"
          />
        </li>
      </ul>

      <h2 className="text-4xl font-bold mb-4">Le Défi Principal</h2>
      <p className="mb-8 text-lg leading-relaxed">
        Le <strong>Doute Persistant</strong> est une force qui peut t&apos;empêcher de poursuivre tes rêves. Il se nourrit de l&apos;incertitude 
        et du manque de confiance en soi. Ta quête à Lyra est de surmonter ce Doute en explorant tes passions, en développant tes compétences 
        et en découvrant les carrières qui t&apos;inspirent vraiment.
      </p>

      <h2 className="text-4xl font-bold mb-4">Personnages Clés</h2>
      <ul className="list-disc list-inside mb-8 text-lg leading-relaxed">
        <li className="mb-4">
          <strong>Elyan :</strong> Le mentor bienveillant qui te guide dans ton exploration de carrière.
          <Image 
            src="/images/Elyan.jpg"
            alt="Elyan"
            width={800}
            height={400}
            className="w-full rounded-lg mt-2"
          />
        </li>
        <li className="mb-4">
          <strong>Elara :</strong> Une exploratrice de carrières qui a essayé de nombreux métiers. Elle partage ses expériences pour t&apos;aider dans tes choix.
          <Image 
            src="/images/elara.jpg"
            alt="Elara"
            width={800}
            height={400}
            className="w-full rounded-lg mt-2"
          />
        </li>
        <li className="mb-4">
          <strong>Thalor :</strong> Un innovateur qui combine différentes disciplines. Il t&apos;encourage à explorer des carrières interdisciplinaires.
          <Image 
            src="/images/thalor.jpg"
            alt="Thalor"
            width={800}
            height={400}
            className="w-full rounded-lg mt-2"
          />
        </li>
        <li className="mb-4">
          <strong>Le Doute Persistant :</strong> La représentation de tes craintes et incertitudes concernant ton avenir professionnel.
          <Image 
            src="/images/corrupteur_eternel.jpg"
            alt="Le Doute Persistant"
            width={800}
            height={400}
            className="w-full rounded-lg mt-2"
          />
        </li>
        <li className="mb-4">
          <strong>Toi, l&apos;Explorateur :</strong> Le héros de ta propre histoire, en quête de ta voie professionnelle idéale.
          <Image 
            src="/images/hero.jpg"
            alt="L'Explorateur"
            width={800}
            height={400}
            className="w-full rounded-lg mt-2"
          />
        </li>
      </ul>
    </div>
  );
}