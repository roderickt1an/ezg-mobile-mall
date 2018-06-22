$(document).ready(function(){
	var isLogin =validLoginStatus();// src="/scripts/common/module.js"
	if(isLogin){//是否已经登陆
		currentPage = getUrlParam("currentPage");
		if(currentPage == ""){
			currentPage = 1;			
		}
		if(isNaN(currentPage)){
			currentPage = 1;
		}
		if(currentPage<=0){
			currentPage = 1;
		}
		showMyRecommendation();

	}else{ 
// 		remove_loading();
		location.href = 'login_usePW.html';
	}
});
//初始化首页
function showMyRecommendation(){
	 $.post("/service100gonghost/jsonrest/information/Generalize/0/findByPhoneNumber",
    				  {},
    			function(re){
    					  console.log(re)
    					  var recommendation = re.entity.resultList; 
    					  if(re.msgCode == 1){
    						  if(recommendation.length<=0){
    								$(".myRecommendation-empty").css("display","");
    								$(".myRecommendation-noEmpty").css("display","none");
    								
    							}else{
    								$(".myRecommendation-empty").css("display","none");
    								$(".myRecommendation-noEmpty").css("display","");
    					 		 }
    						  var recommendationHtml = "";
    						  
    						  for(var i = 0;i<recommendation.length;i++){
//     							  alert(recommendation.length)
    						  	  var recomm = recommendation[i];
//     							  alert(recomm.userName)
    							  
    							  recommendationHtml +='<div class="myRecommendation-item">';
    							  recommendationHtml +='<p class="myRecommendation-item-name" >被推荐人：';
    							  recommendationHtml +='<span>'+recomm.userName+'</span></p>';
    							  recommendationHtml +='<p class="myRecommendation-item-tel" >联系电话：';
    							  recommendationHtml +='<span>'+recomm.userMobile+'</span></p>';
    							  recommendationHtml +='<p class="myRecommendation-item-remark" >备注：';
    							  recommendationHtml +='<span>'+recomm.userMemo+'</span></p>';
    							  recommendationHtml +='</div>';
    						  }
//     						  console.log(recommendationHtml)
    						  $(".myRecommendation-main").html(recommendationHtml);
    					  }else {
    						  $(".myRecommendation-empty").css("display","");
								$(".myRecommendation-noEmpty").css("display","none");
    						}
    						
//     					  alert(re);
    			 
    		  },"json")
};