/********************************************************** 以下都是直供机移植过来的函数 *********************************************************/
//图片地址
var UPLOAD_URL = "http://upload.zgcfo.com"
//var STATICS_FILE_URL = "http://localhost.upload";
var STATICS_FILE_URL = "http://upload.zgcfo.com";

var PHOTO_URL = STATICS_FILE_URL;
//var TERMINAL_URL="http://wwwdev.100gong.tk/service100gonghost";//订单流程服务器URL
var TERMINAL_URL="/service100gonghost";
/***************************************************************common说明开始**************************************************/
//所有以下划线"_"开始的函数都是不支持外面调用的
/***************************************************************common说明结束**************************************************/
/***************************************************************common开发配置开始**************************************************/
//主体.顶级域名,方便于跨子域访问
var stUrlReg=/[^\.]*?\.com\.cn|[^\.]*?\.net\.cn|[^\.]*?\.org\.cn|[^\.]*?\.edu\.cn|[^\.]*?\.com|[^\.]*?\.cn|[^\.]*?\.net|[^\.]*?\.org|[^\.]*?\.edu|[^\.]*?\.tk/i;
/*var sBaseAreaName = location.host.toLowerCase().match(stUrlReg)[0];
*/
	/*alert(sBaseAreaName);*/
var COOKIE_LOGIN_NAME ='bG9naW5fcGhvbmVOdW1iZXI';//BASE64.encoder('login_phoneNumber')
var COOKIE_LOGIN_PWD = 'bG9naW5fcGFzc3dvcmQ';//BASE64.encoder('login_password')
//需要单价的产品属性编码
var UNIT_PRICE_PRODUCT_CODE = ['lsb','xgm','ybnsr','gxjyzy','wyzptkjs','wyzzjyskjs'];
var productNavJSON;

var data_index_sellingWell = {
  result: [
    {
      icon:'&#xe600;',
      title:'公司注册',
      info:'全流程可视，价格透明无加价',
      price:'￥698',
//      link:'detail.html?proid=10020102'
     link:'/product/yxgs.html'
    },
    {
      icon:'&#xe618;',
      title:'会计到家',
      info:'一年帮您赚6万',
      price:'￥1800',
//      link:'detail.html'
     link:'/product/wyzptkjs.html'
    },
    {
      icon:'&#xe60b;',
      title:'代理记账',
      info:'专业服务，响应及时',
      price:'￥88',
//      link:'detail.html'
     link:'/product/lsb.html'
    },
    {
      icon:'&#xe605;',
      title:'商标注册',
      info:'专业审核，快速申报，高通过率',
      price:'￥1000',
//      link:'detail.html'
      link:'/product/sbzc.html'
    },
     
     {
      icon:'&#xe617;',
      title:'高新专用代理记账',
      info:'专业科财团队，无需再为辅助账发愁 ',
//      price:'￥88起',
      price:'￥388',
//      link:'detail.html'
      link:'/product/gxjyzy.html'
    }
  ]
};

