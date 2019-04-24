let product = [
    { "productName": "google_pixel_buds", "description":"add to cart - product with color selection", "price":"" }, //button primary transaction
    { "productName": "pixel_stand", "description":"add to cart - product without color selection", "price":"" } //primary transaction button
]; //hardcoded 2 test cases

product.forEach(product => {
    it('positive : '+product.description, () => {
        cy.visit('https://store.google.com/us/collection/accessories_wall')
        cy.get('a[ng-href="/product/' + product.productName + '"]', { timeout: 5000 }).click()

        cy.get('div[class="bar-component price-and-button-container"]', { timeout: 5000 })
        .find('span[class="is-price"]')// find element with product price
        .invoke('text').then((text)=>{product.price = text})//save the price
        
        cy.get('div[class="bar-component price-and-button-container"]', { timeout: 5000 }).
        find('span[class="button-text"]').click() //buy the product
       
        cy.get('div[class="cart-price-bottom-padding text-right"]', { timeout: 5000 }).invoke('text')
        .then((text)=>{expect(text).to.eq(product.price+'.00')})

    })
    
});
