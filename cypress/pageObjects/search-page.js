import BasePage from "./base-page"

class SearchPage extends BasePage {

    getProductByUrl(url) {
        return cy.get(`input[value="${url}"]`)
    }

    pickProductFromSearchResultsByUrl(url) {
        this.getProductByUrl(url).should('exist')
            .parent()
            .click()
    }

    openSearchResults(display_name) {
        cy.visit(`${this.storeUrl}/search?q=${display_name}&hl=en-US`)
    }

    searchProduct(display_name) {
        cy.get('.header-search-icon > .highlightable > svg')
            .click()
        cy.get('.quantumWizAutocompleteInputText')
            .type(display_name + '{enter}')
    }

} export default new SearchPage()