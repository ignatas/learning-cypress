it('unautorized', function() {
    cy
    .request({
     url: '/wallets',
    failOnStatusCode: false
    })
    
    .then((response) => {
    expect(response.status).to.eq(401);
    
   })      
  })

  it('unautorized - wrong token', function() {
    cy
    .request({
     url: '/wallets',
     headers: {'api-key': 'somerandomkey'},
    failOnStatusCode: false
    })
    
    .then((response) => {
    expect(response.status).to.eq(401);
    
   })      
  })

  it('autorized user1', function() {
    cy
    .request({
     url: '/wallets',
     headers: {'api-key': 'a18a2544-c6fb-4877-be5a-3fdad40819fd'},
    failOnStatusCode: false
    })
    
    .then((response) => {
    expect(response.status).to.eq(200);
    })      
  })