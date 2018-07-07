Page = {
    web3: null,
    receiver: '0xcB3e301286b897f56C97932f62c20980BC62B74B',
    amount: 0,

    init: function() {
        if(ETHPay == null || ETHPay == undefined ) {
            console.error("ETHPay not found, you should import ethpay script")
        } else {
            Page.bindEvents();
        }
    },

    bindEvents: function(){
        document.getElementById("btnBuy").onclick = Page.buyEventHandler;
    },

    processBasedMetaMaskState: function( state ) {
        if( state == 0) {
            window.location = '/install_metamask.html'
        } else if( state == 1) {
            window.location = '/locked.html'
        } else if(state == 2) {
            window.location = '/bind.html'
        } else {

        }
    },

    buyEventHandler: function(event) {
        event.preventDefault();

        ETHPay.web3.eth.getAccounts(function(err, accounts){

            console.log(accounts)

            if(err) return;

            // 交易
            var txObj = {
                from: accounts[0],
                to: Page.receiver,
                value: '1000000000000000' // ETHPay.web3.utils.toWei(String(Page.amount), "ether"),
                // gas: 2000000
            }

            // using the event emitter
            // ETHPay.web3.eth.sendTransaction({
            //     from: '0x7afBa8766d1E561928EacF0C06d2b3D989D57C1b',
            //     to: '0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe',
            //     value: '1000000000000000'
            // })

            ETHPay.web3.eth.sendTransaction(txObj)
            .on('transactionHash', function(hash){
                console.log('Tell me the transaction')
                console.log(hash)
            })
            .on('receipt', function(receipt){
                console.log('receipt')
                console.log(receipt)
            })
            .on('confirmation', function(confirmationNumber, receipt){ 
                console.log('confirmation')
                console.log(receipt) 
            })
            .on('error', console.error); // If a out of gas error, the second parameter is the receipt.
        })
        
    }
}

Page.init();