 


$(document).ready(function (){
	
	successDialog();//初始化成功对话框	
	initDialog();//初始化警告对话框
	var isLogin =validLoginStatus();// src="/scripts/common/module.js"
	if(isLogin){//是否已经登陆
		
	}else{ 
		location.href = 'login_usePW.html';
	}
	
	  $('#opinion_button').click(function () {
		 createSuggestion();
	  });
	    
	
});
var success_dialog;
function successDialog(){
	success_dialog = new Dialog('#success_dialog', {
		  time: 3000,
		  callbackAfter: function(){
			  location.href = "/center.html";
		  }
		});
	success_dialog.setButton({"successbutton":'确定'});
	success_dialog.setText("感谢您的反馈，我们会做得更好的!");
	$("#successbutton").click(function(){
		success_dialog.remove_dialog();
	});
}

//创建发票请求
function createSuggestion(){
	var content =  $.trim($("#opinion_content").val()); //反馈意见内容
	if(content == ''){
		error_dialog.setText("反馈意见内容不能为空！")
		error_dialog.show_dialog();
		return;
	}
	
	$.ajax({
		url: TERMINAL_URL + '/jsonrest/customer/Suggestion/0/createSuggestion',
		type: 'post',
		dataType: 'json',
		data: {
		        "content": content
		      },
		success: function (data) {
			if(data.extendMap.isLogin == 0&&data.msgCode == 1){//已登录
				success_dialog.show_dialog();
			}else if(data.extendMap.isLogin == 1){
				error_dialog.setText("请先登录！")
				error_dialog.show_dialog();
				location.href = 'login_usePW.html';
			}else{
				error_dialog.setText(data.msg)
				error_dialog.show_dialog();
			}
			
		}
	});
}

