import Chance from 'chance'
import productService from "../services/productService"

class pageCart {
    openCartPage() {
        cy.visit(`${productService.storeUrl}/cart?hl=en-US`)
    }

    getProductColor(color) {
        return cy.get('div[class="cart-lineitem-title pull-left"]').contains(color)
    }

    getProductPrice() {
        return cy.get('div[class="cart-price-bottom-padding text-right"]').invoke('text')
    }

    getProductQuantity() {
        return cy.get('div[class="item-quantity cart-price-bottom-padding"]')
            .find('option[selected="true"]').invoke('text')
    }

    setProductQuantity() {
        cy.get('select[class="item-qty-selector"]').then((selector) => {
            let qnt = Chance().integer({ min: 1, max: selector[0].length })
            cy.get('select[class="item-qty-selector"]').select(`${qnt}`).should('have.value', `${qnt}`)
        })
    }

    getTotalPrice() {
        return cy.get('span[class="roboto-header-text-6 float-right"]').invoke('text')
    }

    removeProduct() {
        cy.get('button[class="cart-remove-button pull-right"]').should('be.visible')
            .click()//remove product from the cart
        cy.get('div[class="your-cart-is-empty"]').should('exist')
    }

} export default new pageCart()