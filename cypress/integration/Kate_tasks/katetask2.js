import Chance from 'chance'
let product = [
    {
        "productName": "google_pixel_buds",
        "description": "add to cart - product with color selection", //button primary transaction
        "price": ""
    },
    {
        "productName": "pixel_stand",
        "description": "add to cart - product without color selection", //primary transaction button
        "price": ""
    }
]; //hardcoded 2 test cases

product.forEach(product => {
    it('positive : ' + product.description, () => {
        cy.visit('https://store.google.com/us/collection/accessories_wall')
        cy.get('a[ng-href="/product/' + product.productName + '"]', { timeout: 20000 }).click()

        cy.get('div[class="bar-component price-and-button-container"]', { timeout: 20000 })
            .find('span[class="is-price"]')// find element with product price
            .invoke('text').then((text) => { product.price = text })//save the price

        cy.get('div[class="bar-component price-and-button-container"]', { timeout: 20000 }).
            find('span[class="button-text"]').click() //buy the product

        if (product.description == "add to cart - product with color selection") //пкоа не придумал условие на цвет
        {
            cy.get(':nth-child(' + Chance().integer({ min: 1, max: 2 }) + ') > .mqn-lobby-swatch__card__inner > .mqn-lobby-swatch__card__meta > .mqn-lobby-swatch__card__buttons > .mqn-button', { timeout: 20000 }).click()
        }

        cy.get('div[class="cart-price-bottom-padding text-right"]', { timeout: 20000 }).invoke('text')
            .then((text) => { expect(text).to.eq(product.price + '.00') })//check : the product in the cart
        cy.get('span[class="roboto-header-text-6 float-right"]', { timeout: 20000 }).invoke('text')
            .then((text) => { expect(text).to.eq(product.price + '.00') })//check : the only one item in the cart
        cy.get('button[class="cart-remove-button pull-right"]', { timeout: 20000 })
            .click()//remove product from the cart
        cy.get('div[class="your-cart-is-empty"]', { timeout: 20000 }).should('exist')//check : if the product is removed
    })

});
