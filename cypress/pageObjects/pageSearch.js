class pageSearch {

    getProductByUrl(url) {
        return cy.get(`input[value="${url}"]`)
    }

    pickProductFromSearchResultsByUrl(url) {
        this.getProductByUrl(url).should('exist')
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

    searchProductUI(display_name) {
        cy.get('.header-search-icon > .highlightable > svg')
            .click()
        cy.get('.quantumWizAutocompleteInputText')
            .type(display_name + '{enter}')
    }

} export default new pageSearch()