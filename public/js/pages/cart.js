Page = {
    table: null,
    deleteIds: [],
    api_server: null,
    currentUser: null,
    addresses: [],
    vouchers: [],

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
        // 加载所有地址
        var jqxhr = $.ajax({
            type: "GET",
            url:  Page.api_server +  '/user/'+ Page.currentUser._id + '/unused_voucherlist',
        })
        
        // 添加成功，重新加载数据
        jqxhr.done(function(data){
            Page.vouchers = data;
            var element = '';
            data.forEach(function(voucher) {
                element += '<li class="clear_after"><div class="label"><input type="radio" class="radio_li" name="voucher" value="'+  voucher.code +'"></div><div class="li_r"><span class="dui_huan_num">'+ voucher.code +'</span></div></li>'
            });

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
            data.forEach(function(item) {
                $("#addressTable tr:last")
                .after("<tr><td>"+ item.receiver +"</td><td>"+ item.phone +"</td><td>" + item.address +"</td><tr>")
            });
            
            console.log('this is a address list', data)
        })
        
        jqxhr.fail(function(error){
            console.log(error.responseJSON.message)
        })
    },

    bindEvents: function() {
        $("#btnAddAddress").on('click', Page.handleCreateAddress);
        $("#btnLoadVoucher").on('click', Page.handleLoadVoucher);
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
            url:  Page.api_server +  '/user/5b389115b9a8c12f8cc243e3/voucherlist',
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

    handleVoucherPay: function( event ) {
        // pay with vocher
        event.preventDefault();

        var selectedVoucher = $('input[name=voucher]:checked', '#voucherList').val()
        console.log(selectedVoucher);

        var voucherId = Page.getVoucherIdByCode(selectedVoucher);
        console.log(voucherId);

        // just create a new order
        var jqxhr = $.ajax({
            type: "POST",
            url:  Page.api_server +  '/order',
            data: {
                customerId: Page.currentUser._id,
                voucherId: voucherId,
                addressId: Page.addresses[0]._id
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


$(document).ready( function(){ Page.init( api_server ); })