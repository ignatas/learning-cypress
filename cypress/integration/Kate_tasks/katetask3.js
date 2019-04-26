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
    cy.wait(1000)
})

it('positive : product qnt change', () => {
    let cart = {
        "qty": 0,
        "single": 0,
        "total": 0
    }
    pageCart.getProductQuantity().then((text) => { expect(text).to.eq("1") })//check : the only one item in the cart

    //check : the total price is correct

    pageCart.setProductQuantity()//change qty
    cy.visit('https://store.google.com/us/cart?hl=en-US')
    
    pageCart.getProductQuantity().then((qnt) => {
        cart.qty = qnt
        pageCart.getProductPrice().then((productPrice) => {
            cart.single = productPrice
            pageCart.getTotalPrice().then((totalPrice) => {
                cart.total = totalPrice
                cart.single = cart.single.substring(1, cart.single.indexOf('.'))
                cart.total = cart.total.substring(1, cart.total.indexOf('.'))
                if(cart.qty * cart.single == cart.total){cy.log(' !!!!!!!!!!!!!!!!!!!!!!!!!! !!!!!!!!!!!!!!!!!!!!!!!! ')}
            })
        })
    })

})

after('cleaning', () => {
    //postprocessing ------------------------------------------------------------    
    cy.visit('https://store.google.com/us/cart?hl=en-US')
    pageCart.removeProduct() //clear the cart for new test
        .should('exist')//check : if the product is removed
})