$(document).ready(
	function() {
		
		initDialog();//初始化dialog
		
		 var obj = loginStatusData();
			
			if (obj && obj.msgCode == 1){
				$("#changePassword_button").click(function(){
					$(".changePassword-info").css("display","none");
					var changeName = $("#changeName_name").val();
					var oldPwd = $("#changePassword_oldPassword").val();
					var newPwd = $("#changePassword_newPassword").val();
					var newPwd2 = $("#changePassword_newPassword2").val();
					
					if(isNull(oldPwd) ||isNull(newPwd) || isNull(newPwd2)){
						$(".changePassword-info").css("display","");
						$(".changePassword-info").html("密码不可为空");
						return;
					}
					if(newPwd != newPwd2 ){
						$(".changePassword-info").css("display","");
						$(".changePassword-info").html("两次密码不一致");
						return;
					}
					if(!isPwd(newPwd)){
						$(".changePassword-info").css("display","");
						$(".changePassword-info").html("密码应为6-16的数字或字母或下划线('_')组成");
						return;
					}
					var url = TERMINAL_URL+"/jsonrest/userlogin/UserRegister/0/updatePwdByPwd"
					
					$.post(url,{"newPwd":newPwd,"oldPwd":oldPwd},function(re){
						if(re.msgCode == 1){
				
							error_dialog.setText("修改成功");
							$("#error_dialog").unbind();
							error_dialog.options.time=10000;
							$("#error_dialog").click(function(){
								location.href = "	options_accountSet.html";
							});
							error_dialog.show_dialog();	
							
						}else{
							if(re.msg == "请先登录!"){
								location.href = "login_usePW.html"
							}else{
								error_dialog.setText(re.msg);
								error_dialog.show_dialog();	
						
							}
							
						}
					},"json");
				});
			}else{
				location.href = "/login_usePW.html";
			}
	
});

