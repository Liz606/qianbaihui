webpackJsonp([0],[
/* 0 */
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {__webpack_require__(/*! ../css/base.css */ 2);
	__webpack_require__(/*! ../css/animate.css */ 6);
	__webpack_require__(/*! ../css/nav.css */ 8);
	__webpack_require__(/*! ../css/index.css */ 15);
	__webpack_require__(/*! ../css/public.css */ 24);
	__webpack_require__(/*! ../css/slider.css */ 28);
	__webpack_require__(/*! ../css/newsSlider.css */ 30);
	__webpack_require__(/*! ../css/lookbook.css */ 32);
	__webpack_require__(/*! ../js/base.js */ 34);
	__webpack_require__(/*! ../js/homeFull.js */ 35);
	__webpack_require__(/*! ../js/slider.js */ 36);
	__webpack_require__(/*! ../js/newSlider.js */ 37);
	__webpack_require__(/*! ../js/jquery.easing.1.3.js */ 38);
	__webpack_require__(/*! ../js/lookbookSlider.js */ 39);
	__webpack_require__(/*! ../js/joinSlider.js */ 40);
	__webpack_require__(/*! ../js/joinSliderContent.js */ 41);
	__webpack_require__(/*! ../js/ajax.js */ 42);
	
	var imgList = $('img');
	var imgLength = imgList.length;
	var imgCorrt = imgLength;
	var left = 0;
	var num;
	$.each(imgList, function () {
		var url = $(this).attr('src');
		loadImage(url, callback);
	});
	$('#fullpage').bindScroll();
	function loadImage(url, callback) {
		var img = new Image(); //创建一个Image对象，实现图片的预下载
		img.src = url;
	
		if (img.complete) {
			// 如果图片已经存在于浏览器缓存，直接调用回调函数
			callback.call(img);
			return; // 直接返回，不用再处理onload事件
		}
		img.onload = function () {
			//图片下载完毕时异步调用callback函数。
			callback.call(img); //将回调函数的this替换为Image对象
		};
	};
	function callback() {
		setTimeout(function () {
			imgCorrt--;
			num = Math.round((1 - imgCorrt / imgLength) * 100) + '%';
			//$(".loadnum").text(num);
			if (!imgCorrt) {
				setTimeout(function () {
					$('#loading').addClass('none');
					$('body')[0].scrollTop = 0;
					$('#fullpage').unBindScroll();
				}, 5000);
			};
		}, 1000);
	};
	
	$("#menu").click(function () {
		$("#navList").LizToggleOne('h0', 'h100');
		$('#fullpage').bindScroll();
	});
	$("#navList>li").click(function () {
		$("#navList").LizToggleOne('h0', 'h100');
		$('#fullpage').unBindScroll();
	});
	$("#home .banner-list").homeFull();
	var _W = parseInt($(window).width(), 10);
	$('#sliderBox').sliderFunc($(".brandTextMenu")); //brand滚动
	$('#join .joinBox').joinsliderFunc(); //brand滚动
	$('#joinBoxContent .joinBoxContent').joinsliderContentFunc(_W); //brand滚动
	$("#section_banner_wrapper_1_1").initSectionBanner();
	/**
	 * Liz-scroll
	 *
	 */
	$('.Liz-scroll').mouseenter(function () {
		$.mousBool = true;
	});
	
	$('.Liz-scroll').mouseleave(function () {
		$.mousBool = false;
	});
	//基于mousewheel 子元素滚动 父元素不跟随
	$.fn.scrollUnique = function () {
		return $(this).each(function () {
			var eventType = 'mousewheel';
			if (document.mozHidden !== undefined) {
				eventType = 'DOMMouseScroll';
			}
			$(this).on(eventType, function (event) {
				// 一些数据
				var scrollTop = this.scrollTop,
				    scrollHeight = this.scrollHeight,
				    height = this.clientHeight;
	
				var delta = event.originalEvent.wheelDelta ? event.originalEvent.wheelDelta : -(event.originalEvent.detail || 0);
	
				if (delta > 0 && scrollTop <= delta || delta < 0 && scrollHeight - height - scrollTop <= -1 * delta) {
					// IE浏览器下滚动会跨越边界直接影响父级滚动，因此，临界时候手动边界滚动定位
					this.scrollTop = delta > 0 ? 0 : scrollHeight;
					// 向上滚 || 向下滚
					event.preventDefault();
				}
			});
		});
	};
	
	$('.Liz-scroll').scrollUnique();
	
	$('#navList').mouseenter(function () {});
	
	$('#navList').mouseleave(function () {});
	/*
	 *newsSlider
	 */
	$("#newsSlider").newsSliderFunc();
	/**
	 * selectList
	 */
	$("#selectDown").click(function () {
		$(".selectList").LizToggleOne('h0', 'h240');
	});
	$(".selectList").mouseleave(function () {
		$(".selectList").removeClass('h240').addClass('h0');
	});
	$(".selectList>li").click(function () {
		$('.selectTitle > span').text($(this).text());
		$(".selectList").removeClass('h240').addClass('h0');
	});
	/**
	 * lookbookDown
	 */
	$("#lookbookDown").click(function () {
		$(".lookbookNav").LizToggleOne('h0', 'h120');
		if ($(".secendList").hasClass('h160')) {
			$(".secendList").LizToggleOne('h0', 'h160');
		};
	});
	$("#secendDown").click(function () {
		$(".secendList").LizToggleOne('h0', 'h160');
		if ($(".lookbookNav").hasClass('h120')) {
			$(".lookbookNav").LizToggleOne('h0', 'h120');
		};
	});
	
	//点击事件
	var secendLists = $(".secendList").children(); //下拉列表
	var secendNavs = $(".secendNav").children(); //列表title
	secendLists.each(function () {
		$(this).click(function () {
			var index = $(this).attr('index');
			var crrunt = secendNavs.filter('.active');
			if (_W <= 1000) {
				if (crrunt.attr('index') != index) {
					crrunt.removeClass('active');
					secendNavs.eq(index - 1).addClass('active');
					$("#move_left").unbind('click');
					$("#move_right").unbind('click');
					ajaxGetLookBook();
					$(".secendList").addClass('h0').removeClass('h160');
				} else {
					$(".secendList").addClass('h0').removeClass('h160');
					return;
				}
			}
		});
	});
	secendNavs.each(function () {
		$(this).click(function () {
			if (_W <= 1000) {
				return;
			};
			var crrunt = secendNavs.filter('.active');
			crrunt.removeClass('active');
			$(this).addClass('active');
			$("#move_left").unbind('click');
			$("#move_right").unbind('click');
			ajaxGetLookBook();
		});
	});
	
	//点击事件
	var lookbookNavs = $(".lookbookNav").children(); //下拉列表
	var lookbookLogos = $(".lookbookLogo").children(); //列表title
	lookbookNavs.each(function () {
		$(this).click(function () {
			var index = $(this).attr('index');
			var crrunt = lookbookLogos.filter('.active');
			var navCurrent = lookbookNavs.filter('.active');
			if (_W <= 1000) {
				if (crrunt.attr('index') != index) {
					navCurrent.removeClass('active');
					crrunt.removeClass('active');
					$(this).addClass('active');
					lookbookLogos.eq(index - 1).addClass('active');
					$("#move_left").unbind('click');
					$("#move_right").unbind('click');
					ajaxGetLookBook();
					$(".lookbookNav").addClass('h0').removeClass('h120');
				} else {
					$(".lookbookNav").addClass('h0').removeClass('h120');
					return;
				}
			} else {
				if (navCurrent.attr('index') == index) {
					return;
				}
				navCurrent.removeClass('active');
				crrunt.removeClass('active');
				$(this).addClass('active');
				lookbookLogos.eq(index - 1).addClass('active');
				$("#move_left").unbind('click');
				$("#move_right").unbind('click');
				ajaxGetLookBook();
			}
		});
	});
	/*lookbookNavs.each(function () {
		$(this).click(function () {
			
			var crrunt=lookbookNavs.filter('.active');
			crrunt.removeClass('active');
			$(this).addClass('active');
			console.log("..........>=1000.. Logo ....this index:"+$(this).attr('index'));
		})
	})*/
	
	/*lookbookMask close*/
	$('#lookbookmaskX').click(function () {
		$('#fullpage').unBindScroll();
		$("#lookbookMask").removeClass('block').addClass('none');
		$("#lookbookMask>.dg-nextArr").unbind('click');
		$("#lookbookMask>.dg-prevArr").unbind('click');
	});
	/*lookbookMask close*/
	$('#videomaskX').click(function () {
		$('#fullpage').unBindScroll();
		$('#videoShow').get(0).pause();
		$("#videoMask").removeClass('block').addClass('none');
	});
	
	/**/
	$("#newsSlider>li>div").click(function () {
		$("#blackMaskNew").removeClass('none').addClass('block');
		var thisSrc = $(this).attr("data-url");
		$(this).addClass('currentNew');
		$('#fullpage').bindScroll('#lookOnlyNew>.boxScorll');
		ajaxGetNews($(this), thisSrc);
	});
	$('#maskXNew').click(function () {
		$('#fullpage').unBindScroll();
		$("#blackMaskNew").removeClass('block').addClass('none');
		$('#newvideoShow').remove();
		$("#newsSlider>li>div").each(function () {
			$(this).removeClass('currentNew');
		});
	});
	/*join*/
	if (_W <= 1000) {
		$("#join .boxItem .wapper").click(function () {
			var index = $(this).parent().attr('index');
			console.log(index);
			$("#joinBoxContent .joinBoxContent").trigger('reload', index);
			$("#join .joinBox").removeClass('show').addClass('hidden');
			$("#joinBoxContent").removeClass('none').addClass('block');
			$("#joinPoint").removeClass('block').addClass('none');
	
			$("#joinBoxContent .contentItem").removeClass('none').addClass('block');
			$("#joinBoxContent .maskXJoinBox").removeClass('none').addClass('block');
			$("#joinBoxContent .cPointer").removeClass('none').addClass('block');
		});
	} else {
		$("#join .boxItem .joinAdd").click(function () {
			$('#fullpage').bindScroll('.joinConditionBox.Liz-scroll');
			var index = $(this).parent().parent().parent().attr('index');
			console.log(index);
			$("#joinBoxContent .joinBoxContent").trigger('reload', index);
			$("#join .joinBox").removeClass('show').addClass('hidden');
			$("#joinBoxContent").removeClass('none').addClass('block');
	
			$("#joinBoxContent .contentItem").removeClass('none').addClass('block');
			$("#joinBoxContent .maskXJoinBox").removeClass('none').addClass('block');
			$("#joinBoxContent .cPointer").removeClass('none').addClass('block');
		});
	}
	$("#joinBoxContent .maskXJoinBox").click(function () {
		$("#join .joinBox").removeClass('hidden').addClass('show');
		$("#joinBoxContent").removeClass('block').addClass('none');
		$("#joinPoint").removeClass('none').addClass('block');
		$('#fullpage').unBindScroll();
		$("#joinBoxContent .contentItem").removeClass('block').addClass('none');
		$("#joinBoxContent .maskXJoinBox").removeClass('block').addClass('none');
		$("#joinBoxContent .cPointer").removeClass('block').addClass('none');
	});
	
	/*$('.videoOn').click(function () {
	    var _url=$(this).attr('data-src');
	    var V=$('<video>').attr({'preload':'auto','controls':''}).addClass('acm');
	    var S=$('<source>').attr({'src':_url,'type':'video/mp4'});
	        V.appendTo($('#videPlay'));
	        S.appendTo(V);
	    $('#videPlay>video').get(0).play();
	    $('#videPlay>video').attr('width',(_W-200)+'px');
	    $('#videPlay').removeClass('none').addClass('block');
	})
	$('#videPlay>.videoClose').click(function () {
	    $('video').get(0).pause();
	    $("video").remove();
	    $('#videPlay').removeClass('block').addClass('none');
	})*/
	/**/
	$('.selectList>li').click(function () {
		var data = $(this).attr('data-infos');
		data = data.split('|');
		var text = '<div class="storeMask"><div class="selectContent acm"><div class="selectHeader"><span class="fl">' + $(this).text() + '</span><span class="fr"><img src="images/Xs.png" alt=""></span></div><ul class="storeSelectList cf Liz-scroll">';
		for (var i = 0, len = data.length; i < len; i++) {
			data[i] = data[i].split(';');
			text += '<li><div><p>' + data[i][0] + '</p><p class="p-16">' + data[i][1] + '</p></div></li>';
		}
	
		text += '</ul></div></div>';
		$('#storeContent').removeClass('none').addClass('block').append(text);
		$('#fullpage').bindScroll('.storeSelectList');
		$('.selectContent>.selectHeader>span').eq(1).click(function () {
			$('.selectContent').addClass('small');
			setTimeout(function () {
				$('.storeMask').remove();
				$('#storeContent').removeClass('block').addClass('none');
				$('#fullpage').unBindScroll();
			}, 800);
		});
	});
	$('.selectContent>.selectHeader>span').eq(1).click(function () {
		$('.selectContent').addClass('small');
		setTimeout(function () {
			$('.storeMask').remove();
			$('#storeContent').removeClass('block').addClass('none');
			$('#fullpage').unBindScroll();
		}, 800);
	});
	
	function ajaxGetNews(obj, srcStr) {
		$.ajax({
			type: "GET",
			url: srcStr,
			dataType: "json",
			success: function (data) {
				var text = '';
				if (obj.children().filter('.newsImg').children().length == 0) {
					text += '<div class="newTitleOpen" style="text-align: center;">' + data.title + '</div><div class="newDataOpen" style="text-align: center;padding: 20px 40px;">' + data.date + '</div><div class="boxScorll  Liz-scroll ">' + unescape(data.content) + '</div>';
					$('#lookOnlyNew').next().text(data.title);
					$('#lookOnlyNew').html(text);
				} else {
					text += '<video id="newvideoShow" controls="controls" src="' + data.videoUrl + '"class="selected">您的浏览器不支持html5视频 </video>';
					$('#lookOnlyNew').next().text(data.title);
					$('#lookOnlyNew').html(text);
					$('#newvideoShow').get(0).play();
				}
			},
			error: function () {
				console.log("出错啦~~~~");
			}
		});
	}
	var lookbookList = {};
	function ajaxGetLookBook() {
		var first = lookbookNavs.filter('.active').attr('index');
		var secend = secendNavs.filter('.active').attr('index');
		var key = first + "_" + secend;
		var _url = $('#section_banner_wrapper_' + key).attr('data-url');
		$("#section_banner").children().filter('.block').removeClass('block').addClass('none');
		if ($('#section_banner_wrapper_' + key).children().length > 0) {
			$('#section_banner_wrapper_' + key).removeClass('none').addClass('block');
			$('#section_banner_wrapper_' + key).trigger('reload');
			$('#section_banner').css('left', '0');
			return;
		};
		$.ajax({
			type: "GET",
			url: _url,
			dataType: "json",
			success: function (data) {
				console.log('request ' + key);
				var text = "";
				for (var i = 0, len = data.small.length; i < len; i++) {
					text += '<div class="section_banner" >' + '<div class="section_banner_img bgimg" data-url="' + data.big[i] + '" style="background-image:url(\'' + data.small[i] + '\')" alt="">';
					if (key.slice(0, 1) == "3") {
						text += '<div class="LookbookVideo videoOn" data-src="./images/test.mp4"><img class="mcm" src="./images/play.png" alt=""></div>';
					};
	
					text += '</div></div>';
				};
				lookbookList[key] = data;
				$('#section_banner_wrapper_' + key).removeClass('none').addClass('block').html(text);
				$('#section_banner_wrapper_' + key).initSectionBanner();
				$('#section_banner').css('left', '0');
			},
			error: function (data) {
				console.log("出错啦~~~~" + data.status);
			}
		});
	}
	
	/* ------------------------------------------------------------
	 * 滚动到指定位置
	 * ------------------------------------------------------------ */
	smoothScroll('.go-home', '#home');
	smoothScroll('.go-about', '#about');
	smoothScroll('.go-brand', '#brand');
	smoothScroll('.go-news', '#news');
	smoothScroll('.go-lookbook', '#lookbook');
	smoothScroll('.go-product', '#lookbook');
	smoothScroll('.go-video', '#lookbook');
	smoothScroll('.go-join', '#join');
	smoothScroll('.go-store', '#store');
	smoothScroll('.go-contact', '#contact');
	
	function smoothScroll(btn, target) {
		var animationTime = 500;
		$(document).on('click', btn, function () {
			var position = $(target).offset().top;
			if (target != "#home") {
				position -= 60;
			};
			if (btn == ".go-lookbook") {
				$(".lookbookNav").children().eq(0).click();
			};
			if (btn == ".go-product") {
				$("#product").click();
			};
			if (btn == ".go-video") {
				$("#video").click();
			};
			$('html, body').animate({ scrollTop: position }, animationTime);
		});
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ 1)))

/***/ },
/* 1 */,
/* 2 */
/*!**************************!*\
  !*** ./src/css/base.css ***!
  \**************************/
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/*!*****************************!*\
  !*** ./src/css/animate.css ***!
  \*****************************/
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 7 */,
/* 8 */
/*!*************************!*\
  !*** ./src/css/nav.css ***!
  \*************************/
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */
/*!***************************!*\
  !*** ./src/css/index.css ***!
  \***************************/
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */
/*!****************************!*\
  !*** ./src/css/public.css ***!
  \****************************/
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */
/*!****************************!*\
  !*** ./src/css/slider.css ***!
  \****************************/
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 29 */,
/* 30 */
/*!********************************!*\
  !*** ./src/css/newsSlider.css ***!
  \********************************/
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 31 */,
/* 32 */
/*!******************************!*\
  !*** ./src/css/lookbook.css ***!
  \******************************/
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 33 */,
/* 34 */
/*!************************!*\
  !*** ./src/js/base.js ***!
  \************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {//拓展$.prototype
	$.fn.extend({
		LizToggleOne: function (str1, str2) {
			if ($(this).hasClass(str1)) {
				$(this).removeClass(str1).addClass(str2);
			} else if ($(this).hasClass(str2)) {
				$(this).removeClass(str2).addClass(str1);
			}
		},
		hasNoClass: function (str) {
			var $this = $(this);
			var $that;
			$this.each(function () {
				if (!$(this).hasClass(str)) {
					$that = $(this);
				};
			});
			return $that;
		},
		bindScroll: function (obj) {
			var $this = $(this);
			var eventType = 'mousewheel';
			if (document.mozHidden !== undefined) {
				eventType = 'DOMMouseScroll';
			}
			$(document).on(eventType, function (event) {
				if (typeof obj === 'undefined') {
					event.preventDefault();
				} else {
					var scrollTop = $(obj)[0].scrollTop,
					    scrollHeight = $(obj)[0].scrollHeight,
					    height = $(obj)[0].clientHeight;
	
					var delta = event.originalEvent.wheelDelta ? event.originalEvent.wheelDelta : -(event.originalEvent.detail || 0);
	
					if (delta > 0 && scrollTop <= delta || delta < 0 && scrollHeight - height - scrollTop <= -1 * delta) {
						// IE浏览器下滚动会跨越边界直接影响父级滚动，因此，临界时候手动边界滚动定位
						$(obj)[0].scrollTop = delta > 0 ? 0 : scrollHeight;
						// 向上滚 || 向下滚
						event.preventDefault();
					}
				}
			});
		},
		unBindScroll: function () {
			console.log('unBindScroll');
			var eventType = 'mousewheel';
			if (document.mozHidden !== undefined) {
				eventType = 'DOMMouseScroll';
			}
			$(document).off(eventType);
		}
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ 1)))

/***/ },
/* 35 */
/*!****************************!*\
  !*** ./src/js/homeFull.js ***!
  \****************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {$.fn.homeFull = function () {
		var $this = $(this),
		    _children = $this.children(),
		    _len = _children.length;
		setInterval(nextFunc, 5000);
		function nextFunc() {
			var _current = _children.hasNoClass('changeScale');
			var _next;
			if (_current.attr('index') == _children.eq(_children.length - 1).attr('index')) {
				_next = _children.eq(0);
			} else {
				_next = _current.next();
			}
			_current.addClass('changeScale');
			_next.removeClass('changeScale');
		}
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ 1)))

/***/ },
/* 36 */
/*!**************************!*\
  !*** ./src/js/slider.js ***!
  \**************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {$.fn.sliderFunc = function (obj) {
	    var _super = this;
	    _super.animated = false;
	    var _const = _super.children().length;
	    var timer;
	    var _point = 'point';
	    var index = 0; //记录点击
	    _super.sliderWidth = Math.round($(_super).width());
	    var _stat = true;
	    //将轮播图最后一个移动到第一个
	    var superlast = $(_super).children().last().clone();
	    $(_super).children().last().remove();
	    $(_super).prepend(superlast);
	
	    var Children = $(_super).children();
	    var p = 1; //错位个数
	    var start = {},
	        current = {};
	
	    var brandText = $(".brandTextMenu");
	    brandText.children = brandText.children();
	    brandText.brandTextTitle = $(".brandTextTitle").children().eq(0);
	    brandText.brandTexts = $('.brandText').children().filter('.Liz-scroll');
	
	    brandText.children.each(function () {
	        $(this).click(function () {
	            var num = $(this).attr('index'); //获取原点序号
	            pageClick(num);
	        });
	    });
	
	    //动态设置滚动元素的宽度，left和index编号
	    $.each(Children, function (i) {
	        $(this).attr({ 'width': _super.sliderWidth + 'px', 'index': i });
	        $(this).css({ 'left': ($(this).attr('index') - 1) * _super.sliderWidth + 'px' });
	        $(this).attr({ 'index': i });
	        if (i == 0) {
	            $(this).attr('index', _const);
	        };
	    });
	    //当需要显示原点时
	    if (_stat) {
	        //动态生成原点盒子
	        var div = document.createElement("div");
	        div.setAttribute('id', _point);
	        _point = "#point";
	        $(_super).after(div);
	        //动态生成原点
	        for (var i = 0; i < _const; i++) {
	            var _pointChild = document.createElement("span");
	            _pointChild.setAttribute('index', i + 1);
	            $(_point).append(_pointChild);
	        };
	        var _point = $(_point).children();
	        _point[0].className = 'on';
	    };
	
	    $(_super).on('touchstart', '', pageStart);
	    $(_super).on('touchmove', '', pageMove);
	    $(_super).on('touchend', '', pageEnd);
	    $(_super).on('click', '', function () {
	        var num = parseInt($(_point).filter('.on').attr('index')) + 1;
	        if (num == _const + 1) {
	            num = 1;
	        };
	        pageClick(num);
	    });
	    //autoPlay(_super.sliderWidth);//自动滚动
	    // pageClick
	    function pageClick(num) {
	        if (!_super.animated) {
	            var from = 0;
	            var sw;
	            to = num;
	            $.each(Children, function () {
	                if (parseInt(this.style.left) == 0) {
	                    from = parseInt($(this).attr('index'));
	                };
	            });
	            console.log('from:' + from + '     to:' + to);
	
	            if (from == to) {
	                return;
	            } else {
	                sw = (from - to) * _super.sliderWidth;
	            }
	            index = to - 1;
	            showPoint();
	            animate(sw, to);
	        }
	    }
	    //pageMove
	    function pageMove(e) {}
	    //e.preventDefault();
	
	    //pageStart
	    function pageStart(e) {
	        if (start.active) return;
	        if (e.originalEvent.touches.length < 2) {
	            start.x = e.originalEvent.touches[0].pageX;
	            start.when = new Date().getTime();
	            start.active = true;
	        }
	    }
	    //pageEnd
	    function pageEnd(e) {
	        current.x = e.originalEvent.changedTouches[0].pageX;
	        start.active = false;
	        if (isSwipe(e)) {
	            if (current.x - start.x < 0) {
	                Arrow_r(_super.sliderWidth);
	            } else {
	                Arrow_l(_super.sliderWidth);
	            }
	        }
	    }
	    //是否到达滑动的条件
	    function isSwipe(e) {
	        var duration = new Date().getTime() - start.when;
	        var xdist;
	        xdist = current.x - start.x;
	        return duration < 500 && 100 < Math.abs(xdist);
	    }
	    //向左滚动一页
	    function Arrow_r() {
	        if (!_super.animated) {
	            index++;
	            if (index == _const) {
	                index = 0;
	            }
	
	            if (_stat) {
	                showPoint();
	            };
	            //
	            animate(-_super.sliderWidth, index + 1);
	        }
	    }
	    //向右滚动一页
	    function Arrow_l() {
	        if (!_super.animated) {
	            index--;
	            if (index == -1) {
	                index = _const - 1;
	            }
	            if (_stat) {
	                showPoint();
	            };
	
	            animate(_super.sliderWidth, index + 1);
	        }
	    }
	    //自动向左滚动
	    function autoPlay() {
	        timer = setInterval(function () {
	            Arrow_r();
	        }, 5000);
	    }
	    //停止自动滚动
	    function stopAuto() {
	        clearInterval(timer);
	    }
	    //点亮当前原点
	    function showPoint() {
	        for (var i = 0; i < _point.length; i++) {
	            $(_point[i]).removeClass('on');
	        };
	        $(_point[index]).addClass('on');
	    }
	    //滚动函数
	    function animate(wid, num) {
	        //wid是绝对偏移量，带符号
	        _super.animated = true;
	        stopAuto();
	        if (wid == 0) {
	            return;
	        };
	        var time = _super.sliderWidth / 1000; //滚动时间
	        var left; //目的偏移量
	        var leftCorrt; //当前偏移量
	        var stat = 0; //记录动画次数
	
	        $.each(Children, function () {
	            leftCorrt = parseInt(this.style.left);
	            left = leftCorrt + wid;
	
	            //移动相对位置
	            if (Math.abs(left) > Math.abs((_const - (p + 1)) * _super.sliderWidth)) {
	                $(this).css('z-index', '-999');
	                if (wid > 0) {
	                    left = wid + leftCorrt - _const * _super.sliderWidth;
	                } else {
	                    left = wid + leftCorrt + _const * _super.sliderWidth;
	                }
	            };
	
	            if (left == 0) {
	                $(this).css('z-index', '999');
	            };
	            if (wid > 0) {
	                if (leftCorrt == 0 && left == -_super.sliderWidth) {
	                    $(this).css('z-index', '888');
	                }
	            } else {
	                if (leftCorrt == 0 && left == _super.sliderWidth) {
	                    $(this).css('z-index', '888');
	                }
	            }
	            //移动
	            brandText.children.filter('.on').removeClass('on');
	            brandText.brandTexts.filter('.on').removeClass('on');
	            brandText.brandTexts.eq(num - 1).addClass('on');
	            brandText.children.eq(num - 1).addClass('on');
	            brandText.brandTextTitle.text(brandText.children.eq(num - 1).text());
	            $(this).animate({ left: left }, { quequ: false, complete: function () {
	                    stat++;
	                    if (stat == _const) {
	                        //监听移动次数以便允许用户其他操作
	                        _super.animated = false;
	                        $.each(Children, function () {
	                            $(this).css('z-index', '0');
	                        });
	                    };
	                } });
	        });
	    }
	
	    //窗口Resize
	    var resizeId;
	    var win = $(window);
	    win.resize(function () {
	        clearTimeout(resizeId);
	        resizeId = setTimeout(function () {
	            reBuild();
	        }, 500);
	    });
	
	    function reBuild() {
	        var preWidth = _super.sliderWidth;
	        _super.sliderWidth = Math.round($(_super).width());
	        $.each(Children, function (i) {
	            $(this).attr({ 'width': _super.sliderWidth + 'px' });
	            console.log(Math.round(parseInt($(this).css('left')) / preWidth) * _super.sliderWidth + 'px');
	            $(this).css({ 'left': Math.round(parseInt($(this).css('left')) / preWidth) * _super.sliderWidth + 'px' });
	            console.log($(this).css('left'));
	        });
	    }
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ 1)))

/***/ },
/* 37 */
/*!*****************************!*\
  !*** ./src/js/newSlider.js ***!
  \*****************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {$.fn.newsSliderFunc = function (obj) {
	    var _super = this;
	    _super.animated = false;
	    var _const = _super.children().length;
	    var timer;
	    var _point = 'point';
	    var index = 0; //记录点击
	    _super.sliderWidth = Math.round($(_super).width() / 8);
	    var _stat = false;
	
	    var Children = $(_super).children();
	    var p = 1; //错位个数
	    var start = {},
	        current = {};
	    var arrLeft = $(".newsArr>.dg-nextArr");
	    var arrRight = $(".newsArr>.dg-prevArr");
	    var arrLeftOn = $("#blackMaskNew>.dg-nextArr");
	    var arrRightOn = $("#blackMaskNew>.dg-prevArr");
	    var bannerList = Children.children();
	    var windowWidth = $(window).width();
	    var thisSrc;
	    //动态设置滚动元素的宽度，left和index编号
	    $.each(Children, function (i) {
	        $(this).attr({ 'index': i });
	        $(this).css({ 'width': _super.sliderWidth + 'px', 'left': ($(this).attr('index') - 1) * _super.sliderWidth + 'px' });
	        $(this).attr({ 'index': i });
	        if (i == 0) {
	            $(this).attr('index', _const);
	        };
	    });
	    //当需要显示原点时
	    if (_stat) {
	        //动态生成原点盒子
	        var div = document.createElement("div");
	        div.setAttribute('id', _point);
	        _point = "#point";
	        $(_super).after(div);
	        //动态生成原点
	        for (var i = 0; i < _const; i++) {
	            var _pointChild = document.createElement("span");
	            _pointChild.setAttribute('index', i + 1);
	            $(_point).append(_pointChild);
	        };
	        var _point = $(_point).children();
	        _point[0].className = 'on';
	    };
	
	    $(_super).on('touchstart', '', pageStart);
	    $(_super).on('touchmove', '', pageMove);
	    $(_super).on('touchend', '', pageEnd);
	    arrLeft.on('click', '', Arrow_l);
	    arrRight.on('click', '', Arrow_r);
	    arrLeftOn.on('click', '', Arrow_lOn);
	    arrRightOn.on('click', '', Arrow_rOn);
	    // $(_super).on('click','',function(){
	    //     var num=parseInt($(_point).filter('.on').attr('index'))+1;
	    //     if (num==_const+1) {
	    //         num=1;
	    //     };
	    //      pageClick(num);
	    // });  
	    //autoPlay(_super.sliderWidth);//自动滚动
	    function Arrow_lOn() {
	        console.log("click");
	        var pre = bannerList.filter('.currentNew');
	        if (pre.attr('index') == 0) {
	            return;
	        };
	        if (pre.attr('index') == pre.parent().children().first().attr('index')) {
	            Arrow_l();
	            pre.removeClass('currentNew');
	            var next = pre.parent().prev().children().last();
	            next.addClass('currentNew');
	            thisSrc = next.attr('data-url');
	            ajaxGetNews(next, thisSrc);
	            $.maskBool = true;
	        } else {
	            pre.removeClass('currentNew');
	            var next = pre.prev();
	            next.addClass('currentNew');
	            thisSrc = next.attr('data-url');
	            ajaxGetNews(next, thisSrc);
	            $.maskBool = true;
	        }
	    }
	    function Arrow_rOn() {
	        console.log("click");
	        var pre = bannerList.filter('.currentNew');
	        if (pre.attr('index') == bannerList.length - 1) {
	            return;
	        };
	        if (pre.attr('index') == pre.parent().children().last().attr('index')) {
	            Arrow_r();
	            pre.removeClass('currentNew');
	            var next = pre.parent().next().children().first();
	            next.addClass('currentNew');
	            thisSrc = next.attr('data-url');
	            ajaxGetNews(next, thisSrc);
	            $.maskBool = true;
	        } else {
	            pre.removeClass('currentNew');
	            var next = pre.next();
	            next.addClass('currentNew');
	            thisSrc = next.attr('data-url');
	            ajaxGetNews(next, thisSrc);
	            $.maskBool = true;
	        }
	    }
	    // pageClick
	    function pageClick(num) {
	        if (!_super.animated) {
	            var from = 0;
	            var sw;
	            to = num;
	            $.each(Children, function () {
	                if (parseInt(this.style.left) == 0) {
	                    from = parseInt($(this).attr('index'));
	                };
	            });
	            console.log('from:' + from + '     to:' + to);
	
	            if (from == to) {
	                return;
	            } else {
	                sw = (from - to) * _super.sliderWidth;
	            }
	            index = to - 1;
	            showPoint();
	            animate(sw, to);
	        }
	    }
	    //pageMove
	    function pageMove(e) {}
	    //e.preventDefault();
	
	    //pageStart
	    function pageStart(e) {
	        if (start.active) return;
	        if (e.originalEvent.touches.length < 2) {
	            start.x = e.originalEvent.touches[0].pageX;
	            start.when = new Date().getTime();
	            start.active = true;
	        }
	    }
	    //pageEnd
	    function pageEnd(e) {
	        current.x = e.originalEvent.changedTouches[0].pageX;
	        start.active = false;
	        if (isSwipe(e)) {
	            if (current.x - start.x < 0) {
	                Arrow_r(_super.sliderWidth);
	            } else {
	                Arrow_l(_super.sliderWidth);
	            }
	        }
	    }
	    //是否到达滑动的条件
	    function isSwipe(e) {
	        var duration = new Date().getTime() - start.when;
	        var xdist;
	        xdist = current.x - start.x;
	        return duration < 500 && 100 < Math.abs(xdist);
	    }
	    //向左滚动一页
	    function Arrow_r() {
	
	        if (!_super.animated) {
	            if (windowWidth > 1000 && parseInt(Children.eq(Children.length - 2).css('left'), 10) == 0) {
	                return;
	            } else if (windowWidth <= 1000 && parseInt(Children.eq(Children.length - 1).css('left'), 10) == 0) {
	                return;
	            }
	            index++;
	            if (index == _const) {
	                index = 0;
	            }
	
	            if (_stat) {
	                showPoint();
	            };
	            //
	            animate(-_super.sliderWidth, index + 1);
	        }
	    }
	    //向右滚动一页
	    function Arrow_l() {
	        if (parseInt(Children.eq(0).css('left'), 10) == 0) {
	            return;
	        } else if (!_super.animated) {
	            index--;
	            if (index == -1) {
	                index = _const - 1;
	            }
	            if (_stat) {
	                showPoint();
	            };
	
	            animate(_super.sliderWidth, index + 1);
	        }
	    }
	    //自动向左滚动
	    function autoPlay() {
	        timer = setInterval(function () {
	            Arrow_r();
	        }, 5000);
	    }
	    //停止自动滚动
	    function stopAuto() {
	        clearInterval(timer);
	    }
	    //点亮当前原点
	    function showPoint() {
	        for (var i = 0; i < _point.length; i++) {
	            $(_point[i]).removeClass('on');
	        };
	        $(_point[index]).addClass('on');
	    }
	    //滚动函数
	    function animate(wid, num) {
	        //wid是绝对偏移量，带符号
	        _super.animated = true;
	        stopAuto();
	        if (wid == 0) {
	            return;
	        };
	        var time = _super.sliderWidth / 1000; //滚动时间
	        var left; //目的偏移量
	        var leftCorrt; //当前偏移量
	        var stat = 0; //记录动画次数
	
	        $.each(Children, function () {
	            leftCorrt = parseInt(this.style.left);
	            left = leftCorrt + wid;
	
	            /*//移动相对位置
	             if (Math.abs(left)>Math.abs((_const-(p+1))*_super.sliderWidth)) {
	                 $(this).css('z-index','-999');
	                 if (wid>0) {
	                     left=wid+leftCorrt-(_const)*_super.sliderWidth;
	                 }else{
	                     left=wid+leftCorrt+(_const)*_super.sliderWidth;
	                 }
	             };*/
	
	            if (left == 0) {
	                $(this).css('z-index', '999');
	            };
	            if (wid > 0) {
	                if (leftCorrt == 0 && left == -_super.sliderWidth) {
	                    $(this).css('z-index', '888');
	                }
	            } else {
	                if (leftCorrt == 0 && left == _super.sliderWidth) {
	                    $(this).css('z-index', '888');
	                }
	            }
	            //移动
	            $(this).animate({ left: left }, { quequ: false, complete: function () {
	                    stat++;
	                    if (stat == _const) {
	                        //监听移动次数以便允许用户其他操作
	                        _super.animated = false;
	                        $.each(Children, function () {
	                            $(this).css('z-index', '0');
	                        });
	                    };
	                    $.maskBool = false;
	                } });
	        });
	    }
	
	    //窗口Resize
	    var resizeId;
	    var win = $(window);
	    win.resize(function () {
	        clearTimeout(resizeId);
	        resizeId = setTimeout(function () {
	            reBuild();
	        }, 500);
	    });
	
	    function reBuild() {
	        windowWidth = $(window).width();
	        var preWidth = _super.sliderWidth;
	        _super.sliderWidth = Math.round($(_super).children().eq(0).width());
	        if (parseInt(Children.eq(Children.length - 1).css("left"), 10) != 0) {
	            $.each(Children, function (i) {
	                $(this).attr({ 'width': _super.sliderWidth + 'px' });
	                $(this).css({ 'left': Math.round(parseInt($(this).css('left')) / preWidth) * _super.sliderWidth + 'px' });
	            });
	        } else {
	            $.each(Children, function (i) {
	                $(this).attr({ 'width': _super.sliderWidth + 'px' });
	                $(this).css({ 'left': (Math.round(parseInt($(this).css('left')) / preWidth) + 1) * _super.sliderWidth + 'px' });
	            });
	        }
	    }
	
	    function ajaxGetNews(obj, srcStr) {
	        $.ajax({
	            type: "GET",
	            url: srcStr,
	            dataType: "json",
	            success: function (data) {
	                var text = '';
	                if (obj.children().filter('.newsImg').children().length == 0) {
	                    text += '<div class="newTitleOpen" style="text-align: center;">' + data.title + '</div><div class="newDataOpen" style="text-align: center;padding: 20px 40px;">' + data.date + '</div><div class="boxScorll  Liz-scroll ">' + unescape(data.content) + '</div>';
	                    $('#lookOnlyNew').next().text(data.title);
	                    $('#lookOnlyNew').html(text);
	                } else {
	                    text += '<video id="newvideoShow" controls="controls" src="' + data.videoUrl + '"class="selected">您的浏览器不支持html5视频 </video>';
	                    $('#lookOnlyNew').next().text(data.title);
	                    $('#lookOnlyNew').html(text);
	                    $('#newvideoShow').get(0).play();
	                }
	            },
	            err: function () {
	                console.log("出错啦~~~~");
	            }
	        });
	    }
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ 1)))

