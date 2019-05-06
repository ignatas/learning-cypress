import productService from "../../services/productService"

describe('task1 - find random product', () => {
    before(() => {
        cy.clearCookies()
    })

    it('positive : search the existing product', () => {
        productService.pickRandomProduct('test1')
    })

})