//首页"最新资讯"的数据
var data_index_information = {
  result: [
    {
      link:'http://mp.weixin.qq.com/s?__biz=MzAxMjMyNjA0Mg==&mid=2655442904&idx=1&sn=1c70a346a664e88ef7f66c087bb473b9&chksm=8001f22db7767b3bbb4a2bbe39e6219e1a33dba0e07bb73ebec31f85efff02012c437dd316b4&mpshare=1&scene=1&srcid=1008IQTsLkv1th2WgmBV74rc#wechat_redirect',
      img:'/images/activityimg/activity001.jpg',
      title:'【e专题】“我是产品汪，你不要爱上我”',
      time:'2016.09.28',
      state:'结束'
    },
    {
      link:'http://mp.weixin.qq.com/s?__biz=MzAxMjMyNjA0Mg==&mid=2655442904&idx=2&sn=5b26432a743b411038e96bfec51259f2&chksm=8001f22db7767b3b034367093a781b8d6f64da2e29b31fd21ae097d713005b89dd80a572f2c5&mpshare=1&scene=1&srcid=1009MaMozQOgy39q73MBxtqr#wechat_redirect',
      img:'/images/activityimg/activity002.jpg',
      title:'【e精彩】我想为你的创业梦出点力',
      time:'2016.09.28',
      state:'结束'
    },
    {
      link:'http://mp.weixin.qq.com/s?__biz=MzAxMjMyNjA0Mg==&mid=2655442851&idx=1&sn=e1f2c530e0c43ae2db9814f349c3949c&chksm=8001f256b7767b40b4b58b374d3211c1ffba89dfaa4f7beedd41df41f8a733c260d2d61e6dfd&mpshare=1&scene=1&srcid=1009jnpyGjXC6xDtNsNZsNBS#wechat_redirect',
      img:'/images/activityimg/activity003.jpg',
      title:'【e专题】聪明的创业者自带烧钱属性',
      time:'2016.09.19',
      state:'结束'
    },
    {
    	link:'http://mp.weixin.qq.com/s?__biz=MzAxMjMyNjA0Mg==&mid=2655442819&idx=1&sn=5704cc0841ae3aac7ff7d90166a110e5&mpshare=1&scene=1&srcid=10088vyVQM1qB3QP5TcCHiLA#wechat_redirect',
        img:'/images/activityimg/activity004.jpg',
        title:'e账柜荣获2016华南金鼎奖最佳创业服务机构',
        time:'2016.09.12',
        state:'结束'
    },
    {
    	link:'http://mp.weixin.qq.com/s?__biz=MzAxMjMyNjA0Mg==&mid=2655442765&idx=1&sn=53d10bd9b88b0b7d75034fd164052e0d&mpshare=1&scene=1&srcid=1009TzMUENubarOXEOCSG5uc#wechat_redirect',
        img:'/images/activityimg/activity005.jpg',
        title:'90分钟教你轻松拿下一个亿',
        time:'2016.09.01',
        state:'结束'
    },
    {
    	link:'http://mp.weixin.qq.com/s?__biz=MzAxMjMyNjA0Mg==&mid=2655442743&idx=1&sn=20a8ee49d5ef7e03619e8fc67754031b&mpshare=1&scene=1&srcid=1009DBaDE3oxxWMQQsnxmGmK#wechat_redirect',
        img:'/images/activityimg/activity006.jpg',
        title:'这回走心，我们谈点钱就好',
        time:'2016.08.29',
        state:'结束'
    },
    {
    	link:'http://mp.weixin.qq.com/s?__biz=MzAxMjMyNjA0Mg==&mid=2655442743&idx=3&sn=d9fc843d2c96fece59ca1f5fe7e58e92&mpshare=1&scene=1&srcid=1008yb7Tc60GoE2gL4EwGmV3#wechat_redirect',
        img:'/images/activityimg/activity007.jpg',
        title:'精彩回顾系列|百度搜不出？这里统统告诉你',
        time:'2016.08.29',
        state:'结束'
    },
    {
    	link:'http://mp.weixin.qq.com/s?__biz=MzAxMjMyNjA0Mg==&mid=2655442695&idx=2&sn=e16695dde614cb46baa475319e2748fa&mpshare=1&scene=1&srcid=1009DmIokrqRHGYRT7qLax90#wechat_redirect',
        img:'/images/activityimg/activity008.jpg',
        title:'精彩回顾系列|配合你创业“前途”的内幕，落幕',
        time:'2016.08.15',
        state:'结束'
    },
    {
    	link:'http://mp.weixin.qq.com/s?__biz=MzAxMjMyNjA0Mg==&mid=2655442670&idx=3&sn=eb0c4c394a4cfd2b01bbc1cb613cd74a&mpshare=1&scene=1&srcid=1009mETgEYiSYDqZD3xW1iDo#wechat_redirect',
        img:'/images/activityimg/activity009.jpg',
        title:'精彩回顾|或不可缺的运营之道，在线等？在座不用等！',
        time:'2016.08.08',
        state:'结束'
    }
  ]
};

//首页"banner图"的数据
var data_index_bannerImg = {
		 result: [
		          {
		            link:'/product/wyzptkjs.html',
		            img:'/images/banner1.jpg'
		          },
		          {
		            link:'/product/yxgs.html',
		            img:'/images/banner2.jpg'
		          },
		          {
		            link:'/product/yxgs.html',
		            img:'/images/banner3.jpg'
		          }
		        ]
};