/***/ },
/* 38 */
/*!*************************************!*\
  !*** ./src/js/jquery.easing.1.3.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(jQuery) {/*
	 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
	 *
	 * Uses the built in easing capabilities added In jQuery 1.1
	 * to offer multiple easing options
	 *
	 * TERMS OF USE - jQuery Easing
	 * 
	 * Open source under the BSD License. 
	 * 
	 * Copyright © 2008 George McGinley Smith
	 * All rights reserved.
	 * 
	 * Redistribution and use in source and binary forms, with or without modification, 
	 * are permitted provided that the following conditions are met:
	 * 
	 * Redistributions of source code must retain the above copyright notice, this list of 
	 * conditions and the following disclaimer.
	 * Redistributions in binary form must reproduce the above copyright notice, this list 
	 * of conditions and the following disclaimer in the documentation and/or other materials 
	 * provided with the distribution.
	 * 
	 * Neither the name of the author nor the names of contributors may be used to endorse 
	 * or promote products derived from this software without specific prior written permission.
	 * 
	 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
	 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
	 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
	 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
	 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
	 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
	 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
	 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
	 * OF THE POSSIBILITY OF SUCH DAMAGE. 
	 *
	*/
	
	// t: current time, b: begInnIng value, c: change In value, d: duration
	jQuery.easing['jswing'] = jQuery.easing['swing'];
	
	jQuery.extend(jQuery.easing, {
		def: 'easeOutQuad',
		swing: function (x, t, b, c, d) {
			//alert(jQuery.easing.default);
			return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
		},
		easeInQuad: function (x, t, b, c, d) {
			return c * (t /= d) * t + b;
		},
		easeOutQuad: function (x, t, b, c, d) {
			return -c * (t /= d) * (t - 2) + b;
		},
		easeInOutQuad: function (x, t, b, c, d) {
			if ((t /= d / 2) < 1) return c / 2 * t * t + b;
			return -c / 2 * (--t * (t - 2) - 1) + b;
		},
		easeInCubic: function (x, t, b, c, d) {
			return c * (t /= d) * t * t + b;
		},
		easeOutCubic: function (x, t, b, c, d) {
			return c * ((t = t / d - 1) * t * t + 1) + b;
		},
		easeInOutCubic: function (x, t, b, c, d) {
			if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
			return c / 2 * ((t -= 2) * t * t + 2) + b;
		},
		easeInQuart: function (x, t, b, c, d) {
			return c * (t /= d) * t * t * t + b;
		},
		easeOutQuart: function (x, t, b, c, d) {
			return -c * ((t = t / d - 1) * t * t * t - 1) + b;
		},
		easeInOutQuart: function (x, t, b, c, d) {
			if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
			return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
		},
		easeInQuint: function (x, t, b, c, d) {
			return c * (t /= d) * t * t * t * t + b;
		},
		easeOutQuint: function (x, t, b, c, d) {
			return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
		},
		easeInOutQuint: function (x, t, b, c, d) {
			if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
			return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
		},
		easeInSine: function (x, t, b, c, d) {
			return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
		},
		easeOutSine: function (x, t, b, c, d) {
			return c * Math.sin(t / d * (Math.PI / 2)) + b;
		},
		easeInOutSine: function (x, t, b, c, d) {
			return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
		},
		easeInExpo: function (x, t, b, c, d) {
			return t == 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
		},
		easeOutExpo: function (x, t, b, c, d) {
			return t == d ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
		},
		easeInOutExpo: function (x, t, b, c, d) {
			if (t == 0) return b;
			if (t == d) return b + c;
			if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
			return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
		},
		easeInCirc: function (x, t, b, c, d) {
			return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
		},
		easeOutCirc: function (x, t, b, c, d) {
			return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
		},
		easeInOutCirc: function (x, t, b, c, d) {
			if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
			return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
		},
		easeInElastic: function (x, t, b, c, d) {
			var s = 1.70158;var p = 0;var a = c;
			if (t == 0) return b;if ((t /= d) == 1) return b + c;if (!p) p = d * .3;
			if (a < Math.abs(c)) {
				a = c;var s = p / 4;
			} else var s = p / (2 * Math.PI) * Math.asin(c / a);
			return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
		},
		easeOutElastic: function (x, t, b, c, d) {
			var s = 1.70158;var p = 0;var a = c;
			if (t == 0) return b;if ((t /= d) == 1) return b + c;if (!p) p = d * .3;
			if (a < Math.abs(c)) {
				a = c;var s = p / 4;
			} else var s = p / (2 * Math.PI) * Math.asin(c / a);
			return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
		},
		easeInOutElastic: function (x, t, b, c, d) {
			var s = 1.70158;var p = 0;var a = c;
			if (t == 0) return b;if ((t /= d / 2) == 2) return b + c;if (!p) p = d * (.3 * 1.5);
			if (a < Math.abs(c)) {
				a = c;var s = p / 4;
			} else var s = p / (2 * Math.PI) * Math.asin(c / a);
			if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
			return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
		},
		easeInBack: function (x, t, b, c, d, s) {
			if (s == undefined) s = 1.70158;
			return c * (t /= d) * t * ((s + 1) * t - s) + b;
		},
		easeOutBack: function (x, t, b, c, d, s) {
			if (s == undefined) s = 1.70158;
			return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
		},
		easeInOutBack: function (x, t, b, c, d, s) {
			if (s == undefined) s = 1.70158;
			if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
			return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
		},
		easeInBounce: function (x, t, b, c, d) {
			return c - jQuery.easing.easeOutBounce(x, d - t, 0, c, d) + b;
		},
		easeOutBounce: function (x, t, b, c, d) {
			if ((t /= d) < 1 / 2.75) {
				return c * (7.5625 * t * t) + b;
			} else if (t < 2 / 2.75) {
				return c * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + b;
			} else if (t < 2.5 / 2.75) {
				return c * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + b;
			} else {
				return c * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + b;
			}
		},
		easeInOutBounce: function (x, t, b, c, d) {
			if (t < d / 2) return jQuery.easing.easeInBounce(x, t * 2, 0, c, d) * .5 + b;
			return jQuery.easing.easeOutBounce(x, t * 2 - d, 0, c, d) * .5 + c * .5 + b;
		}
	});
	
	/*
	 *
	 * TERMS OF USE - EASING EQUATIONS
	 * 
	 * Open source under the BSD License. 
	 * 
	 * Copyright © 2001 Robert Penner
	 * All rights reserved.
	 * 
	 * Redistribution and use in source and binary forms, with or without modification, 
	 * are permitted provided that the following conditions are met:
	 * 
	 * Redistributions of source code must retain the above copyright notice, this list of 
	 * conditions and the following disclaimer.
	 * Redistributions in binary form must reproduce the above copyright notice, this list 
	 * of conditions and the following disclaimer in the documentation and/or other materials 
	 * provided with the distribution.
	 * 
	 * Neither the name of the author nor the names of contributors may be used to endorse 
	 * or promote products derived from this software without specific prior written permission.
	 * 
	 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
	 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
	 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
	 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
	 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
	 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
	 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
	 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
	 * OF THE POSSIBILITY OF SUCH DAMAGE. 
	 *
	 */
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ 1)))

