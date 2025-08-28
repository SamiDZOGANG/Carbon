import React, { useState } from 'react';
import './FAQ.css';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const FAQ: React.FC = () => {
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const faqItems: FAQItem[] = [
    {
      id: 1,
      question: "Qu'est-ce qu'un bilan GES ?",
      answer: "Un bilan GES (Gaz à Effet de Serre) est une évaluation des émissions de gaz à effet de serre générées directement ou indirectement par une organisation. Il permet d'identifier les principales sources d'émissions et de définir des actions de réduction.",
      category: "general"
    },
    {
      id: 2,
      question: "Quelles sont les données nécessaires pour réaliser mon bilan ?",
      answer: "Les principales données nécessaires sont : les consommations énergétiques des bâtiments (électricité, gaz, fioul), les données de transport (carburant, kilométrage), les déplacements des collaborateurs, les achats et les déchets générés.",
      category: "donnees"
    },
    {
      id: 3,
      question: "Comment accéder aux données de consommation énergétique ?",
      answer: "Les données énergétiques sont disponibles dans l'outil SOBRE du groupe. Si vous n'y avez pas accès, contactez votre RET, ROET, contrôleur de gestion ou la DEX.",
      category: "donnees"
    },
    {
      id: 4,
      question: "Quelle est la différence entre Scope 1, 2 et 3 ?",
      answer: "Scope 1 : émissions directes (combustion de carburant, fuites de gaz). Scope 2 : émissions indirectes liées à l'énergie (électricité, vapeur achetée). Scope 3 : autres émissions indirectes (transport, achats, déchets, déplacements domicile-travail).",
      category: "methodologie"
    },
    {
      id: 5,
      question: "À quelle fréquence dois-je réaliser mon bilan GES ?",
      answer: "Il est recommandé de réaliser un bilan GES annuel pour suivre l'évolution de vos émissions et mesurer l'efficacité de vos actions de réduction. Un bilan trimestriel peut être utile pour les entités à fort enjeu carbone.",
      category: "general"
    },
    {
      id: 6,
      question: "Comment interpréter mes résultats ?",
      answer: "Les résultats vous indiquent vos émissions totales en tCO2e et leur répartition par catégorie. Concentrez-vous sur les postes les plus émetteurs pour prioriser vos actions. Les recommandations fournies vous guident vers les actions les plus efficaces.",
      category: "resultats"
    },
    {
      id: 7,
      question: "Puis-je comparer mes résultats avec d'autres entités ?",
      answer: "Actuellement, l'outil ne permet pas la comparaison directe. Cette fonctionnalité sera disponible dans une prochaine version. Vous pouvez néanmoins demander des benchmarks à l'équipe expertise-carbone.",
      category: "resultats"
    },
    {
      id: 8,
      question: "Comment exporter mon bilan ?",
      answer: "Sur la page Résultats, utilisez les boutons d'export pour générer un PDF (rapport complet) ou un Excel (données détaillées). Vous pouvez aussi partager par email ou sauvegarder pour un suivi ultérieur.",
      category: "utilisation"
    },
    {
      id: 9,
      question: "Les facteurs d'émission sont-ils à jour ?",
      answer: "Oui, les facteurs d'émission sont issus de la Base Carbone® de l'ADEME et sont mis à jour régulièrement. La date de dernière mise à jour est indiquée dans les paramètres de l'outil.",
      category: "methodologie"
    },
    {
      id: 10,
      question: "Que faire si je n'ai pas toutes les données ?",
      answer: "Commencez avec les données disponibles. L'outil vous permet de sauvegarder votre progression et de compléter ultérieurement. Pour les données manquantes, des estimations basées sur des moyennes sectorielles peuvent être utilisées.",
      category: "donnees"
    }
  ];

  const categories = [
    { id: 'all', name: 'Toutes les questions', icon: '📋' },
    { id: 'general', name: 'Général', icon: '💡' },
    { id: 'donnees', name: 'Données', icon: '📊' },
    { id: 'methodologie', name: 'Méthodologie', icon: '🔬' },
    { id: 'resultats', name: 'Résultats', icon: '📈' },
    { id: 'utilisation', name: 'Utilisation', icon: '⚙️' }
  ];

  const filteredItems = activeCategory === 'all' 
    ? faqItems 
    : faqItems.filter(item => item.category === activeCategory);

  const toggleItem = (id: number) => {
    setActiveItem(activeItem === id ? null : id);
  };

  return (
    <main className="main-container" style={{ backgroundColor: 'white' }}>
      <section className="intro-section" style={{ padding: '2rem 4rem 0rem 4rem', minHeight: 'auto', display: 'block' }}>
        <div className="intro-container">
          <div className="section-header">
            <div className="section-badge" style={{ marginTop: '2rem' }}>❓ Support et Assistance</div>
            <h1 className="section-title">Questions Fréquentes</h1>
            <p className="section-subtitle" style={{ marginBottom: '0rem', paddingBottom: '0rem', textAlign: 'center' }}>
              Trouvez rapidement les réponses à vos questions sur le calculateur GES La Poste.
              Notre équipe a rassemblé les interrogations les plus courantes pour vous accompagner 
              dans l'utilisation de l'outil et la réalisation de votre bilan carbone.
              Si vous ne trouvez pas la réponse à votre question, n'hésitez pas à nous contacter 
              directement via l'adresse email fournie en bas de cette page.
            </p>
          </div>
        </div>
      </section>

      <section className="faq-content-section" style={{ backgroundColor: 'white' }}>
        <div className="intro-container">

        <div className="faq-categories">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`category-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <span className="category-icon">{cat.icon}</span>
              <span className="category-name">{cat.name}</span>
            </button>
          ))}
        </div>

        <div className="faq-list">
          {filteredItems.map(item => (
            <div key={item.id} className="faq-item">
              <button
                className={`faq-question ${activeItem === item.id ? 'active' : ''}`}
                onClick={() => toggleItem(item.id)}
              >
                <span>{item.question}</span>
                <span className="faq-toggle">{activeItem === item.id ? '−' : '+'}</span>
              </button>
              {activeItem === item.id && (
                <div className="faq-answer">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="faq-contact">
          <h2>Vous n'avez pas trouvé votre réponse ?</h2>
          <p>Notre équipe est là pour vous accompagner</p>
          <div className="contact-buttons">
            <a href="mailto:support-ges@laposte.fr" className="cta-button primary">
              ✉️ Contacter le support
            </a>
            <a href="#" className="cta-button secondary">
              📚 Consulter la documentation
            </a>
          </div>
        </div>
        </div>
      </section>
    </main>
  );
};

export default FAQ;