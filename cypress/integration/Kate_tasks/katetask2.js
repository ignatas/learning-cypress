import Chance from 'chance'
/*const timeouts = {
    "onPage": { timeout: 5000 },
    "newPage": { timeout: 20000 }
};*/
let product = [
    {
        "productName": "google_pixel_buds",
        "description": "add to cart - product with color selection",
        "price": "",
        "colors": ["Just Black", "Clearly White"]
    },
    {
        "productName": "pixel_stand",
        "description": "add to cart - product without color selection",
        "price": "",
        "colors": ["White"]
    }
]; //hardcoded 2 test cases

product.forEach(product => {
    it('positive : ' + product.description, () => {
        cy.visit('https://store.google.com/us/collection/accessories_wall')
        //cy.log(timeouts.newPage)
        //cy.log(timeouts.onPage)
        cy.get('a[ng-href="/product/' + product.productName + '"]', { timeout: 20000 }).click()

        cy.get('div[class="bar-component price-and-button-container"]', { timeout: 20000 })
            .find('span[class="is-price"]', { timeout: 20000 })// find element with product price
            .invoke('text').then((text) => { product.price = text })//save the price

        cy.get('div[class="bar-component price-and-button-container"]', { timeout: 20000 }).
            find('span[class="button-text"]', { timeout: 20000 }).click() //buy the product

        let color = chance.pickone(product.colors);
        if (product.colors.length > 1) //additional steps for multiple colors
        {
            cy.get('div[class="mqn-lobby-swatch__card__headline ng-binding ng-scope"]', { timeout: 20000 })
                .contains(color)
                .parent().parent()
                .find('div[class="mqn-button mqn-button--hairline ng-binding ng-scope mdc-ripple-upgraded"]', { timeout: 20000 }).click()

            cy.get('div[class="cart-lineitem-title pull-left"]', { timeout: 20000 }).contains(color)
                .should('exist')//check: the color is correct
        }

        cy.get('div[class="cart-price-bottom-padding text-right"]', { timeout: 20000 }).invoke('text')
            .then((text) => { expect(text).to.eq(product.price + '.00') })//check : the product in the cart

        cy.get('div[class="item-quantity cart-price-bottom-padding"]', { timeout: 20000 })
            .find('option[selected="true"]').invoke('text')
            .then((text) => { expect(text).to.eq("1") })//check : the only one item in the cart

        cy.get('span[class="roboto-header-text-6 float-right"]', { timeout: 20000 }).invoke('text')
            .then((text) => { expect(text).to.eq(product.price + '.00') })//check : really only one item in the cart

        cy.get('button[class="cart-remove-button pull-right"]', { timeout: 20000 })
            .click()//remove product from the cart
        cy.get('div[class="your-cart-is-empty"]', { timeout: 20000 }).should('exist')//check : if the product is removed
    })

});
