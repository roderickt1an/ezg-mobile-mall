
function initCallback(captchaObj){

	
	  captchaObj.onReady(function () {
          $("#wait").hide();
      }).onSuccess(function () {
          var result = captchaObj.getValidate();
          if (!result) {
              return alert('请完成验证');
          }
         
      	 var url,type = 0,param=[];
	 
      	  url = TERMINAL_URL+'/jsonrest/userlogin/UserRegister/0/sendVerifyMobileCode';
  		
	  		
			  var username = $("#register_phoneNumber").val();;
			param.push('loginUserVo.mobile='+username);
			param.push('requestType='+1);
			param.push('returnURL=index.html');
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
	  			success : sendMobileSuccess
	  		// 非必须
	  		},type);
         
      });
	  
	  
	  

	  $('#register_getVerificationCode').click(function () {
	
		  var username = $("#register_phoneNumber").val();
		  if(!(username)){
			  error_dialog.setText("手机号格式不正确");
			  error_dialog.show_dialog();
			  return;
		  }
		  var url,type = 0,param=[];
		  //检验手机号是否注册
		  url = TERMINAL_URL+'/jsonrest/userlogin/UserRegister/0/registerCheckMobile';
		    param=[];
			param.push('loginUserVo.mobile='+username);
			param.push('requestType='+1);
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
			
			var flag = $("#check-mobile-flag").val();
			
			if(flag == 1){
				
				  captchaObj.verify();
				  
			}
	      
	      
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
      
	  $("#register_submit").click(function () {
        userRegister();

      });
	
    }
  );
  
  function checkMobile(){
	  var username = PhoneNumber();
	  if (!username){return;}
	  var type = 0;
		var url = TERMINAL_URL+'/jsonrest/userlogin/UserRegister/0/registerCheckMobile';
		var param=[];
		param.push('loginUserVo.mobile='+username);
		param.push('requestType='+1);
		param.push('t='+new Date());
		ajax({
			url : url,
			type : 'get',// 非必须.默认get
			dataType : 'json',// 非必须.默认text
			data:param.join('&'),
			async : true,// 非必须.默认true
			cache : false,// 非必须.默认false
			timeout : 30000,// 非必须.默认30秒
			success : checkMobileSuccess
		// 非必须
		},type);
  }
  
  function checkMobileSuccess(data){
	  if (data.msgCode == 1) {
		  error_dialog.setText(data.msg);
		  error_dialog.show_dialog();
		
	  }else{
		  error_dialog.setText(data.msg);
		  error_dialog.show_dialog();
	  }
  }
  
  function RegisterGetIdentify() {
	  var username = $("#register_phoneNumber").val();

	  var url,type = 0,param=[];
	    param=[];
		param.push('loginUserVo.mobile='+username);
		param.push('requestType='+1);
		param.push('returnURL=index.html');
		param.push('t='+new Date());

		url = TERMINAL_URL+'/jsonrest/userlogin/UserRegister/0/sendVerifyMobileCode';
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
		

  }
  
  function registerCheckMobileSuccess(data){
	  if (data.msgCode == 1) {
		  $("#check-mobile-flag").val(1);
	  }else{
		  $("#check-mobile-flag").val(0);
		  
		  error_dialog.setText(data.msg);
		  error_dialog.show_dialog();
	
	  }
  }
  
  function sendMobileSuccess(data){
	  if (data.msgCode == 1) {
			setTime($('#register_getVerificationCode'),60);//60秒倒计时
	  }else{
		  
		  error_dialog.setText(data.msg);
		  error_dialog.show_dialog();
	  }
  }
 
  
  function userRegister() {
		show_loading('body', '/images/loading.gif',true);
	 // $(".wrong_info").remove();
	  var username = $("#register_phoneNumber").val();
	  var pwd = $("#register_password").val();
	  var repwd = $("#register_rePassword").val();
	  var checkcode = $("#verificationCode").val();

	  if(!checkcode){
		  error_dialog.setText("验证码不可为空");
		  error_dialog.show_dialog();
		  remove_loading();
		  return;
	  }
	 
	  if(!repwd){
		  error_dialog.setText("密码不可为空");
		  error_dialog.show_dialog();
		  remove_loading();
		  return;
	  }
	  if(pwd != repwd){
		  error_dialog.setText("两次密码不一致");
		  error_dialog.show_dialog();
		  remove_loading();
		  return;
	  }
	  //判断是账号否注册
	  //判断验证码是否有效
	    var type = 0;
		var url = TERMINAL_URL + '/jsonrest/userlogin/UserRegister/1/registerUser';
		var param=[];
		param.push('loginUserVo.operCode='+username);
		param.push('loginUserVo.passwd='+BASE64.encoder(repwd));
		param.push('validateCode='+checkcode);
		param.push('loginUserVo.mobile='+username);
		param.push('loginUserVo.loginType='+100);
		ajax({
			url : url,
			type : 'post',// 非必须.默认get
			dataType : 'json',// 非必须.默认text
			data:param.join('&'),
			async : true,// 非必须.默认true
			cache : false,// 非必须.默认false
			timeout : 30000,// 非必须.默认30秒
			success : registerSuccess
		// 非必须
		},type);
	  }
  
  //注册成功
  function registerSuccess(data){
	  remove_loading();
	  var url = '/page/login/login.html';
	  
	  if (data.msgCode == 1) {
		  url =  data.entity.returnURL;
		  locationHref(url);	
	
	  }else{
		  
		  error_dialog.setText(data.msg);
		  error_dialog.show_dialog();
	  }
  }