import React, { useState } from 'react';
import ScenarioManager from '../../components/ScenarioManager/ScenarioManager';
import EntityComparator from '../../components/EntityComparator/EntityComparator';
import './Results.css';


interface Scenario {
  id: string;
  name: string;
  description: string;
  data: any;
  createdAt: Date;
  updatedAt: Date;
  emissions: {
    total: number;
    byCategory: Record<string, number>;
    byScope: Record<string, number>;
  };
}

interface Entity {
  id: string;
  name: string;
  type: string;
  location: string;
  emissions: {
    total: number;
    scope1: number;
    scope2: number;
    scope3: number;
    intensity: number;
  };
  employees: number;
  surface: number;
  lastUpdate: Date;
}

const Results: React.FC = () => {
  const [activeScenarios, setActiveScenarios] = useState<Scenario[]>([]);
  const [entities, setEntities] = useState<Entity[]>([]);
  const [comparisonView, setComparisonView] = useState<'collaborateur' | 'entite' | 'groupe' | 'objectifs'>('collaborateur');

  // Données dynamiques selon la vue sélectionnée
  const getComparisonData = () => {
    switch (comparisonView) {
      case 'collaborateur':
        const yourEntity1 = 4.11;
        const groupAverage1 = 4.52;
        const delta1 = ((yourEntity1 - groupAverage1) / groupAverage1) * 100;
        return {
          title: 'Émissions par collaborateur',
          unit: 'tCO₂e/collaborateur',
          delta: delta1,
          data: [
            { label: 'Votre entité', value: 4.11, unit: 'tCO₂e/collab.' },
            { label: 'Moyenne similaires', value: 3.29, unit: 'tCO₂e/collab.' },
            { label: 'Moyenne groupe', value: 4.52, unit: 'tCO₂e/collab.' },
            { label: 'Objectif 2025', value: 2.88, unit: 'tCO₂e/collab.' }
          ]
        };
      case 'entite':
        const yourEntity2 = 411.17;
        const groupAverage2 = 452.30;
        const delta2 = ((yourEntity2 - groupAverage2) / groupAverage2) * 100;
        return {
          title: 'Émissions par entité',
          unit: 'tCO₂e/an',
          delta: delta2,
          data: [
            { label: 'Votre entité', value: 411.17, unit: 'tCO₂e/an' },
            { label: 'Entités similaires', value: 329.45, unit: 'tCO₂e/an' },
            { label: 'Moyenne groupe', value: 452.30, unit: 'tCO₂e/an' },
            { label: 'Objectif 2025', value: 288.82, unit: 'tCO₂e/an' }
          ]
        };
      case 'groupe':
        const yourEntity3 = 411.17;
        const groupAverage3 = 380.50;
        const delta3 = ((yourEntity3 - groupAverage3) / groupAverage3) * 100;
        return {
          title: 'Comparaison avec le groupe',
          unit: 'tCO₂e/an',
          delta: delta3,
          data: [
            { label: 'Votre entité', value: 411.17, unit: 'tCO₂e/an' },
            { label: 'Moyenne nationale', value: 380.50, unit: 'tCO₂e/an' },
            { label: 'Meilleur quartile', value: 290.25, unit: 'tCO₂e/an' },
            { label: 'Benchmark secteur', value: 320.75, unit: 'tCO₂e/an' }
          ]
        };
      case 'objectifs':
        const yourEntity4 = 411.17;
        const groupAverage4 = 288.82; // Objectif 2025 comme référence
        const delta4 = ((yourEntity4 - groupAverage4) / groupAverage4) * 100;
        return {
          title: 'Progression vers les objectifs',
          unit: 'tCO₂e/an',
          delta: delta4,
          data: [
            { label: 'Situation actuelle', value: 411.17, unit: 'tCO₂e/an' },
            { label: 'Objectif 2025', value: 288.82, unit: 'tCO₂e/an' },
            { label: 'Objectif 2030', value: 205.59, unit: 'tCO₂e/an' },
            { label: 'Objectif 2040', value: 41.12, unit: 'tCO₂e/an' }
          ]
        };
      default:
        return { title: '', unit: '', delta: 0, data: [] };
    }
  };

  // Données statiques pour l'affichage
  const totalEmissions = 411.17;

  // Fonctions pour les actions
  const handleExportPDF = () => {
    // Obtenir les données de comparaison actuelles
    const comparisonData = getComparisonData();
    const recommendations = getRecommendations();
    
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Rapport GES Complet - ${totalEmissions.toFixed(2)} tCO₂e</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.4; }
            .header { text-align: center; margin-bottom: 30px; }
            .section { margin-bottom: 30px; page-break-inside: avoid; }
            .emission-value { font-size: 28px; font-weight: bold; color: #003366; margin: 10px 0; }
            .scope { display: inline-block; margin: 10px 20px; text-align: center; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #003366; color: white; }
            .sub-section { margin: 15px 0; }
            .highlight { background-color: #f8f9fa; padding: 10px; border-radius: 5px; }
            .priority-high { border-left: 4px solid #e74c3c; }
            .priority-medium { border-left: 4px solid #f39c12; }
            .priority-low { border-left: 4px solid #27ae60; }
            h2 { color: #003366; border-bottom: 2px solid #003366; padding-bottom: 5px; }
            h3 { color: #004488; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Bilan GES Complet - La Poste</h1>
            <div class="emission-value">${totalEmissions.toFixed(2)} tCO₂e/an</div>
            <p>Équivalent à ${Math.round(totalEmissions * 111).toLocaleString('fr-FR')} tours de la Terre en voiture</p>
            <p>Rapport généré le ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')}</p>
          </div>
          
          <div class="section">
            <h2>📊 Vue d'ensemble</h2>
            <div class="highlight">
              <p><strong>Total des émissions :</strong> ${totalEmissions.toFixed(2)} tCO₂e/an</p>
              <p><strong>Niveau d'émissions :</strong> 
                ${totalEmissions <= 200 ? 'Excellent' : 
                  totalEmissions <= 400 ? 'Modéré - Actions recommandées' : 
                  'Élevé - Actions prioritaires requises'}
              </p>
            </div>
          </div>

          <div class="section">
            <h2>🎯 Répartition par Scope GHG Protocol</h2>
            <div class="scope">
              <h3>Scope 1</h3>
              <p><strong>85.2 tCO₂e (20.7%)</strong><br>Émissions directes<br>Combustion sur site, flotte propre</p>
            </div>
            <div class="scope">
              <h3>Scope 2</h3>
              <p><strong>69.5 tCO₂e (16.9%)</strong><br>Énergie achetée<br>Électricité, chaleur, vapeur</p>
            </div>
            <div class="scope">
              <h3>Scope 3</h3>
              <p><strong>256.5 tCO₂e (62.4%)</strong><br>Autres émissions<br>Chaîne de valeur, déplacements</p>
            </div>
          </div>

          <div class="section">
            <h2>📈 Analyse Comparative - ${comparisonData.title}</h2>
            <table>
              <tr><th>Indicateur</th><th>Valeur</th><th>Unité</th></tr>
              ${comparisonData.data.map(item => 
                `<tr><td>${item.label}</td><td>${item.value.toLocaleString('fr-FR')}</td><td>${item.unit}</td></tr>`
              ).join('')}
            </table>
            <div class="highlight">
              <p><strong>Écart vs moyenne groupe :</strong> ${comparisonData.delta > 0 ? '+' : ''}${comparisonData.delta.toFixed(1)}%</p>
            </div>
          </div>

          <div class="section">
            <h2>🏷️ Répartition détaillée par Catégorie</h2>
            <table>
              <tr><th>Catégorie</th><th>Émissions (tCO₂e)</th><th>Pourcentage</th><th>Classification</th></tr>
              <tr><td>Restauration</td><td>163.00</td><td>37.2%</td><td>Critique (Rouge)</td></tr>
              <tr><td>Flotte postale</td><td>85.23</td><td>19.4%</td><td>Critique (Rouge)</td></tr>
              <tr><td>Énergie</td><td>70.42</td><td>16.1%</td><td>Critique (Rouge)</td></tr>
              <tr><td>Achats</td><td>40.90</td><td>9.3%</td><td>Important (Orange)</td></tr>
              <tr><td>Déchets</td><td>21.36</td><td>4.9%</td><td>Important (Orange)</td></tr>
              <tr><td>Déplacements professionnels</td><td>15.69</td><td>3.6%</td><td>Mineur (Vert)</td></tr>
              <tr><td>Transport sous-traité</td><td>12.40</td><td>2.8%</td><td>Mineur (Vert)</td></tr>
              <tr><td>Transport domicile-travail</td><td>2.38</td><td>0.5%</td><td>Mineur (Vert)</td></tr>
            </table>
          </div>

          <div class="section">
            <h2>🔍 Détails par sous-catégorie</h2>
            
            <div class="sub-section">
              <h3>Restauration (163.00 tCO₂e)</h3>
              <ul>
                <li>Repas Viande : 110.00 tCO₂e (67.5%)</li>
                <li>Repas Poisson : 38.00 tCO₂e (23.3%)</li>
                <li>Repas Végétarien : 15.00 tCO₂e (9.2%)</li>
              </ul>
            </div>

            <div class="sub-section">
              <h3>Flotte postale (85.23 tCO₂e)</h3>
              <ul>
                <li>Véhicules Essence : 48.46 tCO₂e (56.8%)</li>
                <li>Véhicules Diesel : 27.69 tCO₂e (32.5%)</li>
                <li>Motos Thermiques : 7.15 tCO₂e (8.4%)</li>
                <li>Véhicules Électriques : 1.92 tCO₂e (2.3%)</li>
              </ul>
            </div>

            <div class="sub-section">
              <h3>Énergie (70.42 tCO₂e)</h3>
              <ul>
                <li>Gaz Naturel : 45.40 tCO₂e (64.5%)</li>
                <li>Électricité Standard : 23.94 tCO₂e (34.0%)</li>
                <li>Électricité Renouvelable : 1.08 tCO₂e (1.5%)</li>
              </ul>
            </div>
          </div>

          <div class="section">
            <h2>💡 Recommandations Prioritaires</h2>
            ${recommendations.map(rec => `
              <div class="highlight priority-${rec.priority}">
                <h3>${rec.title} (${rec.impact} de réduction potentielle)</h3>
                <p><strong>Priorité :</strong> ${rec.priority === 'high' ? 'Haute' : rec.priority === 'medium' ? 'Moyenne' : 'Basse'}</p>
                <p>${rec.description}</p>
              </div>
            `).join('')}
          </div>

          <div class="section">
            <h2>📋 Synthèse des Actions</h2>
            <div class="highlight">
              <p><strong>Actions immédiates (0-6 mois) :</strong></p>
              <ul>
                <li>Réduire la part de repas carnés de 20%</li>
                <li>Optimiser les trajets de la flotte postale</li>
                <li>Sensibiliser le personnel aux économies d'énergie</li>
              </ul>
              
              <p><strong>Actions à moyen terme (6-18 mois) :</strong></p>
              <ul>
                <li>Électrifier 30% de la flotte de véhicules légers</li>
                <li>Passer à 50% d'électricité renouvelable</li>
                <li>Améliorer le tri et le recyclage des déchets</li>
              </ul>

              <p><strong>Objectifs long terme :</strong></p>
              <ul>
                <li>Réduction de 30% des émissions d'ici 2030</li>
                <li>Neutralité carbone en 2040</li>
                <li>100% flotte électrique d'ici 2035</li>
              </ul>
            </div>
          </div>
        </body>
        </html>
      `);
      printWindow.document.close();
      setTimeout(() => {
        printWindow.print();
      }, 250);
    }
  };

  const handleExportExcel = () => {
    // Obtenir toutes les données de la page
    const comparisonData = getComparisonData();
    const recommendations = getRecommendations();
    
    // Créer des données CSV complètes pour l'export
    const csvData = [
      ['BILAN GES COMPLET - LA POSTE', '', '', ''],
      ['Date de génération', new Date().toLocaleDateString('fr-FR'), new Date().toLocaleTimeString('fr-FR'), ''],
      ['Émissions totales', `${totalEmissions.toFixed(2)} tCO₂e/an`, '', ''],
      ['Équivalent', `${Math.round(totalEmissions * 111).toLocaleString('fr-FR')} tours de la Terre en voiture`, '', ''],
      ['', '', '', ''],
      
      ['RÉPARTITION PAR SCOPE GHG PROTOCOL', '', '', ''],
      ['Scope', 'Émissions (tCO₂e)', 'Pourcentage', 'Description'],
      ['Scope 1 - Émissions directes', '85.2', '20.7%', 'Combustion sur site, flotte propre'],
      ['Scope 2 - Énergie achetée', '69.5', '16.9%', 'Électricité, chaleur, vapeur'],
      ['Scope 3 - Autres émissions', '256.5', '62.4%', 'Chaîne de valeur, déplacements'],
      ['', '', '', ''],
      
      [`ANALYSE COMPARATIVE - ${comparisonData.title.toUpperCase()}`, '', '', ''],
      ['Indicateur', 'Valeur', 'Unité', 'Commentaire'],
      ...comparisonData.data.map(item => [item.label, item.value.toLocaleString('fr-FR'), item.unit, '']),
      ['Écart vs moyenne groupe', `${comparisonData.delta > 0 ? '+' : ''}${comparisonData.delta.toFixed(1)}%`, '', 
        comparisonData.delta > 0 ? 'Au-dessus de la moyenne' : 'En-dessous de la moyenne'],
      ['', '', '', ''],
      
      ['RÉPARTITION DÉTAILLÉE PAR CATÉGORIE', '', '', ''],
      ['Catégorie', 'Émissions (tCO₂e)', 'Pourcentage', 'Classification Pareto'],
      ['Restauration', '163.00', '37.2%', 'Critique (Rouge) - 80%'],
      ['Flotte postale', '85.23', '19.4%', 'Critique (Rouge) - 80%'],
      ['Énergie', '70.42', '16.1%', 'Critique (Rouge) - 80%'],
      ['Achats', '40.90', '9.3%', 'Important (Orange) - 15%'],
      ['Déchets', '21.36', '4.9%', 'Important (Orange) - 15%'],
      ['Déplacements professionnels', '15.69', '3.6%', 'Mineur (Vert) - 5%'],
      ['Transport sous-traité', '12.40', '2.8%', 'Mineur (Vert) - 5%'],
      ['Transport domicile-travail', '2.38', '0.5%', 'Mineur (Vert) - 5%'],
      ['', '', '', ''],
      
      ['DÉTAILS PAR SOUS-CATÉGORIE', '', '', ''],
      ['Catégorie principale', 'Sous-catégorie', 'Émissions (tCO₂e)', 'Part relative (%)'],
      ['Restauration', 'Repas Viande', '110.00', '67.5%'],
      ['Restauration', 'Repas Poisson', '38.00', '23.3%'],
      ['Restauration', 'Repas Végétarien', '15.00', '9.2%'],
      ['Flotte postale', 'Véhicules Essence', '48.46', '56.8%'],
      ['Flotte postale', 'Véhicules Diesel', '27.69', '32.5%'],
      ['Flotte postale', 'Motos Thermiques', '7.15', '8.4%'],
      ['Flotte postale', 'Véhicules Électriques', '1.92', '2.3%'],
      ['Énergie', 'Gaz Naturel', '45.40', '64.5%'],
      ['Énergie', 'Électricité Standard', '23.94', '34.0%'],
      ['Énergie', 'Électricité Renouvelable', '1.08', '1.5%'],
      ['Achats', 'Ordinateurs', '22.50', '55.0%'],
      ['Achats', 'Papier', '18.40', '45.0%'],
      ['Déchets', 'Déchets Non Recyclables', '19.68', '92.1%'],
      ['Déchets', 'Déchets Recyclables', '1.68', '7.9%'],
      ['Déplacements professionnels', 'Vols Domestiques', '11.50', '73.3%'],
      ['Déplacements professionnels', 'Motos Pro', '2.79', '17.8%'],
      ['Déplacements professionnels', 'Train', '1.40', '8.9%'],
      ['Transport domicile-travail', 'Voiture Essence', '1.33', '56.0%'],
      ['Transport domicile-travail', 'Transport Commun', '0.95', '39.8%'],
      ['Transport domicile-travail', 'Moto Thermique', '0.10', '4.3%'],
      ['', '', '', ''],
      
      ['RECOMMANDATIONS PRIORITAIRES', '', '', ''],
      ['Priorité', 'Action recommandée', 'Impact potentiel', 'Description'],
      ...recommendations.map(rec => [
        rec.priority === 'high' ? 'Haute' : rec.priority === 'medium' ? 'Moyenne' : 'Basse',
        rec.title,
        rec.impact,
        rec.description
      ]),
      ['', '', '', ''],
      
      ['PLAN D\'ACTION DÉTAILLÉ', '', '', ''],
      ['Horizon temporel', 'Action', 'Objectif', 'Impact estimé'],
      ['Immédiat (0-6 mois)', 'Réduire la part de repas carnés de 20%', 'Restauration durable', '-15% sur restauration'],
      ['Immédiat (0-6 mois)', 'Optimiser les trajets de la flotte postale', 'Efficacité logistique', '-8% sur flotte'],
      ['Immédiat (0-6 mois)', 'Sensibiliser le personnel aux économies d\'énergie', 'Comportements écoresponsables', '-5% sur énergie'],
      ['Moyen terme (6-18 mois)', 'Électrifier 30% de la flotte de véhicules légers', 'Transition énergétique', '-20% sur flotte'],
      ['Moyen terme (6-18 mois)', 'Passer à 50% d\'électricité renouvelable', 'Énergie verte', '-40% sur Scope 2'],
      ['Moyen terme (6-18 mois)', 'Améliorer le tri et le recyclage des déchets', 'Économie circulaire', '-30% sur déchets'],
      ['Long terme', 'Réduction de 30% des émissions d\'ici 2030', 'Objectif climatique', '30% émissions totales'],
      ['Long terme', 'Neutralité carbone en 2040', 'Objectif La Poste', '100% émissions nettes'],
      ['Long terme', '100% flotte électrique d\'ici 2035', 'Décarbonation transport', '90% Scope 1 transport'],
      ['', '', '', ''],
      
      ['INDICATEURS DE SUIVI', '', '', ''],
      ['KPI', 'Valeur actuelle', 'Objectif 2025', 'Objectif 2030'],
      ['Émissions totales (tCO₂e/an)', totalEmissions.toFixed(2), '288.82', '205.59'],
      ['Émissions par collaborateur (tCO₂e/collab.)', '4.11', '2.88', '2.05'],
      ['Part Scope 1 (%)', '20.7%', '15%', '10%'],
      ['Part Scope 2 (%)', '16.9%', '10%', '5%'],
      ['Part Scope 3 (%)', '62.4%', '75%', '85%'],
      ['Part énergie renouvelable (%)', '15%', '50%', '80%'],
      ['Part repas végétariens (%)', '20%', '40%', '60%']
    ];
    
    const csvContent = csvData.map(row => 
      row.map(cell => 
        typeof cell === 'string' && (cell.includes(',') || cell.includes('"')) 
          ? `"${cell.replace(/"/g, '""')}"` 
          : cell
      ).join(',')
    ).join('\n');
    
    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `bilan-ges-complet-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = () => {
    const subject = `Bilan GES - ${totalEmissions.toFixed(2)} tCO₂e/an`;
    const body = `Bonjour,

Je vous partage le bilan des émissions de gaz à effet de serre :

📊 Émissions totales : ${totalEmissions.toFixed(2)} tCO₂e/an
Équivalent à ${Math.round(totalEmissions * 111).toLocaleString('fr-FR')} tours de la Terre en voiture

🔍 Répartition par Scope :
• Scope 1 : 85.2 tCO₂e (Émissions directes)
• Scope 2 : 69.5 tCO₂e (Énergie consommée)  
• Scope 3 : 256.5 tCO₂e (Chaîne de valeur)

🏆 Top 3 des catégories :
• Restauration : 163.00 tCO₂e (37.2%)
• Flotte postale : 85.23 tCO₂e (19.4%)
• Énergie : 70.42 tCO₂e (16.1%)

Rapport généré le ${new Date().toLocaleDateString('fr-FR')}

Cordialement`;

    const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  const handleSave = () => {
    const reportData = {
      date: new Date().toISOString(),
      totalEmissions,
      scopes: {
        scope1: { value: 85.2, description: 'Émissions directes' },
        scope2: { value: 69.5, description: 'Énergie consommée' },
        scope3: { value: 256.5, description: 'Chaîne de valeur' }
      },
      categories: {
        restauration: { value: 163.00, percentage: 37.2 },
        flotte: { value: 85.23, percentage: 19.4 },
        energie: { value: 70.42, percentage: 16.1 },
        achats: { value: 40.90, percentage: 9.3 },
        dechets: { value: 21.36, percentage: 4.9 },
        deplacements: { value: 15.69, percentage: 3.6 },
        transport_soustraite: { value: 12.40, percentage: 2.8 },
        transport_domicile: { value: 2.38, percentage: 0.5 }
      }
    };
    
    const dataStr = JSON.stringify(reportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `bilan-ges-sauvegarde-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Aussi sauvegarder dans le localStorage
    localStorage.setItem('ges-report-backup', dataStr);
    alert('Analyse sauvegardée avec succès !');
  };
  
  // Fonction pour déterminer la couleur selon le niveau d'émissions
  const getEmissionColor = (emissions: number) => {
    if (emissions <= 200) return '#28a745'; // Vert - Bon
    if (emissions <= 400) return '#ffc107'; // Jaune/Orange - Moyen  
    return '#dc3545'; // Rouge - Mauvais
  };

  const getRecommendations = () => {
    return [
      {
        priority: 'high',
        title: 'Optimiser la restauration collective',
        description: 'La restauration représente 37% de vos émissions. Réduire les repas carnés de 20% pourrait diminuer significativement votre impact.',
        impact: '-15%'
      },
      {
        priority: 'medium',
        title: 'Électrifier la flotte postale',
        description: 'Accélérer le passage aux véhicules électriques pour réduire les émissions de transport.',
        impact: '-12%'
      },
      {
        priority: 'low',
        title: 'Optimiser la gestion énergétique',
        description: 'Améliorer l\'efficacité énergétique des bâtiments et augmenter la part d\'énergie renouvelable.',
        impact: '-8%'
      }
    ];
  };

  return (
    <main className="main-container" style={{ backgroundColor: 'white' }}>
      <section className="intro-section" style={{ padding: '2rem 4rem 0rem 4rem', minHeight: 'auto', display: 'block' }}>
        <div className="intro-container">
          <div className="section-header">
            <div className="section-badge" style={{ marginTop: '2rem' }}>📊 Analyse Complète</div>
            <h1 className="section-title">Bilan des Émissions GES</h1>
            <p className="section-subtitle" style={{ textAlign: 'center' }}>
              Découvrez l'analyse détaillée de votre empreinte carbone et les recommandations 
              personnalisées pour réduire vos émissions.<br />
              Ces résultats vous permettront d'identifier 
              les principaux postes d'émissions et de prioriser vos actions de décarbonation.
            </p>
          </div>
        </div>
      </section>
      
      <section className="results-content-section" style={{ backgroundColor: 'white' }}>
        <div className="intro-container">

        {/* Émissions totales */}
        <div className="main-summary-card" style={{ 
          width: '100%', 
          marginTop: '-2rem',
          marginBottom: '2rem',
          background: `linear-gradient(135deg, ${getEmissionColor(totalEmissions)} 0%, ${getEmissionColor(totalEmissions)}dd 100%)`,
          color: 'white',
          padding: '2rem',
          borderRadius: '16px',
          textAlign: 'center'
        }}>
          <h2 style={{ margin: '0 0 1rem 0', fontSize: '1.8rem', color: 'white' }}>Émissions totales</h2>
          <div style={{ fontSize: '3rem', fontWeight: 'bold', margin: '0.5rem 0', display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '0.5rem' }}>
            <span>{totalEmissions.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}</span>
            <span style={{ fontSize: '1.2rem' }}>tCO₂e/an</span>
          </div>
          <div style={{ color: 'white', fontSize: '1rem', marginBottom: '0.5rem', fontStyle: 'italic' }}>
            Équivalent à {Math.round(totalEmissions * 111).toLocaleString('fr-FR')} tours de la Terre en voiture
          </div>
          <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem', marginBottom: '1rem' }}>
            {totalEmissions <= 200 && 'Excellent niveau d\'émissions'}
            {totalEmissions > 200 && totalEmissions <= 400 && 'Niveau d\'émissions modéré'}
            {totalEmissions > 400 && 'Niveau d\'émissions élevé - Actions prioritaires recommandées'}
          </div>
          
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.3)', paddingTop: '1.5rem', background: 'white', color: '#003366', padding: '1.5rem', borderRadius: '16px 16px 16px 16px', marginTop: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#003366' }}>Scope 1:</div>
                <div style={{ fontSize: '1.1rem', marginBottom: '0.5rem', fontStyle: 'italic' }}>Émissions directes</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>85.2 <span style={{ fontSize: '1rem' }}>tCO₂e</span></div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#003366' }}>Scope 2:</div>
                <div style={{ fontSize: '1.1rem', marginBottom: '0.5rem', fontStyle: 'italic' }}>Énergie consommée</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>69.5 <span style={{ fontSize: '1rem' }}>tCO₂e</span></div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#003366' }}>Scope 3:</div>
                <div style={{ fontSize: '1.1rem', marginBottom: '0.5rem', fontStyle: 'italic' }}>Chaîne de valeur</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>256.5 <span style={{ fontSize: '1rem' }}>tCO₂e</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Vues de comparaison */}
        <div className="comparison-views" style={{ 
          background: 'white', 
          padding: '2rem', 
          borderRadius: '16px', 
          marginTop: '1rem',
          border: '1px solid #e0e0e0'
        }}>
          <div className="view-selector">
            <h3 style={{ 
              margin: '0 0 1.5rem 0', 
              fontSize: '1.8rem', 
              color: '#003366',
              textAlign: 'center'
            }}>Analyse comparative</h3>
            <div className="view-buttons" style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '1rem',
              marginBottom: '2rem',
              flexWrap: 'wrap'
            }}>
              <button 
                className={`view-btn ${comparisonView === 'collaborateur' ? 'active' : ''}`}
                onClick={() => setComparisonView('collaborateur')}
                style={{
                  padding: '0.7rem 1.2rem',
                  border: comparisonView === 'collaborateur' ? '2px solid #FFD100' : '2px solid #e0e0e0',
                  background: comparisonView === 'collaborateur' ? '#FFD100' : 'white',
                  color: comparisonView === 'collaborateur' ? '#003366' : '#666',
                  borderRadius: '25px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  transition: 'all 0.3s ease'
                }}
              >👥 Par collaborateur</button>
              <button 
                className={`view-btn ${comparisonView === 'entite' ? 'active' : ''}`}
                onClick={() => setComparisonView('entite')}
                style={{
                  padding: '0.7rem 1.2rem',
                  border: comparisonView === 'entite' ? '2px solid #FFD100' : '2px solid #e0e0e0',
                  background: comparisonView === 'entite' ? '#FFD100' : 'white',
                  color: comparisonView === 'entite' ? '#003366' : '#666',
                  borderRadius: '25px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  transition: 'all 0.3s ease'
                }}
              >🏢 Par entité</button>
              <button 
                className={`view-btn ${comparisonView === 'groupe' ? 'active' : ''}`}
                onClick={() => setComparisonView('groupe')}
                style={{
                  padding: '0.7rem 1.2rem',
                  border: comparisonView === 'groupe' ? '2px solid #FFD100' : '2px solid #e0e0e0',
                  background: comparisonView === 'groupe' ? '#FFD100' : 'white',
                  color: comparisonView === 'groupe' ? '#003366' : '#666',
                  borderRadius: '25px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  transition: 'all 0.3s ease'
                }}
              >📊 Vs. groupe</button>
              <button 
                className={`view-btn ${comparisonView === 'objectifs' ? 'active' : ''}`}
                onClick={() => setComparisonView('objectifs')}
                style={{
                  padding: '0.7rem 1.2rem',
                  border: comparisonView === 'objectifs' ? '2px solid #FFD100' : '2px solid #e0e0e0',
                  background: comparisonView === 'objectifs' ? '#FFD100' : 'white',
                  color: comparisonView === 'objectifs' ? '#003366' : '#666',
                  borderRadius: '25px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  transition: 'all 0.3s ease'
                }}
              >🎯 Vs. objectifs</button>
            </div>
          </div>
          
          <div className="comparison-charts">
            {/* Graphique en barres pour comparaisons */}
            <div className="data-container" style={{ textAlign: 'center' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.3rem', color: '#003366' }}>
                {getComparisonData().title}
              </h4>
              <div style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1rem' }}>
                Période: 2024 • Unité: {getComparisonData().unit}
              </div>
              <div style={{ 
                fontSize: '0.9rem', 
                fontWeight: '600',
                color: getComparisonData().delta > 0 ? '#dc3545' : '#28a745',
                marginBottom: '2rem'
              }}>
                {getComparisonData().delta > 0 ? '+' : ''}{getComparisonData().delta.toFixed(1)}% vs moyenne groupe
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', maxWidth: '900px', margin: '0 auto' }}>
                {getComparisonData().data.map((item, index) => (
                  <div key={index} style={{ 
                    background: 'white', 
                    border: '1px solid #e0e0e0',
                    borderRadius: '12px', 
                    padding: '1.5rem',
                    textAlign: 'center',
                    minHeight: '120px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                  }}>
                    <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '0.8rem', minHeight: '2.4rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {item.label}
                    </div>
                    <div style={{ fontSize: '1.6rem', fontWeight: 'bold', color: '#003366', marginBottom: '0.3rem' }}>
                      {item.value.toLocaleString('fr-FR')}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#888' }}>
                      {item.unit}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section Graphiques dynamiques */}
        <div className="charts-section" style={{ marginBottom: '3rem' }}>
          <h2 style={{ 
            margin: '0 0 2rem 0', 
            fontSize: '1.8rem', 
            color: '#003366',
            textAlign: 'center'
          }}>Analyses Graphiques</h2>
          
          {/* Diagramme circulaire */}
          <div className="pie-chart-section" style={{ 
            background: 'white', 
            padding: '2rem', 
            borderRadius: '16px', 
            marginBottom: '2rem',
            border: '1px solid #e0e0e0'
          }}>
            <h3 style={{ 
              textAlign: 'center', 
              fontSize: '1.4rem', 
              color: '#003366', 
              marginBottom: '1.5rem' 
            }}>
              Répartition des émissions par catégorie
            </h3>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '3rem',
              flexWrap: 'wrap'
            }}>
              <div style={{ position: 'relative', minWidth: '350px', minHeight: '350px' }}>
                <svg width="350" height="350" viewBox="0 0 350 350">
                  {[
                    { name: 'Restauration', value: 163.00, percentage: 37.2, color: '#dc3545', startAngle: 0 },
                    { name: 'Flotte postale', value: 85.23, percentage: 19.4, color: '#e74c3c', startAngle: 37.2 },
                    { name: 'Énergie', value: 70.42, percentage: 16.1, color: '#f39c12', startAngle: 56.6 },
                    { name: 'Achats', value: 40.90, percentage: 9.3, color: '#ffc107', startAngle: 72.7 },
                    { name: 'Déchets', value: 21.36, percentage: 4.9, color: '#fd7e14', startAngle: 82.0 },
                    { name: 'Dépl. pro.', value: 15.69, percentage: 3.6, color: '#28a745', startAngle: 86.9 },
                    { name: 'Transport ST', value: 12.40, percentage: 2.8, color: '#20c997', startAngle: 90.5 },
                    { name: 'Transport DT', value: 2.38, percentage: 0.5, color: '#17a2b8', startAngle: 93.3 }
                  ].map((segment, index) => {
                    const angle = segment.percentage * 3.6; // Convert percentage to degrees
                    const startAngle = segment.startAngle * 3.6 - 90; // Start from top and convert previous percentages
                    const endAngle = startAngle + angle;
                    const largeArcFlag = angle > 180 ? 1 : 0;
                    
                    const startX = 175 + 120 * Math.cos((startAngle * Math.PI) / 180);
                    const startY = 175 + 120 * Math.sin((startAngle * Math.PI) / 180);
                    const endX = 175 + 120 * Math.cos((endAngle * Math.PI) / 180);
                    const endY = 175 + 120 * Math.sin((endAngle * Math.PI) / 180);
                    
                    const pathData = [
                      `M 175 175`,
                      `L ${startX} ${startY}`,
                      `A 120 120 0 ${largeArcFlag} 1 ${endX} ${endY}`,
                      `Z`
                    ].join(' ');
                    
                    // Label position
                    const midAngle = startAngle + angle / 2;
                    const labelRadius = 80;
                    const labelX = 175 + labelRadius * Math.cos((midAngle * Math.PI) / 180);
                    const labelY = 175 + labelRadius * Math.sin((midAngle * Math.PI) / 180);
                    
                    return (
                      <g key={index}>
                        <path
                          d={pathData}
                          fill={segment.color}
                          stroke="white"
                          strokeWidth="2"
                          style={{ cursor: 'pointer', transition: 'opacity 0.3s ease' }}
                          onClick={() => alert(`${segment.name}: ${segment.value} tCO₂ (${segment.percentage}%)`)}
                          onMouseEnter={(e) => (e.target as SVGPathElement).style.opacity = '0.8'}
                          onMouseLeave={(e) => (e.target as SVGPathElement).style.opacity = '1'}
                        />
                        {segment.percentage > 3 && (
                          <text
                            x={labelX}
                            y={labelY}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fill="white"
                            fontSize="11"
                            fontWeight="bold"
                            style={{ pointerEvents: 'none' }}
                          >
                            <tspan x={labelX} dy="-5">{segment.name}</tspan>
                            <tspan x={labelX} dy="12">{segment.percentage}%</tspan>
                          </text>
                        )}
                      </g>
                    );
                  })}
                </svg>
                
                <div style={{ 
                  position: 'absolute', 
                  top: '50%', 
                  left: '50%', 
                  transform: 'translate(-50%, -50%)',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#003366' }}>
                    {totalEmissions.toFixed(0)}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#666' }}>
                    tCO₂e/an
                  </div>
                </div>
              </div>
              
              <div style={{ flex: 1, minWidth: '300px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem' }}>
                    <div style={{ width: '16px', height: '16px', backgroundColor: '#dc3545', borderRadius: '50%' }}></div>
                    <span style={{ fontSize: '0.9rem', color: '#333' }}>Restauration (37.2%)</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem' }}>
                    <div style={{ width: '16px', height: '16px', backgroundColor: '#e74c3c', borderRadius: '50%' }}></div>
                    <span style={{ fontSize: '0.9rem', color: '#333' }}>Flotte postale (19.4%)</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem' }}>
                    <div style={{ width: '16px', height: '16px', backgroundColor: '#f39c12', borderRadius: '50%' }}></div>
                    <span style={{ fontSize: '0.9rem', color: '#333' }}>Énergie (16.1%)</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem' }}>
                    <div style={{ width: '16px', height: '16px', backgroundColor: '#ffc107', borderRadius: '50%' }}></div>
                    <span style={{ fontSize: '0.9rem', color: '#333' }}>Achats (9.3%)</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem' }}>
                    <div style={{ width: '16px', height: '16px', backgroundColor: '#fd7e14', borderRadius: '50%' }}></div>
                    <span style={{ fontSize: '0.9rem', color: '#333' }}>Déchets (4.9%)</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem' }}>
                    <div style={{ width: '16px', height: '16px', backgroundColor: '#28a745', borderRadius: '50%' }}></div>
                    <span style={{ fontSize: '0.9rem', color: '#333' }}>Dép. pro. (3.6%)</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem' }}>
                    <div style={{ width: '16px', height: '16px', backgroundColor: '#20c997', borderRadius: '50%' }}></div>
                    <span style={{ fontSize: '0.9rem', color: '#333' }}>Transport ST (2.8%)</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem' }}>
                    <div style={{ width: '16px', height: '16px', backgroundColor: '#17a2b8', borderRadius: '50%' }}></div>
                    <span style={{ fontSize: '0.9rem', color: '#333' }}>Transport DT (0.5%)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Histogramme horizontal */}
          <div className="bar-chart-section" style={{ 
            background: 'white', 
            padding: '2rem', 
            borderRadius: '16px', 
            marginBottom: '2rem',
            border: '1px solid #e0e0e0'
          }}>
            <h3 style={{ 
              textAlign: 'center', 
              fontSize: '1.4rem', 
              color: '#003366', 
              marginBottom: '1.5rem' 
            }}>
              Émissions par catégorie
            </h3>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              {[
                { name: 'Restauration', value: 163.00, percentage: 37.2, color: '#dc3545' },
                { name: 'Flotte postale', value: 85.23, percentage: 19.4, color: '#e74c3c' },
                { name: 'Énergie', value: 70.42, percentage: 16.1, color: '#f39c12' },
                { name: 'Achats', value: 40.90, percentage: 9.3, color: '#ffc107' },
                { name: 'Déchets', value: 21.36, percentage: 4.9, color: '#fd7e14' },
                { name: 'Déplacements pro.', value: 15.69, percentage: 3.6, color: '#28a745' },
                { name: 'Transport sous-traité', value: 12.40, percentage: 2.8, color: '#20c997' },
                { name: 'Transport D-T', value: 2.38, percentage: 0.5, color: '#17a2b8' }
              ].map((item, index) => (
                <div key={index} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  marginBottom: '1rem',
                  gap: '1rem'
                }}>
                  <div style={{ 
                    minWidth: '140px', 
                    fontSize: '0.9rem', 
                    fontWeight: '600', 
                    color: '#333',
                    textAlign: 'right'
                  }}>
                    {item.name}
                  </div>
                  <div style={{ 
                    flex: 1, 
                    height: '30px', 
                    backgroundColor: '#f5f5f5', 
                    borderRadius: '15px',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    <div style={{ 
                      width: `${item.percentage}%`, 
                      height: '100%', 
                      backgroundColor: item.color,
                      borderRadius: '15px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      paddingRight: '10px',
                      color: 'white',
                      fontSize: '0.8rem',
                      fontWeight: '600',
                      transition: 'width 1s ease-in-out'
                    }}>
                      {item.percentage > 10 ? `${item.value} tCO₂` : ''}
                    </div>
                  </div>
                  <div style={{ 
                    minWidth: '80px', 
                    fontSize: '0.9rem', 
                    fontWeight: '600', 
                    color: '#666',
                    textAlign: 'left'
                  }}>
                    {item.value} tCO₂
                  </div>
                  <div style={{ 
                    minWidth: '50px', 
                    fontSize: '0.8rem', 
                    color: '#888',
                    textAlign: 'left'
                  }}>
                    ({item.percentage}%)
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Graphique radar des scopes */}
          <div className="radar-chart-section" style={{ 
            background: 'white', 
            padding: '2rem', 
            borderRadius: '16px', 
            marginBottom: '2rem',
            border: '1px solid #e0e0e0'
          }}>
            <h3 style={{ 
              textAlign: 'center', 
              fontSize: '1.4rem', 
              color: '#003366', 
              marginBottom: '1.5rem' 
            }}>
              Analyse par Scope GHG Protocol
            </h3>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '3rem',
              flexWrap: 'wrap'
            }}>
              <div style={{ position: 'relative', width: '400px', height: '400px' }}>
                <svg width="400" height="400" viewBox="0 0 400 400">
                  {/* Grille radar */}
                  <g stroke="#e0e0e0" strokeWidth="1" fill="none">
                    <polygon points="200,70 290,160 290,260 200,350 110,260 110,160" opacity="0.3"/>
                    <polygon points="200,100 260,160 260,260 200,320 140,260 140,160" opacity="0.3"/>
                    <polygon points="200,130 230,160 230,260 200,290 170,260 170,160" opacity="0.3"/>
                  </g>
                  
                  {/* Axes */}
                  <g stroke="#ccc" strokeWidth="1">
                    <line x1="200" y1="200" x2="200" y2="70"/>
                    <line x1="200" y1="200" x2="290" y2="160"/>
                    <line x1="200" y1="200" x2="110" y2="160"/>
                  </g>
                  
                  {/* Données scopes */}
                  <polygon 
                    points="200,150 240,175 160,175" 
                    fill="rgba(0, 51, 102, 0.3)" 
                    stroke="#003366" 
                    strokeWidth="2"
                  />
                  
                  {/* Points */}
                  <circle cx="200" cy="150" r="6" fill="#dc3545"/>
                  <circle cx="240" cy="175" r="6" fill="#ffc107"/>
                  <circle cx="160" cy="175" r="6" fill="#28a745"/>
                </svg>
                
                {/* Labels */}
                <div style={{ position: 'absolute', top: '40px', left: '50%', transform: 'translateX(-50%)', 
                  fontSize: '0.9rem', fontWeight: '600', color: '#dc3545' }}>
                  Scope 1<br/><span style={{ fontSize: '0.8rem', color: '#666' }}>85.2 tCO₂</span>
                </div>
                <div style={{ position: 'absolute', top: '140px', right: '20px', 
                  fontSize: '0.9rem', fontWeight: '600', color: '#ffc107' }}>
                  Scope 2<br/><span style={{ fontSize: '0.8rem', color: '#666' }}>69.5 tCO₂</span>
                </div>
                <div style={{ position: 'absolute', top: '140px', left: '20px', 
                  fontSize: '0.9rem', fontWeight: '600', color: '#28a745' }}>
                  Scope 3<br/><span style={{ fontSize: '0.8rem', color: '#666' }}>256.5 tCO₂</span>
                </div>
              </div>
              
              <div style={{ flex: 1, minWidth: '300px' }}>
                <div style={{ marginBottom: '1.5rem' }}>
                  <h4 style={{ color: '#003366', marginBottom: '1rem' }}>Interprétation des Scopes</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ 
                      padding: '1rem', 
                      backgroundColor: 'rgba(220, 53, 69, 0.1)', 
                      borderLeft: '4px solid #dc3545',
                      borderRadius: '8px'
                    }}>
                      <div style={{ fontWeight: '600', color: '#dc3545', marginBottom: '0.5rem' }}>
                        Scope 1 - Émissions directes
                      </div>
                      <div style={{ fontSize: '0.9rem', color: '#666' }}>
                        85.2 tCO₂ • Combustion sur site, flotte propre
                      </div>
                    </div>
                    
                    <div style={{ 
                      padding: '1rem', 
                      backgroundColor: 'rgba(255, 193, 7, 0.1)', 
                      borderLeft: '4px solid #ffc107',
                      borderRadius: '8px'
                    }}>
                      <div style={{ fontWeight: '600', color: '#ffc107', marginBottom: '0.5rem' }}>
                        Scope 2 - Énergie achetée
                      </div>
                      <div style={{ fontSize: '0.9rem', color: '#666' }}>
                        69.5 tCO₂ • Électricité, chaleur, vapeur
                      </div>
                    </div>
                    
                    <div style={{ 
                      padding: '1rem', 
                      backgroundColor: 'rgba(40, 167, 69, 0.1)', 
                      borderLeft: '4px solid #28a745',
                      borderRadius: '8px'
                    }}>
                      <div style={{ fontWeight: '600', color: '#28a745', marginBottom: '0.5rem' }}>
                        Scope 3 - Autres émissions
                      </div>
                      <div style={{ fontSize: '0.9rem', color: '#666' }}>
                        256.5 tCO₂ • Chaîne de valeur, déplacements
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Répartition par catégorie */}
        <div className="categories-breakdown">
          <h2 style={{ 
            margin: '0 0 1.5rem 0', 
            fontSize: '1.8rem', 
            color: '#003366',
            textAlign: 'center'
          }}>Répartition par catégorie</h2>
          <div style={{
            fontSize: '0.7rem',
            color: '#6c757d',
            textAlign: 'center',
            marginBottom: '0.8rem',
            fontStyle: 'italic'
          }}>
            Classification Pareto : <span style={{background: '#dc3545', color: 'white', padding: '1px 4px', borderRadius: '2px', fontSize: '0.65rem', marginRight: '6px'}}>Rouge</span>80%
            <span style={{background: '#ffc107', color: 'white', padding: '1px 4px', borderRadius: '2px', fontSize: '0.65rem', margin: '0 6px'}}>Orange</span>15%
            <span style={{background: '#28a745', color: 'white', padding: '1px 4px', borderRadius: '2px', fontSize: '0.65rem', marginLeft: '6px'}}>Vert</span>5%
          </div>
          <div className="categories-detailed">
            
            {/* Restauration */}
            <div className="category-main">
              <div className="category-header">
                <div className="category-title" style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '1.2rem', color: '#003366', textAlign: 'left', margin: 0, fontWeight: 'bold' }}>Restauration = 163.00 t CO₂</h3>
                </div>
                <div style={{ 
                  background: '#dc3545', 
                  color: 'white', 
                  padding: '0.3rem 0.8rem',
                  borderRadius: '15px',
                  fontSize: '1rem',
                  fontWeight: '700',
                  minWidth: '60px',
                  textAlign: 'center'
                }}>37.2%</div>
              </div>
              <div className="subcategories">
                <div className="subcategory">
                  <span className="subcategory-name">Repas Viande</span>
                  <span className="subcategory-value">110.000 t CO₂</span>
                  <div className="subcategory-bar">
                    <div className="subcategory-fill" style={{ width: '67.5%' }}></div>
                  </div>
                </div>
                <div className="subcategory">
                  <span className="subcategory-name">Repas Poisson</span>
                  <span className="subcategory-value">38.000 t CO₂</span>
                  <div className="subcategory-bar">
                    <div className="subcategory-fill" style={{ width: '23.3%' }}></div>
                  </div>
                </div>
                <div className="subcategory">
                  <span className="subcategory-name">Repas Végétarien</span>
                  <span className="subcategory-value">15.000 t CO₂</span>
                  <div className="subcategory-bar">
                    <div className="subcategory-fill" style={{ width: '9.2%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Flotte postale */}
            <div className="category-main">
              <div className="category-header">
                <div className="category-title" style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '1.2rem', color: '#003366', textAlign: 'left', margin: 0, fontWeight: 'bold' }}>Flotte postale = 85.23 t CO₂</h3>
                </div>
                <div style={{ 
                  background: '#dc3545', 
                  color: 'white', 
                  padding: '0.3rem 0.8rem',
                  borderRadius: '15px',
                  fontSize: '1rem',
                  fontWeight: '700',
                  minWidth: '60px',
                  textAlign: 'center'
                }}>19.4%</div>
              </div>
              <div className="subcategories">
                <div className="subcategory">
                  <span className="subcategory-name">Véhicules Essence</span>
                  <span className="subcategory-value">48.462 t CO₂</span>
                  <div className="subcategory-bar">
                    <div className="subcategory-fill" style={{ width: '56.8%' }}></div>
                  </div>
                </div>
                <div className="subcategory">
                  <span className="subcategory-name">Véhicules Diesel</span>
                  <span className="subcategory-value">27.692 t CO₂</span>
                  <div className="subcategory-bar">
                    <div className="subcategory-fill" style={{ width: '32.5%' }}></div>
                  </div>
                </div>
                <div className="subcategory">
                  <span className="subcategory-name">Motos Thermiques</span>
                  <span className="subcategory-value">7.154 t CO₂</span>
                  <div className="subcategory-bar">
                    <div className="subcategory-fill" style={{ width: '8.4%' }}></div>
                  </div>
                </div>
                <div className="subcategory">
                  <span className="subcategory-name">Véhicules Électriques</span>
                  <span className="subcategory-value">1.923 t CO₂</span>
                  <div className="subcategory-bar">
                    <div className="subcategory-fill" style={{ width: '2.3%', backgroundColor: '#28a745' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Énergie */}
            <div className="category-main">
              <div className="category-header">
                <div className="category-title" style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '1.2rem', color: '#003366', textAlign: 'left', margin: 0, fontWeight: 'bold' }}>Énergie = 70.42 t CO₂</h3>
                </div>
                <div style={{ 
                  background: '#dc3545', 
                  color: 'white', 
                  padding: '0.3rem 0.8rem',
                  borderRadius: '15px',
                  fontSize: '1rem',
                  fontWeight: '700',
                  minWidth: '60px',
                  textAlign: 'center'
                }}>16.1%</div>
              </div>
              <div className="subcategories">
                <div className="subcategory">
                  <span className="subcategory-name">Gaz Naturel</span>
                  <span className="subcategory-value">45.400 t CO₂</span>
                  <div className="subcategory-bar">
                    <div className="subcategory-fill" style={{ width: '64.5%' }}></div>
                  </div>
                </div>
                <div className="subcategory">
                  <span className="subcategory-name">Électricité Standard</span>
                  <span className="subcategory-value">23.940 t CO₂</span>
                  <div className="subcategory-bar">
                    <div className="subcategory-fill" style={{ width: '34.0%' }}></div>
                  </div>
                </div>
                <div className="subcategory">
                  <span className="subcategory-name">Électricité Renouvelable</span>
                  <span className="subcategory-value">1.080 t CO₂</span>
                  <div className="subcategory-bar">
                    <div className="subcategory-fill" style={{ width: '1.5%', backgroundColor: '#28a745' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Achats */}
            <div className="category-main">
              <div className="category-header">
                <div className="category-title" style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '1.2rem', color: '#003366', textAlign: 'left', margin: 0, fontWeight: 'bold' }}>Achats = 40.90 t CO₂</h3>
                </div>
                <div style={{ 
                  background: '#ffc107', 
                  color: 'white', 
                  padding: '0.3rem 0.8rem',
                  borderRadius: '15px',
                  fontSize: '1rem',
                  fontWeight: '700',
                  minWidth: '60px',
                  textAlign: 'center'
                }}>9.3%</div>
              </div>
              <div className="subcategories">
                <div className="subcategory">
                  <span className="subcategory-name">Ordinateurs</span>
                  <span className="subcategory-value">22.500 t CO₂</span>
                  <div className="subcategory-bar">
                    <div className="subcategory-fill" style={{ width: '55.0%' }}></div>
                  </div>
                </div>
                <div className="subcategory">
                  <span className="subcategory-name">Papier</span>
                  <span className="subcategory-value">18.400 t CO₂</span>
                  <div className="subcategory-bar">
                    <div className="subcategory-fill" style={{ width: '45.0%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Déchets */}
            <div className="category-main">
              <div className="category-header">
                <div className="category-title" style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '1.2rem', color: '#003366', textAlign: 'left', margin: 0, fontWeight: 'bold' }}>Déchets = 21.36 t CO₂</h3>
                </div>
                <div style={{ 
                  background: '#ffc107', 
                  color: 'white', 
                  padding: '0.3rem 0.8rem',
                  borderRadius: '15px',
                  fontSize: '1rem',
                  fontWeight: '700',
                  minWidth: '60px',
                  textAlign: 'center'
                }}>4.9%</div>
              </div>
              <div className="subcategories">
                <div className="subcategory">
                  <span className="subcategory-name">Déchets Non Recyclables</span>
                  <span className="subcategory-value">19.680 t CO₂</span>
                  <div className="subcategory-bar">
                    <div className="subcategory-fill" style={{ width: '92.1%' }}></div>
                  </div>
                </div>
                <div className="subcategory">
                  <span className="subcategory-name">Déchets Recyclables</span>
                  <span className="subcategory-value">1.680 t CO₂</span>
                  <div className="subcategory-bar">
                    <div className="subcategory-fill" style={{ width: '7.9%', backgroundColor: '#28a745' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Déplacements professionnels */}
            <div className="category-main">
              <div className="category-header">
                <div className="category-title" style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '1.2rem', color: '#003366', textAlign: 'left', margin: 0, fontWeight: 'bold' }}>Déplacements professionnels = 15.69 t CO₂</h3>
                </div>
                <div style={{ 
                  background: '#28a745', 
                  color: 'white', 
                  padding: '0.3rem 0.8rem',
                  borderRadius: '15px',
                  fontSize: '1rem',
                  fontWeight: '700',
                  minWidth: '60px',
                  textAlign: 'center'
                }}>3.6%</div>
              </div>
              <div className="subcategories">
                <div className="subcategory">
                  <span className="subcategory-name">Vols Domestiques</span>
                  <span className="subcategory-value">11.500 t CO₂</span>
                  <div className="subcategory-bar">
                    <div className="subcategory-fill" style={{ width: '73.3%' }}></div>
                  </div>
                </div>
                <div className="subcategory">
                  <span className="subcategory-name">Motos Pro</span>
                  <span className="subcategory-value">2.790 t CO₂</span>
                  <div className="subcategory-bar">
                    <div className="subcategory-fill" style={{ width: '17.8%' }}></div>
                  </div>
                </div>
                <div className="subcategory">
                  <span className="subcategory-name">Train</span>
                  <span className="subcategory-value">1.400 t CO₂</span>
                  <div className="subcategory-bar">
                    <div className="subcategory-fill" style={{ width: '8.9%', backgroundColor: '#28a745' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Transport sous-traité */}
            <div className="category-main">
              <div className="category-header">
                <div className="category-title" style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '1.2rem', color: '#003366', textAlign: 'left', margin: 0, fontWeight: 'bold' }}>Transport sous-traité = 12.40 t CO₂</h3>
                </div>
                <div style={{ 
                  background: '#28a745', 
                  color: 'white', 
                  padding: '0.3rem 0.8rem',
                  borderRadius: '15px',
                  fontSize: '1rem',
                  fontWeight: '700',
                  minWidth: '60px',
                  textAlign: 'center'
                }}>2.8%</div>
              </div>
              <div className="subcategories">
                <div className="subcategory">
                  <span className="subcategory-name">Tonnes Km</span>
                  <span className="subcategory-value">12.400 t CO₂</span>
                  <div className="subcategory-bar">
                    <div className="subcategory-fill" style={{ width: '100%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Transport domicile-travail */}
            <div className="category-main">
              <div className="category-header">
                <div className="category-title" style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '1.2rem', color: '#003366', textAlign: 'left', margin: 0, fontWeight: 'bold' }}>Transport domicile-travail = 2.38 t CO₂</h3>
                </div>
                <div style={{ 
                  background: '#28a745', 
                  color: 'white', 
                  padding: '0.3rem 0.8rem',
                  borderRadius: '15px',
                  fontSize: '1rem',
                  fontWeight: '700',
                  minWidth: '60px',
                  textAlign: 'center'
                }}>0.5%</div>
              </div>
              <div className="subcategories">
                <div className="subcategory">
                  <span className="subcategory-name">Voiture Essence</span>
                  <span className="subcategory-value">1.332 t CO₂</span>
                  <div className="subcategory-bar">
                    <div className="subcategory-fill" style={{ width: '56.0%' }}></div>
                  </div>
                </div>
                <div className="subcategory">
                  <span className="subcategory-name">Transport Commun</span>
                  <span className="subcategory-value">0.948 t CO₂</span>
                  <div className="subcategory-bar">
                    <div className="subcategory-fill" style={{ width: '39.8%', backgroundColor: '#28a745' }}></div>
                  </div>
                </div>
                <div className="subcategory">
                  <span className="subcategory-name">Moto Thermique</span>
                  <span className="subcategory-value">0.103 t CO₂</span>
                  <div className="subcategory-bar">
                    <div className="subcategory-fill" style={{ width: '4.3%' }}></div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Recommandations */}
        <div className="recommendations-section">
          <h2 style={{ 
            margin: '0 0 1.5rem 0', 
            fontSize: '1.8rem', 
            color: '#003366',
            textAlign: 'center'
          }}>Recommandations prioritaires</h2>
          <div className="recommendations-grid">
            {getRecommendations().map((rec, index) => (
              <div key={index} className={`recommendation-card priority-${rec.priority}`}>
                <div className="recommendation-header">
                  <span className="recommendation-priority">
                    {rec.priority === 'high' ? 'Priorité haute' : 
                     rec.priority === 'medium' ? 'Priorité moyenne' : 'Priorité basse'}
                  </span>
                  <span className="recommendation-impact">{rec.impact}</span>
                </div>
                <h3 className="recommendation-title">{rec.title}</h3>
                <p className="recommendation-description">{rec.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Gestionnaire de Scénarios */}
        <div className="scenarios-section">
          <h2 style={{ 
            margin: '0 0 1.5rem 0', 
            fontSize: '1.8rem', 
            color: '#003366',
            textAlign: 'center'
          }}>Gestionnaire de Scénarios</h2>
          <p className="section-subtitle" style={{ textAlign: 'center', marginBottom: '2rem' }}>
            Créez, sauvegardez et comparez différents scénarios d'émissions pour analyser l'impact de vos actions.
          </p>
          <ScenarioManager 
            activeScenarios={activeScenarios}
            onScenariosChange={setActiveScenarios}
          />
        </div>

        {/* Comparateur multi-entités */}
        <div className="comparator-section" style={{ marginBottom: '2rem' }}>
          <h2 style={{ 
            margin: '0 0 1.5rem 0', 
            fontSize: '1.8rem', 
            color: '#003366',
            textAlign: 'center'
          }}>Comparateur Multi-Entités</h2>
          <p className="section-subtitle" style={{ textAlign: 'center', marginBottom: '2rem' }}>
            Comparez les performances environnementales de vos différentes entités et identifiez les bonnes pratiques.
          </p>
          <EntityComparator 
            entities={entities}
            onEntitiesChange={setEntities}
          />
        </div>

        {/* Actions permanentes */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '1rem', 
          marginTop: '2rem',
          marginBottom: '2rem'
        }}>
          <button 
            onClick={() => handleExportPDF()}
            style={{
              background: 'linear-gradient(135deg, #003366 0%, #004488 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              padding: '1.2rem 1.5rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(0, 51, 102, 0.2)',
              fontSize: '0.95rem',
              fontWeight: '600',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
              minHeight: '80px',
              justifyContent: 'center'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 51, 102, 0.3)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 51, 102, 0.2)';
            }}
          >
            <span style={{ fontSize: '1rem', fontWeight: 'bold' }}>Exporter PDF</span>
            <span style={{ fontSize: '0.8rem', opacity: '0.9' }}>Rapport complet</span>
          </button>
          
          <button 
            onClick={() => handleExportExcel()}
            style={{
              background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              padding: '1.2rem 1.5rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(40, 167, 69, 0.2)',
              fontSize: '0.95rem',
              fontWeight: '600',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
              minHeight: '80px',
              justifyContent: 'center'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(40, 167, 69, 0.3)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(40, 167, 69, 0.2)';
            }}
          >
            <span style={{ fontSize: '1rem', fontWeight: 'bold' }}>Exporter Excel</span>
            <span style={{ fontSize: '0.8rem', opacity: '0.9' }}>Données détaillées</span>
          </button>
          
          <button 
            onClick={() => handleShare()}
            style={{
              background: 'linear-gradient(135deg, #FFD100 0%, #FFA500 100%)',
              color: '#003366',
              border: 'none',
              borderRadius: '12px',
              padding: '1.2rem 1.5rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(255, 209, 0, 0.2)',
              fontSize: '0.95rem',
              fontWeight: '600',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
              minHeight: '80px',
              justifyContent: 'center'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 209, 0, 0.3)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(255, 209, 0, 0.2)';
            }}
          >
            <span style={{ fontSize: '1rem', fontWeight: 'bold' }}>Partager</span>
            <span style={{ fontSize: '0.8rem', opacity: '0.9' }}>Envoyer par email</span>
          </button>
          
          <button 
            onClick={() => handleSave()}
            style={{
              background: 'linear-gradient(135deg, #6f42c1 0%, #9a5bd8 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              padding: '1.2rem 1.5rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(111, 66, 193, 0.2)',
              fontSize: '0.95rem',
              fontWeight: '600',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
              minHeight: '80px',
              justifyContent: 'center'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(111, 66, 193, 0.3)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(111, 66, 193, 0.2)';
            }}
          >
            <span style={{ fontSize: '1rem', fontWeight: 'bold' }}>Sauvegarder</span>
            <span style={{ fontSize: '0.8rem', opacity: '0.9' }}>Conserver l'analyse</span>
          </button>
        </div>
        </div>
      </section>
    </main>
  );
};

export default Results;