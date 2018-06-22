$(document).ready(function () {
	 var obj = loginStatusData();
		if (obj && obj.msgCode == 1){
	    }else{
	    	location.href ="/login_usePW.html";
	    }
	initDialog();// 初始化dialog
	
	loadCoupon();
});

function loadCoupon(){
	
	var url = TERMINAL_URL + '/jsonrest/order/CashCoupon/0/queryUserCoupon';
	
	$.post(url,function(re){
	
		if(re.msgCode == 1){
			
			var couponMaps = re.entity;
			var coupon  = couponMaps.cashCoupons;
			var invalidCashCoupon = couponMaps.invalidCashCoupons;
			var isUseCashCoupon = couponMaps.isUseCashCoupons;
			
			if((coupon.length+invalidCashCoupon.length+isUseCashCoupon.length)<=0){
				
				$(".coupon-empty").css("display","");
				$(".coupon-main").css("display","none");
				$(".coupon-option").css("display","none");
			}else{
			
				
				var couponStrHtml = "";
				var invalidCashCouponStrHtml = "";
				var isUseCashCouponStrHtml = "";
				var invalidCashCouponFlag  = 0;
				for(var i=0;i<invalidCashCoupon.length;i++){
					invalidCashCouponFlag++;
					invalidCashCouponStrHtml += ''
					invalidCashCouponStrHtml += '<div class="coupon-main-item useless">';
					invalidCashCouponStrHtml += '    <div class="top">';
					invalidCashCouponStrHtml += '      <div class="top-cell">';
					invalidCashCouponStrHtml += '        <div class="top-imgBox">';
					invalidCashCouponStrHtml += '          <img class="top-img absoluteMiddle" src="images/LOGO_black.png">';
					invalidCashCouponStrHtml += '       </div>';
					invalidCashCouponStrHtml += '      </div>';
					invalidCashCouponStrHtml += '      <p class="top-cell coupon-main-title">'+invalidCashCoupon[i].cashCouponName+'</p>';
					invalidCashCouponStrHtml += '	    </div>';
					invalidCashCouponStrHtml += '    <div class="bottom">';
					invalidCashCouponStrHtml += '      <p class="bottom-cell coupon-main-number">编码：'+invalidCashCoupon[i].cashCouponCode+'</p>';
					invalidCashCouponStrHtml += '     <p class="bottom-cell coupon-main-deadline">有效期至：'+new Date(invalidCashCoupon[i].invalidDate).Format("yyyy-MM-dd")+'</p>';
					invalidCashCouponStrHtml += '    </div>';
					invalidCashCouponStrHtml += '  <div class="right">';
				  	invalidCashCouponStrHtml += '    <p class="right-text">';
				  	invalidCashCouponStrHtml += '      立<br>即<br>使<br>用';
				  	invalidCashCouponStrHtml += '    </p>';
				  	invalidCashCouponStrHtml += '   </div>';
				  	invalidCashCouponStrHtml += '  </div>';
				  	invalidCashCouponStrHtml += '  <div class="coupon-main-info useless">';
				  	invalidCashCouponStrHtml += '    <p>已过期</p>';
				  	invalidCashCouponStrHtml += '  </div>';
				}
				if(invalidCashCouponFlag==0){
					
					invalidCashCouponStrHtml  += '<div class="coupon-empty" >';
					invalidCashCouponStrHtml += '<p>您还未有失效的代金券！</p>'
					invalidCashCouponStrHtml += '</div>'
				
				}
				var  couponFlag = 0;
				for(var i=0;i<coupon.length;i++){
					couponFlag ++;
					couponStrHtml += ''
					couponStrHtml += '<div class="coupon-main-item">';
					couponStrHtml += '    <div class="top">';
					couponStrHtml += '      <div class="top-cell">';
					couponStrHtml += '        <div class="top-imgBox">';
					couponStrHtml += '          <img class="top-img absoluteMiddle" src="images/LOGO_black.png">';
					couponStrHtml += '       </div>';
					couponStrHtml += '      </div>';
					couponStrHtml += '      <p class="top-cell coupon-main-title">'+coupon[i].cashCouponName+'</p>';
					couponStrHtml += '	    </div>';
					couponStrHtml += '    <div class="bottom">';
					couponStrHtml += '      <p class="bottom-cell coupon-main-number">编码:'+coupon[i].cashCouponCode+'</p>';
					couponStrHtml += '     <p class="bottom-cell coupon-main-deadline">有效期至：'+new Date(coupon[i].invalidDate).Format("yyyy-MM-dd")+'</p>';
				  	couponStrHtml += '    </div>';
				  	couponStrHtml += '  <div class="right">';
				  	couponStrHtml += '    <p class="right-text" onclick="window.location.href=\'class.html\'">';
				  	couponStrHtml += '      立<br>即<br>使<br>用';
				  	couponStrHtml += '    </p>';
					couponStrHtml += '   </div>';
					couponStrHtml += '  </div>';
					couponStrHtml += '  <div class="coupon-main-info">';
					couponStrHtml += '    <p>使用须知：</p>';
					couponStrHtml += '    <p>'+coupon[i].cashCouponMemo+'</p>';
					couponStrHtml += '  </div>';
				}
				if(couponFlag ==0){
					
					couponStrHtml  += '<div class="coupon-empty">';
					couponStrHtml += '<p>您还未有代金券，购买E账柜服务，即有机会获赠代金券！</p>'
					couponStrHtml += '<a href="\">去逛逛</a></div>'
				}
				var isUseCashCouponFlag = 0;
				for(var i=0;i<isUseCashCoupon.length;i++){
					isUseCashCouponFlag++;
					isUseCashCouponStrHtml += ''
					isUseCashCouponStrHtml += '<div class="coupon-main-item useless">';
					isUseCashCouponStrHtml += '    <div class="top">';
					isUseCashCouponStrHtml += '      <div class="top-cell">';
					isUseCashCouponStrHtml += '        <div class="top-imgBox">';
					isUseCashCouponStrHtml += '          <img class="top-img absoluteMiddle" src="images/LOGO_black.png">';
					isUseCashCouponStrHtml += '       </div>';
					isUseCashCouponStrHtml += '      </div>';
					isUseCashCouponStrHtml += '      <p class="top-cell coupon-main-title">'+isUseCashCoupon[i].cashCouponName+'</p>';
					isUseCashCouponStrHtml += '	    </div>';
					isUseCashCouponStrHtml += '    <div class="bottom">';
					isUseCashCouponStrHtml += '      <p class="bottom-cell coupon-main-number">编码：'+isUseCashCoupon[i].cashCouponCode+'</p>';
					isUseCashCouponStrHtml += '     <p class="bottom-cell coupon-main-deadline">有效期至：'+new Date(isUseCashCoupon[i].invalidDate).Format("yyyy-MM-dd")+'</p>';
					isUseCashCouponStrHtml += '    </div>';
					isUseCashCouponStrHtml += '  <div class="right">';
					isUseCashCouponStrHtml += '    <p class="right-text">';
					isUseCashCouponStrHtml += '      立<br>即<br>使<br>用';
					isUseCashCouponStrHtml += '    </p>';
				  	isUseCashCouponStrHtml += '   </div>';
				  	isUseCashCouponStrHtml += '  </div>';
				  	isUseCashCouponStrHtml += '  <div class="coupon-main-info useless">';
				  	isUseCashCouponStrHtml += '    <p>已使用</p>';
				  	isUseCashCouponStrHtml += '  </div>';
				}
				if(isUseCashCouponFlag==0){
					isUseCashCouponStrHtml  += '<div class="coupon-empty" >';
					isUseCashCouponStrHtml += '<p>您还未使用代金券！</p>'
					isUseCashCouponStrHtml += '<a href="\">马上去使用吧</a></div>'
				}
				$(".coupon-main").html(couponStrHtml);
				
				$(".coupon-option-item").click(function(){
					$(".coupon-option-item").removeClass("active")
					$(this).addClass("active");
					var thisValue = $(this).html().trim();
			
					if(	thisValue == "已使用"){
					
						$(".coupon-main").html("");
						$(".coupon-main").html(isUseCashCouponStrHtml);
					}
					if(	thisValue  == "未使用"){
						$(".coupon-main").html("");
						$(".coupon-main").html(couponStrHtml);
					}
					if(thisValue == "已过期"){
						$(".coupon-main").html("");
						$(".coupon-main").html(invalidCashCouponStrHtml);
					}
				});
			}
			
			
		}
	},"json")
	
}