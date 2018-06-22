
var TERMINAL_URL="/service100gonghost";

var UPLOAD_URL = "http://upload.zgcfo.com"
//需要单价的产品属性编码
var UNIT_PRICE_PRODUCT_CODE = ['lsb','xgm','ybnsr','gxjyzy','wyzptkjs','wyzzjyskjs'];

//获取url参数
function getUrlParam(sName)
{	
	if(sName)
	{
		var sValue='';
		var re= new RegExp("\\b"+sName+"\\b=([^&=]+)");
		var st=null;
		st=window.location.search.match(re);
		if(st&&st.length==2)
		{	
			st[1]=st[1].replace(/^\s*|\s*$/g,'');
			sValue=st[1];
		}
		return sValue;
	}
	else
	{
		var freeCheck_dialog = new Dialog('#error_dialog');
		 freeCheck_dialog.dialog.find('p').html('参数不能为空');
	     freeCheck_dialog.dialog.find('button').text('确定');
	     freeCheck_dialog.Show_dialog();
	     freeCheck_dialog.dialog.find('button').click(function () {
	    	 freeCheck_dialog.Remove_dialog(); 
	     });
		return false;
	}
}
function getUrlCode()
{
	var url = window.location.href;
	var index = url.lastIndexOf("/");
	var indexdian = url.lastIndexOf(".");
	var code = url.substring(index+1, indexdian);
	return code;
}
//时间格式化
Date.prototype.Format = function (fmt) { 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "H+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
var isNull=function(str){
	if (str == null || str == undefined || str == '') { 
			return true;
	} else {
		return false;
	}

}
var isPhone=function(str){//判断是否是正确的手机号
	
	if(isNull(str)){
		return false;
	}else{
		var p1=/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
		    var	b=false;
		    if(p1.test(str)==b){     				       
		    	return false;
		    }
		    return true;
	}  
};
function isPwd( s ){//判断是否是数字或字母或下划线组成的正确密码
	var regu = "^[0-9a-zA-Z\_]+$";
	var re = new RegExp(regu);
	if (re.test(s)) {
		if(s.length<=16 && s.length>=6){
			return true;
		}else{
			return false;
		}

	}else{
		return false;
	}
}

function isUnitFlag(code){

	var unitFlag = false;
	var codeArray = UNIT_PRICE_PRODUCT_CODE;

	for (var i = 0, j = codeArray.length; i < j; i++){
        if (codeArray[i] === code)
        	unitFlag = true;
	}
	
	return unitFlag;
}

function changeLoginStatus(){
	var obj = loginStatusData();
	console.log(obj);
	return obj;
}
function getCartNum(){
	var obj = loginStatusData();
	return obj.extendMap.num;
}
function loginStatusData(){
	var obj = null;
	var type = 0;
	var url = TERMINAL_URL + '/jsonrest/userlogin/UserLogin/1/loginStatus';
	$.ajax({
		url : url,
		type : 'get',// 非必须.默认get
		dataType : 'json',// 非必须.默认text
		async : false,// 非必须.默认true
		cache : false,// 非必须.默认false
		timeout : 30000,// 非必须.默认30秒
		success : function(data){
			obj = data;
		}
	// 非必须
	},type);
	return obj;
}
function exitLogin(){
	var type = 0;
	var url = TERMINAL_URL + '/jsonrest/userlogin/UserLogin/1/exitLogin';
	$.ajax({
		url : url,
		type : 'get',// 非必须.默认get
		dataType : 'json',// 非必须.默认text
		async : true,// 非必须.默认true
		cache : false,// 非必须.默认false
		timeout : 30000,// 非必须.默认30秒
		success : exitLoginSuccess
	// 非必须
	},type);
}

function exitLoginSuccess(data){

	 if (data.msgCode == 1) {
		location.href = "/";
	}
}
function defaultLogin(){
	$('#header_userLogin').html('登录');
	$('#header_userLogin').attr("href","/page/login/login.html");
	$("#header_userRegister").html('注册');
	$("#header_userRegister").attr("href","/page/login/register.html");
}

function normalLogin(userCode){
	$('#header_userLogin').html(userCode);
	$('#header_userLogin').attr("href","#");
	$("#header_userRegister").html('注销');
	$("#header_userRegister").attr("href","javascript:exitLogin()");
	$("#header_userOrder").css("display","");
	$("#header_userEnterprise").css("display","");
}
String.prototype.startWith=function(str){     
	  var reg=new RegExp("^"+str);     
	  return reg.test(this);        
	}  

String.prototype.endWith=function(str){     
  var reg=new RegExp(str+"$");     
  return reg.test(this);        
}

var error_dialog;

function initDialog(){
	//错误提示窗口初始化
	error_dialog = new Dialog('#error_dialog', {
	  time: 2000
	});
	error_dialog.setButton({"errorbutton":'确定'});
	$("#errorbutton").click(function(){
		  error_dialog.remove_dialog();
	});

}


function setCookie(name,value) { 
	var Days = 30; var exp = new Date(); exp.setTime(exp.getTime() + Days*24*60*60*1000);
	document.cookie = name + "="+ escape (value) + ";expires=" + DataTime.MaxValue+";path=/;domain=m.zgcfo.com"; 

} 

function get_cookie(Name) {
    var search = Name + "="
    var returnvalue = "";
    if (document.cookie.length > 0) {
        offset = document.cookie.indexOf(search)
    if (offset != -1) {
        offset += search.length
        end = document.cookie.indexOf(";", offset);
    if (end == -1)
        end = document.cookie.length;
        returnvalue=(document.cookie.substring(offset, end))
    }
    }
    return returnvalue;
}

