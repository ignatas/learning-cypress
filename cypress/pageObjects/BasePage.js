class BasePage {

    get storeUrl() {
        return Cypress.env('storeUrl')
    }

} export default BasePage