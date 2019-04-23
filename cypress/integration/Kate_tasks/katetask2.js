let product = [
    { "productName": "google_pixel_buds" },
    { "productName": "pixel_stand" }
]; //hardcoded 2 test cases
product.forEach(element => {
    it('positive : search the existing product', () => {


        cy.visit('https://store.google.com/us/collection/accessories_wall')
        cy.get('a[ng-href="/product/' + element.productName + '"]', { timeout: 20000 }).click()            

        cy.get('button[data-page-id="' + element.productName + '"]', { timeout: 20000 }).click()

        cy.wait(2000)
    })
});
