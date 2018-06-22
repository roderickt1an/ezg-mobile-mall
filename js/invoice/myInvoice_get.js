$(document).ready(function (){
	initDialog();//初始化dialog
	successDialog();//提交成功对话框框
	loginDialog();//提示登录对话框
	confirmDialog();//确认提交对话框
	var isLogin =validLoginStatus();// src="/scripts/common/module.js"
	if(!isLogin){ 
		location.href = 'login_usePW.html';
	}
	
	$(":radio").click(function(){
		var selected = $("input[name='invoice_postWay']:checked").val();
		if(selected == 2){
			$("#name").show();
			$("#phoneNumber").show();
			$("#area").show();
			$("#place").show();
		}else if(selected == 1){
			$("#name").hide();
			$("#phoneNumber").hide();
			$("#area").hide();
			$("#place").hide();
		}
		});
	
	$("#invoice_money").keyup(function(){
		var money = parseInt($('#invoice_money').val()*100);
		if(!isNaN(money)){
			if(money >= 100000){
				$("#warnMsg").text('');
			}else{
				$("#warnMsg").text('开票金额小于1000元邮费需自付');
			}
		}
   });
	
	$('#invoice_submit').click(function () {
		 heading = $("#invoice_title").val(); //发票抬头
		money = parseInt($('#invoice_money').val()*100) //发票金额
		getType = $("input[name='invoice_postWay']:checked").val();
		tax_code = $("#tax_code").val();
		invoiceType = $("input[name='invoice_type']:checked").val();
		
	
		if(heading == ''){
			error_dialog.setText("发票抬头不能为空！")
			error_dialog.show_dialog();
			return;
		}
		
		
		if(isNull(tax_code)){
			error_dialog.setText("公司税号不得为空！")
			error_dialog.show_dialog();
			return;
		}
		
		if(money== 0||isNaN(money)){
			error_dialog.setText("发票金额不能为空或格式错误！")
			error_dialog.show_dialog();
			return;
		}
		if(getType != 1 && getType != 2){
			error_dialog.setText("请选择领取方式！")
			error_dialog.show_dialog();
			return;
		}
		if(getType == 2){
			recipientsName = $("#invoice_name").val();//收件人
			linkPhone = $("#invoice_phoneNumber").val();//联系电话
			areaIds = $("#invoice_area").val();//地区id
			areaName = $("#chooseArea").val();
			address = $("#invoice_place").val();//详细地址
			if(recipientsName == ""||linkPhone==""||areaIds==""||address==""){
				error_dialog.setText("收件人,联系方式,所在地址和详细地址都不能为空！")
				error_dialog.show_dialog();
				return;
			}
		}
		 
		invoiceMemo = $("#invoice_remark").val();//备注
		confirm_dialog.show_dialog();
	})
});

var heading;
var money = 0;
var getType;
var recipientsName = "";
var linkPhone = ""; 
var address = ""; 
var areaIds = "";
var invoiceMemo = "";
var areaName="";
var tax_code ;
var invoiceType = "";

var confirm_dialog;
function confirmDialog(){
	confirm_dialog = new Dialog('#confirm_dialog', {});
	confirm_dialog.setButton({"confirmbutton":'确定',"cancelbutton":'取消'});
	confirm_dialog.setText("提交后将不能更改，是否确认提交?");
	$("#confirmbutton").click(function(){
		confirm_dialog.remove_dialog();
		createCustomerInvoiceRequestInfo();
	});
	$("#cancelbutton").click(function(){
		confirm_dialog.remove_dialog();
	});
}
var success_dialog;
function successDialog(){
	success_dialog = new Dialog('#success_dialog', {
		time: 3000,
		callbackAfter: function(){
		//	location.href = "/myInvoice.html";
		}
	});
	success_dialog.setButton({"successbutton":'确定'});
	success_dialog.setText("提交成功！");

	$("#confirmbutton").click(function(){
		confirm_dialog.remove_dialog();
		createCustomerInvoiceRequestInfo();
	});
	$("#cancelbutton").click(function(){
		confirm_dialog.remove_dialog();
	});
	
	$("#successbutton").click(function(){
		
		location.href = '/myInvoice.html';
		success_dialog.remove_dialog();
	});
}


var login_dialog;

//提示登录对话框
function loginDialog(){
	login_dialog = new Dialog('#login_dialog', {
		  time: 3000,
		  callbackAfter: function(){
			  location.href = "/login_usePW.html";
		  }
		});
	login_dialog.setButton({"loginbutton":'去登录'});
	login_dialog.setText("您尚未登录，请先登录！");
	$("#loginbutton").click(function(){
		login_dialog.remove_dialog();
	});
}
//创建发票请求
function createCustomerInvoiceRequestInfo(){
	
	$.ajax({
		url: TERMINAL_URL + '/jsonrest/customer/CustomerInvoice/0/createCustomerInvoiceRequest',
		type: 'post',
		dataType: 'json',
		data: {
		        "heading": heading,
		        "money": money,
		        "getType": getType,
		        "recipientsName": recipientsName,
		        "linkPhone": linkPhone,
		        "areaIds": areaIds,
		        "areaName":areaName,
		        "invoiceMemo": invoiceMemo,
		        "address": address,
		        'taxCode':tax_code,
		        "invoiceType":invoiceType
		      },
		success: function (data) {
			if(data.extendMap.isLogin == 0&&data.msgCode == 1){//已登录
				success_dialog.show_dialog();
			}else if(data.extendMap.isLogin == 1){
				login_dialog.show_dialog();
			}else{
				error_dialog.setText(data.msg)
				error_dialog.show_dialog();
			}
			
		}
	});
}

