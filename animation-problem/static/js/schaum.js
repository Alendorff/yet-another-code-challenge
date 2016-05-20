(function(){
	'use strict';
	function Foam(opts){
		var _ = this;
		_.img = new Image();
		_.img.src = 'img/shake/schaum_t_' + AnimatingObject.decideOnImageSize() + 'px.png';
		_.img.onload = function(){
			_.setDrawProps(Math.min(opts.canv.width, opts.canv.height),
										 Math.max(opts.canv.height, opts.canv.width));
			_._drawConditionFullfilled('imgLoaded');
		}
		_.ctx = opts.ctx;             // the rendering context
		_.magic = opts.magic;         // number which the foam should rise above 0
		_.downSpeed = opts.downSpeed || 6E-5; // speed down in percent of height per ms
		_.shakeTime = opts.shakeTime || 750;            // ms until foam of one shake goes up
		_.shakesNeeded = opts.shakesNeeded;
		_.cb = opts.cb || function(){};
		_.finished = false;
		_.drawConditions = {
			imgLoaded: false,
			shaken: false,
		};
		_.goal = {
			t: 0,              // time when goal is reached
			startT: Date.now() // time when goal was set
		}
	}

	Foam.prototype = Object.create(AnimatingObject.prototype);

	Foam.prototype.setDrawProps = function setDrawProps(width, height){
		this.x = (width - this.img.width) * .5; // center on x
		this.goal.y = isFinite(this.goal.y)
			? this.goal.y = (this.goal.y / this.maxY) * height
			: this.goal.y = height

		this.maxY = height;
		this.width = this.img.width;
		this.height = this.img.height;
		this.shakeDY = -(height / this.shakesNeeded);
		this.realDownSpeed = this.downSpeed * height;
	}

	Foam.prototype.draw = function drawFoam(ctx, time){
		if(this.canDraw){
			var y = this._getY(time)
			this.ctx.drawImage(this.img, this.x, y, this.width, this.height);
			this.lastDraw = time;
		}
		return this.finished;
	}

	Foam.prototype._getY = function getY(time){
		if(this.finished){
			return Math.max(this.goal.modY + (time - this.goal.startT) * this.goal.dy,
											-this.magic);
		}
		return (this.goal.t < time
						? Math.min(this.maxY, this.goal.y + (time - this.goal.t) * this.realDownSpeed)
						: this.goal.modY + (time - this.goal.startT) * this.goal.dy)
	}

	Foam.prototype.shake = function shake(){
		this._drawConditionFullfilled('shaken');
		if(!this.finished){
			this.started = true;
			var now = Date.now();
			var newGoal = {startT: now, t: now + this.shakeTime};
			var yNow   = this._getY(now);
			newGoal.y  = this.goal.t < now
				? yNow + this.shakeDY
				: this.goal.y + this.shakeDY;
			newGoal.dy = (newGoal.y - yNow ) / this.shakeTime
			newGoal.modY  = yNow;

			this.goal = newGoal;
			this.finished = (this.finished || this.goal.y <= 0);
			if(this.finished){
				this.cb()
			}
		}
		return this.finished
	}

	var g = window || global;
	g.Foam = Foam;
})()
