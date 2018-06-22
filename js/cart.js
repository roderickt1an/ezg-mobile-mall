$(document).ready(function (){
	initDialog();//初始化dialog
	initCart()
	$(".cart-coupon-error").css("display","none");
});

//初始化购物车
function initCart(){
	show_loading('body', '/images/loading.gif',true);
	
	var url =  TERMINAL_URL + '/jsonrest/order/Cart/0/updateCart';
	$.post(url,function(re){
		remove_loading();
		 if (re.msgCode == 1) {
	    	  if(!isNull(re.entity)){
	    	
	    		 var reData = re.entity;
	    		
	    		 var html = "";
	    		 if(re.extendMap.isLogin == 0){//登录状态
	    		
	    			 
	    			 for(var i in reData){
	    				 
	    				 html += '<div class="cart-item">';
	    				 html += '<label class="checkbox">';
	    				 html += ' <div class="cart-item-checkbox">';
	    				 html += ' <input type="checkbox">';
	    				 html += '<i class="icon">✓</i>';
	    			     html += '</div>'
	    				 html += '<span class="cart-item-title">'+reData[i].areaProperty.productName+'</span>';
	    				 html += '  </label>';
	    				 html += '  <p class="cart-item-area">地区：'+reData[i].areaProperty.areaName+'</p>';
	    				 html += ' <p class="cart-item-content">服务内容：'+reData[i].areaProperty.propertyName+'</p>'
	    				 html +='<div class="cart-item-input">';
	    				 html +=' <button type="button" class="left">-</button>';
	    				 html +='<span>'+reData[i].productNum+'</span>'
	    				 html +=' <button type="button" class="right">+</button>'; 
	    				 html +='</div>';
	    				 html +='<input name = "areaPropertyId" type="hidden" value="'+reData[i].areaProperty.areaPropertyId+'">';
	    				 html +='<div class="cart-item-price" unit_price ='+reData[i].areaProperty.price/100+'><span>'+reData[i].areaProperty.price/100*reData[i].productNum+'</span>元</div>';
	    				 html +='</div>';
	    			 }
	    		 }else{//未登录状态
	    			 var cartSession = re.extendMap.cartSession;
	    			 for(var i in reData){
	    			
	    				 html += '<div class="cart-item">';
	    				 html += '<label class="checkbox">';
	    				 html += ' <div class="cart-item-checkbox">';
	    				 html += ' <input type="checkbox">';
	    				 html += '<i class="icon">✓</i>';
	    			     html += '</div>'
	    				 html += '<span class="cart-item-title">'+reData[i].product_name+'</span>';
	    				 html += '  </label>';
	    				 html += '  <p class="cart-item-area">地区：'+reData[i].area_full_name+'</p>';
	    				 html += ' <p class="cart-item-content">服务内容：'+reData[i].property_name+'</p>'
	    				 html +='<div class="cart-item-input">';
	    				 html +=' <button type="button" class="left">-</button>';
	    				 html +='<span>'+cartSession[i]+'</span>'
	    				 html +=' <button type="button" class="right">+</button>'; 
	    				 html +='</div>';
	    				 html +='<input name = "areaPropertyId" type="hidden" value="'+i+'">';
	    				 html +='<div class="cart-item-price" unit_price ='+reData[i].new_price/100+'><span>'+(reData[i].new_price/100*cartSession[i])+'</span>元</div>';
	    				 html +='</div>';
	    			 }
	    		 }
	    	
	    		$(".cart-coupon").before(html);
	   
	    	  }else{	    		  
	    		  $(".cart-noEmpty").css("display","none");
	    		  $(".cart-empty").css("display","");
	    	  }
	    	 bindEvent();
	      }    
	},"json")
	
}


