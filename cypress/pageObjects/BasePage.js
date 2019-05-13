class BasePage {

    get storeUrl() {
        return Cypress.env('storeUrl')
    }

    openShop() {
        cy.visit(`${this.storeUrl}/?hl=en-US&countryRedirect=true`)
    }

} export default BasePage