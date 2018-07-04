ETHPay = {

    web3: null,

    init: function() {
        if (typeof web3 !== 'undefined') { 
            if(web3.currentProvider.constructor.name === "MetamaskInpageProvider") {
                ETHPay.web3 = new Web3(web3.currentProvider);
            }
        } 
    },

    /**
     * 返回 MetaMask 的状态
     * 0 - 未安装
     * 1 - 未登录
     * 2 - 未签名
     */
    checkMetaMaskState: function(cb) {

        if (typeof web3 !== 'undefined') { 
            ETHPay.web3 = new Web3(web3.currentProvider);

            if(ETHPay.web3.currentProvider.constructor.name === "MetamaskInpageProvider") {
                
                ETHPay.web3.eth.getAccounts(function(err, accounts){
                    if (err != null) {
                        cb(1);
                    }
                    else if (accounts.length == 0) {
                        cb(1);
                    }
                    else {
                        // 每次获取 accounts 时，就为 默认账户赋值
                        cb(2);
                    }
                });
               
            } else {
                cb(0);
            }
        } else {
            cb(0);
        }
    }
}

ETHPay.init();