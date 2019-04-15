const apikey = Cypress.env('apiKey1');
let limitOrderId;
let singleLO;
//--Preparation--//
it('autorized user1 check BTC balance', function() {
    
    cy
    .request({
     url: '/wallets', // check balance for reserved amount
     headers: {'api-key': apikey},
    failOnStatusCode: false
    })    
    .then((wallets) => {
        expect(wallets.status).to.eq(200);
        wallets.body.forEach(asset => {
        if ( asset.AssetId ==='BTC' && asset.Reserved > 0) //if there are placed orders that reserve some amount
        {
        cy
        .request({
            url: '/Orders', // cancell all orders
            method: 'DELETE',
            headers: {'api-key': apikey},    
        })
        .then((orders) => {
        expect(orders.status).to.eq(200)}) //unnecessary. just flag
        }
   
   // if (asset.AssetId ==='BTC'){ expect(asset.Reserved).to.eq(0) }
        })
    })      
})

//--Single limit order placement test--//
it('nn', function() {
    cy.fixture('singleLO').then((data) => {singleLO = data})
})

it('autorized user1 place LO BTCUSD Sell', function() {
    
    cy
    .request({
     url: '/orders/v2/limit', // place limit order
     headers: {'api-key': apikey},
     method: 'POST',
     body: singleLO
    })    
    .then((limit) => {
        expect(limit.status).to.eq(200);
        expect(limit.body).to.have.property('Id');
        limitOrderId = limit.body.Id;
        
        cy.request('/orderbooks');
        cy.request('/orderbooks'); 
        cy.request('/orderbooks'); // wait ~2-3 sec
        cy.request({
            url: '/orders/'+limitOrderId, //check limit order info  by ID
            headers: {'api-key': apikey},
        })
        .then((ordersbyid) => {expect(ordersbyid.status).to.eq(200);
            expect(ordersbyid.body).to.have.property('Id').eq(limitOrderId);
            expect(ordersbyid.body).to.have.property('Status').eq('Placed'); //The LO is in orderbook
            expect(ordersbyid.body).to.have.property('AssetPairId').eq(singleLO.AssetPairId); //The assetpair is correct
            expect(ordersbyid.body).to.have.property('Price').eq(singleLO.Price);//The price is correct
            if (singleLO.OrderAction === 'Sell') {expect(ordersbyid.body).to.have.property('Volume').eq(-singleLO.Volume)} //The volume and direction is correct
        })
    })

    //--Checking if balance is reserved by the placed order--//                    
    cy
    .request({
        url: '/wallets', // check balance for reserved amount
        headers: {'api-key': apikey},
        failOnStatusCode: false
    })
    .then((wallets) => {
        expect(wallets.status).to.eq(200);
        wallets.body.forEach(asset => {
        if (asset.AssetId ==='BTC'){ expect(asset.Reserved).to.eq(singleLO.Volume) } 
        }) 
    })                    
})

//--The single limit order cancelation test--//
it('autorized user1 cancel the LO', function() {
    cy
    .request({
        url: '/Orders/'+limitOrderId, // cancell the order
        method: 'DELETE',
        headers: {'api-key': apikey},
    })
    .then((orders) => {
        expect(orders.status).to.eq(200)
    })
        
    cy
    .request({
            url: '/wallets', // check balance for reserved amount
            headers: {'api-key': apikey},
            failOnStatusCode: false
    })
    .then((wallets) => {
        expect(wallets.status).to.eq(200);
         wallets.body.forEach(asset => {
         if (asset.AssetId ==='BTC'){ expect(asset.Reserved).to.eq(0) }//Should be 0
        })
    })      
}) 