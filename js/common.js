!function(t,a){"function"==typeof define&&define.amd?define(a):"object"==typeof exports?module.exports=a():t.eventListener=a()}(this,function(){function t(t){var a=window.location.search,i=new RegExp(t+"=([^&?]*)","ig");return a.match(i)?a.match(i)[0].substr(t.length+1):null}function a(t,a){var i=null;return function(){var s=this,e=arguments;clearTimeout(i),i=setTimeout(function(){t.apply(s,e)},a)}}function i(t){var a=document.createElement("style"),i=document.getElementsByTagName("head")[0];i&&(document.all?(a.setAttribute("type","text/css"),a.styleSheet.cssText=t):a.appendChild(document.createTextNode(t)),i.firstChild?i.insertBefore(a,i.firstChild):i.appendChild(a))}function s(t,a){var i=document.getElementsByTagName("head")[0],s=document.createElement("script");s.type="text/javascript",s.src=t,s.onload=s.onreadystatechange=function(){this.readyState&&"loaded"!==this.readyState&&"complete"!==this.readyState||(a(),s.onload=s.onreadystatechange=null)},i.appendChild(s)}var e={show:function(t,a){if(t){var i=$("#J_tip");0==i.length&&(i=$('<div id="J_tip" class="c-tip none">'),$(document.body).append(i)),window.clearTimeout(e.tipTimeout),i.html(t).css({opacity:0}).removeClass("none"),i.animate({opacity:1},500,"ease-out"),a=a||2e3,e.tipTimeout=window.setTimeout(function(){e.hide()},a)}},hide:function(){var t=$("#J_tip");t.length&&t.animate({opacity:0},500,"ease-out",function(){t.addClass("none")})}},n=function(t){this.data=t,this.walk(t)};n.prototype={walk:function(t){var a,i=this;Object.keys(t).forEach(function(s){a=t[s],"object"==typeof a&&new n(a),i.convert(s,a)})},convert:function(t,a){Object.defineProperty(this.data,t,{configurable:!0,enumarable:!0,get:function(){return console.log("你访问了"+t),a},set:function(i){console.log("你设置了"+t),console.log("新的"+t+"="+i),"object"==typeof i&&new n(i),a=i}})}};var o=$("#tpl-container"),r=function(t){return t?"#"==t.split("")[0]?t:"#"+t:"#fff"},c=function(){for(var t=["","-webkit-","-ms-","-moz-","-o-"],a="",i=0;i<t.length;i++)a+="position:"+t[i]+"sticky;";var s=document.createElement("div"),e=document.body;s.style.cssText="display:none;"+a,e.appendChild(s);var n=/sticky/i.test(window.getComputedStyle(s).position);return e.removeChild(s),s=null,n},l=function(t,a){switch(t){case 1:return new p(a);case 2:return new u(a);case 3:return new m(a);case 4:return new h(a);case 5:return new d(a);case 6:return new v(a);case 7:return new g(a);case 8:return new f(a);case 9:return new b(a)}},d=function(t){this.data=t};d.prototype={initHtml:function(){if(this.data)return'<div class="gegewx-tpl" id="cms-'+this.data.cmsId+'"><img src="'+this.data.oneImage+'" /><div>'+this.data.content+'</div><img src="'+this.data.threeImage+'" /></div>'},create:function(){o.append(this.initHtml()),this.initStyle()},initStyle:function(){$(".gegewx-tpl>div").css({backgroundImage:"url("+this.data.twoImage+")",color:r(this.data.oneColor)})}};var u=function(t){this.data=t};u.prototype={initHtml:function(){var t="";return $.map(this.data.groupProductList,function(a,i){var s="";$.map(a.groupProductDetailList,function(t,i){s+='<div style="width:'+100/a.layoutType+'%" data-src="'+t.url+'" ><img src="'+t.image+'" /></div>'}),t+='<div class="line">'+s+"</div>"}),t='<div class="pic-display-tpl" id="cms-'+this.data.cmsId+'">'+t+"</div>"},create:function(){o.append(this.initHtml()),this.initEvent()},initEvent:function(){$(".pic-display-tpl>.line>div").on("tap",function(){var t=$(this).attr("data-src");t&&("isApp"==t?e.show("仅限APP用户参与"):location.href=t)})}};var p=function(t){this.data=t};p.prototype={creatBroadcastHtml:function(){var t="";return $.map(this.data.adList,function(a,i){t+='<dl data-src="'+a.url+'"><dt>'+a.oneContent+"</dt><dd>"+a.twoContent+"</dd></dl>"}),t+=t},initHtml:function(){var t=['<div class="banner-with-broadcast-tpl" id="cms-'+this.data.cmsId+'">','<div class="broadcast-wrap">','<div class="broadcast">'+this.creatBroadcastHtml()+"</div>","</div>","</div>"].join("");if(this.data)return t},create:function(t){o.append(this.initHtml()),this.initStyle().initEvent(t)},initStyle:function(){return $(".banner-with-broadcast-tpl").css({height:this.data.oneImageHeight/75+"rem","background-image":"url("+this.data.oneImage+")"}),$(".broadcast>dl").css({backgroundColor:"rgba("+this.data.twoColor+","+this.data.oneAlpha+")",color:r(this.data.threeColor),borderColor:r(this.data.oneColor)}),this},initEvent:function(t){var a=$(".broadcast>dl").length,i=100/a,s=0,e=function(){s-=i,Math.abs(s)>50+i&&(s=0),0==s?$(".broadcast").css({transform:"translate3d(0,"+s+"%,0)",transition:"all 0s linear","-webkit-transform":"translate3d(0,"+s+"%,0)","-webkit-transition":"all 0s linear"}):$(".broadcast").css({transform:"translate3d(0,"+s+"%,0)",transition:"all 0.4s linear","-webkit-transform":"translate3d(0,"+s+"%,0)","-webkit-transition":"all 0.4s linear"})};setInterval(e,t||2e3);$(".broadcast>dl").on("tap",function(t){var a=$(this).attr("data-src");a&&(location.href=a)})}};var m=function(t){this.data=t};m.prototype={creatProductHtml:function(){var t="",a=["","","还有机会","即将开始","已抢完"];return productDetail=this.data.productDetail,1==productDetail.isShowTag?$.map(this.data.productList,function(i,s){t+=['<div class="product" data-src="'+i.url+'">','<div class="pr-img" style="background-image:url('+i.image+')">',1==productDetail.isShowImage?'<img src="'+productDetail.tagImage+'" />':"",i.status>1?2==i.status?'<div class="pr-status" style="background-color:rgba(251,77,77,70)">'+a[i.status]+"</div>":'<div class="pr-status">'+a[i.status]+"</div>":"","</div>",'<div class="pr-detail">',"<h2>"+i.name+"</h2>",'<div class="pr-price-style-1">',"<span>","<small>￥"+i.highPrice+"</small>","<label>"+productDetail.tagText+"</label>","</span>","<strong><small>￥</small>"+i.lowPrice+"</strong>","</div>","</div>","</div>"].join("")}):$.map(this.data.productList,function(i,s){t+=['<div class="product" data-src="'+i.url+'">','<div class="pr-img" style="background-image:url('+i.image+')">',1==productDetail.isShowImage?'<img src="'+productDetail.tagImage+'" />':"",i.status>1?2==i.status?'<div class="pr-status" style="background-color:rgba(251,77,77,70)">'+a[i.status]+"</div>":'<div class="pr-status">'+a[i.status]+"</div>":"","</div>",'<div class="pr-detail">',"<h2>"+i.name+"</h2>",'<div class="pr-price-style-2">',"<span>","<small>￥</small>","<strong>"+i.lowPrice+"</strong>","</span>","<small>￥"+i.highPrice+"</small>","</div>","</div>","</div>"].join("")}),t},initHtml:function(){var t=['<div class="product-list-3-tpl" id="cms-'+this.data.cmsId+'">',this.data.oneImage?'<img src="'+this.data.oneImage+'" data-src="'+this.data.productDetail.oneUrl+'" />':"",'<div class="list-wrap">'+this.creatProductHtml()+"</div>",this.data.twoImage?'<img src="'+this.data.twoImage+'" data-src="'+this.data.productDetail.twoUrl+'" />':"","</div>"].join("");if(this.data)return t},create:function(t){o.append(this.initHtml()),this.initStyle().initEvent()},initStyle:function(){var t=this.data.productDetail;return $("#cms-"+this.data.cmsId+" label").css({backgroundColor:r(t.tagBackColor),color:r(t.tagTextColor)}),$("#cms-"+this.data.cmsId+" .pr-detail>h2").css({color:r(t.productNameColor)}),$("#cms-"+this.data.cmsId+" .pr-detail").css({backgroundColor:r(t.productBackColor)}),$("#cms-"+this.data.cmsId+" .list-wrap").css({backgroundColor:r(t.backColor)}),$("#cms-"+this.data.cmsId+" .pr-detail strong").css({color:r(t.productTextColor)}),$("#cms-"+this.data.cmsId+" .pr-detail small").css({color:r(t.priceTextColor)}),this},initEvent:function(t){$(".list-wrap>.product,.product-list-3-tpl>img").on("singleTap",function(t){var a=$(this).attr("data-src");a&&(location.href=a)})}};var h=function(t){this.data=t};h.prototype={initHtml:function(){var t="";$.map(this.data.navigationList,function(a,i){t+=0==i?'<li class="selected" data-id="'+a.cmsId+'"><span>'+a.navigationName+"</span></li>":'<li data-id="'+a.cmsId+'"><span>'+a.navigationName+"</span></li>"});var a=['<div class="nav-bar-scroll-tpl" id="cms-'+this.data.cmsId+'">',"<ul>"+t+"</ul>","</div>"].join("");if(this.data)return a},create:function(t){o.append(this.initHtml()),this.initStyle().initEvent()},initStyle:function(){return $(".nav-bar-scroll-tpl").css({"background-color":r(this.data.oneColor),color:r(this.data.twoColor)}),i(".selected {color:"+r(this.data.threeColor)+"!important}"),c()||$(".nav-bar-scroll-tpl").addClass("position-relative"),this},initEvent:function(t){function i(t){setTimeout(function(){for(var t=o.children(),a=0,i=t.length;a<i;a++){var s=t[a].getAttribute("id").split("-")[1],c=$(t[a]).offset().top;n.push({id:s,offsetTop:c})}for(var l=0,d=r.length;l<d;l++)for(var u=r[l].cmsId,p=0,i=n.length;p<i;p++)u==n[p].id&&e.push({id:n[p].id,offsetTop:n[p].offsetTop})},0),0==p&&(navOffsetY=d.offset().top,++p),c()||(window.scrollY>navOffsetY?d.addClass("position-fixed"):d.removeClass("position-fixed"));for(var a=0,i=e.length;a<i;a++)window.scrollY-e[a].offsetTop+$(".nav-bar-scroll-tpl").height()+3>=0&&(u=e[a].id);var m=$('[data-id="'+u+'"]'),h=m.index();m.length>0&&(s.removeClass("selected"),m.addClass("selected"),0==h?l.scrollToElement(m[0]):l.scrollToElement(m.prev()[0]))}var s=$(".nav-bar-scroll-tpl li"),e=(s.length,[]),n=[],r=this.data.navigationList,l=new IScroll(".nav-bar-scroll-tpl",{bounce:!1,scrollX:!0,scrollY:!1,tap:!0});$(".nav-bar-scroll-tpl li").on("singleTap",function(){s.removeClass("selected"),$(this).addClass("selected"),0==$(this).index()?l.scrollToElement($(this)[0]):l.scrollToElement($(this).prev()[0]);var t=$(this).attr("data-id"),a=document.getElementById("cms-"+t);a&&(targetY=a.offsetTop-$(".nav-bar-scroll-tpl").height(),window.scrollTo(0,targetY))});var d=$(".nav-bar-scroll-tpl"),u=0,p=navOffsetY=0;window.addEventListener("scroll",a(i,100))}};var v=function(t){this.data=t};v.prototype={createNavHtml:function(){var t="";return $.map(this.data.groupProductList,function(a,i){var s="";$.map(a.groupProductDetailList,function(t,i){s+='<div style="width:'+100/a.layoutType+'%" data-src="'+t.url+'" class="one-item"><img src="'+t.image+'" /></div>'}),t+='<div class="line">'+s+"</div>"}),t},initHtml:function(){var t=['<div class="bottom-nav-tpl" id="cms-'+this.data.cmsId+'">','<div class="bottom-nav-bg">','<div class="fixed-btn"><img src="'+this.data.twoImage+'" /></div>','<div class="fixed-bottom-ct">','<img src="'+this.data.oneImage+'" />','<div class="ct-wrap">'+this.createNavHtml()+"</div>",'<div class="down-btn"></div>',"</div>","</div>","</div>"].join("");if(this.data)return t},create:function(t){o.append(this.initHtml()),this.initEvent()},initEvent:function(t){$(".bottom-nav-tpl .fixed-btn").on("tap",function(t){t.stopPropagation(),$(".bottom-nav-bg").css({height:$(".fixed-bottom-ct").height()+"px"}),$(".bottom-nav-tpl").addClass("height-100"),$(this).addClass("display-none")}),$(".bottom-nav-tpl").on("singleTap",function(t){t.stopPropagation(),("down-btn"==t.target.className||t.target.className.indexOf("bottom-nav-tpl")>-1)&&($(".bottom-nav-bg").css({height:0}),$(this).removeClass("height-100"),$(".bottom-nav-tpl .fixed-btn").removeClass("display-none"))}),$(".bottom-nav-tpl .one-item").on("singleTap",function(t){var a=$(this).attr("data-src");a&&(location.href=a)})}};var g=function(t){this.data=t};g.prototype={creatProductHtml:function(){var t="",a=["","","还有机会","即将开始","已抢完"],i=this.data.productDetail;return $.map(this.data.productList,function(s,e){t+=['<div class="product" data-src="'+s.url+'">','<div class="pr-img" style="background-image:url('+s.image+')">',1==i.isShowImage?'<img src="'+i.tagImage+'" />':"",s.status>1?2==s.status?'<div class="pr-status" style="background-color:rgba(251,77,77,70)">'+a[s.status]+"</div>":'<div class="pr-status">'+a[s.status]+"</div>":"","</div>",'<div class="pr-detail">',"<h2>"+s.name+"</h2>",'<div class="pr-price-style-2">',"<span>","<small>￥</small>","<strong>"+s.lowPrice+"</strong>","</span>","<small>￥"+s.highPrice+"</small>","</div>","</div>","</div>"].join("")}),t},initHtml:function(){var t=['<div class="product-list-2-tpl" id="cms-'+this.data.cmsId+'">',this.data.oneImage?'<img src="'+this.data.oneImage+'" data-src="'+this.data.productDetail.oneUrl+'" />':"",'<div class="list-wrap">'+this.creatProductHtml()+"</div>",this.data.twoImage?'<img src="'+this.data.twoImage+'" data-src="'+this.data.productDetail.twoUrl+'" />':"","</div>"].join("");if(this.data)return t},create:function(t){o.append(this.initHtml()),this.initStyle().initEvent()},initStyle:function(){var t=this.data.productDetail;return $("#cms-"+this.data.cmsId+" label").css({backgroundColor:r(t.tagBackColor),color:r(t.tagTextColor)}),$("#cms-"+this.data.cmsId+" .pr-detail>h2").css({color:r(t.productNameColor)}),$("#cms-"+this.data.cmsId+" .pr-detail").css({backgroundColor:r(t.productBackColor)}),$("#cms-"+this.data.cmsId+" .list-wrap").css({backgroundColor:r(t.backColor)}),$("#cms-"+this.data.cmsId+" .pr-detail strong").css({color:r(t.productTextColor)}),$("#cms-"+this.data.cmsId+" .pr-detail small").css({color:r(t.priceTextColor)}),this},initEvent:function(t){$(".list-wrap>.product,.product-list-2-tpl>img").on("singleTap",function(t){var a=$(this).attr("data-src");a&&(location.href=a)})}};var f=function(t){this.data=t};f.prototype={createNavHtml:function(){var t="";return $.map(this.data.carouselDetailList,function(a,i){var s=a.url;s||(s="javascript:;"),t+=['<a href="'+s+'" class="swiper-slide"style="background-image:url('+a.image+')"></a>'].join("")}),t},initHtml:function(){var t=['<div class="swiper-box-tpl swiper-container swiper-'+this.data.cmsId+'" id="cms-'+this.data.cmsId+'">','<section class="swiper-wrapper">'+this.createNavHtml()+"</section>",'<div class="swiper-pagination"></div>',"</div>"].join("");if(this.data)return t},create:function(t){o.append(this.initHtml()),this.initEvent()},initEvent:function(t){new Swiper(".swiper-"+this.data.cmsId,{loop:!0,autoplay:4e3,pagination:".swiper-pagination",autoplayDisableOnInteraction:!1})}};var b=function(t){this.data=t};return b.prototype={createNavHtml:function(){var t="",a=["有货","还有机会","即将开始","已抢完"];return $.map(this.data.productList,function(i,s){if(s<6){var e="";i.status>1&&(e=2==i.status?'<i class="product-tag" style="background-color:rgba(251,77,77,.7)">'+a[i.status-1]+"</i>":'<i class="product-tag">'+a[i.status-1]+"</i>"),t+=['<ul  data-url="'+i.url+'" class="swiper-slide"><li class="product-tu"  style="background-image:url('+i.image+')">'+e+'</li><li class="product-info">'+i.name+'</li><li><span class="product-price">￥'+i.lowPrice+"</span><del>￥"+i.highPrice+"</del></li></ul>"].join("")}}),t},initHtml:function(){var t="";this.data.productList.length>=6&&(t="display:block");var a=this.data.productDetail.oneUrl;a||(a="javascript:;");var i=['<div class="product-scroll-tpl" id="cms-'+this.data.cmsId+'"><a href="'+a+'" style="background-image:url('+this.data.oneImage+')" class="product-scroll-banner"></a>','<div class="product-scroll-list swiper-container  product-scroll'+this.data.cmsId+'"><section class="swiper-wrapper">'+this.createNavHtml()+'<ul data-url="'+this.data.productDetail.oneUrl+'" class="swiper-slide"><li class="product-tu product-all" style="'+t+'"><span>查看全部<br><i>See All</i></span></li></ul></section>',"</div></div>"].join("");if(this.data)return i},create:function(t){o.append(this.initHtml()),this.initEvent()},initEvent:function(t){new Swiper(".product-scroll"+this.data.cmsId,{spaceBetween:20,slidesPerView:3.5});$(".product-scroll-list ul").on("click",function(){var t=$(this).data("url");t&&(window.location.href=t)})}},{factoryInterface:l,Observer:n,queryString:t,createScript:s}});