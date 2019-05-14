let apikey // <-- User1 autorization token
let limitOrderId
let sellLimitOrder

before('successfully LimitOrderads', function () {
    cy.isAlive()//is service alive at all?
    cy.fixture('users').then((data) => { apikey = data[0].apikey })// <-- User1 autorization token is loaded
    cy.fixture('sellLimitOrder').then((data) => {
        sellLimitOrder = data
        cy.log('order data is loaded ==' + data)
    })
})

//making single limit order
describe('Checking single LimitOrder post', function () {

    //--Preparation--//
    before('user1 - check BTC balance', function () {

        //--clearing the environment if necessary--//
        cy.getWallets(apikey)
            .then((wallets) => {
                let asset = wallets.body.filter(a => a.AssetId == 'BTC');
                expect(asset.length).to.eq(1)
                //there is enough balance to place the order
                expect(asset[0].Balance).to.be.greaterThan(sellLimitOrder.Volume)
                cy.log('Available BTC=' + asset[0].Balance)
                cy.log('Reserved BTC=' + asset[0].Reserved)
                if (asset[0].Reserved > 0) { cy.killAllOrders(apikey) }
            })
    })

    //--Single limit order placement test--//
    it('user1 - place LimitOrder BTCUSD Sell', function () {

        cy.postLimitOrder(apikey, sellLimitOrder)
            .then((limit) => {
                expect(limit.status).to.eq(200);
                expect(limit.body).to.have.property('Id');
                limitOrderId = limit.body.Id;
                cy.getOrderById(apikey, limitOrderId)
                    .then((order) => {
                        //--Checking LimitOrder info--//
                        expect(order.status).to.eq(200)
                        expect(order.body).to.have.property('Id').eq(limitOrderId);
                        //The LimitOrder is placed
                        expect(order.body).to.have.property('Status').eq('Placed');
                        //The assetpair is correct
                        expect(order.body).to.have.property('AssetPairId').eq(sellLimitOrder.AssetPairId);
                        //The price is correct
                        expect(order.body).to.have.property('Price').eq(sellLimitOrder.Price);
                        if (sellLimitOrder.OrderAction === 'Sell') {
                            //The volume and direction is correct 
                            expect(order.body).to.have.property('Volume').eq(-sellLimitOrder.Volume)
                        }
                    });
            })

        //--Checking if balance is reserved by the placed order--//                    
        cy.getWallets(apikey)
            .then((wallets) => {
                let asset = wallets.body.filter(asset => asset.AssetId == 'BTC');
                expect(asset.length).to.eq(1)
                //the balance is reserved by the order
                expect(asset[0].Reserved).to.eq(sellLimitOrder.Volume)
                cy.log('Available BTC=' + asset[0].Balance)
                cy.log('Reserved BTC=' + asset[0].Reserved)
            })
    })
})

//--The single limit order cancelation test--//
describe('Checking single LimitOrder cancel', function () {
    before('user1 - cancel the LimitOrder', function () {
        cy.cancelOrderById(apikey, limitOrderId)
            .then((cancel) => {
                expect(cancel.status).to.eq(200)
            })
    })
    it('user1 - check if the LimitOrder is cancelled', function () {
        cy.getWallets(apikey)
            .then((wallets) => {
                let asset = wallets.body.filter(a => a.AssetId == 'BTC');
                expect(asset.length).to.eq(1)
                //the balance is not reserved by the order
                expect(asset[0].Reserved).to.eq(0) //the balance is not reserved by the order
            })
        cy.wait(Cypress.env("wait"))
        cy.getOrderById(apikey, limitOrderId)
            .then((order) => {
                expect(order.status).to.eq(200)
                expect(order.body).to.have.property('Id').eq(limitOrderId);
                //The LimitOrder is cancelled
                expect(order.body).to.have.property('Status').eq('Cancelled');
                //The assetpair is correct
                expect(order.body).to.have.property('AssetPairId').eq(sellLimitOrder.AssetPairId);
                //The price is correct
                expect(order.body).to.have.property('Price').eq(sellLimitOrder.Price);
                if (sellLimitOrder.OrderAction === 'Sell') {
                    //The volume and direction is correct
                    expect(order.body).to.have.property('Volume').eq(-sellLimitOrder.Volume)
                }
            })
    })
})
