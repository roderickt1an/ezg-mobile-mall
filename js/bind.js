
function initCallback(captchaObj){

	
	  captchaObj.onReady(function () {
          $("#wait").hide();
      }).onSuccess(function () {
          var result = captchaObj.getValidate();
          if (!result) {
              return alert('请完成验证');
          }
         
	  		
	  		var url =  TERMINAL_URL+'/jsonrest/userlogin/UserRegister/0/sendVerifyMobileCode';
	  		var phoneNumber = $("#bind_phoneNumber").val();
	    	
			var param = [];
			param.push('loginUserVo.mobile='+phoneNumber);
			param.push('geetestChallenge='+result.geetest_challenge);
	  		param.push('geetestValidate='+result.geetest_validate);
	  		param.push('geetestSeccode='+result.geetest_seccode);
			param.push('requestType='+5);
		  			$.ajax({
		  				url : url,
		  				type : 'post',// 非必须.默认get
		  				dataType : 'json',// 非必须.默认text
		  				data:param.join('&'),
		  				async : true,// 非必须.默认true
		  				cache : false,// 非必须.默认false
		  				timeout : 30000,// 非必须.默认30秒
		  				success : function(data){
			  				 if (data.msgCode == 1) {
			  					setTime($("#bind_getVerificationCode"),60);
			  				
			  				 }else{
			  					error_dialog.setText(data.msg);
			  		    		error_dialog.show_dialog();
			  				 }
		  				}
		  			// 非必须
		  			},"json");
         
      });
	  
	  
	  

	
	  
	  $("#bind_getVerificationCode").click(function(){
	    	var phoneNumber = $("#bind_phoneNumber").val();
	    	
	    	
	    	if(!isPhone(phoneNumber)){

	    		error_dialog.setText("手机号格式错误");

	    		error_dialog.show_dialog();
	    		return;
	    	}
	    	
	    	
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
    $('#bind_submit').click(function () {
    	
    	var phoneNumber = $("#bind_phoneNumber").val();
    	var code = $("#bind_verificationCode").val();
    	
    	if(!isPhone(phoneNumber)){

    		error_dialog.setText("手机号格式错误");

    		error_dialog.show_dialog();
    		return;
    	}
   	
    	if(isNull(code)){
    		error_dialog.setText("验证码不可为空");
    		error_dialog.show_dialog();
    		return;
    	}
    	var param = [];
		 var type = 0;
			var url = TERMINAL_URL + '/jsonrest/userlogin/UserRegister/1/bindByCode';
			var param=[];
			param.push('operCode='+phoneNumber);
	
			param.push('validateCode='+code);
			$.ajax({
				url : url,
				type : 'post',// 非必须.默认get
				dataType : 'json',// 非必须.默认text
				data:param.join('&'),
				async : true,// 非必须.默认true
				cache : false,// 非必须.默认false
				timeout : 30000,// 非必须.默认30秒
				success : function(data){
					if(data.msgCode == 1){
						location.href = "/";
					}else{
						if(data.msg == "注册成功，由于授权已失效!账户绑定失败"){
							
							location.href = "/";
						}else{
							error_dialog.show_dialog(data.msg);
			
						}
						
					}
					
				}
			// 非必须
			},type);
    
    });
   
  })