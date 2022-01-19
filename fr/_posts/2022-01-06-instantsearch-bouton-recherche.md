---
layout: post
title: Créer un bouton de recherche pour Instantsearch.js
lang: fr
lang-ref: create-submit-button-instantsearch-js
tags: [ instantsearch, algolia, javascript, js]
---

La documentation de Instantsearch.js ne possède pas de description précise pour
créer un bouton qui lance la requête.

Voici donc un moyen simple de le faire.

Créez un div parent à celui qui va contenir le code que InstantSearch va insérer:

```html
<div id="searchbar">
    <div id="search-box">
        <!-- Le widget SearchBox apparaîtra ici -->
    </div>
</div>

<script src="search.js"></script>
```

Dans le fichier Javascript, on retrouve donc:

```js
// search.js
search.addWidget(
    instantsearch.widgets.searchBox({
        container: "#search-box",
        placeholder: "Search for articles",
        showSubmit: true,
        searchAsYouType: false,
        poweredBy: true,
        searchOnEnterKeyPressOnly: true,
    })
);
```

Il faut ensuite avec Javascript générer le bouton. Il est impossible de le mettre
directement dans le fichier HTML car cela empêche le widget SearchBox d'apparaître.

Dans le fichier Javascript, on va donc créer le bouton, lui donner son texte
et créer la fonction de recherche:

```js
// search.js
const submitButton = document.createElement("button");
submitButton.innerHTML = "Submit";
submitButton.onclick = onSubmitClick;
document.getElementById("searchbar").appendChild(submitButton);

function onSubmitClick() {
    let query = new URLSearchParams(window.location.search).get("query");
    search.helper.setQuery(query).search();
}
```

### Code final

```html
<-- search.html -->
<div id="searchbar">
    <div id="search-box">
    </div>
</div>

<div id="hits">
</div>

<link rel="stylesheet" type="text/css"
    href="https://cdn.jsdelivr.net/npm/instantsearch.js@latest/dist/instantsearch.min.css">
<link rel="stylesheet" type="text/css"
    href="https://cdn.jsdelivr.net/npm/instantsearch.js@latest/dist/instantsearch-theme-algolia.min.css">
<script src="https://cdn.jsdelivr.net/npm/instantsearch.js@2.10.4"></script>
<script src="https://cdn.jsdelivr.net/npm/algoliasearch@4.5.1/dist/algoliasearch.umd.js"></script>
<script src="assets/js/search.js"></script>
```

```js
// search.js

const search = instantsearch({
    /* votre code */
});

search.addWidget(
    instantsearch.widgets.searchBox({
        container: "#search-box",
        placeholder: "Search for articles",
        showSubmit: true,
        searchAsYouType: false,
        poweredBy: true,
        searchOnEnterKeyPressOnly: true,
    })
);

search.addWidget(
    instantsearch.widgets.hits({
        /* votre code */
    })
);

const submitButton = document.createElement("button");
submitButton.innerHTML = "Submit";
submitButton.onclick = onSubmitClick;
submitButton.className = "button is-primary submit-search";
document.getElementById("searchbar").appendChild(submitButton);

function onSubmitClick() {
    let query = new URLSearchParams(window.location.search).get("query");
    search.helper.setQuery(query).search();
}

search.start();
```