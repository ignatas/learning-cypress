import SearchPage from "../../pageObjects/SearchPage"
import Chance from 'chance'

describe('task1 - find random product', () => {
    before(() => {
        cy.clearCookies()
    })

    it('positive : search the existing product', () => {
        cy.getProductsList().then(products => {
            let product = Chance().pickone(products)
            cy.log(product.url)
            SearchPage.openSearchPage()  //visit the page                  
            SearchPage.searchProductUI(product.display_name)  //open search and type product name
            SearchPage.getProductByUrl(product.url).should('exist')  // check if the product is in the results                
        })
    })
})