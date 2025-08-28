import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {
  useEffect(() => {
    // Animation des éléments au scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-aos]').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main className="home-page">
      {/* Section Présentation / Introduction */}
<section className="intro-section" data-aos="fade-up">
  <div className="intro-container">
    {/* En-tête de section */}
    <div className="section-header">
      <div className="section-badge">🌱 Engagement Environnemental La Poste</div>
      <h2 className="section-title">Engagement pour la neutralité carbone</h2>
      <p className="section-subtitle">
        Estimez et pilotez les émissions carbone de votre entité La Poste. La comptabilité carbone est une notion essentielle de la lutte contre le réchauffement climatique. Cet outil permet aux entités de La Poste d’estimer en autonomie les émissions carbone de leur périmètre, d’identifier les différents postes d’émissions et de piloter une trajectoire de décarbonation locale. 
      </p>

      <p className="section-subtitle">
      Ce n’est pas un outil de reporting même s’il offre la possibilité de remonter de l’information. L’utilisateur a la possibilité de décrire les activités de son entité au travers des catégories suivantes : Bâtiments, Flotte en propre, Transport sous-traité, Déplacements domicile-travail, Déplacements professionnels, Fréquentation [des clients et des collaborateurs], Alimentation, Achats, restauration et Déchets générés. 
</p>
       <p className="section-subtitle">
      Pour les données énergétiques liées à la consommation des bâtiments, celles-ci sont disponibles dans l’outil du groupe SOBRE. Si vous ne pouvez accéder à un tel outil pour obtenir vos consommations énergétique vous pouvez vous adresser (aux RET, ROET, Contrôleurs de gestion ou à la DEX) ou en consultant la présente base de donnée non exhaustive. Une base de données de facteurs d’émissions est utilisée pour calculer les émissions présentées sur la page Résultats.
      </p>
    </div>


    {/* Boutons d'action */}
    <div className="section-actions">
      <Link to="/outil" className="cta-primary">
        <span className="cta-text">Commencer l'évaluation</span>
        <span className="cta-subtext">15 minutes</span>
      </Link>
      <Link to="/apropos" className="cta-secondary">
        <span className="cta-text">En savoir plus</span>
      </Link>
    </div>
  </div>
</section>
      

      {/* Section Fonctionnalités */}
      <section className="features-section" data-aos="fade-up" data-aos-delay="700">
        <div className="features-container">
          <div className="section-header">
            <h2 className="section-title">Pourquoi utiliser cet outil ?</h2>
            <p className="section-subtitle" style={{ textAlign: 'center' }}>
              Un accompagnement complet pour votre comptabilité carbone
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card" data-aos="fade-up" data-aos-delay="800">
              <div className="feature-icon">🎯</div>
              <h3 className="feature-title">Analyse Complète</h3>
              <p className="feature-description">
                Couvre exhaustivement les <strong>scopes 1, 2 et 3</strong> selon les standards internationaux
                pour une analyse précise de votre empreinte carbone.
              </p>
            </div>

            <div className="feature-card" data-aos="fade-up" data-aos-delay="900">
              <div className="feature-icon">📋</div>
              <h3 className="feature-title">Catégories Détaillées</h3>
              <p className="feature-description">
                <strong>6 modules d'analyse :</strong> Bâtiments, Flotte, Transport sous-traité, 
                Déplacements professionnels, Personnel et Achats & Déchets.
              </p>
            </div>

            <div className="feature-card" data-aos="fade-up" data-aos-delay="1000">
              <div className="feature-icon">💾</div>
              <h3 className="feature-title">Sauvegarde Automatique</h3>
              <p className="feature-description">
                Progression automatiquement <strong>sauvegardée</strong> à chaque étape, 
                avec possibilité de reprendre votre analyse à tout moment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Guide d'utilisation */}
<section className="guide-section">
  <div className="guide-container">
    <div className="section-header guide-header">
      <h2 className="section-title">Comment ça marche ?</h2>
      <p className="section-subtitle" style={{ textAlign: 'center' }}>
        Suivez ces étapes simples pour réaliser votre bilan carbone en toute autonomie.
      </p>
    </div>

    <div className="features-grid">
      <div className="feature-card" data-aos="fade-up" data-aos-delay="800">
        <div className="feature-icon" style={{ color: 'green', fontSize: '3rem', fontWeight: 'bold' }}>1</div>
        <h3 className="feature-title">Décrivez vos activités</h3>
        <p className="feature-description">
          Saisissez les informations clés sur vos bâtiments, vos déplacements, vos achats et vos consommations.
        </p>
      </div>

      <div className="feature-card" data-aos="fade-up" data-aos-delay="900">
        <div className="feature-icon" style={{ color: 'green', fontSize: '3rem', fontWeight: 'bold' }}>2</div>
        <h3 className="feature-title">Analysez vos émissions</h3>
        <p className="feature-description">
          Découvrez la répartition de vos émissions selon les 3 scopes définis par l'ADEME.
        </p>
      </div>

      <div className="feature-card" data-aos="fade-up" data-aos-delay="1000">
        <div className="feature-icon" style={{ color: 'green', fontSize: '3rem', fontWeight: 'bold' }}>3</div>
        <h3 className="feature-title">Pilotez vos actions</h3>
        <p className="feature-description">
          Identifiez vos leviers de réduction et construisez une trajectoire de décarbonation adaptée.
        </p>
      </div>
    </div>
  </div>
</section>


      {/* Call-to-Action final */}
      <section className="final-cta-section" data-aos="fade-up" data-aos-delay="1500">
        <div className="final-cta-container">
          <div className="cta-content">
            <h2 className="cta-title" style={{ color: 'white' }}>Prêt à calculer votre empreinte carbone ?</h2>
            <p className="cta-description" style={{ color: 'white' }}>
              Rejoignez les entités La Poste engagées dans la transition écologique
            </p>
            <Link to="/outil" className="cta-final">
              <span className="cta-text">Démarrer mon bilan GES</span>
              <span className="cta-arrow">→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;