
function initCallback(captchaObj){

	
	  captchaObj.onReady(function () {
          $("#wait").hide();
      }).onSuccess(function () {
          var result = captchaObj.getValidate();
          if (!result) {
              return alert('请完成验证');
          }
         
          var phoneNumber = $("#register_phoneNumber").val();
          
      	 var url,type = 0,param=[];
	 
	  		 //发送验证码;
	  	
	  		 url = TERMINAL_URL + '/jsonrest/userlogin/UserLogin/0/sendSMSLoginCode';
	  	
	  		var username = $("#loginM_phoneNumber").val();
	  		param.push('loginName='+username);
	  		param.push('geetestChallenge='+result.geetest_challenge);
	  		param.push('geetestValidate='+result.geetest_validate);
	  		param.push('geetestSeccode='+result.geetest_seccode);
	  		param.push('t='+new Date());
	  		ajax({
	  			url : url,
	  			type : 'post',// 非必须.默认get
	  			dataType : 'json',// 非必须.默认text
	  			data:param.join('&'),
	  			async : true,// 非必须.默认true
	  			cache : false,// 非必须.默认false
	  			timeout : 30000,// 非必须.默认30秒
	  			success : checkMobileSuccess
	  		// 非必须
	  		},type);
         
      });
	  
	  
	  
	  $('#loginM_getVerificationCode').click(function () {
		  	//	      验证码按钮触发事件，建议完成Ajax后再调用计时器
		  captchaObj.verify();
		 
	    });
	  
	  
	


}





  $(document).ready(function () {	
	  initDialog();
	  
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
      
	  $("#loginPW_submit").click(function(){
		  userLogin(0);
	  });
	  $("#loginM_submit").click(function(){
		  userLogin(1);
	  });
	
    
  });
  
function checkCookie(){
	var usercode = $.cookie('bG9naW5fcGhvbmVOdW1iZXI'); 
	var mypassword = $.cookie('bG9naW5fcGFzc3dvcmQ'); 
	if(usercode || mypassword){
		PhoneNumber(0,1).val(usercode);
		Password(0,1).val(mypassword);
		$("#cookie-fast-flag").val('1');
		$('.login_autoLogin').attr("checked", "checked");
	}
	
}
  
  
  function userLogin(num) {
		show_loading('body', '/images/loading.gif',true);
	  var pwd = $("#loginPW_password").val();
		var type = 0;
		var url ;
		var param=[];
		if (0 == num){
			var usercode  =  $("#loginPW_phoneNumber").val();
			if(!usercode){
				error_dialog.setText('请输入账号！');
				error_dialog.show_dialog();
				remove_loading();
				return;
			}
			
			if(!pwd){
				error_dialog.setText('请输入密码！');
				error_dialog.show_dialog();
				remove_loading();
				return;
			}
		
			param.push('loginName='+usercode);
			param.push('password='+BASE64.encoder(pwd));			
			
		}else if (1 == num){
			var usercode  =   $("#loginM_phoneNumber").val();
			if(!usercode){
				error_dialog.setText('请输入账号！');
				error_dialog.show_dialog();
				remove_loading();
				return;
			}
			
			param.push('loginName='+usercode);
			param.push('validateCode='+$('#loginM_verificationCode').val());
			param.push('isMsgLogin=0');//短信登录
		}
		url = TERMINAL_URL + '/jsonrest/userlogin/UserLogin/1/login';
		ajax({
			url : url,
			type : 'post',// 非必须.默认get
			dataType : 'json',// 非必须.默认text
			data:param.join('&'),
			async : true,// 非必须.默认true
			cache : false,// 非必须.默认false
			timeout : 30000,// 非必须.默认30秒
			success : loginSuccess
		// 非必须
		},type);
	}
  
  function checkMobileSuccess(data){
	  if (data.msgCode == 1) {
		  $("#check-mobile-flag").val(1);
		  setTime($('#loginM_getVerificationCode'),60);
	  }else{
		  $("#check-mobile-flag").val(0);
		  
		  error_dialog.setText(data.msg);
			error_dialog.show_dialog();
	  }
  }
  
  function loginSuccess(data){
		remove_loading();
	  var url = '/';
	  if (data.msgCode == 1) {
			locationHref(url);			 
	  }else{	
		  error_dialog.setText(data.msg);
			error_dialog.show_dialog();
			
		
	  }
  }