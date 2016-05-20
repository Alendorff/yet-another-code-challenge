(function(){
	'use strict';
	function Cap(opts){
		var _ = this;
		_.img = new Image();
		_.img.src = 'img/shake/coke_logo_' + AnimatingObject.decideOnImageSize() + 'px.png';
		_.img.onload = function(){
			_._drawConditionFullfilled('imgLoaded');
			_.setDrawProps(Math.min(opts.canv.width,  opts.canv.height),
										 Math.max(opts.canv.width,  opts.canv.height))

		}
		_.ctx = opts.ctx;
		_.fadeDuration = opts.fadeDuration;
		_.waitDuration = opts.waitDuration;
		_.drawConditions = {
			imgLoaded: false,
			started: false,
		}
	}

	Cap.prototype = Object.create(AnimatingObject.prototype);
	Cap.prototype.start = function start(now){
		if(!this.drawConditions.started){
			this._drawConditionFullfilled('started');
			this.startTime = Date.now();
			this.fadeDone = this.startTime + this.fadeDuration;
			this.waitDone = this.fadeDone  + this.waitDuration;
		}
	}

	Cap.prototype.draw = function drawCap(ctx, time){
		if(this.canDraw){
			var alphaVal = Math.min(1, (time - this.startTime) / this.fadeDuration );
			this.ctx.globalAlpha = alphaVal;
			this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
			this.ctx.globalAlpha = 1;
			return this.finished = (time > this.waitDone);
		}
	}

	Cap.prototype.setDrawProps = function setDrawProps(width, height){
		var ratio = this.img.width / this.img.height;
		this.x = width * 0.2,
		this.y = height* 0.28,
		this.width = width * 0.6,
		this.height = this.width * ratio;
	}

	var g = window || global;
	g.Cap = Cap;
})()
