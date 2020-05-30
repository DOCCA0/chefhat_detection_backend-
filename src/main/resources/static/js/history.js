/**
 * Created by Administrator on 2017/6/12.
 */
var currentID;
function tableLoad(){
    $('#table').bootstrapTable({
        method: "get",
        url: "/historyVideos",
        striped: true,
        singleSelect: false,
        dataType: "json",
        pagination: true, //分页
        pageSize: 10,
        pageNumber: 1,
        search: false, //显示搜索框
        contentType: "application/x-www-form-urlencoded",
        queryParams: queryParams,
        columns: [

            {
                title: '餐厅编号',
                field: 'id',
                align: 'center',
                valign: 'middle'
            },
            {
                title: '餐厅名称',
                field: 'name',
                align: 'center',
                valign: 'middle'
            },
            {
                title: '生成时间',
                field: 'date',
                align: 'center',
                valign: 'middle'
            },

            {
                title: '视频链接',
                field: 'videoUrl',
                align: 'center',
                valign: 'middle'
            },

        ]
    });
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



function dataLead() {
    layer.open({
        type: 2,
        title: '分组信息',
        shade: 0.5,
        skin: 'layui-layer-rim',
        area: ['700px', '350px'],
        shadeClose: true,
        closeBtn: 1,
        content: 'alamLightTail.html'
    });
}

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