function loadCoupon(){


	var url = TERMINAL_URL + '/jsonrest/order/CashCoupon/0/queryUserUsableCoupon';
	
	$.post(url,
			{"allMoney":getAllMoney()*100,"areaPropertyIds":getAreaPropertyId()},
			function(re){
				if(re.msgCode == 1){
					
					if((re.entity.usableCashCoupon.length+re.entity.disabledCashCoupon.length) <= 0){
							
						$(".cart-coupon-empty").css("display","");
						$(".cart-coupon-list").css("display","none");
						 
					}else{
						var oldCode = $('input:radio:checked').val();
					
						  var strHtml = '<label><input name="coupon" type="radio" data-id="no" value="0" class="checkbox trueMiddleAlign" >  <span class="name">不使用代金券</span></label>';
							
							for(var i=0;i<re.entity.usableCashCoupon.length;i++){
								var cashCoupon = re.entity.usableCashCoupon[i];
								
								strHtml += '<label>';
								if(oldCode == cashCoupon.cashCouponCode){
									strHtml += ' <input name="coupon" type="radio" data-id="no" value="'+cashCoupon.cashCouponCode+'" checked="checked" class="checkbox trueMiddleAlign">';
									
								}else{
									strHtml += ' <input name="coupon" type="radio" data-id="no" value="'+cashCoupon.cashCouponCode+'" class="checkbox trueMiddleAlign">';
									
								}
							
								strHtml += ' <span class="name">'+cashCoupon.cashCouponName+'</span>';
								strHtml += '   <span class="time">有效期：'+new Date(cashCoupon.invalidDate).Format("yyyy-MM-dd") +'</span>';
								strHtml += '<input type="hidden"   name = "dMoney" value="'+(cashCoupon.money/100)+'">';
								strHtml += '</label>';
								
							
							}
							
							for(var i=0;i<re.entity.disabledCashCoupon.length;i++){
								var cashCoupon = re.entity.disabledCashCoupon[i];

								strHtml += '<label>';
								strHtml += ' <input name="coupon" type="radio" data-id="no" value="'+cashCoupon.cashCouponCode+'" class="checkbox trueMiddleAlign"  disabled="disabled">';
								strHtml += ' <span class="name">'+cashCoupon.cashCouponName+'</span>';
								strHtml += '   <span class="time">有效期：'+new Date(cashCoupon.invalidDate).Format("yyyy-MM-dd")+'</span>';
								strHtml += '  <input type="hidden" name = "dMoney" value="'+cashCoupon.money/100+'">';
								strHtml += '  </label>';
					          
							}
							
							$(".cart-coupon-list").html(strHtml);
							if(!isNull( $('input:radio:checked').val())&& $('input:radio:checked').val()!=0){
								checkCashCoupon(true);
							}
							$("input[name=coupon]").click(function(){
								
									checkCashCoupon(true);
								
								
							})
						
					}
		        
				}
				
				
	},"json");

}
//绑定事件
function bindEvent(){
	
	 $('.cart-coupon-entry>input').change(function () {
		    $('.cart-coupon-main').slideToggle();
		  })
	  $('.cart-coupon-option>button').click(function () {
	    if($(this).text()=='输入代金券'){
	      $(this).addClass('active').siblings().removeClass('active');
	      $('.cart-coupon-input').show();
	      $('.cart-coupon-choose').hide();
	    }else {
	    	 loadCoupon();
	      $(this).addClass('active').siblings().removeClass('active');
	      $('.cart-coupon-input').hide();
	      $('.cart-coupon-choose').show();
	    }
	  })
	$(".cart-item-checkbox>input").click(function(){
		var allCheckBoxCounts = $(".cart-item-checkbox>input").length;
		var allCheckBoxCheckCounts = $(".cart-item-checkbox>input:checked").length;
		if(allCheckBoxCounts != allCheckBoxCheckCounts){
			$("#chooseAllCheckbox").prop("checked",false);
		}else{
			$("#chooseAllCheckbox").prop("checked",true);
		}
		updatePrice();
	});
	$("#chooseAllCheckbox").click(function(){
		var thisIsCheck = $(this).is(':checked');
		
		if(thisIsCheck){
			
			$(".cart-item-checkbox>input").prop("checked",true);
		 
		}else{
			$(".cart-item-checkbox>input").prop("checked",false);
		}
		updatePrice();
	});
	$("#chooseAllCheckbox").trigger("click");
	$(".left").click(function(){
		
		var itemCount =  $(this).parent().parent().find("span:eq(1)").html();
		if(itemCount > 1){
			itemCount = +itemCount-1;
		}
		 $(this).parent().parent().find("span:eq(1)").html(itemCount);	

		 $(this).parent().parent().find(".cart-item-price>span").html($(this).parent().parent().find(".cart-item-price").attr("unit_price")*itemCount);
		 var areaPropertyId = $(this).parent().parent().find("input[name=areaPropertyId]").val();
		 
		 updatePrice();
		 updateCartNum(areaPropertyId,itemCount);
		 loadCoupon();
	});
	$(".right").click(function(){
	
		var itemCount =  $(this).parent().parent().find("span:eq(1)").html();
	
			itemCount = +itemCount+1;
		
		   $(this).parent().parent().find("span:eq(1)").html(itemCount);
		   $(this).parent().parent().find(".cart-item-price>span").html($(this).parent().parent().find(".cart-item-price").attr("unit_price")*itemCount);
		   var areaPropertyId = $(this).parent().parent().find("input[name=areaPropertyId]").val();
		   updatePrice();
		   updateCartNum(areaPropertyId,itemCount);
			 loadCoupon();
	});
	
	$("#deleteChooseButton").click(function(){
	
		var ids ="";

		var allCheckBoxCheckCounts = $(".cart-item-checkbox>input:checked");
		for(var i =0;i<allCheckBoxCheckCounts.length;i++){
			ids += $(allCheckBoxCheckCounts[i]).parent().parent().parent().find("input[name=areaPropertyId]").val()+",";
		}
		allCheckBoxCheckCounts.parent().parent().parent().remove();
	
		 var counts = $(".cart-item-checkbox>input").length;
	
		 $.ajax({
			    url: TERMINAL_URL + '/jsonrest/order/Cart/0/deleteAllCart',
			    type: 'post',
			    dataType: 'json',
			    data: {"areaPropertyIds": ids},
			    success: function (data) {
			      if (data.msgCode == 1) {
			    	  if(counts == 0){
			    		  $(".cart-noEmpty").css("display","none");
			    		  $(".cart-empty").css("display","");
			  		 }
			      } 
			    }
			  });
		  updatePrice();
		  loadCoupon();
	});
	
	$("#couponInputSubmit").click(function(){
		checkCashCoupon();
	});
	$("#cart_submit").click(function(){
		orderSubmit();
	});
}
//订单提交
function orderSubmit(){
	var allCheckBoxCheckCounts = $(".cart-item-checkbox>input:checked");
	if( allCheckBoxCheckCounts.length == 0){
		error_dialog.setText("请选择产品")
		error_dialog.show_dialog();
		return;
	}
	var cashCouponCode = "";
	if($("#couponConfirmCheckbox").prop("checked") && $("#flagHtml").val() == 1){
		cashCouponCode = 	$(".cart-coupon-input-confirm>label>span").html();
	}else if(!isNull( $('input:radio:checked').val())&& $('input:radio:checked').val()!=0){
		cashCouponCode = $('input:radio:checked').val();
	}
	 var params = "[";
	    //  提交按钮的Ajax写在这
	    for (var i = 0; i < allCheckBoxCheckCounts.length; i++) {
	    	var itemCount =  $(allCheckBoxCheckCounts[i]).parent().parent().parent().find("span:eq(1)").html();
	    	var areaPropertyId = $(allCheckBoxCheckCounts[i]).parent().parent().parent().find("input[name=areaPropertyId]").val();
	    	   params += "{areaPropertyId:" +areaPropertyId + ",productNum:" + itemCount + "}";
	    }
	    params += "]";
    $.ajax({
      url: TERMINAL_URL + '/jsonrest/order/Order/0/createOrder',
      type: 'post',
      dataType: 'json',
      data: {
        "productJson": params,
        "cashCouponCode": cashCouponCode,
        "orderMemo": "",
        "areaPropertyIds": getAreaPropertyId(),
        "allMoney": getAllMoney()*100
      },
     
      success: function (data) {
        if (data.msgCode == 1) {
          location.href = "/aOrderPay/" + data.entity.orderId+".html";
        } else {
          if (data.msg == '请先登录!') {
            location.href = "/login_usePW.html"
          } else {
        		error_dialog.setText(data.msg)
        		error_dialog.show_dialog();
        	  
          }
        }
      }
    });
  
	
}
//检查代金券是否可用
function checkCashCoupon(flag){
	
	if(flag){
		$("#couponConfirmCheckbox").prop("checked",false);
		updatePriceByCash();
	}else{
		var url =  TERMINAL_URL + '/jsonrest/order/CashCoupon/0/checkCashCoupon';
		var cashCouponCode = $("#couponInput").val();
		if(isNull(cashCouponCode)){
			return;
		}
		$.post(url,{"cashCouponCode":cashCouponCode,"areaPropertyIds":getAreaPropertyId(),"allMoney":getAllMoney()*100},function(re){
			
			if(!isNull(re.entity)){
					var reData = re.entity;
					$(".cart-coupon-input-confirm>label>span").html(reData.cashCouponCode);
					var htmlStr = reData.cashCouponMemo;
					 if(reData.invalidDate){
			            var date = new Date(reData.invalidDate).Format("yyyy-MM-dd");
			            htmlStr += '　　有效期到：'+ date;
			          }else {
			        	  htmlStr += '　　无时间限制';
			          }
					$(".cart-coupon-info").html(htmlStr)
					$("#flagHtml").remove();
					$("#cashMoney").remove();
					var flagHtml = "<input id='flagHtml' type='hidden' value='"+re.msgCode +"'>"
				
					var cashMoneyHtml = "<input id='cashMoney' type='hidden' value='"+reData.money +"'>"
					$("body").append(flagHtml);
					$("body").append(cashMoneyHtml);
				
					if(re.msgCode == 1){//可用
						$(".cart-coupon-error").css("display","none");
						//$("#couponConfirmCheckbox").prop("checked",true);
					}else{//不可用
						$(".cart-coupon-error").html(re.msg);
						$(".cart-coupon-error").css("display","");
						$("#couponConfirmCheckbox").prop("checked",false);
					}
					$(".cart-coupon-input-unInput").css("display","none");
					$(".cart-coupon-input-confirm").css("display","");
					
					$("#couponConfirmCheckbox").unbind("change");
					$("#couponConfirmCheckbox").change(function(){
						if($("#flagHtml").val() != 1){
							$("#couponConfirmCheckbox").prop("checked",false);
						}else{
							$("input[name=coupon]").attr("checked",false);
							updatePriceByCash();
						}
						
					
					})
					
					$("#couponInputCancel").unbind("click");
					$("#couponInputCancel").click(function(){
						$("#flagHtml").remove();
						$("#cashMoney").remove();
						$("#couponInput").val("");
						$(".cart-coupon-input-unInput").css("display","");
						$(".cart-coupon-input-confirm").css("display","none");
						var allMoney = getAllMoney();
						$(".cart-footer").find("div:eq(1)>span").html("￥"+allMoney);
						$(".cart-footer").find("div:eq(0)>span").html("￥"+0);
					});
					updatePriceByCash();
				}else{
					$(".cart-coupon-error").css("display","");
				}
		},"json")
	}
}
//修改价格根据代金券
function updatePriceByCash(){
	if($("#couponConfirmCheckbox").prop("checked")){
		
		var dMoney = $("#cashMoney").val()/100;
		var allMoney = getAllMoney();
		
		$(".cart-footer").find("div:eq(1)>span").html("￥"+(allMoney-dMoney));
		$(".cart-footer").find("div:eq(0)>span").html("￥"+dMoney);
	}else if(!isNull( $('input:radio:checked').val())&& $('input:radio:checked').val()!=0){
		var dMoney = $('input:radio:checked').parent().find('input[name=dMoney]').val();
		var allMoney = getAllMoney();
		$(".cart-footer").find("div:eq(1)>span").html("￥"+(allMoney-dMoney));
		$(".cart-footer").find("div:eq(0)>span").html("￥"+dMoney);
	}else{
		var allMoney = getAllMoney();
		$(".cart-footer").find("div:eq(1)>span").html("￥"+allMoney);
		$(".cart-footer").find("div:eq(0)>span").html("￥"+0);
	}
}

