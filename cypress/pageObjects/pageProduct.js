class pageProduct {

    getProductPrice() {
        return cy.get('div[class="bar-component price-and-button-container"]', { timeout: 20000 })
            .find('span[class="is-price"]', { timeout: 20000 })// find element with product price
            .invoke('text') //take the price
    }

    addProductToCart() {
        cy.get('div[class="bar-component price-and-button-container"]', { timeout: 20000 })
            .contains('Buy')
            .click()
    }

    selectProductColor(color) {
        return cy.get('div[class="mqn-lobby-swatch__card__headline ng-binding ng-scope"]', { timeout: 20000 })
            .contains(color)
            .parent().parent().contains('Add to cart')
            .click()
    }

} export default new pageProduct()

