/**
 * Created by Administrator on 2018/4/2.
 */

/**-----------------------------创建Map实例----------------------- */
var map = new BMap.Map("allmap");

/**-----------------------------设置中心点坐标和地图级别----------------------- */
map.centerAndZoom(new BMap.Point(104.547409, 30.403069), 12);

/**-----------------------------开启鼠标滚轮缩放----------------------- */
map.enableScrollWheelZoom(true);

/**-----------------------------设置鼠标样式----------------------- */
map.setDefaultCursor("url('bird.cur')");


/**-----------------------------添加带有定位的导航控件----------------------- */
var navigationControl = new BMap.NavigationControl({
    // 靠左上角位置
    anchor: BMAP_ANCHOR_TOP_LEFT,
    type: BMAP_NAVIGATION_CONTROL_LARGE,
    enableGeolocation: true
});
map.addControl(navigationControl);

/**-----------------------------添加覆盖物----------------------- */
var person, home, car, video;
$(".bill ul input").each(function () {
    $(this).change(function () {
        $(this).parent().siblings("li").find("input").attr("checked",null);
        if (this.checked) {
            map.clearOverlays();
            switch (this.name) {
                case "person":
                    personLoad();
                    break;
                case "home":
                    homeLoad();
                    break;
                case "car":
                    carLoad();
                    break;
                case "video":
                    videoLoad();
                    break;
                case "hot":
                    hotLoad();
                    break;
            }
        } else {
            map.clearOverlays();
        }

    })
});

