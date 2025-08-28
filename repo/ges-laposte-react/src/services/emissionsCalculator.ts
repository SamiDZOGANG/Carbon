/**
 * Service de calcul des émissions GES
 * Basé sur les facteurs d'émission de l'ADEME (Base Carbone®)
 */

import { EmissionCategory } from '../config/constants';

// Facteurs d'émission en kgCO2e par unité
export const EMISSION_FACTORS = {
  // Énergie - Bâtiments (kgCO2e/kWh ou par unité)
  energy: {
    electricity_france: 0.0571,        // kgCO2e/kWh - Mix électrique France 2023
    electricity_renewable: 0.011,      // kgCO2e/kWh - Électricité renouvelable
    natural_gas: 0.227,                // kgCO2e/kWh PCS
    fuel_oil: 3.25,                    // kgCO2e/litre
    district_heating: 0.109,           // kgCO2e/kWh
    wood_pellets: 0.030,               // kgCO2e/kWh
    wood_logs: 460,                    // kgCO2e/tonne
  },

  // Transport - Carburants (kgCO2e/litre ou par unité)
  fuels: {
    gasoline_e10: 2.28,                // kgCO2e/litre
    gasoline_e85: 1.11,                // kgCO2e/litre
    diesel_b7: 2.51,                   // kgCO2e/litre
    diesel_b30: 2.04,                  // kgCO2e/litre
    lpg: 1.86,                         // kgCO2e/litre
    cng: 2.16,                         // kgCO2e/kg
    hydrogen: 0,                       // kgCO2e/kg (si hydrogène vert)
    electricity_vehicle: 0.0571,       // kgCO2e/kWh
  },

  // Transport - Véhicules (kgCO2e/km)
  vehicles: {
    bike: 0,                           // Vélo classique
    ebike: 0.002,                      // Vélo électrique
    scooter_electric: 0.015,           // Scooter électrique
    car_small_gasoline: 0.104,         // Citadine essence
    car_small_diesel: 0.098,           // Citadine diesel
    car_small_electric: 0.020,         // Citadine électrique
    car_medium_gasoline: 0.139,        // Berline essence
    car_medium_diesel: 0.131,          // Berline diesel
    car_medium_electric: 0.025,        // Berline électrique
    van_diesel: 0.198,                 // Utilitaire léger diesel
    van_electric: 0.040,               // Utilitaire léger électrique
    truck_small: 0.663,                // Camion < 3.5t
    truck_medium: 0.868,               // Camion 3.5-12t
    truck_large: 1.082,                // Camion > 12t
  },

  // Déplacements (kgCO2e/km.passager)
  travel: {
    train_ter: 0.0314,                 // TER
    train_intercites: 0.0115,          // Intercités
    train_tgv: 0.0032,                 // TGV
    metro: 0.0031,                     // Métro
    tramway: 0.0033,                   // Tramway
    bus_city: 0.103,                   // Bus urbain
    bus_coach: 0.0288,                 // Autocar
    plane_domestic: 0.258,             // Avion court-courrier
    plane_medium: 0.187,               // Avion moyen-courrier
    plane_long: 0.152,                 // Avion long-courrier
    ferry: 0.267,                      // Ferry
  },

  // Alimentation (kgCO2e/repas)
  food: {
    meal_meat: 4.08,                   // Repas avec viande rouge
    meal_poultry: 1.58,                // Repas avec volaille
    meal_fish: 1.42,                   // Repas avec poisson
    meal_vegetarian: 0.51,             // Repas végétarien
    meal_vegan: 0.39,                  // Repas végétalien
    coffee: 0.005,                     // Tasse de café
    tea: 0.002,                        // Tasse de thé
    water_bottle: 0.193,               // Bouteille d'eau 1L
  },

  // Achats (kgCO2e/unité ou kg)
  purchases: {
    paper_virgin: 1.84,                // kgCO2e/kg - Papier vierge
    paper_recycled: 0.919,             // kgCO2e/kg - Papier recyclé
    cardboard: 0.688,                  // kgCO2e/kg
    plastic_pet: 2.15,                 // kgCO2e/kg
    plastic_pp: 1.95,                  // kgCO2e/kg
    laptop: 415,                       // kgCO2e/unité
    desktop_computer: 520,             // kgCO2e/unité
    monitor: 245,                      // kgCO2e/unité
    smartphone: 85,                    // kgCO2e/unité
    printer: 155,                      // kgCO2e/unité
    furniture_desk: 47,                // kgCO2e/unité
    furniture_chair: 22,               // kgCO2e/unité
  },

  // Déchets (kgCO2e/tonne)
  waste: {
    mixed_waste: 467,                  // Déchets en mélange - incinération
    organic_composting: 82,            // Déchets organiques - compostage
    organic_methanization: -24,        // Déchets organiques - méthanisation (crédit)
    paper_recycling: 21,               // Papier - recyclage
    cardboard_recycling: 21,           // Carton - recyclage
    plastic_recycling: 1100,           // Plastique - recyclage
    glass_recycling: 21,               // Verre - recyclage
    metal_recycling: 21,               // Métal - recyclage
    hazardous_treatment: 750,         // Déchets dangereux - traitement spécialisé
    electronic_recycling: 21,          // DEEE - recyclage
  },

  // Services (kgCO2e/€)
  services: {
    it_services: 0.080,                // Services informatiques
    consulting: 0.050,                 // Conseil
    cleaning: 0.095,                   // Nettoyage
    maintenance: 0.120,                // Maintenance
    logistics: 0.150,                  // Logistique
  }
};

