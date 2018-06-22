$(document).ready(function (){
	
	var isLogin =validLoginStatus();// src="/scripts/common/module.js"
	if(isLogin){//是否已经登陆
		getCustomerInvoiceInfo();
	}else{ 
		location.href = 'login_usePW.html';
	}
});

//查询客户发票信息
function getCustomerInvoiceInfo(){
	
	$.ajax({
	    url: TERMINAL_URL + '/jsonrest/customer/CustomerInvoice/0/queryCustomerInvoice',
	    type: 'post',
	    dataType: 'json',
	    success: function (data) {
	    	
	    	 if(data.extendMap.isLogin == 0){//已登录
	    	 var list = data.entity.list;
	    	 if(list.length == 0){
	    		 $(".invoice-empty").css("display","");
	    		 $(".invoice-noEmpty").css("display","none");
	    		
	    	 }else{
	    		 var html = "";
	    		 for(var i in list){
		    			
					 html += '<div class="invoice-item">';
					 html += '<p class="invoice-item-title">抬头：';
					 html += '<span>';
					 html += list[i].heading;
					 html += '</span></p>';
					 
					 html += '<p class="invoice-item-price">开票金额：';
					 html += '<span><strong>';
					 html += list[i].money/100;
					 html += '</strong>元</span></p>';
					 if(list[i].checkStatus !=''){
						 if(list[i].checkStatus == 1){
							 html += '<div class="invoice-item-state submitted">';
							 html += '待审核';
						 }else if(list[i].checkStatus == 2){
							 html += '<div class="invoice-item-state">';
							 html += '已开票';
						 }else if(list[i].checkStatus == 3){
							 html += '<div class="invoice-item-state">';
							 html += '已驳回';
						 }
						 html += '</div>';
					 }
					 
					 html += '<div class="invoice-item-date">提交日期：';
					 html += '<span>';
					 if(list[i].createDate!=''){
						 var data = list[i].createDate.split(" ");
						 html += data[0];
					 }
					 html += '</span>';
					 html += '</div>';
						 
					 html +='</div>';
				 }
	    	 }

	    	 $(".invoice-main").html(html);
	      }else{
	    	  $(".invoice-empty").css("display","");
	    	  $(".invoice-noEmpty").css("display","none");
	      } 
	    }
	  });
}


