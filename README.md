# [Hystoire de Fou](https://doppelganger9.github.io/hystoire-de-fou)

Fiche de personnage automatisée, pour créer un personnage et le jouer.

## Hystoire de Fou ?

Je cite [l'article Wikipedia](https://fr.wikipedia.org/wiki/Hystoire_de_fou) :

> Les joueurs y incarnent des personnages contemporains qui sont victimes d'une crise de folie collective. Le but des scénarios est de trouver le moyen de revenir à la réalité.
>
> Lors de ces crises de folie, les personnages se retrouvent habillés de façon incongrue dans un univers plus ou moins différent du nôtre, où l'absurde est roi.
>

Pour en savoir plus sur ce Jeu de Rôle exceptionnel sortie début 1998 :

- https://www.nestiveqnen.com/hystoire-de-fou/ : achetez le livre en vente par correspondance chez l'éditeur, toujours en vie !
- http://www.legrog.org/jeux/hystoire-de-fou
- http://www.reves-d-ailleurs.eu/viewforum.php?f=67 : pour avoir accès aux PDFs une fois inscrits

## Objectifs
### Faire des simulations

Pour comprendre les probabilités sur le système de santé mentale.

Celui-ci peut devenir très lourd car il force le joueur à lancer beaucoup de dés.

L'idée est donc de créer des centaines de milliers de personnages et de leur faire vivre des crises simulées et de collecter des statistiques.

Ceci permet en retour de dresser une table sans dés pour simplifier en supprimant les jets de Crise et jets de Chocs.

En effet, les jets de Crise ne dépendent que du total de points de Crise et d'un jet de dés à 20 faces, donc chaque point de Crise augmente 5% les chances. De plus chaque gain étant associé à un test, on sait donc qu'au 6ème point de crise, un joueur aura forcément effectué au moins 6 jets de crise.

Une première simplification consiste donc à dire : "Pas de jet de Crise pour les 5 premiers points" (statistiquement le premier point de choc se gagne au 6ème point de Crise).

Une seconde simplification consiste à gagner automatiquement un point de choc au 6ème, 9ème, 11ème, et 13, 14, 15, etc. points de Crise acquis.

L'entrée en état de Choc dépendant du Niveau d'Accomplissement et de la VOLONTE du personnage, il est un peu plus difficile à transformer en formule/table.

### Création de personnage

- créer rapidement un personnage sans avoir besoin du livre de jeu : différentes étapes et points à répartir. Explication sur chaque élément de la fiche (popup d'information).
- suggestions de mots de démence
- enregistrer un personnage (l'exporter ?),
- *TODO* imprimer

### Utilisation en cours de jeu

- Révéler une compétence (utiliser les points de Génération, s'il en reste)
- modifier l'équipement (Saint-Frusquin)
- boutons pour utiliser les Effets Démentiels (pour faire apparaître, cliquer sur Mot de Démence)
- *TODO* Mode override : permet de modifier tout sans rien déclencher
- Mode jeu: boutons à cliquer au lieu de faire un jet : jet de compétences, jet opposé, etc. On clique sur une compétence, on voit une table avec des modificateurs/Ajustements, et on valide. Les conséquences sont affichées ensuite, et éventuellement inscrites sur la fiche de personnage (avec animation pour mettre en valeur ce qui vient de changer)
- croix d'expérience pour les compétences non démentielles avec lesquelles on a fait un test ajusté avec un seuil de 10 ou moins réussi.
- Accomplissement : effacer Douleurs, Equipement, etc. et gérer les croix d'XP des compétences
- clic sur une carac : popup de jet, saisir ajustement, saisir le résultat (si on tire notre dé en réel) ou tirer un d20 sur cet écran. Valider pour fermer et journaliser cette action.
- avoir un journal des différentes actions/jets/effets.
- *TODO* clic sur mot de démence : affiche popup avec les Effets Démentiels possibles (Antalgie que si on a des Douleurs, p.ex.). différentes popup de résolution/jets s'enchainent, et le journal s'alimente.
- *TODO* Gestion des combats : cliquer sur Esquive vs Ajustements de l'adversaire. Attribuer aux objets des Classes de Dommages + Avoir les tables Dommage des Personnages + la table des Douleurs, ou bien Table de Dommage des Créatures.
- *TODO* à tout moment on peut choisir de saisir un résultat ou bien cliquer pour simuler un lancer de dé.

### Technique

- Expérimenter sur une pile JS moderne avec ESModules, VueJS + VueX.
- Low maintenance.
- Pendant mes heures de temps libre sur un weekend.
- hébergement manuel via la branche `gh-pages` sur https://doppelganger9.github.io/hystoire-de-fou
- `gh-pages` utilise **Jekyll** et donc on a un peu de config pour ignorer certains fichiers
## Design

- [Vue.js](https://vuejs.org/) parce que très simple et facile à injecter dans un html sans à avoir besoin de faire une app d'entreprise/industrielle.
- [VueX](https://vuex.vuejs.org/) pour stocker l'état, au départ je suis parti sur des bindings et events qui repassaient par le root component, mais ça devenait très lourd. Je préfère que chaque composant soit relié en direct au Store. Le code "métier" est dans le Store, et les composants se retrouvent allégés !
- [ESModules](https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Modules) car en 2021 c'est dispo quasi partout (sauf Opera ou browsers obscurs...), ça retire une dépendance envers un bundler/builder
- pas besoin de `package.json` pour le moment !

### Pas de npm ni de builder

- Avec ESModules on peut directement importer les choses. Le mieux c'est d'utiliser une importMap pour ne pas répéter partout les URLs et juste référencer des alias : 

```html
        <script type="importmap">
        { "imports": {
            "vue":  "https://cdn.jsdelivr.net/npm/vue@3.2.45/dist/vue.esm-browser.js",
            "vuex": "https://cdn.jsdelivr.net/npm/vuex@4.1.0/dist/vuex.esm-browser.js",
            "@vue/devtools-api": "https://unpkg.com/@vue/devtools-api@6.4.5/lib/esm/index.js"
        } }
        </script>
```

- Dans VS Code on utilise `//@ts-check` pour valider "un peu" les typages implicites du code JavaScript. Oui, ça ne remplace pas du typage TypeScript, mais ça nous économise une étape de transpilation. De la même manière, on vise uniquement les navigateurs capables de comprendre notre code JS, car il n'y a pas de prothèses d'émulation dans le code. Idem, si on voulait augmenter la compatibilité avec les navigateurs, il faudrait revoir cela.
- il y a très peu d'outillage, au final, autour de ce projet.

### Le Store VueX

- dispatch retourne une promesse.
- Si le code du dispatch return quelque chose, l'appelant aura ce qqchose a la resolution de la promesse.
- donc on met async les functions d'action et on await les dispatch si on veut attendre qu'elles se terminent 
et/ou récupérer ce qu'elle retourne.
- un commit ne retourne rien (void), il est synchrone.
- une action peut dispatch une autre action, etc. et appeler des commit, le faire de manière en général asynchrone.

## Pour lancer et tester

Les ESModules ne se chargent que s'ils sont servis en `http(s)://` (pas en `file://`), donc :

- `npx http-server .`
- ouvrir http://127.0.0.1:8080/

Pour repartir d'un personnage existant :

- ouvrir [url sauvegardée](http://127.0.0.1:8080/#eyJub20iOiJUcmlzdGFuIiwiZGVzY3JpcHRpb24iOiJCcnVuLCB5ZXV4IG1hcnJvbnMsIHJlZ2FyZCB2aWYiLCJwcm9mZXNzaW9uIjoiSGlzdG9yaWVuIiwiYWdlIjoiMjMiLCJ0YWlsbGVDbSI6IjE4MCIsIm1vdERlRGVtZW5jZSI6IkVjb3V2aWxsb24hIiwicG9pZHMiOiI3NSIsInZvbG9udGUiOiIxMCIsImludGVsbGVjdCI6IjEzIiwic2Vuc2l0aWYiOiIxMCIsImNoYXJpc21lIjoiMTMiLCJjb25zdGl0dXRpb24iOiIxMyIsInBlcmNlcHRpb24iOiIxMiIsImFnaWxpdGUiOiI5IiwiY29tcGV0ZW5jZXMiOlt7ImludGl0dWxlIjoiQ3VsdHVyZSBH6W7pcmFsZSIsImJhc2UiOjMsInJldmVsZWUiOnRydWUsImRlbWVudGllbGxlIjpmYWxzZSwicHJvZmVzc2lvbm5lbGxlIjpmYWxzZSwidmFsZXVyQ2FyYWN0ZXJpc3RpcXVlRGlyZWN0cmljZSI6MTEsIm5vbUNhcmFjdGVyaXN0aXF1ZURpcmVjdHJpY2UiOiJlbnRlbmRlbWVudCIsInBvaW50c0RlR2VuZXJhdGlvbiI6MH0seyJpbnRpdHVsZSI6Ikhpc3J0b2lyZSIsImJhc2UiOjAsInJldmVsZWUiOnRydWUsImRlbWVudGllbGxlIjpmYWxzZSwicHJvZmVzc2lvbm5lbGxlIjp0cnVlLCJ2YWxldXJDYXJhY3RlcmlzdGlxdWVEaXJlY3RyaWNlIjoxMSwibm9tQ2FyYWN0ZXJpc3RpcXVlRGlyZWN0cmljZSI6ImVudGVuZGVtZW50IiwicG9pbnRzRGVHZW5lcmF0aW9uIjowfSx7ImludGl0dWxlIjoiRXNxdWl2ZSIsImJhc2UiOiIxIiwicmV2ZWxlZSI6dHJ1ZSwiZGVtZW50aWVsbGUiOmZhbHNlLCJwcm9mZXNzaW9ubmVsbGUiOmZhbHNlLCJ2YWxldXJDYXJhY3RlcmlzdGlxdWVEaXJlY3RyaWNlIjoiOSIsIm5vbUNhcmFjdGVyaXN0aXF1ZURpcmVjdHJpY2UiOiJhZ2lsaXRlIiwicG9pbnRzRGVHZW5lcmF0aW9uIjoiMSJ9XSwiY29tcGV0ZW5jZXNEZW1lbnRpZWxsZXMiOlt7ImludGl0dWxlIjoiUGlzdGFnZSBkZXMgaHXudHJlcyIsImJhc2UiOjAsInJldmVsZWUiOmZhbHNlLCJkZW1lbnRpZWxsZSI6dHJ1ZSwicHJvZmVzc2lvbm5lbGxlIjpmYWxzZSwidmFsZXVyQ2FyYWN0ZXJpc3RpcXVlRGlyZWN0cmljZSI6IjEyIiwibm9tQ2FyYWN0ZXJpc3RpcXVlRGlyZWN0cmljZSI6InBlcmNlcHRpb24iLCJwb2ludHNEZUdlbmVyYXRpb24iOjB9XSwiZG91bGV1cnMiOltdLCJwb2ludHNEZUNyaXNlIjowLCJjaG9jc1BhcmFubyI6MCwiY2hvY3NTY2hpem8iOjAsImNob2NzUHJvZm9uZHMiOjAsImV0YXREZUNob2MiOmZhbHNlLCJ0b3RhbEFjY29tcGxpc3NlbWVudCI6MCwiZXF1aXBlbWVudHMiOlsicGFy6W8gZW4gY3VpciBkZSBjb3VsZXVyIGtha2kiLCJ2ZXN0ZSBlbiBueWxvbiBkZSBjb3VsZXVyIGJlaWdlIiwiT3V2cmUgaHXudHJlcyJdfQ==)

## Pour publier sur Github Pages

Si besoin de ne pas exposer certains fichiers, les ajouter à la configuration Jekyll `_config.yml`.

- modifier, etc. `main`
- `git checkout gh-pages`
- `git rebase master --autostash`
- `git push --force`
- attendre un peu car Github Pages ne se met pas immédiatement à jour... patience ! aller voir https://doppelganger9.github.io/hystoire-de-fou