/***/ },
/* 39 */
/*!**********************************!*\
  !*** ./src/js/lookbookSlider.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(jQuery) {
	/**
	 * 这里要说明的是为什么采用三层嵌套
	 * 1、banner块是absolute，因为手风琴效果，需要考虑最后一块被展开时前面的元素块将向前滑动
	 * 2、banner需要父元素包裹并以其作为参考对象，故section_banner_wrapper为relative
	 * 3、左右箭头被点击，我采用整体移动，所以在section_banner_wrapper外包裹了一个absolute的section_banner
	 * @return {[type]}     [description]
	 */
	(function ($, window) {
		//initSectionBanner = function(obj){
		//var $this=$(this);
		$.fn.initSectionBanner = function () {
			var $this = $(this);
			$this.ww = Math.round(parseInt($this.parent().parent().width(), 10));
			$this.section_banner = $this.children().filter(".section_banner");
			$this._const = $this.section_banner.length;
			$this.animated = true;
	
			$this.init = function init() {
				if (Math.round(parseInt($("body").width(), 10)) <= 1000) {
					//小屏
					$this.bannerW = $this.ww;
					boxSize($this.bannerW);
					$this.on('touchstart', '', pageStart);
					$this.on('touchmove', '', pageMove);
					$this.on('touchend', '', pageEnd);
					var start = {},
					    current = {};
					//pageStart
					function pageStart(e) {
						if (start.active) return;
						if (e.originalEvent.touches.length < 2) {
							start.x = e.originalEvent.touches[0].pageX;
							start.when = new Date().getTime();
							start.active = true;
						}
					}
					//pageMove
					function pageMove(e) {}
					//e.preventDefault();
	
					//pageEnd
					function pageEnd(e) {
						current.x = e.originalEvent.changedTouches[0].pageX;
						start.active = false;
						if (isSwipe(e)) {
							if (current.x - start.x < 0) {
								$this.Arrow_r($this.bannerW);
							} else {
								$this.Arrow_l($this.bannerW);
							}
						}
					}
					//是否到达滑动的条件
					function isSwipe(e) {
						var duration = new Date().getTime() - start.when;
						var xdist;
						xdist = current.x - start.x;
						return duration < 500 && 100 < Math.abs(xdist);
					}
				} else {
					//大屏
					//初始化
					$this.bannerW = $this.ww / 8;
					boxSize($this.bannerW);
					//悬停手风琴效果
					$this.section_banner.mouseenter(function () {
						if ($this.animated) {
							var indx = $this.section_banner.index(this);
							var indxNode = $this.section_banner[indx];
							var chunk;
							for (var i = 0; i < $this._const; i++) {
								if (i < indx) {
									chunk = {
										width: $this.bannerW,
										left: $this.bannerW * (i - 1)
									};
								} else if (i == indx) {
									if (i == 0) {
										chunk = {
											width: $this.bannerW * 2,
											left: $this.bannerW * i
										};
									} else {
										chunk = {
											width: $this.bannerW * 2,
											left: $this.bannerW * (i - 1)
										};
									}
								} else {
									if (indx != 0) {
										chunk = {
											width: $this.bannerW,
											left: $this.bannerW * i
										};
									} else {
										chunk = {
											width: $this.bannerW,
											left: $this.bannerW * (i + 1)
										};
									}
								}
								$this.section_banner.eq(i).clearQueue().stop().animate(chunk, $this.bannerW * 2, "easeOutExpo");
							}
						};
					});
					//鼠标移出，初始恢复状态
					$this.mouseleave(function (e) {
						for (var i = 0; i < $this._const; i++) {
							$this.section_banner.eq(i).clearQueue().stop().animate({
								width: $this.bannerW,
								left: $this.bannerW * i
							}, $this.bannerW * 2, "easeOutExpo");
						}
						e.stopPropagation();
					});
				};
				$this.bind('reload', '', function () {
					$this.section_banner = $this.children().filter(".section_banner");
					$this._const = $this.section_banner.length;
					$this.init();
				});
				if (parseInt($(window).width(), 10) >= 1000) {
					bindClick();
				} else {
					if ($this.attr('id').slice(-3, -2) == '3') {
						bindClick();
					};
				} //左右箭头绑定点击事件
				$("#move_left").click(function () {
					if ($this.hasClass('block')) {
						$this.Arrow_l();
					} else {
						return;
					}
				});
				$("#move_right").click(function () {
					if ($this.hasClass('block')) {
						$this.Arrow_r();
					} else {
						return;
					}
				});
	
				$("#lookbookMask>.dg-nextArr").click(function () {
					if ($this.hasClass('block')) {
						$this.nextClick();
					} else {
						return;
					}
				});
				$("#lookbookMask>.dg-prevArr").click(function () {
					if ($this.hasClass('block')) {
						$this.prevClick();
					} else {
						return;
					}
				});
				return $this;
			};
			$this.init();
			function bindClick() {
				$this.section_banner.click(function () {
	
					loadBigLook($(this));
				});
			}
			//初始化尺寸
			function boxSize(wwww) {
				$this.section_banner.each(function () {
					$(this).css({
						left: wwww * $this.section_banner.index(this),
						width: wwww + 'px'
					});
				});
			}
	
			function loadBigLook(obj) {
				$('#fullpage').bindScroll();
				$this.section_banner.each(function () {
					$(this).removeClass('currtBigLook');
				});
				obj.addClass('currtBigLook');
				$('#lookOnly').removeClass('block').addClass('none');
				var thisSrc = obj.children().filter(".section_banner_img").attr('data-url');
				if ($this.attr('id').slice(-3, -2) == '3' && $('#video').hasClass('active')) {
					$('#videoShow').attr('src', thisSrc);
					$('#videoShow').get(0).play();
					$('#videoMask').removeClass('none').addClass('block');
				} else {
					$("#lookbookMask").removeClass('none').addClass('block');
					$('#blackMaskAll').removeClass('none').addClass('block');
					$('#loadLook').removeClass('none').addClass('block');
					var lookOnly = new Image();
					lookOnly.src = thisSrc;
					lookOnly.onload = function () {
						$('#loadLook').removeClass('block').addClass('none');
						$('#lookOnly').attr('src', thisSrc);
						$('#lookOnly').removeClass('none').addClass('block');
					};
				}
			}
	
			$this.nextClick = function () {
				var prv = $this.section_banner.filter('.currtBigLook');
				if (prv.prev().length == 0) {
					return;
				}
				prv.removeClass('currtBigLook');
				var now = prv.prev();
				loadBigLook(now);
				$this.Arrow_lStatic();
			};
			$this.prevClick = function () {
				var prv = $this.section_banner.filter('.currtBigLook');
				if (prv.next().length == 0) {
					return;
				}
				prv.removeClass('currtBigLook');
				var now = prv.next();
				loadBigLook(now);
				$this.Arrow_rStatic();
			};
			//left增大
			$this.Arrow_l = function () {
				if ($this.animated) {
					$this.animated = false;
					var _this = $(this);
					console.log('vijfdoivm,');
					//event.preventDefault();
					//event.stopPropagation();
					if (parseInt($this.parent().css("left"), 10) >= 0) {
						$this.animated = true;
						return;
					};
					Animate($this.bannerW);
					return false;
				}
			};
			//left变小
			$this.Arrow_r = function () {
				if ($this.animated) {
					$this.animated = false;
					var _this = $(this);
					//event.preventDefault();
					//event.stopPropagation();
					//此处的5是避免误差
					if (parseInt($this.parent().css("left"), 10) + $this.bannerW * $this._const <= $this.ww + 20) {
						$this.animated = true;
						return;
					};
					Animate(-$this.bannerW);
	
					return false;
				}
			};
			//left增大
			$this.Arrow_lStatic = function () {
				if ($this.animated) {
					$this.animated = false;
					var _this = $(this);
					console.log('sdhbcjk');
					if (parseInt($this.parent().css("left"), 10) >= 0) {
						$this.animated = true;
						return;
					};
					AnimateStaitic($this.bannerW);
					return false;
				}
			};
			//left变小
			$this.Arrow_rStatic = function () {
				if ($this.animated) {
					$this.animated = false;
					var _this = $(this);
					//此处的5是避免误差
					if (parseInt($this.parent().css("left"), 10) + $this.bannerW * $this._const <= $this.ww + 20) {
						$this.animated = true;
						return;
					};
					AnimateStaitic(-$this.bannerW);
	
					return false;
				}
			};
			//动画
			function Animate(wd) {
				$this.parent().animate({
					left: parseInt($this.parent().css("left"), 10) + wd
				}, {
					duration: 750,
					easing: "easeOutExpo",
					complete: function () {
						$this.animated = true;
					}
				});
			}
			function AnimateStaitic(wd) {
				$this.parent().css({ left: parseInt($this.parent().css("left"), 10) + wd });
				$this.animated = true;
			}
		};
	})(jQuery, window);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ 1)))

