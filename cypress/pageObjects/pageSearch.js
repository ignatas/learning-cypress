import productService from "../services/productService"

class pageSearch {

    pickProductFromSearchResults(product) {
        cy.get(`input[value="${product.url}"]`).should('exist')
            .parent()
            .click()
    }

    openSearchPage() {
        cy.visit(`${productService.storeUrl}/?hl=en-US&countryRedirect=true`)
    }

    searchProductUI(product) {
        cy.get('.header-search-icon > .highlightable > svg')
            .click()
        cy.get('.quantumWizAutocompleteInputText')
            .type(product.name + '{enter}')
    }

} export default new pageSearch()