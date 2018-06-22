var flag = 0;
var g_t = getUrlParam("t");
function initCallback(captchaObj){

	
	  captchaObj.onReady(function () {
        $("#wait").hide();
    }).onSuccess(function () {
        var result = captchaObj.getValidate();
        if (!result) {
            return alert('请完成验证');
        }
        

		 var phone = $("#changeTel_newTel").val();
		 
		  var url,type = 0,param=[];
		  
		  param=[];
		  param.push('loginUserVo.mobile='+phone);
		  param.push('loginUserVo.operCode='+phone);
		  param.push('requestType='+4);
		  param.push('returnURL=index.html');
		  param.push('geetestChallenge='+result.geetest_challenge);
	  	  param.push('geetestValidate='+result.geetest_validate);
	  	  param.push('geetestSeccode='+result.geetest_seccode);
		  param.push('t='+new Date());
		  //60秒倒计时
			url = TERMINAL_URL+'/jsonrest/customer/UserResetMobile/0/sendVerifyMobileCode';
			ajax({
				url : url,
				type : 'post',// 非必须.默认get
				dataType : 'json',// 非必须.默认text
				data:param.join('&'),
				async : true,// 非必须.默认true
				cache : false,// 非必须.默认false
				timeout : 30000,// 非必须.默认30秒
				success : sendMobileSuccess
			// 非必须
			},type);	 
			    
	 
				
    });
	  
	  
	  $('#changeTel_getVerificationCode_new').click(function () {
		  
		  var phone = $("#changeTel_newTel").val();
			 
			 if (phone==''||phone.length!=11){
				 error_dialog.setText("手机号格式错误！")
				 error_dialog.show_dialog();
				 
				 return;
			 }
			 
			 
			 var url,type = 0,param=[];
			  //检验手机号是否注册
			  url = TERMINAL_URL+'/jsonrest/customer/UserResetMobile/0/registerCheckMobile';
			    param=[];
				param.push('loginUserVo.mobile='+phone);
				param.push('loginUserVo.operCode='+phone);
				param.push('requestType='+4);
				param.push('returnURL=index.html');
				param.push('t='+new Date());
				ajax({
					url : url,
					type : 'get',// 非必须.默认get
					dataType : 'json',// 非必须.默认text
					data:param.join('&'),
					async : false,// 非必须.默认true
					cache : false,// 非必须.默认false
					timeout : 30000,// 非必须.默认30秒
					success : registerCheckMobileSuccess
				// 非必须
				},type);
				
				
		  if(flag == 1){
			  
			  captchaObj.verify();
		  }
	  });
	

}

$(document).ready(function () {
	initDialog();//初始化dialog
	successDialog();//提交成功对话框框
	var time = new Date().getTime();
	if(g_t==''||isNaN(g_t)){
		location.href='options_changeTel.html';
	}else if(time < g_t||time - g_t > 600000){
		location.href='options_changeTel.html';
	}
	var isLogin =validLoginStatus();// src="/scripts/common/module.js"
	if(!isLogin){ 
		location.href = 'login_usePW.html';
	}
	  var url = TERMINAL_URL+'/imageCode/registerImageCode';
	$.ajax({
	    url: url+"?t=" + (new Date()).getTime(), // 加随机数防止缓存
	    type: "get",
	    dataType: "json",
	    success: function (data) {
	        // 调用 initGeetest 初始化参数
	        // 参数1：配置参数
	        // 参数2：回调，回调的第一个参数验证码对象，之后可以使用它调用相应的接口
	        initGeetest({
	            gt: data.gt,
	            challenge: data.challenge,
	            new_captcha: data.new_captcha, // 用于宕机时表示是新验证码的宕机
	            offline: !data.success, // 表示用户后台检测极验服务器是否宕机，一般不需要关注
	            product: "bind", // 产品形式，包括：float，popup
	            width: "100%"
	            // 更多配置参数请参见：http://www.geetest.com/install/sections/idx-client-sdk.html#config
	            }, initCallback);
	        }
	  });
	    
	 
	 $('#changeTel_button_new').click(function () {
//	      验证码按钮触发事件，建议完成Ajax后再调用计时器
		 resetSubmit();
	 });
	 
	 $('#changeTel_dialog_yes').click(function () {
//	      验证码按钮触发事件，建议完成Ajax后再调用计时器
		 location.href = 'center.html';
	 });
	 
	
	 function resetSubmit(){

//		  $(".wrong_info").remove();
		  var  phone = $("#changeTel_newTel").val();	 
		  var  code = $("#changeTel_getVerificationCode").val();
		  if(phone==''||phone.length!=11){		
			  error_dialog.setText("手机号格式错误！")
			  error_dialog.show_dialog();
			  return;
		  }		
	
		  if(isNaN(code)){
			  error_dialog.setText("验证码格式有误！")
			  error_dialog.show_dialog();
			  return;
		  }
		  
		//判断是账号否注册
		  //判断验证码是否有效
		    var type = 0;
			var url = TERMINAL_URL + '/jsonrest/customer/UserResetMobile/1/updateCustomerMobile';
			var param=[];
			param.push('loginUserVo.operCode='+phone);
			param.push('validateCode='+code);
			param.push('loginUserVo.mobile='+phone);
			param.push('loginUserVo.operType='+100);
			ajax({
				url : url,
				type : 'post',// 非必须.默认get
				dataType : 'json',// 非必须.默认text
				data:param.join('&'),
				async : true,// 非必须.默认true
				cache : false,// 非必须.默认false
				timeout : 30000,// 非必须.默认30秒
				success : updateSuccess
			// 非必须
			},type);
		  
	  
	 }
	 


});


var success_dialog;
function successDialog(){
	success_dialog = new Dialog('#success_dialog', {
		time: 2000,
		callbackAfter: function(){
//			location.href = "/login_usePW.html";
			var type = 0;
			var url = TERMINAL_URL + '/jsonrest/userlogin/UserLogin/1/exitLogin';
			$.ajax({
				url : url,
				type : 'get',// 非必须.默认get
				dataType : 'json',// 非必须.默认text
				async : true,// 非必须.默认true
				cache : false,// 非必须.默认false
				timeout : 30000,// 非必须.默认30秒
				success : exitSuccess
			// 非必须
			},type);
		}
	});
	success_dialog.setButton({"successbutton":'确定'});
	success_dialog.setText("修改成功，请重新登录！");
	$("#successbutton").click(function(){
		success_dialog.remove_dialog();
	});
}

function exitSuccess(data){

	 if (data.msgCode == 1) {
		location.href = "/login_usePW.html";
	}
}

function registerCheckMobileSuccess(data){
	  if (data.msgCode == 1) {
		  flag = 1;
	  }else{
		  if((data.entity)){		
			  flag = data.entity.registerStatus;;
		  }else{
			  error_dialog.setText(data.msg)
			  error_dialog.show_dialog();
		  }
		 
	  }
}
function sendMobileSuccess(data){
	  if (data.msgCode == 1) {
		  setTime( $("#changeTel_getVerificationCode_new"), 60);
		  
	  }else{
		  error_dialog.setText(data.msg)
		  error_dialog.show_dialog();
	  }
}

function updateSuccess(data){
	if(data.msgCode == 1){
		success_dialog.show_dialog();
		
	}else{
		 error_dialog.setText(data.msg)
		 error_dialog.show_dialog();
	}
}
