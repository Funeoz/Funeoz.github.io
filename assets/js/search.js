const search = instantsearch({
    // TODO: enter our own algolia credentials here
    indexName: "jekyll",
    searchClient: algoliasearch(
        'LC80RD7JKK',
        '26894f1f5794a11c59397f11b2bcba7f'
    ),
    routing: true
});

search.addWidget(
    instantsearch.widgets.searchBox({
        container: '#search-box',
        placeholder: 'Search for articles',
        poweredBy: true
    })
);

search.addWidget(
    instantsearch.widgets.hits({
        container: '#hits',
        templates: {
            empty: 'No results',
            item: function (hit) {
                return `
                <div class="card blog-card">
                    <div class="card-content">
                        <a class="title is-4" href="${hit.url}">${hit.title}</a>
                        <span class="icon-text">
                            <span class="icon">
                                <i class="fas fa-user-edit"></i>
                            </span>
                            <span>Funeoz</span>
                            <span class="icon">
                                <i class="fas fa-calendar"></i>
                            </span>
                            <span>${hit.date}</span>
                        </span>
                        <p>${hit.description}</p>
                    </div>
                    <footer class="card-footer">
                        <a href="${hit.url}" class="card-footer-item">Read more</a>
                    </footer>
                </div>
                `;
            }
        }
    })
);
search.start();