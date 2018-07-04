Page = {
    table: null,
    deleteIds: [],
    api_server: null,
    currentUser: null,
    addresses: [],
    vouchers: [],
    receiver: '0xcB3e301286b897f56C97932f62c20980BC62B74B',

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
            Page.loadVouchers();
            Page.loadAddress();
            Page.bindEvents();
        })
        
        jqxhr.fail(function(error){
            window.location = "/signin"
        })
    },

    reload: function() {
        window.location.reload(); // This is not jQuery but simple plain ol' JS
    },

    loadVouchers: function() {
        // 加载所有未使用的兑换码
        var jqxhr = $.ajax({
            type: "GET",
            url:  Page.api_server +  '/user/'+ Page.currentUser._id + '/unused_voucherlist',
        })
        
        // 添加成功，重新加载数据
        jqxhr.done(function(data){
            Page.vouchers = data;

            var element = '<li class="clear_after"><div>You don\'t have a voucher yet, go <a href="/profile" style="font-size: 1.2rem; color:#3DACF7; "><strong>add</strong></a> now!</div></li>';

            if(data.length == 0 ) {
                element + ""
            } else {
                data.forEach(function(voucher) {
                    element += '<li class="clear_after"><div class="label"><input type="radio" class="radio_li" name="voucher" value="'+  voucher._id +'"></div><div class="li_r"><span class="dui_huan_num">'+ voucher.code +'</span></div></li>'
                });
            }

            $( element ).insertBefore("#voucherInput");
        })
        
        jqxhr.fail(function(error){
            console.log(error.responseJSON.message)
        })
    },

    loadAddress: function() {
        
        // 加载所有地址
        var jqxhr = $.ajax({
            type: "GET",
            url:  Page.api_server +  '/user/'+ Page.currentUser._id + '/addresslist',
        })
        
        // 添加成功，重新加载数据
        jqxhr.done(function(data){
            Page.addresses = data;

            var element = '';

            data.forEach(function(item) {
                element += '<li>' +
                    '<div class="li_first fl text_overflow"><div class="span">姓名</div>'+ item.receiver +'</div>' +
                    '<div class="li_second fl text_overflow"><div class="span">电话</div>'+ item.phone+'</div>' +
                    '<div class="li_third"><div class="span">地址</div>' +
                        item.address +
                    '</div>' +
                    '<label class="demo--label">' +
                        '<div class="demo--label_con">' +
                            '<input class="demo--radio" type="radio" name="address" value="'+ item._id +'">' +
                            '<span class="demo--radioInput"></span>'+
                        '</div>'+
                    '</label>' +
                '</li>'
            });
            
            $(element). insertBefore("#addressItem");
        })
        
        jqxhr.fail(function(error){
            console.log(error.responseJSON.message)
        })
    },

    bindEvents: function() {
        $("#btnAddAddress").on('click', Page.handleCreateAddress);
        $("#btnLoadVoucher").on('click', Page.handleLoadVoucher);
        $("#btnETHPay").on('click', Page.handleETHPay);
        $("#btnVoucherPay").on('click', Page.handleVoucherPay);
        
    },

    handleCreateAddress: function( event ) {
        event.preventDefault();

        var receiver = $("#receiver").val();
        var phone = $("#phone").val();
        var address = $("#address").val();

        var jqxhr = $.ajax({
            type: "POST",
            url:  Page.api_server +  '/address',
            data: {
                customerId: Page.currentUser._id,
                receiver: receiver,
                phone: phone,
                address: address
            },
        })
        
        // 添加成功，重新加载数据
        jqxhr.done(function(data){
            Page.reload();
        })
        
        jqxhr.fail(function(error){
            console.log(error.responseJSON.message)
        })
    },

    handleLoadVoucher: function( event ) {
        event.preventDefault();

        // load all vouchers
        var jqxhr = $.ajax({
            type: "GET",
            url:  Page.api_server +  '/user/'+ Page.currentUser._id + '/unused_voucherlist',
        })

        // 添加成功，重新加载数据
        jqxhr.done(function(data){
            
            console.log('this is a address list', data)
            Page.reload();
        })

        jqxhr.fail(function(error){
            console.log(error.responseJSON.message)
        })
    },


    getVoucherIdByCode: function(code) {
        
        var voucherId = null;

        Page.vouchers.forEach(function(voucher) {
            if(voucher.code == code) {
                voucherId =  voucher._id;
            }
        })

        return voucherId;
    },

    handleETHPay: function(event) {
        event.preventDefault();

        // Page.ethRealtimePrice();
        ETHPay.checkMetaMaskState(Page.processBasedMetaMaskState)
    },

    ethRealtimePrice: function() {
        var jqxhr = $.ajax({
            url:  "https://api.feixiaohao.com/site/headercoinlist",
        })
    
        // 添加成功，重新加载数据
        jqxhr.done(function(data){
            console.log(data)
        })
        
        jqxhr.fail(function(error){
            console.log(error)
        })
    },


    processBasedMetaMaskState: function( state ) {

        if( state == 0) {
            // 弹出提示安装
            window.location = '/not-installed'
        } else if( state == 1) {
            // 提示尚未登录
            window.location = '/not-logged-in'

        } else if(state == 2) {
            
            // TO-DO the code here is very nasty.
            var jqxhr = $.ajax({
                url:  api_server +  '/user/' + Page.currentUser._id,
            })
        
            // 添加成功，重新加载数据
            jqxhr.done(function(data){
                Page.currentUser = data;    
                ETHPay.web3.eth.getAccounts(function(err, accounts){

                    if(err) {
    
                    } else {
                        if(accounts.length > 0 ){
                            var alreadyBinded = false;
    
                            Page.currentUser.wallet.forEach(function(account) {
                                // console.log(accounts[0] + "   " + account)
                                if(account == accounts[0]) {
                                  alreadyBinded = true;  
                                } 
                            });
                
                            if(alreadyBinded) {
                                // 进行支付
                                var txObj = {
                                    from: accounts[0],
                                    to: Page.receiver,
                                    value:  '3900000000000000000' // ETHPay.web3.utils.toWei(String(Page.amount), "ether"),
                                }
    

                                web3.version.getNetwork((err, netId) => {
                                    if (err) {
                                      console.error(err);
                                      return;
                                    }

                                    console.log(typeof netId)
                                    if(netId == 1) {
                                        ETHPay.web3.eth.sendTransaction(txObj)
                                        .on('transactionHash', function(hash){
                                            // add hash to user txs
                                            var jqxhr = $.ajax({
                                                type: "POST",
                                                url:  Page.api_server +  '/txhash',
                                                data: { 
                                                     customer: Page.currentUser._id,
                                                     newTxHash: hash
                                                },
                                            })
                                            
                                            // 添加成功，重新加载数据
                                            jqxhr.done(function(data){
                                                window.location = '/profile'
                                            })
                                            
                                            jqxhr.fail(function(error){
                                                console.log(error.responseJSON.message)
                                            })
                                        })
                                    } else {
                                        alert("The MetaMask dose not connect to Main Network")
                                    }
                                    // see https://ethereum.stackexchange.com/questions/17207/how-to-detect-if-on-mainnet-or-testnet
                                    
                                  });
                            } else {
                                window.location = '/binding'
                            }
                        } else {
                            window.location = '/binding'
                        }
                    }
                    console.log(accounts)
                })    
                // 提示绑定用户 
            })
        } 
    },


    handleVoucherPay: function( event ) {
        // pay with vocher
        event.preventDefault();

        var selectedVoucherId = $('input[name=voucher]:checked', '#voucherList').val()
        console.log(selectedVoucherId);

        var selectedAddressId =  $('input[name=address]:checked', '#addressList').val()
        console.log(selectedAddressId);

        
        if(selectedAddressId == null || selectedAddressId == undefined) {
            return alert('You must specify your address');
        }
        else if(selectedVoucherId == null || selectedVoucherId == undefined) {
            return alert('You must specify your voucher');
        } else {
            // just create a new order
            var jqxhr = $.ajax({
                type: "POST",
                url:  Page.api_server +  '/order',
                data: {
                    customerId: Page.currentUser._id,
                    voucherId: selectedVoucherId,
                    addressId: selectedAddressId
                },
            })
            
            // 添加成功，重新加载数据
            jqxhr.done(function(data){
                console.log(data)

                window.location = '/order_detail?id=' + data._id;
            })
            
            jqxhr.fail(function(error){
                console.log(error.responseJSON.message)
            })
        }
    }
}


$(document).ready( function(){ Page.init( api_server ); })