var productCode;//产品code
var productId;//产品id
var productParam;//产品数据
var areaParam;//地区数据
var areaParamByTigger;//地区插件数据
var isChina;//是否是全国的产品
var defaultAreaId;//当前的地区id
var defaultPropertyId;//当前的属性Id
var flag;//是否需要显示单价
var area2 //地区插件
$(document).ready(
		function() {
			
			initDialog();//初始化dialog
			productCode = getUrlCode();
			 flag = isUnitFlag(productCode);
			 var cartNum = getCartNum();
			$(".floatButton").attr("data-count",cartNum);
			initProduct();
			$("#joinCart").click(function(){
				 addToCart();
			});
			$("#justBuy").click(function(){
				 buy();
			});
			//$("body").css("display","");
			
});
function getLocationAddress(data){
	
	
	//getLocationAddressc(data);
};
function getLocationAddressc(data){
	console.log(data);
	if(!isNull(data)){
		if(data.addressComponents){
			var city = data.addressComponents.city;
			var district = data.addressComponents.district;
			var province = data.addressComponents.province;
			var addressObj = {};
			addressObj.city = city;
			addressObj.district = district;
			addressObj.province =province;
			var address = getDefaultAddress(addressObj);
			$('#chooseArea').val(address.name);
			$('#chooseAreaValue').val(address.id);
			
		}
	}

};
function buildAreaTiggerParam(){
	var pAddress= areaParam["86"];
	
	pAddress = objKeySort(pAddress);

	var LAreaData = [];
	for(var i in pAddress){
		for(var j in pAddress[i]){//所有的省
			var pId = pAddress[i][j].code;
			var pName = pAddress[i][j].address;
			var pArray = {}
			pArray.id = pId;
			pArray.name = pName;
			pArray.child = [];
		
			for(var k in areaParam[pId]){
				var cId =  k;
				var cName = areaParam[pId][k];
				var cArray = {};
				cArray.id = cId;
				cArray.name = cName;
				cArray.child = [];
				for(var a in areaParam[cId]){
					var dId = a;
					var dName = areaParam[cId][a];
					var dArray = {};
					dArray.id = dId;
					dArray.name = dName;
					cArray.child.push(dArray);
				}
				pArray.child.push(cArray);
			}
			LAreaData.push(pArray);
		
		}
	}
	areaParamByTigger = LAreaData;

}
//初始化地区详情
function initProductArea(){
	var url = TERMINAL_URL + '/jsonrest/product/Product/1/getAreaByProductCode';
	
	$.post(url,{"encProductCode":productCode},function(re){
		if(re.msgCode ==1 ){
		
			areaParam = re.entity;
			//获取默认地区
			
			var address = getDefaultAddress();
			$("#chooseArea").val(address.name);
			$("#chooseAreaValue").val(address.id);
		
			buildAreaTiggerParam();
			console.log(areaParamByTigger);
			//初始化地区插件
			 var area2 = new LArea();
			 
			    area2.init({
			      'trigger': '#chooseArea',
			      'valueTo': '#chooseAreaValue',
			      'keys': {
			        id: 'id',
			        name: 'name'
			      },
			      'type': 1,
			      'data': areaParamByTigger
			    });
			   area2.value =[address.index,0,0];
			  //初始化属性
			    initProductProperty(productParam);
			    
			  //初始化价格
			    updatePrice(true);
			  //初始化价格
			/*document.getElementById("chooseAreaValue").oninput=function(){
				
			}*/$('#chooseArea').unbind();
			    $('#chooseArea').bind('input propertychange', function() {  
			    	areaOnChange();
				});
		
			
			  
		}else{
			error_dialog.setText(re.msg);
			error_dialog.show_dialog();
			
		}
		
	},"json");
};
//初始化产品详情
function initProduct(){

	var url = TERMINAL_URL + '/jsonrest/product/Product/1/getProductParaJSONByCode';
	$.post(url,{"encProductCode":productCode},
		function(re){
		if(re.msgCode == 1){
			var resultData = re.entity;
			productParam = resultData;
			productId = productParam.product_id;
			


			$(".productDetail-title>p").first().html(productParam.product_name);
			isChina = checkAddressIsChina();
	
			if(!isChina){
				
				//初始化地区
				initProductArea();
			}else{
			 
				 //初始化属性
			    initProductProperty(productParam);
			    
			  //初始化价格
			    updatePrice(true);
				$(".productDetail-option>p:last").css("display","none");
				$(".productDetail-option-chooseArea").css("display","none");
			
			}
			loadProductDetail();
	
		}else{
			$("body").css("display","");
			remove_loading();
			if("url地址错误" == re.msg){
				location.href = "/class/gszc.html";
			}else{
				alert(re.msg);
			}			
		}
	},"json");
	
}
function arrayContainObj(array, str){
	var i = array.length;
	while(i--){
		if (array[i].area_id == str){
			return true;
		}
	}
	
	return false;
}
/**
 * 判断地区是否为全区中国
 * **/
