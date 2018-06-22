var WechatShare = {
		init:function(data){
			var url = encodeURIComponent(location.href.split('#')[0]);
			var type = 0;
			var param=[];
			param.push("url="+url);
				$.ajax({
					url : "/service100gonghost/pay/wechatPay/getJsApiParams",
					type : 'post',// 非必须.默认get
					dataType : 'json',// 非必须.默认text
					data:param.join('&'),
					async : false,// 非必须.默认true
					cache : false,// 非必须.默认false
					timeout : 30000,// 非必须.默认30秒
					success : function(re){
						
						if(re.code == "200"){
							
							wx.config({
							    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
							    appId: re.data.appId, // 必填，公众号的唯一标识
							    timestamp:re.data.timestamp , // 必填，生成签名的时间戳
							    nonceStr:re.data.noncestr, // 必填，生成签名的随机串
							    signature:re.data.sign,// 必填，签名，见附录1
							    jsApiList: ["onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareWeibo","onMenuShareQZone","scanQRCode"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
							});
						}
					}
				// 非必须
				},type);
		
		},
		bindShare:function(data,success,cancel){
			this.bindMenuShareTimeline(data,success,cancel);
			this.bindMenuShareAppMessage(data,success,cancel);
			this.bindMenuShareQQ(data,success,cancel);
			this.bindMenuShareWeibo(data,success,cancel);
			this.bindMenuShareQZone(data,success,cancel);
			
		},
		checkJsApi:function(){
			return "";
		},
		bindMenuShareTimeline:function(data,success,cancel){//分享到朋友圈
			wx.onMenuShareTimeline({//朋友圈分享绑定
			    title: data.title, // 分享标题
			    link: data.link, // 分享链接
			    imgUrl: data.imgUrl, // 分享图标
			    success: function () { 
			      success();
			    },
			    cancel: function () { 
			      cancel();
			    }
			});
		},
		bindMenuShareAppMessage:function(data,success,cancel){
			
			wx.onMenuShareAppMessage({
				 title: data.title, // 分享标题
				 desc: data.desc, // 分享描述
				 link: data.link, // 分享链接
				 imgUrl: data.imgUrl, // 分享图标
			    type: '', // 分享类型,music、video或link，不填默认为link
			    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
			    success: function () { 
			    	  success();
			    },
			    cancel: function () { 
			    	cancel();
			    }
			});
		},
		bindMenuShareQQ:function(data,success,cancel){
			wx.onMenuShareQQ({
				 title: data.title, // 分享标题
				 desc: data.desc, // 分享描述
				 link: data.link, // 分享链接
				 imgUrl: data.imgUrl, // 分享图标
			    success: function () { 
			       success();
			    },
			    cancel: function () { 
			       // 用户取消分享后执行的回调函数
			    	   cancel();
			    }
			});
		},
		bindMenuShareWeibo:function(data,success,cancel){
			wx.onMenuShareWeibo({
				 title: data.title, // 分享标题
				 desc: data.desc, // 分享描述
				 link: data.link, // 分享链接
				 imgUrl: data.imgUrl, // 分享图标
			    success: function () { 
			       // 用户确认分享后执行的回调函数
			    	success();
			    },
			    cancel: function () { 
			        cancel();
			    }
			});
		},
		bindMenuShareQZone:function(data,success,cancel){
			wx.onMenuShareQZone({
				title: data.title, // 分享标题
				 desc: data.desc, // 分享描述
				 link: data.link, // 分享链接
				 imgUrl: data.imgUrl, // 分享图标
			    success: function () { 
			       // 用户确认分享后执行的回调函数
			    	success();
			    },
			    cancel: function () { 
			        // 用户取消分享后执行的回调函数
			    	   cancel();
			    }
			});
		},
		scanQRCode:function(callback){
			wx.scanQRCode({
			    needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
			    scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
			    success: function (res) {
			    var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
			   
				callback(result);
			}
			});
		}
		
		
}