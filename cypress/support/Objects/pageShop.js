import commonPageActions from "../Objects/commonPageActions"

class pageShop /*extends commonPageActions*/ {

    selectProductByName(product) { //Selection from 1st page hardcoded for now
        return cy.get('a[ng-href="' + product.url + '"]', { timeout: 20000 })
    }

    selectProductColor(color) {
        return cy.get('div[class="mqn-lobby-swatch__card__headline ng-binding ng-scope"]', { timeout: 20000 })
            .contains(color)
            .parent().parent().contains('Add to cart')
            //.find('div[class="mqn-button mqn-button--hairline ng-binding ng-scope mdc-ripple-upgraded"]', { timeout: 20000 })
            .click()
    }

} export default new pageShop()