$(document).ready(function () {
	var productCode = getUrlCode();
	$(".class-left-item").removeClass('active');
	$("#"+productCode).addClass('active');
	
	loadProductsByCode(productCode);
	
	$(".class-left-item").click(function(){
		$(".class-left-item").removeClass('active');
		$("#"+$(this).attr("id")).addClass('active');
		loadProductsByCode($(this).attr("id"));
	});
});
function loadProductsByCode(productCode){
	
	  show_loading('body', '/images/loading.gif',true);
	var url = TERMINAL_URL+"/jsonrest/product/Product/0/loadProductsByCode";
	$.post(url,{"encProductCode":productCode},function(re){
	     remove_loading();
		if(re.msgCode == 1){
			var resultData = re.entity;

			var html = "";

			
			for(var i=0;i<resultData.length;i++){
				
				var productName = resultData[i].product_name;
				var detailValue = resultData[i].detailValue;
				if(productCode == "gszc"){
					if(productName == "内资有限公司注册"){
						
						productName = "内资公司注册";
						
					}else if(productName == "外资有限公司注册"){

						productName = "外资公司注册";
						detailValue = "找e账柜，轻松注册";
					}else if(productName == "香港公司注册" || productName == "内资集团公司注册" ||  productName == "霍尔果斯注册"){
						
					}else{
						continue;
					}
				}
				
				
				html += '<a href="/product/'+resultData[i].productCode+'.html" class="class-right-item">';
				html += '<strong>￥<sapn>'+resultData[i].price+'</sapn></strong>';
				html += ' <div>';
				html += '<p class="class-right-title">'+productName+'</p>';
				html += ' </div>'
				html += '<div>';	
				html += ' <p class="class-right-info">'+detailValue+'</p>';
				html += '    </div>';
				html += ' </a>';
		   
			}
			$(".class-right").html(html);
		}else{
			if("url不正确" == re.msg){
				location.href = "/class/gszc.html";
			}
		}
	},"json")
}