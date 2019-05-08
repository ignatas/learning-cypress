import pageCart from "../../pageObjects/pageCart"
import pageProduct from "../../pageObjects/pageProduct"
import pageSearch from "../../pageObjects/pageSearch"
import Chance from 'chance'

describe('task3 - change product quantity in the cart', () => {
    before('preparation : add random product to cart', () => {
        cy.clearCookies()

        cy.getProductsList().then(products => {
            products = products.filter(product => (product.images.length == 1))
            let product = products[0] //Chance().pickone(products) // - hardcoded to 100% pass
            cy.log(product.url)
            cy.searchProductAPI(product) //jet search results by api directly
            pageSearch.pickProductFromSearchResults(product) // check if the product is in the results and pick
        })

        pageProduct.clickBuy()
    })

    it('positive : product qnt change', () => {

        cy.log('GIVEN : random product is added to the cart')
        pageCart.getItemQuantitySelector().should('exist')
        pageCart.getProductQuantity().then((quantity) => { expect(quantity).to.eq("1") })//check : the only one item in the cart

        cy.log('WHEN : user changes product quantity')
        pageCart.getItemQuantitySelector().then((selector) => {
            let productQuantity = Chance().integer({ min: 1, max: selector[0].length })
            pageCart.setProductQuantity(productQuantity)//change qty

            cy.log('THEN : Total price is changed as product_price * product_quantity')
            pageCart.openCartPage()
            pageCart.getProductPrice().then((productPrice) => {
                pageCart.getTotalPrice().then((totalPrice) => {
                    productPrice = productPrice.substring(1, productPrice.indexOf('.') + 3).replace(',', '')
                    totalPrice = totalPrice.substring(1, totalPrice.indexOf('.') + 3).replace(',', '')
                   // check : the total price is correct after quanity change
                    expect((productQuantity * productPrice).toFixed(2)).to.eq((totalPrice * 1).toFixed(2))
                })
            })
        })
    })

    after('cleaning', () => {
        //postprocessing ------------------------------------------------------------    
        pageCart.openCartPage()
        pageCart.removeProduct() //clear the cart for new test              
    })
})
