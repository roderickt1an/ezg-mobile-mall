$(document).ready(
	function() {
		
		initDialog();//初始化dialog

		 var obj = loginStatusData();
			
			if (obj && obj.msgCode == 1){
				
				$("#changeName_button").click(function(){
					$(".changeName-info").css("display","none");
					var changeName = $("#changeName_name").val();
					
					if(isNull(changeName)){
						$(".changeName-info").css("display","");
						$(".changeName-info").html("姓名不可为空");
					}else{
						var url = TERMINAL_URL+"/jsonrest/userlogin/Customer/0/updateCustomerPro"
						$.post(url,{"customerName":$('#changeName_name').val()},function(re){
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
					}
				});
			}else{
				location.href = "/login_usePW.html";
			}
	
		
});

