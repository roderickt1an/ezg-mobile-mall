var companyid ;

$(document).ready(function () {	
    companyid = getUrlParam("companyid");
	 initDialog();
	//加载首次默认数据
	show_loading("body","/images/loading.gif",true); 
	
	var url = TERMINAL_URL+"/jsonrest/http/HttpServiceInfo/1/loadDefaultData";
	$.post(url,{"companyid":companyid},function(re){//加载默认数据
		//加载企业
		if(re.msgCode == "1"){
			
			//加载企业下拉列表
			var companys = re.entity.companys;
			var itemHtml = "";	
			for(var i =0;i<companys.length;i++){
				itemHtml += '<li id="'+companys[i].companyid+'" class="item" >'+companys[i].companyname+'</li>'
			}		
			$(".forService>ul").html(itemHtml);
			
			var defaultCompany = re.entity.defaultCompanyMap;
			console.log(re.entity);
			if(defaultCompany){
	
				$("#service_company").attr("dId",defaultCompany.companyid);
				$("#service_company").html(defaultCompany.companyname)
				$("#name").html(defaultCompany.realname);			
				$("#tel").html(defaultCompany.mobilePhone);
				$("#telHref").attr("href","tel:"+defaultCompany.mobilePhone);
			}else{
				$("#service_company").html("未绑定公司")
			}
			var yongyouData = re.entity.yongyouData;
			var serviceDetail = re.entity.serviceDetail;
			loadServciceDetail(serviceDetail)
			loadYongyouData(yongyouData);
				$("#xlImg").click(function(){
					 $(".header-mean").trigger("click");
				})
			  $(".item").click(function(){//为下拉列表绑定点击事件
				  	
				  var dId = $("#service_company").attr("dId");
				  
				  if(dId != $(this).attr("id")){//表示企业改变了
					  
					  $("#service_company").html( $(this).html());
					  $("#service_company").attr("dId",$(this).attr("id"));
					  //根据企业Id去加载财税和服务信息
					  show_loading("body","/images/loading.gif",true); 
					  var  url =  TERMINAL_URL+"/jsonrest/http/HttpServiceInfo/1/loadDataByCompanyId";
					  $.post(url,{"companyid":$(this).attr("id")},function(re){
							console.log(re);
							if(re.msgCode == "1"){
							
								var serviceDetail = re.entity.serviceDetail;
								var yongyouData = re.entity.yongyouData;

								loadServciceDetail(serviceDetail)
								loadYongyouData(yongyouData);
								
							}else{
								
								error_dialog.setText( re.msg);
						    	error_dialog.show_dialog();
							    	
							}
						  
							remove_loading();
							
					  },"json");
					  
				  }
				
			  });
			
		
		}else{
			 
		    var date = new Date();
		    var year = date.getFullYear();
		    var month = date.getMonth()+1;
		    var day = date.getDate();
		 
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
			
			if(mon<10){
				mon = "0"+mon;
			}
			
            $("#period").html(year+"年"+mon+"月");
             
	    	error_dialog.setText( re.msg);
	    	error_dialog.show_dialog();
		    	
		}
		
		remove_loading();
	},"json")
 });
function toDecimal2(x) { 
    var f = parseFloat(x); 
    if (isNaN(f)) { 
      return false; 
    } 
    var f = Math.round(x*100)/100; 
    var s = f.toString(); 
    var rs = s.indexOf('.'); 
    if (rs < 0) { 
      rs = s.length; 
      s += '.'; 
    } 
    while (s.length <= rs + 2) { 
      s += '0'; 
    } 
    return s; 
  } 