/**-----------------------------坐标定位----------------------- */
function theLocation(){
    $(".bill ul input").each(function () {
            $(this).attr("checked", null);
        });
    var personPoints = [[104.53036, 30.436731], [104.530736, 30.421908], [104.545307, 30.406461], [104.562644, 30.306742], [104.569974, 30.382288], [104.498685, 30.305123], [104.470658, 30.304126], [104.470514, 30.413687], [104.471233, 30.435984], [104.530593, 30.382412], [104.536342, 30.303877], [104.543528, 30.386275], [104.584779, 30.354743], [104.654343, 30.378175], [104.625598, 30.389889], [104.62301, 30.384406], [104.65923, 30.45043], [104.683377, 30.368205], [104.537348, 30.495002], [104.520675, 30.543037], [104.567244, 30.4711], [104.427252, 30.505707], [104.40253, 30.516907], [104.403303, 30.498230], [104.351938, 30.372691], [104.297321, 30.30836], [104.320892, 30.428012], [104.647444, 30.3333], [104.668716, 30.295888], [104.668141, 30.277925], [104.642845, 30.244485], [104.661242, 30.225015], [104.697462, 30.185563]];
        var new_point = new BMap.Point(personPoints[Math.ceil(Math.random()*20)][0],personPoints[Math.ceil(Math.random()*20)][1]);
        map.clearOverlays();
        var location = new BMap.Marker(new_point);  // 创建标注
        map.addOverlay(location);              // 将标注添加到地图中
        location.setAnimation(BMAP_ANIMATION_BOUNCE);
        addClickHandler(location);
        //map.panTo(new_point);
}
/**-----------------------------弹出监控信息----------------------- */
function addClickHandler(videoPoints){
    videoPoints.addEventListener("click",function(e){
            art.dialog.open("waterQuliyTail.html", {
                title: "测试详情",
                lock: true,
                width: 1050,
                height: 550
            },true);
    }
    );
}
var persons;
/**-----------------------------人员监控----------------------- */
function personLoad() {
    map.clearOverlays();
    var personPoints = [[104.53036, 30.436731], [104.530736, 30.421908], [104.545307, 30.406461],
        [104.562644, 30.306742], [104.569974, 30.382288], [104.498685, 30.305123], [104.470658, 30.304126],
        [104.470514, 30.413687], [104.471233, 30.435984], [104.530593, 30.382412], [104.536342, 30.303877],
        [104.543528, 30.386275], [104.584779, 30.354743], [104.654343, 30.378175], [104.625598, 30.389889],
        [104.62301, 30.384406], [104.65923, 30.45043], [104.683377, 30.368205], [104.537348, 30.495002],
        [104.520675, 30.543037], [104.567244, 30.4711], [104.427252, 30.505707], [104.40253, 30.516907],
        [104.403303, 30.498230], [104.351938, 30.372691], [104.297321, 30.30836], [104.320892, 30.428012],
        [104.647444, 30.3333], [104.668716, 30.295888], [104.668141, 30.277925], [104.642845, 30.244485],
        [104.661242, 30.225015], [104.697462, 30.185563]];
    persons = [];
    var sContent ='<div class="personMain"><div class="personLeft"><img src="http://123.146.170.80:8911/mapIcon/policeman32.png"></div> <div class="personRight"><p><label>'+"姓名："+'</label><span>'+"李和平"
        +'</span></p><p><label>'+"性别："+'</label><span>'+"男"+'</span></p><p><label>'+"职务："+'</label><span>'+"村长"
        +'</span></p><p><label>'+"负责河道："+'</label><span>'+'沱江31-35段'+'</span></p><p><label>'+'联系电话：'
        +'</label><span>'+'13612302321'+'</span></p><p><label>'+'巡查次数：'+'</label><span>'+'254次'+'</span><label style="margin-left: 20px">'+'缺查次数：'
        +'</label><span>'+'32次'+'</span><label style="margin-left: 20px">'+'案件上报数：'+'</label><span>'+'65件'+'</span></p><div>'
        +'<button class="btn btn-sm btn-primary">'+'人员详情'+'</button><button class="btn btn-sm btn-primary" onclick="theLocation()">'+'人员定位'
        +'</button><button class="btn btn-sm btn-primary" onclick="personTrail()">'+'巡查轨迹'+'</button></div></div></div>'
    for (var i = 0; i < personPoints.length; i++) {
        var infoWindow = new BMap.InfoWindow(sContent);  // 创建信息窗口对象
        var pt = new BMap.Point(personPoints[i][0], personPoints[i][1]);
        var myIcon = new BMap.Icon("http://123.146.170.80:8911/mapIcon/policeman32.png", new BMap.Size(30, 30));
        person = new BMap.Marker(pt, {icon: myIcon});  // 创建标注
        persons.push(person);
        map.addOverlay(persons);

        person.addEventListener("click", function(){
            this.openInfoWindow(infoWindow);
            //图片加载完毕重绘infowindow
            //document.getElementById('imgDemo').onload = function (){


            //    infoWindow.redraw();   //防止在网速较慢，图片未加载时，生成的信息框高度比图片的总高度小，导致图片部分被隐藏
            //}
        });
    }
    var markerClusterer = new BMapLib.MarkerClusterer(map, {markers:persons});
}

/**-----------------------------获取地图坐标----------------------- */
function showInfo(e){
    //alert(e.point.lng + ", " + e.point.lat);
}
map.addEventListener("click", showInfo);

