import Chance from 'chance'
import pageSearch from '../pageObjects/pageSearch'

class productService {
    get storeUrl() { return Cypress.env('storeUrl') }
    get productsURL() { return Cypress.env('productsUrl') }

    getProductsList() {
        return cy.request('https://storage.googleapis.com/mannequin/2018/data/productwall/accessories/en_us.json')
    }

    pickRandomProduct(options) {
        let product
        switch (options) {
            case 'test1': {
                this.getProductsList().then(response => {
                    let products = response.body.products
                    products = products.filter(product => (product.display_name.indexOf(' -') == -1))
                    product = Chance().pickone(products)
                    cy.log(product.url)
                    pageSearch.openSearchPage()  //visit the page                  
                    pageSearch.searchProductUI(product)  //open search and type product name
                    pageSearch.pickProductFromSearchResults(product)  // check if the product is in the results                
                })
            }; break;

            case 'test2': { cy.log('ERROR: no data for test2') }; break;

            case 'test3': {
                this.getProductsList().then(response => {
                    let products = response.body.products
                    products = products.filter(product => ((product.images.length == 1) && (product.display_name.indexOf(' -') == -1)))
                    product = Chance().pickone(products)
                    cy.log(product.url)
                    this.searchProductAPI(product) //jet search results by api directly
                    pageSearch.pickProductFromSearchResults(product) // check if the product is in the results and pick                    
                })
            }; break;

            default: { cy.log('available options test1,test3') }; break;

        }
    }

    searchProductAPI(product) { //find out how to work with json object here
        cy.visit(`${this.storeUrl}/search?q=${product.display_name}&hl=en-US`)
    }

} export default new productService()