/**
 * 实例化产品线产品信息
 * @returns {___anonymous_productParamJSON}
 */
 

/**
 * 
 * @param 判断是否需要单价
 * @returns {Boolean}
 */
function isUnitFlag(code){
	
	var unitFlag = false;
	var codeArray = UNIT_PRICE_PRODUCT_CODE;
	for (var i = 0, j = codeArray.length; i < j; i++){
        if (codeArray[i] === code)
        	unitFlag = true;
	}
	return unitFlag;
}


//获取默认的最低价价格
function getDefaulPrice(productParams){
	if(isNull(productParams)){
		return 0;
	}
	var index = 0;
	var minPrice = -1;
	var minUnitPrice = -1;
	var product_code = productParams["product_code"];
	var flag = isUnitFlag(product_code);
	for(var k in productParams["areas"]){
		//属性数组
			for(var j in productParams["areas"][k]["propertys"]){
				if(productParams["areas"][k]["propertys"][j].price_type == 20){
					minPrice =  "面议";
					return minPrice;
				}else{
					if(minPrice != -1){
						if(minPrice > productParams["areas"][k]["propertys"][j].new_price/100){
							minPrice = productParams["areas"][k]["propertys"][j].new_price/100;
						minUnitPrice = productParams["areas"][k]["propertys"][j].unit_price/100;
						}
					}else{
						minPrice = productParams["areas"][k]["propertys"][j].new_price/100;
						minUnitPrice = productParams["areas"][k]["propertys"][j].unit_price/100;
					}
				}									
			}
		
		
	}
	return flag ? minUnitPrice : minPrice;
}

/**
 * 获取productId对应的产品信息
 * @param productId
 * @param flag 是产品id 还是产品code
 * @param status 是否包含已经下架的产品 默认为1不包含
 * @returns
 */
function getProductParaJSON(productId, flag,status){
	var type = 0;
	var obj= {};
	var url = TERMINAL_URL + '/jsonrest/product/Product/1/getProductParaJSON';
	var param=[];
	if (1 == flag){
		param.push('encProductCode='+productId);
	}else{
		flag = 0;
		param.push('encProductId='+productId);
	}
	if(isNull(status)){
		status = 1;
	}
	param.push('encFlag='+flag);
	param.push('status='+status);
	ajax({
		url : url,
		type : 'get',// 非必须.默认get
		dataType : 'json',// 非必须.默认text
		data:param.join('&'),
		async : false,// 非必须.默认true
		cache : false,// 非必须.默认false
		timeout : 30000,// 非必须.默认30秒
		success : function(data){
			if (data.msgCode == 1) {
				obj = data.entity;
			}
			
		}
	// 非必须
	},type);
	
	return obj;
	//var obj = initProductParam();
	//return obj[productId];
}
function getProductParaJSONs(productIds,status){

	var type = 0;
	var obj= {};
	var url = TERMINAL_URL + '/jsonrest/product/Product/1/getProductParaJSONs';
	var param=[];
	if(isNull(status)){
		status = 1;
	}
	param.push('encProductIdStrs='+productIds);
	param.push("status="+status);
	ajax({
		url : url,
		type : 'get',// 非必须.默认get
		dataType : 'json',// 非必须.默认text
		data:param.join('&'),
		async : false,// 非必须.默认true
		cache : false,// 非必须.默认false
		timeout : 30000,// 非必须.默认30秒
		success : function(data){
			if (data.msgCode == 1) {
				obj = data.entity;
			}
			
		}
	// 非必须
	},type);
	
	return obj;
	//var obj = initProductParam();
	//return obj[productId];

}


/**
 * 引入js
 * @param path
 */
function include(_path){ 
	var _a=document.createElement("script");
	_a.type = "text/javascript"; 
	_a.charset ="utf-8";
	_a.src=_path; 
	var _body=document.getElementsByTagName("body")[0];
	_body.appendChild(_a);
}


