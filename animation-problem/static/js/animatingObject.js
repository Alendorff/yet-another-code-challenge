(function(){
	'use strict';
	function AnimatingObject(){}
	AnimatingObject.prototype = Object.create({});
	AnimatingObject.prototype._drawConditionFullfilled = function drawConditionFullfilled(condition){
		this.drawConditions[condition] = true;
		var ret = true;
		for(var k in this.drawConditions){
			ret = this.drawConditions[k] && ret;
		}
		this.canDraw = ret;
		return ret;
	}

	AnimatingObject.decideOnImageSize = function decideOnImageSize(canv){
		var c = $(canv);
		if(Math.max(c.width(), c.height()) > 768){
			return '1440';
		}
		return '768';
	}

	AnimatingObject.animateCanvas = function animateCanvas(opts){
		var canv = opts.canv;
		var ctx = opts.ctx;
		var cb = opts.callback || function(){}
		var obj = opts.objects;
		$(canv).show();
		var doc = $(document);
		var setCanvDimension = function(){
			var h = Math.max(doc.height(), doc.width());
			var w = Math.min(doc.height(), doc.width());;
			canv.height = h;
			canv.width = w;
			console.log(h, w)
			for(var i = 0; i < obj.length; i++){
				obj[i].setDrawProps(w, h);
			}
		}
		doc.on('resize orientationchange', setCanvDimension);
		setCanvDimension();

		function animate(){
			var now = Date.now();
			ctx.clearRect(0, 0, canv.width, canv.height);
			var done = true;
			for(var i = 0; i < obj.length; i++){
				done = obj[i].draw(ctx, now) && done;
			}
			if(done){
				cb()
			}else{
				raf(animate)
			}
		}
		var start = Date.now();
		raf(animate);
	}

	var g = window || global;
	g.AnimatingObject = AnimatingObject;
})()
