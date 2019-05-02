import Chance from 'chance'
import pageShop from "../../support/Objects/pageShop"
import pageCart from "../../support/Objects/pageCart"
import commonPageActions from "../../support/Objects/commonPageActions"
//import pageSearch from '../../support/Objects/pageSearch';


before('preparation : add random product to cart', () => {

    commonPageActions.pickRandomProduct()
    commonPageActions.addProductToCart()
    cy.wait(2000)

})

it('positive : product qnt change', () => {

    cy.log('GIVEN : random product is added to the cart')
    pageCart.getProductQuantity().then((quantity) => { expect(quantity).to.eq("1") })//check : the only one item in the cart
    
    cy.log('WHEN : user changes product quantity')
    pageCart.setProductQuantity()//change qty
    cy.visit('https://store.google.com/us/cart?hl=en-US')

    cy.log('THEN : Total price is changed as product_price * product_quantity')
    
    this.getProductQuantity().then((productQuantity) => {
        let cart = {
            "quantity": 0,
            "single": 0,
            "total": 0
        }
        cart.quantity = productQuantity
        this.getProductPrice().then((productPrice) => {
            cart.single = productPrice
            this.getTotalPrice().then((totalPrice) => {
                cart.total = totalPrice
                cart.single = cart.single.substring(1, cart.single.indexOf('.'))
                cart.total = cart.total.substring(1, cart.total.indexOf('.'))
                //if (cart.quantity * cart.single == cart.total) { cy.log('CORRECT'); }
                //else {cy.log('INCORRECT'); expect(0).to.eq(1)}
                expect(cart.quantity * cart.single).to.eq(cart.total)
            })
        })
    })
    //check : the total price is correct after quanity change

})

/*after('cleaning', () => {
    //postprocessing ------------------------------------------------------------    
    cy.visit('https://store.google.com/us/cart?hl=en-US')
    pageCart.removeProduct() //clear the cart for new test
        .should('exist')//check : if the product is removed
})*/