function include_common(){
	include("/scripts/jquery.min.js");
	include("/scripts/show_loading.min.js");
	include("/scripts/LiteEJS.min.js");
	include("/scripts/common/constants.js");
	include("/scripts/index/index.min.js");
	include("/scripts/common/module.js");
	include("/scripts/nav.min.js");
	include("/scripts/common/jbase64.js");
	include("/scripts/common/bottom.js");
	include("http://cs.ecqun.com/?id=1848303");//ec
	include("http://hm.baidu.com/hm.js?7b942ab103c1a0aec1914c7d89180911");//百度统计
	_cnzz();
	
}

//cnzz站长统计工具
function _cnzz(){
	var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");
	document.write(unescape("%3Cspan style='display:none' id='cnzz_stat_icon_1256422395'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s4.cnzz.com/z_stat.php%3Fid%3D1256422395' type='text/javascript'%3E%3C/script%3E"));
}

/***************************************************************common开发配置结束**************************************************/
/***************************************************************ajax跨域打包开始**************************************************/
function ajax(stAjaxOB)
{	stAjaxOB.url=$.trim(stAjaxOB.url);
	stAjaxOB.waitTagId=$.trim(stAjaxOB.waitTagId);
	if(stAjaxOB.url=='')
	{
		var freeCheck_dialog = new Dialog('#error_dialog');
		 freeCheck_dialog.dialog.find('p').html('url不能为空');
	     freeCheck_dialog.dialog.find('button').text('确定');
	     freeCheck_dialog.Show_dialog();
	     freeCheck_dialog.dialog.find('button').click(function () {
	    	 freeCheck_dialog.Remove_dialog(); 
	     });
		return;
	}
	
	var _loginflag=0;
	//if(isUserLogin())_loginflag=1;
	if(stAjaxOB.url.indexOf('?')==-1)stAjaxOB.url+='?_loginflag='+_loginflag;
	else stAjaxOB.url+='&_loginflag='+_loginflag;
	
	//加载等待图片
	if(typeof(stAjaxOB.waitTagId)!='undefined'&&stAjaxOB.waitTagId!='')
	{	var sTime=(new Date()).getTime();
		var stIDOB=document.getElementById(stAjaxOB.waitTagId);
		if(!stIDOB)stIDOB=document.body;
		var stPosition=getElementPosition(stIDOB);
		//等待图片为32*32的格式，所以要减去16
		var iTop=stPosition.top+stIDOB.offsetHeight/2-16;
		var iLeft=stPosition.left+stIDOB.offsetWidth/2-16;
		var src='/images/module/loadingAnimation.gif';
		var sImg='<img id="WaitImg'+sTime+'" style="border:0;position:';
		if(stIDOB.tagName.toLowerCase()=="body"){
			sImg+="fixed;top:50%;left:50%;margin-left:-16px;margin-top:-16px;";
		}else {
			sImg+='absolute;top:'+iTop+'px;left:'+iLeft+'px;';
		}
		var pathName=window.location.pathname;
		if(pathName=='/'||pathName=='/index.html')src='/images/module/loadingAnimation_body.gif';
		sImg+='_position:absolute;" src="'+src+'"/>';
		stAjaxOB.waitPicId="WaitImg"+sTime;
		$("body").append(sImg);
	}
	if(typeof(stAjaxOB.uploadForm)!='undefined'&&stAjaxOB.uploadForm!=''){
		var uploadForm=document.getElementById($.trim(stAjaxOB.uploadForm));
		if(uploadForm&&uploadForm.nodeName.toLowerCase()=='form'){
			ajaxUploadForm(arguments);
		}
	}else{
		_doAjax($,arguments);
	}
}
//二级函数,不能直接调用
function _doAjax(stJquery,stParam)
{	var stAjaxOB=stParam[0];
	var errorFun=typeof(stAjaxOB.error)!='undefined'?stAjaxOB.error:function(){};
	var successFun=typeof(stAjaxOB.success)!='undefined'?stAjaxOB.success:function(){};
	stJquery.ajax({ 
		url:typeof(stAjaxOB.url)!='undefined'?stAjaxOB.url:'',
		type:typeof(stAjaxOB.type)!='undefined'?stAjaxOB.type:'get',
		data:typeof(stAjaxOB.data)!='undefined'?stAjaxOB.data:'',
		dataType:typeof(stAjaxOB.dataType)!='undefined'?stAjaxOB.dataType:'text',
		async:typeof(stAjaxOB.async)!='undefined'?stAjaxOB.async:true,
		cache:typeof(stAjaxOB.cache)!='undefined'?stAjaxOB.cache:false,
		timeout:typeof(stAjaxOB.timeout)!='undefined'?stAjaxOB.timeout:30000,
		error:function(data){
			stParam[0]=data;
			errorFun.apply(stAjaxOB,stParam);
			if(typeof(stAjaxOB.waitPicId)!='undefined')$("#"+stAjaxOB.waitPicId).remove();
		}, 
		success:function(data)
		{	stParam[0]=data;
			successFun.apply(stAjaxOB,stParam);
			if(typeof(stAjaxOB.waitPicId)!='undefined')$("#"+stAjaxOB.waitPicId).remove();
		}
	})	
}
/****************** form 上传 ***************/
function ajaxUploadForm(stParam){
		var stAjaxOB=stParam[0];
		stAjaxOB.url=$.trim(stAjaxOB.url);
		stAjaxOB.uploadForm=$.trim(stAjaxOB.uploadForm);
		var uploadForm=document.getElementById(stAjaxOB.uploadForm);
		if(stAjaxOB.url==''||stAjaxOB.uploadForm==''||!uploadForm||uploadForm.nodeName.toLowerCase()!='form')return;
		var time=(new Date()).getTime();
		var singleUpload=typeof(stAjaxOB.singleUpload)!='undefined'?stAjaxOB.singleUpload:false;
		var dataType=typeof(stAjaxOB.dataType)!='undefined'?stAjaxOB.dataType:'text';
		var cache=typeof(stAjaxOB.cache)!='undefined'?stAjaxOB.cache:false;
		if(!cache){
			if(stAjaxOB.url.indexOf('?')==-1)stAjaxOB.url+='?_t='+time;
			else stAjaxOB.url+='&_t='+time;
		}
		//单个上传begin
		if(singleUpload){
			if(!uploadForm.uploadList&&!uploadForm.uploadIndex){
				var stFile=[];
				var stTemp=uploadForm.getElementsByTagName('input');
				for(var i=0,iLength=stTemp.length;i<iLength;i++){
					if(stTemp[i].type.toLowerCase()=='file'&&stTemp[i].name!=''&&stTemp[i].value!=''){
						stTemp[i].backName=stTemp[i].name;
						stTemp[i].name='';
						stFile.push(stTemp[i]);
					}
				}
				uploadForm.uploadList=stFile;
				uploadForm.uploadIndex=0;
			}
			var stList=uploadForm.uploadList;
			var iIndex=uploadForm.uploadIndex;
			for(var i=0,iLength=stList.length;i<iLength;i++)stList[i].name='';
			stList[iIndex].name=stList[iIndex].backName;
			//生成等待图标
			var stPosition=getElementPosition(stList[iIndex]);
			//等待图片为32*32的格式，所以要减去16
			var iHeight=stList[iIndex].offsetHeight;
			var iTop=stPosition.top;
			var iLeft=stPosition.left+stList[iIndex].offsetWidth/2-iHeight/2;
			var sImg='<img id="ajaxUploadFormWaitImg'+time+'" style="border:0;position:absolute;top:'+iTop+'px;left:'+iLeft+'px;height:'+iHeight+'px" src="/images/module/loadingAnimation.gif"/>';
			$("body").append(sImg);
		}
		//单个上传end
		uploadForm.target='ajaxUploadForm'+time;
		uploadForm.enctype='multipart/form-data';//IE这样设置无效
		uploadForm.encoding="multipart/form-data";//IE这样设置有效
		uploadForm.method='post';
		uploadForm.action=stAjaxOB.url; 
		//创建iframe  
		var proxy=null;
		try{
			if(isIE())proxy=document.createElement('<iframe name="ajaxUploadForm'+time+'"></iframe>');
		}catch(e){
				
		}
		if(!proxy)proxy=document.createElement("iframe");
		proxy.name='ajaxUploadForm'+time;
		proxy.style.display="none"; 
		proxy.stParam=stParam;
		//IE这样设置box.onload无效
		if(proxy.attachEvent)
		{
			proxy.attachEvent('onload',function(){
				_doAjaxUploadForm(proxy);
			});
		}
		else
		{	
			proxy.onload=function(){
				_doAjaxUploadForm(this);
			}
		}
		$("body").append(proxy);
		uploadForm.submit();
}
function _doAjaxUploadForm(stIframe){
	var sHref=stIframe.contentWindow.location.href.replace(/\s/g,'');
	if(sHref=='about:blank')return;
	var data=_ajaxResponseFilter(stIframe.contentWindow.document.body.innerHTML);
	var stParam=stIframe.stParam;
	var stAjaxOB=stParam[0];
	stParam[0]=data;
	var errorFun=typeof(stAjaxOB.error)!='undefined'?stAjaxOB.error:function(){};
	var successFun=typeof(stAjaxOB.success)!='undefined'?stAjaxOB.success:function(){};
	if(stAjaxOB.dataType=='json'){
		stParam[0]=$.parseJSON(stParam[0]);
		if(stParam[0])successFun.apply(stAjaxOB,stParam);
		else errorFun.apply(stAjaxOB,stParam);
	}else successFun.apply(stAjaxOB,stParam);
	//还原原始参数
	stParam[0]=stAjaxOB;
	//单个上传begin
	stAjaxOB.uploadForm=$.trim(stAjaxOB.uploadForm);
	var uploadForm=document.getElementById(stAjaxOB.uploadForm);
	if(stAjaxOB.url==''||stAjaxOB.uploadForm==''||!uploadForm||uploadForm.nodeName.toLowerCase()!='form')return;
	var singleUpload=typeof(stAjaxOB.singleUpload)!='undefined'?stAjaxOB.singleUpload:false;
	if(singleUpload){
		//删除单个上传的等待图标
		var sTime=uploadForm.target.replace(/ajaxUploadForm/g,'');
		var stUploadImg=document.getElementById('ajaxUploadFormWaitImg'+sTime);
		if(stUploadImg)$(stUploadImg).remove();
		if(uploadForm.uploadIndex>=(uploadForm.uploadList.length-1)){
			for(var i=0,iLength=uploadForm.uploadList.length;i<iLength;i++)uploadForm.uploadList[i].name=uploadForm.uploadList[i].backName;
			uploadForm.uploadList=null;
			uploadForm.uploadIndex=null;
		}else{
			uploadForm.uploadIndex++;
			ajaxUploadForm(stParam);
		}
	}
	//单个上传end
	if(stIframe){
		setTimeout(function(){
			$(stIframe).remove();
		},1000);
	}
	if(typeof(stAjaxOB.waitPicId)!='undefined')$("#"+stAjaxOB.waitPicId).remove();		
}
function _ajaxResponseFilter(sResponse){
	var stResponse=$.trim(sResponse);
	return stResponse;
}
/***************************************************************ajax跨域打包结束**************************************************/
function toPenny(num,len){
	len=len||2;
	if(isNaN(parseFloat(num)))return num;
	else return (num/100).toFixed(len);
}
function toFloat(num,len){
	len=len||2;
	if(isNaN(parseFloat(num)))return num;
	else return (num).toFixed(len);
}
function trim(sStr){
	if(typeof(sStr)!='string')return sStr;
	return sStr.replace(/(^\s*)|(\s*$)/g,"");
}
//替换字符串中的"<",">"为转义字符
function replaceSpecialChar(sStr){
	if(null == sStr){
		return sStr;
	}
	if(typeof(sStr)!='string')return sStr;
	return sStr.replace(/</g,"&#60;").replace(/>/g,"&#62;");
}

var error_dialog;

function initDialog(){
	//错误提示窗口初始化
	error_dialog = new Dialog('#error_dialog', {
	  time: 2000
	});
	error_dialog.setButton({"errorbutton":'确定'});
	$("#errorbutton").click(function(){
		  error_dialog.remove_dialog();
	});

}

String.prototype.startWith=function(str){     
	  var reg=new RegExp("^"+str);     
	  return reg.test(this);        
	}  

String.prototype.endWith=function(str){     
var reg=new RegExp(str+"$");     
return reg.test(this);        
}