/**-----------------------------人员轨迹----------------------- */
function personTrail(){

    map.clearOverlays();
    //var point = new BMap.Point(104.061128, 30.592602);
    var points = [
        new BMap.Point(104.483018, 30.487755),
        new BMap.Point(104.495667, 30.473065),
        new BMap.Point(104.491067, 30.430974),
        new BMap.Point(104.47037, 30.411043),
        new BMap.Point(104.464621, 30.398085),
        new BMap.Point(104.468071, 30.370171),
        new BMap.Point(104.462322, 30.355214),
        new BMap.Point(104.409429, 30.337262)
    ];
    var markers = [
        points[1],//西安北站
        points[2],//咸阳站
        points[3],//咸阳秦都站
        points[5]//兴平站
    ];
    //用站点画出路线，参数：站点、线路颜色、线路宽度、透明度
    var polyline = new BMap.Polyline(points, {strokeColor:"red", strokeWeight:6, strokeOpacity:0.8});

    map.addOverlay(polyline);//添加轨迹到地图

    var lushu = new BMapLib.LuShu(map, points, {
        //landmarkPois:此参数是路书移动的时候碰到这个点会触发pauseTime停留中设置的时间，单位为秒，经纬度误差超过十米不会停止
        landmarkPois:[
            {lng:markers[0].lng,lat:markers[0].lat,html:'西安北站到了',pauseTime:1},
            {lng:markers[1].lng,lat:markers[1].lat,html:'咸阳站到了',pauseTime:1},
            {lng:markers[2].lng,lat:markers[2].lat,html:'咸阳秦都站到了',pauseTime:1},
            {lng:markers[3].lng,lat:markers[3].lat,html:'兴平站到了',pauseTime:1}
        ],
        //defaultContent: '人员继续移动...',
        speed: 4000,//速度，单位米每秒
        /* 1、需要把图片和代码放在同一个文件夹下面
         * 2、size()是设置图片大小，图片过大可以截取
         * 3、anchor是设置偏移，默认是图片最中间，设置偏移目的是让图片底部中间与坐标重合
         */
        icon: new BMap.Icon('http://lbsyun.baidu.com/jsdemo/img/Mario.png', new BMap.Size(32, 70), {anchor: new BMap.Size(27, 33)}),//声明高铁标注
        autoView:true,
        enableRotation: false
    });

    var icon1 = new BMap.Icon('station.png', new BMap.Size(32,32),{anchor: new BMap.Size(16, 32)});//声明站点标注
    for (var i=0;i<markers.length;i++){
        map.addOverlay(new BMap.Marker(markers[i],{icon:icon1}));//添加站点marker
    }
    //map.centerAndZoom(point, 12 );//设置中心点和级别（级别是1-20）数字越大越是放大
    lushu.start();
}

/**-----------------------------显示建筑物----------------------- */
function homeLoad() {
    map.clearOverlays();
    var homePoints = [[104.465591, 30.385528], [104.530844, 30.305496], [104.543205, 30.436606], [104.661063, 30.484173], [104.6602, 30.447068], [104.685209, 30.464501], [104.629442, 30.385029], [104.593798, 30.334921], [104.572526, 30.381789]];
    for (var i = 0; i < homePoints.length; i++) {
        var pt = new BMap.Point(homePoints[i][0], homePoints[i][1]);
        var myIcon = new BMap.Icon("http://123.146.170.80:8911/mapIcon/policeman32.png", new BMap.Size(30, 30));
        var marker2 = new BMap.Marker(pt, {icon: myIcon});  // 创建标注
        map.addOverlay(marker2);
        marker2.addEventListener("click", homeInfo);
    }
}
function homeInfo() {
}

/**-----------------------------显示车辆----------------------- */
function carLoad() {
    map.clearOverlays();
    var sContent ='<div class="personMain"><div class="personLeft"><img src="http://123.146.170.80:8911/mapIcon/policeman32.png"></div> <div class="personRight"><p><label>'+"姓名："+'</label><span>'+"李和平"
        +'</span></p><p><label>'+"性别："+'</label><span>'+"男"+'</span></p><p><label>'+"职务："+'</label><span>'+"村长"
        +'</span></p><p><label>'+"负责河道："+'</label><span>'+'沱江31-35段'+'</span></p><p><label>'+'联系电话：'
        +'</label><span>'+'13612302321'+'</span></p><p><label>'+'巡查次数：'+'</label><span>'+'254次'+'</span><label style="margin-left: 20px">'+'缺查次数：'
        +'</label><span>'+'32次'+'</span><label style="margin-left: 20px">'+'案件上报数：'+'</label><span>'+'65件'+'</span></p><div>'
        +'<button class="btn btn-sm btn-primary">'+'人员详情'+'</button><button class="btn btn-sm btn-primary">'+'人员定位'
        +'</button><button class="btn btn-sm btn-primary">'+'巡查轨迹'+'</button></div></div></div>'
    var carPoints = [[104.465591, 30.385528], [104.530844, 30.305496], [104.543205, 30.436606], [104.661063, 30.484173], [104.6602, 30.447068], [104.685209, 30.464501], [104.629442, 30.385029], [104.593798, 30.334921], [104.572526, 30.381789]];
    var cars = [];
    var pt = null;
    for (var i = 0; i < carPoints.length; i++) {
        var infoWindow = new BMap.InfoWindow(sContent);
        pt = new BMap.Point(carPoints[i][0], carPoints[i][1]);
        var myIcon = new BMap.Icon("http://123.146.170.80:8911/mapIcon/policeman32.png", new BMap.Size(30, 30));
        marker2 = new BMap.Marker(pt, {icon: myIcon});  // 创建标注
        cars.push(marker2);
        map.addOverlay(cars);

        marker2.addEventListener("click", function(){
            this.openInfoWindow(infoWindow);
        });
    }
    var markerClusterer = new BMapLib.MarkerClusterer(map, {markers:cars});
}


