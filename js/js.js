$(function(){
    $(".find_nav_list").css("left",sessionStorage.left+"px");
    $(".find_nav_list li").each(function(){
        if($(this).find("a").text()==sessionStorage.pagecount){
            $(".sideline").css({left:$(this).position().left});
            $(".sideline").css({width:90});
            $(this).addClass("find_nav_cur").siblings().removeClass("find_nav_cur");
            navName(sessionStorage.pagecount);
            return false
        }
        else{
            $(".sideline").css({left:0});
            $(".find_nav_list li").eq(0).addClass("find_nav_cur").siblings().removeClass("find_nav_cur");
        }
    });
    var nav_w=$(".find_nav_list li").first().width();
 //   $(".sideline").width(nav_w);
    $(".find_nav_list li").on('click', function(){
        nav_w=$(this).width();
        $(".sideline").stop(true);
        $(".sideline").animate({left:$(this).position().left},300);
        $(".sideline").animate({width:nav_w});
        $(this).addClass("find_nav_cur").siblings().removeClass("find_nav_cur");
        var fn_w = ($(".find_nav").width() - nav_w) / 2;
        var fnl_l;
        var fnl_x = parseInt($(this).position().left);
        if (fnl_x <= fn_w) {
            fnl_l = 0;
        } else if (fn_w - fnl_x <= flb_w - fl_w) {
            fnl_l = flb_w - fl_w;
        } else {
            fnl_l = fn_w - fnl_x;
        }
        $(".find_nav_list").animate({
            "left" : fnl_l
        }, 300);
        sessionStorage.left=fnl_l;
        var c_nav=$(this).find("a").text();
        navName(c_nav);
    });
    var fl_w=$(".find_nav_list").width();
    var flb_w=$(".find_nav_left").width();
    $(".find_nav_list").on('touchstart', function (e) {
        var touch1 = e.originalEvent.targetTouches[0];
        x1 = touch1.pageX;
        y1 = touch1.pageY;
        ty_left = parseInt($(this).css("left"));
    });
    $(".find_nav_list").on('touchmove', function (e) {
        var touch2 = e.originalEvent.targetTouches[0];
        var x2 = touch2.pageX;
        var y2 = touch2.pageY;
        if(ty_left + x2 - x1>=0){
            $(this).css("left", 0);
        }else if(ty_left + x2 - x1<=flb_w-fl_w){
            $(this).css("left", flb_w-fl_w);
        }else{
            $(this).css("left", ty_left + x2 - x1);
        }
        if(Math.abs(y2-y1)>0){
            e.preventDefault();
        }
    });
});
function navName(c_nav) {
    switch (c_nav) {
        case "全部":
            sessionStorage.pagecount = "全部";
            break;
        case "商事":
            sessionStorage.pagecount = "商事";
            break;
        case "企划":
            sessionStorage.pagecount = "企划";
            break;
        case "财税":
            sessionStorage.pagecount = "财税";
            break;
    }
}
$(document).ready(function () {
    $("#index").click(function () {
        $('.list').find('i').removeAttr('style')
        $('#index').find('i').attr('style','color: rgba(178, 45, 0, 1)')
        $("#div2").hide();
        $("#div3").hide();
        $("#div4").hide();
        $("#div1").show();
    });
});
$(document).ready(function () {
    $("#news").click(function () {
        $('.list').find('i').removeAttr('style')
        $('#news').find('i').attr('style','color: rgba(178, 45, 0, 1)')
        $("#index").removeClass("active");
        $("#div1").hide();
        $("#div3").hide();
        $("#div4").hide();
        $("#div2").show();
    });
});
$(document).ready(function () {
    $("#contact").click(function () {
        $('.list').find('i').removeAttr('style')
        $('#contact').find('i').attr('style','color: rgba(178, 45, 0, 1)')
        $("#index").removeClass("active");
        $("#div1").hide();
        $("#div2").hide();
        $("#div4").hide();
        $("#div3").show();
    });
});
$(document).ready(function () {
    $("#about").click(function () {
        $('.list').find('i').removeAttr('style')
        $('#about').find('i').attr('style','color: rgba(178, 45, 0, 1)')
        $("#index").removeClass("active");
        $("#div2").hide();
        $("#div3").hide();
        $("#div1").hide();
        $("#div4").show();
    });
});