Page = {
    table: null,
    deleteIds: [],
    api_server: null,

    init: function(api_server) {
        Page.api_server = api_server;
        Page.initDataTable();
        Page.bindEvents();
    },

    loadAddress: function() {
        // 加载所有地址
        
    },

    bindEvents: function() {
        $("#dataTable tbody").on('change', 'input[type="checkbox"]', Page.handleUserChecked);
        $("#btnCreate").on('click', Page.handleCreateUser);
        $("#btnUpdate").on('click', Page.handleUpdateUser);
        $("#btnDelete").on('click', Page.handleDeleteUser);
    },

    handleUserChecked: function(event) {
        var data = Page.table.row( $(this).parents('tr') ).data();
        this.checked ? Page.deleteIds.push(data._id) : Page.deleteIds.pop(data._id);
    },

    handleCreateUser: function( event ) {
        event.preventDefault();

        var jqxhr = $.ajax({
            type: "POST",
            url:  Page.api_server +  '/orders/add',
            data: $("#formCreate").serialize(),
        })
        
        // 添加成功，重新加载数据
        jqxhr.done(function(data){
            Page.table.ajax.reload();
        })
        
        jqxhr.fail(function(error){
            console.log(error.responseJSON.message)
        })
    },
}


$(document).ready( function(){ Page.init( api_server ); })