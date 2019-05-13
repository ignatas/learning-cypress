import pageSearch from "../../pageObjects/pageSearch"
import Chance from 'chance'

describe('task1 - find random product', () => {
    before(() => {
        cy.clearCookies()
    })

    it('positive : search the existing product', () => {
        cy.getProductsList().then(products => {
            let product = Chance().pickone(products)
            cy.log(product.url)
            pageSearch.openSearchPage()  //visit the page                  
            pageSearch.searchProductUI(product.display_name)  //open search and type product name
            pageSearch.getProductByUrl(product.url).should('exist')  // check if the product is in the results                
        })
    })
})