Page = {
    web3: null,

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

    buyEventHandler: function(event) {
        event.preventDefault();
        ETHPay.checkMetaMaskState(Page.processBasedMetaMaskState)
    },

    processBasedMetaMaskState: function( state ) {
        if( state == 0) {
            window.location = '/install_metamask.html'
        } else if( state == 1) {
            window.location = '/locked.html'
        } else if(state == 2) {
            window.location = '/bind.html'
        } 
    },
}

Page.init();