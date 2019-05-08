class pageProduct {

    getProductPrice() {
        return cy.get('div[class="bar-component price-and-button-container"]')
            .find('span[class="is-price"]')// find element with product price
            .invoke('text') //take the price
    }

    addProductToCart() {
        cy.get('div[class="bar-component price-and-button-container"]')
            .contains('Buy')
            .click()
    }

    selectProductColor(color) {
        cy.get('div[class="mqn-lobby-swatch__card__meta"]')
            .contains(color)
            .parent().parent().contains('Add to cart')
            .click()
    }

} export default new pageProduct()