function checkAddressIsChina(){
	var areas = productParam["areas"];
	for(var i in areas){
		if(areas[i].area_name == "中国"){
			defaultAreaId = i;
			return true;
		}
	}
	return false;
}



function loadProductDetail(){
	var url = TERMINAL_URL + '/jsonrest/product/Product/1/findProductDetail';

	$.ajax({
		url : url,
		type : 'post',// 非必须.默认get
		dataType : 'json',// 非必须.默认text
		data:{"encProductId":productId},
		async : true,// 非必须.默认true
		cache : false,// 非必须.默认false
		timeout : 30000,// 非必须.默认30秒
		success : function(data){
		
			if(data.msgCode == 1){
				var productDetails = data.entity[productId];
				if(isNull(productDetails)){
					$("body").css("display","");
					remove_loading();
					return;
				}
				var productDetailHtml = "<p>服务介绍</p>";
				for(var i=0;i<productDetails.length;i++){
					
					if(productDetails[i].product_detail_type == 1){//	服务问题(1),
						
						productDetailHtml += '<div class="productDetail-detail-box">';
						productDetailHtml += '<p>'+productDetails[i].product_detail_key+'</p>';
						productDetailHtml += '<p>'+productDetails[i].product_detail_value+'</p>';
						productDetailHtml　+= ' </div>';
						
					
				   
					}
					
					if(productDetails[i].product_detail_type == 7){//	
						if(!isNull(productDetails[i].product_detail_value)){
							var url = productDetails[i].product_detail_value+"";
							if(!url.startWith("http")){
								url = "http://www.zgcfo.com"+url;
							}
								
							
							$(".productDetail-banner>img").attr("src",url);

						}
					}
					
			}
			$(".productDetail-detail").html(productDetailHtml);
		}else{
			
		}
			$("body").css("display","");
			remove_loading();
	}	
	// 非必须
	});
}




//属性初始化
function initProductProperty(){
	 if (!isChina){
			var ids = $("#chooseAreaValue").val();
			var idArray = ids.split(",");
			defaultAreaId  = idArray[idArray.length-1];
		}
	 buildPropertyHtml(true);
	
}

function buildPropertyHtml(isFirst){
	
	 var propertys = productParam["areas"][defaultAreaId]["propertys"];
	 var propertyHtml = "";
	 var index = 0;
	 for(var i in propertys){
		 
		 if(index == 0){
			 if(flag&&isFirst){
				 propertyHtml += '<button id="'+propertys[i].property_id+'" type="button">'+propertys[i].property_name+'</button>';
			 }else{
				 propertyHtml += '<button id="'+propertys[i].property_id+'" type="button"  class= "active">'+propertys[i].property_name+'</button>';
			 }
			 defaultPropertyId = propertys[i].property_id;
		 }else{
			 propertyHtml += '<button id="'+propertys[i].property_id+'" type="button">'+propertys[i].property_name+'</button>';
		 }
		 index++;
	 }
	 $(".productDetail-option-buttonList").html(propertyHtml);
	  $('.productDetail-option-buttonList>button').each(function () {
	      $(this).click(function () {
	        $(this).addClass('active').siblings().removeClass('active');
	        	propertyOnClick($(this));
	      })
	    })
}
function propertyOnClick(button){//属性被点击了
	var defalutPropertyId = button.attr("id");
	updatePrice();
}

