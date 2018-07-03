/* jQuery Easing */
jQuery.easing.jswing=jQuery.easing.swing;

jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(e,a,c,b,d){return jQuery.easing[jQuery.easing.def](e,a,c,b,d)},easeInQuad:function(e,a,c,b,d){return b*(a/=d)*a+c},easeOutQuad:function(e,a,c,b,d){return-b*(a/=d)*(a-2)+c},easeInOutQuad:function(e,a,c,b,d){if((a/=d/2)<1)return b/2*a*a+c;return-b/2*(--a*(a-2)-1)+c},easeInCubic:function(e,a,c,b,d){return b*(a/=d)*a*a+c},easeOutCubic:function(e,a,c,b,d){return b*((a=a/d-1)*a*a+1)+c},easeInOutCubic:function(e,a,c,b,d){if((a/=d/2)<1)return b/

2*a*a*a+c;return b/2*((a-=2)*a*a+2)+c},easeInQuart:function(e,a,c,b,d){return b*(a/=d)*a*a*a+c},easeOutQuart:function(e,a,c,b,d){return-b*((a=a/d-1)*a*a*a-1)+c},easeInOutQuart:function(e,a,c,b,d){if((a/=d/2)<1)return b/2*a*a*a*a+c;return-b/2*((a-=2)*a*a*a-2)+c},easeInQuint:function(e,a,c,b,d){return b*(a/=d)*a*a*a*a+c},easeOutQuint:function(e,a,c,b,d){return b*((a=a/d-1)*a*a*a*a+1)+c},easeInOutQuint:function(e,a,c,b,d){if((a/=d/2)<1)return b/2*a*a*a*a*a+c;return b/2*((a-=2)*a*a*a*a+2)+c},easeInSine:function(e,

a,c,b,d){return-b*Math.cos(a/d*(Math.PI/2))+b+c},easeOutSine:function(e,a,c,b,d){return b*Math.sin(a/d*(Math.PI/2))+c},easeInOutSine:function(e,a,c,b,d){return-b/2*(Math.cos(Math.PI*a/d)-1)+c},easeInExpo:function(e,a,c,b,d){return a==0?c:b*Math.pow(2,10*(a/d-1))+c},easeOutExpo:function(e,a,c,b,d){return a==d?c+b:b*(-Math.pow(2,-10*a/d)+1)+c},easeInOutExpo:function(e,a,c,b,d){if(a==0)return c;if(a==d)return c+b;if((a/=d/2)<1)return b/2*Math.pow(2,10*(a-1))+c;return b/2*(-Math.pow(2,-10*--a)+2)+c},

easeInCirc:function(e,a,c,b,d){return-b*(Math.sqrt(1-(a/=d)*a)-1)+c},easeOutCirc:function(e,a,c,b,d){return b*Math.sqrt(1-(a=a/d-1)*a)+c},easeInOutCirc:function(e,a,c,b,d){if((a/=d/2)<1)return-b/2*(Math.sqrt(1-a*a)-1)+c;return b/2*(Math.sqrt(1-(a-=2)*a)+1)+c},easeInElastic:function(e,a,c,b,d){e=1.70158;var f=0,g=b;if(a==0)return c;if((a/=d)==1)return c+b;f||(f=d*0.3);if(g<Math.abs(b)){g=b;e=f/4}else e=f/(2*Math.PI)*Math.asin(b/g);return-(g*Math.pow(2,10*(a-=1))*Math.sin((a*d-e)*2*Math.PI/f))+c},easeOutElastic:function(e,

a,c,b,d){e=1.70158;var f=0,g=b;if(a==0)return c;if((a/=d)==1)return c+b;f||(f=d*0.3);if(g<Math.abs(b)){g=b;e=f/4}else e=f/(2*Math.PI)*Math.asin(b/g);return g*Math.pow(2,-10*a)*Math.sin((a*d-e)*2*Math.PI/f)+b+c},easeInOutElastic:function(e,a,c,b,d){e=1.70158;var f=0,g=b;if(a==0)return c;if((a/=d/2)==2)return c+b;f||(f=d*0.3*1.5);if(g<Math.abs(b)){g=b;e=f/4}else e=f/(2*Math.PI)*Math.asin(b/g);if(a<1)return-0.5*g*Math.pow(2,10*(a-=1))*Math.sin((a*d-e)*2*Math.PI/f)+c;return g*Math.pow(2,-10*(a-=1))*Math.sin((a*

d-e)*2*Math.PI/f)*0.5+b+c},easeInBack:function(e,a,c,b,d,f){if(f==undefined)f=1.70158;return b*(a/=d)*a*((f+1)*a-f)+c},easeOutBack:function(e,a,c,b,d,f){if(f==undefined)f=1.70158;return b*((a=a/d-1)*a*((f+1)*a+f)+1)+c},easeInOutBack:function(e,a,c,b,d,f){if(f==undefined)f=1.70158;if((a/=d/2)<1)return b/2*a*a*(((f*=1.525)+1)*a-f)+c;return b/2*((a-=2)*a*(((f*=1.525)+1)*a+f)+2)+c},easeInBounce:function(e,a,c,b,d){return b-jQuery.easing.easeOutBounce(e,d-a,0,b,d)+c},easeOutBounce:function(e,a,c,b,d){return(a/=

d)<1/2.75?b*7.5625*a*a+c:a<2/2.75?b*(7.5625*(a-=1.5/2.75)*a+0.75)+c:a<2.5/2.75?b*(7.5625*(a-=2.25/2.75)*a+0.9375)+c:b*(7.5625*(a-=2.625/2.75)*a+0.984375)+c},easeInOutBounce:function(e,a,c,b,d){if(a<d/2)return jQuery.easing.easeInBounce(e,a*2,0,b,d)*0.5+c;return jQuery.easing.easeOutBounce(e,a*2-d,0,b,d)*0.5+b*0.5+c}});