/***/ },
/* 40 */
/*!******************************!*\
  !*** ./src/js/joinSlider.js ***!
  \******************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {$.fn.joinsliderFunc = function () {
	    var _super = this;
	    _super.animated = false;
	    var _const = _super.children().length;
	    var timer;
	    var _point = '#joinPoint';
	    var index = 1; //记录点击
	    _super.sliderWidth = Math.round($(_super).width() / _const);
	    var _stat = true;
	
	    var Children = $(_super).children();
	    var p = 1; //错位个数
	    var start = {},
	        current = {};
	    //动态设置滚动元素的宽度，left和index编号
	    $.each(Children, function (i) {
	        $(this).attr({ 'index': i + 1 });
	    });
	    init();
	    function init() {
	        var $this = $(this);
	        $this.on('Arrow_right', function () {
	            Arrow_r();
	        });
	        $this.on('Arrow_left', function () {
	            Arrow_l();
	        });
	        return $this;
	    }
	
	    //当需要显示原点时
	    if (_stat) {
	        //动态生成原点盒子
	        var div = document.createElement("div");
	        div.setAttribute('id', 'joinPoint');
	        $(_super).after(div);
	        //动态生成原点
	        for (var i = 0; i < _const; i++) {
	            var _pointChild = document.createElement("span");
	            _pointChild.setAttribute('index', i + 1);
	            $(_point).append(_pointChild);
	        };
	        var _point = $(_point).children();
	        _point.eq(0).addClass('on');
	    };
	
	    $(_super).on('touchstart', '', pageStart);
	    $(_super).on('touchmove', '', pageMove);
	    $(_super).on('touchend', '', pageEnd);
	    //pageMove
	    function pageMove(e) {}
	    //e.preventDefault();
	
	    //pageStart
	    function pageStart(e) {
	        if (start.active) return;
	        if (e.originalEvent.touches.length < 2) {
	            start.x = e.originalEvent.touches[0].pageX;
	            start.when = new Date().getTime();
	            start.active = true;
	        }
	    }
	    //pageEnd
	    function pageEnd(e) {
	        current.x = e.originalEvent.changedTouches[0].pageX;
	        start.active = false;
	        if (isSwipe(e)) {
	            if (current.x - start.x < 0) {
	                if (Math.round(parseInt($(_super).css("left"), 10)) <= -_super.sliderWidth * 3) {
	                    start.active = true;return;
	                };
	                Arrow_r(_super.sliderWidth);
	            } else {
	                if (Math.round(parseInt($(_super).css("left"), 10)) >= 0) {
	                    start.active = true;return;
	                };
	                Arrow_l(_super.sliderWidth);
	            }
	        }
	    }
	    //是否到达滑动的条件
	    function isSwipe(e) {
	        var duration = new Date().getTime() - start.when;
	        var xdist;
	        xdist = current.x - start.x;
	        return duration < 500 && 100 < Math.abs(xdist);
	    }
	    //向左滚动一页
	    function Arrow_r() {
	        if (!_super.animated) {
	            if (index >= _const) {
	                return;
	            }
	            index++;
	
	            if (_stat) {
	                showPoint();
	            };
	            //
	            animate(-_super.sliderWidth);
	        }
	    }
	    //向右滚动一页
	    function Arrow_l() {
	        if (!_super.animated) {
	            if (index <= 1) {
	                return;
	            }
	            index--;
	            if (_stat) {
	                showPoint();
	            };
	
	            animate(_super.sliderWidth);
	        }
	    }
	    //点亮当前原点
	    function showPoint() {
	        for (var i = 0; i < _point.length; i++) {
	            $(_point[i]).removeClass('on');
	        };
	        $(_point[index - 1]).addClass('on');
	    }
	    //滚动函数
	    function animate(wid) {
	        //wid是绝对偏移量，带符号
	        _super.animated = true;
	        Children.filter('.on').removeClass('on');
	        Children.eq(parseInt($(_super).css("left"), 10) / wid + 1).addClass('on');
	        $(_super).animate({
	            left: parseInt($(_super).css("left"), 10) + wid
	        }, {
	            quequ: false,
	            complete: function () {
	                _super.animated = false;
	            }
	        });
	    }
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ 1)))

/***/ },
/* 41 */
/*!*************************************!*\
  !*** ./src/js/joinSliderContent.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {$.fn.joinsliderContentFunc = function (_w) {
	    var _super = this;
	    _super.animated = false;
	    var _const = _super.children().length;
	    var timer;
	    var _point = '#join .joinBox>.boxItem';
	    var index = 1; //记录点击
	    _super.sliderWidth = _w;
	
	    var Children = $(_super).children();
	    var p = 1; //错位个数
	    var start = {},
	        current = {};
	    var arrLeft = $("#joinBoxContent .dg-nextArr");
	    var arrRight = $("#joinBoxContent .dg-prevArr");
	    var $this = $(_super);
	    arrLeft.on('click', '', Arrow_l);
	    arrRight.on('click', '', Arrow_r);
	    init();
	
	    function init() {
	        $this.on('reload', function (event, onIndex) {
	            console.log('index:' + onIndex);
	            onIndex = parseInt(onIndex, 10);
	            index = onIndex;
	            $(_super).css('left', -(onIndex - 1) * _w);
	        });
	        return $this;
	    }
	
	    //动态设置滚动元素的宽度，left和index编号
	    $.each(Children, function (i) {
	        $(this).attr({ 'index': i + 1 });
	    });
	    var _point = $(_point);
	    $(_point[0]).addClass('on');
	
	    $(_super).on('touchstart', '', pageStart);
	    $(_super).on('touchmove', '', pageMove);
	    $(_super).on('touchend', '', pageEnd);
	    //pageMove
	    function pageMove(e) {}
	    //e.preventDefault();
	
	    //pageStart
	    function pageStart(e) {
	        if (start.active) return;
	        if (e.originalEvent.touches.length < 2) {
	            start.x = e.originalEvent.touches[0].pageX;
	            start.when = new Date().getTime();
	            start.active = true;
	        }
	    }
	    //pageEnd
	    function pageEnd(e) {
	        current.x = e.originalEvent.changedTouches[0].pageX;
	        start.active = false;
	        if (isSwipe(e)) {
	            if (current.x - start.x < 0) {
	                if (Math.round(parseInt($(_super).css("left"), 10)) <= -_super.sliderWidth * 3) {
	                    start.active = true;
	                    return;
	                };
	                Arrow_r(_super.sliderWidth);
	            } else {
	                if (Math.round(parseInt($(_super).css("left"), 10)) >= 0) {
	                    start.active = true;
	                    return;
	                };
	                Arrow_l(_super.sliderWidth);
	            }
	        }
	    }
	    //是否到达滑动的条件
	    function isSwipe(e) {
	        var duration = new Date().getTime() - start.when;
	        var xdist;
	        xdist = current.x - start.x;
	        return duration < 500 && 100 < Math.abs(xdist);
	    }
	    //向左滚动一页
	    function Arrow_r() {
	        if (!_super.animated) {
	            if (index >= _const) {
	                return;
	            }
	            index++;
	
	            //
	            animate(-_super.sliderWidth);
	            $('#join .joinBox').trigger('Arrow_right');
	        }
	    }
	    //向右滚动一页
	    function Arrow_l() {
	        if (!_super.animated) {
	            if (index <= 1) {
	                return;
	            }
	            index--;
	            animate(_super.sliderWidth);
	            $('#join .joinBox').trigger('Arrow_left');
	        }
	    }
	
	    //滚动函数
	    function animate(wid) {
	        //wid是绝对偏移量，带符号
	        _super.animated = true;
	        console.log($(_super).css("left"));
	        console.log(wid);
	        $(_super).animate({
	            left: parseInt($(_super).css("left"), 10) + wid
	        }, {
	            quequ: false,
	            complete: function () {
	                _super.animated = false;
	            }
	        });
	    }
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ 1)))

/***/ },
/* 42 */
/*!************************!*\
  !*** ./src/js/ajax.js ***!
  \************************/
/***/ function(module, exports) {



/***/ }
]);
//# sourceMappingURL=index.bundle.js.map