function areaOnChange(){//地区发生改变
	//改变地区属性ID
	var ids = $("#chooseAreaValue").val();
	var idArray = ids.split(",");
	defaultAreaId  = idArray[idArray.length-1];
	buildPropertyHtml();
	updatePrice();
}





//改变价格
function updatePrice(isFirst){
	
	isFirst = isFirst | false;

	defalutPropertyId = $(".productDetail-option-buttonList").find("button[class='active']").attr("id");
	if (!defalutPropertyId){
		defalutPropertyId = $(".productDetail-option-buttonList").find("button:eq(0)").attr("id");
	}
	var _new_p = productParam["propertys"][defalutPropertyId]["areas"][defaultAreaId].new_price/100;
	var _old_p = productParam["propertys"][defalutPropertyId]["areas"][defaultAreaId].old_price/100;
	var _unit_p = productParam["propertys"][defalutPropertyId]["areas"][defaultAreaId].unit_price/100;
	
	var price = _new_p;
	var _old_price = _old_p;
	var unit_price = _unit_p;
	var priceType = productParam["propertys"][defalutPropertyId]["areas"][defaultAreaId].price_type;
	
	
	if(priceType == "20" || price == 0){
		
		if(priceType == "20" ){
			price = '面议';
		}
		
	
		$(".productDetail-footer>div:eq(0)").css("display","none");
		$(".productDetail-footer>div:eq(1)").css("display","none");
		$(".productDetail-footer>div:eq(2)").css("display","none");
		$(".productDetail-footer>div:eq(3)").css("display","");
	}else{
		
		$(".productDetail-footer>div:eq(0)").css("display","");
		$(".productDetail-footer>div:eq(1)").css("display","");
		$(".productDetail-footer>div:eq(2)").css("display","");
		$(".productDetail-footer>div:eq(3)").css("display","none");
		/*$(".productDetail-footer>div:eq(0)").css("display","");
		$(".productDetail-footer>div:eq(1)").css("display","");
		$(".productDetail-footer>div:eq(2)").css("display","none");
		$(".top-button").css("display","");
		$("#ec_div").css("display","none");*/
		
		
	}
	$("#areaPropertyId").val(productParam["propertys"][defalutPropertyId]["areas"][defaultAreaId].area_property_id);
	
	 
	//面议
	if (priceType == "20" || price == 0){
		
		$('#discount_price').hide();
		$(".productDetail-title-price").html('<span>￥<strong>'+price+'</strong></span>');
	}else{
		
		if(flag){
			//页面载入
			if (isFirst){
	
				$(".productDetail-title-price").html('<span>￥<strong>'+unit_price+'</strong></span><i >/月</i>');		
				$("#joinCart").attr("disabled",true)
				$("#justBuy").attr("disabled",true);
			//非第一次页面载入
			}else{
				$("#joinCart").attr("disabled",false)
				$("#justBuy").attr("disabled",false);
				
				if (_new_p != _old_p ){
					$(".productDetail-title-price").html('<span>￥<strong>'+price+'</strong></span><i style="text-decoration: line-through;">原价:'+_old_price+'</i>');
					
				}else{
				
					if(unit_price == "88"){
							$(".productDetail-title-price").html('<span>￥<strong>'+price+'</strong></span><i>首年单价:'+unit_price+'/月</i>');
					}else{
							$(".productDetail-title-price").html('<span>￥<strong>'+price+'</strong></span><i>单价:'+unit_price+'/月</i>');
					}
				
					
				}
			}
		}else{
			$(".productDetail-title-price").html('<span>￥<strong>'+price+'</strong></span>');

		}

	}

}






