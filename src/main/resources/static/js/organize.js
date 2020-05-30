/**
 * Created by Administrator on 2016/8/4.
 */
var setting = {
    data: {
        simpleData: {
            enable: true,
            idKey: "departcode",
            pIdKey: "parentcode",
            rootPId: -1
        },
        key: {
            name:"departname"
        }
    },
    view: {
        dblClickExpand: false
    },
    check: {
        enable: true
    },
    callback: {
        onRightClick: OnRightClick,
        onClick:OnClick
    }
};

function OnRightClick(event, treeId, treeNode) {
    if (!treeNode && event.target.tagName.toLowerCase() != "button" && $(event.target).parents("a").length == 0) {
        zTree.cancelSelectedNode();
        showRMenu("root", event.clientX, event.clientY);
    } else if (treeNode && !treeNode.noR) {
        zTree.selectNode(treeNode);
        showRMenu("node", event.clientX, event.clientY);
    }
}
function showRMenu(type, x, y) {
    $("#rMenu ul").show();
    if (type=="root") {
        $("#m_del").hide();
        $("#m_check").hide();
        $("#m_unCheck").hide();
    } else {
        $("#m_del").show();
        $("#m_check").show();
        $("#m_unCheck").show();
    }
    rMenu.css({"top":y+"px", "left":x+"px", "visibility":"visible"});

    $("body").bind("mousedown", onBodyMouseDown);
}
function hideRMenu() {
    if (rMenu) rMenu.css({"visibility": "hidden"});
    $("body").unbind("mousedown", onBodyMouseDown);
    $("#title").text("贵阳市管理局");
    $("#title1").text("贵阳市管理局");
    $("#departname").val("");
    $("#parentcode").val("");
}
function onBodyMouseDown(event){
    if (!(event.target.id == "rMenu" || $(event.target).parents("#rMenu").length>0)) {
        rMenu.css({"visibility" : "hidden"});
    }
}
var addCount = 1;

//添加事件
        function addTreeNode(names) {
            hideRMenu();
            var newNode = { name:names + (addCount++)};
            if (zTree.getSelectedNodes()[0]) {
                newNode.checked = zTree.getSelectedNodes()[0].checked;
                zTree.addNodes(zTree.getSelectedNodes()[0], newNode);
            } else {
                zTree.addNodes(null, newNode);
            }
        }
        function removeTreeNode() {
            hideRMenu();
            var nodes = zTree.getSelectedNodes();
            if (nodes && nodes.length>0) {
                if (nodes[0].children && nodes[0].children.length > 0) {
                    var msg = "要删除的节点是父节点，如果删除将连同子节点一起删掉。\n\n请确认！";
                    if (confirm(msg)==true){
                        zTree.removeNode(nodes[0]);
                    }
                } else {
                    zTree.removeNode(nodes[0]);
                }
            }
        }
        function checkTreeNode(checked) {
            var nodes = zTree.getSelectedNodes();
            if (nodes && nodes.length>0) {
                zTree.checkNode(nodes[0], checked, true);
            }
            hideRMenu();
        }
        function resetTree() {
            hideRMenu();
            $.fn.zTree.init($("#treeDemo"), setting, zNodes);
        }
        function OnClick(event, treeId, treeNode){
            $.ajax({
                method: "GET",
                url: "./json/department.json",
                dataType: "json",
                success: function (data){
                    var msg = data.RECORDS;
                    for(var i= 0;i<msg.length;i++){
                        if(treeNode.departcode == msg[i].departcode){
                            $("#title").text(msg[i].departname);
                            $("#title1").text(msg[i].departname);
                            $("#departname").val(msg[i].departname);
                            for(var j= 0;j<msg.length;j++){
                                if(msg[i].parentcode == msg[j].departcode){
                                    $("#parentcode").val(msg[j].departname);
                                        }
                            }
                            //$("#sex").val(msg[i].sex);
                            //$("#BZ").val(msg[i].staff);
                            //$("#position").val(msg[i].position);
                            //$("#departname").val(msg[i].departname);
                            //$("#areaname").val(msg[i].areaname);
                        }
                    }
                }
            });

            $(".dropdown_select").val(treeNode.name);
         }
var zTree, rMenu;
$(document).ready(function(){
    $.ajax({
        method: "GET",
        url: "./json/department.json",
        dataType: "json",
        success: function (data){
            $.fn.zTree.init($("#treeDemo"), setting, data.RECORDS);
            //$.fn.zTree.init($("#treeDemo1"), setting, zNodes);
            //$.fn.zTree.init($("#treeDemo2"), setting, zNodes);
            //$.fn.zTree.init($("#treeDemo3"), setting, zNodes);
            zTree = $.fn.zTree.getZTreeObj("treeDemo");
            rMenu = $("#rMenu");
        }
    });

});