import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Les Chroniques de Lyra | Explore Ton Avenir",
  description: "Embarque pour une aventure magique à Lyra et découvre ta future carrière à travers des quêtes passionnantes !",
  keywords: "orientation professionnelle, exploration de carrière, étudiants, monde fantastique, Lyra",
  authors: [{ name: "Les Créateurs des Chroniques de Lyra" }],
  category: "Education",
  openGraph: {
    title: "Les Chroniques de Lyra | Une Aventure Vers Ton Futur",
    description: "Explore tes passions, découvre des métiers passionnants et forge ton avenir dans un monde magique !",
    images: [
      {
        url: "/images/lyra_world.jpg",
        width: 1200,
        height: 630,
        alt: "Le monde magique de Lyra",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Les Chroniques de Lyra | Ton Aventure Professionnelle",
    description: "Dévoile ton potentiel et explore des carrières fascinantes dans un univers enchanteur !",
    images: ["/images/lyra_world.jpg"],
  },
};