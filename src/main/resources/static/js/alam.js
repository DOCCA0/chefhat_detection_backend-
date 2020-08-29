/**
 * Created by Administrator on 2017/6/12.
 */
var currentID;
var productList=[];
function tableLoad(res){
    $('#table').bootstrapTable({
        method: "get",
        url: "/alarms",
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
                title: '违规id',
                field: 'alarmId',
                align: 'center',
                valign: 'middle',
                searchable:true
            },
            {
                title: '餐厅id',
                field: 'id',
                align: 'center',
                valign: 'middle',
                searchable:true
            },
            {
                title: '餐厅名称',
                field: 'name',
                align: 'center',
                valign: 'middle',
                searchable:true
            },

            {
                title: '违规类型',
                field: 'type',
                align: 'center',
                valign: 'middle',
                searchable:false
            },
            {
                title: '违规时间',
                field: 'dateTime',
                align: 'center',
                valign: 'middle',
                searchable:true
            },
            {
                title: '违规截图',
                field: 'picPath',
                width: 120,
                align: 'center',
                searchable:false,
                // formatter: function (value, row) {
                //     picpath=value
                //     var  e = '<button  id="add" data-id="98" class="btn btn-xs btn-success" onclick="dataLead(picpath)">查看截图</button> ';
                //     return  e;
                // }
                formatter: function (value, row, index) {
                    // picpath=value
                    var s = '<a class = "view"  href="javascript:void(0)"><img style="width:80px;height:60px;"  src="/pic/'+value+'" /></a>';
                    return s;
                },
                events: 'operateEvents'
            }


        ]
    });

}

//查询
// $('#search_btn').bind('click',function(){
//     var id=$('#id').val();
//     var name=$('#name').val();
//     if(name!='')
//         var url="/alarms/name/"+name;
//     if(id!='')
//         var url="/alarms/id/"+id;
//
//     if(id==''&&name=='')
//         var url="/alarms";
//     $('#table').bootstrapTable('destroy');
//     $('#table').bootstrapTable({
//         method: "get",
//         // url: "/alarms",/alarms/id/{id},/alarms/name/{name}
//         url: url,
//         striped: true,
//         singleSelect: false,
//         dataType: "json",
//         pagination: true, //分页
//         pageSize: 10,
//         pageNumber: 1,
//         search: false, //显示搜索框
//         contentType: "application/x-www-form-urlencoded",
//         // queryParams: queryParams,
//
//         columns: [
//             {
//                 title: '违规id',
//                 field: 'alarmId',
//                 align: 'center',
//                 valign: 'middle',
//                 searchable:true
//             },
//             {
//                 title: '餐厅id',
//                 field: 'id',
//                 align: 'center',
//                 valign: 'middle',
//                 searchable:true
//             },
//             {
//                 title: '餐厅名称',
//                 field: 'name',
//                 align: 'center',
//                 valign: 'middle',
//                 searchable:true
//             },
//
//             {
//                 title: '违规类型',
//                 field: 'type',
//                 align: 'center',
//                 valign: 'middle',
//                 searchable:false
//             },
//             {
//                 title: '违规时间',
//                 field: 'dateTime',
//                 align: 'center',
//                 valign: 'middle',
//                 searchable:true
//             },
//             {
//                 title: '违规截图',
//                 field: 'picPath',
//                 width: 120,
//                 align: 'center',
//                 searchable:false,
//                 // formatter: function (value, row) {
//                 //     picpath=value
//                 //     var  e = '<button  id="add" data-id="98" class="btn btn-xs btn-success" onclick="dataLead(picpath)">查看截图</button> ';
//                 //     return  e;
//                 // }
//                 formatter: function (value, row, index) {
//                     // picpath=value
//                     var s = '<a class = "view"  href="javascript:void(0)"><img style="width:80px;height:60px;"  src="/pic/'+value+'" /></a>';
//                     return s;
//                 },
//                 events: 'operateEvents'
//             }
//
//
//         ]
//     });
//
// });
window.operateEvents = {
    'click .view': function (e, value, row, index) {
        layer.open({
            type: 1,
            title: false,
            closeBtn: 0,
            area : [ '1280px', '720px' ],
            // skin: 'layui-layer-nobg', //没有背景色
            shadeClose: true,
            content: '<img width="1280px" height="720px" src="/pic/'+value+'"/>'
        });
    },
};
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
