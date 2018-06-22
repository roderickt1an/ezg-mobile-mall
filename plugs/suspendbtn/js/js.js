
(function ($){
	var action = false,addState = false;
	var account = [
		{type:"Phone",title:"电话",tip:"",text:true,text_placeholder:"电话号码..."}
	];
	var initialize = {
		theme: "panel_theme_fillet_Blacktheme",
		state: true,
		moveState: true,
		size: "auto",
		position: "right-center",
		tip:{"background-color":"#000","color":"#fff"},
		account: [
			{type:"Phone",tip:"",text:"",url: ""}
		]
	};
	var methods = {
		init: function (method) {
			/*调用悬浮插件*/
			$("body").floating(initialize);
		},
		destroy: function () {
			if($(this).closest("tr").siblings("tr").length == 0){
				$("#panel_account").removeClass("success_list")
			}
			$(this).closest("tr").remove();
			editAccount();
		},
		add: function (type) {
			if(typeof type == 'string'){
				$.each(account,function(index,obj){
					if(obj.type == type){
						addState = true;
						addTr(obj);
					}
				})
			}
		},
		get: function () {
			return initialize;
		}
	};
	$.fn.floatmodel = function (method) {
		if (methods[method]) {
			return methods[method].apply(this,Array.prototype.slice.call(arguments, 1));
		}else if (typeof method === 'object' || !method) {
			initialize =  $.extend(initialize,method);
			return methods.init.apply(this);
		}
	};
})(jQuery);