import Chance from 'chance'
class commonPageActions {

    pickRandomProduct() {
        let product = {
            "name": "",
            "url": ""
        };
        cy.request('https://storage.googleapis.com/mannequin/2018/data/productwall/accessories/en_us.json')
            .then((response) => {

                let number = 1// Chance().integer({ min: 0, max: response.body.products.length }) //random product #
                if (response.body.products[number].images.length == 1) {
                    product.name = response.body.products[number].display_name
                    product.url = response.body.products[number].url
                    if (product.name.indexOf(' -') > 0) { product.name = product.name.substring(0, product.name.indexOf(' -')) }
                }
                
                    cy.visit('https://store.google.com/us/search?q=' + product.name + '&hl=en-US')
                    cy.get('div[class="results-container"]').should('be.visible')
                    .contains(product.name)
                    .parent()
                    .click()
               
                //else (this.pickRandomProduct())
            })
        return product
    }

    getProductPrice() {
        return cy.get('div[class="bar-component price-and-button-container"]', { timeout: 20000 })
            .find('span[class="is-price"]', { timeout: 20000 })// find element with product price
            .invoke('text') //take the price
    }

    addProductToCart() {
        cy.get('div[class="bar-component price-and-button-container"]', { timeout: 20000 })
            .contains('Buy')
            .click()
    }

} export default new commonPageActions()

/*
выбрать случайный элемент из апишки без цвета --- пока не умеет определять цвет
выбрать любой случайный элемент из апишки --- закинуть из таска 1

кликнуть на кнопку купить -- добавляет в корзину

*/