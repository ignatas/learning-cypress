import pageCart from "../../pageObjects/pageCart"
import pageProduct from "../../pageObjects/pageProduct"
import pageSearch from "../../pageObjects/pageSearch"
import Chance from 'chance'
let product
function formatPrice(price) {
    price = price.substring(1, price.indexOf('.') + 3).replace(',', '')
}

describe('task3 - change product quantity in the cart', () => {
    before('preparation : add random product to cart', () => {
        cy.clearCookies()

        cy.getProductsList().then(products => {
            products = products.filter(product => (product.images.length == 1))
            product = products[0] //Chance().pickone(products) // - hardcoded to 100% pass
            cy.log(product.url + '[ is selected](http:/e.com)')
            pageSearch.searchProductAPI(product.display_name) //jet search results by api directly
            pageSearch.pickProductFromSearchResultsByUrl(product.url) // check if the product is in the results and pick
        })

        pageProduct.clickBuy()
    })

    it('positive : product qnt change', () => {

        cy.log(`[GIVEN : ${product.display_name} - product is added to the cart](http:/e.com)`)
        pageCart.getItemQuantityDropdown(product.url).should('exist')
        pageCart.getProductQuantity(product.url).then((quantity) => { expect(quantity).to.eq("1") })//check : the only one item in the cart

        cy.log('[WHEN : user changes product quantity](http:/e.com)')
        pageCart.getItemQuantityDropdown(product.url).then((selector) => {
            let productQuantity = Chance().integer({ min: 1, max: selector[0].length })
            pageCart.setProductQuantity(product.url, productQuantity)//change qty

            cy.log('[THEN : Total price is changed as product_price * product_quantity](http:/e.com)')
            pageCart.openCartPage()
            pageCart.getProductPrice(product.url).then((productPrice) => {
                pageCart.getTotalPrice().then((totalPrice) => {
                   productPrice = formatPrice(productPrice)
                   totalPrice = formatPrice(totalPrice)
                    // check : the total price is correct after quanity change
                    expect((productQuantity * productPrice).toFixed(2)).to.eq((totalPrice * 1).toFixed(2))
                })
            })
        })
    })

    after('cleaning', () => {        
       pageCart.removeProduct(product.url) //clear the cart for new test              
    })
})
