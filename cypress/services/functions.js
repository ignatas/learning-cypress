export const getProductsList = () => {
    cy.request('https://storage.googleapis.com/mannequin/2018/data/productwall/accessories/en_us.json').then(response => {
        let products = response.body.products
        products = products.filter(product => (product.display_name.indexOf(' -') == -1))
        return products
    })
}