//购物车
function addToCart(){
	$.ajax({
		url:  TERMINAL_URL + '/jsonrest/order/Cart/0/createCart',
		type: 'post',
		contentType: "application/x-www-form-urlencoded; charset=utf-8",
		dataType: 'json',
		data:{"areaPropertyId":$("#areaPropertyId").val(),"productNum":1},
		error:function(data){},
		success:function(data){
			 
			if(data.msgCode == 1){
				
				error_dialog.setText(data.msg);
				error_dialog.show_dialog();
			}
			var cartNum = getCartNum();
			$(".floatButton").attr("data-count",cartNum);
		}
	});

}
//立即购买
function buy(){
	$.ajax({
		url:  TERMINAL_URL + '/jsonrest/order/Cart/0/createCart',
		type: 'post',
		contentType: "application/x-www-form-urlencoded; charset=utf-8",
		dataType: 'json',
		data:{"areaPropertyId":$("#areaPropertyId").val(),"productNum":1},
		error:function(data){				
		
			
		},
		success:function(data){
			if(data.msgCode == 1){
					location.href = "/cart.html"
			}else{
				alert(data.msg);
			}
		}
	});
}
function objKeySort(obj) {//排序的函数
    var newkey = Object.keys(obj).sort();
　　//先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
    var newObj = {};//创建一个新的对象，用于存放排好序的键值对
    for (var i = 0; i < newkey.length; i++) {//遍历newkey数组
        newObj[newkey[i]] = obj[newkey[i]];//向新创建的对象中按照排好的顺序依次增加键值对
    }
    return newObj;//返回排好序的新对象
}

function getDefaultAddress(addressObj){
	
	var returnObj = {};
	var productAddress = areaParam;
	var allPAddress = productAddress[86];
	
	allPAddress = objKeySort(allPAddress);
	var pAddressCode = "";
	var pAddressStr = "";  
	var cAddressStr = "";
	var cAddressCode = "";
	var dAddressStr = "";
	var ids = "";
	var cityName ;
	var provinceName;
	var district ;
	
	if(addressObj){
		cityName = 	addressObj.city ;
		provinceName =	addressObj.province;
		district = addressObj.district;
	}

	if(isNull(pAddressCode)){
		var k = 0;
		var kk = 0;
		for(var i in allPAddress){
				
				var l = 0;
			for (var j in allPAddress[i] ){
			
				if(k == 0 && l ==0){
					ids += pAddressCode+",";
					console.log(allPAddress[i][j]);
					pAddressStr = allPAddress[i][j].address;
					pAddressCode = allPAddress[i][j].code;
					returnObj.index = kk;
				}else{
					if(allPAddress[i][0].address == provinceName){
						ids += pAddressCode+",";
						pAddressStr = allPAddress[i][j].address;
						pAddressCode = allPAddress[i][j].code;
					}
				}
				l++;
			}
			k++;
		}
		
		var c = false;
		for(var i in allPAddress){
			
			var l = 0;
		for (var j in allPAddress[i] ){
			
			if(allPAddress[i][j].address == '广东'){
				 c = true;
				
			}
			if(c && l ==0){
				ids += pAddressCode+",";
				pAddressStr = allPAddress[i][j].address;
				pAddressCode = allPAddress[i][j].code;
				returnObj.index = kk;
			}else{
				if(allPAddress[i][0].address == provinceName){
					ids += pAddressCode+",";
					pAddressStr = allPAddress[i][j].address;
					pAddressCode = allPAddress[i][j].code;
				}
			}
			c = false;
			l++;
			kk++;
		}
		
	}
	}
	
	var l = 0;
	for(var i in productAddress[pAddressCode]){
		if( l ==0 ){
			
			cAddressCode = i ;
			ids += cAddressCode+",";
			cAddressStr = productAddress[pAddressCode][i];
		}else{
			if( productAddress[pAddressCode][i] == cityName){
				cAddressCode = i ;
				ids += cAddressCode+",";
				cAddressStr = productAddress[pAddressCode][i];
			}
		}
		l++;
	}
	
	var z = 0;
	
	for(var i in productAddress[cAddressCode]){
		if( z ==0 ){
			
			ids += i;
			defaultAreaId = i;
			
			dAddressStr = productAddress[cAddressCode][i];
		}else{
			if(productAddress[cAddressCode][i] == district){
				ids += i;
				defaultAreaId = i;
				
				dAddressStr = productAddress[cAddressCode][i]
			}
		}
		z++;
		

	}
	
	var name = pAddressStr+","+cAddressStr+","+dAddressStr;
	returnObj.id = ids;
	returnObj.name = name;
	return returnObj;
}


