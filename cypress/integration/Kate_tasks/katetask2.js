import pageCart from "../../pageObjects/pageCart"
import pageProduct from "../../pageObjects/pageProduct"
import pageSearch from "../../pageObjects/pageSearch"
import Chance from 'chance'
let product = [
    {
        "description": "add to cart - product with color selection" // #1 
    },
    {
        "description": "add to cart - product without color selection" // #2
    }
] // 2 testcases hardcode

describe('task2 - add product to cart', () => {

    beforeEach(() => {
        cy.clearCookies()
    })

    product.forEach((product, index) => {
        it('positive : ' + product.description, () => {
            cy.fixture('products')
                .then(products => {
                    product = chance.pickone(products[index])
                    cy.log('GIVEN : product' + product.display_name)
                    cy.searchProductAPI(product)

                    cy.log('WHEN : User buys the product')
                    pageSearch.pickProductFromSearchResults(product)
                    pageProduct.getProductPrice().then((text) => { product.price = text })//save the price

                    let color = chance.pickone(product.colors)
                    cy.log(color)

                    pageProduct.addProductToCart(product, color) //buy the product
                    pageCart.getProductTitle(product).contains(color).should('exist')//check: the color is correct

                    cy.log('THEN : The product is added to the cart')
                    pageCart.getProductPrice().then((text) => { expect(text).to.eq(product.price + '.00') })//check : the product price is correct

                    pageCart.getProductQuantity().then((text) => { expect(text).to.eq("1") })//check : the only one item in the cart

                    pageCart.getTotalPrice().then((text) => { expect(text).to.eq(product.price + '.00') })//check : the total price is correct

                })
        })
    });

    afterEach('cleaning', () => {
        cy.clearCookies()
    })
})