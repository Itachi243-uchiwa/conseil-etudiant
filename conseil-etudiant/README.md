# Conseil Étudiant HE2B — site public et espace membre

Next.js 16 (App Router), React 19, Tailwind, shadcn/ui, NextAuth v4.

## Démarrer en local

Copie `.env.local.example` en `.env.local` et remplis-le, puis :

```bash
pnpm install
pnpm dev
```

Le lockfile est un `pnpm-lock.yaml` : reste sur pnpm (`npm i -g pnpm`).

- Site : http://localhost:3000
- Espace membre : http://localhost:3000/membres

Le backend doit tourner en parallèle sur le port 8080.

## Le piège de la connexion

`lib/auth-options.ts` construit l'URL de vérification ainsi :

```ts
const BACKEND_URL = process.env.NEXT_PUBLIC_BACK_PUBLIC_API_URL ?? ""
```

Contrairement à `next.config.mjs`, il n'y a **pas de valeur par défaut**. Sans
la variable, l'URL devient relative, le `fetch` côté serveur échoue, et le
callback `signIn` renvoie `/membres?error=not-member` pour tout le monde, y
compris un membre valide.

Deux autres conditions : le compte Google doit être en `@etu.he2b.be`, et
l'adresse doit exister dans la table `team_members` du backend. Le
`DataInitializer` en crée trois en développement, dont un membre du bureau.

## Ce qui a changé

### Le bureau a les mêmes accès que le président de séance

Dans `app/membres/ag/[id]/page.tsx`, `isPresident` valait uniquement la
comparaison avec `presidentEmail`. Il devient
`isSessionPresident || user.officeMember`, et pilote comme avant tout
l'affichage conditionnel : création de sujets, ouverture et clôture des votes,
flux SSE des résultats, vérification des procurations.

Le badge distingue les deux rôles, « Président de séance » ou « Bureau ».

Le backend applique la même règle indépendamment : ce booléen ne fait que
refléter l'interface, il n'accorde rien.

### Ordre du jour

Nouveau composant `components/membres/SessionAgenda.tsx`, affiché au-dessus des
sujets de vote. Il reprend la forme du document papier : heure de début,
numéro, intitulé, durée indicative, jalons teintés.

Les horaires et la numérotation viennent du serveur, le client se contente
d'afficher. Le président et le bureau cochent les points traités, ce qui permet
aux membres de savoir où en est la séance sans demander.

Le PDF s'ouvre en aperçu dans la page, sans téléchargement.

### Procurations encodées pour un tiers

`ProxyPanel` gagne un sélecteur de mandataire, visible pour le président de
séance et le bureau. Par défaut la procuration est portée par la personne
connectée ; le sélecteur permet de désigner quelqu'un d'autre.

Encoder pour un tiers ne transfère aucune voix à l'encodeur : c'est le
mandataire choisi qui votera pour l'absent. Le backend le vérifie.

### Aperçu des PDF

Cloudinary sert les documents avec un type MIME générique, ce qui pousse le
navigateur à télécharger. `inlineDocumentUrl()` et `inlineProxyUrl()` pointent
vers un relais du backend qui renvoie le fichier en `application/pdf` inline.

`DocumentRow` gagne un bouton d'aperçu pour les PDF, et `ProxyPanel` passe par
le relais au lieu de l'URL Cloudinary brute.

### Favicon

L'objet `metadata` de `app/layout.tsx` ne déclarait aucune icône, et Next se
rabattait sur `public/favicon.ico`, qui contenait une version ancienne du logo.

Les icônes sont maintenant dans `app/icon.png`, `app/apple-icon.png` et
`app/favicon.ico`, détectées automatiquement par l'App Router.
`public/favicon.ico` a été supprimé pour éviter qu'il reprenne la main.

Le `.ico` ne contient que le monogramme CE : à 16 px dans un onglet, « HE2B »
devient une bouillie de pixels. Le logo complet est gardé pour les tailles où
il reste lisible.

`metadataBase` a été ajouté : sans lui les images Open Graph partent en URL
relative et ne sont résolues ni par les moteurs de recherche ni par les réseaux
sociaux.

Chrome garde le favicon en cache très longtemps. Teste en navigation privée,
et repasse par la Search Console pour la recherche Google.

## Attention si tu changes le port du backend

Le CSP est écrit en dur dans `proxy.ts` : `connect-src` autorise
`http://localhost:8080` en développement et `https://admin.cehe2b.be` en
production. Changer d'hôte ou de port sans toucher ce fichier fait bloquer les
requêtes par le navigateur, sans erreur explicite côté React.
