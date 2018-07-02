Page = {
    table: null,
    deleteIds: [],
    api_server: null,
    currentUser: null,
    orderDetail: null,

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
            Page.loadOrderDetail();
            Page.bindEvents();
        })
        
        jqxhr.fail(function(error){
            window.location = "/signin"
        })
    },

    reload: function() {
        window.location.reload(); // This is not jQuery but simple plain ol' JS
    },

    getUrlParameter: function(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;
    
        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');
    
            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    },

    loadOrderDetail: function() {
        var orderId = Page.getUrlParameter('id');

        // 加载所有地址
        var jqxhr = $.ajax({
            type: "GET",
            url:  Page.api_server +  '/order/'+ orderId,
        })
        
        // 添加成功，重新加载数据
        jqxhr.done(function(data){
            $("#shipAddress").text(data.addressId.address)
            $("#orderId").text(data._id)
            var date = new Date(data.createdAt);
            $("#orderDate").text(date.toString())

            $("#customerName").text(data.customerId.username)
            $("#phone").text(data.customerId.phone)
            $("#address").text(data.addressId.address)
            $("#vocher").text(data.voucherId.code)
            console.log(data);
        })
        
        jqxhr.fail(function(error){
            console.log(error.responseJSON.message)
        })
    },

    bindEvents: function() {
        $("#btnAddAddress").on('click', Page.handleCreateAddress);
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
    }
}


$(document).ready( function(){ Page.init( api_server ); })