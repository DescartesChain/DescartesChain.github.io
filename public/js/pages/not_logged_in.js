Page = {

    isProcessing: false,
    currentUser: null,

    init: function(api_server) {
        Page.api_server = api_server;

        var jqxhr = $.ajax({
            type: "get",
            url:  api_server +  '/profile',
            data: {
                token: token
            }
        })
    
        // 添加成功，重新加载数据
        jqxhr.done(function(data){
            Page.currentUser = data;

            if(ETHPay == null || ETHPay == undefined ) {
                console.error("ETHPay not found, you should import ethpay script")
            } else {
                ETHPay.checkMetaMaskState(Page.processBasedMetaMaskState)
            }
        })
        
        jqxhr.fail(function(error){
            window.location = "/signin"
        })
    },


    processBasedMetaMaskState: function( state ) {
        if( state == 0) {
            window.location = '/not-installed'
        } else if( state == 1) {
            ETHPay.web3.currentProvider.publicConfigStore.on('update', Page.metamaskUpdateHandler);
        } else if(state == 2) {
            window.location = '/binding'
        }
    },

    metamaskUpdateHandler: function(data) {
        // 监测用户状态
        if(data.selectedAddress != null && Page.isProcessing == false) {
            isProcessing = true;

            var alreadyBinded = false;

            console.log(Page.currentUser)

            if(Page.currentUser.wallet) {
                Page.currentUser.wallet.forEach(function(account) {
                    if(account == data.selectedAddress) {
                      alreadyBinded = true;  
                    } 
                });
    
                if(alreadyBinded) {
                    window.location = '/cart'
                } else {
                    window.location = '/binding'
                }
            } else {
                window.location = '/binding'
            }
        }
    },


}


$(document).ready( function(){ Page.init( api_server ); })