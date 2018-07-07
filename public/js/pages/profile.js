Page = {
    table: null,
    deleteIds: [],
    api_server: null,
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
    

            // set user info
            $("#profile_name").text(Page.currentUser.username);

            Page.loadOrders();
            Page.loadEthOrders();
            Page.loadVouchers();
            Page.bindEvents();
        })
        
        jqxhr.fail(function(error){
            window.location = "/signin"
        })

        Page.bindEvents();
    },

    reload: function() {
        window.location.reload(); // This is not jQuery but simple plain ol' JS
    },

    loadOrders: function() {
        var jqxhr = $.ajax({
            type: "GET",
            url:  Page.api_server +  '/user/'+ Page.currentUser._id + '/orderlist',
        })
        
        // 添加成功，重新加载数据
        jqxhr.done(function(data){

            console.log(data)
            data.forEach(function(order) {
                var tr = '<tr><td class="pro_img"><div class="pro_td"><img src="images/pro11.jpg"><div class="txt"><div class="tit"><a href="/order_detail?id=' + order._id + '"> First generation high performance cartesian mining machine </a></div></div></div></td><td class="num">1</td><td class="price_total">$1820</td></tr>'

                console.log('wtf')
                $("#orderTable tr:last").after(tr)
                // element += '<li class="clear_after"><div class="label"><input type="radio" class="radio_li" name="voucher"></div><div class="li_r"><span class="dui_huan_num">'+ voucher.code +'</span></div></li>'
            });
        })
        
        jqxhr.fail(function(error){
            console.log(error.responseJSON.message)
        })
    },

    loadEthOrders: function() {
        var jqxhr = $.ajax({
            type: "GET",
            url:  Page.api_server +  '/user/'+ Page.currentUser._id + '/txhashlist',
        })
        
        // 添加成功，重新加载数据
        jqxhr.done(function(data){

            data.forEach(function(item) {
                console.log(item)
                var tr = '<tr><td class="pro_img"><div class="pro_td"><img src="images/pro11.jpg"></div></td><td class="num"><a href="https://etherscan.io/tx/' + item.txHash + '"> '+item.txHash+' </a></td></tr>'

                $("#ethOrderTable tr:last").after(tr)
                // element += '<li class="clear_after"><div class="label"><input type="radio" class="radio_li" name="voucher"></div><div class="li_r"><span class="dui_huan_num">'+ voucher.code +'</span></div></li>'
            });
        })
        
        jqxhr.fail(function(error){
            console.log(error.responseJSON.message)
        })
    },

    parseStatus: function(status) {

        console.log(status)
        var txt = '未分配'
        switch(status)  {
            case 0 : txt = '未分配'; break;
            case 1 : txt = '未使用'; break;
            case 2 : txt = '已使用'; break;
        }
        return txt;
    },

    loadVouchers: function() {
        var jqxhr = $.ajax({
            type: "GET",
            url:  Page.api_server +  '/user/'+ Page.currentUser._id + '/voucherlist',
        })
        
        // 添加成功，重新加载数据
        jqxhr.done(function(data){

            data.forEach(function(voucher) {
                var tr = '<tr><td>' + voucher.code + '</td><td>' +  Page.parseStatus(voucher.status) + '</td></tr>'
                $("#voucherTable tr:last").after(tr)
            });
        })
        
        jqxhr.fail(function(error){
            console.log(error.responseJSON.message)
        })
    },

    bindEvents: function() {
        $("#btnAddVoucher").on('click', Page.handleAddVoucher)
        $("#signOut").on('click', Page.handleSignOut);
    },

    handleAddVoucher: function(event) {

        event.preventDefault();
        var code = $("#inputCode").val();


        var jqxhr = $.ajax({
            type: "PUT",
            url:  Page.api_server + '/voucher/'+ code + '/allocate_to/' + Page.currentUser._id ,
        })
        
        // 添加成功，重新加载数据
        jqxhr.done(function(data){

            console.log(data)

            Page.reload();

        })
        
        jqxhr.fail(function(error){
            console.log(error.responseJSON.message)
        })
    },

    handleSignOut: function( event ) {
        event.preventDefault();

        localStorage.removeItem('token');
        window.location = '/';
    },
}


$(document).ready( function(){ Page.init( api_server ); })