//加载企业财税信息
function loadYongyouData(yongyouData){

	if(yongyouData == undefined || yongyouData == null ){//表示没有财税信息
		$(".service-quota-null").css("display","block");
		$("#yyHasData").css("display","none");
	}else{
		$(".service-quota-null").css("display","none");
		$("#yyHasData").css("display","");
		$("#period").html(yongyouData.period.substring(0,4)+"年"+yongyouData.period.substring(4,6)+"月");
	
		$("#ylr").html(toDecimal2(yongyouData.lrze));
		$("#ysr").html(toDecimal2(yongyouData.yysr));
		$("#hbzj").html(toDecimal2(yongyouData.hbzj));
		$("#cbfy").html(toDecimal2(yongyouData.cbfy));
		$("#sj").html(toDecimal2(yongyouData.sj));
		var companyId  = $("#service_company").attr("dId");
		$("#show_detail").attr("href","/service_list.html?companyId="+companyId);
		
		$(".aclick").unbind("click");
		$(".aclick").click(function(){
		
			window.location.href = "/service_list.html?companyId="+companyId;
		});
	    $("#financeAnalysis").attr("href","/service_warn.html?companyId="+companyId);
	    var reg = new RegExp("^-?[0-9]*.?[0-9]*$");
        var num = document.getElementById('ylr').textContent
        var num2 = document.getElementById('ysr').textContent
        var s,s2
        if ( reg.test(num) ) {
            var absVal = Math.abs(num);
            s = (num==absVal?'true':'false')
            if (s == 'false') {
                $('#u117').show()
            }
        }
        if ( reg.test(num2) ) {
            var absVal = Math.abs(num2);
            s2 = (num2==absVal?'true':'false')
            if (s2 == 'false') {
                document.getElementById('ysrdiv').style.color = 'rgba(178, 45, 0, 1)'
            }
        }
        
        //加载财税预警的数量
        
  	  var url =  TERMINAL_URL + '/jsonrest/http/HttpServiceInfo/1/getFinanceAnalysis';
		$.post(url,{"companyid":companyId},function(re){
			console.log(re);
				$("#yjNum").html(re.entity.data.length);
				
		},"json");
	}
	
}

//加载企业服务信息
function loadServciceDetail(serviceDetail){
	console.log(serviceDetail);
	if(serviceDetail == null || serviceDetail == undefined || serviceDetail.length == 0){//数据为空，未购买任何服务
		
		$(".service-myService-null").css("display","block");
		$("#hasData").css("display","none");	
		
	}else{
		console.log(serviceDetail);
		
		var allHtml = "";
		var bussinessHtml = "";
		var planHtml = "";
		var accountHtml = "";
		var allNum = 0;
		var qhNum = 0;
		var ssNum = 0;
		var csNum = 0;
		for(var i =0;i<serviceDetail.length;i++){
			allNum +=1;
			var detailObj = serviceDetail[i];
			var html = "";
			html += "<a href='service_my.html?workOrderId="+detailObj.id+"' class='service-myService-item'>";
			html += "<p class='service-myService-item-name'>"+detailObj.product+"</p>";
			html += " <p class='service-myService-item-state'>目前进度：<strong>"+detailObj.currentprocess+"</strong></p>";
			html += " <div class='service-myService-item-deadline'>预计完成时间：<span>"+detailObj.serviceend+"</span></div>"
			html += "<span>详情 &gt;&gt;</span></a>";
			allHtml += html;
			if(detailObj.type == "BUSSINESS"){
				bussinessHtml += html;
				ssNum+=1;
			}else if(detailObj.type == "PLAN"){
				planHtml += html;
				qhNum+=1;
			}else if(detailObj.type == "ACCOUNT"){
				planHtml += accountHtml;
				csNum+=1;
			}
		}
		$("#allNum").html(allNum);
		$("#qhNum").html(qhNum);
		$("#ssNum").html(ssNum);
		$("#csNum").html(csNum);
		$("#div1").html(allHtml);
		
		
		if(bussinessHtml != ""){
			
			$("#div2").html(bussinessHtml);
			
		}else{
			$(".div2").remove();
			$("#ssNullTip").css("display","");
			
			
		}
		
		if(planHtml != ""){
			
			$("#div3").html(planHtml);
			
		}

		if(accountHtml != ""){
			
			$("#div4").html(accountHtml);
			
		}

		$(".service-myService-null").css("display","none");
		$("#hasData").css("display","");
	
	}
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