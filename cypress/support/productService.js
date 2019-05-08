Cypress.Commands.add('getProductsList', () => {
    cy.getProductsUrl().then(url => {
    cy.request(`${url}`).then(response => {
        let products = response.body.products
        products = products.filter(product => (product.display_name.indexOf(' -') == -1))
        return products
    })
})
})

Cypress.Commands.add('getStoreUrl', () => {
    return Cypress.env('storeUrl')
})

Cypress.Commands.add('getProductsUrl', () => {
    return Cypress.env('productsUrl')
})