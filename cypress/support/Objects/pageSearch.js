//import commonPageActions from "../commonPageActions";

class pageSearch {

    searchProductAPI(product) {
        cy.visit('https://store.google.com/us/search?q=' + product.name + '&hl=en-US')
        cy.get('div[class="results-container"]').should('be.visible')
        .contains(product.name)
        .parent()
        .click()
    }

    searchProductUI(product) {
        cy.get('.header-search-icon > .highlightable > svg', { timeout: 20000 })
            .click()
        cy.get('.quantumWizAutocompleteInputText')
            .type(product.name + '{enter}')
        // check if the product is really found
        cy.get('input[value="' + product.url + '"]', { timeout: 20000 }).should('exist')
        .parent()
        .click()
    }

} export default new pageSearch()