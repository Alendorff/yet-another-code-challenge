var ShakeHandler = (function(){
	function euklidian_d(vec){
		return Math.sqrt(Math.pow(vec.x, 2) + Math.pow(vec.y, 2) + Math.pow(vec.z, 2))
	}

	/*
	 * Call me with new ShakeHandler(callback, options)
	 * where callback is the callback to be executed on every shake
	 * and options is an object with the following properties (default values in square brackets)
	 *
	 * - measurements: [10] number of last measurements to consider, since we are comparing to the average
	 * - threshold: [7] set the threshold after wich the callback will be called
	 * - fallback: gets called if a fallback is needed
	 *
	 * methods:
	 * - start() sets the handler and start measuring
	 * - stop() removes the handler (recommended, since it's unnesseary computation that is taking place
	 */
	var SURFACE_GRAVITY = 9.81;
	function SH(cb, opts){
		if(opts == null) opts = {};
		var s = this;
		s.lastMeasurements = [];
		s.measurementsToConsider = opts.measurements || 10;
		s.measureIndex = s.measurementsToConsider;
		s.threshold = opts.threshold || 6;
		s._cb = cb;
		s._fallback = opts.fallback || function(){};
		Object.defineProperty(s, 'handleMotion', {
			writable: false, enumerable: false,
			value: function handleMotion(event){
				var d = event.acceleration != null
							? euklidian_d(event.acceleration)
				// this is a fallback, you'll have to shake harder on a phone that doesn't handle it well
							: (event.accelerationIncludingGravity != null
								 && Math.abs(euklidian_d(event.accelerationIncludingGravity) - SURFACE_GRAVITY));
				if(isFinite(d)){
					var avg = s.lastMeasurements.reduce(function(p, val){return p + val}, 0) / s.lastMeasurements.length;
					if(isFinite(avg) && Math.abs(avg - d) > s.threshold){
						s.measureIndex = 0;
						s.lastMeasurements = [d];
						s._cb(d, event);
					} else {
						s.measureIndex = (s.measureIndex + 1) % s.measurementsToConsider;
						s.lastMeasurements[s.measureIndex] = d;
					}
				}else{
					s._fallback('no number');
				}
			}
		})
	}

	SH.prototype = Object.create({});
	SH.prototype.start = function start(){
		if(!window.DeviceMotionEvent){
			this._fallback('no device motion events');
		}else{
			window.addEventListener('devicemotion', this.handleMotion, false);
		}
	}

	SH.prototype.stop = function stop(){
		// execute it later to avoid that we aren't inside a event listener
		// (some certain stock browser crashes)
		var s = this;
		setTimeout(function(){window.removeEventListener('devicemotion', s.handleMotion, false);}, 1);
	}

	return SH;
})()
