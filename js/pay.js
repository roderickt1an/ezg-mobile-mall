var code
$(document).ready(
	function() {
		 code = getUrlCode();
		if(isWeiXinBoolean){
			$(".pay-payWay>button:eq(0)").css("display","none");
		}else{
			$(".pay-payWay>button:eq(1)").css("display","none");
		}
		if(isNull(code)){
			location.href = "/";
		}else{
			loadOrder(code);
		}
		$("#pay_submit").click(function(){
			paySubmit();
		})
		
});


function loadOrder(orderId){
	var url = TERMINAL_URL + '/jsonrest/order/Order/1/queryOrder';
	var param=[];
	param.push('orderId='+orderId);
	$.ajax({
		url : url,
		type : 'get',// 非必须.默认get
		dataType : 'json',// 非必须.默认text
		data:param.join('&'),
		async : true,// 非必须.默认true
		cache : false,// 非必须.默认false
		timeout : 30000,// 非必须.默认30秒
		success : loadOrderSuccess	// 非必须
	},"json");
}

function loadOrderSuccess(data){
	console.log(data);
	if(data.msgCode == 1){
		$("#pay-id").html(data.entity.order.orderCode);
		
		var orderItem  = data.entity.orderItem;
		var itemHtml = "";
		for(var i = 0 ;i<orderItem.length;i++){
			itemHtml += '<div class="pay-product-item">';
			itemHtml += ' <p class="pay-product-title">'+orderItem[i].productName+'</p>';
			itemHtml += ' <p class="pay-product-area">地区：<span>'+orderItem[i].areaName+'</span></p>';
			itemHtml += '  <p class="pay-product-content">服务内容：<span>'+orderItem[i].propertyName+'</span></p>';
			itemHtml += ' <p class="pay-product-count">数量：<span>'+orderItem[i].num+'</span></p>';
			itemHtml += '	  <div class="pay-product-price">价格:<strong>'+(orderItem[i].price/100*orderItem[i].num)+'</strong>元</div>';
			itemHtml += '</div>';
			
		}
		$(".pay-product").html(itemHtml);
		$("#pay_sum").html(data.entity.orderAudit.realMoney/100);
	}else{
		alert(data.msg);
		location.href = "/";
	}
}

function paySubmit(){
	if(isWeiXinBoolean){
		var url = "/service100gonghost/pay/wechatPay/createMobilePay";
		var params = [];
		
		params.push("orderId="+code);
		params.push("openId="+getUrlParam("openId"));
		$.ajax({
			url : url,
			type : 'post',// 非必须.默认get
			dataType : 'json',// 非必须.默认text
			async : true,// 非必须.默认true
			cache : false,// 非必须.默认false
			data : params.join("&"),
			timeout : 30000,// 非必须.默认30秒
			success : requestPaySuccess
		// 非必须
		});
	}else{
		location.href = "http://m.zgcfo.com/service100gonghost/pay/alipay/createMobilePay?orderId="+code;
	}
}
function requestPaySuccess(data){
	if(data.code == 200){	
			var data =$.parseJSON("{" +data.data +"}");
			   WeixinJSBridge.invoke('getBrandWCPayRequest',
					   {
					    "appId" : data.appId,
			            "timeStamp" : data.timeStamp,   
			            "nonceStr" : data.nonceStr,
			            "package" :data.package,
			            "signType" : data.signType,  
			            "paySign" : data.paySign
					   }
					   ,
					    function(res){
					       //支付成功或失败前台判断
			    	       if(res.err_msg=='get_brand_wcpay_request:ok'){
			    	    	   
			    	    	   location.href = "/pay_success.html";
			    	    	  
			    	       }
					     });
	
	}
	
}