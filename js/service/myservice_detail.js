var isWeiXinBoolean = false;
function isWeiXin(){
    var ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
    	isWeiXinBoolean =  true;
    }else{
    	isWeiXinBoolean =  false;
    }
  
}
isWeiXin();
var isInit = false;

var workOrderId;
$(document).ready(function () {	
	if(isWeiXinBoolean){
		WechatShare.init();
	    wx.ready(function(){
	    	isInit = true;
		}); 
	}
	
	initDialog();
	workOrderId =  getUrlParam('workOrderId');

	$('#myService_button').click(function () {
		$("#myService_button").attr("disabled", true); 
	
	    var url = TERMINAL_URL + '/jsonrest/http/HttpServiceInfo/1/customerReminder';
	    //发送催单请求
	    $.post(url,{"workOrderId":workOrderId},function(re){
	    	
	    	if(re.msgCode=='1'){
	    		console.log(re);
	    		var  time = re.entity.reminder;
	    		//根据时间判断
	    		leftTimer(time);
	    	}else{
	    		$("#myService_button").attr("disabled", false); 
	    		error_dialog.setText( re.msg);
		    	error_dialog.show_dialog();
	    	}
	    	
	    },"json");
		  error_dialog.setText("您的需求已收到，我们将通知相关人员加速办理!");
		  error_dialog.show_dialog();
	  });

	  
	  
	  LoginGetServiceInterface(workOrderId);
	  
});	  

function leftTimer(time){
	if(time>0){
		time = time - 1000;


		var days = parseInt(time / 1000 / 60 / 60 / 24 , 10); //计算剩余的天数   
		var hours = parseInt(time / 1000 / 60 / 60 % 24 , 10); //计算剩余的小时   
		var minutes = parseInt(time / 1000 / 60 % 60, 10);//计算剩余的分钟 
		var seconds = parseInt(time / 1000 % 60, 10);//计算剩余的秒数  
		
		
		days = checkTime(days);   hours = checkTime(hours);  
		minutes = checkTime(minutes);  
		seconds = checkTime(seconds);
		setTimeout("leftTimer("+time+")",1000);  
		$("#myService_button").html(hours+"小时" + minutes+"分"+seconds+"秒"+"后重置" );
	}else{
		$("#myService_button").html("我要催单");
		$("#btn").attr("disabled", false); 


	}
	
} 

