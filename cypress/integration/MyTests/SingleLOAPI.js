//is service alive at all?

    before('successfully loads', function () {
        cy.isAlive()
        .should('equal', false);
    })


//does autorization service work?
const apikey = Cypress.env('apiKey1');
describe('Checkinig the autorization service', function () {
    it('unautorized user - no token', function () {
        cy
            .request({
                url: '/wallets',
                failOnStatusCode: false
            })
            .then((response) => {
                expect(response.status).to.eq(401);
            })
    })

    it('unautorized - invalid token', function () {
        cy
            .request({
                url: '/wallets',
                headers: { 'api-key': 'somerandomkey' },
                failOnStatusCode: false
            })
            .then((response) => {
                expect(response.status).to.eq(401);
            })
    })

    it('autorized user - valid token', function () {
        cy
            .request({
                url: '/wallets',
                headers: { 'api-key': apikey },
                failOnStatusCode: false
            })
            .then((response) => {
                expect(response.status).to.eq(200);
            })
    })
})

//making single limit order
describe('Checking single LO', function () {
    
    let limitOrderId;
    let singleLO;
    let retryDuration = 0;

    //--Preparation--//
    before('autorized user1 check BTC balance', function () {
        cy.fixture('singleLO').then((data) => { singleLO = data });
        cy
            .request({
                url: '/wallets', // check balance for reserved amount
                headers: { 'api-key': apikey },
                failOnStatusCode: false
            })
            .then((wallets) => {
                expect(wallets.status).to.eq(200);
                wallets.body.forEach(asset => {
                    if (asset.AssetId === 'BTC' && asset.Reserved > 0) //if there are placed orders that reserve some amount
                    {
                        cy
                            .request({
                                url: '/Orders', // cancell all orders
                                method: 'DELETE',
                                headers: { 'api-key': apikey },
                            })
                            .then((orders) => {
                                expect(orders.status).to.eq(200)
                            }) //unnecessary. just flag
                    }
                    // if (asset.AssetId ==='BTC'){ expect(asset.Reserved).to.eq(0) }
                })
            })
    })

    //--Single limit order placement test--//
    it('autorized user1 place LO BTCUSD Sell', function () {

        cy
            .request({
                url: '/orders/v2/limit', // place limit order
                headers: { 'api-key': apikey },
                method: 'POST',
                body: singleLO
            })
            .then((limit) => {
                expect(limit.status).to.eq(200);
                expect(limit.body).to.have.property('Id');
                limitOrderId = limit.body.Id;
                waitFor()
            })
        //--Checking LO info--//

        function waitFor() { // wait ~2-3 sec
            cy.request({
                url: '/orders/' + limitOrderId, //check limit order info  by ID
                headers: { 'api-key': apikey },
                failOnStatusCode: false
            })
                .then((ordersbyid) => {
                    retryDuration = retryDuration + parseInt(ordersbyid.duration);
                    if (ordersbyid.status === 404) { expect(retryDuration).to.be.lessThan(1000); waitFor() } // <-- added duration check here for less than 1 seconds loop working
                    else {
                        expect(ordersbyid.status).to.eq(200);
                        expect(ordersbyid.body).to.have.property('Id').eq(limitOrderId);
                        expect(ordersbyid.body).to.have.property('Status').eq('Placed'); //The LO is in orderbook
                        expect(ordersbyid.body).to.have.property('AssetPairId').eq(singleLO.AssetPairId); //The assetpair is correct
                        expect(ordersbyid.body).to.have.property('Price').eq(singleLO.Price);//The price is correct
                        if (singleLO.OrderAction === 'Sell') { expect(ordersbyid.body).to.have.property('Volume').eq(-singleLO.Volume) } //The volume and direction is correct
                        return
                    }
                })
        }
        //--Checking if balance is reserved by the placed order--//                    
        cy
            .request({
                url: '/wallets', // check balance for reserved amount
                headers: { 'api-key': apikey },
                failOnStatusCode: false
            })
            .then((wallets) => {
                expect(wallets.status).to.eq(200);
                wallets.body.forEach(asset => {
                    if (asset.AssetId === 'BTC') { expect(asset.Reserved).to.eq(singleLO.Volume) }
                })
            })
    })

    //--The single limit order cancelation test--//
    it('autorized user1 cancel the LO', function () {
        cy
            .request({
                url: '/Orders/' + limitOrderId, // cancell the order
                method: 'DELETE',
                headers: { 'api-key': apikey },
            })
            .then((orders) => {
                expect(orders.status).to.eq(200)
            })

        cy
            .request({
                url: '/wallets', // check balance for reserved amount
                headers: { 'api-key': apikey },
                failOnStatusCode: false
            })
            .then((wallets) => {
                expect(wallets.status).to.eq(200);
                wallets.body.forEach(asset => {
                    if (asset.AssetId === 'BTC') { expect(asset.Reserved).to.eq(0) }//Should be 0
                })
            })
    })
})