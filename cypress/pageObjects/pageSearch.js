class pageSearch {

    getProductByUrl(url) {
        return cy.get(`input[value="${url}"]`)
    }

    pickProductFromSearchResults(product) {
        this.getProductByUrl(product.url).should('exist')
            .parent()
            .click()
    }

    openSearchPage() {
        cy.getStoreUrl().then(url => {
            cy.visit(`${url}/?hl=en-US&countryRedirect=true`)
        })
    }
    searchProductAPI(display_name) {
        cy.getStoreUrl().then((storeUrl) => {
            cy.visit(`${storeUrl}/search?q=${display_name}&hl=en-US`)
        })
    }

    searchProductUI(product) {
        cy.get('.header-search-icon > .highlightable > svg')
            .click()
        cy.get('.quantumWizAutocompleteInputText')
            .type(product.display_name + '{enter}')
    }

} export default new pageSearch()