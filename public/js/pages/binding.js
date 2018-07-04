Page = {

    api_server: null,
    currentAccount: null,
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
            window.location = '/not-logged-in'
        } else if(state == 2) {
            ETHPay.web3.eth.getAccounts(function(err, accounts){
                if(err){
                    alert(err)
                } else {
                    Page.currentAccount = accounts[0]
                    $("#currentAddress").html(accounts[0])
                    Page.bindEvents();
                }
            })
        }
    },

    bindEvents: function() {
        document.getElementById("btnBind").onclick = Page.bindingAccountHandler;
    },

    
    bindingAccountHandler: function(event) {
        event.preventDefault()

        var msgParams = [{
            type: 'string',
            name: 'Descartes Chain Disclaimer',
            value: 'DCAR x1 is different from consumer electronics. It is specially customized according to customer demands. Made for investment products, investors need to be cautious.  If you purchase this product, you will be considered to be an endorsement of this policy. The paid purchase price will not be refunded, except for the case that the mining machine cannot be delivered. Due to market fluctuations, the price of the product may be adjusted at any time after your purchase. We do not accept the responsibility of prior notice and  Variable price compensation.'
        }]
    
        ETHPay.web3.eth.getAccounts(function(err, accounts){
            if(err){

            } else {
                var from = accounts[0]
                var params = [msgParams, from]
                var method = 'eth_signTypedData'
            
                ETHPay.web3.currentProvider.sendAsync({ method, params, from }, function (err, result) {
                    if (err) { 
                        return console.dir(err)
                    }

                    if (result.error) {
                        alert(result.error.message)
                    }

                    if (result.error) { 
                        return console.error(result)
                    }                

                    var jqxhr = $.ajax({
                        type: "GET",
                        url:  '/signContract/' +  result.result
                    })

                    // 添加成功，重新加载数据
                    jqxhr.done(function(data){
                        console.log(data)
                        console.log(from)

                        if (data.toUpperCase() === from.toUpperCase() ) {
                            // 签名成功。
                            Page.addAccountToWallet();
                        } else {
                            // 签名失败
                            alert('Failed to verify signer when comparing ' + result + ' to ' + from)
                        }
                    })

                    jqxhr.fail(function(error){
                        console.log(error.responseJSON.message)
                    }) 
                })
            }
        })
    },

    addAccountToWallet: function() {

        var jqxhr = $.ajax({
            type: "PUT",
            url:  Page.api_server +  '/user/' + Page.currentUser._id+ '/addaccount',
            data: {
                account: Page.currentAccount
            }
        })

        // 添加成功，重新加载数据
        jqxhr.done(function(data){
            window.location = '/cart'
        })

        jqxhr.fail(function(error){
            console.log(error.responseJSON.message)
        })
    }

}

$(document).ready( function(){ Page.init( api_server ); })