$(document).ready(
	function() {
		initDialog();
		initData();
		$('#chooseArea').bind('input propertychange', function() {  
	    	areaOnChange();
	 	   
	    	
		});
	   $('#accountSet_sexChoose').change(function () {
		   sexOnChange();
	
		 });
		   
		$("#accountSet_input").change(function(){
			fileOnChange();
		});
});
function fileOnChange(){
	//var url = TERMINAL_URL + '/jsonrest/operation/log/SmsLogUpload/1/sendMsg';
	show_loading('body', '/images/loading.gif',true);
	var url = TERMINAL_URL + '/jsonrest/upload/UploadFile/0/uploadUserHeader';
	if($("#accountSet_input").val()!=null&&$("#accountSet_input").val()!=""){
		
		 $.ajaxFileUpload({
	            url             : url,
	            secureuri       : false,
	            fileElementId   : "accountSet_input", //文件选择框的id属性
	            dataType        : 'text', //服务器返回的格式
	            success     : function(data,status) //相当于java中try语句块的用法
	            {   
	            	remove_loading();
	            	$("#accountSet_input").unbind();
	            	$("#accountSet_input").change(function(){
	        			fileOnChange();
	        		});
	            	 if(data.msgCode == 1){
	            		
		            	 location.reload();
	            	 }else{
	            		 error_dialog.setText(data.msg);
	            		 error_dialog.show_dialog();
	            	 }
	            	
	            	 
	            },
	            error : function(data, status, e) //相当于java中catch语句块的用法
	            {	
	            	remove_loading();
	            	$("#accountSet_input").unbind();
	            	$("#accountSet_input").change(function(){
	        			fileOnChange();
	        		});
	          
	            	 if(data.msgCode == 1){
	            		
		            	 location.reload();
		            	 
	            	 }else{
	            		 error_dialog.setText(data.msg);
	            		 error_dialog.show_dialog();
	            	 }
	            	
		            	
	            }
	        }
	        );
	}
}





function sexOnChange(){
	var sex = $('#accountSet_sexChoose').val();
	if(sex == 0){
		$("#accountSet_sex").html("-");
	}else if(sex == 1){
		$("#accountSet_sex").html("男");
	}else{
		$("#accountSet_sex").html("女");
	}
	var url = TERMINAL_URL+"/jsonrest/userlogin/Customer/0/updateCustomerPro"
	$.post(url,{"sex":sex},function(re){

		if(re.msg == "请先登录!"){
			location.href = "login_usePW.html"
		}
	},"json");
}
function areaOnChange(){
	var url = TERMINAL_URL+"/jsonrest/userlogin/Customer/0/updateCustomerPro"
	$.post(url,{"address":$('#chooseArea').val()},function(re){

		if(re.msg == "请先登录!"){
			location.href = "login_usePW.html"
		}
	},"json");
}
//初始化数据
function initData(){
	var obj = loginStatusData();
	if (obj && obj.msgCode == 1){
		var text = obj.entity.userName || obj.entity.userCode;
		var userData = obj.entity;
		console.log(obj);
		if(!isNull(userData.userName)){
			$("#accountSet_name").html(userData.userName)
		}
		if(userData.sex == 0){
			$("#accountSet_sex").html("-");
		}else if(userData.sex == 1){
			$("#accountSet_sex").html("男");
		}else{
			$("#accountSet_sex").html("女");
		}
		
		if(userData.loginType == 100){
			$("#accountSet_tel").html(userData.operCode);
		}else if(userData.loginType == 120 || userData.loginType == 101 ){
			$("#accountSet_tel").html("微信登录");
		}else if(userData.loginType == 130 ){
			$("#accountSet_tel").html("QQ登录");
			
		}else if(userData.loginType == 140){
			$("#accountSet_tel").html(userData.operCode);
			
		}
		if(!isNull(userData.address)){
			$("#chooseArea").val(userData.address);
		}
	
		if(!isNull(userData.headImg)){
			$("#accountSet_img>img").attr("src",UPLOAD_URL+userData.headImg+"?"+new Date().getTime());
		}
		
		
		
		
    }else{
    	location.href = "login_usePW.html"
    }
   
}