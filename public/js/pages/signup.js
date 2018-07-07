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
                window.location = '/signin'
            }
        })
        
        jqxhr.fail(function(error){
            var title = error.responseJSON.message.split(':')[2].split('_1')[0]
            $('#judgeUser').css('display','block')
            if(title == " username"){
                $('#judgeUser').html('The username has been registered')
            }else if(title == ' phone'){
                $('#judgeUser').html('The cell phone number has been registered')
            }else{
                $('#judgeUser').html('The mailbox has been registered')
            }
        })
    }
}


$(document).ready(function(){ 
    
    Page.init( api_server ); 
    $('input').focus(function(){
        $('#judgeUser').css('display','none')
    })
    $('#btnSignUp').click(function(){
        var map = {};
        var serachInputText = $(".aaa");
        $.each(serachInputText, function() {
            var input = $(this);
            // console.log(input[0].childNodes[1].value)
            // console.log(input.attr('id')); 
            map[input.attr('id')] = input.val();
        });
        var str = JSON.stringify(map);
        sessionStorage.obj = str;
    })
})
$(document).ready(function(){
    str = sessionStorage.obj;
    obj = JSON.parse(str);
    var serachInputText = $(".aaa");
    $.each(serachInputText, function() {
        var input = $(this);
        input.val(obj[input.attr('id')])
    });
})