//修改购物车数量
function updateCartNum(areaPropertyId,itemCount){
	$.ajax({
	    url: TERMINAL_URL + '/jsonrest/order/Cart/0/updateCart',
	    type: 'post',
	    dataType: 'json',
	    data: {"areaPropertyId": areaPropertyId, "productNum": itemCount},
	    success: function (data) {
	      if (data.msgCode == 1) {
	        //changeLoginStatus();
	      } 
	    }
	  });
}
//修改价格
function updatePrice(){
	var checkedItems =  $(".cart-item-checkbox>input:checked");
	var dMoney = 0;
	var money = 0;
	$("#chooseCount").html(checkedItems.length);
	var checkedItems =  $(".cart-item-checkbox>input:checked");
	for(var i = 0;i< checkedItems.length;i++){
		var itemMoney = $(checkedItems[i]).parent().parent().parent().find(".cart-item-price>span").html();
		var itemCount =  $(checkedItems[i]).parent().parent().parent().find("span:eq(1)").html();
		 money += (+itemMoney);
	}
	checkCashCoupon();
	$(".cart-footer").find("div:eq(1)>span").html("￥"+money);
	$(".cart-footer").find("div:eq(0)>span").html("￥"+dMoney);

}

//获取当前总金额
function getAllMoney(){
	var checkedItems =  $(".cart-item-checkbox>input:checked");
	var money = 0;
	for(var i = 0;i< checkedItems.length;i++){
		var itemMoney = $(checkedItems[i]).parent().parent().parent().find(".cart-item-price>span").html();
		var itemCount =  $(checkedItems[i]).parent().parent().parent().find("span:eq(1)").html();
		 money += (+itemMoney);
	}
	return money;
}
//获取所有的地区属性ID
function getAreaPropertyId(){
	
	var ids ="";

	var allCheckBoxCheckCounts = $(".cart-item-checkbox>input:checked");
	for(var i =0;i<allCheckBoxCheckCounts.length;i++){
		ids += $(allCheckBoxCheckCounts[i]).parent().parent().parent().find("input[name=areaPropertyId]").val()+",";
	}

	return ids;
}
	