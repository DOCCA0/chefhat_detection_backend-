/**
 * Created by Administrator on 2017/6/12.
 */
var currentID;
var productList=[];
function tableLoad(res){
    $('#table').bootstrapTable({
        method: "get",
        url: "/allUsers",
        striped: true,
        singleSelect: false,
        dataType: "json",
        pagination: true, //分页
        pageSize: 10,
        pageNumber: 1,
        search: true, //显示搜索框
        contentType: "application/x-www-form-urlencoded",
        // queryParams: queryParams,

        columns: [
            {
                title: '用户id',
                field: 'id',
                align: 'center',
                valign: 'middle',
                searchable:true
            },
            {
                title: '用户账号',
                field: 'username',
                align: 'center',
                valign: 'middle',
                searchable:true
            },
            {
                title: '角色',
                field: 'role',
                align: 'center',
                valign: 'middle',
                searchable:true
            },

            {
                title: '邮箱',
                field: 'email',
                align: 'center',
                valign: 'middle',
                searchable:false
            },
            {
                field:'ID',
                title: '操作',
                width: 120,
                align: 'center',
                valign: 'middle',
                formatter: function (value, row, index) {
                    // var sid_code = base64encode(row.sid + '');   //  sid 加密处理
                    // alert(sid_code);
                    return '<a href="#">' +
                        // '<i class="glyphicon glyphicon-eye-open" title="显示"></i> ' +
                        // '</a>'+
                        '<a href="#editProject" data-toggle="modal" title="修改">' +
                        '<i class="glyphicon glyphicon-pencil"></i> ' +
                        '</a>'+
                        '<a href="javascript:void(0)" title="删除">' +
                        '<i class="glyphicon glyphicon-trash text-danger"></i> ' +
                        '</a>';
                },
                events: {
                    'click a[title=删除]': function (e, value, row, index) {
                        if(confirm('此操作不可逆，请确认是否删除？')){
                            $.ajax({

                            });
                        }
                    },
                    'click a[title=修改]': function (e, value, row, index) {
                            console.log(row)
                            alert('ajax请求之前');
                            $.ajax({
                                url : "/users/"+e.username,
                                async : true,
                                type : "POST",
                                data : {

                                },
                                // 成功后开启模态框
                                success : showQuery,
                                error : function() {
                                    alert("请求失败");
                                },
                                dataType : "json"
                            });
                    },
                }
            }
        ]
    });

}
function showQuery(data) {
    $("#id").val(data.id);
    $("#password").val('***');
    $("#role").val(data.role);
    $("#username").val(data.username);
    // 显示模态框
    $('#queryInfo').modal('show');
}

function queryParams(params) {
    return {
        page: params.pageNumber,
        rows: params.limit,//页码大小
        order: params.order,
        sort: params.sort,
        SendPeople: $("#person").val(),
        Title: $("#tit").val(),
        BeginSendTime: $("#beginSendTime").val(),
        EndSendTime: $("#endSendTime").val()
    };
}

//数据的查询
function checkPersonData() {
    $("#table").bootstrapTable('refresh');
}




//
// function dataLead(picpath) {
//     console.log(picpath)
//     // layer.open({
//     //     type: 2,
//     //     title: '分组信息',
//     //     shade: 0.5,
//     //     skin: 'layui-layer-rim',
//     //     area: ['700px', '350px'],
//     //     shadeClose: true,
//     //     closeBtn: 1,
//     //     content: 'alamLightTail.html'
//     // });
// }

//取消操作
function cancel() {
    var index = parent.layer.getFrameIndex(window.name);
    parent.layer.close(index);
}

//单个下载
function down(id){

    var personId = id;
    $.ajax({
        url: '/OAMessagePush/Delete?Ids=' + personId,
        type: 'post',
        dataType: 'json',
        success: function (result) {
            var result = handleError(result);
            if (result.IsError) {
                alter("下载失败");
                return;
            }
            else {
                alter("下载成功");

            }
        }
    })


}


//批量下载
function downAll(){
    var idArray = $('#table').bootstrapTable('getSelections');
    if(idArray == null || idArray.length ==0){
        alert("请选择你要下载的类容!");
        return false;
    }else {
        var personID = [];
        for(var i=0;i<idArray.length;i++){
            personID.push(idArray[i].id);
        }
        //$.each(idArray, function (index, row) {
        //    personID.push(row.Id);
        //});

        $.ajax({
            url: '/OAMessagePush/Delete?Ids=' + personID.join(","),
            type: 'post',
            dataType: 'json',
            success: function (result) {
                var result = handleError(result);
                if (result.IsError) {
                    return;
                }
                else {
                    checkPersonData();
                }
            }
        })
    }



}
//测试下载
function textDel(){
    alert("下载成功")
}
