class pageShop {
    selectProductByName(productName) { //Selection from 1st page hardcoded for now
        return cy.get('a[ng-href="/product/' + productName + '"]', { timeout: 20000 })
    }
    
    getProductPrice() {
        return cy.get('div[class="bar-component price-and-button-container"]', { timeout: 20000 })
            .find('span[class="is-price"]', { timeout: 20000 })// find element with product price
            .invoke('text') //take the price
    }
    
    addProductToCart() {
        cy.get('div[class="bar-component price-and-button-container"]', { timeout: 20000 }).
            find('span[class="button-text"]', { timeout: 20000 }).click()
    }
    
    selectProductColor(color) {
        return cy.get('div[class="mqn-lobby-swatch__card__headline ng-binding ng-scope"]', { timeout: 20000 })
            .contains(color)
            .parent().parent()
            .find('div[class="mqn-button mqn-button--hairline ng-binding ng-scope mdc-ripple-upgraded"]', { timeout: 20000 })
    }
    
    getProductColorFromCart(color) {
        return cy.get('div[class="cart-lineitem-title pull-left"]', { timeout: 20000 }).contains(color)
    }
    
    getProductPriceFromCart() {
        return cy.get('div[class="cart-price-bottom-padding text-right"]', { timeout: 20000 }).invoke('text')
    }
    
    getProductQuantityFromCart() {
        return cy.get('div[class="item-quantity cart-price-bottom-padding"]', { timeout: 20000 })
            .find('option[selected="true"]').invoke('text')
    }
    
    getTotalPriceFromCart() {
        return cy.get('span[class="roboto-header-text-6 float-right"]', { timeout: 20000 }).invoke('text')
    }
    
    removeProductFromCart() {
        cy.get('button[class="cart-remove-button pull-right"]', { timeout: 20000 })
            .click()//remove product from the cart
        return cy.get('div[class="your-cart-is-empty"]', { timeout: 20000 })
    }
} export default new pageShop()




// а как экспортировать несколько классов из одного файла для красоты ?
/*class pageColorSelection {
    selectProductByName(productName) {
        return cy.get('a[ng-href="/product/' + productName + '"]', { timeout: 20000 })
    }
} export default new pageColorSelection()


class pageCart {
    selectProductByName(productName) {
        return cy.get('a[ng-href="/product/' + productName + '"]', { timeout: 20000 })
    }
} export default new pageCart()
*/







