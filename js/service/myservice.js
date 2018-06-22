  
var myCompany ;
var myCompanyProduct;
var defalutCompanyName;
var companyid;
var mobile;
var isInit = false;
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
$(document).ready(function () {	
	
	if(isWeiXinBoolean){
		WechatShare.init();
	
		//判断微信jsapi是否初始化成功
		
	    wx.ready(function(){
	    
	    	isInit = true;
		}); 
	}
	
	    
	    var date = new Date();
	    var year = date.getFullYear();
	    var month = date.getMonth()+1;
	    var day = date.getDate();
	    companyid = getUrlParam("companyid");
	    if(day<23){
	      day=day+7
	    }else {
	      month=month+1
	      day=0
	    }

		var data = new Date();
		var mon =  data.getMonth()+1; //获取当前月份(0-11,0代表1月) 
		var day =  data.getDate(); //获取当前日(1-31)  
		if(day>21){
			 mon = mon -1;
			 
		}else{
			 mon = mon -2;
		}
		if(mon <= 0){
			 mon = 12 +mon;
		}
		var  str=mon+"月财务指标"
			  $("#service_quota_month").text(str);
		var platform = navigator.platform;
		var userAgent = navigator.userAgent;
		var strUrl=window.location.href; 
		var strPage = strUrl.split(".html")[0]+".html";
		var source = getUrlParam("ezgfrom");
  	  
        $.post("/service100gonghost/jsonrest/information/Generalize/0/createRequestDetail",
			  {"source":source,"generalizeUrl":strPage.replace("#",""),"platform":platform,"userAgent":userAgent,"generalizeName":"手机端我的服务"},
         "json")
         
		$(".buttonBox>button").click(function(){
			$(".info").removeClass('show');
			var  userMobile = $("#userMobile").val();
			if(isPhone(userMobile)){
				error_dialog.setText("定制成功!");
		    	error_dialog.show_dialog();
		    	showTelInput.remove_dialog();
		
				$.post("/service100gonghost/jsonrest/information/Generalize/0/createGeneralize",
					  {"userMobile":userMobile,"source":source,"generalizeUrl":strPage,"platform":platform,"userAgent":userAgent},
				"json")
			}else{
				
				$(".info").addClass('show');
			}
		
			
		});
        initDialog();
        	
        $('.footer-cell-icon').find('.icon-fuwu').parent().parent().addClass('active');

	  var obj = loginStatusData();
	  if (obj && obj.entity){
		  $(".service-myService-item").hide();
		  $("#service-header-p").hide();
		  $("#service-header-list").show();
		  
		  mobile = obj.entity.userCode;
		  //获取默认选择的企业
		  getdefaultCompanyId(mobile);
		  
		  
	  }else{
		

		  $(".service-quota").removeClass("null");
	
		  $(".service-myService-item").show();
		  $(".service-myService-null").hide();
		  var myChart = echarts.init(document.getElementById('echart_main'));

		    // 指定图表的配置项和数据
		    var option = {
		      tooltip: {},
		      xAxis: {
		        data: ["货币资金", "收入", "成本、费用", "利润", "税金"],
		        axisLabel: {
		            interval: 0
		          }
		      },
		      yAxis: {
		        axisLabel: {
		          show: false
		        },
		        axisTick: {
		          show: false
		        }
		      },
		      grid: {
		          top: 20,
		          right: 20,
		          left: 20,
		          bottom: 40
		        },
		      series: [{
		        name: '销量',
		        type: 'bar',
		        barCategoryGap:'50%',
		        label: {
		          normal: {
		            show: true,
		            position: 'top'
		          }
		        },
		        itemStyle: {
		          normal: {
		            barBorderColor: '#3f85bf',
		            color: '#3f85bf'
		          }
		        },
		          data: [{
		          name: '货币资金',
		          value: (952500.23/10000).toFixed(2)
		        }, {
		          name: '收入',
		          value: (854900/10000).toFixed(2)
		        }, {
		          name: '成本、费用',
		          value: (58049.21/10000).toFixed(2)
		        }, {
		          name: '利润',
		          value:(797724.57/10000).toFixed(2)
		        }, {
		          name: '税金',
		          value: (175123.7/10000).toFixed(2)
		        }]
		      }]
		    };

		    // 使用刚指定的配置项和数据显示图表。
		    myChart.setOption(option); 
		  
		  
			var error_dialog2 = new Dialog('#error_dialogz', {
				  time: 1000000/*,
				  callbackAfter:function(){
					//  location.href = '/login_usePW.html';
					  error_dialog2.remove_dialog();
				  }*/
				});
				error_dialog2.setButton({"errorbutton2":'确定'});
				$("#errorbutton2").click(function(){
				
					error_dialog2.remove_dialog();
				});
			  
				 error_dialog2.setText('您尚未登录');
				  error_dialog2.show_dialog();
				  
			
				  
				  $("#showTelInput").show();
				  var showTelInput = new Dialog('#telInput', {});
				    $('#showTelInput').click(function () {
				      showTelInput.show_dialog();
				    })
				    
				    
				    $("#show_detail").attr("href","/service_list.html?companyId=8aad34155982dc66015982e59ccb0027");
				  
				    $("#echart_main").attr("href","/service_list.html?companyId=8aad34155982dc66015982e59ccb0027");
				  
	  }
		
	  
	 
	  $('#loginM_getVerificationCode').click(function () {
//	      验证码按钮触发事件，建议完成Ajax后再调用计时器
		  LoginGetIdentify();
	    });
    
  });

  function getdefaultCompanyId(mobile){
	  
	  show_loading("body","/images/loading.gif",true); 
	  setTimeout("remove_loading()",4000); 
	 var url =  TERMINAL_URL + '/jsonrest/http/HttpServiceInfo/1/getUserSelect';
	 $.post(url,function(re){
		 	console.log(re);
		  defalutCompanyName = re.entity.woaCompanyName;
		  LoginGetServiceInterface(mobile);
		  LoginGetServiceYongyouInterface(mobile);
	 },"json")  
	 
  }
 
  function LoginGetServiceYongyouInterface() {
	  var type = 0;
	    var url = TERMINAL_URL + '/jsonrest/http/HttpServiceInfo/1/getWorkFlowYongyou';

		var token = "";
		var param=[];
		ajax({
			url : url,
			type : 'get',// 非必须.默认get
			dataType : 'json',// 非必须.默认text
			data:param.join('&'),
			async : true,// 非必须.默认true
			cache : false,// 非必须.默认false
			timeout : 30000,// 非必须.默认30秒
			success : getWorkFlowYongyouSuccess
		// 非必须
		},type);
	  } 
  
  
  function LoginGetServiceInterface() {
	
	    var type = 0;
	    var url = TERMINAL_URL + '/jsonrest/http/HttpServiceInfo/1/getWorkFlow';
		//var url = SERVICE_INFO_URL + '/iWorkFlowController.do?getWorkFlow';
		var token = "";
		var param=[];
		ajax({
			url : url,
			type : 'get',// 非必须.默认get
			dataType : 'json',// 非必须.默认text
			data:param.join('&'),
			async : true,// 非必须.默认true
			cache : false,// 非必须.默认false
			timeout : 30000,// 非必须.默认30秒
			success : getWorkFlowSuccess
		// 非必须
		},type);
	  } 
  
  function getWorkFlowSuccess(data){

	  
	  if (data.msgCode ==1){
		  createServiceData(data);
	  }else{
		  error_dialog.setText('未绑定客户');
		  error_dialog.show_dialog();
	  }
	  
  }
  function getWorkFlowYongyouSuccess(data){
	  console.log(data);
	
	  if (data.msgCode ==1){
		  
		  createServiceYongyouData(data);
		  
	  }else{
		  $(".service-quota").addClass("null");
		 
	  }
	  remove_loading();
  }
  
  function changeSelectText(companyName){
	  
	  $("#service-header-select").val(companyName);
	  
	  if(companyName ){
		
		  var company = myCompany[companyName];
		  var products = company.products;
		  var companyid = company.companyId;
		  bindWechatSearch(companyid);
		  var productid = "";
		  var workOrderId = "";
		  var adviser = company.adviser;
		  var adviserMobile = company.adviserMobile;
		  $("#adviser_info>span").html(adviser);
		  if (adviserMobile){
			  $("#adviser_tel").attr('href',"tel:"+adviserMobile);
			  $("#adviser_tel>span").html(adviserMobile);
		  }
			 
		  $(".service-myService-item").remove();
		  if(!products ||products.length==0){
			  $(".service-myService-null").show();
			  $(".service-myService-item").hide();
		  }else{
			  $(".service-myService-null").hide();
			  var html = '';
			  var _proName = "";
			  for(var i= 0, l=products.length; i<l; i++){
				  productid = products[i].productId;
				  workOrderId = products[i].workOrderId;
				  _proName = products[i].productName;
				  if (_proName.indexOf("（") != -1){
					  _proName = _proName.substring(0, _proName.indexOf("（"));
				  }else if (_proName.indexOf("(") != -1){
					  _proName = _proName.substring(0, _proName.indexOf("("));
				  }
				  html += 
				  '<a href="service_my.html?companyid='
					  + companyid
					  + '&productid='
					  + productid
					  + '&workOrderId='
					  + workOrderId
					  +'" class="service-myService-item">'
				   + '<p class="service-myService-item-name">'+_proName+'</p>'
				   + ' <p class="service-myService-item-state">目前进度：<strong>'+products[i].currentProcess+'</strong></p>'
				   + ' <div class="service-myService-item-deadline">预计完成时间：<span>'+products[i].preEndDate+'</span></div>'
				   + '  <span>详情 >></span>';
				   + ' </a>';
				   
			  }
			  $(".service-myService-null").after(html);
		  }
	  }
  }
  

  function createServiceYongyouData(obj){
	
	  if (obj){
		  var _entity = obj.entity;	
		 
		  
		  var companyName  = null;
		  myCompanyProduct = eval('(' + _entity + ')');
		
		
		    
	      for (var p in myCompanyProduct){
	    	
	    	  if(companyName == null){

	    		  companyName = myCompanyProduct[p].companyname;
	    	  }
	    	
	      }
	 
		  	

	       if(!isNull(defalutCompanyName)){
			  console.log(defalutCompanyName+"----defalutCompanyName")
			  changeSelectYongyouText(defalutCompanyName);
		  }else{
			  console.log(companyName+"----companyName")
			  changeSelectYongyouText(companyName);
		  }
		  
		
	  }
  }
  function Trim(str)
  { 
	  if(str){
		  
		  return str.replace(/(^\s*)|(\s*$)/g, ""); 
		  
	  }else{
		  
		  return null;
	  
	  }
      
  }
  function changeSelectYongyouText(companyName){
	  companyName = Trim(companyName);
	  console.log(companyName)
	  console.log(myCompanyProduct);
	  if(companyName ){
		  var companyProduct ;
		  if(!myCompanyProduct){
			  
			  $(".service-quota").addClass("null");
			  return false;
		  }else{
			  companyProduct = myCompanyProduct[companyName];
		  }
		  if(!companyProduct){
			
			  $(".service-quota").addClass("null");
		  }else{
			  $(".service-quota").removeClass("null");
			
			
			  var monthz = parseInt(companyProduct.month.substring(4,6));
			  
			  $("#service_quota_month").html(monthz+"月"+"财务指标")
			  loadECharts(companyProduct);
		
		  }
		  
	  }
  }
  function loadECharts(companyProduct){
	  console.log(companyProduct);
	  var myChart = echarts.init(document.getElementById('echart_main'));
	  var hbzj = (+companyProduct.hbzj/10000).toFixed(2);
	  var yysr = (+companyProduct.yysr/10000).toFixed(2);
      var cbfy = (+companyProduct.cbfy/10000).toFixed(2);
      var lr = (+companyProduct.lrze/10000).toFixed(2);
      var sj = (+companyProduct.sj/10000).toFixed(2);
      var hbzjMap = {"name":"货币资金","value":hbzj};
      var yysrMap =  {"name":"营业收入","value":yysr};
      var cbfyMap = {"name":"成本费用","value":cbfy};
      var lrMap =  {"name":"利润","value":lr};
      var sjMap =  {"name":"税金","value":sj};
      var normal = {'barBorderColor': '#ff3333','color':'#ff3333'};
      var itemStyle = {"normal":normal};
      var companyId = companyProduct.companyid;
      
      if(hbzj<0){
    	  hbzjMap.itemStyle = itemStyle;
      }
      
      if(yysr<0){
    	  yysrMap.itemStyle = itemStyle;
      }
      
      if(cbfy<0){
    	  cbfyMap.itemStyle = itemStyle;
      }
      
      if(lr<0){
 
    	  lrMap.itemStyle = itemStyle;
      }
      
      if(sj<0){
    	  sjMap.itemStyle = itemStyle;
      }
      var data = [];
      data.push(hbzjMap);
      data.push(yysrMap);
      data.push(cbfyMap);
      data.push(lrMap);
      data.push(sjMap);
	// 指定图表的配置项和数据
	    var option = {
	      tooltip: {},
	      xAxis: {
	        data: ["货币资金", "收入", "成本、费用", "利润", "税金"],
	        axisLabel: {
	            interval: 0
	          }
	      },
	      yAxis: {
	        axisLabel: {
	          show: false
	        },
	        axisTick: {
	          show: false
	        }
	      },
	      grid: {
	          top: 20,
	          right: 20,
	          left: 20,
	          bottom: 40
	        },
	      series: [{
	        name: '销量',
	        type: 'bar',
	        barCategoryGap:'50%',
	        label: {
	          normal: {
	            show: true,
	            position: 'top'
	          }
	        },
	        itemStyle: {
	          normal: {
	            barBorderColor: '#3f85bf',
	            color: '#3f85bf'
	          }
	        },
	     
	        data: data
	      }]
	    };
	    myChart.setOption(option)
	    
	     $("#show_detail").attr("href","/service_list.html?companyId="+companyId);
	     $("#financeAnalysis").attr("href","/service_warn.html?companyId="+companyId);
	 
	     $("#echart_main").attr("href","/service_list.html?companyId="+companyId);
				  

  }
  
  //显示服务数据
  function createServiceData(obj){
	 
	  if (obj){
		  
		  var _entity = obj.entity;	
		  myCompany = eval('(' + _entity + ')');
		  console.log(1);
		  console.log(myCompany);
		 
		  var arry = myCompany.companys;
		  if (arry.length == 0){
			  
			  $("#service_company").html('您尚未绑定企业');		  
		
			  return;
		  }
		 var selectHtml = "";
		  
		  for(var p in myCompany){
			  if(p != "companys" && !isNull(companyid) && myCompany[p].companyId == companyid){
				  defalutCompanyName = p;
			  }
		  }
		  for(var i= 0; i<arry.length;i++){
			 
				  if(i == 0){
					 
					  if(isNull(defalutCompanyName) ){
						 
						  defalutCompanyName = arry[i];
					  }
				  }
			 
			
			  selectHtml += '<li class="item" >'+arry[i]+'</li>'; 
			 // $("#service-header-select").append("<option value='"+arry[i]+"'>"+arry[i]+"</option>");
		  }
		 
		  $("#service_company").html(defalutCompanyName);		
		  $(".header-mean-list").html(selectHtml);
		  //绑定分享
		 
		  $(".item").click(function(){
			  $("#service_company").html($(this).html());	
			  changeSelectText(  $("#service_company").html());
			  var url =  TERMINAL_URL + '/jsonrest/http/HttpServiceInfo/1/setUserSelect';
				 $.post(url,{"woaCompanyName":$(this).html()},"json")  
				 defalutCompanyName = $(this).html();
				  changeSelectYongyouText($(this).html());
		  });		  
	
		 changeSelectText(defalutCompanyName);
		 
		  
	  }
	  remove_loading();
  }
  function success(){
	  
  }
  function bindWechatSearch(companyid){
	  
	  //获取根据手机号和企业ID获取临时访问url
	 var url = TERMINAL_URL + '/jsonrest/http/HttpServiceInfo/1/getTempUrl';
	
	 if(isInit){
		 $.post(url,{"companyid":companyid,"mobile":mobile},function(re){
			  console.log(re.entity);
			  var paramsData = {
					  title: "邀请您一起查看数据",
		              desc: "快来看看我企业的数据吧",
		              link: re.entity,
		              imgUrl: "http://www.zgcfo.com/ditui/img/ditui_banner1.jpg"
		            };
				  WechatShare.bindShare(paramsData,success,success);
			  
		  },"json");
		 
	 }
	 
	  
	
	  
  }