// Interface pour les résultats de calcul
export interface EmissionResult {
  category: EmissionCategory;
  scope: 1 | 2 | 3;
  emissions: number; // en tCO2e
  details: Record<string, number>;
}

export interface TotalEmissions {
  total: number;
  scope1: number;
  scope2: number;
  scope3: number;
  byCategory: EmissionResult[];
}

/**
 * Calcule les émissions pour les bâtiments
 */
export const calculateBuildingsEmissions = (data: any): EmissionResult => {
  const details: Record<string, number> = {};
  let total = 0;

  // Électricité
  if (data.electricity) {
    const factor = data.renewable_energy 
      ? EMISSION_FACTORS.energy.electricity_renewable 
      : EMISSION_FACTORS.energy.electricity_france;
    const renewableRatio = data.renewable_percentage ? data.renewable_percentage / 100 : 0;
    const effectiveFactor = data.renewable_energy
      ? factor * (1 - renewableRatio) + EMISSION_FACTORS.energy.electricity_renewable * renewableRatio
      : factor;
    
    details.electricity = data.electricity * effectiveFactor / 1000;
    total += details.electricity;
  }

  // Gaz naturel
  if (data.gas) {
    details.gas = data.gas * EMISSION_FACTORS.energy.natural_gas / 1000;
    total += details.gas;
  }

  // Fioul
  if (data.fuel) {
    details.fuel = data.fuel * EMISSION_FACTORS.energy.fuel_oil / 1000;
    total += details.fuel;
  }

  // Réseau de chaleur
  if (data.district_heating) {
    details.district_heating = data.district_heating * EMISSION_FACTORS.energy.district_heating / 1000;
    total += details.district_heating;
  }

  // Bois
  if (data.wood) {
    details.wood = data.wood * EMISSION_FACTORS.energy.wood_logs / 1000;
    total += details.wood;
  }

  return {
    category: 'batiments',
    scope: 2,
    emissions: total,
    details
  };
};

/**
 * Calcule les émissions pour la flotte de véhicules
 */
