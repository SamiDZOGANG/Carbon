import React from 'react';
import './About.css';

const About: React.FC = () => {
  return (
    <main className="main-container" style={{ backgroundColor: 'white' }}>
      <section className="intro-section" style={{ padding: '2rem 4rem 1rem 4rem', minHeight: 'auto', display: 'block' }}>
        <div className="intro-container">
          <div className="section-header">
            <div className="section-badge" style={{ marginTop: '2rem' }}>📋 À propos</div>
            <h1 className="section-title">À propos</h1>
            <p className="section-subtitle">
              La Poste s'engage résolument dans la lutte contre le changement climatique avec l'ambition 
              d'atteindre la neutralité carbone d'ici 2040. Dans ce contexte, chaque entité du groupe 
              a un rôle déterminant à jouer dans cette transformation environnementale. Ce calculateur 
              de bilan des émissions de gaz à effet de serre (GES) est un outil stratégique conçu 
              spécifiquement pour accompagner l'ensemble des établissements, centres de distribution, 
              bureaux de poste et directions régionales dans leur démarche de décarbonation.
            </p>
            <p className="section-subtitle">
              Développé selon les standards internationaux du GHG Protocol et alimenté par les données 
              officielles de la Base Carbone® de l'ADEME, cet outil intuitif et complet vous permettra 
              de réaliser un diagnostic précis de votre empreinte carbone. Au-delà de la simple mesure, 
              il vous aide à identifier vos principaux postes d'émissions, à comprendre les leviers 
              d'action les plus pertinents et à suivre l'évolution de vos performances environnementales 
              dans le temps. Conçu pour être accessible à tous, il ne nécessite aucune expertise 
              technique préalable et s'adapte aux spécificités de chaque type d'entité du groupe La Poste.
            </p>
            <p className="section-subtitle">
              En utilisant cet outil, vous contribuez directement aux objectifs environnementaux 
              du groupe et participez à la construction d'un avenir plus durable. Les données collectées 
              permettront également d'alimenter le reporting consolidé du groupe et d'identifier 
              les meilleures pratiques à partager entre entités.
            </p>
          </div>
        </div>
      </section>
      
      <section className="about-content-section" style={{ backgroundColor: 'white', padding: '0 4rem 1rem 4rem' }}>
        <div className="intro-container">
          <div className="about-content">



          <div className="section-header" style={{ textAlign: 'left', marginBottom: '3rem', marginTop: '1rem' }}>
            <h2 className="section-title" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', marginBottom: '1rem' }}>Formules de calcul</h2>
            <p className="section-subtitle" style={{ textAlign: 'justify' }}>
              L'ensemble des calculs d'émissions s'appuient sur les facteurs d'émission de la Base Carbone® de l'ADEME. 
              Voici les principales formules utilisées dans l'outil :
            </p>
            
            <div className="formulas-section" style={{ marginTop: '2rem' }}>
              <h3 style={{ color: '#2c3e50', marginBottom: '1rem' }}>🏢 Bâtiments</h3>
              <ul className="section-subtitle" style={{ textAlign: 'left', paddingLeft: '1.5rem', marginBottom: '2rem' }}>
                <li>Électricité : Consommation (kWh) × 0.0571 kg CO₂/kWh (mix français)</li>
                <li>Gaz naturel : Consommation (kWh) × 0.227 kg CO₂/kWh</li>
                <li>Propane : Consommation (kg) × 2.98 kg CO₂/kg</li>
                <li>Eau : Volume (m³) × 0.132 kg CO₂/m³</li>
              </ul>

              <h3 style={{ color: '#2c3e50', marginBottom: '1rem' }}>🚗 Transport - Flotte propre</h3>
              <ul className="section-subtitle" style={{ textAlign: 'left', paddingLeft: '1.5rem', marginBottom: '2rem' }}>
                <li>Essence : Consommation (L) × 2.28 kg CO₂/L</li>
                <li>Diesel : Consommation (L) × 2.51 kg CO₂/L</li>
                <li>GNV : Consommation (kg) × 2.16 kg CO₂/kg</li>
                <li>Électricité véhicules : Consommation (kWh) × 0.0571 kg CO₂/kWh</li>
                <li>HVO : Consommation (L) × 0.25 kg CO₂/L</li>
              </ul>

              <h3 style={{ color: '#2c3e50', marginBottom: '1rem' }}>👥 Déplacements domicile-travail</h3>
              <ul className="section-subtitle" style={{ textAlign: 'left', paddingLeft: '1.5rem', marginBottom: '2rem' }}>
                <li>Voiture thermique : Distance (km) × 0.193 kg CO₂/km</li>
                <li>Voiture électrique : Distance (km) × 0.0571 kg CO₂/km</li>
                <li>Voiture hybride : Distance (km) × 0.146 kg CO₂/km</li>
                <li>Transport en commun : Distance (km) × facteur selon type</li>
                <li>Train : Distance (km) × 0.014 kg CO₂/km.passager</li>
              </ul>

              <h3 style={{ color: '#2c3e50', marginBottom: '1rem' }}>✈️ Déplacements professionnels</h3>
              <ul className="section-subtitle" style={{ textAlign: 'left', paddingLeft: '1.5rem', marginBottom: '2rem' }}>
                <li>Avion court-courrier (&lt;1000km) : Distance (km) × 0.258 kg CO₂/km.passager</li>
                <li>Avion moyen-courrier (1000-3000km) : Distance (km) × 0.187 kg CO₂/km.passager</li>
                <li>Avion long-courrier (&gt;3000km) : Distance (km) × 0.152 kg CO₂/km.passager</li>
                <li>Train : Distance (km) × 0.014 kg CO₂/km.passager</li>
                <li>Voiture : Distance (km) × 0.193 kg CO₂/km</li>
              </ul>

              <h3 style={{ color: '#2c3e50', marginBottom: '1rem' }}>🍽️ Restauration</h3>
              <ul className="section-subtitle" style={{ textAlign: 'left', paddingLeft: '1.5rem', marginBottom: '2rem' }}>
                <li>Repas moyen : Nombre × 5.14 kg CO₂/repas</li>
                <li>Repas végétalien : Nombre × 0.51 kg CO₂/repas</li>
                <li>Repas végétarien : Nombre × 1.42 kg CO₂/repas</li>
                <li>Repas viande blanche : Nombre × 4.15 kg CO₂/repas</li>
                <li>Repas viande rouge : Nombre × 7.26 kg CO₂/repas</li>
                <li>Repas poisson : Nombre × 3.75 kg CO₂/repas</li>
              </ul>

              <h3 style={{ color: '#2c3e50', marginBottom: '1rem' }}>🛒 Achats</h3>
              <ul className="section-subtitle" style={{ textAlign: 'left', paddingLeft: '1.5rem', marginBottom: '2rem' }}>
                <li>Papier : Poids (kg) × 1.84 kg CO₂/kg</li>
                <li>Ordinateur portable : Nombre × 300 kg CO₂/unité</li>
                <li>Ordinateur fixe : Nombre × 169 kg CO₂/unité</li>
                <li>Écran : Nombre × 248 kg CO₂/unité</li>
                <li>Smartphone : Nombre × 39.1 kg CO₂/unité</li>
                <li>Fournitures : Montant (€) × 0.52 kg CO₂/€</li>
              </ul>

              <h3 style={{ color: '#2c3e50', marginBottom: '1rem' }}>🗑️ Déchets</h3>
              <ul className="section-subtitle" style={{ textAlign: 'left', paddingLeft: '1.5rem', marginBottom: '2rem' }}>
                <li>Déchets recyclés : Poids (kg) × 0.021 kg CO₂/kg</li>
                <li>Déchets non recyclables : Poids (kg) × 0.467 kg CO₂/kg</li>
                <li>Déchets textiles : Poids (kg) × 0.467 kg CO₂/kg</li>
              </ul>
            </div>
          </div>

          <div className="section-header" style={{ textAlign: 'left', marginBottom: '3rem' }}>
            <h2 className="section-title" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', marginBottom: '1rem' }}>Comment utiliser l'outil ?</h2>
            <ol className="section-subtitle steps-list" style={{ textAlign: 'left', paddingLeft: '1.5rem' }}>
              <li>
                <strong>Sélectionnez les catégories</strong> pertinentes pour votre entité
              </li>
              <li>
                <strong>Renseignez les données</strong> de consommation et d'activité
              </li>
              <li>
                <strong>Consultez les résultats</strong> et identifiez vos principaux postes d'émissions
              </li>
              <li>
                <strong>Suivez les recommandations</strong> pour réduire votre impact
              </li>
              <li>
                <strong>Exportez votre bilan</strong> pour le partager et le suivre dans le temps
              </li>
            </ol>
          </div>

          <div className="section-header" style={{ textAlign: 'left', marginBottom: '3rem' }}>
            <h2 className="section-title" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', marginBottom: '1rem' }}>Support et assistance</h2>
            <p className="section-subtitle" style={{ textAlign: 'justify' }}>
              Pour toute question sur l'utilisation de l'outil ou l'interprétation des résultats, 
              n'hésitez pas à contacter :
            </p>
            <div className="contact-info" style={{ marginTop: '1rem' }}>
              <p className="section-subtitle" style={{ textAlign: 'justify' }}><strong>Support technique :</strong> support-ges@laposte.fr</p>
              <p className="section-subtitle" style={{ textAlign: 'justify' }}><strong>Questions méthodologiques :</strong> expertise-carbone@laposte.fr</p>
              <p className="section-subtitle" style={{ textAlign: 'justify' }}><strong>Documentation :</strong> Disponible dans l'espace intranet GES</p>
            </div>
          </div>

        </div>
        </div>
      </section>
    </main>
  );
};

export default About;