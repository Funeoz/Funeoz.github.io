---
description: A simple way to create a button that launches the request when automatic request is disabled.
layout: post
title: Create a submit button for Instantsearch.js
lang: en
lang-ref: create-submit-button-instantsearch-js
tags: [ instantsearch, algolia, javascript, js]
---

Instantsearch.js docs don't have a precise description to create a button that makes
a request.

Here is a simple way to do it.

Create a parent div to the one that gets the code inserted by Instantsearch:

```html
<div id="searchbar">
    <div id="search-box">
        <!-- Searchbox widget will be here -->
    </div>
</div>

<script src="search.js"></script>
```

In the JS file, we have:

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

We have to use JS to generate the button. It is impossible to put it directly into 
the HTML file as it blocks the insertion of the Searchbox widget.

Therefore in the Javascript file, we will create the button, give it its text and 
create the search function:

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

### Final code

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
    /* your code */
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
        /* your code */
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