export const calculateFleetEmissions = (data: any): EmissionResult => {
  const details: Record<string, number> = {};
  let total = 0;

  // Carburants
  if (data.essence) {
    details.gasoline = data.essence * EMISSION_FACTORS.fuels.gasoline_e10 / 1000;
    total += details.gasoline;
  }

  if (data.diesel) {
    details.diesel = data.diesel * EMISSION_FACTORS.fuels.diesel_b7 / 1000;
    total += details.diesel;
  }

  if (data.gnv) {
    details.cng = data.gnv * EMISSION_FACTORS.fuels.cng / 1000;
    total += details.cng;
  }

  if (data.elec_kwh) {
    details.electricity = data.elec_kwh * EMISSION_FACTORS.fuels.electricity_vehicle / 1000;
    total += details.electricity;
  }

  if (data.hydrogene) {
    details.hydrogen = data.hydrogene * EMISSION_FACTORS.fuels.hydrogen / 1000;
    total += details.hydrogen;
  }

  // Estimation basée sur le kilométrage si disponible
  if (data.km_total && !total) {
    // Estimation moyenne pour une flotte mixte
    details.estimated = data.km_total * 0.15 / 1000; // 150g CO2/km en moyenne
    total += details.estimated;
  }

  return {
    category: 'flotte-propre',
    scope: 1,
    emissions: total,
    details
  };
};

/**
 * Calcule les émissions pour les autres catégories
 */
export const calculateCategoryEmissions = (category: EmissionCategory, data: any): EmissionResult => {
  let total = 0;
  const details: Record<string, number> = {};

  switch (category) {
    case 'transport-sous-traite':
      if (data.distance && data.tonnage) {
        // Estimation : 0.1 kgCO2e/t.km pour le transport routier
        total = (data.distance * data.tonnage * 0.1) / 1000;
        details.transport = total;
      }
      break;

    case 'deplacements-domicile':
      if (data.employees && data.avg_distance) {
        // Estimation : 220 jours travaillés, aller-retour, voiture moyenne
        const yearlyDistance = data.employees * data.avg_distance * 2 * 220;
        total = (yearlyDistance * EMISSION_FACTORS.vehicles.car_medium_gasoline) / 1000;
        details.commute = total;
      }
      break;

    case 'deplacements-professionnels':
      if (data.train) {
        details.train = (data.train * EMISSION_FACTORS.travel.train_tgv) / 1000;
        total += details.train;
      }
      if (data.plane) {
        details.plane = (data.plane * EMISSION_FACTORS.travel.plane_domestic) / 1000;
        total += details.plane;
      }
      if (data.car) {
        details.car = (data.car * EMISSION_FACTORS.vehicles.car_medium_gasoline) / 1000;
        total += details.car;
      }
      break;

    case 'frequentation':
      if (data.visitors && data.avg_distance) {
        total = (data.visitors * data.avg_distance * EMISSION_FACTORS.vehicles.car_medium_gasoline) / 1000;
        details.visitors = total;
      }
      break;

    case 'alimentation':
      if (data.meals) {
        const vegRatio = data.vegetarian_percentage ? data.vegetarian_percentage / 100 : 0;
        const meatMeals = data.meals * (1 - vegRatio);
        const vegMeals = data.meals * vegRatio;
        
        details.meat_meals = (meatMeals * EMISSION_FACTORS.food.meal_meat) / 1000;
        details.veg_meals = (vegMeals * EMISSION_FACTORS.food.meal_vegetarian) / 1000;
        total = details.meat_meals + details.veg_meals;
      }
      break;

    case 'achats':
      if (data.paper) {
        details.paper = (data.paper * 1000 * EMISSION_FACTORS.purchases.paper_virgin) / 1000;
        total += details.paper;
      }
      if (data.it_equipment) {
        details.it = (data.it_equipment * EMISSION_FACTORS.purchases.laptop) / 1000;
        total += details.it;
      }
      if (data.supplies) {
        // Estimation basée sur le montant : 0.1 kgCO2e/€
        details.supplies = (data.supplies * 0.1) / 1000;
        total += details.supplies;
      }
      break;

    case 'dechets':
      if (data.recyclable) {
        details.recyclable = (data.recyclable * 1000 * EMISSION_FACTORS.waste.paper_recycling) / 1000;
        total += details.recyclable;
      }
      if (data.non_recyclable) {
        details.non_recyclable = (data.non_recyclable * 1000 * EMISSION_FACTORS.waste.mixed_waste) / 1000;
        total += details.non_recyclable;
      }
      if (data.hazardous) {
        details.hazardous = (data.hazardous * 1000 * EMISSION_FACTORS.waste.hazardous_treatment) / 1000;
        total += details.hazardous;
      }
      break;
  }

  // Déterminer le scope
  const scope = category === 'batiments' ? 2 : 
                 category === 'flotte-propre' ? 1 : 3;

  return {
    category,
    scope: scope as 1 | 2 | 3,
    emissions: total,
    details
  };
};

