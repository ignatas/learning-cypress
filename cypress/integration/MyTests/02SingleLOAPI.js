let apikey; // <-- User1 autorization token is LimitOrderaded
let limitOrderId;
let sellLimitOrder;
let retryDuration = 0;
//is service alive at all?
before('successfully LimitOrderads', function () {
    cy.isAlive()
        .then((alive) => {
            expect(alive.status).to.eq(200)
            expect(alive.body).to.have.property('isDebug').eq(false)
        })
    cy.fixture('users').then((data) => { apikey = data[0].apikey })// <-- User1 autorization token is loaded
    cy.fixture('sellLimitOrder').then((data) => { sellLimitOrder = data })// <-- Limit Order request body is loaded
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
                expect(asset[0].Balance).to.be.greaterThan(sellLimitOrder.Volume) //there is enough balance to place the order
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
                //cy.fixture('getOrderByIdResponse'). 
                .then((get) => { // <- works
                    expect(get.status).to.eq(200)
                    expect(get.body).to.have.property('Id').eq(limitOrderId);
                    expect(get.body).to.have.property('Status').eq('Placed'); //The LimitOrder is cancelled
                    expect(get.body).to.have.property('AssetPairId').eq(sellLimitOrder.AssetPairId); //The assetpair is correct
                    expect(get.body).to.have.property('Price').eq(sellLimitOrder.Price);//The price is correct
                    if (sellLimitOrder.OrderAction === 'Sell') { expect(get.body).to.have.property('Volume').eq(-sellLimitOrder.Volume) } //The volume and direction is correct 
                });
            })
        //--Checking LimitOrder info--//


        //--Checking if balance is reserved by the placed order--//                    
        cy.getWallets(apikey)
            .then((wallets) => {
                let asset = wallets.body.filter(a => a.AssetId == 'BTC');
                expect(asset.length).to.eq(1)
                expect(asset[0].Reserved).to.eq(sellLimitOrder.Volume) //the balance is reserved by the order
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
                expect(asset[0].Reserved).to.eq(0) //the balance is not reserved by the order
            })
        cy.wait(3000)
        cy.getOrderById(apikey, limitOrderId)
        //cy.fixture('getOrderByIdResponse').
        .then((get) => {
            expect(get.status).to.eq(200)
            expect(get.body).to.have.property('Id').eq(limitOrderId);
            expect(get.body).to.have.property('Status').eq('Cancelled'); //The LimitOrder is cancelled
            expect(get.body).to.have.property('AssetPairId').eq(sellLimitOrder.AssetPairId); //The assetpair is correct
            expect(get.body).to.have.property('Price').eq(sellLimitOrder.Price);//The price is correct
            if (sellLimitOrder.OrderAction === 'Sell') { expect(get.body).to.have.property('Volume').eq(-sellLimitOrder.Volume) } //The volume and direction is correct
        })
    })
})
