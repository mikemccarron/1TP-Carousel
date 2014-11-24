Carousel = function($id){
	var _self 		= this;
	var $ele 		= $($id);
	var $wrap 		= $ele.find('.wrapper');
	var active 		= true;

	var $timer;
	var $counter 	= 0;
	var $csstransitionsSupport = $('.csstransitions').length===0 ? 'false' : 'true';

	var $slides 	= $ele.find('.slides');
	var $slideCount = $slides.length;

	var $indicators = $('[data-parent-carousel="'+$id+'"]');

	var $w;

	this.init = function(){
		active = true;
		_self.resize();
		_self.indicators();

		$(window).resize(function(event) {
			if(active) _self.resize();
		});
	};

	this.resize = function(){
		$w = $ele.outerWidth();
		$wrap.width( $w * $slideCount );
		$slides.width( $w );

		TweenLite.set($wrap, {css: { marginLeft: -$w*$counter } });
	};

	this.isActive = function(){
		return active;
	};

	this.indicators = function(){


		if($indicators!==undefined){

			var omniture = '';

			if( $indicators.data('omniture') ){
				omniture = ' onclick="omn_rmaction('+$indicators.data('omniture')+')"';
			}

			for (var i = 0; i < $slideCount; i++) {
				var cls = i===0 ? ' class="active"' : '';
				$indicators.append('<a href="#slide-'+i+'"'+cls+''+omniture+'>&#8226;</a>');
			}
		}

		$indicators.find('a').on('click', function(e) {
			e.preventDefault();
			_self.clearTimer();
			_self.advanceToSlide($(this).index());
		});
	};

	this.setTimer = function(){
		$timer = window.setInterval(_self.advanceToSlide, 10000);
	};

	this.clearTimer = function(){
		window.clearInterval($timer);
	};

	this.destroy = function(){
		if(active){
			active 	= false;
			$indicators.empty();
			$wrap.removeAttr('style');
			$slides.removeAttr('style');
			_self.clearTimer();
		}
	};

	this.advanceToSlide = function($idx){
		if(!$wrap) return;
		var $distance;
		var $nextEle;

		$nextEle = $indicators.find('.active').next().length!==0 ? $indicators.find('.active').next() : $indicators.find('a').eq(0);
		if($idx!==undefined) $nextEle = $indicators.find('a').eq($idx);

		$indicators.find('.active').removeClass('active');
		$nextEle.addClass('active');

		$counter = $idx===undefined ? $indicators.find('.active').index() : $idx;
		$distance = parseInt(-($ele.outerWidth()*$counter));

		TweenLite.to($wrap, 0.25, { css:{ marginLeft: $distance } });
	};
};
