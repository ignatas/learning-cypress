import CartPage from "../../pageObjects/cart-page"
import ProductPage from "../../pageObjects/product-page"
import SearchPage from "../../pageObjects/search-page"
import Chance from 'chance'
let product

describe('task3 - change product quantity in the cart', () => {
    before('preparation : add random product to cart', () => {
        cy.clearCookies()

        cy.getProductsList().then(products => {
            products = products.filter(product => (product.images.length == 1))
            product = products[0] //Chance().pickone(products) // - hardcoded to 100% pass
            cy.log(`[${product.url} + is selected](http://e.com)`)
            SearchPage.openSearchResults(product.display_name) //jet search results by api directly
            // check if the product is in the results and pick the product
            SearchPage.pickProductFromSearchResultsByUrl(product.url)
        })
        //add product to the cart
        ProductPage.clickBuy()
    })

    it('positive : product qnt change', () => {

        cy.log(`[GIVEN : ${product.display_name} - product is added to the cart](http:/e.com)`)
        //check : only one item in the cart
        CartPage.getItemQuantityDropdown(product.url).should('exist')
        CartPage.getProductQuantity(product.url).then((quantity) => { expect(quantity).to.eq("1") })

        cy.log('[WHEN : user changes product quantity](http://e.com)')
        CartPage.getMaxProductQuantity(product.url).then((maxQuantity) => {

            let productQuantity = Chance().integer({ min: 1, max: maxQuantity })
            cy.log(`[quantity selected as ${productQuantity} from ${maxQuantity}](http://e.com)`)
            CartPage.setProductQuantity(product.url, productQuantity)//change qty

            cy.log('[THEN : Total price is changed as product_price * product_quantity](http:/e.com)')
            CartPage.openCartPage()
            CartPage.getProductPrice(product.url).then((productPrice) => {
                CartPage.getTotalPrice().then((totalPrice) => {
                    cy.log(`[Product price = ${productPrice}](http://e.com)`)
                    cy.log(`[Total price = ${totalPrice}](http://e.com)`)
                    cy.log('[check : the total price is correct after quanity change](http://e.com)')
                    expect((productQuantity * productPrice).toFixed(2)).to.eq((totalPrice * 1).toFixed(2))
                })
            })
        })
    })

    after('cleaning', () => {
        //clear the cart for new test
        CartPage.removeProduct(product.url)
    })
})
