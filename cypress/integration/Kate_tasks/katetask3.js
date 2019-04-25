import Chance from 'chance'
import pageShop from "../../support/Objects/pageShop"
import pageCart from "../../support/Objects/pageCart"
import commonPageActions from "../../support/Objects/commonPageActions"

before(()=>{
   let product = commonPageActions.pickRandomProduct
})
it(()=>{
    omfg.addProductToCart()
})