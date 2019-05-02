import Chance from 'chance'
import pageShop from "../../support/Objects/pageShop"
import pageCart from "../../support/Objects/pageCart"
import commonPageActions from "../../support/Objects/commonPageActions"

let product = [
    {
        "name": "Google Pixel Buds",
        "url": "/product/google_pixel_buds",
        "description": "add to cart - product with color selection",
        "price": "",
        "colors": ["Just Black", "Clearly White"]
    },
    {
        "name": "Google Pixel Stand",
        "url": "/product/pixel_stand",
        "description": "add to cart - product without color selection",
        "price": "",
        "colors": ["White"]
    }
]; //hardcoded 2 test cases

product.forEach(product => {
    it('positive : ' + product.description, () => {
        cy.visit(`${commonPageActions.storeUrl}/collection/accessories_wall`)

        pageShop.selectProductByName(product).click()

        commonPageActions.getProductPrice().then((text) => { product.price = text })//save the price

        commonPageActions.addProductToCart() //buy the product

        if (product.colors.length > 1) //additional steps for multiple colors
        {
            let color = chance.pickone(product.colors)
            pageShop.selectProductColor(color).click()
            pageCart.getProductColor(color).should('exist')//check: the color is correct
        }

        pageCart.getProductPrice().then((text) => { expect(text).to.eq(product.price + '.00') })//check : the product price is correct

        pageCart.getProductQuantity().then((text) => { expect(text).to.eq("1") })//check : the only one item in the cart

        pageCart.getTotalPrice().then((text) => { expect(text).to.eq(product.price + '.00') })//check : the total price is correct

    })
    after('cleaning', () => {
        //postprocessing ------------------------------------------------------------
        pageCart.removeProduct() //clear the cart for new test
            .should('exist')//check : if the product is removed
    })
});
