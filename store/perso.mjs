//@ts-check
import { ContextePersonnage, Competence, Douleur } from "../metier/fiche-personnage.mjs";
import { habillerALaSaintFrusquin } from "../metier/saint-frusquin.mjs";
import { tirerUnDe20 } from "../metier/trousse-des.mjs";

/**
 * Découper en sous module le store pour ne pas qu'il devienne trop gros/trop fourre-tout.
 * Ici on met tout ce qui a trait au personnage.
 * 
 * Que du JS ici, pas de dépendance vers du code de framework (Vue/VueX)
 */
export const modulePersonnage = {
  state: {
    perso: new ContextePersonnage(),
  },
  getters: {
    creationFinie: function(state) {
      const repartitionCaracFinie = state.perso.pointsCaracteristiqueRestant === 0;
      const persoAUneCompetenceProfessionnelle = state.perso.competences.some(_ => _.professionnelle);
      const etatCivilRempli = state.perso.nom 
        && state.perso.age 
        && state.perso.tailleCm 
        && state.perso.description 
        && state.perso.poids 
        && state.perso.motDeDemence 
        && state.perso.profession;

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
    marqueCroixExperience: function(state, nomCompetence) {
      const comp = state.perso.competences.reduce((found, c) => !found && c.intitule === nomCompetence ? c : found, null);
      comp.croixExperience = true;
    },
    supprimeCroixExperience: function(state, nomCompetence) {
      const comp = state.perso.competences.reduce((found, c) => !found && c.intitule === nomCompetence ? c : found, null);
      comp.croixExperience = false;
    },
    supprimeLigneDouleur: function(state, indexDouleur) {
      state.perso.douleurs = state.perso.douleurs.filter((_, index) => index !== indexDouleur);
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
            `eyJub20iOiJUcmlzdGFuIiwiZGVzY3JpcHRpb24iOiJCcnVuLCB5ZXV4IG1hcnJvbnMsIHJlZ2FyZCB2aWYiLCJwcm9mZXNzaW9uIjoiSGlzdG9yaWVuIiwiYWdlIjoiMjMiLCJ0YWlsbGVDbSI6IjE4MCIsIm1vdERlRGVtZW5jZSI6IkVjb3V2aWxsb24hIiwicG9pZHMiOiI3NSIsInZvbG9udGUiOiIxMCIsImludGVsbGVjdCI6IjEzIiwic2Vuc2l0aWYiOiIxMCIsImNoYXJpc21lIjoiMTMiLCJjb25zdGl0dXRpb24iOiIxMyIsInBlcmNlcHRpb24iOiIxMiIsImFnaWxpdGUiOiI5IiwiY29tcGV0ZW5jZXMiOlt7ImludGl0dWxlIjoiQ3VsdHVyZSBH6W7pcmFsZSIsImJhc2UiOjMsInJldmVsZWUiOnRydWUsImRlbWVudGllbGxlIjpmYWxzZSwicHJvZmVzc2lvbm5lbGxlIjpmYWxzZSwidmFsZXVyQ2FyYWN0ZXJpc3RpcXVlRGlyZWN0cmljZSI6MTEsIm5vbUNhcmFjdGVyaXN0aXF1ZURpcmVjdHJpY2UiOiJlbnRlbmRlbWVudCIsInBvaW50c0RlR2VuZXJhdGlvbiI6MCwiY3JvaXhFeHBlcmllbmNlIjpmYWxzZX0seyJpbnRpdHVsZSI6Ikhpc3RvaXJlIiwiYmFzZSI6MCwicmV2ZWxlZSI6dHJ1ZSwiZGVtZW50aWVsbGUiOmZhbHNlLCJwcm9mZXNzaW9ubmVsbGUiOnRydWUsInZhbGV1ckNhcmFjdGVyaXN0aXF1ZURpcmVjdHJpY2UiOjExLCJub21DYXJhY3RlcmlzdGlxdWVEaXJlY3RyaWNlIjoiZW50ZW5kZW1lbnQiLCJwb2ludHNEZUdlbmVyYXRpb24iOjAsImNyb2l4RXhwZXJpZW5jZSI6ZmFsc2V9LHsiaW50aXR1bGUiOiJFc3F1aXZlIiwiYmFzZSI6IjEiLCJyZXZlbGVlIjp0cnVlLCJkZW1lbnRpZWxsZSI6ZmFsc2UsInByb2Zlc3Npb25uZWxsZSI6ZmFsc2UsInZhbGV1ckNhcmFjdGVyaXN0aXF1ZURpcmVjdHJpY2UiOiI5Iiwibm9tQ2FyYWN0ZXJpc3RpcXVlRGlyZWN0cmljZSI6ImFnaWxpdGUiLCJwb2ludHNEZUdlbmVyYXRpb24iOiIxIiwiY3JvaXhFeHBlcmllbmNlIjpmYWxzZX1dLCJjb21wZXRlbmNlc0RlbWVudGllbGxlcyI6W3siaW50aXR1bGUiOiJQaXN0YWdlIGRlcyBode50cmVzIiwiYmFzZSI6MCwicmV2ZWxlZSI6ZmFsc2UsImRlbWVudGllbGxlIjp0cnVlLCJwcm9mZXNzaW9ubmVsbGUiOmZhbHNlLCJ2YWxldXJDYXJhY3RlcmlzdGlxdWVEaXJlY3RyaWNlIjoiMTIiLCJub21DYXJhY3RlcmlzdGlxdWVEaXJlY3RyaWNlIjoicGVyY2VwdGlvbiIsInBvaW50c0RlR2VuZXJhdGlvbiI6MH1dLCJkb3VsZXVycyI6W10sInBvaW50c0RlQ3Jpc2UiOjAsImNob2NzUGFyYW5vIjowLCJjaG9jc1NjaGl6byI6MCwiY2hvY3NQcm9mb25kcyI6MCwiZXRhdERlQ2hvYyI6ZmFsc2UsInRvdGFsQWNjb21wbGlzc2VtZW50IjowLCJlcXVpcGVtZW50cyI6WyJwYXLpbyBlbiBjdWlyIGRlIGNvdWxldXIga2FraSIsInZlc3RlIGVuIG55bG9uIGRlIGNvdWxldXIgYmVpZ2UiLCJPdXZyZSBode50cmVzIl19`;
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
    // --- EFFETS DEMENTIELS ---
    appelDementiel: async function(context) {
      await context.dispatch('ajouterPointDeCrise', undefined);
    },
    // --- SANTE MENTALE ---
    ajouterPointDeCrise: async function(context, caracteristiqueDirectrice) {
      context.commit('incrementePointsDeCrise');
      context.commit('ajouteLigneJournal', `+1 point de crise`);
      await context.dispatch('faireUnJetDeCrise', caracteristiqueDirectrice);
    },
    faireUnJetDeCrise: async function(context, caracteristiqueDirectrice) {
      const d20 = tirerUnDe20();
      if (d20 <= context.state.perso.pointsDeCrise) {
          // POSITIF
          context.commit('ajouteLigneJournal', `jet de crise: positif`);
          await context.dispatch('ajouterPointDeChoc', caracteristiqueDirectrice);
      } else {
          // NEGATIF
          // aucune conséquence.
          context.commit('ajouteLigneJournal', `jet de crise: négatif`);
      }
    },
    ajouterPointDeChoc: async function(context, caracteristiqueDirectrice) {
      // tendance si pas de caracteristiqueDirectrice
      if (!caracteristiqueDirectrice) {
          caracteristiqueDirectrice = await context.dispatch('faireUnJetDeTendance'); //TODO vérifier si on peut retourner une valeur sinon appeler un code externe
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
      await context.dispatch('faireUnJetDeChoc', caracteristiqueDirectrice);
    },
    /**
     * @returns 'intellect' ou 'sensitif' (Promise)
     */
    faireUnJetDeTendance: async function(context) {
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
    faireUnJetDeChoc: async function(context, caracteristiqueDirectrice) {
      // tendance si pas de caracteristiqueDirectrice
      if (!caracteristiqueDirectrice) {
          caracteristiqueDirectrice = await context.dispatch('faireUnJetDeTendance');
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
              context.commit('passeEnEtatDeChoc');
              // TODO : délire de persecutition/hallucination
          }
      }
    },
  },
};