// Generated by CoffeeScript 1.4.0
/*
jQuery Waypoints - v2.0.2
Copyright (c) 2011-2013 Caleb Troughton
Dual licensed under the MIT license and GPL license.
https://github.com/imakewebthings/jquery-waypoints/blob/master/licenses.txt
*/
(function(){var t=[].indexOf||function(t){for(var e=0,n=this.length;e<n;e++){if(e in this&&this[e]===t)return e}return-1},e=[].slice;(function(t,e){if(typeof define==="function"&&define.amd){return define("waypoints",["jquery"],function(n){return e(n,t)})}else{return e(t.jQuery,t)}})(this,function(n,r){var i,o,l,s,f,u,a,c,h,d,p,y,v,w,g,m;i=n(r);c=t.call(r,"ontouchstart")>=0;s={horizontal:{},vertical:{}};f=1;a={};u="waypoints-context-id";p="resize.waypoints";y="scroll.waypoints";v=1;w="waypoints-waypoint-ids";g="waypoint";m="waypoints";o=function(){function t(t){var e=this;this.$element=t;this.element=t[0];this.didResize=false;this.didScroll=false;this.id="context"+f++;this.oldScroll={x:t.scrollLeft(),y:t.scrollTop()};this.waypoints={horizontal:{},vertical:{}};t.data(u,this.id);a[this.id]=this;t.bind(y,function(){var t;if(!(e.didScroll||c)){e.didScroll=true;t=function(){e.doScroll();return e.didScroll=false};return r.setTimeout(t,n[m].settings.scrollThrottle)}});t.bind(p,function(){var t;if(!e.didResize){e.didResize=true;t=function(){n[m]("refresh");return e.didResize=false};return r.setTimeout(t,n[m].settings.resizeThrottle)}})}t.prototype.doScroll=function(){var t,e=this;t={horizontal:{newScroll:this.$element.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.$element.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};if(c&&(!t.vertical.oldScroll||!t.vertical.newScroll)){n[m]("refresh")}n.each(t,function(t,r){var i,o,l;l=[];o=r.newScroll>r.oldScroll;i=o?r.forward:r.backward;n.each(e.waypoints[t],function(t,e){var n,i;if(r.oldScroll<(n=e.offset)&&n<=r.newScroll){return l.push(e)}else if(r.newScroll<(i=e.offset)&&i<=r.oldScroll){return l.push(e)}});l.sort(function(t,e){return t.offset-e.offset});if(!o){l.reverse()}return n.each(l,function(t,e){if(e.options.continuous||t===l.length-1){return e.trigger([i])}})});return this.oldScroll={x:t.horizontal.newScroll,y:t.vertical.newScroll}};t.prototype.refresh=function(){var t,e,r,i=this;r=n.isWindow(this.element);e=this.$element.offset();this.doScroll();t={horizontal:{contextOffset:r?0:e.left,contextScroll:r?0:this.oldScroll.x,contextDimension:this.$element.width(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:r?0:e.top,contextScroll:r?0:this.oldScroll.y,contextDimension:r?n[m]("viewportHeight"):this.$element.height(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}};return n.each(t,function(t,e){return n.each(i.waypoints[t],function(t,r){var i,o,l,s,f;i=r.options.offset;l=r.offset;o=n.isWindow(r.element)?0:r.$element.offset()[e.offsetProp];if(n.isFunction(i)){i=i.apply(r.element)}else if(typeof i==="string"){i=parseFloat(i);if(r.options.offset.indexOf("%")>-1){i=Math.ceil(e.contextDimension*i/100)}}r.offset=o-e.contextOffset+e.contextScroll-i;if(r.options.onlyOnScroll&&l!=null||!r.enabled){return}if(l!==null&&l<(s=e.oldScroll)&&s<=r.offset){return r.trigger([e.backward])}else if(l!==null&&l>(f=e.oldScroll)&&f>=r.offset){return r.trigger([e.forward])}else if(l===null&&e.oldScroll>=r.offset){return r.trigger([e.forward])}})})};t.prototype.checkEmpty=function(){if(n.isEmptyObject(this.waypoints.horizontal)&&n.isEmptyObject(this.waypoints.vertical)){this.$element.unbind([p,y].join(" "));return delete a[this.id]}};return t}();l=function(){function t(t,e,r){var i,o;r=n.extend({},n.fn[g].defaults,r);if(r.offset==="bottom-in-view"){r.offset=function(){var t;t=n[m]("viewportHeight");if(!n.isWindow(e.element)){t=e.$element.height()}return t-n(this).outerHeight()}}this.$element=t;this.element=t[0];this.axis=r.horizontal?"horizontal":"vertical";this.callback=r.handler;this.context=e;this.enabled=r.enabled;this.id="waypoints"+v++;this.offset=null;this.options=r;e.waypoints[this.axis][this.id]=this;s[this.axis][this.id]=this;i=(o=t.data(w))!=null?o:[];i.push(this.id);t.data(w,i)}t.prototype.trigger=function(t){if(!this.enabled){return}if(this.callback!=null){this.callback.apply(this.element,t)}if(this.options.triggerOnce){return this.destroy()}};t.prototype.disable=function(){return this.enabled=false};t.prototype.enable=function(){this.context.refresh();return this.enabled=true};t.prototype.destroy=function(){delete s[this.axis][this.id];delete this.context.waypoints[this.axis][this.id];return this.context.checkEmpty()};t.getWaypointsByElement=function(t){var e,r;r=n(t).data(w);if(!r){return[]}e=n.extend({},s.horizontal,s.vertical);return n.map(r,function(t){return e[t]})};return t}();d={init:function(t,e){var r;if(e==null){e={}}if((r=e.handler)==null){e.handler=t}this.each(function(){var t,r,i,s;t=n(this);i=(s=e.context)!=null?s:n.fn[g].defaults.context;if(!n.isWindow(i)){i=t.closest(i)}i=n(i);r=a[i.data(u)];if(!r){r=new o(i)}return new l(t,r,e)});n[m]("refresh");return this},disable:function(){return d._invoke(this,"disable")},enable:function(){return d._invoke(this,"enable")},destroy:function(){return d._invoke(this,"destroy")},prev:function(t,e){return d._traverse.call(this,t,e,function(t,e,n){if(e>0){return t.push(n[e-1])}})},next:function(t,e){return d._traverse.call(this,t,e,function(t,e,n){if(e<n.length-1){return t.push(n[e+1])}})},_traverse:function(t,e,i){var o,l;if(t==null){t="vertical"}if(e==null){e=r}l=h.aggregate(e);o=[];this.each(function(){var e;e=n.inArray(this,l[t]);return i(o,e,l[t])});return this.pushStack(o)},_invoke:function(t,e){t.each(function(){var t;t=l.getWaypointsByElement(this);return n.each(t,function(t,n){n[e]();return true})});return this}};n.fn[g]=function(){var t,r;r=arguments[0],t=2<=arguments.length?e.call(arguments,1):[];if(d[r]){return d[r].apply(this,t)}else if(n.isFunction(r)){return d.init.apply(this,arguments)}else if(n.isPlainObject(r)){return d.init.apply(this,[null,r])}else if(!r){return n.error("jQuery Waypoints needs a callback function or handler option.")}else{return n.error("The "+r+" method does not exist in jQuery Waypoints.")}};n.fn[g].defaults={context:r,continuous:true,enabled:true,horizontal:false,offset:0,triggerOnce:false};h={refresh:function(){return n.each(a,function(t,e){return e.refresh()})},viewportHeight:function(){var t;return(t=r.innerHeight)!=null?t:i.height()},aggregate:function(t){var e,r,i;e=s;if(t){e=(i=a[n(t).data(u)])!=null?i.waypoints:void 0}if(!e){return[]}r={horizontal:[],vertical:[]};n.each(r,function(t,i){n.each(e[t],function(t,e){return i.push(e)});i.sort(function(t,e){return t.offset-e.offset});r[t]=n.map(i,function(t){return t.element});return r[t]=n.unique(r[t])});return r},above:function(t){if(t==null){t=r}return h._filter(t,"vertical",function(t,e){return e.offset<=t.oldScroll.y})},below:function(t){if(t==null){t=r}return h._filter(t,"vertical",function(t,e){return e.offset>t.oldScroll.y})},left:function(t){if(t==null){t=r}return h._filter(t,"horizontal",function(t,e){return e.offset<=t.oldScroll.x})},right:function(t){if(t==null){t=r}return h._filter(t,"horizontal",function(t,e){return e.offset>t.oldScroll.x})},enable:function(){return h._invoke("enable")},disable:function(){return h._invoke("disable")},destroy:function(){return h._invoke("destroy")},extendFn:function(t,e){return d[t]=e},_invoke:function(t){var e;e=n.extend({},s.vertical,s.horizontal);return n.each(e,function(e,n){n[t]();return true})},_filter:function(t,e,r){var i,o;i=a[n(t).data(u)];if(!i){return[]}o=[];n.each(i.waypoints[e],function(t,e){if(r(i,e)){return o.push(e)}});o.sort(function(t,e){return t.offset-e.offset});return n.map(o,function(t){return t.element})}};n[m]=function(){var t,n;n=arguments[0],t=2<=arguments.length?e.call(arguments,1):[];if(h[n]){return h[n].apply(null,t)}else{return h.aggregate.call(null,n)}};n[m].settings={resizeThrottle:100,scrollThrottle:30};return i.load(function(){return n[m]("refresh")})})}).call(this);


/* Newsletter */
$('.contact_form_wrap .contact_form').each( function(){
	var form = $(this);
	//form.validate();
	form.submit(function(e) {
		if (!e.isDefaultPrevented()) {
			jQuery.post(this.action,{
				'email':$('input[name="cf_email"]').val(),
			},function(data){
				form.fadeOut('fast', function() {
					$(this).siblings('p').show();
				});
			});
			e.preventDefault();
		}
	});
});	

/* template functions */
$(document).ready(function(){
	
	// smaller screens
	main_functions_call();
	function main_functions_call(container){
		if(typeof container === 'undefined'){
			container = 'body';
		}
		
		// adding mobile class on smaller screens
		$(container).is_smallerScreen();
		// responsive navigation
		$(container).wt_responsive_nav();	
	}
})

jQuery(window).load(function(){	
});

/* Adding Mobile Class
================================================== */
(function($) {
	$.fn.is_smallerScreen = function() {
		var win               = $(window),
			container         = $('html'),
			isResponsiveMode  = container.hasClass('cssanimations'),	
			check_screen      = function() {
				
				if( win.width() < 1000 && isResponsiveMode ){
					container.addClass('is_smallScreen');
				} else {
					container.removeClass('is_smallScreen');
				}
			};

			win.on("smartresize", check_screen);
			check_screen();
	};
})(jQuery);

		
/* Responsive Navigation
================================================== */
(function($) {
	$.fn.wt_responsive_nav = function() {
		var win = $(window), header = $('#header');

		if(!header.length) {
			return;
		}

		var menu              = header.find('#nav:eq(0)'),
			first_level_items = menu.find('>li').length,
			switchWidth = 768;

		if(first_level_items > 8) {
			switchWidth = 959;
		}
		// if there is no menu selected
		if(header.is('.drop_down_nav')) {
			menu.mobileMenu({
				switchWidth: switchWidth,
				topOptionText: $('#nav').data('select-name'), // first option text
				indentString: 'ontouchstart' in document.documentElement ? '- ' : "&nbsp;&nbsp;&nbsp;"  // string for indenting nested items
			});
		} else {
			var container       = $('#container'),
				responsive_nav_wrap	= $('<div id="wt_responsive_nav_wrap"></div>').prependTo(container),
				show_menu		= $('<a id="responsive_nav_open" href="#" class=""><i class="fa fa-list-ul"></i></a>'),
				hide_menu		= $('<a id="responsive_nav_hide" href="#" class=""><i class="fa fa-times"></i></a>'),
				responsive_nav  = menu.clone().attr({id:"wt-responsive-nav", "class":""}),
				menu_item       = responsive_nav.find('a'),    
				one_page_item   = menu_item.attr('href').match("^#") ? true : false,
				menu_added      = false;
								
				responsive_nav.find('ul').removeAttr("style");
				responsive_nav.find('.notMobile').remove();
				
				// hiding all sub-menus		
				/*	
				responsive_nav.find('li').each(function(){
					var el = $(this);
					if(el.find('> ul').length > 0) {
						 el.find('> a').append('<i class="fontawesome-icon wt_icon-angle-down"></i>');
					}
				});

				responsive_nav.find('li:has(">ul") > a').click(function(){
					var el = $(this),
						icon = el.find('.fontawesome-icon'),
						el_parent = el.parent().find('> ul'),
						screen_h  = win.height();
					
					var el_parent_height = el_parent.css({position:'relative'}).outerHeight(true),
						container_height = container.outerHeight(true),
						new_height = container_height + el_parent_height,
						new_height_1 = container_height - el_parent_height;
						
					el.toggleClass('active');
					el_parent.stop(true,true).slideToggle();
					
					if ( el.hasClass('active') ) {
						icon.removeClass('wt_icon-angle-down').addClass('wt_icon-angle-up');
						if(new_height < screen_h) new_height = screen_h;
							container.css({'height':new_height});
					} else {
						icon.removeClass('wt_icon-angle-up').addClass('wt_icon-angle-down');
						if(new_height_1 < screen_h) new_height_1 = screen_h;
							container.css({'height':new_height_1});
						
					}
					
					return false;
				});
				*/
				// end hiding all sub-menus	
				
				show_menu.click(function() {
					// console.log(container)
					if(container.is('.show_responsive_nav')) {
						container.removeClass('show_responsive_nav');
						container.css({'height':"auto"});
						
						// console.log($('body'))
						// console.log('1111')
					} else {
						// console.log('1111')
					$('body').css({'overflow': "hidden"})
						container.addClass('show_responsive_nav');
						set_height();
					}
					return false;
				});
				
				// start responsive one page navigation	
				if (one_page_item) {			
					menu_item.click(function(e) {
						
						if(container.is('.show_responsive_nav')) {			
							console.log('1111')			
							container.removeClass('show_responsive_nav');
							container.css({'height':"auto"});
								var full_url = this.href;
								var parts = full_url.split("#");
								var trgt = parts[1];
								var target_offset = $("#"+trgt).offset();
								var target_top = target_offset.top;
								$('html,body').animate({scrollTop:target_top -70}, 1000);
								return false;
							e.preventDefault();
						}
					});
				}
				// end responsive one page navigation
				
				hide_menu.click(function() {
					// console.log('1111')
					$('body').css({'overflow': "visible"})
					container.removeClass('show_responsive_nav');
					container.css({'height':"auto"});
					return false;
				});

				var set_visibility = function() {
					if(win.width() > switchWidth) {
						header.removeClass('small_device_active');
						container.removeClass('show_responsive_nav');
						container.css({'height':"auto"});
					} else {
						header.addClass('small_device_active');
						if(!menu_added) {
							var before_menu = header.find('#nav');
							show_menu.insertBefore(before_menu);
							responsive_nav.prependTo(responsive_nav_wrap);
							hide_menu.prependTo(container);
							menu_added = true;
						}

						if(container.is('.show_responsive_nav')) {
							set_height();
						}
					}
				},

				set_height = function() {
					var height = responsive_nav.css({position:'relative'}).outerHeight(true),
						win_h  = win.height();

					if(height < win_h) {
						height = win_h;
					}
					responsive_nav.css({position:'absolute'});
					container.css({'height':height});
				};

				win.on("smartresize", set_visibility);
				set_visibility();
		}	
	};
})(jQuery);

/* One Page Navigation
================================================== */
(function($){
	$(document).ready(function() {	
		/* This code is executed after the DOM has been completely loaded */
			
		$("#nav li a").click(function(e){

			var full_url = this.href;
			var parts = full_url.split("#");
			var trgt = parts[1];
			var target_offset = $("#"+trgt).offset();
			var target_top = target_offset.top;
			
			$('html,body').animate({scrollTop:target_top -75}, 1000);
				return false;
			
		});
				
	});
})(jQuery);
// 语言切换
	$(document).ready(function(){
		var language = window.location.href.split('=')[1]
		if(language == 'zh'){
			$('#i18n')[0].innerText = 'English'
		}else{
			$('#i18n')[0].innerText = '中文'
		}
		$('#i18n').click(function(){
			if(language == "zh"){
				window.location.href = 'index?clang=en'
			}else{
				window.location.href = 'index?clang=zh'
			}
		})
	})