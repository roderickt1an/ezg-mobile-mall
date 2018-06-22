$(function(){
	
	
	  $('body').append('<div id="asideButton"><img src="/images/aside.png" alt=""><a href="tel:400-88-12580"></a><a href="/kfdialog.htm"></a></div>');
			    $('#asideButton').css({
			      'position':'fixed',
			      'right':'0',
			      'top':'60%',
			      'width':'4rem',
			      'height':'8rem'
			    }).find('img').css({
			      'width':'100%',
			      'position':'absolute'
			    }).siblings('a').css({
			      'position':'relative',
			      'z-index':'9999',
			      'display':'block',
			      'height':'50%',
			      'width':'100%'
			    });
})