import commonPageActions from "../../support/Objects/commonPageActions"

class pageSearch extends commonPageActions {

    searchProductAPI(product) { //find out how to work with json object here
        cy.visit(`${this.storeUrl}/search?q=${product.display_name}&hl=en-US`)
        cy.get('div[class="results-container"]').should('be.visible')
        .contains(product.display_name)
        .parent()
        .click()
    }

    searchProductUI(product) {// temporary not used
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