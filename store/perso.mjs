//@ts-check
import { ContextePersonnage } from "../metier/fiche-personnage.mjs";
import { Competence } from "../metier/competences.mjs";
import { Douleur } from "../metier/douleurs.mjs";
import { habillerALaSaintFrusquin } from "../metier/saint-frusquin.mjs";
import { tirerUnDe20 } from "../metier/trousse-des.mjs";

/**
 * Découper en sous module le store pour ne pas qu'il devienne trop gros/trop fourre-tout.
 * Ici on met tout ce qui a trait au personnage.
 * 
 * Que du JS ici, pas de dépendance vers du code de framework (Vue/VueX)
 */
export const modulePersonnage = {
  state: function() { 
    return {
      perso: new ContextePersonnage(),
    };
  },
  getters: {
    creationFinie: function(state) {
      const repartitionCaracFinie = state.perso.pointsCaracteristiqueRestant === 0;
      const persoAUneCompetenceProfessionnelle = state.perso.competences.some(_ => _.professionnelle);
      const etatCivilRempli = !!state.perso.nom 
        && !!state.perso.age 
        && !!state.perso.tailleCm 
        && !!state.perso.description 
        && !!state.perso.poids 
        && !!state.perso.motDeDemence 
        && !!state.perso.profession;

      return repartitionCaracFinie 
          && persoAUneCompetenceProfessionnelle 
          && etatCivilRempli;
    },
    totalDouleurs: function(state) {
      return state.perso.douleurs.reduce((total, douleur) => (+total)+(+douleur.valeur), 0);
    },
  },
  mutations: {
    supprimeLigneCompetence: function(state, indexCompetence) {
      state.perso.competences = state.perso.competences.filter((_, index) => index !== indexCompetence);
    },
    ajouteCompetence: function(state, competence) {
      state.perso.competences.push(competence);
    },
    ajouteCompetenceDementielle: function(state, competence) {
      state.perso.competencesDementielles.push(competence);
    },
    supprimeToutesLesCompetencesDementielles: function(state) {
      state.perso.competencesDementielles = [];
    },
    marqueCroixExperience: function(state, nomCompetence) {
      const comp = state.perso.competences.reduce((found, c) => !found && c.intitule === nomCompetence ? c : found, null);
      comp.croixExperience = true;
    },
    supprimeCroixExperience: function(state, nomCompetence) {
      const comp = state.perso.competences.reduce((found, c) => !found && c.intitule === nomCompetence ? c : found, null);
      comp.croixExperience = false;
    },
    incrementeExperienceCompetence: function(state, competence) {
      const comp = state.perso.competences.reduce((found, c) => !found && c.intitule === competence.intitule ? c : found, null);
      comp.xp = comp.xp + 1;
    },
    supprimeToutesLesCroixExperience: function(state) {
      state.perso.competences.forEarch(c => c.croixExperience = false);      
    },
    supprimeLigneDouleur: function(state, indexDouleur) {
      state.perso.douleurs = state.perso.douleurs.filter((_, index) => index !== indexDouleur);
    },
    supprimeToutesLesDouleurs: function(state) {
      state.perso.douleurs = [];
    },
    ajouteLigneDouleur: function(state, nouvelleDouleur) {
      state.perso.douleurs.push(nouvelleDouleur);
    },
    genereEquipementSaintFrusquin: function(state) {
      // on n'est pas censé appeler ça en cours de partie, juste en début de Crise.
      // donc ça efface tout l'équipement.
      state.perso.equipements = habillerALaSaintFrusquin();
    },
    supprimeLigneEquipement: function(state, indexEquipement) {
      state.perso.equipements = state.perso.equipements.filter((_, index) => index !== indexEquipement);
    },
    supprimeToutLEquipement: function(state) {
      state.perso.equipements = [];
    },
    ajouteLigneEquipement: function(state, nouvelEquipement) {
      state.perso.equipements.push(''+nouvelEquipement);
    },
    // ---
    sauvegardePerso: function(state) {
        document.location.hash = btoa(JSON.stringify(state.perso));
    },
    chargePerso: function(state) {
        const test = (document.location.hash) ?
            document.location.hash.substring(1)
            :
            `eyJub20iOiJSb2RyaWd1ZSIsImRlc2NyaXB0aW9uIjoiQ2hldmV1eCBub2lycywgcmVnYXJkIGxvaW50YWluLCBs6WdlciBhY2NlbnQgZXNwYWdub2wiLCJwcm9mZXNzaW9uIjoiUGVpbnRyZSIsImFnZSI6MzIsInRhaWxsZUNtIjoxNzEsIm1vdERlRGVtZW5jZSI6IlNhY3F1ZWJvdXRlISIsInBvaWRzIjo3NSwidm9sb250ZSI6MTIsImludGVsbGVjdCI6OSwic2Vuc2l0aWYiOjE0LCJjaGFyaXNtZSI6MTIsImNvbnN0aXR1dGlvbiI6OSwicGVyY2VwdGlvbiI6MTQsImFnaWxpdGUiOjEwLCJjb21wZXRlbmNlcyI6W3siaW50aXR1bGUiOiJQZWludHVyZSIsImJhc2UiOjAsInJldmVsZWUiOnRydWUsImRlbWVudGllbGxlIjpmYWxzZSwicHJvZmVzc2lvbm5lbGxlIjp0cnVlLCJjcm9peEV4cGVyaWVuY2UiOmZhbHNlLCJ4cCI6MCwidmFsZXVyQ2FyYWN0ZXJpc3RpcXVlRGlyZWN0cmljZSI6MTQsIm5vbUNhcmFjdGVyaXN0aXF1ZURpcmVjdHJpY2UiOiJwZXJjZXB0aW9uIiwicG9pbnRzRGVHZW5lcmF0aW9uIjowfV0sImNvbXBldGVuY2VzRGVtZW50aWVsbGVzIjpbXSwiZG91bGV1cnMiOltdLCJwb2ludHNEZUNyaXNlIjowLCJjaG9jc1BhcmFubyI6MCwiY2hvY3NTY2hpem8iOjAsImNob2NzUHJvZm9uZHMiOjAsImV0YXREZUNob2MiOmZhbHNlLCJkdXJlZUV0YXREZUNob2MiOjAsImZ1dHVyc1BpZWdlc0R1RGVsaXJlRGVQZXJzZWN1dGlvbiI6W10sInRvdGFsQWNjb21wbGlzc2VtZW50IjowLCJlcXVpcGVtZW50cyI6W119`;
        const persoACopier = Object.appendChain(JSON.parse(atob(test)), new ContextePersonnage());
        // on retransforme les objets "simple" issus du JSON en modifiant leur chaîne de prototypage avec les type d'objets attendus
        persoACopier.competences.map(item => Object.appendChain(item, new Competence()));
        persoACopier.competencesDementielles.map(item => Object.appendChain(item, new Competence()));
        persoACopier.douleurs.map(item => Object.appendChain(item, new Douleur()));

        state.perso = persoACopier;
    },
    // ---
    modifieChampsTextePerso: function(state, {champs, valeur}) {
      state.perso[champs] = valeur;
    },
    modifieChampsNombrePerso: function(state, {champs, valeur}) {
      state.perso[champs] = +valeur;
    },
    // ---
    incrementePointsDeCrise: function(state) {
      state.perso.pointsDeCrise = state.perso.pointsDeCrise + 1;
    },
    incrementeChoc: function(state, typeChoc) {
      if (typeChoc === 'parano') {
        state.perso.chocsParano = state.perso.chocsParano + 1;
      } else if (typeChoc === 'schizo') {
        state.perso.chocsSchizo = state.perso.chocsSchizo + 1;
      }
    },
    incrementeChocProfonds: function(state) {
      state.perso.chocsProfonds = state.perso.chocsProfonds + 1;
    },
    passeEnEtatDeChoc: function(state) {
      state.perso.etatDeChoc = true;
    },
    incrementeDureeEtatDeChoc: function(state, valeur = 1) {
      state.perso.dureeEtatDeChoc = state.perso.dureeEtatDeChoc + valeur;
    },
    annuleEtatDeChoc: function(state) {
      state.perso.etatDeChoc = false;
      state.perso.dureeEtatDeChoc = 0;
    },
    ajouteUnFuturPiegesDuDelireDePersecution: function(state, piege) {
      // TODO
      state.perso.futursPiegesDuDelireDePersecution.push(piege);
    },
    supprimeLesFutursPiegesDuDelireDePersecution: function(state) {
      state.perso.futursPiegesDuDelireDePersecution = [];
    },
  },
  actions: {
    // ---
    chargePersonnage: function(context) {
      context.commit('chargePerso');
      context.commit('passerEnMode', 'jeu');
    },
    ajouteCompetence: function(context, competence) {
      if (competence.dementielle) {
        context.commit('ajouteCompetenceDementielle', competence);
      } else {
        // TODO : bug si on ajoute une comp pro entendement, on ne peut pas supprimer Culture Gé
        // TODO : ne pas ajouter une comp si elle existe déjà.
        if (competence.professionnelle && competence.nomCaracteristiqueDirectrice === 'entendement') {
          // si compétence professionnelle est sous Entendement, alors Culture Générale à 100% en bonus
          const cultureGeneraleEnBonus = new Competence();
          cultureGeneraleEnBonus.professionnelle = false;
          cultureGeneraleEnBonus.revelee = true;
          cultureGeneraleEnBonus.dementielle = false;
          cultureGeneraleEnBonus.intitule = "Culture Générale";
          cultureGeneraleEnBonus.valeurCaracteristiqueDirectrice = context.state.perso.entendement;
          cultureGeneraleEnBonus.nomCaracteristiqueDirectrice = "entendement"
          cultureGeneraleEnBonus.pointsDeGeneration = 0;
          cultureGeneraleEnBonus.base = 3; // 100%
          context.commit('ajouteCompetence', cultureGeneraleEnBonus);
        }
        context.commit('ajouteCompetence', competence);          
      }
    },
    // --- CONSEQUENCES DES EFFETS DEMENTIELS SUR LA SANTE MENTALE ---
    appelDementiel: async function(context) {
      await context.dispatch('ajouteUnPointDeCrise', undefined);
    },
    apresAjoutCompetenceDementielle: async function(context) {
      await context.dispatch('ajouteUnPointDeCrise', undefined);
    },
    apresEchecJetAvecEnergieDementielle: async function(context) {
      await context.dispatch('ajouteUnPointDeCrise', undefined);
    },
    apresEchecJetAvecRecommencerAction: async function(context) {
      await context.dispatch('ajouteUnPointDeCrise', undefined);
    },
    apresEchecJetAvecEnergieDementiellePuisRecommencerAction: async function(context) {
      await context.dispatch('ajouteUnPointDeCrise', undefined);
      await context.dispatch('faitUnJetDeCrise', undefined);
    },
    accomplissement: async function(context) {
      await context.dispatch('testeProgressionCompetenceAvecCroixExperience');
      // transforme pt crise en pt d'accomplissement
      const ptAccomplissement = +context.state.perso.pointsDeCrise;
      const nouveauTotalAccomplissement = (+context.state.perso.totalAccomplissement) + ptAccomplissement;
      await context.commit('modifieChampsNombrePerso', {champs: 'totalAccomplissement', valeur: nouveauTotalAccomplissement});

      await context.dispatch('tabulaRasa');
    },
    testeProgressionCompetenceAvecCroixExperience: async function(context) {
      context.state.perso.competences.forEach(competence => {
        if (competence.croixExperience) {
          const d20 = tirerUnDe20();
          if (d20 <= competence.valeur) {
            context.commit('incrementeExperienceCompetence', competence);
          }
        }
      });
    },
    /**
     * Pour quitter la crise sans passer par la mort.
     * La différence c'est qu'on peut s'en sortir au mieux sans choc profonds,
     * au pire avec 2 chocs profonds comme pour la mort...
     */
    prendsLesVapes: async function(context) {
      await context.dispatch('ajouteUnPointDeCrise', undefined);
      // si en état de choc, cela devient un premier choc profonds
      await context.dispatch('transformeEtatDeChocEnChocProfonds');
      await context.dispatch('tabulaRasa');
    },
    /**
     * Pour quitter la crise de la pire façon.
     * Au pire avec 2 chocs profonds au mieux avec 1 choc profonds.
     */
    apresLaMort: async function(context) {
      // si en état de choc, cela devient un premier choc profonds
      await context.dispatch('transformeEtatDeChocEnChocProfonds');
      // et la mort c'est traumatisant, on gagne aussi un choc profonds !
      context.commit('incrementeChocsProfonds');
      // ensuite, on fait table rase de la crise en cours... mais mieux vaut prendre les Vapes !
      await context.dispatch('tabulaRasa');
    },
    tabulaRasa: async function(context) {
      context.commit('annuleEtatDeChoc');
      context.commit('supprimeLesFutursPiegesDuDelireDePersecution');
      context.commit('supprimeToutesLesDouleurs');
      context.commit('supprimeToutLEquipement');
      context.commit('supprimeToutesLesCroixExperience');
      context.commit('supprimeToutesLesCompetencesDementielles');
      context.commit('modifieChampsNombrePerso', {champs: 'pointsDeCrise', valeur: 0});
      context.commit('modifieChampsNombrePerso', {champs: 'chocsParanos', valeur: 0});
      context.commit('modifieChampsNombrePerso', {champs: 'chocsSchizos', valeur: 0});
      if (context.state.perso.chocsProfonds > 0) {
        // simple algo : on met tous les chocs profonds dans la tendance plus faible
        if (context.state.perso.tendance == "Parano") {
          context.commit('modifieChampsNombrePerso', {champs:'chocsSchizos', valeur: +context.state.perso.chocsProfonds});
        } else {
          context.commit('modifieChampsNombrePerso', {champs:'chocsParanos', valeur: +context.state.perso.chocsProfonds});
        }
      }
    },
    // quand un perso passe inconscient, ou juste avant de mourir ou prendre les vapes
    transformeEtatDeChocEnChocProfonds: async function(context) {
      if (context.state.perso.etatDeChoc) {
        context.commit('annuleEtatDeChoc');
        context.commit('incrementeChocsProfonds');
      }
    },
    // --- SANTE MENTALE ---
    ajouteUnPointDeCrise: async function(context, caracteristiqueDirectrice) {
      context.commit('incrementePointsDeCrise');
      context.commit('ajouteLigneJournal', `+1 point de crise`);
      await context.dispatch('faitUnJetDeCrise', caracteristiqueDirectrice);
    },
    faitUnJetDeCrise: async function(context, caracteristiqueDirectrice) {
      const d20 = tirerUnDe20();
      if (d20 <= context.state.perso.pointsDeCrise) {
          // POSITIF
          context.commit('ajouteLigneJournal', `jet de crise: positif`);
          await context.dispatch('ajouteUnPointDeChoc', caracteristiqueDirectrice);
      } else {
          // NEGATIF
          // aucune conséquence.
          context.commit('ajouteLigneJournal', `jet de crise: négatif`);
      }
    },
    ajouteUnPointDeChoc: async function(context, caracteristiqueDirectrice) {
      // tendance si pas de caracteristiqueDirectrice
      if (!caracteristiqueDirectrice) {
          caracteristiqueDirectrice = await context.dispatch('faitUnJetDeTendance'); //TODO vérifier si on peut retourner une valeur sinon appeler un code externe
      }
      // gain de choc parano ou schizo
      if (caracteristiqueDirectrice === 'intellect') {
        context.commit('ajouteLigneJournal', `+1 point de choc parano`);
        context.commit('incrementeChoc', 'parano');
      } else {
        context.commit('ajouteLigneJournal', `+1 point de choc schizo`);
        context.commit('incrementeChoc', 'schizo');
      }
      // jet de choc
      await context.dispatch('faitUnJetDeChoc', caracteristiqueDirectrice);
    },
    /**
     * @returns 'intellect' ou 'sensitif' (Promise)
     */
    faitUnJetDeTendance: async function(context) {
      const tendanceParano = context.state.perso.intellect - (context.state.perso.sensitif - 10);
      if (tirerUnDe20() <= tendanceParano) {
          // oui, tendance Parano / intellect
          context.commit('ajouteLigneJournal', `tendance parano`);
          return 'intellect';
      } else {
          // tendance Schizo / sensitif
          context.commit('ajouteLigneJournal', `tendance schizo`);
          return 'sensitif';
      }
    },
    faitUnJetDeChoc: async function(context, caracteristiqueDirectrice) {
      // tendance si pas de caracteristiqueDirectrice
      if (!caracteristiqueDirectrice) {
          caracteristiqueDirectrice = await context.dispatch('faitUnJetDeTendance');
      }
      const d20 = tirerUnDe20();
      const chocsEnMalus = (caracteristiqueDirectrice === 'intellect')
          ? context.state.perso.chocsParano
          : context.state.perso.chocsSchizo;

      if (d20 <= (context.state.perso.volonte - chocsEnMalus + context.state.perso.niveauAccomplissement)) {
          // tout va bien
          context.commit('ajouteLigneJournal', `jet de choc : résisté`);
      } else {
          // état de choc !
          if (context.state.perso.etatDeChoc) {
              context.commit('ajouteLigneJournal', `jet de choc : raté; mais état de choc pré-existant = +1 choc profond !`);
              context.commit('incrementeChocProfonds');
          } else {
              context.commit('ajouteLigneJournal', `jet de choc : raté; entre en état de choc !`);
              context.commit('passeEnEtatDeChoc', caracteristiqueDirectrice);
              context.commit('incrementeDureeEtatDeChoc', +chocsEnMalus);
              // TODO : délire de persecutition/hallucination
          }
      }
    },
  },
};