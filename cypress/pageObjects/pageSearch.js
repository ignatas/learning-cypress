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

    searchProductUI(product) {
        cy.get('.header-search-icon > .highlightable > svg')
            .click()
        cy.get('.quantumWizAutocompleteInputText')
            .type(product.name + '{enter}')
    }

} export default new pageSearch()