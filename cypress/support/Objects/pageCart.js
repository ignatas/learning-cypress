//import commonPageActions from "../commonPageActions";

class pageCart {

    getProductColor(color) {
        return cy.get('div[class="cart-lineitem-title pull-left"]', { timeout: 20000 }).contains(color)
    }
    
    getProductPrice() {
        return cy.get('div[class="cart-price-bottom-padding text-right"]', { timeout: 20000 }).invoke('text')
    }
    
    getProductQuantity() {
        return cy.get('div[class="item-quantity cart-price-bottom-padding"]', { timeout: 20000 })
            .find('option[selected="true"]').invoke('text')
    }

    setProductQuantity(){

    }
    
    getTotalPrice() {
        return cy.get('span[class="roboto-header-text-6 float-right"]', { timeout: 20000 }).invoke('text')
    }
    
    removeProduct() {
        cy.get('button[class="cart-remove-button pull-right"]', { timeout: 20000 })
            .click()//remove product from the cart
        return cy.get('div[class="your-cart-is-empty"]', { timeout: 20000 })
    }

} export default new pageCart()