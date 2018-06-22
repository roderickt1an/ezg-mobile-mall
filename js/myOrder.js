	var deleteOrderDialog;
	var nowOrderId;
$(document).ready(function () {
	initDialog();
	deleteOrderDialog = new Dialog('#delete_dialog');
	deleteOrderDialog.addButton({"deleteOrderY":"确定"})
	deleteOrderDialog.addButton({"deleteOrderN":"取消"})
	deleteOrderDialog.setText("您确定删除该笔订单吗？")
	$("#deleteOrderY").click(function(){
		show_loading('body', '/images/loading.gif',true);
		 var type = 0;
			var url = TERMINAL_URL + '/jsonrest/order/Order/1/deleteOrder';
			var param=[];
			param.push('orderId='+nowOrderId);
			$.ajax({
				url : url,
				type : 'get',// 非必须.默认get
				dataType : 'json',// 非必须.默认text
				data:param.join('&'),
				async : true,// 非必须.默认true
				cache : false,// 非必须.默认false
				timeout : 30000,// 非必须.默认30秒
				success : function(data){
					remove_loading();
					if(data.msgCode == 1){
						location.reload();
					}else{
						error_dialog.setText(data.msg);
						error_dialog.show_dialog();
					}
				}
			// 非必须
			},type);
	});
	$("#deleteOrderN").click(function(){
		deleteOrderDialog.remove_dialog();
	});
	
	 var obj = loginStatusData();
	
		if (obj && obj.msgCode == 1){
			loadOrders();
		}else{
			location.href = "/login_usePW.html";
		}

	
});
var loadOrders = function(){
	  show_loading('body', '/images/loading.gif',true);
	var type = 0;
	var url = TERMINAL_URL + '/jsonrest/order/Order/1/queryOrderByLimit';
	var param=[];
	param.push('pageSize='+100);
	param.push('currentPage='+1);
	$.ajax({
		url : url,
		type : 'post',// 非必须.默认get
		dataType : 'json',// 非必须.默认text
		data:param.join('&'),
		async : true,// 非必须.默认true
		cache : false,// 非必须.默认false
		timeout : 30000,// 非必须.默认30秒
		success : function(data){
			remove_loading();
			if(data.msgCode == 1){
//				/console.log(data);
				
				var dataDetail = data.entity.orders;
					
					var html = "";
					if(dataDetail.length == 0){
						$(".myOrder-noEmpty").css("display","none");
						$(".myOrder-empty").css("display","");
					
						return;
					}
					for(var i =0;i<dataDetail.length;i++){
						var payStatus = dataDetail[i].payStatus;
						
						if(payStatus == 2){

							html += '<div class="myOrder-item">';
							html += '<span class="myOrder-item-state">已付款</span>';
							html += '<p class="myOrder-item-id">订单编号：<span>'+dataDetail[i].orderCode+'</span></p>';
							var orderItems = dataDetail[i].orderDetails;
							var count = 0;
							var allMoney = 0;
							for(var j =0;j<orderItems.length;j++){
								html += '<div class="myOrder-product">';
								html += ' <p class="myOrder-product-title">'+ orderItems[j].productName+'</p>';
								html += '  <p class="myOrder-product-area">地区：<span>'+ orderItems[j].areaFullName+'</span></p>';
								html += ' <p class="myOrder-product-content">服务内容：<span>'+ orderItems[j].propertyName+'</span></p>';
								html += '    <strong class="myOrder-product-price"><span>'+(orderItems[j].itemRealMoney/100/orderItems[j].amount)+'</span>元</strong>';
								html += ' <b class="myOrder-product-count">x'+orderItems[j].amount+'</b>';
								html += '  </div>';
								count　+= orderItems[j].amount;
								allMoney += orderItems[j].itemRealMoney;
							}
							html += '<div class="myOrder-item-bottom">';
							html += '<div class="myOrder-item-sum clearfix">';
							html += '<span>(折扣￥<b>'+(+ dataDetail[i].orderRealMoney- dataDetail[i].realMoney)/100+'</b>)</span>';
							html += '<span>合计：￥<strong>'+ dataDetail[i].orderRealMoney/100+'</strong></span>';
							html += '  <span>总数量：<em>'+count+'</em></span>' ;
							html += '</div>';
							html += '<div class="myOrder-item-payTime clearfix">';
							html += '<p>付款时间：<span>'+dataDetail[i].payTime+'</span></p>';
							html += '  </div>';
							html += '</div>';
							html += '</div>';
						
						}else{
							

							html += '<div class="myOrder-item">';
							html += '<span class="myOrder-item-state">未付款</span>';
							html += '<p class="myOrder-item-id">订单编号：<span>'+dataDetail[i].orderCode+'</span></p>';
							var orderItems = dataDetail[i].orderDetails;
							var count = 0;
							var allMoney = 0;
							for(var j =0;j<orderItems.length;j++){
								html += '<div class="myOrder-product">';
								html += ' <p class="myOrder-product-title">'+ orderItems[j].productName+'</p>';
								html += '  <p class="myOrder-product-area">地区：<span>'+ orderItems[j].areaFullName+'</span></p>';
								html += ' <p class="myOrder-product-content">服务内容：<span>'+ orderItems[j].propertyName+'</span></p>';
								html += '    <strong class="myOrder-product-price"><span>'+(orderItems[j].itemRealMoney/100/orderItems[j].amount)+'</span>元</strong>';
								html += ' <b class="myOrder-product-count">x'+orderItems[j].amount+'</b>';
								html += '  </div>';
								count　+= orderItems[j].amount;
								allMoney += orderItems[j].itemRealMoney;
							}
							html += '<div class="myOrder-item-bottom">';
							html += '<div class="myOrder-item-sum clearfix">';
							html += '<span>(折扣￥<b>'+(+ allMoney - dataDetail[i].realMoney)/100+'</b>)</span>';
							html += '<span>合计：￥<strong>'+ dataDetail[i].orderRealMoney/100+'</strong></span>';
							html += '  <span>总数量：<em>'+count+'</em></span>' ;
							html += '</div>';
							html += '<div class="myOrder-item-unPay clearfix">';
							html += ' <button class="myOrder-item-pay"    onclick = goPay("'+dataDetail[i].orderId+'")  type="button">付款</button>';
							html += '<button class="myOrder-item-cancel"  onclick = deleteOrder("'+dataDetail[i].orderId+'") type="button">取消订单</button>';
							html += ' </div>';
							html += '</div>';
							html += '</div>';
						
						}
					
				
					}
					$(".myOrder-noEmpty").html(html);
			}else{
				if(data.msg == "请先登录!"){
					location.href = "/login_usePw.html";
				}else{
					error_dialog.setText(data.msg);
					error_dialog.show_dialog();
					
				}
			}
			
		}
	// 非必须
	},type);

}
var goPay = function(orderId){
	location.href = "/aOrderPay/"+orderId+".html";
}

var deleteOrder = function(orderId){
	nowOrderId = orderId;
	deleteOrderDialog.show_dialog();
	
}
	