/**
 * Calcule les émissions totales
 */
export const calculateTotalEmissions = (formData: Record<string, any>): TotalEmissions => {
  const results: EmissionResult[] = [];
  let scope1 = 0;
  let scope2 = 0;
  let scope3 = 0;

  // Calcul pour chaque catégorie
  Object.entries(formData).forEach(([category, data]) => {
    if (!data || Object.keys(data).length === 0) return;

    let result: EmissionResult;

    if (category === 'batiments') {
      result = calculateBuildingsEmissions(data);
    } else if (category === 'flotte-propre') {
      result = calculateFleetEmissions(data);
    } else {
      result = calculateCategoryEmissions(category as EmissionCategory, data);
    }

    if (result.emissions > 0) {
      results.push(result);
      
      switch (result.scope) {
        case 1:
          scope1 += result.emissions;
          break;
        case 2:
          scope2 += result.emissions;
          break;
        case 3:
          scope3 += result.emissions;
          break;
      }
    }
  });

  return {
    total: scope1 + scope2 + scope3,
    scope1,
    scope2,
    scope3,
    byCategory: results
  };
};

/**
 * Génère des recommandations basées sur les résultats
 */
export const generateRecommendations = (emissions: TotalEmissions) => {
  const recommendations = [];
  const total = emissions.total;

  // Recommandations par catégorie
  emissions.byCategory.forEach(result => {
    const percentage = (result.emissions / total) * 100;

    if (result.category === 'batiments' && percentage > 25) {
      recommendations.push({
        priority: 'high',
        category: result.category,
        title: 'Optimiser la performance énergétique des bâtiments',
        description: 'Vos bâtiments représentent ' + percentage.toFixed(0) + '% de vos émissions. Envisagez une rénovation énergétique, l\'installation de panneaux solaires ou le passage à un fournisseur d\'énergie verte.',
        impact: Math.round(result.emissions * 0.3),
        actions: [
          'Audit énergétique',
          'Isolation thermique',
          'LED et détecteurs de présence',
          'Panneaux photovoltaïques'
        ]
      });
    }

    if (result.category === 'flotte-propre' && result.emissions > 10) {
      recommendations.push({
        priority: 'high',
        category: result.category,
        title: 'Électrifier la flotte de véhicules',
        description: 'La transition vers des véhicules électriques ou hydrogène peut réduire jusqu\'à 70% les émissions de votre flotte.',
        impact: Math.round(result.emissions * 0.6),
        actions: [
          'Plan de renouvellement',
          'Bornes de recharge',
          'Formation éco-conduite',
          'Optimisation des tournées'
        ]
      });
    }

    if (result.category === 'deplacements-domicile' && percentage > 15) {
      recommendations.push({
        priority: 'medium',
        category: result.category,
        title: 'Favoriser la mobilité durable',
        description: 'Encouragez les modes de transport alternatifs pour les trajets domicile-travail.',
        impact: Math.round(result.emissions * 0.4),
        actions: [
          'Forfait mobilités durables',
          'Télétravail',
          'Covoiturage',
          'Navettes entreprise'
        ]
      });
    }
  });

  // Recommandations générales
  recommendations.push({
    priority: 'low',
    category: 'general',
    title: 'Sensibiliser et former les équipes',
    description: 'La sensibilisation des collaborateurs peut générer 5 à 10% d\'économies d\'émissions.',
    impact: Math.round(total * 0.05),
    actions: [
      'Formations éco-gestes',
      'Challenges internes',
      'Communication régulière',
      'Ambassadeurs climat'
    ]
  });

  return recommendations.sort((a, b) => {
    const priorityOrder: Record<string, number> = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
};