import Chance from 'chance'
import pageShop from "../../support/Objects/pageShop"
import pageCart from "../../support/Objects/pageCart"
import commonPageActions from "../../support/Objects/commonPageActions"
import pageSearch from '../../support/Objects/pageSearch';


before('preparation : add random product to cart', () => {
    /*/cleaning test data if exist
    cy.visit('https://store.google.com/us/cart?hl=en-US')

    pageCart.removeProduct() //clear the cart for new test
        .should('exist')//check : if the product is removed
    cy.log('The cart is cleaned')*/

    commonPageActions.pickRandomProduct()
    commonPageActions.addProductToCart()
    //cy.wait(1000)

})

it('positive : product qnt change', () => {

    pageCart.getProductQuantity().then((text) => { expect(text).to.eq("1") })//check : the only one item in the cart

    pageCart.getTotalPrice().then((totalPrice) => {
        pageCart.getProductPrice().then((productPrice) => {
            expect(totalPrice).to.eq(productPrice)
        })
    })//check : the total price is correct

    pageCart.setProductQuantity()//change qty
let a =pageCart.getProductQuantity()
console.log(a)
})

after('cleaning', () => {
    //postprocessing ------------------------------------------------------------
    
    cy.visit('https://store.google.com/us/cart?hl=en-US')
    pageCart.removeProduct() //clear the cart for new test
        .should('exist')//check : if the product is removed
})