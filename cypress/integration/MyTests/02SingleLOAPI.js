//is service alive at all?

before('successfully loads', function () {
    cy.isAlive()
        .then((alive) => {
            expect(alive.status).to.eq(200)
            expect(alive.body).to.have.property('isDebug').eq(false)
        })
})
const apikey = Cypress.env('apiKey1'); // <-- User1 autorization token is loaded
let limitOrderId;
let singleLO;
let retryDuration = 0;
//making single limit order
describe('Checking single LO post', function () {

    //--Preparation--//
    before('user1 - check BTC balance', function () {
        cy.fixture('singleLO').then((data) => { singleLO = data });
        //--clearing the environment if necessary--//
        cy.getWallets(apikey)
            .then((wallets) => {
                let asset = wallets.body.filter(a => a.AssetId == 'BTC');
                expect(asset.length).to.eq(1)
                expect(asset[0].Balance).to.be.greaterThan(singleLO.Volume) //there is enough balance to place the order
                if (asset[0].Reserved > 0) { cy.killAllOrders(apikey) }
            })
    })

    //--Single limit order placement test--//
    it('user1 - place LO BTCUSD Sell', function () {

        cy.postLO(apikey, singleLO)
            .then((limit) => {
                expect(limit.status).to.eq(200);
                expect(limit.body).to.have.property('Id');
                limitOrderId = limit.body.Id;
                waitFor()
                cy.fixture('response').then((get) => {
                    expect(get.status).to.eq(200)
                    expect(get.body).to.have.property('Id').eq(limitOrderId);
                    expect(get.body).to.have.property('Status').eq('Placed'); //The LO is cancelled
                    expect(get.body).to.have.property('AssetPairId').eq(singleLO.AssetPairId); //The assetpair is correct
                    expect(get.body).to.have.property('Price').eq(singleLO.Price);//The price is correct
                    if (singleLO.OrderAction === 'Sell') { expect(get.body).to.have.property('Volume').eq(-singleLO.Volume) } //The volume and direction is correct 
                    });
            })
        //--Checking LO info--//

        function waitFor() { // wait ~2-3 sec
            cy.getById(apikey, limitOrderId)
                .then((ordersbyid) => {
                    retryDuration = retryDuration + parseInt(ordersbyid.duration);
                    if (ordersbyid.status === 404) { expect(retryDuration).to.be.lessThan(2000); waitFor() } // <-- added duration check here for less than 1 seconds loop working
                    else {
                        cy.writeFile('/cypress/fixtures/response.json', ordersbyid)
                        return
                    }
                })
        }
        //--Checking if balance is reserved by the placed order--//                    
        cy.getWallets(apikey)
        .then((wallets) => {
            let asset = wallets.body.filter(a => a.AssetId == 'BTC');
            expect(asset.length).to.eq(1)                
            expect(asset[0].Reserved).to.eq(singleLO.Volume) //the balance is reserved by the order
        })
    })
})

//--The single limit order cancelation test--//
describe('Checking single LO cancel', function () {
    before('user1 - cancel the LO', function () {
        cy.cancelById(apikey, limitOrderId)
            .then((cancel) => {
                expect(cancel.status).to.eq(200)
            })
    })
    it('user1 - check if the LO is cancelled', function () {
        cy.getWallets(apikey)
            .then((wallets) => {
                let asset = wallets.body.filter(a => a.AssetId == 'BTC');
                expect(asset.length).to.eq(1)                
                expect(asset[0].Reserved).to.eq(0) //the balance is not reserved by the order
            })
        cy.wait(2000)
        cy.getById(apikey, limitOrderId)
            .then((get) => {
                expect(get.status).to.eq(200)
                expect(get.body).to.have.property('Id').eq(limitOrderId);
                expect(get.body).to.have.property('Status').eq('Cancelled'); //The LO is cancelled
                expect(get.body).to.have.property('AssetPairId').eq(singleLO.AssetPairId); //The assetpair is correct
                expect(get.body).to.have.property('Price').eq(singleLO.Price);//The price is correct
                if (singleLO.OrderAction === 'Sell') { expect(get.body).to.have.property('Volume').eq(-singleLO.Volume) } //The volume and direction is correct
            })
    })
})
