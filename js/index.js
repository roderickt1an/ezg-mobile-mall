

$(document).ready(function () {

	initIndex();
});
//初始化首页
function initIndex(){
	
	//初始化热门推荐
	var url = TERMINAL_URL+"/jsonrest/information/SystemParam/0/getSystemParamByCode"
	$.post(url,{"paramCode":"rmtj"},function(re){
		if(re.msgCode == 1){
		
			var resultData = re.entity;
		
			var  html = '<div class="index-recommend-bigBox clearfix">';
			for(var i=0;i<resultData.length;i++){
				 html+='<a href="'+resultData[i].detailValue+'" class="index-recommend-box" >';
				 html+='<img src="'+resultData[i].detailKey+'" alt="公司注册">'
				 html+='</a>'   
			}
			html += "</div>";
			$(".index-recommend-title").after(html);
		
		}
	},"json");
	
	
};
