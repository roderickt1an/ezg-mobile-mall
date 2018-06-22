var flag = 0;


function initCallback(captchaObj){

	
	  captchaObj.onReady(function () {
          $("#wait").hide();
      }).onSuccess(function () {
          var result = captchaObj.getValidate();
          if (!result) {
              return alert('请完成验证');
          }
          

 		 var phone = $("#changeTel_oldTel").val();
 		 var password = $("#changeTel_password").val();
 		 var url,type = 0,param=[];
 	
 	     param=[];
 		 param.push('loginUserVo.mobile='+phone);
 		 param.push('loginUserVo.passwd='+BASE64.encoder(password));
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
	  
	  
	  $('#changeTel_getVerificationCode_old').click(function () {
			 
		  var phone = $("#changeTel_oldTel").val();
		  var password = $("#changeTel_password").val();
		  if(isNull(password)){
			 error_dialog.setText("密码不得为空！")
			 error_dialog.show_dialog();
			  return;
		  }
		  
		 if (phone==''||phone.length!=11){
			 error_dialog.setText("手机号格式错误！")
			 error_dialog.show_dialog();
			 return;
		 }
		 
		  var url,type = 0,param=[];
		  //检验手机号是否正确
		  url = TERMINAL_URL+'/jsonrest/customer/UserResetMobile/0/checkMobileAndPasswd';
		    param=[];
			param.push('loginUserVo.mobile='+phone);
			param.push('loginUserVo.passwd='+BASE64.encoder(password));
			param.push('requestType='+4);
			param.push('returnURL=index.html');
			param.push('t='+new Date());
			ajax({
				url : url,
				type : 'post',// 非必须.默认get
				dataType : 'json',// 非必须.默认text
				data:param.join('&'),
				async : false,// 非必须.默认true
				cache : false,// 非必须.默认false
				timeout : 30000,// 非必须.默认30秒
				success : checkInfoSuccess
			// 非必须
			},type);
	
			if ( 1==flag ){
				
				 captchaObj.verify();
				
			}
			 
		  
	  });
	

}

$(document).ready(function () {
	initDialog();//初始化dialog
	
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
    
	
	 $('#changeTel_button_old').click(function () {
//	      点击下一步按钮触发时间，建议完成Ajax后再调用计时器
		 checkVerifyCode();
	 });
	 
	//判断验证码是否有效
	 function checkVerifyCode(){

//		  $(".wrong_info").remove();
		  var  phone = $("#changeTel_oldTel").val();	 
		  var  code = $("#changeTel_VerificationCode").val();
		  var password = $("#changeTel_password").val();
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
		  
		  if(isNull(password)){
			  error_dialog.setText("密码不得为空！")
			  error_dialog.show_dialog();
			  return;
		  }
		  
		  //判断验证码是否有效
		    var type = 0;
			var url = TERMINAL_URL + '/jsonrest/customer/UserResetMobile/1/checkValidateCode';
			var param=[];
			param.push('loginUserVo.operCode='+phone);
			param.push('loginUserVo.passwd='+BASE64.encoder(password));
			param.push('validateCode='+code);
			param.push('loginUserVo.mobile='+phone);
			param.push('loginUserVo.loginType='+100);
			ajax({
				url : url,
				type : 'post',// 非必须.默认get
				dataType : 'json',// 非必须.默认text
				data:param.join('&'),
				async : true,// 非必须.默认true
				cache : false,// 非必须.默认false
				timeout : 30000,// 非必须.默认30秒
				success : checkVerifyCodeSuccess
			// 非必须
			},type);
		  
	  
	 }
	 
	 
	  
});

function checkInfoSuccess(data){
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
		  setTime( $("#changeTel_getVerificationCode_old"), 60);
		  
	  }else{
		  error_dialog.setText(data.msg)
		  error_dialog.show_dialog();
	  }
}

function checkVerifyCodeSuccess(data){
	if(data.msgCode == 1){
		location.href='options_changeTel2.html?t='+new Date().getTime();
	}else{
		error_dialog.setText(data.msg)
		error_dialog.show_dialog();
	}
}
