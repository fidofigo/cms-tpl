(function(root, factory){
	if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.eventListener = factory();
    }
}(this, function(){
    var toast = {
        show : function(str,timeout){
            if(!str){
                return;
            }
            var $tipEl = $('#J_tip');
            if($tipEl.length == 0){
                $tipEl = $('<div id="J_tip" class="c-tip none">');
                $(document.body).append($tipEl);
            }
            window.clearTimeout(toast.tipTimeout);
            $tipEl.html(str).css({'opacity' : 0}).removeClass('none');
            $tipEl.animate({opacity : 1},500,'ease-out');
            timeout = timeout || 2000;
            toast.tipTimeout = window.setTimeout(function(){
                toast.hide();
            },timeout);
        },
        hide : function(){
            var $tipEl = $('#J_tip');
            if($tipEl.length){
                $tipEl.animate({opacity : 0},500,'ease-out',function(){
                    $tipEl.addClass('none');
                });
            }
        }
    }
    function queryString(val){
        var uri = window.location.search;
        var re = new RegExp("" + val + "=([^&?]*)", "ig");
        return ((uri.match(re)) ? (uri.match(re)[0]
            .substr(val.length + 1)) : null);
    }
    function throttle(fn, delay){
        var timer = null;
        return function(){
            var context = this, args = arguments;
            clearTimeout(timer);
            timer = setTimeout(function(){
                fn.apply(context, args);
            }, delay);
        };
    };
    function registerCss(cssText){
        var style = document.createElement("style");
        var head = document.getElementsByTagName("head")[0];
        if(!head){
            return;
        };
        if(document.all){
            style.setAttribute("type","text/css");
            style.styleSheet.cssText=cssText;
        }else{
            style.appendChild(document.createTextNode(cssText));
        };
        if(head.firstChild){
            head.insertBefore(style,head.firstChild);
        }else{
            head.appendChild(style);
        };
    };
    function createScript(src,callback){
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = src;
        script.onload = script.onreadystatechange = function() {
            if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete" ) {
                callback();
                script.onload = script.onreadystatechange = null;
            }
        };
        head.appendChild(script);
    }
    var Observer = function(data){
        this.data = data;
        this.walk(data)
    }
    Observer.prototype = {
        walk: function(obj){
            var _this = this,
                val;
            Object.keys(obj).forEach(function(key){
                val = obj[key]
                if (typeof(val) == 'object') {
                    new Observer(val)
                }
                _this.convert(key,val)
            })
        },
        convert: function(key,val){
            Object.defineProperty(this.data,key,{
                configurable: true,
                enumarable: true,
                get: function(){
                    console.log('你访问了'+key)
                    return val
                },
                set: function(newVal){
                    console.log('你设置了'+key)
                    console.log('新的'+key+'='+newVal)
                    if (typeof(newVal) == 'object') {
                        new Observer(newVal)
                    }
                    val = newVal
                }
            })
        }
    }

    var rootDom = $('#tpl-container')
    var colorTrans = function(str){
        if (!str) {
            return '#fff'
        }
        if(str.split('')[0] == '#'){
            return str
        }
        return '#'+str
    }
    // 判断是否支持sticky属性
    var isSupportSticky = function() {
        var prefixTestList = ['', '-webkit-', '-ms-', '-moz-', '-o-'];
        var stickyText = '';
        for (var i = 0; i < prefixTestList.length; i++ ) {
            stickyText += 'position:' + prefixTestList[i] + 'sticky;';
        }
        // 创建一个dom来检查
        var div = document.createElement('div');
        var body = document.body;
        div.style.cssText = 'display:none;' + stickyText;
        body.appendChild(div);
        var isSupport = /sticky/i.test(window.getComputedStyle(div).position);
        body.removeChild(div);
        div = null;
        return isSupport;
    }
    var factoryInterface = function(type,data){
        switch(type){
            case 1:
                return new PicDisplayTpl(data)
                break;
            case 2:
                return new ProductList3Tpl(data)
                break;
            case 3:
                return new NavBarScrollTpl(data)
                break;
            case 4:
                return new SwiperTpl(data)
                break;
            case 5:
                return new productScrollTpl(data)
                break;
            case 6:
                return new ProductList2Tpl(data)
                break;
        }
    }   
    var GegeWxTpl = function(data){
        this.data = data   //data结构见下
        // {
        //     "type": 5,
        //     "cmsId": 5,
        //     "sequence": 50,
        //     "oneImage": "http://yangege.b0.upaiyun.com/2e521a8d0b655.png",
        //     "twoImage": "http://yangege.b0.upaiyun.com/1d448775f9846.png",
        //     "threeImage": "http://yangege.b0.upaiyun.com/11e62566fd50d.png",
        //     "oneImageHeight": 60,
        //     "twoImageHeight": 246,
        //     "threeImageHeight": 280,
        //     "oneColor": "#ffffff",
        //     "content": "123435"
        // }
    }  
    GegeWxTpl.prototype = {
        initHtml: function(){
            if (this.data) {
                return '<div class="gegewx-tpl" id="cms-'+ this.data.cmsId +'"><img src="'+this.data.oneImage+'" /><div>'+ this.data.content +'</div><img src="'+this.data.threeImage+'" /></div>'
            }
        },
        create: function(){
            rootDom.append(this.initHtml())
            this.initStyle()
        },
        initStyle: function(){
            $('.gegewx-tpl>div').css({
                'backgroundImage': 'url('+this.data.twoImage+')',
                'color': colorTrans(this.data.oneColor)
            })
        }
    } 

    var PicDisplayTpl = function(data){
        this.data = data
        // {
        //     "type": 2,
        //     "cmsId": 2,
        //     "sequence": 20,
        //     "groupProductList": [{
        //         "layoutType": 1,
        //         "groupProductDetailList": [{
        //             "image": "http://yangege.b0.upaiyun.com/2e521a7fbb639.jpg",
        //             "url": "http://m.gegejia.com/ygg/special/groupSceneWeb/1036",
        //             "width": 750,
        //             "height": 192
        //         }]
        //     }, {
        //         "layoutType": 2,
        //         "groupProductDetailList": [{
        //             "image": "http://yangege.b0.upaiyun.com/22f3b871f164a.jpg",
        //             "url": "http://m.gegejia.com/ygg/special/groupSceneWeb/1036",
        //             "width": 348,
        //             "height": 348
        //         }, {
        //             "image": "http://yangege.b0.upaiyun.com/22f3b87270cbc.jpg",
        //             "url": "http://m.gegejia.com/ygg/special/groupSceneWeb/1036",
        //             "width": 384,
        //             "height": 384
        //         }]
        //     }, {
        //         "layoutType": 2,
        //         "groupProductDetailList": [{
        //             "image": "http://yangege.b0.upaiyun.com/22f3b871f164a.jpg",
        //             "url": "http://m.gegejia.com/ygg/special/groupSceneWeb/1036",
        //             "width": 348,
        //             "height": 348
        //         }, {
        //             "image": "http://yangege.b0.upaiyun.com/22f3b87270cbc.jpg",
        //             "url": "http://m.gegejia.com/ygg/special/groupSceneWeb/1036",
        //             "width": 384,
        //             "height": 384
        //         }]
        //     }, {
        //         "layoutType": 3,
        //         "groupProductDetailList": [{
        //             "image": "http://yangege.b0.upaiyun.com/22f3b874c0d0b.jpg",
        //             "url": "http://m.gegejia.com/ygg/special/groupSceneWeb/1036",
        //             "width": 226,
        //             "height": 226
        //         }, {
        //             "image": "http://yangege.b0.upaiyun.com/2e521a8370aa8.jpg",
        //             "url": "http://m.gegejia.com/ygg/special/groupSceneWeb/1036",
        //             "width": 226,
        //             "height": 226
        //         }, {
        //             "image": "http://yangege.b0.upaiyun.com/34014b8b61ad5.jpg",
        //             "url": "http://m.gegejia.com/ygg/special/groupSceneWeb/1036",
        //             "width": 226,
        //             "height": 226
        //         }]
        //     }, {
        //         "layoutType": 4,
        //         "groupProductDetailList": [{
        //             "image": "http://yangege.b0.upaiyun.com/34014b8c2b9a7.png",
        //             "url": "http://m.gegejia.com/ygg/special/groupSceneWeb/1036",
        //             "width": 170,
        //             "height": 170
        //         }, {
        //             "image": "http://yangege.b0.upaiyun.com/11e6255ebd3d9.png",
        //             "url": "http://m.gegejia.com/ygg/special/groupSceneWeb/1036",
        //             "width": 170,
        //             "height": 170
        //         }, {
        //             "image": "http://yangege.b0.upaiyun.com/34014b8ce4ae6.png",
        //             "url": "http://m.gegejia.com/ygg/special/groupSceneWeb/1036",
        //             "width": 170,
        //             "height": 170
        //         }, {
        //             "image": "http://yangege.b0.upaiyun.com/1795566700b46.png",
        //             "url": "http://m.gegejia.com/ygg/special/groupSceneWeb/1036",
        //             "width": 170,
        //             "height": 170
        //         }]
        //     }]
        // }
    }
    PicDisplayTpl.prototype = {
        initHtml: function(){
            var html=''
            $.map(this.data.groupProductList,function(item,index){
                var divHtml=''
                $.map(item.groupProductDetailList,function(data,i){
                    divHtml+='<div style="width:'+ 100/item.layoutType +'%" data-src="'+ data.url +'" ><img src="'+ data.image +'" /></div>'
                })
                html+='<div class="line">'+divHtml+'</div>'
            })
            html='<div class="pic-display-tpl" id="cms-'+ this.data.cmsId +'">'+html+'</div>'
            return html
        },
        create: function(){
            rootDom.append(this.initHtml())
            this.initEvent()
        },
        initEvent: function(){
            $('.pic-display-tpl>.line>div').on('tap',function(){
                var _src = $(this).attr('data-src')
                if (_src) {
                    location.href = _src
                }
            })
        }
    }
    var BannerWithBroadcastTpl = function(data){
        this.data = data
        // {
        //     "type": 1,
        //     "cmsId": 1,
        //     "sequence": 10,
        //     "oneImage": "http://yangege.b0.upaiyun.com/d8923af1d65.jpg",
        //     "oneImageHeight": 880,
        //     "oneColor": "#ff5014",
        //     "twoColor": "#ff7343",
        //     "threeColor": "#ffffff",
        //     "oneAlpha": "0",
        //     "adList": [{
        //         "oneContent": "沫沫沫",
        //         "twoContent": "咚咚咚",
        //         "url": "http://m.gegejia.com/ygg/special/groupSceneWeb/1036"
        //     }, {
        //         "oneContent": "的的的",
        //         "twoContent": "空空空",
        //         "url": "http://m.gegejia.com/ygg/special/groupSceneWeb/1036"
        //     }, {
        //         "oneContent": "呵呵呵",
        //         "twoContent": "哒哒哒",
        //         "url": "http://m.gegejia.com/ygg/special/groupSceneWeb/1036"
        //     }, {
        //         "oneContent": "哈哈哈",
        //         "twoContent": "嘿嘿嘿",
        //         "url": "http://m.gegejia.com/ygg/special/groupSceneWeb/1036"
        //     }, {
        //         "oneContent": "满300-20",
        //         "twoContent": "哈哈哈",
        //         "url": "http://m.gegejia.com/ygg/special/groupSceneWeb/1036"
        //     }]
        // }
    }
    BannerWithBroadcastTpl.prototype = {
        creatBroadcastHtml: function(){
            var html = ''
            $.map(this.data.adList,function(item,index){
                html+='<dl data-src="'+ item.url +'"><dt>'+item.oneContent+'</dt><dd>'+item.twoContent+'</dd></dl>'
            })
            html+=html
            return html
        },
        initHtml: function(){
            var html = [
                '<div class="banner-with-broadcast-tpl" id="cms-'+ this.data.cmsId +'">',
                    '<div class="broadcast-wrap">',
                        '<div class="broadcast">'+ this.creatBroadcastHtml() +'</div>',
                    '</div>',
                '</div>'
            ].join('')

            if (this.data) {
                return html
            }
        },
        create: function(time){
            rootDom.append(this.initHtml())
            this.initStyle().initEvent(time)
        },
        initStyle: function(){
            $('.banner-with-broadcast-tpl').css({
                'height': this.data.oneImageHeight/75+'rem',
                'background-image': 'url('+ this.data.oneImage +')'
            })
            $('.broadcast>dl').css({
                // 'backgroundColor': colorTrans(this.data.twoColor),
                'backgroundColor': 'rgba('+this.data.twoColor+','+ this.data.oneAlpha +')',
                'color': colorTrans(this.data.threeColor),
                'borderColor': colorTrans(this.data.oneColor)
                //'opacity': this.data.oneAlpha || 1
            })
            return this
        },
        initEvent: function(time){
            var length = $('.broadcast>dl').length,
                v = 100/length, //定义每次滚动的距离
                overPot = 50,
                Y = 0;
            var fn = function(){
                Y -= v
                if (Math.abs(Y)>overPot+v) {
                    Y = 0
                    //clearInterval(timer)
                }
                if (Y == 0) {
                    $('.broadcast').css({
                        'transform': 'translate3d(0,'+ Y +'%,0)',
                        'transition': 'all 0s linear',
                        '-webkit-transform': 'translate3d(0,'+ Y +'%,0)',
                        '-webkit-transition': 'all 0s linear'
                    })
                    //var timer = setInterval(fn,time || 2000)
                }else{
                    $('.broadcast').css({
                        'transform': 'translate3d(0,'+ Y +'%,0)',
                        'transition': 'all 0.4s linear',
                        '-webkit-transform': 'translate3d(0,'+ Y +'%,0)',
                        '-webkit-transition': 'all 0.4s linear'
                    })
                }
            }
            var timer = setInterval(fn,time || 2000)
            $('.broadcast>dl').on('tap',function(index){
                var url = $(this).attr('data-src')
                if (url) {
                    location.href = url
                }
            })
        }
    }

    var ProductList3Tpl = function(data){
        this.data = data
        // {
        //     "type": 3,
        //     "cmsId": 3,
        //     "sequence": 30,
        //     "oneImage": "http://yangege.b0.upaiyun.com/34014b8e1db7b.jpg",
        //     "twoImage": "http://yangege.b0.upaiyun.com/2e521a86a0796.jpg",
        //     "oneImageHeight": 114,
        //     "twoImageHeight": 114,
        //     "oneColor": "",
        //     "productList": [{
        //         "status": 4,
        //         "highPrice": 85.0,
        //         "url": "https://test.gegejia.com/item-55434.htm",
        //         "name": "【白巧克力味】【12枚入】日本进口北海道白色恋人夹心饼干132g/盒",
        //         "image": "http://yangege.b0.upaiyun.com/22f0302b60e79.jpg!v1product",
        //         "lowPrice": 69.0
        //     }, {
        //         "status": 4,
        //         "highPrice": 130.0,
        //         "url": "https://test.gegejia.com/item-55433.htm",
        //         "name": "【巧克力味】【18枚装】日本进口北海道白色恋人夹心饼干198g/盒",
        //         "image": "http://yangege.b0.upaiyun.com/22f0396bd4524.jpg!v1product",
        //         "lowPrice": 102.0
        //     }, {
        //         "status": 4,
        //         "highPrice": 130.0,
        //         "url": "https://test.gegejia.com/item-55432.htm",
        //         "name": "【白巧克力味】【18枚装】日本进口北海道白色恋人夹心饼干198g/盒",
        //         "image": "http://yangege.b0.upaiyun.com/22f0397130c55.jpg!v1product",
        //         "lowPrice": 102.0
        //     }],
        //     "productDetail": {
        //         "oneUrl": "http://m.gegejia.com/ygg/special/groupSceneWeb/1036",
        //         "twoUrl": "http://m.gegejia.com/ygg/special/groupSceneWeb/1036",
        //         "tagImage": "http://yangege.b0.upaiyun.com/1d448772edc0c.png",
        //         "isShowImage": "1",
        //         "isShowTag": "1",
        //         "tagBackColor": "#ffffff",
        //         "tagTextColor": "#528660",
        //         "productBackColor": "#528660",
        //         "productTextColor": "#ffffff",
        //         "productNameColor": "#ffffff",
        //         "priceTextColor": "#ffffff",
        //         "backColor": "#abd6b8",
        //         "tagText": "双12特惠"
        //     }
        // }
    }
    ProductList3Tpl.prototype = {
        creatProductHtml: function(){
            var html = '',
                $.map(this.data.productList,function(item,index){
                    html+= [
                        '<div class="product" data-src="'+ item.url +'">',
                            '<div class="pr-img" style="background-image:url('+ item.image +')">',
                            '</div>',
                            '<div class="pr-detail">',
                                '<h2>'+ item.name +'</h2>',
                            '</div>',
                        '</div>'
                    ].join('')
                })
            // if (this.data.productList.length == 3) {
            //     html+='<div class="justify_fix">&nbsp;</div>'
            // }         
            return html
        },
        initHtml: function(){
            var html = [
                '<div class="product-list-3-tpl" id="cms-'+ this.data.cmsId +'">',
                    this.data.oneImage?'<img src="'+ this.data.oneImage +'" data-src="'+ this.data.oneUrl +'" />':'',
                    '<div class="list-wrap">'+ this.creatProductHtml() +'</div>',
                    this.data.twoImage?'<img src="'+ this.data.twoImage +'" data-src="'+ this.data.twoUrl +'" />':'',
                '</div>'
            ].join('')

            if (this.data) {
                return html
            }
        },
        create: function(time){
            rootDom.append(this.initHtml())
            this.initEvent()
        },
        initEvent: function(time){
            $('.list-wrap>.product,.product-list-3-tpl>img').on('singleTap',function(index){
                var url = $(this).attr('data-src')
                if (url) {
                    location.href = url
                }
            })
        }
    }

    var NavBarScrollTpl = function(data){
        this.data = data
        // {
        //     "type": 4,
        //     "cmsId": 4,
        //     "sequence": 40,
        //     "oneColor": "#ffffff",
        //     "twoColor": "#2e2e2e",
        //     "threeColor": "#fd3a3e ",
        //     "navigationList": [{
        //         "navigationName": "底部",
        //         "cmsId": 6
        //     }, {
        //         "navigationName": "微信",
        //         "cmsId": 5
        //     }, {
        //         "navigationName": "商品",
        //         "cmsId": 3
        //     }, {
        //         "navigationName": "组合",
        //         "cmsId": 2
        //     }, {
        //         "navigationName": "banner",
        //         "cmsId": 1
        //     }]
        // }

    }
    NavBarScrollTpl.prototype = {
        initHtml: function(){
            var liListHtml=''
            $.map(this.data.navigationList,function(item,index){
                if (index == 0) {
                    liListHtml+='<li class="selected" data-id="'+ item.cmsId +'"><span>'+ item.navigationName +'</span></li>'
                }else{
                    liListHtml+='<li data-id="'+ item.cmsId +'"><span>'+ item.navigationName +'</span></li>'
                }
                //liListHtml+='<li class="selected" data-id="'+ item.cmsId +'"><span>'+ item.navigationName +'</span></li>'
            })
            var html = [
                '<div class="nav-bar-scroll-tpl" id="cms-'+ this.data.cmsId +'">',
                    '<ul>'+ liListHtml +'</ul>',
                '</div>'
            ].join('')

            if (this.data) {
                return html
            }
        },
        create: function(time){
            rootDom.append(this.initHtml())
            //this.initStyle()
            this.initStyle().initEvent()
        },
        initStyle: function(){
            $('.nav-bar-scroll-tpl').css({
                'background-color': colorTrans(this.data.oneColor),
                'color': colorTrans(this.data.twoColor) 
            })
            // $('.nav-bar-scroll-tpl span').css({
            //     'color': colorTrans(this.data.twoColor) 
            // })
            // $('.nav-bar-scroll-tpl .selected').css({
            //     'color': colorTrans(this.data.threeColor) 
            // })
            registerCss('.selected {color:'+ colorTrans(this.data.threeColor) +'!important}')
            if (!isSupportSticky()) {
                $('.nav-bar-scroll-tpl').addClass('position-relative')
            }
            return this
        },
        initEvent: function(time){
            var $aLi = $('.nav-bar-scroll-tpl li'),
                length=$aLi.length,
                cmsIdArr = [],     //[12,23]
                allCmsIdArr = [],   //[{ id:12,scrollTop:12 }]
                navigationList = this.data.navigationList
            var navScroll = new IScroll('.nav-bar-scroll-tpl', {
                bounce: false,
                scrollX: true,  
                scrollY: false,
                tap: true
            });
            $('.nav-bar-scroll-tpl li').on('singleTap',function(){
                $aLi.removeClass('selected')
                $(this).addClass('selected')
                if ($(this).index()==0) {
                    navScroll.scrollToElement($(this)[0])
                }else{
                    navScroll.scrollToElement($(this).prev()[0])
                }
                var cmsId = $(this).attr('data-id')
                var targetDom = document.getElementById('cms-'+cmsId)
                if (targetDom) {
                    //targetDom.scrollIntoView({block: "start", behavior: "instant"})
                    targetY = targetDom.offsetTop-$('.nav-bar-scroll-tpl').height()
                    window.scrollTo(0,targetY)
                }          
            })
            var $nav = $('.nav-bar-scroll-tpl');
            var closetCmsId = 0
            var count = navOffsetY = 0
            function onScroll(e) {  
                setTimeout(function(){
                    var aDiv = rootDom.children()
                    for(var i=0,length=aDiv.length;i<length;i++){
                        var id = aDiv[i].getAttribute('id').split('-')[1]
                        var offsetTop = $(aDiv[i]).offset().top
                        //var offsetTop = aDiv[i].getBoundingClientRect().top
                        allCmsIdArr.push({'id':id,'offsetTop':offsetTop})
                    }
                    for(var j=0,len=navigationList.length;j<len;j++){
                        var _id = navigationList[j].cmsId
                        for(var k=0,length=allCmsIdArr.length;k<length;k++){
                            if(_id == allCmsIdArr[k].id){
                                cmsIdArr.push({'id':allCmsIdArr[k].id,'offsetTop':allCmsIdArr[k].offsetTop})
                            }
                        }
                    }
                },0)
                if (count==0) {
                    navOffsetY = $nav.offset().top
                    ++count
                }
                
                //$nav.addClass('visibility-visible')
                //var navOffsetY = $nav[0].offsetTop
                //console.log(navOffsetY,$nav.offset().top,$nav[0].getBoundingClientRect().top)
                //var navOffsetY = $nav[0].getBoundingClientRect().top
                if (!isSupportSticky()) {
                    window.scrollY > navOffsetY ? $nav.addClass('position-fixed') : $nav.removeClass('position-fixed')
                    // function onScroll(e) {
                    //     window.scrollY >= navOffsetY ? $nav.addClass('position-fixed') : $nav.removeClass('position-fixed')
                    // }
                    // window.addEventListener('scroll', onScroll);
                }

                for(var m=0,l=cmsIdArr.length;m<l;m++){
                    if(window.scrollY-cmsIdArr[m].offsetTop+$('.nav-bar-scroll-tpl').height()+3>=0){
                        closetCmsId = cmsIdArr[m].id
                    }
                } 
                var _this = $('[data-id="'+ closetCmsId +'"]'),
                    _index = _this.index();
                if (_this.length>0) {
                    $aLi.removeClass('selected')
                    _this.addClass('selected')
                    if (_index==0) {
                        navScroll.scrollToElement(_this[0])
                    }else{
                        navScroll.scrollToElement(_this.prev()[0])
                    }  
                }
                              
            }
            window.addEventListener('scroll', throttle(onScroll,100));
        }
    }

    var BottomNavTpl = function(data){
        this.data = data
        // {
        //     "type": 6,
        //     "cmsId": 6,
        //     "sequence": 60,
        //     "oneImage": "http://yangege.b0.upaiyun.com/22f3b87f2f9e6.png",
        //     "twoImage": "http://yangege.b0.upaiyun.com/28a2e987ad2bb.png",
        //     "groupProductList": [{
        //         "layoutType": 1,
        //         "groupProductDetailList": [{
        //             "image": "http://yangege.b0.upaiyun.com/2e521a7fbb639.jpg",
        //             "url": "http://m.gegejia.com/ygg/special/groupSceneWeb/1036",
        //             "width": 750,
        //             "height": 192
        //         }]
        //     }, {
        //         "layoutType": 2,
        //         "groupProductDetailList": [{
        //             "image": "http://yangege.b0.upaiyun.com/22f3b871f164a.jpg",
        //             "url": "http://m.gegejia.com/ygg/special/groupSceneWeb/1036",
        //             "width": 348,
        //             "height": 348
        //         }, {
        //             "image": "http://yangege.b0.upaiyun.com/22f3b87270cbc.jpg",
        //             "url": "http://m.gegejia.com/ygg/special/groupSceneWeb/1036",
        //             "width": 384,
        //             "height": 384
        //         }]
        //     }, {
        //         "layoutType": 2,
        //         "groupProductDetailList": [{
        //             "image": "http://yangege.b0.upaiyun.com/22f3b871f164a.jpg",
        //             "url": "http://m.gegejia.com/ygg/special/groupSceneWeb/1036",
        //             "width": 348,
        //             "height": 348
        //         }, {
        //             "image": "http://yangege.b0.upaiyun.com/22f3b87270cbc.jpg",
        //             "url": "http://m.gegejia.com/ygg/special/groupSceneWeb/1036",
        //             "width": 384,
        //             "height": 384
        //         }]
        //     }, {
        //         "layoutType": 3,
        //         "groupProductDetailList": [{
        //             "image": "http://yangege.b0.upaiyun.com/22f3b874c0d0b.jpg",
        //             "url": "http://m.gegejia.com/ygg/special/groupSceneWeb/1036",
        //             "width": 226,
        //             "height": 226
        //         }, {
        //             "image": "http://yangege.b0.upaiyun.com/2e521a8370aa8.jpg",
        //             "url": "http://m.gegejia.com/ygg/special/groupSceneWeb/1036",
        //             "width": 226,
        //             "height": 226
        //         }, {
        //             "image": "http://yangege.b0.upaiyun.com/34014b8b61ad5.jpg",
        //             "url": "http://m.gegejia.com/ygg/special/groupSceneWeb/1036",
        //             "width": 226,
        //             "height": 226
        //         }]
        //     }, {
        //         "layoutType": 4,
        //         "groupProductDetailList": [{
        //             "image": "http://yangege.b0.upaiyun.com/34014b8c2b9a7.png",
        //             "url": "http://m.gegejia.com/ygg/special/groupSceneWeb/1036",
        //             "width": 170,
        //             "height": 170
        //         }, {
        //             "image": "http://yangege.b0.upaiyun.com/11e6255ebd3d9.png",
        //             "url": "http://m.gegejia.com/ygg/special/groupSceneWeb/1036",
        //             "width": 170,
        //             "height": 170
        //         }, {
        //             "image": "http://yangege.b0.upaiyun.com/34014b8ce4ae6.png",
        //             "url": "http://m.gegejia.com/ygg/special/groupSceneWeb/1036",
        //             "width": 170,
        //             "height": 170
        //         }, {
        //             "image": "http://yangege.b0.upaiyun.com/1795566700b46.png",
        //             "url": "http://m.gegejia.com/ygg/special/groupSceneWeb/1036",
        //             "width": 170,
        //             "height": 170
        //         }]
        //     }]
        // }
    }
    BottomNavTpl.prototype = {
        createNavHtml: function(){
            var html=''
            $.map(this.data.groupProductList,function(item,index){
                var divHtml=''
                $.map(item.groupProductDetailList,function(data,i){
                    divHtml+='<div style="width:'+ 100/item.layoutType +'%" data-src="'+ data.url +'" class="one-item"><img src="'+ data.image +'" /></div>'

                })
                html+='<div class="line">'+divHtml+'</div>'
            })
            return html
        },
        initHtml: function(){
            var html = [
                '<div class="bottom-nav-tpl" id="cms-'+ this.data.cmsId +'">',
                    '<div class="bottom-nav-bg">',
                        '<div class="fixed-btn"><img src="'+ this.data.twoImage +'" /></div>',
                        '<div class="fixed-bottom-ct">',
                            '<img src="'+ this.data.oneImage +'" />',
                            '<div class="ct-wrap">'+ this.createNavHtml() +'</div>',
                            '<div class="down-btn"></div>',
                        '</div>',
                    '</div>',
                '</div>'
            ].join('')

            if (this.data) {
                return html
            }
        },
        create: function(time){
            rootDom.append(this.initHtml())
            this.initEvent()
        },
        initEvent: function(time){
            $('.bottom-nav-tpl .fixed-btn').on('tap',function(ev){
                ev.stopPropagation()
                $('.bottom-nav-bg').css({
                    'height': $('.fixed-bottom-ct').height()+'px'
                })
                $('.bottom-nav-tpl').addClass('height-100')
                $(this).addClass('display-none')
            })

            $('.bottom-nav-tpl').on('singleTap',function(ev){
                ev.stopPropagation()
                if (ev.target.className == 'down-btn' || ev.target.className.indexOf('bottom-nav-tpl')>-1) {
                    $('.bottom-nav-bg').css({
                        'height': 0
                    })
                    $(this).removeClass('height-100')
                    $('.bottom-nav-tpl .fixed-btn').removeClass('display-none')
                }                
            })

            $('.bottom-nav-tpl .one-item').on('singleTap',function(index){
                var url = $(this).attr('data-src')
                if (url) {
                    location.href = url
                }
            })
        }
    }

    var ProductList2Tpl = function(data){
        this.data = data
        // {
        //     "type": 7,
        //     "cmsId": 7,
        //     "sequence": 30,
        //     "oneImage": "http://yangege.b0.upaiyun.com/34014b8e1db7b.jpg",
        //     "twoImage": "http://yangege.b0.upaiyun.com/2e521a86a0796.jpg",
        //     "oneImageHeight": 114,
        //     "twoImageHeight": 114,
        //     "oneColor": "",
        //     "productList": [{
        //         "status": 4,
        //         "highPrice": 85.0,
        //         "url": "https://test.gegejia.com/item-55434.htm",
        //         "name": "¡¾°×ÇÉ¿ËÁ¦Î¶¡¿¡¾12Ã¶Èë¡¿ÈÕ±¾½ø¿Ú±±º£µÀ°×É«ÁµÈË¼ÐÐÄ±ý¸É132g/ºÐ",
        //         "image": "http://yangege.b0.upaiyun.com/22f0302b60e79.jpg!v1product",
        //         "lowPrice": 69.0
        //     }, {
        //         "status": 4,
        //         "highPrice": 130.0,
        //         "url": "https://test.gegejia.com/item-55433.htm",
        //         "name": "¡¾ÇÉ¿ËÁ¦Î¶¡¿¡¾18Ã¶×°¡¿ÈÕ±¾½ø¿Ú±±º£µÀ°×É«ÁµÈË¼ÐÐÄ±ý¸É198g/ºÐ",
        //         "image": "http://yangege.b0.upaiyun.com/22f0396bd4524.jpg!v1product",
        //         "lowPrice": 102.0
        //     }, {
        //         "status": 4,
        //         "highPrice": 130.0,
        //         "url": "https://test.gegejia.com/item-55432.htm",
        //         "name": "¡¾°×ÇÉ¿ËÁ¦Î¶¡¿¡¾18Ã¶×°¡¿ÈÕ±¾½ø¿Ú±±º£µÀ°×É«ÁµÈË¼ÐÐÄ±ý¸É198g/ºÐ",
        //         "image": "http://yangege.b0.upaiyun.com/22f0397130c55.jpg!v1product",
        //         "lowPrice": 102.0
        //     }],
        //     "productDetail": {
        //         "oneUrl": "http://m.gegejia.com/ygg/special/groupSceneWeb/1036",
        //         "twoUrl": "http://m.gegejia.com/ygg/special/groupSceneWeb/1036",
        //         "tagImage": "http://yangege.b0.upaiyun.com/1d448772edc0c.png",
        //         "isShowImage": "1",
        //         "isShowTag": "1",
        //         "tagBackColor": "#ffffff",
        //         "tagTextColor": "#528660",
        //         "productBackColor": "#528660",
        //         "productTextColor": "#ffffff",
        //         "productNameColor": "#ffffff",
        //         "priceTextColor": "#ffffff",
        //         "backColor": "#abd6b8",
        //         "tagText": "Ë«12ÌØ»Ý"
        //     }
        // }
    }
    ProductList2Tpl.prototype = {
        creatProductHtml: function(){
            var html = '',
            $.map(this.data.productList,function(item,index){
                html+= [
                    '<div class="product" data-src="'+ item.url +'">',
                    '<div class="pr-img" style="background-image:url('+ item.image +')">',
                    '</div>',
                    '<div class="pr-detail">',
                    '<h2>'+ item.name +'</h2>',
                    '</div>',
                    '</div>'
                ].join('')
            })   
            // if (this.data.productList.length == 3) {
            //     html+='<div class="justify_fix">&nbsp;</div>'
            // }
            return html
        },
        initHtml: function(){
            var html = [
                '<div class="product-list-2-tpl" id="cms-'+ this.data.cmsId +'">',
                this.data.oneImage?'<img src="'+ this.data.oneImage +'" data-src="'+ this.data.oneUrl +'" />':'',
                '<div class="list-wrap">'+ this.creatProductHtml() +'</div>',
                this.data.twoImage?'<img src="'+ this.data.twoImage +'" data-src="'+ this.data.twoUrl +'" />':'',
                '</div>'
            ].join('')

            if (this.data) {
                return html
            }
        },
        create: function(time){
            rootDom.append(this.initHtml())
            this.initEvent()
        },
        initEvent: function(time){
            $('.list-wrap>.product,.product-list-2-tpl>img').on('singleTap',function(index){
                var url = $(this).attr('data-src')
                if (url) {
                    location.href = url
                }
            })
        }
    }

    //轮播图
    var SwiperTpl = function(data){
        this.data = data
        // {
        //     type:8,
        //     cmsId:8,
        //     source:2,
        //     carouselDetailList:[
        //         {
        //             url:"https://test.gegejia.com/ygg-hqbs/order/confirm/4?qqbsGroupProductId=72243",
        //             image:'http://yangege.b0.upaiyun.com/34004a3f6715b.jpeg'
        //         },{
        //             url:"https://test.gegejia.com/ygg-hqbs/cnty/toac/4826",
        //             image:'http://yangege.b0.upaiyun.com/33fe93ad2291a.jpg'
        //         },{
        //             url:"https://test.gegejia.com/ygg-hqbs/cnty/toac/4827",
        //             image:'http://yangege.b0.upaiyun.com/28a1e830ddda5.jpg'
        //         }
        //     ]
        //
        // }
    }
    SwiperTpl.prototype = {
        createNavHtml: function () {
            var html = ''
            $.map(this.data.carouselDetailList,function(item,index){
                var _url = item.url;
                if(!_url){
                    _url = 'javascript:;'
                }
                html+=[
                    '<a href="'+ _url +'" class="swiper-slide"style="background-image:url('+ item.image +')"></a>'
                ].join('')
            })
            return html
        },
        initHtml: function () {
            var html = [
                '<div class="swiper-box-tpl swiper-container swiper-'+ this.data.cmsId +'" id="cms-'+ this.data.cmsId +'">',
                '<section class="swiper-wrapper">'+ this.createNavHtml() +'</section>',
                '<div class="swiper-pagination"></div>',
                '</div>'
            ].join('')

            if (this.data) {
                return html
            }
        },
        create: function (time) {
            rootDom.append(this.initHtml())
            this.initEvent()
        },
        initEvent: function (time) {
            var mySwiper = new Swiper ('.swiper-'+ this.data.cmsId, {
                loop: true,
                autoplay:4000,
                pagination: '.swiper-pagination',
                autoplayDisableOnInteraction:false
            })

        }
    }

    //情景模版
    var productScrollTpl = function(data){
        this.data = data;
        // {
        //     type:9,
        //     cmsId:9,
        //     source:2,
        //     oneImage:'http://yangege.b0.upaiyun.com/34004a3f6715b.jpeg',
        //     productList:[
        //         {
        //             url:"https://test.gegejia.com/ygg-hqbs/order/confirm/4?qqbsGroupProductId=72243",
        //             image:'http://yangege.b0.upaiyun.com/34004a3f6715b.jpeg',
        //             name:'廉价劳力罗杰斯地方s',
        //             lowPrice:'232',
        //             highPrice:'344'
        //         },{
        //             url:"https://test.gegejia.com/ygg-hqbs/cnty/toac/4826",
        //             image:'http://yangege.b0.upaiyun.com/33fe93ad2291a.jpg',
        //             name:'廉价劳力罗杰斯地方s',
        //             lowPrice:'232',
        //             highPrice:'344'
        //         },{
        //             url:"https://test.gegejia.com/ygg-hqbs/cnty/toac/4827",
        //             image:'http://yangege.b0.upaiyun.com/28a1e830ddda5.jpg',
        //             name:'廉价劳力罗杰斯地方s',
        //             lowPrice:'232',
        //             highPrice:'344'
        //         }
        //     ],
        //      productDetail:{
        //          oneUrl:"https://test.gegejia.com/ygg-hqbs/cnty/toac/4827"
        //     }
        // }
    }
    productScrollTpl.prototype = {
        createNavHtml: function () {
            var html = '',
            $.map(this.data.productList,function(item,index){
                if(index < 6){//最多显示6个
                    html+=[
                        '<ul  data-url="'+ item.url +'" class="swiper-slide">' +
                        '<li class="product-tu"  style="background-image:url('+ item.image +')">'+'</li>' +
                        '<li class="product-info">'+ item.name +'</li>' +
                        '</ul>'
                    ].join('')
                };
            })
            return html
        },
        initHtml: function () {

            var _show = '';
            if(this.data.productList.length >= 6){//大于等于6个显示全部按钮
                _show = 'display:block';
            }

            var _url = this.data.oneUrl;
            if(!_url){
                _url = 'javascript:;'
            }

            var html = [
                '<div class="product-scroll-tpl" id="cms-'+ this.data.cmsId +'">' +
                '<a href="'+ _url +'" style="background-image:url('+ this.data.oneImage +')" class="product-scroll-banner"></a>',
                '<div class="product-scroll-list swiper-container  product-scroll'+ this.data.cmsId +'">' +
                '<section class="swiper-wrapper">'+ this.createNavHtml() +'' +
                '<ul data-url="'+ this.data.oneUrl +'" class="swiper-slide">' +
                '<li class="product-tu product-all" style="'+_show+'">' +
                '<span>查看全部<br>' +
                '<i>See All</i>' +
                '</span>' +
                '</li>' +
                '</ul>' +
                '</section>',
                '</div>' +
                '</div>'
            ].join('')

            if (this.data) {
                return html
            }
        },
        create: function (time) {
            rootDom.append(this.initHtml())
            this.initEvent()
        },
        initEvent: function (time) {
            var productSwiper = new Swiper ('.product-scroll'+ this.data.cmsId, {
                spaceBetween: 20,
                slidesPerView: 3.5
            })

            var _productList = $(".product-scroll-list ul");
            _productList.on('click',function () {
                var _productUrl = $(this).data('url');
                if (_productUrl) {
                    window.location.href = _productUrl;
                }
            })

        }

    }



    return {
        factoryInterface: factoryInterface,
        Observer: Observer,
        queryString: queryString,
        createScript: createScript 
    }
}));