class pageProduct {

    getPriceAndButton() {
        return cy.get('div[class="bar-component price-and-button-container"]')
    }

    getProductPrice() {
        return this.getPriceAndButton()
            .find('span[class="is-price"]')// find element with product price
            .invoke('text') //take the price
    }

    clickBuy() {
        this.getPriceAndButton()
            .contains('Buy')
            .click()
    }

    addProductToCart(product, color) {
        this.clickBuy()
        if (product.colors.length > 1) //additional steps for multiple colors
        {
            cy.log('Product with color selection')
            this.selectProductColor(color)
        }
        else { cy.log('Product without color selection') }

    }

    selectProductColor(color) {
        cy.get('div[class="mqn-lobby-swatch__card__meta"]')
            .contains(color)
            .parent().parent().contains('Add to cart')
            .click()
    }

} export default new pageProduct()

