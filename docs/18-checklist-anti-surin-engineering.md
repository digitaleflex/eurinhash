# 18. Checklist anti-sur-ingénierie — EURINHASH

Document de référence pour toute décision UI. Il prime sur les préférences de bibliothèque.
Gates du repo : `npm run typecheck`, `npm run build` (et `npm run lint` dès qu'il est réparé, voir §F).

## Objectif

Maintenir une architecture UI simple, performante, cohérente et maintenable pour le site personnel EURINHASH.

Toute décision technique doit être justifiée par un besoin réel. La popularité d’une bibliothèque, la nouveauté d’une technologie ou la possibilité d’ajouter un effet ne constituent pas des justifications suffisantes.

## A. Audit avant toute modification

- [ ] Inspecter `package.json` et le fichier de verrouillage.
- [ ] Vérifier les versions de Next.js, React et Tailwind CSS v4.
- [ ] Examiner `components.json` et les composants shadcn/ui existants.
- [ ] Inspecter les Design Tokens et les variables CSS déjà définis.
- [ ] Identifier les utilitaires, hooks et composants réutilisables.
- [ ] Vérifier les polices déjà configurées avant d’en ajouter.
- [ ] Identifier les fonctionnalités réellement nécessaires à la page en cours.
- [ ] Documenter les lacunes avant de proposer une nouvelle dépendance.

Ne jamais supposer qu’un composant ou un package est absent sans avoir inspecté le projet.

## B. Politique stricte sur les dépendances

### Socle de départ

- [ ] Tailwind CSS v4 pour les styles et le responsive.
- [ ] shadcn/ui pour les composants d’interface déjà présents ou réellement nécessaires.
- [ ] Geist Sans et Geist Mono pour la typographie, après vérification de la configuration existante.
- [ ] CSS natif pour les transitions simples lorsqu’il suffit.
- [ ] Motion uniquement si des animations nécessitant une orchestration le justifient.
- [ ] Sonner uniquement si un système de notifications équivalent n’existe pas déjà.

### Bibliothèques reportées par défaut

Ne pas ajouter React Bits, Magic UI, Aceternity UI, AutoAnimate, Lenis ou dotLottie au socle initial.

Ces outils pourront être évalués individuellement lorsqu’un besoin précis sera identifié et qu’aucune solution existante plus simple ne conviendra.

Cette règle ne signifie pas qu’ils sont interdits. Elle signifie qu’ils ne sont pas des dépendances par défaut.

## C. Test obligatoire avant chaque installation

Avant d’ajouter un package, répondre à ces questions :

- [ ] Quel besoin utilisateur concret résout-il ?
- [ ] Pourquoi les composants et dépendances existants ne suffisent-ils pas ?
- [ ] Peut-on obtenir le même résultat avec du CSS, React ou un composant déjà présent ?
- [ ] La dépendance est-elle compatible avec les versions actuelles du projet ?
- [ ] Sa documentation officielle confirme-t-elle la méthode d’intégration ?
- [ ] Sa licence autorise-t-elle l’usage prévu ?
- [ ] Quel est son coût en dépendances, poids livré, maintenance et complexité ?
- [ ] Son bénéfice justifie-t-il ce coût ?

Si une réponse essentielle manque, ne pas installer le package avant d’avoir effectué les vérifications nécessaires.

## D. Règles de conception des composants

- [ ] Réutiliser les composants shadcn/ui déjà disponibles.
- [ ] Étendre les variantes existantes avant de créer un composant équivalent.
- [ ] Éviter les abstractions qui ne servent qu’une seule fois sans avantage démontré.
- [ ] Ne pas créer un système de design parallèle à shadcn/ui.
- [ ] Centraliser les couleurs, espacements, rayons et typographies dans les tokens.
- [ ] Éviter les valeurs arbitraires répétées dans les styles.
- [ ] Ne pas construire un composant générique complexe pour anticiper des besoins hypothétiques.
- [ ] Garder les composants Server Components par défaut dans Next.js.
- [ ] Ajouter des Client Components uniquement lorsque l’interactivité le nécessite.

## E. Animations et chargements

- [ ] Préférer un squelette reproduisant le contenu attendu à un spinner générique lorsque le chargement est prévisible.
- [ ] Utiliser CSS pour les animations simples.
- [ ] Réserver Motion aux interactions ou transitions qui en tirent un bénéfice réel.
- [ ] Éviter deux bibliothèques animant les mêmes éléments.
- [ ] Ne pas ajouter de défilement personnalisé sans besoin justifié.
- [ ] Éviter les animations permanentes et les effets décoratifs coûteux.
- [ ] Respecter `prefers-reduced-motion`.
- [ ] Prévoir des états de chargement, de réussite et d’erreur cohérents.
- [ ] Ne pas retarder l’affichage du contenu principal pour une animation.

## F. Performance et qualité

- [ ] Vérifier le poids des dépendances ajoutées.
- [ ] Limiter le JavaScript côté client.
- [ ] Éviter les bibliothèques qui dupliquent des fonctionnalités déjà couvertes.
- [ ] Préserver les performances mobiles et les Core Web Vitals.
- [ ] Vérifier l’accessibilité au clavier et les contrastes.
- [ ] Exécuter le lint, la vérification TypeScript et les tests disponibles.
- [ ] Vérifier que le build fonctionne après les modifications.
- [ ] Ne déclarer un contrôle réussi que s’il a effectivement été exécuté.

## G. Limites de complexité

- Pas de nouvelle dépendance sans justification documentée.
- Pas de mise à jour globale des packages pour une modification visuelle isolée.
- Pas de remplacement de composants fonctionnels sans bénéfice démontré.
- Pas de création de plusieurs systèmes concurrents de notifications, animations ou styles.
- Pas de refactorisation globale lorsqu’une modification locale suffit.
- Pas de modification des secrets, données de production ou configurations sans nécessité et autorisation appropriée.
- Pas de suppression de code avant d’avoir vérifié ses usages et ses dépendances.

## H. Processus de décision

Pour chaque modification, appliquer cette séquence :

1. **Réutiliser** : chercher une solution existante.
2. **Simplifier** : déterminer si une solution native suffit.
3. **Adapter** : modifier les tokens ou variantes existantes.
4. **Ajouter** : introduire une dépendance uniquement si les étapes précédentes sont insuffisantes.
5. **Vérifier** : tester la compatibilité, la qualité et les effets secondaires.
6. **Documenter** : expliquer la décision et les contrôles réalisés.

## I. Format du rapport de chaque intervention

Pour toute intervention technique significative, présenter :

- Besoin identifié.
- État initial observé.
- Solution la plus simple retenue.
- Composants et dépendances réutilisés.
- Nouveaux packages, le cas échéant, avec justification et version vérifiée.
- Fichiers modifiés.
- Contrôles exécutés et résultats.
- Risques ou limites restant à traiter.

## Principe final

**La meilleure solution est la plus simple qui satisfait durablement le besoin.**

Ne construis pas aujourd’hui une infrastructure pour un besoin hypothétique de demain. Préserve la possibilité d’évoluer sans imposer prématurément la complexité de cette évolution.

La priorité reste la qualité du résultat visible, la fiabilité, la performance, l’accessibilité et la facilité de maintenance.
