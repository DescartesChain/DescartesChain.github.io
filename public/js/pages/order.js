Page = {
    table: null,
    deleteIds: [],
    api_server: null,

    init: function(api_server) {
        Page.api_server = api_server;
        Page.initDataTable();
        Page.bindEvents();
    },

    initDataTable: function() {
        Page.table = $('#dataTable').DataTable({
            // DataTables - Features
            // Feature enable/disable https://datatables.net/reference/option/
            "processing": true,
            "serverSide": true,  
            "searching": true,
            "info": true,
            // https://datatables.net/release-datatables/examples/basic_init/dom.html
            // "dom": '<t><"row" <"col-lg-3" l><"col-lg-3" i><"col-lg-6" p>>',
            "ajax": api_server + "/orders/all",
            // Generated content for a column: https://datatables.net/examples/ajax/null_data_source.html
            columnDefs: [
                { targets:0, data: null, defaultContent: '<input type="checkbox">'},
                { targets:1, data: "name" },
                { targets:2, data: "phone" },
                { targets:3, data: "address" },
                { targets:4, data: "email" },
                { targets:5, data: "masterQTY" },
                { targets:6, data: "nodeQTY" },
                { targets:7, data: "voucher.code" },
                { targets:8, data: "createdAt" },
                {
                    targets: 9,
                    data: '_id',
                    render: function ( data, type, row, meta ) {
                        return '<a class="btn btn-primary" href="/cell/edit/'+data+'">修改</a>';
                    }
                    // defaultContent: '<button class="btn btn-primary" data-toggle="modal" id="btnUpdate" data-target="#myModal2">修改</button>'
                    // defaultContent: '<button class="btn btn-primary btnUpdate">修改 ' + +  '</button>'                
                }
            ],
            // https://datatables.net/examples/basic_init/language.html
            // language: {
            //     "lengthMenu": "Display _MENU_ records per page",
            //     "zeroRecords": "Nothing found - sorry",
            //     "info": "Showing page _PAGE_ of _PAGES_",
            //     "infoEmpty": "No records available",
            //     "infoFiltered": "(filtered from _MAX_ total records)"
            // }
        });
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

    handleUpdateUser: function( event ) {
        event.preventDefault();

        var jqxhr = $.ajax({
            type: "PUT",
            url: Page.api_server +  "/orders/update",
            data: $("#formUpdate").serialize()
        });

        // 更新成功，重新加载数据
        jqxhr.done(function(data) {
            Page.table.ajax.reload();
        })
    },

    handleDeleteUser: function( event ) {
        event.preventDefault();
        var jqxhr =  $.ajax({
            type: "DELETE",
            url: Page.api_server + "/orders/delete",
            data: {
                ids: Page.deleteIds.join(',')
            }
        });

        // 删除成功，重新加载数据
        jqxhr.done(function(data) {
            Page.table.ajax.reload();
        })
    }
}


$(document).ready( function(){ Page.init( api_server ); })