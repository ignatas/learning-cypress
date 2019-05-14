import BasePage from "./BasePage"

class CartPage extends BasePage {

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
        cy.visit(`${this.storeUrl}/cart?hl=en-US`)
    }

    getProductTitle(url) {
        return this.getProductRowByUrl(url)
            .find('div[class="roboto-header-text-9"]')
    }

    getProductPrice(url) {
        return this.getProductRowByUrl(url)
            .find('div[class="cart-price-bottom-padding text-right"]')
            .should('exist')
            .then((price) => {
                //formating price to the number
                return price.text().substring(1, price.text().indexOf('.') + 3).replace(',', '')
            })
    }

    getProductQuantity(url) {
        return this.getProductRowByUrl(url)
            .find('div[class="item-quantity cart-price-bottom-padding"]')
            .find('option[selected="true"]')
            .invoke('text')
    }

    getMaxProductQuantity(url) {
        return this.getItemQuantityDropdown(url)
            .then(dropdown => {
                return dropdown[0].length
            })
    }

    setProductQuantity(url, quantity) {
        this.getItemQuantityDropdown(url).select(`${quantity}`)
            .should('have.value', `${quantity}`)
    }

    getTotalPrice() {
        this.checkOutButton.should('be.visible')
        return this.subtotal
            .should('exist')
            .then((price) => {
                //formating price to the number
                return price.text().substring(1, price.text().indexOf('.') + 3).replace(',', '')
            })
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