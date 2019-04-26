import Chance from 'chance'
describe('task1', () => {
    let product = {
        "name": "",
        "url": ""
    };
    before('', () => {
        cy.request('https://storage.googleapis.com/mannequin/2018/data/productwall/accessories/en_us.json')
            .then((response) => {
                let number = Chance().integer({ min: 0, max: response.body.products.length }) //random product #
                product.name = response.body.products[number].display_name
                product.url = response.body.products[number].url
                if (product.name.indexOf(' -') > 0) { product.name = product.name.substring(0, product.name.indexOf(' -')) }
            })
    })

    it('positive : search the existing product', () => {
        cy.visit('store.google.com/us/?hl=en-US&countryRedirect=true')
        cy.get('.header-search-icon > .highlightable > svg', { timeout: 20000 })
            .click()
        cy.get('.quantumWizAutocompleteInputText')
            .type(product.name + '{enter}')
        // check if the product is really found
        cy.get('input[value="' + product.url + '"]', { timeout: 20000 }).should('exist')
    })

})