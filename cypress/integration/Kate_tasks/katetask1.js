import Chance from 'chance'
describe('task1', () => {
    let product ='';
    before('', () => {
        cy.request('https://storage.googleapis.com/mannequin/2018/data/productwall/accessories/en_us.json')
            .then((response) => {
                let number = Chance().integer({ min: 0, max: response.body.products.length }) //random product #
                product = response.body.products[number].display_name
                if (product.indexOf(' -') >0){product = product.substring(0,product.indexOf(' -'))}
            })
    })



    it('', () => {
        cy.visit('store.google.com/us/?hl=en-US&countryRedirect=true')
        cy.get('.header-search-icon > .highlightable > svg')
            .click()
        cy.get('.quantumWizAutocompleteInputText')
            .type(product + '{enter}')
        cy.get(':nth-child(1) > .card-link-target > .card-inner')
        .should('exist')

    })

})