$(document).ready(function () {	
	
	var companyId = getUrlParam("companyId");
	var reportType = getUrlParam("reportType");
	var period = getUrlParam("period");
	
	if(isNull(companyId)||isNull(reportType)||isNull(period)){
		window.location.href = "/service.html";
	 }
	  show_loading("body","/images/loading.gif",true); 
	  
	 setTimeout("remove_loading()",4000); 
   function changeColor(num){
	   if(num<0){
		   return "<font color='red'>"+num+"</font>";
	   }else{
		   return num;
	   }
   }    
   
   var data = {};
   data.cash = {"entity":[{"year_cash":0,"item":"一、经营活动产生的现金流量：","row":"0","month_cash":0},{"row":"1","item":"销售产成品、商品、提供劳务收到的现金","month_cash":830000,"year_cash":830000},{"month_cash":170000,"year_cash":170000,"row":"2","item":"收到其他与经营活动有关的现金"},{"year_cash":0,"month_cash":0,"item":"购买原材料、商品、接受劳务支付的现金","row":"3"},{"month_cash":7485,"row":"4","item":"支付的职工薪酬","year_cash":7485},{"row":"5","item":"支付的税费","month_cash":1715,"year_cash":1715},{"month_cash":50303,"year_cash":50303,"item":"支付其他与经营活动有关的现金","row":"6"},{"row":"7","year_cash":940497,"item":"经营活动产生的现金流量净额","month_cash":940497},{"month_cash":0,"year_cash":0,"item":"二、投资活动产生的现金流量：","row":"0"},{"item":"收回短期投资、长期债券投资和长期股权投资收到的现金","month_cash":0,"row":"8","year_cash":0},{"month_cash":0,"item":"取得投资收益收到的现金","row":"9","year_cash":0},{"row":"10","year_cash":0,"item":"处置固定资产、无形资产和其他非流动资产收回的现金净额","month_cash":0},{"row":"11","item":"短期投资、长期债券投资和长期股权投资支付的现金","year_cash":0,"month_cash":0},{"row":"12","item":"购建固定资产、无形资产和其他非流动资产支付的现金","month_cash":0,"year_cash":0},{"month_cash":0,"row":"13","item":"投资活动产生的现金流量净额","year_cash":0},{"row":"0","month_cash":0,"item":"三、筹资活动产生的现金流量：","year_cash":0},{"row":"14","year_cash":0,"item":"取得借款收到的现金","month_cash":0},{"item":"吸收投资者投资收到的现金","year_cash":0,"month_cash":0,"row":"15"},{"month_cash":0,"item":"偿还借款本金支付的现金","year_cash":0,"row":"16"},{"month_cash":0,"item":"偿还借款利息支付的现金","year_cash":0,"row":"17"},{"month_cash":0,"row":"18","item":"分配利润支付的现金","year_cash":0},{"year_cash":0,"item":"筹资活动产生的现金流量净额","month_cash":0,"row":"19"},{"year_cash":940497,"item":"四、现金净增加额","month_cash":940497,"row":"20"},{"item":"加：期初现金余额","row":"21","month_cash":12003.23,"year_cash":12003.23},{"row":"22","item":"五、期末现金余额","year_cash":952500.23,"month_cash":952500.23}],"extendMap":null,"failureCode":"","mapMsgBean":null,"message":"","msg":"成功","msgCode":1,"statusCode":"200"};
   data.income = {"entity":[{"row":"1","year_cash":854900,"month_cash":854900,"item":"一、营业收入"},{"year_cash":0,"item":"减：营业成本","month_cash":0,"row":"2"},{"year_cash":0,"item":"营业税金及附加","month_cash":0,"row":"3"},{"row":"4","month_cash":0,"item":"　其中：消费税","year_cash":0},{"month_cash":0,"row":"5","item":"　　　营业税","year_cash":0},{"month_cash":0,"row":"6","year_cash":0,"item":"　　　城市维护建设税"},{"item":"　　　资源税","year_cash":0,"row":"7","month_cash":0},{"row":"8","year_cash":0,"item":"　　　土地增值税","month_cash":0},{"year_cash":8.7,"month_cash":8.7,"row":"9","item":"　　　城镇土地使用税、房产税、车船税、印花税"},{"item":"　　　教育费附加、矿产资源补偿费、排污费","year_cash":0,"row":"10","month_cash":0},{"month_cash":0,"item":"销售费用","year_cash":0,"row":"11"},{"month_cash":0,"row":"12","item":"　其中：商品维修费","year_cash":0},{"year_cash":0,"row":"13","item":"　　　广告费和业务宣传费","month_cash":0},{"row":"14","month_cash":58046.21,"year_cash":58046.21,"item":"管理费用"},{"month_cash":0,"row":"15","item":"　其中：开办费","year_cash":0},{"item":"　　　业务招待费","month_cash":50000,"row":"16","year_cash":50000},{"item":"　　　研究费用","month_cash":0,"row":"17","year_cash":0},{"month_cash":3,"row":"18","year_cash":3,"item":"财务费用"},{"item":"　其中：利息费用（收入以“-”号填列）","month_cash":0,"year_cash":0,"row":"19"},{"row":"20","item":"加：投资收益（损失以“-”号填列）","month_cash":0,"year_cash":0},{"item":"二、营业利润（亏损以“-”号填列）","year_cash":796850.79,"row":"21","month_cash":796850.79},{"row":"22","month_cash":873.78,"item":"加：营业外收入","year_cash":873.78},{"item":"　其中：政府补助","row":"23","year_cash":0,"month_cash":0},{"year_cash":0,"row":"24","month_cash":0,"item":"减：营业外支出"},{"month_cash":0,"year_cash":0,"item":"　其中：坏账损失","row":"25"},{"year_cash":0,"row":"26","item":"　　　无法收回的长期债券投资损失","month_cash":0},{"month_cash":0,"item":"　　　无法收回的长期股权投资损失","row":"27","year_cash":0},{"year_cash":0,"row":"28","month_cash":0,"item":"　　　自然灾害等不可抗力因素造成的损失"},{"row":"29","month_cash":0,"item":"　　　税收滞纳金","year_cash":0},{"row":"30","month_cash":797724.57,"year_cash":797724.57,"item":"三、利润总额（亏损总额以“-”号填列）"},{"month_cash":0,"row":"31","item":"减：所得税费用","year_cash":0},{"item":"四、净利润（净亏损以“-”号填列）","month_cash":797724.57,"year_cash":797724.57,"row":"32"}],"extendMap":null,"failureCode":"","mapMsgBean":null,"message":"","msg":"成功","msgCode":1,"statusCode":"200"};
   data.debt = {"entity":[{"equity_end_balance":0,"asset_row":"","equity":"流动负债：","asset_year_init_balance":0,"asset":"流动资产：","asset_end_balance":0,"equity_year_init_balance":0,"equity_row":""},{"asset":"货币资金","equity_year_init_balance":0,"asset_row":"1","equity":"短期借款","equity_row":"31","equity_end_balance":0,"asset_end_balance":952500.23,"asset_year_init_balance":12003.23},{"asset":"短期投资","equity_row":"32","equity":"应付票据","asset_year_init_balance":0,"equity_year_init_balance":0,"asset_end_balance":0,"asset_row":"2","equity_end_balance":0},{"equity":"应付账款","asset_end_balance":0,"equity_end_balance":0,"asset":"应收票据","asset_year_init_balance":0,"equity_year_init_balance":0,"equity_row":"33","asset_row":"3"},{"asset":"应收账款","asset_end_balance":30000,"asset_row":"4","equity_end_balance":0,"equity_row":"34","equity":"预收账款","asset_year_init_balance":0,"equity_year_init_balance":0},{"equity_row":"35","asset_end_balance":0,"asset_row":"5","asset":"预付账款","equity_year_init_balance":0,"equity":"应付职工薪酬","asset_year_init_balance":0,"equity_end_balance":10000},{"equity_end_balance":172534.92,"equity":"应交税费","equity_year_init_balance":0,"asset_year_init_balance":0,"asset":"应收股利","equity_row":"36","asset_end_balance":0,"asset_row":"6"},{"asset_end_balance":0,"equity_end_balance":0,"equity_row":"37","asset_row":"7","equity":"应付利息","asset_year_init_balance":0,"asset":"应收利息","equity_year_init_balance":0},{"equity_year_init_balance":0,"equity":"应付利润","equity_row":"38","asset_year_init_balance":0,"asset_row":"8","equity_end_balance":0,"asset":"其他应收款","asset_end_balance":0},{"asset":"存货","asset_row":"9","equity_row":"39","equity":"其他应付款","asset_year_init_balance":0,"equity_end_balance":10000,"asset_end_balance":10000,"equity_year_init_balance":10000},{"asset_year_init_balance":0,"asset_end_balance":0,"equity_end_balance":0,"asset_row":"10","asset":"其中：原材料","equity":"","equity_row":"","equity_year_init_balance":0},{"equity_year_init_balance":0,"equity_end_balance":0,"asset":"在产品","equity_row":"","asset_row":"11","asset_year_init_balance":0,"asset_end_balance":10000,"equity":""},{"asset_year_init_balance":0,"equity_year_init_balance":0,"asset_end_balance":0,"asset":"库存商品","equity_row":"","equity_end_balance":0,"equity":"","asset_row":"12"},{"asset_row":"13","equity_row":"","asset_year_init_balance":0,"equity_end_balance":0,"equity":"","asset_end_balance":0,"asset":"周转材料","equity_year_init_balance":0},{"equity_row":"40","asset":"其他流动资产","asset_row":"14","equity_end_balance":0,"asset_end_balance":0,"equity_year_init_balance":0,"equity":"其他流动负债","asset_year_init_balance":0},{"equity_row":"41","equity_year_init_balance":10000,"asset_row":"15","equity_end_balance":192534.92,"equity":"流动负债合计","asset_year_init_balance":12003.23,"asset":"流动资产合计","asset_end_balance":992500.23},{"asset_end_balance":0,"asset_row":"","asset_year_init_balance":0,"equity_row":"","equity":"非流动负债：","asset":"非流动资产：","equity_end_balance":0,"equity_year_init_balance":0},{"asset_row":"16","equity":"长期借款","asset":"长期债券投资","equity_end_balance":0,"asset_year_init_balance":0,"asset_end_balance":0,"equity_year_init_balance":0,"equity_row":"42"},{"asset_row":"17","equity_row":"43","asset_end_balance":0,"equity_year_init_balance":0,"equity_end_balance":0,"asset_year_init_balance":0,"asset":"长期股权投资","equity":"长期应付款"},{"equity_row":"44","asset_row":"18","asset_end_balance":0,"equity":"递延收益","asset_year_init_balance":0,"equity_end_balance":0,"equity_year_init_balance":0,"asset":"固定资产原价"},{"asset_year_init_balance":0,"asset_end_balance":237.51,"asset":"减：累计折旧","equity_year_init_balance":0,"asset_row":"19","equity":"其他非流动负债","equity_row":"45","equity_end_balance":0},{"asset_end_balance":-237.51,"equity_end_balance":0,"equity":"非流动负债合计","equity_year_init_balance":0,"asset":"固定资产账面价值","asset_row":"20","equity_row":"46","asset_year_init_balance":0},{"equity_year_init_balance":10000,"equity":"负债合计","asset_year_init_balance":0,"asset_end_balance":0,"equity_end_balance":192534.92,"equity_row":"47","asset_row":"21","asset":"在建工程"},{"equity_row":"","equity":"","asset_year_init_balance":0,"asset_row":"22","asset_end_balance":0,"asset":"工程物资","equity_end_balance":0,"equity_year_init_balance":0},{"equity_year_init_balance":0,"asset":"固定资产清理","equity_row":"","asset_year_init_balance":0,"equity_end_balance":0,"asset_row":"23","equity":"","asset_end_balance":0},{"equity_end_balance":0,"asset_row":"24","equity_year_init_balance":0,"asset_year_init_balance":0,"equity_row":"","equity":"所有者权益（或股东权益）：","asset_end_balance":0,"asset":"生产性生物资产"},{"equity":"实收资本（或股本）","asset_row":"25","equity_year_init_balance":0,"equity_end_balance":0,"asset":"无形资产","asset_year_init_balance":0,"asset_end_balance":0,"equity_row":"48"},{"equity":"资本公积","asset":"开发支出","asset_row":"26","equity_row":"49","asset_end_balance":0,"equity_end_balance":0,"asset_year_init_balance":0,"equity_year_init_balance":0},{"asset":"长期待摊费用","asset_end_balance":0,"equity_year_init_balance":0,"equity_end_balance":0,"asset_year_init_balance":0,"equity":"盈余公积","asset_row":"27","equity_row":"50"},{"equity_row":"51","equity_year_init_balance":2003.23,"equity_end_balance":799727.8,"equity":"未分配利润","asset_end_balance":0,"asset":"其他非流动资产","asset_row":"28","asset_year_init_balance":0},{"equity_end_balance":799727.8,"equity_year_init_balance":2003.23,"equity":"所有者权益（或股东权益）合计","asset":"非流动资产合计","asset_end_balance":-237.51,"equity_row":"52","asset_year_init_balance":0,"asset_row":"29"},{"equity_year_init_balance":12003.23,"equity":"负债和所有者权益（或股东权益）总计","asset":"资产总计","equity_end_balance":992262.72,"asset_end_balance":992262.72,"asset_year_init_balance":12003.23,"equity_row":"53","asset_row":"30"}],"extendMap":null,"failureCode":"","mapMsgBean":null,"message":"","msg":"成功","msgCode":1,"statusCode":"200"};

    var url = TERMINAL_URL + '/jsonrest/http/HttpServiceInfo/1/getWorkFlowYongyouReport';
    var obj = loginStatusData();
    if(obj && obj.entity){
    	
        $.post(url,{"companyid":companyId,"reportType":reportType,"period":period},function(re){
        	console.log(re);

        	if(re.msgCode == 1){
        		loadHtml(reportType,period,re);
        	
        	}
        	loadEnd();
        },"json")
       
    }else{
    	loadHtml(reportType,period,data[reportType]);
    	loadEnd();
    }
   
    
    function loadEnd(){
    	 remove_loading(); 
    	 var heigth = $(window).height()-1;
    	    var width = $(window).width()-1;
    	    var $main = $('.service-data-main');
    	    var $bigTitle = $('.service-data-header').slice(0, 1);
    	    var $header = $('.service-data-header').slice(1);
    	    if (heigth > width) {
    	      $('.service-data').css({
    	        "width": heigth,
    	        "height": width,
    	        "top": -width
    	      });
    	      $main.css({
    	        "width": heigth,
    	        "height": width - $header.width()
    	      })
	         $header.css({
		        "width": heigth
		      });
		      $bigTitle.css({
		        "width": heigth
		      });
		      $main.on('touchmove', _.debounce(function () {
		          if ($main.scrollTop() <= 0) {
		            $bigTitle.show();
		          } else {
		            $bigTitle.hide();
		          }
		        },
		        // 这是我们为用户停止输入等待的毫秒数
		        500));
		      $main.on('scroll', _.debounce(function () {
		          if ($main.scrollTop() <= 0) {
		            $bigTitle.show();
		          } else {
		            $bigTitle.hide();
		          }
		        },
		        // 这是我们为用户停止输入等待的毫秒数
		        500));
    	    }
    }
     function loadHtml(reportType,period,re){


		var strHtml = "";

		if(reportType == "income"  || reportType == "cash"){
			var reportName = "现金流量表";
			
			if(reportType == "income"){
				reportName = "利润表";
			}
			
			strHtml += '  <div class="service-data-header"> ';
			strHtml += '   <div class="header-toBack" onclick="history.go(-1);" style="color: #952f2a"><i class="iconfont icon-zuojiantou"></i></div> ';
			strHtml += '    <div class="service-data-bigTitle">'+reportName+'</div> ';
			strHtml += '    <div class="service-data-icon"> ';
			strHtml += '  <a href="/service100gonghost/file/download/report.xls?companyId='+companyId+'&reportType='+reportType+'&period='+period+'" target="_blank"><i class="iconfont icon-xiazai"></i> </a>';
			strHtml += '     <a href="/kfdialog.htm" target="_blank">  <i class="iconfont icon-que"></i></a> ';
			strHtml += '    </div> ';
			strHtml += '	  </div> ';
    		strHtml += '<div class="service-data-header  style2">';
    		strHtml += ' <div class="service-data-title big">';
    		strHtml += '项目';
    		strHtml += '</div>';
    		strHtml += '<div class="service-data-title small">';
    		strHtml += '行次';
    		strHtml += ' </div>';
    		strHtml += ' <div class="service-data-title middle">';
    		strHtml += ' 本年累计金额';
    		strHtml += ' </div>';
    		strHtml += '  <div class="service-data-title middle">';
    		strHtml += '    本月金额';   
    		strHtml += ' </div>';   
    		strHtml += ' </div>';    
    		strHtml += '<div class="service-data-main">';
    		strHtml += '<div class="service-data-table style2">'; 
    		
    	}
		if(reportType == "debt"){
			strHtml += '  <div class="service-data-header"> ';
			strHtml += '   <div class="header-toBack" onclick="history.go(-1);" style="color: #952f2a"><i class="iconfont icon-zuojiantou"></i></div> ';    		
			strHtml += '    <div class="service-data-bigTitle">资产负债表</div> ';
			strHtml += '    <div class="service-data-icon"> ';
		  
			strHtml += '  <a href="/service100gonghost/file/download/report.xls?companyId='+companyId+'&reportType='+reportType+'&period='+period+'" target="_blank"><i class="iconfont icon-xiazai"></i> </a>';
			strHtml += '     <a href="/kfdialog.htm" target="_blank">  <i class="iconfont icon-que"></i></a> ';
			strHtml += '    </div> ';
			strHtml += '	  </div> ';
			strHtml += '<div class="service-data-header  style1">';
    		strHtml += ' <div class="service-data-title big">';
    		strHtml += '资产';
    		strHtml += '</div>';
    		strHtml += '<div class="service-data-title small">';
    		strHtml += '行次';
    		strHtml += ' </div>';
    		strHtml += ' <div class="service-data-title middle">';
    		strHtml += ' 期末余额';
    		strHtml += ' </div>';
    		strHtml += '  <div class="service-data-title middle">';
    		strHtml += '   年初余额';   
    		strHtml += ' </div>';   
    		strHtml += ' <div class="service-data-title big">';
    		strHtml += '负债和所有者权益';
    		strHtml += '</div>';
    		strHtml += '<div class="service-data-title small">';
    		strHtml += '行次';
    		strHtml += ' </div>';
    		strHtml += ' <div class="service-data-title middle">';
    		strHtml += ' 期末余额';
    		strHtml += ' </div>';
    		strHtml += '  <div class="service-data-title middle">';
    		strHtml += '    年初余额';   
    		strHtml += ' </div>';   
    		strHtml += ' </div>';    
    		strHtml += '<div class="service-data-main">';
    		strHtml += '<div class="service-data-table style1">'; 
    	}


//		yyir.asset,yyir.asset_row,yyir.asset_end_balance,yyir.asset_year_init_balance,yyir.equity,yyir.equity_row,yyir.equity_end_balance,yyir.equity_year_init_balance,

    	
		for(var i=0;i<re.entity.length;i++){
			if(reportType == "income"  || reportType == "cash"){
				strHtml += ' <div class="service-data-row ">' ;
    			strHtml += ' <div class="service-data-cell big ">' ;
    			strHtml += re.entity[i].item;
    			strHtml += '  </div>' ;
    			strHtml += ' <div class="service-data-cell small">' ;
    			strHtml += re.entity[i].row;
    			strHtml += '</div>';
    			strHtml += '  <div class="service-data-cell middle">';
    			strHtml += changeColor(re.entity[i].year_cash);
    			strHtml += '     </div>';
    			strHtml += '  		        <div class="service-data-cell middle">';
    			strHtml += changeColor(re.entity[i].month_cash);
    		    strHtml += '</div>';
    		    strHtml += '</div>'; 
			}
			if(reportType == "debt"){
				strHtml += ' <div class="service-data-row ">' ;
    			strHtml += ' <div class="service-data-cell big ">' ;
    			strHtml += re.entity[i].asset;
    			strHtml += '  </div>' ;
    			strHtml += ' <div class="service-data-cell small">' ;
    			strHtml += re.entity[i].asset_row;
    			strHtml += '</div>';
    			strHtml += '  <div class="service-data-cell middle">';
    			strHtml += changeColor(re.entity[i].asset_end_balance);
    			strHtml += '     </div>';
    			strHtml += '  		        <div class="service-data-cell middle">';
    			strHtml += changeColor(re.entity[i].asset_year_init_balance);
    		    strHtml += '</div>';
    			strHtml += ' <div class="service-data-cell big ">' ;
    			strHtml += re.entity[i].equity;
    			strHtml += '  </div>' ;
    			strHtml += ' <div class="service-data-cell small">' ;
    			strHtml += re.entity[i].equity_row;
    			strHtml += '</div>';
    			strHtml += '  <div class="service-data-cell middle">';
    			strHtml += changeColor(re.entity[i].equity_end_balance);
    			strHtml += '     </div>';
    			strHtml += '  		        <div class="service-data-cell middle">';
    			strHtml += changeColor(re.entity[i].equity_year_init_balance);
    		    strHtml += '</div>';
    		    strHtml += '</div>'; 
			}

		        
		}
		
		strHtml += " </div>  </div>"
    
		$(".service-data").html(strHtml);
    }
	
});