import Chance from 'chance'
import pageShop from "../../support/page"
//import pageColorSelection from "../../support/page"
//import pageCart from "../../support/page"
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

        pageShop.selectProductByName(product.productName).click()

        pageShop.getProductPrice().then((text) => { product.price = text })//save the price

        pageShop.addProductToCart() //buy the product
        
        if (product.colors.length > 1) //additional steps for multiple colors
        {
            let color = chance.pickone(product.colors)
            pageShop.selectProductColor(color).click()
            pageShop.getProductColorFromCart(color).should('exist')//check: the color is correct
        }

        pageShop.getProductPriceFromCart().then((text) => { expect(text).to.eq(product.price + '.00') })//check : the product price is correct

        pageShop.getProductQuantityFromCart().then((text) => { expect(text).to.eq("1") })//check : the only one item in the cart

        pageShop.getTotalPriceFromCart().then((text) => { expect(text).to.eq(product.price + '.00') })//check : the total price is correct
        //postprocessing ------------------------------------------------------------
        pageShop.removeProductFromCart() //clear the cart for new test
            .should('exist')//check : if the product is removed
    })
});
