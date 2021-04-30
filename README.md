# Hystoire de Fou

Fiche de personnage automatisée, pour créer un personnage et le jouer.

## Objectifs

### Faire des simulations

Pour saisir les probabilités sur le système de santé mentale.

Celui-ci peut devenir très lourd car force le joueur à lancer beaucoup de dés.

L'idée est donc de créer des centaines de milliers de personnages et de leur faire vivre des crises simulées et de collecter des statistiques.

Ceci permet en retour de dresser une table sans dés pour simplifier en supprimant les jets de Crise et jets de Chocs.

En effet, les jets de Crise ne dépendent que du total de points de Crise et d'un jet de dés à 20 faces, donc chaque point de Crise augmente 5% les chances. De plus chaque gain étant associé à un test, on sait donc qu'au 6ème point de crise, un joueur aura forcément effectué au moins 6 jets de crise.

Une première simplification consiste donc à dire : "Pas de jet de Crise pour les 5 premiers points" (statistiquement le premier point de choc se gagne au 6ème point de Crise).

Une seconde simplification consiste à gagner automatiquement un point de choc au 6ème, 9ème, 11ème, et 13, 14, 15, etc. points de Crise acquis.

L'entrée en état de Choc dépendant du Niveau d'Accomplissement et de la VOLONTE du personnage, il est un peu plus difficile à transformer en formule/table.

### Création de personnage

- créer rapidement un personnage sans avoir besoin du livre de jeu : différentes étapes et points à répartir. Explication sur chaque élément de la fiche (popup d'information).
- enregistrer un personnage (l'exporter ?),
- imprimer

### Utilisation en cours de jeu

- Révéler une compétence (utiliser les points de Génération, s'il en reste)
- modifier l'équipement (Saint-Frusquin)
- boutons pour utiliser les Effets Démentiels (pour faire apparaître, cliquer sur Mot de Démence)
- Mode override : permet de modifier tout sans rien déclencher
- Mode jeu: boutons à cliquer au lieu de faire un jet : jet de compétences, jet opposé, etc. On clique sur une compétence, on voit une table avec des modificateurs/Ajustements, et on valide. Les conséquences sont affichées ensuite, et éventuellement inscrites sur la fiche de personnage (avec animation pour mettre en valeur ce qui vient de changer)

## Design

- Vue.js parce que très simple et facile à injecter dans un html sans à avoir besoin de faire une app d'entreprise/industrielle.
- ESModules car en 2021 c'est dispo quasi partout (sauf Opera ou browsers obscurs...), ça retire une dépendance envers un bundler/builder
- pas de `package.json` pour le moment.

## Tester

Les modules ne se chargent que si servit pas en `file://`, donc :

- `npx http-server .`

