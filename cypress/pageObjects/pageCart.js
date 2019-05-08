class pageCart {
     getItemQuantitySelector() {
        return cy.get('select[class="item-qty-selector"]')
    }

    openCartPage() {
        cy.getStoreUrl().then(url => {
            cy.visit(`${url}/cart?hl=en-US`)
        })
    }

    getProductTitle(product) {
        return cy.contains(product.display_name)
    }

    getProductPrice() {
        return cy.get('div[class="cart-price-bottom-padding text-right"]').invoke('text')
    }

    getProductQuantity() {
        return cy.get('div[class="item-quantity cart-price-bottom-padding"]')
            .find('option[selected="true"]').invoke('text')
    }

    setProductQuantity(productQuantity) {
        this.getItemQuantitySelector().select(`${productQuantity}`)
            .should('have.value', `${productQuantity}`)
    }

    getTotalPrice() {
        return cy.get('span[class="roboto-header-text-6 float-right"]').invoke('text')
    }

    removeProduct() {
        cy.get('button[class="cart-remove-button pull-right"]')
            .should('be.visible')
            .click()//remove product from the cart
        cy.get('div[class="your-cart-is-empty"]')
            .should('exist')
    }

} export default new pageCart()