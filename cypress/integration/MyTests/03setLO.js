it('autorized user1 check BTC balance', function() {
    cy
    .request({
     url: '/wallets',
     headers: {'api-key': 'a18a2544-c6fb-4877-be5a-3fdad40819fd'},
    failOnStatusCode: false
    })
    
    .then((response) => {
    expect(response.status).to.eq(200);
    response.body.forEach(asset => {
    if (asset.AssetId ==='BTC'){ expect(asset.Reserved).to.eq(0) }
    else {
        cy.request({
            url: '/Orders',
            method: 'DELETE',
            headers: {'api-key': 'a18a2544-c6fb-4877-be5a-3fdad40819fd'},
    
        })
    }
   })
    })      
  })