
var simpleAlert = function (opts) {
    //设置默认参数
    var opt = {
        "closeAll": false,
        "title": "",
        "content": "",
        "buttons": {}
    }
    //合并参数
    var option = $.extend(opt, opts);
    //事件
    var dialog = {}
    var $simpleAlert = $('<div class="simpleAlert">');
    var $shelter = $('<div class="simpleAlertShelter">');
    var $simpleAlertBody = $('<div class="simpleAlertBody">');
    var $simpleAlertBodyClose = $('<img class="simpleAlertBodyClose" src="img/closeWhite.png" height="14" width="14"/>');
    var $simpleAlertBodyTitle = $('<p class="simpleAlertBodyTitle">' + option.title + '</p>');
    var $simpleAlertBodyName = $('<p class="simpleAlertBodyContent">姓名：<label><input id="TEL"></label></p>' );
    var $simpleAlertBodyTel= $('<p class="simpleAlertBodyContent">电话：<label><input id="NAME"></label></p>' );
    dialog.init = function () {
        $simpleAlertBody.append($simpleAlertBodyClose).append($simpleAlertBodyName).append($simpleAlertBodyTel).append($simpleAlertBodyTitle);
        var num = 0;
        var only = false;
        var onlyArr = [];
        for (var i = 0; i < 2; i++) {
            for (var key in option.buttons) {
                switch (i) {
                    case 0:
                        onlyArr.push(key);
                        break;
                    case 1:
                        if (onlyArr.length <= 1) {
                            only = true;
                        } else {
                            only = false;
                        }
                        num++;
                        var $btn = $('<button class="simpleAlertBtn simpleAlertBtn' + num + '">' + key + '</button>')
                        $btn.bind("click", option.buttons[key]);
                        if (only) {
                            $btn.addClass("onlyOne")
                        }
                        $simpleAlertBody.append($btn);
                        break;
                }

            }
        }
        $simpleAlert.append($shelter).append($simpleAlertBody);
        $("body").append($simpleAlert);
        $simpleAlertBody.show().animate({"marginTop":"-128px","opacity":"1"},300);
    }
    //右上角关闭按键事件
    $simpleAlertBodyClose.bind("click", function () {
        option.closeAll=false;
        dialog.close();
    })
    dialog.close = function () {
        if(option.closeAll){
            $(".simpleAlertBody").animate({"marginTop": "-188px", "opacity": "0"}, 200, function () {
                $(".simpleAlert").remove()
            });
        }else {
            $simpleAlertBody.animate({"marginTop": "-188px", "opacity": "0"}, 200, function () {
                $(".simpleAlert").last().remove()
            });
        }
    }
    dialog.init();
    return dialog;
}