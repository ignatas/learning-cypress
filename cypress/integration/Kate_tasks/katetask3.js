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

        pageProduct.addProductToCart()
        cy.wait(Cypress.env("wait")) //wait for serverside cart update

    })

    it('positive : product qnt change', () => {

        cy.log('GIVEN : random product is added to the cart')
        pageCart.getProductQuantity().then((quantity) => { expect(quantity).to.eq("1") })//check : the only one item in the cart

        cy.log('WHEN : user changes product quantity')
        cy.get('select[class="item-qty-selector"]').then((selector) => {
            let qty = Chance().integer({ min: 1, max: selector[0].length })
            pageCart.setProductQuantity(qty)//change qty
        })

        cy.wait(Cypress.env("wait")) //wait for serverside cart update

        cy.log('THEN : Total price is changed as product_price * product_quantity')
        pageCart.openCartPage()
        pageCart.getProductQuantity().then((productQuantity) => {
            let cart = {
                "quantity": 0,
                "singleProductPrice": 0,
                "totalPrice": 0
            }
            cart.quantity = productQuantity
            pageCart.getProductPrice().then((productPrice) => {
                cart.singleProductPrice = productPrice
                pageCart.getTotalPrice().then((totalPrice) => {
                    cart.totalPrice = totalPrice
                    cart.singleProductPrice = cart.singleProductPrice.substring(1, cart.singleProductPrice.indexOf('.') + 3).replace(',', '')
                    cart.totalPrice = cart.totalPrice.substring(1, cart.totalPrice.indexOf('.') + 3).replace(',', '')
                    expect((cart.quantity * cart.singleProductPrice).toFixed(2)).to.eq((cart.totalPrice * 1).toFixed(2)) //check : the total price is correct after quanity change
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
