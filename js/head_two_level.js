document.write('<header class="header"><div id="header-toBack" class="header-toBack" onclick="headerToBack()"><i class="iconfont icon-zuojiantou"></i></div><span class="header-title" id="header-title">代金券</span><div class="header-mean" onclick="this.className=&quot;header-mean&quot;==this.className?&quot;header-mean open&quot;:&quot;header-mean&quot;"><i class="iconfont icon-caidan"></i><ul class="header-mean-list"><li class="item"><a href="/"><i class="iconfont icon-shouye"></i> <span class="text">首页</span></a></li><li class="item"><a href="/class.html"><i class="iconfont icon-fenlei"></i> <span class="text">产品列表</span></a></li><li class="item"><a href="/service.html"><i class="iconfont icon-fuwu"></i> <span class="text">我的服务</span></a></li><li class="item"><a href="/center.html"><i class="iconfont icon-gerenzhongxin"></i> <span class="text">个人中心</span></a></li><li class="item"><a href="/cart.html"><i class="iconfont icon-gouwuche"></i> <span class="text">购物车</span></a></li><li class="item"><a href="/login_usePW.html"><i class="iconfont icon-denglu"></i> <span class="text">登录</span></a></li><li class="item"><a href="/register.html"><i class="iconfont icon-zhuce"></i> <span class="text">注册</span></a></li></ul></div></header>');

window.onload=function(){

	  var obj = loginStatusData();
	    var isLogin = false;
		if (obj && obj.msgCode == 1){
			$(".header-mean-list>li:eq(5)").hide();
			$(".header-mean-list>li:eq(6)").hide();
	    }

}

