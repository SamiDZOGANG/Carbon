import React from 'react';
import EnvironmentJourney from '../../components/EnvironmentJourney/EnvironmentJourney';
import './Environment.css';

const Environment: React.FC = () => {

  return (
    <main className="main-container" style={{ backgroundColor: 'white' }}>
      <section className="intro-section" style={{ padding: '2rem 4rem 1rem 4rem', minHeight: 'auto', display: 'block' }}>
        <div className="intro-container">
          <div className="section-header">
            <div className="section-badge" style={{ marginTop: '2rem' }}>🌱 Leader de la Transition Écologique</div>
            <h2 className="section-title">Objectif Zéro Émission 2040</h2>
            <p className="section-subtitle" style={{ textAlign: 'center' }}>
              <strong>Ensemble, nous écrivons l'avenir écologique de La Poste</strong>
            </p>
            <p className="section-subtitle">
              La Poste s'engage dans une transformation sans précédent : réduire de 90 % nos émissions et compenser intégralement le reste. 
              Cet objectif ambitieux est au cœur de notre raison d'être et nous positionne comme un acteur majeur de la transition écologique française.
            </p>
            <p className="section-subtitle">
              Mais au-delà des chiffres, ce projet est avant tout une aventure humaine. Chaque jour, ce sont vos gestes, vos idées et vos actions 
              qui rendent possible ce changement.
            </p>
            <p className="section-subtitle">
              Nos flottes de véhicules électriques se déploient partout en France grâce à l'implication de nos équipes sur le terrain. 
              Nos bâtiments deviennent plus sobres en énergie grâce à la vigilance et aux initiatives locales que vous portez. 
              Nos projets de compensation carbone prennent vie parce que nous avons choisi collectivement de préserver les ressources de demain.
            </p>
            <p className="section-subtitle">
              Cette transformation ne se résume pas à des innovations techniques. Elle repose aussi sur une conviction profonde : 
              celle qu'en tant que collectif, nous pouvons agir pour un avenir plus vert, plus responsable, et transmettre aux 
              générations futures un environnement préservé.
            </p>
            <p className="section-subtitle">
              Chaque collaborateur, quel que soit son métier ou sa mission, contribue à cette ambition. En optimisant une tournée, 
              en adoptant de nouveaux gestes au quotidien, en partageant vos idées pour réduire notre impact, vous participez 
              directement à un projet qui dépasse notre entreprise : la protection de notre planète.
            </p>
            <p className="section-subtitle">
              Nous avons déjà parcouru beaucoup de chemin, et il reste encore de belles étapes à franchir. Ensemble, continuons 
              à démontrer qu'une entreprise comme La Poste peut conjuguer performance, innovation et respect de l'environnement.
            </p>
            <p className="section-subtitle">
              <strong>Votre engagement est notre force. Ensemble, nous faisons de La Poste un moteur de la transition écologique française.</strong>
            </p>
          </div>

        </div>
      </section>
      
      {/* Section avec features comme sur la page d'accueil */}
      <section className="features-section" data-aos="fade-up" data-aos-delay="700" style={{ padding: '0 2rem', backgroundColor: 'white' }}>
        <div className="features-container">
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-number">39 000</div>
              <div className="feature-label">Véhicules Électriques</div>
              <div className="feature-description">-85k tonnes CO₂/an</div>
            </div>
            <div className="feature-item">
              <div className="feature-number">-30%</div>
              <div className="feature-label">CO₂ d'ici 2025</div>
              <div className="feature-description">Base 2013</div>
            </div>
            <div className="feature-item">
              <div className="feature-number">100%</div>
              <div className="feature-label">Électricité Verte</div>
              <div className="feature-description">Besoins internes</div>
            </div>
          </div>

        </div>
      </section>

      {/* Journey Timeline Section */}
      <section id="journey" className="journey-section" style={{ padding: '0 2rem', marginTop: '-6rem' }}>
        <div className="container">
          <EnvironmentJourney />
        </div>
      </section>

    </main>
  );
};

export default Environment;