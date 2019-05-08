import productService from "../../services/productService"
import {getProductsList} from "../../services/functions"

describe('task1 - find random product', () => {
    before(() => {
        cy.clearCookies()
    })

    it('positive : search the existing product', () => {
        getProductsList().then(products => {
            let product = Chance().pickone(products)
            cy.log(product.url)
            /*pageSearch.openSearchPage()  //visit the page                  
            pageSearch.searchProductUI(product)  //open search and type product name
            pageSearch.pickProductFromSearchResults(product)  // check if the product is in the results                */
        })
    })

})