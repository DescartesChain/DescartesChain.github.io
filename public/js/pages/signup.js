Page = {
    api_server: null,

    init: function(api_server) {
        Page.api_server = api_server;
        Page.bindEvents();
    },

    bindEvents: function() {
        $('#btnSignUp').on('click', Page.handleCreateUser)
    },

    verify: function() {
    },

    handleCreateUser: function( event ) {
        event.preventDefault();

        var username = $("#username").val();
        var email    = $("#email").val();
        var phone    = $("#phone").val();
        var password = $("#password").val();
        var confirmPassword = $("#confirmPassword").val();


        // 验证表单是否为空

        // 一切 OK， 注册
        var jqxhr = $.ajax({
            type: "POST",
            url:  Page.api_server +  '/signup',
            data: {
                username: username,
                email   : email,
                phone   : phone,
                password: password
            }
        })

        // 添加成功，重新加载数据
        jqxhr.done(function(data){
            console.log(data)         
            localStorage.setItem('token', data.token);

            if( localStorage.getItem('token') != null && 
                localStorage.getItem('token') != "" ) {
                window.location = '/'
            }
        })
        
        jqxhr.fail(function(error){
            console.log(error.responseJSON)
        })
    }
}


$(document).ready( function(){ Page.init( api_server ); })