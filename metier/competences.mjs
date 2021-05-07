//@ts-check

export class Competence {
  intitule = "?";
  base = 0; // 0 = 0%, 1 = 50%
  revelee = false;
  dementielle = false;
  professionnelle = false;
  croixExperience = false;
  xp = 0;
  get valeur() {
      if (this.dementielle) {
          // 100% + 1
          return (+this.valeurCaracteristiqueDirectrice) + 1;
      } else if (this.professionnelle) {
          // 100%, pas de révélation
          return (+this.valeurCaracteristiqueDirectrice) + (+this.xp);
      } else {
          // si pas encore révélée.. investir des points de génération ou pas.
          // palliers 0: 0% / 1: 50% / 2: 75% / 3: 100%
          const pallier = (+this.base) + (+this.pointsDeGeneration);
          if (pallier == 0) {
              return 0;
          } else if (pallier == 1) {
              return Math.floor((+this.valeurCaracteristiqueDirectrice) * .5) + (+this.xp);
          } else if (pallier == 2) {
              return Math.floor((+this.valeurCaracteristiqueDirectrice) * .75) + (+this.xp);
          } else if (pallier == 3) {
              return (+this.valeurCaracteristiqueDirectrice) + (+this.xp);
          } else {
              console.error("pallier inconnu !", pallier);
          }
      }
  }
  valeurCaracteristiqueDirectrice = 0;
  nomCaracteristiqueDirectrice = undefined;
  pointsDeGeneration = 0;
}

export function initNouvelleCompetence() {
  const nouvelleCompetence = new Competence();
  nouvelleCompetence.professionnelle = false;
  nouvelleCompetence.revelee = false;
  nouvelleCompetence.dementielle = false;
  nouvelleCompetence.intitule = "";
  nouvelleCompetence.valeurCaracteristiqueDirectrice = 0;
  nouvelleCompetence.nomCaracteristiqueDirectrice = ""
  nouvelleCompetence.pointsDeGeneration = 0;
  return nouvelleCompetence;
}