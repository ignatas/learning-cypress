import Chance from 'chance'
class commonPageActions {
    get storeUrl(){ return Cypress.env('storeUrl')}
    
    pickRandomProduct() {
       // let storeUrl = Cypress.env('storeUrl')
        cy.request('https://storage.googleapis.com/mannequin/2018/data/productwall/accessories/en_us.json')
            .then((response) => {
                let allProducts = response.body.products
                let products = allProducts.filter(product => product.images.length == 1)
                let product = Chance().pickone(products)
                product.display_name = (product.display_name.indexOf(' -') > 0) ? product.display_name.substring(0, product.display_name.indexOf(' -')) : product.display_name

                cy.visit(`${this.storeUrl}/search?q=${product.display_name}&hl=en-US`)
                cy.get(`input[value="${product.url}"]`).should('exist')
                    //.contains(product.url)
                    .parent()
                    .click()
               // return product
            })
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

