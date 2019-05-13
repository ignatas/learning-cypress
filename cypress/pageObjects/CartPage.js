class CartPage {

    getProductRowByUrl(url) {
        return cy.get('div[class="cart-items-row"]')
            .find(`a[href="${url}"]`)
            .parent()
    }

    get checkOutButton() {
        return cy.get('.transaction.id-checkout-button')
    }

    get subtotal() {
        return cy.get('span[class="roboto-header-text-6 float-right"]')
    }

    getItemQuantityDropdown(url) {
        return this.getProductRowByUrl(url)
            .find('select[class="item-qty-selector"]')
    }

    openCartPage() {
        cy.getStoreUrl().then(url => {
            cy.visit(`${url}/cart?hl=en-US`)
        })
    }

    getProductTitle(url) {
        return this.getProductRowByUrl(url)
            .find('div[class="roboto-header-text-9"]')
    }

    getProductPrice(url) {
        return this.getProductRowByUrl(url)
            .find('div[class="cart-price-bottom-padding text-right"]')
            .invoke('text')
    }

    getProductQuantity(url) {
        return this.getProductRowByUrl(url)
            .find('div[class="item-quantity cart-price-bottom-padding"]')
            .find('option[selected="true"]')
            .invoke('text')
    }

    setProductQuantity(url, quantity) {
        this.getItemQuantityDropdown(url).select(`${quantity}`)
            .should('have.value', `${quantity}`)
    }

    getTotalPrice() {
        this.checkOutButton.should('be.visible')
        return this.subtotal
            .invoke('text')
    }

    removeProduct(url) {
        this.openCartPage()
        this.getProductRowByUrl(url)
            .find('button[class="cart-remove-button pull-right"]')
            .click()//remove product from the cart
        cy.get('div[class="your-cart-is-empty"]')
            .should('exist')
    }

} export default new CartPage()