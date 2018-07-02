Page = {
    api_server: null,

    init: function(api_server) {
        Page.api_server = api_server;
        Page.bindEvents();
    },

    bindEvents: function() {
        $('#btnSignIn').on('click', Page.handleSignIn)
    },

    verify: function() {
    },

    handleSignIn: function( event ) {
        event.preventDefault();

        var username = $("#username").val();
        var password = $("#password").val();

        // 验证用户名密码是否为空

        // 一切 OK， 登录

        var jqxhr = $.ajax({
            type: "POST",
            url:  Page.api_server +  '/signin',
            data: {
                username: username,
                password: password
            }
        })

        // 添加成功，重新加载数据
        jqxhr.done(function(data){
            console.log(data)         
            localStorage.setItem('token', data.token);

            if( localStorage.getItem('token') != null && 
                localStorage.getItem('token') != "" ) {
                window.location = '/miner'
            }
        })
        
        jqxhr.fail(function(error){
            console.log(error.responseJSON)
        })
    }
}


$(document).ready( function(){ Page.init( api_server ); })