function checkTime(i){ //将0-9的数字前面加上0，例1变为01  
	
		if(i<10)   {   
			i = "0" + i;   
		}  
		
		return i;  
	}  

  function LoginGetServiceInterface(workOrderId) {

		show_loading("body","/images/loading.gif",true); 
	    var type = 0;
	    var url = TERMINAL_URL + '/jsonrest/http/HttpServiceInfo/1/loadWorkOrderDetailByWorkOrderId';
		//var url = SERVICE_INFO_URL + '/iWorkFlowController.do?getWorkFlow';
		var token = "";
		var param=[];
		param.push('workOrderId='+workOrderId);
		ajax({
			url : url,
			type : 'get',// 非必须.默认get
			dataType : 'json',// 非必须.默认text
			data:param.join('&'),
			async : true,// 非必须.默认true
			cache : false,// 非必须.默认false
			timeout : 30000,// 非必须.默认30秒
			success : getWorkFlowDetailSuccess
		// 非必须
		},type);
  /*  
	  var obj = loginStatusData();
	
	  if(obj && obj.entity){}else{
	   
	    	if(dataMap[workOrderId]){
	    		getWorkFlowDetailSuccess(dataMap[workOrderId]);
	    	}else{
				var error_dialog2 = new Dialog('#error_dialogz', {
					  time: 1000000,
					  callbackAfter:function(){
						//  location.href = '/login_usePW.html';
						  error_dialog2.remove_dialog();
					  }
					});
					error_dialog2.setButton({"errorbutton2":'确定'});
					$("#errorbutton2").click(function(){
						  window.location.href = "login_usePW.html"
						error_dialog2.remove_dialog();
					});
				  
					 error_dialog2.setText('您尚未登录');
					  error_dialog2.show_dialog();
			
	    	}
	    	
	    		
	    }
	  */
	
	  } 
	  
	  function getWorkFlowDetailSuccess(data){
		  console.log(data);
		  if (data.msgCode ==1){
			  createServiceDetailData(data);
		  }else{
			  error_dialog.setText(data.msg);
			  error_dialog.show_dialog();
			  
		  }
		  remove_loading();
	  }
	  
	  function createServiceDetailData(obj){
		
		  var workOrderDetails =  obj.entity.workOrderDetails.details;
		  var time =  obj.entity.workOrderDetails.time;
		  
		  if(time > 0){
			  leftTimer(time); 
		  }else{
				$("#myService_button").attr("disabled", false); 
		  }
		 
		  var html = "";
		  for(var i=0;i<workOrderDetails.length;i++){
			  var obj = workOrderDetails[i];
		
			 
			  if( i == 0){
				  
				  if(!isNull(obj.startdate)){
					  html+="<div style='text-align: center;'>开始时间:"+obj.startdate+"</div>";
					   html+=" <div style='height:2rem'></div>";
				  }
				  
				 $(".header-title").html(obj.companyname);
				 
			  }
		
			  if (i > 0)
				  html += '<em></em>' ;
			  	
			  if ( obj.status == '2'){
		
				  var endDate = obj.enddate+"";
				  if(!isNull(endDate)){
					  endDate = endDate.substring(0,10);
				  }
				  html += '<i>' ;
				  html += '<span>'+obj.processname+'</span>';
				  html += '<span>已结束&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp'+endDate+'</span>';				  
				  html += '</i>' ;
			  }else if ( obj.status == '0'){
				  html += '<i class="undo">' ;
				  html += '<span>'+obj.processname+'</span>';
				  html += '<span>未开始</span>';				  
				  html += '</i>' ;
			  }else if ( obj.status  == '1'){
				  html += '<i >' ;
		/*		  html += ' <p class="service-myService-doing-start">开始时间</p>';
			      html += '<p>'+p_obj.startDate+'</p>';*/
			/*	  html += '<p class="service-myService-doing-finish">预计完成时间</p>';
				  html += '<p>'+p_obj.preEndDate+'</p>';*/
				  html += '<span>'+obj.processname+'</span>';
				  html += '<span>正在进行</span>';				  
				  html += '</i>' ;
			  }
			 
			  $(".service-myService-main").html(html);
		
			  
		  }
		  
	/*	  if (obj){
			  var _entity = obj.entity;	
			  var product = eval('(' + _entity + ')');
			  var companyName = product.companName;
			  var productProcess = product.productProcess;
			  console.log(obj);
			  $(".header-title").html(companyName);
			  var html="";
			  var p_obj ;
			  var s_obj;
			  var s_index;

			  for(var i= 0, l=productProcess.length; i<l; i++){
				  s_index = i+1 + '';
				  s_obj = productProcess[i];
				  p_obj = s_obj[s_index];
				  html += '';
				  if( i == 0){
					  if(!isNull(p_obj.startDate)){
						  html+="<div style='text-align: center;'>开始时间:"+p_obj.startDate+"</div>";
						   html+=" <div style='height:2rem'></div>";
					  }
					 
				  }
			
				  if (i > 0)
					  html += '<em></em>' ;
				  	
				  if ( p_obj.content == '已结束'){
					  console.log(p_obj);
					  var endDate = p_obj.endDate;
					  if(!isNull(endDate)){
						  endDate = endDate.substring(0,10);
					  }
					  html += '<i>' ;
					  html += '<span>'+p_obj.processName+'</span>';
					  html += '<span>已结束&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp'+endDate+'</span>';				  
					  html += '</i>' ;
				  }else if ( p_obj.content == '未开始'){
					  html += '<i class="undo">' ;
					  html += '<span>'+p_obj.processName+'</span>';
					  html += '<span>未开始</span>';				  
					  html += '</i>' ;
				  }else if ( p_obj.content == '正在进行'){
					  html += '<i >' ;
					  html += ' <p class="service-myService-doing-start">开始时间</p>';
				      html += '<p>'+p_obj.startDate+'</p>';
					  html += '<p class="service-myService-doing-finish">预计完成时间</p>';
					  html += '<p>'+p_obj.preEndDate+'</p>';
					  html += '<span>'+p_obj.processName+'</span>';
					  html += '<span>正在进行</span>';				  
					  html += '</i>' ;
				  }
				 
			  }
			  $(".service-myService-main").html(html);
		  
			  
			  //开始生成分享的URL
			  
			  
			  //获取根据手机号和企业ID获取临时访问url
				 var url = TERMINAL_URL + '/jsonrest/http/HttpServiceInfo/1/getDetailTempUrl';
				
				 if(isInit){
					 
					 $.post(url,{"companyid":companyid,"workOrderId":workOrderId,"productid":productid},function(re){
						 
						  var paramsData = {
								  title: "邀请您一起查看数据",
					              desc: "快来看看我企业的数据吧",
					              link: re.entity,
					              imgUrl: "http://www.zgcfo.com/ditui/img/ditui_banner1.jpg",
					             
					            };
						  
							 WechatShare.bindShare(paramsData,null,null);
						  
					  },"json");
					 
				 }
				 
				  
		  }*/
	  }
	  
	



