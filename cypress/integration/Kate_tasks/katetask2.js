import pageCart from "../../pageObjects/pageCart"
import pageProduct from "../../pageObjects/pageProduct"
import productService from "../../services/productService"
import pageSearch from "../../pageObjects/pageSearch"

describe('task2 - add product to cart', () => {
    let product = [
        {
            "display_name": "Bellroy Pixelbook Pen Clip",
            "url": "/product/bellroy_pixelbook_pen_clip",
            "description": "add to cart - product with color selection",
            "price": "",
            "colors": ["Black", "Caramel"]
        },
        {
            "display_name": "Google Pixel Stand",
            "url": "/product/pixel_stand",
            "description": "add to cart - product without color selection",
            "price": "",
            "colors": ["White"]
        }
    ]; //hardcoded 2 test cases

    beforeEach(() => { cy.clearCookies() })

    product.forEach(product => {
        it('positive : ' + product.description, () => {
            cy.log('GIVEN : product' + product)

            productService.searchProductAPI(product)
            cy.log('WHEN : User buys the product')
            pageSearch.pickProductFromSearchResults(product)

            pageProduct.getProductPrice().then((text) => { product.price = text })//save the price

            pageProduct.addProductToCart() //buy the product

            if (product.colors.length > 1) //additional steps for multiple colors
            {                
                cy.log('Product with color selection')
                let color = chance.pickone(product.colors)
                cy.log(color)
                cy.wait(5000)
                pageProduct.selectProductColor(color)
                pageCart.getProductColor(color).should('exist')//check: the color is correct
            }
            else {cy.log('Product without color selection')}
            cy.log('THEN : The product is added to the cart')
            pageCart.getProductPrice().then((text) => { expect(text).to.eq(product.price + '.00') })//check : the product price is correct

            pageCart.getProductQuantity().then((text) => { expect(text).to.eq("1") })//check : the only one item in the cart

            pageCart.getTotalPrice().then((text) => { expect(text).to.eq(product.price + '.00') })//check : the total price is correct

        })
    });

    afterEach('cleaning', () => {
        cy.clearCookies()
    })
})