/**-----------------------------车辆轨迹----------------------- */
function carTrail(){
    map.clearOverlays();
    $(".carSearch").fadeIn();
}
function carInfo() {
    var speed = $("#carSelect").val();
    carMove();
    map.clearOverlays();
    //var point = new BMap.Point(104.061128, 30.592602);
    var points = [
        new BMap.Point(104.575005, 30.457127),
        new BMap.Point(104.633646, 30.490991),
        new BMap.Point(104.643995, 30.486012),
        new BMap.Point(104.691138, 30.455135),
        new BMap.Point(104.698612, 30.39036),
        new BMap.Point(104.630197, 30.337012),
        new BMap.Point(104.568106, 30.387369),
        new BMap.Point(104.575005, 30.457127)
    ];
    var markers = [
        points[1],//西安北站
        points[2],//咸阳站
        points[3],//咸阳秦都站
        points[5]//兴平站
    ];
    //用站点画出路线，参数：站点、线路颜色、线路宽度、透明度
    var polyline = new BMap.Polyline(points, {strokeColor:"red", strokeWeight:6, strokeOpacity:0.8});
    map.addOverlay(polyline);//添加轨迹到地图
    var lushu = new BMapLib.LuShu(map, points, {
        //landmarkPois:此参数是路书移动的时候碰到这个点会触发pauseTime停留中设置的时间，单位为秒，经纬度误差超过十米不会停止
        landmarkPois:[
            {lng:markers[0].lng,lat:markers[0].lat,html:'西安北站到了',pauseTime:1},
            {lng:markers[1].lng,lat:markers[1].lat,html:'咸阳站到了',pauseTime:1},
            {lng:markers[2].lng,lat:markers[2].lat,html:'咸阳秦都站到了',pauseTime:1},
            {lng:markers[3].lng,lat:markers[3].lat,html:'兴平站到了',pauseTime:1}
        ],
        defaultContent: '车辆继续移动...',
        speed: speed,//速度，单位米每秒
        /* 1、需要把图片和代码放在同一个文件夹下面
         * 2、size()是设置图片大小，图片过大可以截取
         * 3、anchor是设置偏移，默认是图片最中间，设置偏移目的是让图片底部中间与坐标重合
         */
        icon: new BMap.Icon('http://lbsyun.baidu.com/jsdemo/img/car.png', new BMap.Size(52, 26), {anchor: new BMap.Size(27, 13)}),//声明高铁标注
        autoView:true,
        enableRotation: true
    });
    var icon1 = new BMap.Icon('station.png', new BMap.Size(32,32),{anchor: new BMap.Size(16, 32)});//声明站点标注
    for (var i=0;i<markers.length;i++){
        map.addOverlay(new BMap.Marker(markers[i],{icon:icon1}));//添加站点marker
    }
    //map.centerAndZoom(point, 12 );//设置中心点和级别（级别是1-20）数字越大越是放大
    lushu.start();
}
function carMove(){
    $(".carSearch").hide();
}
/**-----------------------------显示监控设备----------------------- */
function videoLoad() {
    map.clearOverlays();
    var videoPoints = [[104.285822, 30.309233], [104.296171, 30.274307], [104.554308, 30.482679], [104.574143, 30.430845], [104.545109, 30.408703], [104.490492, 30.306992], [104.452548, 30.38478], [104.447661, 30.372068], [104.625598, 30.385278], [104.656643, 30.451551], [104.661817, 30.480687], [104.683051, 30.466743], [104.65693, 30.377552], [104.583054, 30.358108], [104.514926, 30.509316]];

    for (var i = 0; i < videoPoints.length; i++) {
        var pt = new BMap.Point(videoPoints[i][0], videoPoints[i][1]);
        var myIcon = new BMap.Icon("http://123.146.170.80:8911/mapIcon/camera.png", new BMap.Size(30, 30));
        var marker2 = new BMap.Marker(pt, {icon: myIcon});  // 创建标注
        map.addOverlay(marker2);
        marker2.addEventListener("click", videoInfo);
    }

}


/**-----------------------------显示热力图----------------------- */
function hotLoad() {
    map.clearOverlays();
    var hotPoints =
        [
        {"lng":104.647409,"lat":30.903069,"count":50},
        {"lng":104.547409,"lat":30.916532,"count":51},
        {"lng":104.419787,"lat":30.930658,"count":15},
        {"lng":104.418455,"lat":30.920921,"count":40},
        {"lng":104.418843,"lat":30.915516,"count":100},
        {"lng":104.42546,"lat":30.918503,"count":6},
        {"lng":104.423289,"lat":30.919989,"count":18},
        {"lng":104.418162,"lat":30.915051,"count":80},
        {"lng":104.422030,"lat":30.91782,"count":11},
        {"lng":104.41387,"lat":30.917253,"count":7},
        {"lng":104.41773,"lat":30.919426,"count":42},
        {"lng":104.421107,"lat":30.916445,"count":4},
        {"lng":104.417521,"lat":30.917943,"count":27},
        {"lng":104.419812,"lat":30.920836,"count":23},
        {"lng":104.420682,"lat":30.91463,"count":60},
        {"lng":104.415424,"lat":30.924675,"count":8},
        {"lng":104.419242,"lat":30.914509,"count":15},
        {"lng":104.422766,"lat":30.921408,"count":25},
        {"lng":104.421674,"lat":30.924306,"count":21},
        {"lng":104.427268,"lat":30.92267,"count":1},
        {"lng":104.417721,"lat":30.920034,"count":51},
        {"lng":104.412456,"lat":30.92667,"count":7},
        {"lng":104.420432,"lat":30.919114,"count":11},
        {"lng":104.425013,"lat":30.921611,"count":35},
        {"lng":104.418733,"lat":30.931037,"count":22},
        {"lng":104.419336,"lat":30.931134,"count":4},
        {"lng":104.413557,"lat":30.923254,"count":5},
        {"lng":104.418367,"lat":30.92943,"count":3},
        {"lng":104.424312,"lat":30.919621,"count":100},
        {"lng":104.423874,"lat":30.919447,"count":87},
        {"lng":104.424225,"lat":30.923091,"count":32},
        {"lng":104.417801,"lat":30.921854,"count":44},
        {"lng":104.417129,"lat":30.928227,"count":21},
        {"lng":104.426426,"lat":30.922286,"count":80},
        {"lng":104.421597,"lat":30.91948,"count":32},
        {"lng":104.423895,"lat":30.920787,"count":26},
        {"lng":104.423563,"lat":30.921197,"count":17},
        {"lng":104.417982,"lat":30.922547,"count":17},
        {"lng":104.426126,"lat":30.921938,"count":25},
        {"lng":104.42326,"lat":30.915782,"count":100},
        {"lng":104.419230,"lat":30.916759,"count":30},
        {"lng":104.417185,"lat":30.929123,"count":11},
        {"lng":104.417237,"lat":30.927518,"count":9},
        {"lng":104.417784,"lat":30.915754,"count":47},
        {"lng":104.420193,"lat":30.917061,"count":52},
        {"lng":104.422735,"lat":30.915619,"count":100},
        {"lng":104.418495,"lat":30.915958,"count":46},
        {"lng":104.416292,"lat":30.931046,"count":9},
        {"lng":104.419916,"lat":30.924055,"count":8},
        {"lng":104.42189,"lat":30.921308,"count":11},
        {"lng":104.413765,"lat":30.929376,"count":3},
        {"lng":104.418232,"lat":30.920348,"count":50},
        {"lng":104.417554,"lat":30.930511,"count":15},
        {"lng":104.418568,"lat":30.918161,"count":23},
        {"lng":104.413461,"lat":30.926306,"count":3},
        {"lng":104.42232,"lat":30.92161,"count":13},
        {"lng":104.4174,"lat":30.928616,"count":6},
        {"lng":104.424679,"lat":30.915499,"count":21},
        {"lng":104.42171,"lat":30.915738,"count":29},
        {"lng":104.417836,"lat":30.916998,"count":99},
        {"lng":104.420755,"lat":30.928001,"count":10},
        {"lng":104.414077,"lat":30.930655,"count":14},
        {"lng":104.426092,"lat":30.922995,"count":16},
        {"lng":104.41535,"lat":30.931054,"count":15},
        {"lng":104.413022,"lat":30.921895,"count":13},
        {"lng":104.415551,"lat":30.913373,"count":17},
        {"lng":104.421191,"lat":30.926572,"count":1},
        {"lng":104.419612,"lat":30.917119,"count":9},
        {"lng":104.418237,"lat":30.921337,"count":54},
        {"lng":104.423776,"lat":30.921919,"count":26},
        {"lng":104.417694,"lat":30.92536,"count":17},
        {"lng":104.415377,"lat":30.914137,"count":19},
        {"lng":104.417434,"lat":30.914304,"count":43},
        {"lng":104.42588,"lat":30.922622,"count":27},
        {"lng":104.418345,"lat":30.919467,"count":8},
        {"lng":104.426883,"lat":30.917171,"count":3},
        {"lng":104.423877,"lat":30.916659,"count":34},
        {"lng":104.415712,"lat":30.915613,"count":14},
        {"lng":104.419869,"lat":30.931416,"count":12},
        {"lng":104.416956,"lat":30.925377,"count":11},
        {"lng":104.42066,"lat":30.925017,"count":38},
        {"lng":104.416244,"lat":30.920215,"count":91},
        {"lng":104.41929,"lat":30.915908,"count":54},
        {"lng":104.422104,"lat":30.919658,"count":21},
        {"lng":104.4183,"lat":30.925015,"count":15},
        {"lng":104.421969,"lat":30.913527,"count":3},
        {"lng":104.422936,"lat":30.921854,"count":24},
        {"lng":104.41905,"lat":30.929217,"count":12},
        {"lng":104.424579,"lat":30.914987,"count":57},
        {"lng":104.42076,"lat":30.915251,"count":70},
        {"lng":104.425867,"lat":30.918989,"count":8}];
    heatmapOverlay = new BMapLib.HeatmapOverlay({"radius":20});
    map.addOverlay(heatmapOverlay);
    heatmapOverlay.setDataSet({data:hotPoints,max:100});
    closeHeatmap();
    function setGradient(){
        var gradient = {};
        var colors = document.querySelectorAll("input[type='color']");
        colors = [].slice.call(colors,0);
        colors.forEach(function(ele){
            gradient[ele.getAttribute("data-key")] = ele.value;
        });
        heatmapOverlay.setOptions({"gradient":gradient});
    }
    setTimeout(function(){
        heatmapOverlay.show();
    },1500);
}

/**-----------------------------显示视频监控----------------------- */
function videoInfo(){
    art.dialog.open('playback.html',
        {title: '视频监控', width: '900px', height: '600px',shade: 0.5,mask:true});
}