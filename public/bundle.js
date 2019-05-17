var AccessDropdown = (function () {
	'use strict';

	var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var shortUniqueId_min = createCommonjsModule(function (module) {
	(function(){var _ShortUniqueId=function _ShortUniqueId(options){var self=this;this.DEFAULT_RANDOM_ID_LEN=6;this.DICT_RANGES={digits:[48,58],lowerCase:[97,123],upperCase:[65,91]};this.dict=[];this.log=function log(){var args=[],len=arguments.length;while(len--)args[len]=arguments[len];args[0]="[short-unique-id] "+args[0];if(this.debug===true){if(typeof console!=="undefined"&&console!==null){return console.log.apply(console,args)}}return undefined};this.getDict=function getDict(){return this.dict};this.sequentialUUID=function sequentialUUID(){var counterDiv;var counterRem;var id;id="";counterDiv=this.counter;while(true){counterRem=counterDiv%self.dictLength;counterDiv=parseInt(counterDiv/self.dictLength,10);id+=self.dict[counterRem];if(counterDiv===0){break}}this.counter+=1;return id};this.randomUUID=function randomUUID(uuidLength){var id;var randomPartIdx;var _j;if(uuidLength===null||typeof uuidLength==="undefined"){uuidLength=this.DEFAULT_RANDOM_ID_LEN;}if(uuidLength===null||typeof uuidLength==="undefined"||uuidLength<1){throw new Error("Invalid UUID Length Provided")}var idIndex;id="";for(idIndex=_j=0;0<=uuidLength?_j<uuidLength:_j>uuidLength;idIndex=0<=uuidLength?++_j:--_j){randomPartIdx=parseInt(Math.random()*self.dictLength)%self.dictLength;id+=self.dict[randomPartIdx];}return id};this.dictIndex=this._i=0;var rangeType;for(rangeType in self.DICT_RANGES){self.dictRange=self.DICT_RANGES[rangeType];self.lowerBound=self.dictRange[0],self.upperBound=self.dictRange[1];for(this.dictIndex=this._i=this.lowerBound;this.lowerBound<=this.upperBound?this._i<this.upperBound:this._i>this.upperBound;this.dictIndex=this.lowerBound<=this.upperBound?++this._i:--this._i){self.dict.push(String.fromCharCode(self.dictIndex));}}this.dict=this.dict.sort(function(){return Math.random()<=.5});this.dictLength=this.dict.length;if(options===null||typeof options==="undefined"){options={};}this.counter=0;this.debug=options.debug;this.log("Generator created with Dictionary Size "+this.dictLength);};{module.exports=_ShortUniqueId;}})();
	});

	/**
	 * lodash (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
	 * Released under MIT license <https://lodash.com/license>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 */

	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/** Used as references for various `Number` constants. */
	var NAN = 0 / 0;

	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';

	/** Used to match leading and trailing whitespace. */
	var reTrim = /^\s+|\s+$/g;

	/** Used to detect bad signed hexadecimal string values. */
	var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

	/** Used to detect binary string values. */
	var reIsBinary = /^0b[01]+$/i;

	/** Used to detect octal string values. */
	var reIsOctal = /^0o[0-7]+$/i;

	/** Built-in method references without a dependency on `root`. */
	var freeParseInt = parseInt;

	/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max,
	    nativeMin = Math.min;

	/**
	 * Gets the timestamp of the number of milliseconds that have elapsed since
	 * the Unix epoch (1 January 1970 00:00:00 UTC).
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Date
	 * @returns {number} Returns the timestamp.
	 * @example
	 *
	 * _.defer(function(stamp) {
	 *   console.log(_.now() - stamp);
	 * }, _.now());
	 * // => Logs the number of milliseconds it took for the deferred invocation.
	 */
	var now = function() {
	  return root.Date.now();
	};

	/**
	 * Creates a debounced function that delays invoking `func` until after `wait`
	 * milliseconds have elapsed since the last time the debounced function was
	 * invoked. The debounced function comes with a `cancel` method to cancel
	 * delayed `func` invocations and a `flush` method to immediately invoke them.
	 * Provide `options` to indicate whether `func` should be invoked on the
	 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
	 * with the last arguments provided to the debounced function. Subsequent
	 * calls to the debounced function return the result of the last `func`
	 * invocation.
	 *
	 * **Note:** If `leading` and `trailing` options are `true`, `func` is
	 * invoked on the trailing edge of the timeout only if the debounced function
	 * is invoked more than once during the `wait` timeout.
	 *
	 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
	 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
	 *
	 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
	 * for details over the differences between `_.debounce` and `_.throttle`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to debounce.
	 * @param {number} [wait=0] The number of milliseconds to delay.
	 * @param {Object} [options={}] The options object.
	 * @param {boolean} [options.leading=false]
	 *  Specify invoking on the leading edge of the timeout.
	 * @param {number} [options.maxWait]
	 *  The maximum time `func` is allowed to be delayed before it's invoked.
	 * @param {boolean} [options.trailing=true]
	 *  Specify invoking on the trailing edge of the timeout.
	 * @returns {Function} Returns the new debounced function.
	 * @example
	 *
	 * // Avoid costly calculations while the window size is in flux.
	 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
	 *
	 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
	 * jQuery(element).on('click', _.debounce(sendMail, 300, {
	 *   'leading': true,
	 *   'trailing': false
	 * }));
	 *
	 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
	 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
	 * var source = new EventSource('/stream');
	 * jQuery(source).on('message', debounced);
	 *
	 * // Cancel the trailing debounced invocation.
	 * jQuery(window).on('popstate', debounced.cancel);
	 */
	function debounce(func, wait, options) {
	  var lastArgs,
	      lastThis,
	      maxWait,
	      result,
	      timerId,
	      lastCallTime,
	      lastInvokeTime = 0,
	      leading = false,
	      maxing = false,
	      trailing = true;

	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  wait = toNumber(wait) || 0;
	  if (isObject(options)) {
	    leading = !!options.leading;
	    maxing = 'maxWait' in options;
	    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
	    trailing = 'trailing' in options ? !!options.trailing : trailing;
	  }

	  function invokeFunc(time) {
	    var args = lastArgs,
	        thisArg = lastThis;

	    lastArgs = lastThis = undefined;
	    lastInvokeTime = time;
	    result = func.apply(thisArg, args);
	    return result;
	  }

	  function leadingEdge(time) {
	    // Reset any `maxWait` timer.
	    lastInvokeTime = time;
	    // Start the timer for the trailing edge.
	    timerId = setTimeout(timerExpired, wait);
	    // Invoke the leading edge.
	    return leading ? invokeFunc(time) : result;
	  }

	  function remainingWait(time) {
	    var timeSinceLastCall = time - lastCallTime,
	        timeSinceLastInvoke = time - lastInvokeTime,
	        result = wait - timeSinceLastCall;

	    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
	  }

	  function shouldInvoke(time) {
	    var timeSinceLastCall = time - lastCallTime,
	        timeSinceLastInvoke = time - lastInvokeTime;

	    // Either this is the first call, activity has stopped and we're at the
	    // trailing edge, the system time has gone backwards and we're treating
	    // it as the trailing edge, or we've hit the `maxWait` limit.
	    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
	      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
	  }

	  function timerExpired() {
	    var time = now();
	    if (shouldInvoke(time)) {
	      return trailingEdge(time);
	    }
	    // Restart the timer.
	    timerId = setTimeout(timerExpired, remainingWait(time));
	  }

	  function trailingEdge(time) {
	    timerId = undefined;

	    // Only invoke if we have `lastArgs` which means `func` has been
	    // debounced at least once.
	    if (trailing && lastArgs) {
	      return invokeFunc(time);
	    }
	    lastArgs = lastThis = undefined;
	    return result;
	  }

	  function cancel() {
	    if (timerId !== undefined) {
	      clearTimeout(timerId);
	    }
	    lastInvokeTime = 0;
	    lastArgs = lastCallTime = lastThis = timerId = undefined;
	  }

	  function flush() {
	    return timerId === undefined ? result : trailingEdge(now());
	  }

	  function debounced() {
	    var time = now(),
	        isInvoking = shouldInvoke(time);

	    lastArgs = arguments;
	    lastThis = this;
	    lastCallTime = time;

	    if (isInvoking) {
	      if (timerId === undefined) {
	        return leadingEdge(lastCallTime);
	      }
	      if (maxing) {
	        // Handle invocations in a tight loop.
	        timerId = setTimeout(timerExpired, wait);
	        return invokeFunc(lastCallTime);
	      }
	    }
	    if (timerId === undefined) {
	      timerId = setTimeout(timerExpired, wait);
	    }
	    return result;
	  }
	  debounced.cancel = cancel;
	  debounced.flush = flush;
	  return debounced;
	}

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && objectToString.call(value) == symbolTag);
	}

	/**
	 * Converts `value` to a number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {number} Returns the number.
	 * @example
	 *
	 * _.toNumber(3.2);
	 * // => 3.2
	 *
	 * _.toNumber(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toNumber(Infinity);
	 * // => Infinity
	 *
	 * _.toNumber('3.2');
	 * // => 3.2
	 */
	function toNumber(value) {
	  if (typeof value == 'number') {
	    return value;
	  }
	  if (isSymbol(value)) {
	    return NAN;
	  }
	  if (isObject(value)) {
	    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
	    value = isObject(other) ? (other + '') : other;
	  }
	  if (typeof value != 'string') {
	    return value === 0 ? value : +value;
	  }
	  value = value.replace(reTrim, '');
	  var isBinary = reIsBinary.test(value);
	  return (isBinary || reIsOctal.test(value))
	    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
	    : (reIsBadHex.test(value) ? NAN : +value);
	}

	var lodash_debounce = debounce;

	var lodash_merge = createCommonjsModule(function (module, exports) {
	/**
	 * Lodash (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright JS Foundation and other contributors <https://js.foundation/>
	 * Released under MIT license <https://lodash.com/license>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 */

	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/** Used to detect hot functions by number of calls within a span of milliseconds. */
	var HOT_COUNT = 800,
	    HOT_SPAN = 16;

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    asyncTag = '[object AsyncFunction]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    nullTag = '[object Null]',
	    objectTag = '[object Object]',
	    proxyTag = '[object Proxy]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    undefinedTag = '[object Undefined]',
	    weakMapTag = '[object WeakMap]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/**
	 * Used to match `RegExp`
	 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
	 */
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

	/** Used to detect host constructors (Safari). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;

	/** Used to identify `toStringTag` values of typed arrays. */
	var typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
	typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
	typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
	typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
	typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
	typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
	typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
	typedArrayTags[errorTag] = typedArrayTags[funcTag] =
	typedArrayTags[mapTag] = typedArrayTags[numberTag] =
	typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
	typedArrayTags[setTag] = typedArrayTags[stringTag] =
	typedArrayTags[weakMapTag] = false;

	/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();

	/** Detect free variable `exports`. */
	var freeExports = exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;

	/** Detect free variable `process` from Node.js. */
	var freeProcess = moduleExports && freeGlobal.process;

	/** Used to access faster Node.js helpers. */
	var nodeUtil = (function() {
	  try {
	    return freeProcess && freeProcess.binding && freeProcess.binding('util');
	  } catch (e) {}
	}());

	/* Node.js helper references. */
	var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

	/**
	 * A faster alternative to `Function#apply`, this function invokes `func`
	 * with the `this` binding of `thisArg` and the arguments of `args`.
	 *
	 * @private
	 * @param {Function} func The function to invoke.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {Array} args The arguments to invoke `func` with.
	 * @returns {*} Returns the result of `func`.
	 */
	function apply(func, thisArg, args) {
	  switch (args.length) {
	    case 0: return func.call(thisArg);
	    case 1: return func.call(thisArg, args[0]);
	    case 2: return func.call(thisArg, args[0], args[1]);
	    case 3: return func.call(thisArg, args[0], args[1], args[2]);
	  }
	  return func.apply(thisArg, args);
	}

	/**
	 * The base implementation of `_.times` without support for iteratee shorthands
	 * or max array length checks.
	 *
	 * @private
	 * @param {number} n The number of times to invoke `iteratee`.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the array of results.
	 */
	function baseTimes(n, iteratee) {
	  var index = -1,
	      result = Array(n);

	  while (++index < n) {
	    result[index] = iteratee(index);
	  }
	  return result;
	}

	/**
	 * The base implementation of `_.unary` without support for storing metadata.
	 *
	 * @private
	 * @param {Function} func The function to cap arguments for.
	 * @returns {Function} Returns the new capped function.
	 */
	function baseUnary(func) {
	  return function(value) {
	    return func(value);
	  };
	}

	/**
	 * Gets the value at `key` of `object`.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {string} key The key of the property to get.
	 * @returns {*} Returns the property value.
	 */
	function getValue(object, key) {
	  return object == null ? undefined : object[key];
	}

	/**
	 * Creates a unary function that invokes `func` with its argument transformed.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {Function} transform The argument transform.
	 * @returns {Function} Returns the new function.
	 */
	function overArg(func, transform) {
	  return function(arg) {
	    return func(transform(arg));
	  };
	}

	/**
	 * Gets the value at `key`, unless `key` is "__proto__".
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the property to get.
	 * @returns {*} Returns the property value.
	 */
	function safeGet(object, key) {
	  return key == '__proto__'
	    ? undefined
	    : object[key];
	}

	/** Used for built-in method references. */
	var arrayProto = Array.prototype,
	    funcProto = Function.prototype,
	    objectProto = Object.prototype;

	/** Used to detect overreaching core-js shims. */
	var coreJsData = root['__core-js_shared__'];

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to detect methods masquerading as native. */
	var maskSrcKey = (function() {
	  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
	  return uid ? ('Symbol(src)_1.' + uid) : '';
	}());

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;

	/** Used to infer the `Object` constructor. */
	var objectCtorString = funcToString.call(Object);

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);

	/** Built-in value references. */
	var Buffer = moduleExports ? root.Buffer : undefined,
	    Symbol = root.Symbol,
	    Uint8Array = root.Uint8Array,
	    allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined,
	    getPrototype = overArg(Object.getPrototypeOf, Object),
	    objectCreate = Object.create,
	    propertyIsEnumerable = objectProto.propertyIsEnumerable,
	    splice = arrayProto.splice,
	    symToStringTag = Symbol ? Symbol.toStringTag : undefined;

	var defineProperty = (function() {
	  try {
	    var func = getNative(Object, 'defineProperty');
	    func({}, '', {});
	    return func;
	  } catch (e) {}
	}());

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined,
	    nativeMax = Math.max,
	    nativeNow = Date.now;

	/* Built-in method references that are verified to be native. */
	var Map = getNative(root, 'Map'),
	    nativeCreate = getNative(Object, 'create');

	/**
	 * The base implementation of `_.create` without support for assigning
	 * properties to the created object.
	 *
	 * @private
	 * @param {Object} proto The object to inherit from.
	 * @returns {Object} Returns the new object.
	 */
	var baseCreate = (function() {
	  function object() {}
	  return function(proto) {
	    if (!isObject(proto)) {
	      return {};
	    }
	    if (objectCreate) {
	      return objectCreate(proto);
	    }
	    object.prototype = proto;
	    var result = new object;
	    object.prototype = undefined;
	    return result;
	  };
	}());

	/**
	 * Creates a hash object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Hash(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	/**
	 * Removes all key-value entries from the hash.
	 *
	 * @private
	 * @name clear
	 * @memberOf Hash
	 */
	function hashClear() {
	  this.__data__ = nativeCreate ? nativeCreate(null) : {};
	  this.size = 0;
	}

	/**
	 * Removes `key` and its value from the hash.
	 *
	 * @private
	 * @name delete
	 * @memberOf Hash
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function hashDelete(key) {
	  var result = this.has(key) && delete this.__data__[key];
	  this.size -= result ? 1 : 0;
	  return result;
	}

	/**
	 * Gets the hash value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Hash
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function hashGet(key) {
	  var data = this.__data__;
	  if (nativeCreate) {
	    var result = data[key];
	    return result === HASH_UNDEFINED ? undefined : result;
	  }
	  return hasOwnProperty.call(data, key) ? data[key] : undefined;
	}

	/**
	 * Checks if a hash value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Hash
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function hashHas(key) {
	  var data = this.__data__;
	  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
	}

	/**
	 * Sets the hash `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Hash
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the hash instance.
	 */
	function hashSet(key, value) {
	  var data = this.__data__;
	  this.size += this.has(key) ? 0 : 1;
	  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
	  return this;
	}

	// Add methods to `Hash`.
	Hash.prototype.clear = hashClear;
	Hash.prototype['delete'] = hashDelete;
	Hash.prototype.get = hashGet;
	Hash.prototype.has = hashHas;
	Hash.prototype.set = hashSet;

	/**
	 * Creates an list cache object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function ListCache(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	/**
	 * Removes all key-value entries from the list cache.
	 *
	 * @private
	 * @name clear
	 * @memberOf ListCache
	 */
	function listCacheClear() {
	  this.__data__ = [];
	  this.size = 0;
	}

	/**
	 * Removes `key` and its value from the list cache.
	 *
	 * @private
	 * @name delete
	 * @memberOf ListCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function listCacheDelete(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  if (index < 0) {
	    return false;
	  }
	  var lastIndex = data.length - 1;
	  if (index == lastIndex) {
	    data.pop();
	  } else {
	    splice.call(data, index, 1);
	  }
	  --this.size;
	  return true;
	}

	/**
	 * Gets the list cache value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf ListCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function listCacheGet(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  return index < 0 ? undefined : data[index][1];
	}

	/**
	 * Checks if a list cache value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf ListCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function listCacheHas(key) {
	  return assocIndexOf(this.__data__, key) > -1;
	}

	/**
	 * Sets the list cache `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf ListCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the list cache instance.
	 */
	function listCacheSet(key, value) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  if (index < 0) {
	    ++this.size;
	    data.push([key, value]);
	  } else {
	    data[index][1] = value;
	  }
	  return this;
	}

	// Add methods to `ListCache`.
	ListCache.prototype.clear = listCacheClear;
	ListCache.prototype['delete'] = listCacheDelete;
	ListCache.prototype.get = listCacheGet;
	ListCache.prototype.has = listCacheHas;
	ListCache.prototype.set = listCacheSet;

	/**
	 * Creates a map cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function MapCache(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	/**
	 * Removes all key-value entries from the map.
	 *
	 * @private
	 * @name clear
	 * @memberOf MapCache
	 */
	function mapCacheClear() {
	  this.size = 0;
	  this.__data__ = {
	    'hash': new Hash,
	    'map': new (Map || ListCache),
	    'string': new Hash
	  };
	}

	/**
	 * Removes `key` and its value from the map.
	 *
	 * @private
	 * @name delete
	 * @memberOf MapCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function mapCacheDelete(key) {
	  var result = getMapData(this, key)['delete'](key);
	  this.size -= result ? 1 : 0;
	  return result;
	}

	/**
	 * Gets the map value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf MapCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function mapCacheGet(key) {
	  return getMapData(this, key).get(key);
	}

	/**
	 * Checks if a map value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf MapCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function mapCacheHas(key) {
	  return getMapData(this, key).has(key);
	}

	/**
	 * Sets the map `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf MapCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the map cache instance.
	 */
	function mapCacheSet(key, value) {
	  var data = getMapData(this, key),
	      size = data.size;

	  data.set(key, value);
	  this.size += data.size == size ? 0 : 1;
	  return this;
	}

	// Add methods to `MapCache`.
	MapCache.prototype.clear = mapCacheClear;
	MapCache.prototype['delete'] = mapCacheDelete;
	MapCache.prototype.get = mapCacheGet;
	MapCache.prototype.has = mapCacheHas;
	MapCache.prototype.set = mapCacheSet;

	/**
	 * Creates a stack cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Stack(entries) {
	  var data = this.__data__ = new ListCache(entries);
	  this.size = data.size;
	}

	/**
	 * Removes all key-value entries from the stack.
	 *
	 * @private
	 * @name clear
	 * @memberOf Stack
	 */
	function stackClear() {
	  this.__data__ = new ListCache;
	  this.size = 0;
	}

	/**
	 * Removes `key` and its value from the stack.
	 *
	 * @private
	 * @name delete
	 * @memberOf Stack
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function stackDelete(key) {
	  var data = this.__data__,
	      result = data['delete'](key);

	  this.size = data.size;
	  return result;
	}

	/**
	 * Gets the stack value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Stack
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function stackGet(key) {
	  return this.__data__.get(key);
	}

	/**
	 * Checks if a stack value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Stack
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function stackHas(key) {
	  return this.__data__.has(key);
	}

	/**
	 * Sets the stack `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Stack
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the stack cache instance.
	 */
	function stackSet(key, value) {
	  var data = this.__data__;
	  if (data instanceof ListCache) {
	    var pairs = data.__data__;
	    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
	      pairs.push([key, value]);
	      this.size = ++data.size;
	      return this;
	    }
	    data = this.__data__ = new MapCache(pairs);
	  }
	  data.set(key, value);
	  this.size = data.size;
	  return this;
	}

	// Add methods to `Stack`.
	Stack.prototype.clear = stackClear;
	Stack.prototype['delete'] = stackDelete;
	Stack.prototype.get = stackGet;
	Stack.prototype.has = stackHas;
	Stack.prototype.set = stackSet;

	/**
	 * Creates an array of the enumerable property names of the array-like `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @param {boolean} inherited Specify returning inherited property names.
	 * @returns {Array} Returns the array of property names.
	 */
	function arrayLikeKeys(value, inherited) {
	  var isArr = isArray(value),
	      isArg = !isArr && isArguments(value),
	      isBuff = !isArr && !isArg && isBuffer(value),
	      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
	      skipIndexes = isArr || isArg || isBuff || isType,
	      result = skipIndexes ? baseTimes(value.length, String) : [],
	      length = result.length;

	  for (var key in value) {
	    if ((inherited || hasOwnProperty.call(value, key)) &&
	        !(skipIndexes && (
	           // Safari 9 has enumerable `arguments.length` in strict mode.
	           key == 'length' ||
	           // Node.js 0.10 has enumerable non-index properties on buffers.
	           (isBuff && (key == 'offset' || key == 'parent')) ||
	           // PhantomJS 2 has enumerable non-index properties on typed arrays.
	           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
	           // Skip index properties.
	           isIndex(key, length)
	        ))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	/**
	 * This function is like `assignValue` except that it doesn't assign
	 * `undefined` values.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function assignMergeValue(object, key, value) {
	  if ((value !== undefined && !eq(object[key], value)) ||
	      (value === undefined && !(key in object))) {
	    baseAssignValue(object, key, value);
	  }
	}

	/**
	 * Assigns `value` to `key` of `object` if the existing value is not equivalent
	 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * for equality comparisons.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function assignValue(object, key, value) {
	  var objValue = object[key];
	  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
	      (value === undefined && !(key in object))) {
	    baseAssignValue(object, key, value);
	  }
	}

	/**
	 * Gets the index at which the `key` is found in `array` of key-value pairs.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} key The key to search for.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function assocIndexOf(array, key) {
	  var length = array.length;
	  while (length--) {
	    if (eq(array[length][0], key)) {
	      return length;
	    }
	  }
	  return -1;
	}

	/**
	 * The base implementation of `assignValue` and `assignMergeValue` without
	 * value checks.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function baseAssignValue(object, key, value) {
	  if (key == '__proto__' && defineProperty) {
	    defineProperty(object, key, {
	      'configurable': true,
	      'enumerable': true,
	      'value': value,
	      'writable': true
	    });
	  } else {
	    object[key] = value;
	  }
	}

	/**
	 * The base implementation of `baseForOwn` which iterates over `object`
	 * properties returned by `keysFunc` and invokes `iteratee` for each property.
	 * Iteratee functions may exit iteration early by explicitly returning `false`.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @returns {Object} Returns `object`.
	 */
	var baseFor = createBaseFor();

	/**
	 * The base implementation of `getTag` without fallbacks for buggy environments.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function baseGetTag(value) {
	  if (value == null) {
	    return value === undefined ? undefinedTag : nullTag;
	  }
	  return (symToStringTag && symToStringTag in Object(value))
	    ? getRawTag(value)
	    : objectToString(value);
	}

	/**
	 * The base implementation of `_.isArguments`.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 */
	function baseIsArguments(value) {
	  return isObjectLike(value) && baseGetTag(value) == argsTag;
	}

	/**
	 * The base implementation of `_.isNative` without bad shim checks.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function,
	 *  else `false`.
	 */
	function baseIsNative(value) {
	  if (!isObject(value) || isMasked(value)) {
	    return false;
	  }
	  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
	  return pattern.test(toSource(value));
	}

	/**
	 * The base implementation of `_.isTypedArray` without Node.js optimizations.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 */
	function baseIsTypedArray(value) {
	  return isObjectLike(value) &&
	    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
	}

	/**
	 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeysIn(object) {
	  if (!isObject(object)) {
	    return nativeKeysIn(object);
	  }
	  var isProto = isPrototype(object),
	      result = [];

	  for (var key in object) {
	    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	/**
	 * The base implementation of `_.merge` without support for multiple sources.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @param {number} srcIndex The index of `source`.
	 * @param {Function} [customizer] The function to customize merged values.
	 * @param {Object} [stack] Tracks traversed source values and their merged
	 *  counterparts.
	 */
	function baseMerge(object, source, srcIndex, customizer, stack) {
	  if (object === source) {
	    return;
	  }
	  baseFor(source, function(srcValue, key) {
	    if (isObject(srcValue)) {
	      stack || (stack = new Stack);
	      baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
	    }
	    else {
	      var newValue = customizer
	        ? customizer(safeGet(object, key), srcValue, (key + ''), object, source, stack)
	        : undefined;

	      if (newValue === undefined) {
	        newValue = srcValue;
	      }
	      assignMergeValue(object, key, newValue);
	    }
	  }, keysIn);
	}

	/**
	 * A specialized version of `baseMerge` for arrays and objects which performs
	 * deep merges and tracks traversed objects enabling objects with circular
	 * references to be merged.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @param {string} key The key of the value to merge.
	 * @param {number} srcIndex The index of `source`.
	 * @param {Function} mergeFunc The function to merge values.
	 * @param {Function} [customizer] The function to customize assigned values.
	 * @param {Object} [stack] Tracks traversed source values and their merged
	 *  counterparts.
	 */
	function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
	  var objValue = safeGet(object, key),
	      srcValue = safeGet(source, key),
	      stacked = stack.get(srcValue);

	  if (stacked) {
	    assignMergeValue(object, key, stacked);
	    return;
	  }
	  var newValue = customizer
	    ? customizer(objValue, srcValue, (key + ''), object, source, stack)
	    : undefined;

	  var isCommon = newValue === undefined;

	  if (isCommon) {
	    var isArr = isArray(srcValue),
	        isBuff = !isArr && isBuffer(srcValue),
	        isTyped = !isArr && !isBuff && isTypedArray(srcValue);

	    newValue = srcValue;
	    if (isArr || isBuff || isTyped) {
	      if (isArray(objValue)) {
	        newValue = objValue;
	      }
	      else if (isArrayLikeObject(objValue)) {
	        newValue = copyArray(objValue);
	      }
	      else if (isBuff) {
	        isCommon = false;
	        newValue = cloneBuffer(srcValue, true);
	      }
	      else if (isTyped) {
	        isCommon = false;
	        newValue = cloneTypedArray(srcValue, true);
	      }
	      else {
	        newValue = [];
	      }
	    }
	    else if (isPlainObject(srcValue) || isArguments(srcValue)) {
	      newValue = objValue;
	      if (isArguments(objValue)) {
	        newValue = toPlainObject(objValue);
	      }
	      else if (!isObject(objValue) || (srcIndex && isFunction(objValue))) {
	        newValue = initCloneObject(srcValue);
	      }
	    }
	    else {
	      isCommon = false;
	    }
	  }
	  if (isCommon) {
	    // Recursively merge objects and arrays (susceptible to call stack limits).
	    stack.set(srcValue, newValue);
	    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
	    stack['delete'](srcValue);
	  }
	  assignMergeValue(object, key, newValue);
	}

	/**
	 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
	 *
	 * @private
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @returns {Function} Returns the new function.
	 */
	function baseRest(func, start) {
	  return setToString(overRest(func, start, identity), func + '');
	}

	/**
	 * The base implementation of `setToString` without support for hot loop shorting.
	 *
	 * @private
	 * @param {Function} func The function to modify.
	 * @param {Function} string The `toString` result.
	 * @returns {Function} Returns `func`.
	 */
	var baseSetToString = !defineProperty ? identity : function(func, string) {
	  return defineProperty(func, 'toString', {
	    'configurable': true,
	    'enumerable': false,
	    'value': constant(string),
	    'writable': true
	  });
	};

	/**
	 * Creates a clone of  `buffer`.
	 *
	 * @private
	 * @param {Buffer} buffer The buffer to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Buffer} Returns the cloned buffer.
	 */
	function cloneBuffer(buffer, isDeep) {
	  if (isDeep) {
	    return buffer.slice();
	  }
	  var length = buffer.length,
	      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

	  buffer.copy(result);
	  return result;
	}

	/**
	 * Creates a clone of `arrayBuffer`.
	 *
	 * @private
	 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
	 * @returns {ArrayBuffer} Returns the cloned array buffer.
	 */
	function cloneArrayBuffer(arrayBuffer) {
	  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
	  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
	  return result;
	}

	/**
	 * Creates a clone of `typedArray`.
	 *
	 * @private
	 * @param {Object} typedArray The typed array to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned typed array.
	 */
	function cloneTypedArray(typedArray, isDeep) {
	  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
	  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
	}

	/**
	 * Copies the values of `source` to `array`.
	 *
	 * @private
	 * @param {Array} source The array to copy values from.
	 * @param {Array} [array=[]] The array to copy values to.
	 * @returns {Array} Returns `array`.
	 */
	function copyArray(source, array) {
	  var index = -1,
	      length = source.length;

	  array || (array = Array(length));
	  while (++index < length) {
	    array[index] = source[index];
	  }
	  return array;
	}

	/**
	 * Copies properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property identifiers to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @param {Function} [customizer] The function to customize copied values.
	 * @returns {Object} Returns `object`.
	 */
	function copyObject(source, props, object, customizer) {
	  var isNew = !object;
	  object || (object = {});

	  var index = -1,
	      length = props.length;

	  while (++index < length) {
	    var key = props[index];

	    var newValue = customizer
	      ? customizer(object[key], source[key], key, object, source)
	      : undefined;

	    if (newValue === undefined) {
	      newValue = source[key];
	    }
	    if (isNew) {
	      baseAssignValue(object, key, newValue);
	    } else {
	      assignValue(object, key, newValue);
	    }
	  }
	  return object;
	}

	/**
	 * Creates a function like `_.assign`.
	 *
	 * @private
	 * @param {Function} assigner The function to assign values.
	 * @returns {Function} Returns the new assigner function.
	 */
	function createAssigner(assigner) {
	  return baseRest(function(object, sources) {
	    var index = -1,
	        length = sources.length,
	        customizer = length > 1 ? sources[length - 1] : undefined,
	        guard = length > 2 ? sources[2] : undefined;

	    customizer = (assigner.length > 3 && typeof customizer == 'function')
	      ? (length--, customizer)
	      : undefined;

	    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
	      customizer = length < 3 ? undefined : customizer;
	      length = 1;
	    }
	    object = Object(object);
	    while (++index < length) {
	      var source = sources[index];
	      if (source) {
	        assigner(object, source, index, customizer);
	      }
	    }
	    return object;
	  });
	}

	/**
	 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseFor(fromRight) {
	  return function(object, iteratee, keysFunc) {
	    var index = -1,
	        iterable = Object(object),
	        props = keysFunc(object),
	        length = props.length;

	    while (length--) {
	      var key = props[fromRight ? length : ++index];
	      if (iteratee(iterable[key], key, iterable) === false) {
	        break;
	      }
	    }
	    return object;
	  };
	}

	/**
	 * Gets the data for `map`.
	 *
	 * @private
	 * @param {Object} map The map to query.
	 * @param {string} key The reference key.
	 * @returns {*} Returns the map data.
	 */
	function getMapData(map, key) {
	  var data = map.__data__;
	  return isKeyable(key)
	    ? data[typeof key == 'string' ? 'string' : 'hash']
	    : data.map;
	}

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = getValue(object, key);
	  return baseIsNative(value) ? value : undefined;
	}

	/**
	 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the raw `toStringTag`.
	 */
	function getRawTag(value) {
	  var isOwn = hasOwnProperty.call(value, symToStringTag),
	      tag = value[symToStringTag];

	  try {
	    value[symToStringTag] = undefined;
	    var unmasked = true;
	  } catch (e) {}

	  var result = nativeObjectToString.call(value);
	  if (unmasked) {
	    if (isOwn) {
	      value[symToStringTag] = tag;
	    } else {
	      delete value[symToStringTag];
	    }
	  }
	  return result;
	}

	/**
	 * Initializes an object clone.
	 *
	 * @private
	 * @param {Object} object The object to clone.
	 * @returns {Object} Returns the initialized clone.
	 */
	function initCloneObject(object) {
	  return (typeof object.constructor == 'function' && !isPrototype(object))
	    ? baseCreate(getPrototype(object))
	    : {};
	}

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  var type = typeof value;
	  length = length == null ? MAX_SAFE_INTEGER : length;

	  return !!length &&
	    (type == 'number' ||
	      (type != 'symbol' && reIsUint.test(value))) &&
	        (value > -1 && value % 1 == 0 && value < length);
	}

	/**
	 * Checks if the given arguments are from an iteratee call.
	 *
	 * @private
	 * @param {*} value The potential iteratee value argument.
	 * @param {*} index The potential iteratee index or key argument.
	 * @param {*} object The potential iteratee object argument.
	 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
	 *  else `false`.
	 */
	function isIterateeCall(value, index, object) {
	  if (!isObject(object)) {
	    return false;
	  }
	  var type = typeof index;
	  if (type == 'number'
	        ? (isArrayLike(object) && isIndex(index, object.length))
	        : (type == 'string' && index in object)
	      ) {
	    return eq(object[index], value);
	  }
	  return false;
	}

	/**
	 * Checks if `value` is suitable for use as unique object key.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
	 */
	function isKeyable(value) {
	  var type = typeof value;
	  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
	    ? (value !== '__proto__')
	    : (value === null);
	}

	/**
	 * Checks if `func` has its source masked.
	 *
	 * @private
	 * @param {Function} func The function to check.
	 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
	 */
	function isMasked(func) {
	  return !!maskSrcKey && (maskSrcKey in func);
	}

	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */
	function isPrototype(value) {
	  var Ctor = value && value.constructor,
	      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

	  return value === proto;
	}

	/**
	 * This function is like
	 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	 * except that it includes inherited enumerable properties.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function nativeKeysIn(object) {
	  var result = [];
	  if (object != null) {
	    for (var key in Object(object)) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	/**
	 * Converts `value` to a string using `Object.prototype.toString`.
	 *
	 * @private
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 */
	function objectToString(value) {
	  return nativeObjectToString.call(value);
	}

	/**
	 * A specialized version of `baseRest` which transforms the rest array.
	 *
	 * @private
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @param {Function} transform The rest array transform.
	 * @returns {Function} Returns the new function.
	 */
	function overRest(func, start, transform) {
	  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
	  return function() {
	    var args = arguments,
	        index = -1,
	        length = nativeMax(args.length - start, 0),
	        array = Array(length);

	    while (++index < length) {
	      array[index] = args[start + index];
	    }
	    index = -1;
	    var otherArgs = Array(start + 1);
	    while (++index < start) {
	      otherArgs[index] = args[index];
	    }
	    otherArgs[start] = transform(array);
	    return apply(func, this, otherArgs);
	  };
	}

	/**
	 * Sets the `toString` method of `func` to return `string`.
	 *
	 * @private
	 * @param {Function} func The function to modify.
	 * @param {Function} string The `toString` result.
	 * @returns {Function} Returns `func`.
	 */
	var setToString = shortOut(baseSetToString);

	/**
	 * Creates a function that'll short out and invoke `identity` instead
	 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
	 * milliseconds.
	 *
	 * @private
	 * @param {Function} func The function to restrict.
	 * @returns {Function} Returns the new shortable function.
	 */
	function shortOut(func) {
	  var count = 0,
	      lastCalled = 0;

	  return function() {
	    var stamp = nativeNow(),
	        remaining = HOT_SPAN - (stamp - lastCalled);

	    lastCalled = stamp;
	    if (remaining > 0) {
	      if (++count >= HOT_COUNT) {
	        return arguments[0];
	      }
	    } else {
	      count = 0;
	    }
	    return func.apply(undefined, arguments);
	  };
	}

	/**
	 * Converts `func` to its source code.
	 *
	 * @private
	 * @param {Function} func The function to convert.
	 * @returns {string} Returns the source code.
	 */
	function toSource(func) {
	  if (func != null) {
	    try {
	      return funcToString.call(func);
	    } catch (e) {}
	    try {
	      return (func + '');
	    } catch (e) {}
	  }
	  return '';
	}

	/**
	 * Performs a
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 * var other = { 'a': 1 };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || (value !== value && other !== other);
	}

	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
	  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
	    !propertyIsEnumerable.call(value, 'callee');
	};

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;

	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && isLength(value.length) && !isFunction(value);
	}

	/**
	 * This method is like `_.isArrayLike` except that it also checks if `value`
	 * is an object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array-like object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArrayLikeObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLikeObject(document.body.children);
	 * // => true
	 *
	 * _.isArrayLikeObject('abc');
	 * // => false
	 *
	 * _.isArrayLikeObject(_.noop);
	 * // => false
	 */
	function isArrayLikeObject(value) {
	  return isObjectLike(value) && isArrayLike(value);
	}

	/**
	 * Checks if `value` is a buffer.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.3.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
	 * @example
	 *
	 * _.isBuffer(new Buffer(2));
	 * // => true
	 *
	 * _.isBuffer(new Uint8Array(2));
	 * // => false
	 */
	var isBuffer = nativeIsBuffer || stubFalse;

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  if (!isObject(value)) {
	    return false;
	  }
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 9 which returns 'object' for typed arrays and other constructors.
	  var tag = baseGetTag(value);
	  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
	}

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return value != null && (type == 'object' || type == 'function');
	}

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return value != null && typeof value == 'object';
	}

	/**
	 * Checks if `value` is a plain object, that is, an object created by the
	 * `Object` constructor or one with a `[[Prototype]]` of `null`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.8.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 * }
	 *
	 * _.isPlainObject(new Foo);
	 * // => false
	 *
	 * _.isPlainObject([1, 2, 3]);
	 * // => false
	 *
	 * _.isPlainObject({ 'x': 0, 'y': 0 });
	 * // => true
	 *
	 * _.isPlainObject(Object.create(null));
	 * // => true
	 */
	function isPlainObject(value) {
	  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
	    return false;
	  }
	  var proto = getPrototype(value);
	  if (proto === null) {
	    return true;
	  }
	  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
	  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
	    funcToString.call(Ctor) == objectCtorString;
	}

	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 * @example
	 *
	 * _.isTypedArray(new Uint8Array);
	 * // => true
	 *
	 * _.isTypedArray([]);
	 * // => false
	 */
	var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

	/**
	 * Converts `value` to a plain object flattening inherited enumerable string
	 * keyed properties of `value` to own properties of the plain object.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {Object} Returns the converted plain object.
	 * @example
	 *
	 * function Foo() {
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.assign({ 'a': 1 }, new Foo);
	 * // => { 'a': 1, 'b': 2 }
	 *
	 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
	 * // => { 'a': 1, 'b': 2, 'c': 3 }
	 */
	function toPlainObject(value) {
	  return copyObject(value, keysIn(value));
	}

	/**
	 * Creates an array of the own and inherited enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keysIn(new Foo);
	 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	 */
	function keysIn(object) {
	  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
	}

	/**
	 * This method is like `_.assign` except that it recursively merges own and
	 * inherited enumerable string keyed properties of source objects into the
	 * destination object. Source properties that resolve to `undefined` are
	 * skipped if a destination value exists. Array and plain object properties
	 * are merged recursively. Other objects and value types are overridden by
	 * assignment. Source objects are applied from left to right. Subsequent
	 * sources overwrite property assignments of previous sources.
	 *
	 * **Note:** This method mutates `object`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.5.0
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @returns {Object} Returns `object`.
	 * @example
	 *
	 * var object = {
	 *   'a': [{ 'b': 2 }, { 'd': 4 }]
	 * };
	 *
	 * var other = {
	 *   'a': [{ 'c': 3 }, { 'e': 5 }]
	 * };
	 *
	 * _.merge(object, other);
	 * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
	 */
	var merge = createAssigner(function(object, source, srcIndex) {
	  baseMerge(object, source, srcIndex);
	});

	/**
	 * Creates a function that returns `value`.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Util
	 * @param {*} value The value to return from the new function.
	 * @returns {Function} Returns the new constant function.
	 * @example
	 *
	 * var objects = _.times(2, _.constant({ 'a': 1 }));
	 *
	 * console.log(objects);
	 * // => [{ 'a': 1 }, { 'a': 1 }]
	 *
	 * console.log(objects[0] === objects[1]);
	 * // => true
	 */
	function constant(value) {
	  return function() {
	    return value;
	  };
	}

	/**
	 * This method returns the first argument it receives.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	/**
	 * This method returns `false`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {boolean} Returns `false`.
	 * @example
	 *
	 * _.times(2, _.stubFalse);
	 * // => [false, false]
	 */
	function stubFalse() {
	  return false;
	}

	module.exports = merge;
	});

	var whatInput = createCommonjsModule(function (module, exports) {
	/**
	 * what-input - A global utility for tracking the current input method (mouse, keyboard or touch).
	 * @version v5.1.4
	 * @link https://github.com/ten1seven/what-input
	 * @license MIT
	 */
	(function webpackUniversalModuleDefinition(root, factory) {
		module.exports = factory();
	})(commonjsGlobal, function() {
	return /******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};

	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {

	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId])
	/******/ 			return installedModules[moduleId].exports;

	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			exports: {},
	/******/ 			id: moduleId,
	/******/ 			loaded: false
	/******/ 		};

	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

	/******/ 		// Flag the module as loaded
	/******/ 		module.loaded = true;

	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}


	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 	__webpack_require__.m = modules;

	/******/ 	// expose the module cache
	/******/ 	__webpack_require__.c = installedModules;

	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";

	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(0);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ (function(module, exports) {

		module.exports = function () {
		  /*
		   * bail out if there is no document or window
		   * (i.e. in a node/non-DOM environment)
		   *
		   * Return a stubbed API instead
		   */
		  if (typeof document === 'undefined' || typeof window === 'undefined') {
		    return {
		      // always return "initial" because no interaction will ever be detected
		      ask: function ask() {
		        return 'initial';
		      },

		      // always return null
		      element: function element() {
		        return null;
		      },

		      // no-op
		      ignoreKeys: function ignoreKeys() {},

		      // no-op
		      specificKeys: function specificKeys() {},

		      // no-op
		      registerOnChange: function registerOnChange() {},

		      // no-op
		      unRegisterOnChange: function unRegisterOnChange() {}
		    };
		  }

		  /*
		   * variables
		   */

		  // cache document.documentElement
		  var docElem = document.documentElement;

		  // currently focused dom element
		  var currentElement = null;

		  // last used input type
		  var currentInput = 'initial';

		  // last used input intent
		  var currentIntent = currentInput;

		  // check for sessionStorage support
		  // then check for session variables and use if available
		  try {
		    if (window.sessionStorage.getItem('what-input')) {
		      currentInput = window.sessionStorage.getItem('what-input');
		    }

		    if (window.sessionStorage.getItem('what-intent')) {
		      currentIntent = window.sessionStorage.getItem('what-intent');
		    }
		  } catch (e) {}

		  // event buffer timer
		  var eventTimer = null;

		  // form input types
		  var formInputs = ['input', 'select', 'textarea'];

		  // empty array for holding callback functions
		  var functionList = [];

		  // list of modifier keys commonly used with the mouse and
		  // can be safely ignored to prevent false keyboard detection
		  var ignoreMap = [16, // shift
		  17, // control
		  18, // alt
		  91, // Windows key / left Apple cmd
		  93 // Windows menu / right Apple cmd
		  ];

		  var specificMap = [];

		  // mapping of events to input types
		  var inputMap = {
		    keydown: 'keyboard',
		    keyup: 'keyboard',
		    mousedown: 'mouse',
		    mousemove: 'mouse',
		    MSPointerDown: 'pointer',
		    MSPointerMove: 'pointer',
		    pointerdown: 'pointer',
		    pointermove: 'pointer',
		    touchstart: 'touch',
		    touchend: 'touch'

		    // boolean: true if touch buffer is active
		  };var isBuffering = false;

		  // boolean: true if the page is being scrolled
		  var isScrolling = false;

		  // store current mouse position
		  var mousePos = {
		    x: null,
		    y: null

		    // map of IE 10 pointer events
		  };var pointerMap = {
		    2: 'touch',
		    3: 'touch', // treat pen like touch
		    4: 'mouse'

		    // check support for passive event listeners
		  };var supportsPassive = false;

		  try {
		    var opts = Object.defineProperty({}, 'passive', {
		      get: function get() {
		        supportsPassive = true;
		      }
		    });

		    window.addEventListener('test', null, opts);
		  } catch (e) {}

		  /*
		   * set up
		   */

		  var setUp = function setUp() {
		    // add correct mouse wheel event mapping to `inputMap`
		    inputMap[detectWheel()] = 'mouse';

		    addListeners();
		    doUpdate('input');
		    doUpdate('intent');
		  };

		  /*
		   * events
		   */

		  var addListeners = function addListeners() {
		    // `pointermove`, `MSPointerMove`, `mousemove` and mouse wheel event binding
		    // can only demonstrate potential, but not actual, interaction
		    // and are treated separately
		    var options = supportsPassive ? { passive: true } : false;

		    // pointer events (mouse, pen, touch)
		    if (window.PointerEvent) {
		      window.addEventListener('pointerdown', setInput);
		      window.addEventListener('pointermove', setIntent);
		    } else if (window.MSPointerEvent) {
		      window.addEventListener('MSPointerDown', setInput);
		      window.addEventListener('MSPointerMove', setIntent);
		    } else {
		      // mouse events
		      window.addEventListener('mousedown', setInput);
		      window.addEventListener('mousemove', setIntent);

		      // touch events
		      if ('ontouchstart' in window) {
		        window.addEventListener('touchstart', eventBuffer, options);
		        window.addEventListener('touchend', setInput);
		      }
		    }

		    // mouse wheel
		    window.addEventListener(detectWheel(), setIntent, options);

		    // keyboard events
		    window.addEventListener('keydown', eventBuffer);
		    window.addEventListener('keyup', eventBuffer);

		    // focus events
		    window.addEventListener('focusin', setElement);
		    window.addEventListener('focusout', clearElement);
		  };

		  // checks conditions before updating new input
		  var setInput = function setInput(event) {
		    // only execute if the event buffer timer isn't running
		    if (!isBuffering) {
		      var eventKey = event.which;
		      var value = inputMap[event.type];

		      if (value === 'pointer') {
		        value = pointerType(event);
		      }

		      var ignoreMatch = !specificMap.length && ignoreMap.indexOf(eventKey) === -1;

		      var specificMatch = specificMap.length && specificMap.indexOf(eventKey) !== -1;

		      var shouldUpdate = value === 'keyboard' && eventKey && (ignoreMatch || specificMatch) || value === 'mouse' || value === 'touch';

		      if (currentInput !== value && shouldUpdate) {
		        currentInput = value;

		        try {
		          window.sessionStorage.setItem('what-input', currentInput);
		        } catch (e) {}

		        doUpdate('input');
		      }

		      if (currentIntent !== value && shouldUpdate) {
		        // preserve intent for keyboard typing in form fields
		        var activeElem = document.activeElement;
		        var notFormInput = activeElem && activeElem.nodeName && formInputs.indexOf(activeElem.nodeName.toLowerCase()) === -1;

		        if (notFormInput) {
		          currentIntent = value;

		          try {
		            window.sessionStorage.setItem('what-intent', currentIntent);
		          } catch (e) {}

		          doUpdate('intent');
		        }
		      }
		    }
		  };

		  // updates the doc and `inputTypes` array with new input
		  var doUpdate = function doUpdate(which) {
		    docElem.setAttribute('data-what' + which, which === 'input' ? currentInput : currentIntent);

		    fireFunctions(which);
		  };

		  // updates input intent for `mousemove` and `pointermove`
		  var setIntent = function setIntent(event) {
		    // test to see if `mousemove` happened relative to the screen to detect scrolling versus mousemove
		    detectScrolling(event);

		    // only execute if the event buffer timer isn't running
		    // or scrolling isn't happening
		    if (!isBuffering && !isScrolling) {
		      var value = inputMap[event.type];
		      if (value === 'pointer') {
		        value = pointerType(event);
		      }

		      if (currentIntent !== value) {
		        currentIntent = value;

		        try {
		          window.sessionStorage.setItem('what-intent', currentIntent);
		        } catch (e) {}

		        doUpdate('intent');
		      }
		    }
		  };

		  var setElement = function setElement(event) {
		    if (!event.target.nodeName) {
		      // If nodeName is undefined, clear the element
		      // This can happen if click inside an <svg> element.
		      clearElement();
		      return;
		    }

		    currentElement = event.target.nodeName.toLowerCase();
		    docElem.setAttribute('data-whatelement', currentElement);

		    if (event.target.classList && event.target.classList.length) {
		      docElem.setAttribute('data-whatclasses', event.target.classList.toString().replace(' ', ','));
		    }
		  };

		  var clearElement = function clearElement() {
		    currentElement = null;

		    docElem.removeAttribute('data-whatelement');
		    docElem.removeAttribute('data-whatclasses');
		  };

		  // buffers events that frequently also fire mouse events
		  var eventBuffer = function eventBuffer(event) {
		    // set the current input
		    setInput(event);

		    // clear the timer if it happens to be running
		    window.clearTimeout(eventTimer);

		    // set the isBuffering to `true`
		    isBuffering = true;

		    // run the timer
		    eventTimer = window.setTimeout(function () {
		      // if the timer runs out, set isBuffering back to `false`
		      isBuffering = false;
		    }, 120);
		  };

		  /*
		   * utilities
		   */

		  var pointerType = function pointerType(event) {
		    if (typeof event.pointerType === 'number') {
		      return pointerMap[event.pointerType];
		    } else {
		      // treat pen like touch
		      return event.pointerType === 'pen' ? 'touch' : event.pointerType;
		    }
		  };

		  // detect version of mouse wheel event to use
		  // via https://developer.mozilla.org/en-US/docs/Web/Events/wheel
		  var detectWheel = function detectWheel() {
		    var wheelType = void 0;

		    // Modern browsers support "wheel"
		    if ('onwheel' in document.createElement('div')) {
		      wheelType = 'wheel';
		    } else {
		      // Webkit and IE support at least "mousewheel"
		      // or assume that remaining browsers are older Firefox
		      wheelType = document.onmousewheel !== undefined ? 'mousewheel' : 'DOMMouseScroll';
		    }

		    return wheelType;
		  };

		  // runs callback functions
		  var fireFunctions = function fireFunctions(type) {
		    for (var i = 0, len = functionList.length; i < len; i++) {
		      if (functionList[i].type === type) {
		        functionList[i].fn.call(undefined, type === 'input' ? currentInput : currentIntent);
		      }
		    }
		  };

		  // finds matching element in an object
		  var objPos = function objPos(match) {
		    for (var i = 0, len = functionList.length; i < len; i++) {
		      if (functionList[i].fn === match) {
		        return i;
		      }
		    }
		  };

		  var detectScrolling = function detectScrolling(event) {
		    if (mousePos['x'] !== event.screenX || mousePos['y'] !== event.screenY) {
		      isScrolling = false;

		      mousePos['x'] = event.screenX;
		      mousePos['y'] = event.screenY;
		    } else {
		      isScrolling = true;
		    }
		  };

		  /*
		   * init
		   */

		  // don't start script unless browser cuts the mustard
		  // (also passes if polyfills are used)
		  if ('addEventListener' in window && Array.prototype.indexOf) {
		    setUp();
		  }

		  /*
		   * api
		   */

		  return {
		    // returns string: the current input type
		    // opt: 'intent'|'input'
		    // 'input' (default): returns the same value as the `data-whatinput` attribute
		    // 'intent': includes `data-whatintent` value if it's different than `data-whatinput`
		    ask: function ask(opt) {
		      return opt === 'intent' ? currentIntent : currentInput;
		    },

		    // returns string: the currently focused element or null
		    element: function element() {
		      return currentElement;
		    },

		    // overwrites ignored keys with provided array
		    ignoreKeys: function ignoreKeys(arr) {
		      ignoreMap = arr;
		    },

		    // overwrites specific char keys to update on
		    specificKeys: function specificKeys(arr) {
		      specificMap = arr;
		    },

		    // attach functions to input and intent "events"
		    // funct: function to fire on change
		    // eventType: 'input'|'intent'
		    registerOnChange: function registerOnChange(fn, eventType) {
		      functionList.push({
		        fn: fn,
		        type: eventType || 'input'
		      });
		    },

		    unRegisterOnChange: function unRegisterOnChange(fn) {
		      var position = objPos(fn);

		      if (position || position === 0) {
		        functionList.splice(position, 1);
		      }
		    }
		  };
		}();

	/***/ })
	/******/ ])
	});
	});

	var zenscroll = createCommonjsModule(function (module) {
	/**
	 * Zenscroll 4.0.2
	 * https://github.com/zengabor/zenscroll/
	 *
	 * Copyright 2015–2018 Gabor Lenard
	 *
	 * This is free and unencumbered software released into the public domain.
	 * 
	 * Anyone is free to copy, modify, publish, use, compile, sell, or
	 * distribute this software, either in source code form or as a compiled
	 * binary, for any purpose, commercial or non-commercial, and by any
	 * means.
	 * 
	 * In jurisdictions that recognize copyright laws, the author or authors
	 * of this software dedicate any and all copyright interest in the
	 * software to the public domain. We make this dedication for the benefit
	 * of the public at large and to the detriment of our heirs and
	 * successors. We intend this dedication to be an overt act of
	 * relinquishment in perpetuity of all present and future rights to this
	 * software under copyright law.
	 * 
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
	 * IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
	 * OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
	 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
	 * OTHER DEALINGS IN THE SOFTWARE.
	 * 
	 * For more information, please refer to <http://unlicense.org>
	 * 
	 */

	/*jshint devel:true, asi:true */

	/*global define, module */


	(function (root, factory) {
		if (module.exports) {
			module.exports = factory();
		} else {
			(function install() {
				// To make sure Zenscroll can be referenced from the header, before `body` is available
				if (document && document.body) {
					root.zenscroll = factory();
				} else {
					// retry 9ms later
					setTimeout(install, 9);
				}
			})();
		}
	}(commonjsGlobal, function () {


		// Detect if the browser already supports native smooth scrolling (e.g., Firefox 36+ and Chrome 49+) and it is enabled:
		var isNativeSmoothScrollEnabledOn = function (elem) {
			return elem && "getComputedStyle" in window &&
				window.getComputedStyle(elem)["scroll-behavior"] === "smooth"
		};


		// Exit if it’s not a browser environment:
		if (typeof window === "undefined" || !("document" in window)) {
			return {}
		}


		var makeScroller = function (container, defaultDuration, edgeOffset) {

			// Use defaults if not provided
			defaultDuration = defaultDuration || 999; //ms
			if (!edgeOffset && edgeOffset !== 0) {
				// When scrolling, this amount of distance is kept from the edges of the container:
				edgeOffset = 9; //px
			}

			// Handling the life-cycle of the scroller
			var scrollTimeoutId;
			var setScrollTimeoutId = function (newValue) {
				scrollTimeoutId = newValue;
			};

			/**
			 * Stop the current smooth scroll operation immediately
			 */
			var stopScroll = function () {
				clearTimeout(scrollTimeoutId);
				setScrollTimeoutId(0);
			};

			var getTopWithEdgeOffset = function (elem) {
				return Math.max(0, container.getTopOf(elem) - edgeOffset)
			};

			/**
			 * Scrolls to a specific vertical position in the document.
			 *
			 * @param {targetY} The vertical position within the document.
			 * @param {duration} Optionally the duration of the scroll operation.
			 *        If not provided the default duration is used.
			 * @param {onDone} An optional callback function to be invoked once the scroll finished.
			 */
			var scrollToY = function (targetY, duration, onDone) {
				stopScroll();
				if (duration === 0 || (duration && duration < 0) || isNativeSmoothScrollEnabledOn(container.body)) {
					container.toY(targetY);
					if (onDone) {
						onDone();
					}
				} else {
					var startY = container.getY();
					var distance = Math.max(0, targetY) - startY;
					var startTime = new Date().getTime();
					duration = duration || Math.min(Math.abs(distance), defaultDuration);
					(function loopScroll() {
						setScrollTimeoutId(setTimeout(function () {
							// Calculate percentage:
							var p = Math.min(1, (new Date().getTime() - startTime) / duration);
							// Calculate the absolute vertical position:
							var y = Math.max(0, Math.floor(startY + distance*(p < 0.5 ? 2*p*p : p*(4 - p*2)-1)));
							container.toY(y);
							if (p < 1 && (container.getHeight() + y) < container.body.scrollHeight) {
								loopScroll();
							} else {
								setTimeout(stopScroll, 99); // with cooldown time
								if (onDone) {
									onDone();
								}
							}
						}, 9));
					})();
				}
			};

			/**
			 * Scrolls to the top of a specific element.
			 *
			 * @param {elem} The element to scroll to.
			 * @param {duration} Optionally the duration of the scroll operation.
			 * @param {onDone} An optional callback function to be invoked once the scroll finished.
			 */
			var scrollToElem = function (elem, duration, onDone) {
				scrollToY(getTopWithEdgeOffset(elem), duration, onDone);
			};

			/**
			 * Scrolls an element into view if necessary.
			 *
			 * @param {elem} The element.
			 * @param {duration} Optionally the duration of the scroll operation.
			 * @param {onDone} An optional callback function to be invoked once the scroll finished.
			 */
			var scrollIntoView = function (elem, duration, onDone) {
				var elemHeight = elem.getBoundingClientRect().height;
				var elemBottom = container.getTopOf(elem) + elemHeight;
				var containerHeight = container.getHeight();
				var y = container.getY();
				var containerBottom = y + containerHeight;
				if (getTopWithEdgeOffset(elem) < y || (elemHeight + edgeOffset) > containerHeight) {
					// Element is clipped at top or is higher than screen.
					scrollToElem(elem, duration, onDone);
				} else if ((elemBottom + edgeOffset) > containerBottom) {
					// Element is clipped at the bottom.
					scrollToY(elemBottom - containerHeight + edgeOffset, duration, onDone);
				} else if (onDone) {
					onDone();
				}
			};

			/**
			 * Scrolls to the center of an element.
			 *
			 * @param {elem} The element.
			 * @param {duration} Optionally the duration of the scroll operation.
			 * @param {offset} Optionally the offset of the top of the element from the center of the screen.
			 *        A value of 0 is ignored.
			 * @param {onDone} An optional callback function to be invoked once the scroll finished.
			 */
			var scrollToCenterOf = function (elem, duration, offset, onDone) {
				scrollToY(Math.max(0, container.getTopOf(elem) - container.getHeight()/2 + (offset || elem.getBoundingClientRect().height/2)), duration, onDone);
			};

			/**
			 * Changes default settings for this scroller.
			 *
			 * @param {newDefaultDuration} Optionally a new value for default duration, used for each scroll method by default.
			 *        Ignored if null or undefined.
			 * @param {newEdgeOffset} Optionally a new value for the edge offset, used by each scroll method by default. Ignored if null or undefined.
			 * @returns An object with the current values.
			 */
			var setup = function (newDefaultDuration, newEdgeOffset) {
				if (newDefaultDuration === 0 || newDefaultDuration) {
					defaultDuration = newDefaultDuration;
				}
				if (newEdgeOffset === 0 || newEdgeOffset) {
					edgeOffset = newEdgeOffset;
				}
				return {
					defaultDuration: defaultDuration,
					edgeOffset: edgeOffset
				}
			};

			return {
				setup: setup,
				to: scrollToElem,
				toY: scrollToY,
				intoView: scrollIntoView,
				center: scrollToCenterOf,
				stop: stopScroll,
				moving: function () { return !!scrollTimeoutId },
				getY: container.getY,
				getTopOf: container.getTopOf
			}

		};


		var docElem = document.documentElement;
		var getDocY = function () { return window.scrollY || docElem.scrollTop };

		// Create a scroller for the document:
		var zenscroll = makeScroller({
			body: document.scrollingElement || document.body,
			toY: function (y) { window.scrollTo(0, y); },
			getY: getDocY,
			getHeight: function () { return window.innerHeight || docElem.clientHeight },
			getTopOf: function (elem) { return elem.getBoundingClientRect().top + getDocY() - docElem.offsetTop }
		});


		/**
		 * Creates a scroller from the provided container element (e.g., a DIV)
		 *
		 * @param {scrollContainer} The vertical position within the document.
		 * @param {defaultDuration} Optionally a value for default duration, used for each scroll method by default.
		 *        Ignored if 0 or null or undefined.
		 * @param {edgeOffset} Optionally a value for the edge offset, used by each scroll method by default. 
		 *        Ignored if null or undefined.
		 * @returns A scroller object, similar to `zenscroll` but controlling the provided element.
		 */
		zenscroll.createScroller = function (scrollContainer, defaultDuration, edgeOffset) {
			return makeScroller({
				body: scrollContainer,
				toY: function (y) { scrollContainer.scrollTop = y; },
				getY: function () { return scrollContainer.scrollTop },
				getHeight: function () { return Math.min(scrollContainer.clientHeight, window.innerHeight || docElem.clientHeight) },
				getTopOf: function (elem) { return elem.offsetTop }
			}, defaultDuration, edgeOffset)
		};


		// Automatic link-smoothing on achors
		// Exclude IE8- or when native is enabled or Zenscroll auto- is disabled
		if ("addEventListener" in window && !window.noZensmooth && !isNativeSmoothScrollEnabledOn(document.body)) {

			var isHistorySupported = "history" in window && "pushState" in history;
			var isScrollRestorationSupported = isHistorySupported && "scrollRestoration" in history;

			// On first load & refresh make sure the browser restores the position first
			if (isScrollRestorationSupported) {
				history.scrollRestoration = "auto";
			}

			window.addEventListener("load", function () {

				if (isScrollRestorationSupported) {
					// Set it to manual
					setTimeout(function () { history.scrollRestoration = "manual"; }, 9);
					window.addEventListener("popstate", function (event) {
						if (event.state && "zenscrollY" in event.state) {
							zenscroll.toY(event.state.zenscrollY);
						}
					}, false);
				}

				// Add edge offset on first load if necessary
				// This may not work on IE (or older computer?) as it requires more timeout, around 100 ms
				if (window.location.hash) {
					setTimeout(function () {
						// Adjustment is only needed if there is an edge offset:
						var edgeOffset = zenscroll.setup().edgeOffset;
						if (edgeOffset) {
							var targetElem = document.getElementById(window.location.href.split("#")[1]);
							if (targetElem) {
								var targetY = Math.max(0, zenscroll.getTopOf(targetElem) - edgeOffset);
								var diff = zenscroll.getY() - targetY;
								// Only do the adjustment if the browser is very close to the element:
								if (0 <= diff && diff < 9 ) {
									window.scrollTo(0, targetY);
								}
							}
						}
					}, 9);
				}

			}, false);

			// Handling clicks on anchors
			var RE_noZensmooth = new RegExp("(^|\\s)noZensmooth(\\s|$)");
			window.addEventListener("click", function (event) {
				var anchor = event.target;
				while (anchor && anchor.tagName !== "A") {
					anchor = anchor.parentNode;
				}
				// Let the browser handle the click if it wasn't with the primary button, or with some modifier keys:
				if (!anchor || event.which !== 1 || event.shiftKey || event.metaKey || event.ctrlKey || event.altKey) {
					return
				}
				// Save the current scrolling position so it can be used for scroll restoration:
				if (isScrollRestorationSupported) {
					var historyState = history.state && typeof history.state === "object" ? history.state : {};
					historyState.zenscrollY = zenscroll.getY();
					try {
						history.replaceState(historyState, "");
					} catch (e) {
						// Avoid the Chrome Security exception on file protocol, e.g., file://index.html
					}
				}
				// Find the referenced ID:
				var href = anchor.getAttribute("href") || "";
				if (href.indexOf("#") === 0 && !RE_noZensmooth.test(anchor.className)) {
					var targetY = 0;
					var targetElem = document.getElementById(href.substring(1));
					if (href !== "#") {
						if (!targetElem) {
							// Let the browser handle the click if the target ID is not found.
							return
						}
						targetY = zenscroll.getTopOf(targetElem);
					}
					event.preventDefault();
					// By default trigger the browser's `hashchange` event...
					var onDone = function () { window.location = href; };
					// ...unless there is an edge offset specified
					var edgeOffset = zenscroll.setup().edgeOffset;
					if (edgeOffset) {
						targetY = Math.max(0, targetY - edgeOffset);
						if (isHistorySupported) {
							onDone = function () { history.pushState({}, "", href); };
						}
					}
					zenscroll.toY(targetY, null, onDone);
				}
			}, false);

		}


		return zenscroll


	}));
	});

	/* jshint browser: true */

	class AccessDropdown {

	    /**
	     @class AccessDropdown
	     @summary Autopositioning and accessible dropdown
	     @param {Object} options - Supplied configuration

	     @param {String|HTMLElement} options.el - The dropdown container element. Either an HTML element object or selector string. **Required**
	     @param {String} options.dropdownTriggerSelector Button that opens and closes the dropdown. Either an HTML element object or selector string. **Optional**
	     @param {String|HTMLElement} options.dropdownBody The contents of the dropdown. Either an HTML element object or selector string. **Optional**
	     @param {String|HTMLElement} options.closeTrigger X button that closes the dropdown. Either an HTML element object or selector string. **Optional**

	     @param {Boolean} [options.useRequestAnimationFrame=true] Use request animation frame technique or window events for positioning logic

	     @param {Number} [options.plusTop=0] Extra top pixel allowance for an outer drop shadow.
	     @param {Number} [options.plusBottom=0] Extra bottom pixel allowance for an outer drop shadow.
	     @param {Number} [options.plusRight=0] Extra right pixel allowance for an outer drop shadow.
	     @param {Number} [options.plusLeft=0] Extra left pixel allowance for an outer drop shadow.

	     @param {Boolean} [options.disabledDisplayAttr=false] Set the dropdown body display style to 'none'
	     @param {Number|Boolean} [options.dropdownBodyMinHeight=250] Minimum height of dropdown before it flips from below the trigger to above

	     @param {Number} [options.windowResizeDelay=50] How long to wait on _trailing_ window resize event logic
	     @param {Number} [options.windowScrollDelay=50] How long to wait on _trailing_ window scroll event logic
	     @param {Number} [options.focusLostHideDelay=50] How long to wait before closing after body lost focus
	     @param {Number} [options.stopInlineStylesMaxWidth=600] Below this viewport width the position function short circuits and does not set inline position styles
	     @param {Function} [options.testOutsideTrigger] If outside event must close dropdown

	     @param {Object} [options.bodyClassMap] - User supplied class for body element in different appearing cases
	     @param {String} [options.bodyClassMap.inlineStylingWasStopped="inline-styling-was-stopped"] - When stopInlineStylesMaxWidth matches
	     @param {String} [options.bodyClassMap.fullScreen="full-screen"] - Dropdown is bigger that viewport
	     @param {String} [options.bodyClassMap.allWidthCenterHeight="all-width-center-height"] - When fit all width and centered by height (portrait mobile)
	     @param {String} [options.bodyClassMap.allHeightCenterWidth="all-height-center-width"] - When fit all height, and centered by width (landscape mobile)
	     @param {String} [options.bodyClassMap.leftBottom="left-bottom"] - Left bottom
	     @param {String} [options.bodyClassMap.leftTop="left-top"] - Left top
	     @param {String} [options.bodyClassMap.rightBottom="right-bottom"] - Right bottom
	     @param {String} [options.bodyClassMap.rightTop="right-top"] - Right top

	     @param {Object} [options.callbacks] - User supplied functions to execute at given stages of the component lifecycle
	     @param {Function} options.callbacks.preCreate
	     @param {Function} options.callbacks.preEsc
	     @param {Function} options.callbacks.preOutsideTrigger
	     @param {Function} options.callbacks.preFocusMoved
	     @param {Function} options.callbacks.preFocusOut
	     @param {Function} options.callbacks.preOpen
	     @param {Function} options.callbacks.preDestroy
	     @param {Function} options.callbacks.preClose
	     @param {Function} options.callbacks.postCreate
	     @param {Function} options.callbacks.postEsc
	     @param {Function} options.callbacks.postFocusMoved
	     @param {Function} options.callbacks.postFocusOut
	     @param {Function} options.callbacks.postOpen
	     @param {Function} options.callbacks.postDestroy
	     @param {Function} options.callbacks.postClose
	     @param {Function} options.callbacks.preAccessDropdownClose - Before custom event handler run
	     @param {Function} options.callbacks.postAccessDropdownClose - After custom event handler run
	     @param {Function} options.callbacks.preXClick
	     @param {Function} options.callbacks.postXClick
	     */
	    constructor(options) {
	        let defaults;

	        if (options === undefined) {
	            options = {};
	        }

	        this.requestAnimFrameFunction =
	            window.requestAnimationFrame ||
	            window.mozRequestAnimationFrame ||
	            window.webkitRequestAnimationFrame ||
	            window.msRequestAnimationFrame ||
	            function (callback) {
	                window.setTimeout(callback, 1000 / 60);
	            };

	        defaults = {};
	        defaults.el = null;
	        defaults.dropdownTriggerSelector = '.access-dropdown-toggle';
	        defaults.dropdownBody = '.access-dropdown-menu';
	        defaults.closeTrigger = '.access-dropdown-close';
	        defaults.disabledDisplayAttr = false;
	        defaults.dropdownBodyMinHeight = 250;
	        defaults.stopInlineStylesMaxWidth = 600;

	        defaults.windowResizeDelay = 50;
	        defaults.windowScrollDelay = 50;
	        defaults.focusLostHideDelay = 50;
	        defaults.useRequestAnimationFrame = true;

	        defaults.plusTop = 0;
	        defaults.plusRight = 0;
	        defaults.plusBottom = 0;
	        defaults.plusLeft = 0;

	        defaults.bodyClassMap = {
	            inlineStylingWasStopped: 'inline-styling-was-stopped',
	            fullScreen: 'full-screen',
	            allWidthCenterHeight: 'all-width-center-height',
	            allHeightCenterWidth: 'all-height-center-width',
	            leftBottom: 'left-bottom',
	            leftTop: 'left-top',
	            rightBottom: 'right-bottom',
	            rightTop: 'right-top'
	        };

	        defaults.focusableElements = [
	            'a[href]:not([tabindex="-1"])',
	            'area[href]:not([tabindex="-1"])',
	            'input:not([disabled]):not([tabindex="-1"])',
	            'select:not([disabled]):not([tabindex="-1"])',
	            'textarea:not([disabled]):not([tabindex="-1"])',
	            'button:not([disabled]):not([tabindex="-1"])',
	            'iframe:not([tabindex="-1"])',
	            '[tabindex]:not([tabindex="-1"])',
	            '[contentEditable=true]:not([tabindex="-1"])'
	        ];

	        //put supplied options on top of defaults
	        lodash_merge(this, defaults, options);

	        if (this.el === undefined || this.el === null) {
	            throw 'AccessDropdown you must supply an `el`';
	        }

	        if (typeof this.el === 'string') { //it’s a string to be used for a selector
	            this.el = document.querySelector(options.el);
	        }

	        if (typeof this.dropdownTriggerSelector === 'string') { //it’s a string to be used for a selector
	            this.dropdownTrigger = this.el.querySelector(this.dropdownTriggerSelector);
	        }
	        else {
	            throw 'AccessDropdown you must supply a `dropdownTriggerSelector`';
	        }

	        if (typeof this.dropdownBody === 'string') { //it’s a string to be used for a selector
	            this.dropdownBody = this.el.querySelector(this.dropdownBody);
	        }

	        if (typeof this.closeTrigger === 'string') { //it’s a string to be used for a selector
	            this.closeTrigger = this.el.querySelector(this.closeTrigger);
	        }

	        this.callCustom('preCreate');

	        // Create/Destroy handlers
	        this.closeClickFn = null;
	        this.triggerClickFn = null;
	        this.bodyFocusOutFn = null;

	        // Open/Close handlers
	        this.escKeyFn = null;
	        this.documentClickFn = null;
	        this.windowResizeFn = null;
	        this.windowScrollFn = null;
	        this.triggerClickFn = this.onTriggerClick.bind(this);

	        this.dropdownTrigger.addEventListener('click', this.triggerClickFn);
	        this.dropdownTrigger.addEventListener('touch', this.triggerClickFn);

	        this.accessDropdownCloseFn = this.onAccessDropdownClose.bind(this);
	        this.dropdownTrigger.addEventListener('access-dropdown:close', this.accessDropdownCloseFn);

	        this.bodyFocusOutFn = this.onBodyFocusOut.bind(this);
	        this.dropdownBody.addEventListener('focusout', this.bodyFocusOutFn);
	        this.dropdownBody.addEventListener('access-dropdown:close', this.accessDropdownCloseFn);

	        this.childFocusFn = this.onChildFocus.bind(this);
	        this.focusableChildList = [];

	        if (this.closeTrigger !== null) {
	            this.closeTrigger.style.display = 'none';

	            this.clickCloseFn = this.onCloseClick.bind(this);
	            this.closeTrigger.addEventListener('click', this.clickCloseFn);
	            this.closeTrigger.addEventListener('touch', this.clickCloseFn);
	        }

	        //set aria-labelledby to point to the button id
	        let uid = new shortUniqueId_min();
	        this.myId = 'access-dropdown-' + uid.randomUUID(6);
	        this.dropdownTrigger.setAttribute('id', this.myId);
	        this.dropdownTrigger.setAttribute('aria-expanded', false);
	        this.dropdownBody.setAttribute('aria-labelledby', this.myId);
	        this.dropdownBody.setAttribute('aria-hidden', true);
	        this.dropdownBody.setAttribute('tabindex', -1);
	        if (!this.disabledDisplayAttr) {
	            this.dropdownBody.style.display = 'none';
	        }

	        this.isOpen = false;
	        this.callCustom('postCreate');

	        if (!AccessDropdown.prototype.scrollSize) {
	            this.measureScroll();
	        }
	    }

	    /**
	     * @method onEscKey
	     * @memberOf AccessDropdown
	     * @instance
	     * @summary Internal escape key listener
	     * @private
	     */
	    onEscKey(e) {
	        let code = e.charCode || e.keyCode; //normalize char codes cross browser
	        if (e.type === 'keydown' && code === 27) { //escape key
	            this.callCustom('preEsc', e);

	            this.close('onEscKey');
	            this.dropdownTrigger.focus();
	            e.stopPropagation();

	            this.callCustom('postEsc', e);
	        }
	    }

	    /**
	     * @method onAccessDropdownClose
	     * @memberOf AccessDropdown
	     * @instance
	     * @summary Custom event handler, access-dropdown:close
	     * @private
	     */
	    onAccessDropdownClose(event) {
	        this.callCustom('preAccessDropdownClose', event);
	        this.dropdownTrigger.focus();
	        this.callCustom('postAccessDropdownClose', event);
	    }

	    /**
	     * @method onCloseClick
	     * @memberOf AccessDropdown
	     * @instance
	     * @summary Internal close listener
	     * @private
	     */
	    onCloseClick(e) {
	        if ((e.type === 'click' || e.type === 'touch')) {
	            this.callCustom('preXClick', e);
	            this.close('xClicked');
	            this.dropdownTrigger.focus();
	            this.callCustom('postXClick', e);
	        }
	    }

	    /**
	     * @method onDocumentClickTrigger
	     * @memberOf AccessDropdown
	     * @instance
	     * @summary Internal outside click/touch listener
	     * @private
	     */
	    onDocumentClickTrigger(e) {
	        let testResult = true;
	        if ((e.type === 'click' || e.type === 'touch')) {

	            if (typeof this.testOutsideTrigger === 'function') {
	                testResult = this.testOutsideTrigger.apply(this, [e]);
	            }

	            if (testResult !== false) {
	                this.callCustom('preOutsideTrigger', e);

	                if (!this.dropdownTrigger.contains(e.target) && !this.dropdownBody.contains(e.target)) {
	                    this.close('onDocumentClickTrigger');
	                }
	            }
	        }
	    }

	    /**
	     *
	     * @param event
	     */
	    onChildFocus(event) {
	        zenscroll.intoView(event.target);
	    }

	    /**
	     * @method onWindowResize
	     * @memberOf AccessDropdown
	     * @instance
	     * @summary Internal window resize event callback to set position
	     * @private
	     */
	    onWindowResize() {
	        if (this.isOpen) {
	            this.setPosition();
	        }
	    }

	    /**
	     * @method onWindowScroll
	     * @memberOf AccessDropdown
	     * @instance
	     * @summary Internal window scroll event callback to set position
	     * @private
	     */
	    onWindowScroll() {
	        if (this.isOpen) {
	            this.setPosition();
	        }
	    }

	    /**
	     * @method measureScroll
	     * @memberOf AccessDropdown
	     * @instance
	     * @summary Internal measure the width of the browser’s scrollbar
	     * @private
	     */
	    measureScroll() {
	        let outer, inner;

	        outer = document.createElement('div');
	        outer.style.visibility = 'hidden';
	        outer.style.position = 'fixed';
	        outer.style.left = '0';
	        outer.style.top = '0';
	        outer.style.overflow = 'auto';

	        document.body.appendChild(outer);
	        inner = document.createElement('div');
	        inner.style.width = '50px';
	        inner.style.height = '200px';
	        outer.appendChild(inner);
	        outer.style.height = '50px';

	        AccessDropdown.prototype.isScrollOuter = Math.round(outer.offsetWidth - 50);

	        inner.style.width = '100%';
	        outer.style.width = '100px';

	        AccessDropdown.prototype.scrollSize = 100 - inner.clientWidth;

	        outer.parentNode.removeChild(outer);
	    }

	    /**
	     * @method onBodyFocusOut
	     * @memberOf AccessDropdown
	     * @instance
	     * @summary Internal function to detect if focus has moved outside the dropdown’s body
	     * @private
	     */
	    onBodyFocusOut(e) {
	        this.callCustom('preFocusOut', e);

	        if (this.isOpen && (this.dropdownBody === e.target || this.dropdownBody.contains(e.target))) {
	            lodash_debounce((originalEvent) => {
	                this.callCustom('preFocusMoved', originalEvent);

	                if (!this.dropdownBody.contains(document.activeElement) && this.isOpen) {
	                    this.close('focusMoved');
	                }

	                this.callCustom('postFocusMoved', originalEvent);
	            }, this.focusLostHideDelay)(e);
	        }

	        this.callCustom('postFocusOut', e);
	    }

	    /**
	     * @method onTriggerClick
	     * @memberOf AccessDropdown
	     * @instance
	     * @summary Internal function for toggling the dropdown on button click
	     * @private
	     */
	    onTriggerClick(e) {
	        this.callCustom('qualifyClickTrigger', e);

	        if (e.type === 'click' || e.type === 'touch') {
	            this.callCustom('preClickTrigger', e);

	            if (this.dropdownTrigger === e.target ||
	                this.getClosest(e.target, this.dropdownTriggerSelector) === this.dropdownTrigger) {
	                if (this.isOpen) {
	                    this.close('onTriggerClick');
	                } else {
	                    this.open();
	                }
	            } else if (this.dropdownTrigger.contains(e.target)) {
	                e.stopPropagation();
	            }

	            this.callCustom('postClickTrigger', e);
	        }
	    }

	    /**
	     * @method open
	     * @memberOf AccessDropdown
	     * @instance
	     * @summary Public function to open the dropdown
	     */
	    open() {
	        this.isOpen = true;

	        this.callCustom('preOpen');

	        this.dropdownTrigger.setAttribute('aria-expanded', true);
	        this.dropdownBody.setAttribute('aria-hidden', false);
	        if (!this.disabledDisplayAttr) {
	            this.dropdownBody.style.display = 'block';
	        }

	        if (this.closeTrigger !== null) {
	            this.closeTrigger.style.display = 'block';
	        }

	        // only focus when keyboard in use - in other words, if mouse used, keep focus on the trigger
	        if (whatInput.ask() === 'keyboard') {
	            //search body for focusable elements
	            let focusFirst = this.dropdownBody.querySelector(this.focusableElements.join(','));
	            if (focusFirst === null) {
	                //if no child of the body is focusable, focus the body itthis
	                this.dropdownBody.focus();
	            } else {
	                //a child of the body is focusable, so focus it
	                focusFirst.focus();
	            }
	        }

	        this.focusableChildList = this.dropdownBody.querySelectorAll(this.focusableElements.join(','));
	        for (let i = 0; i < this.focusableChildList.length; i++) {
	            this.focusableChildList[i].addEventListener('focus', this.childFocusFn);
	        }

	        if (this.useRequestAnimationFrame) {
	            let loopFn = function () {
	                this.onWindowScroll();
	                this.onWindowResize();
	                this.requestAnimFrameFunction.call(window, loopFn);
	            }.bind(this);

	            this.requestAnimFrameFunction.call(window, loopFn);
	        } else {
	            this.windowResizeFn = lodash_debounce(this.onWindowResize.bind(this), this.windowResizeDelay, {
	                leading: false,
	                trailing: true
	            });
	            window.addEventListener('resize', this.windowResizeFn);

	            this.windowScrollFn = lodash_debounce(this.onWindowScroll.bind(this), this.windowScrollDelay, {
	                leading: false,
	                trailing: true
	            });
	            window.addEventListener('scroll', this.windowScrollFn);
	        }

	        //listen for escape on entire document
	        this.escKeyFn = this.onEscKey.bind(this);
	        document.addEventListener('keydown', this.escKeyFn);

	        // click outside anywhere in document to close
	        this.documentClickFn = this.onDocumentClickTrigger.bind(this);
	        document.addEventListener('click', this.documentClickFn);
	        document.addEventListener('touch', this.documentClickFn);

	        this.setPosition();

	        this.callCustom('postOpen');
	    }

	    /**
	     * @method updateDropdownPosition
	     * @memberOf AccessDropdown
	     * @instance
	     * @summary Update dropdown position when dragging or similar cases
	     * @public
	     */
	    updateDropdownPosition() {
	        if (this.isOpen) {
	            this.setPosition();
	        }
	    }

	    /**
	     * @method setPosition
	     * @memberOf AccessDropdown
	     * @instance
	     * @summary Internal function to set the position dynamically based on viewport state
	     * @private
	     */
	    setPosition() {
	        let cache;
	        cache = [window.scrollX, window.scrollY, window.innerWidth, window.innerHeight].join('_');
	        if (this.cache === cache) {
	            return;
	        }
	        this.cache = cache;

	        Object.keys(this.bodyClassMap).forEach((key) => {
	            this.dropdownBody.classList.remove(this.bodyClassMap[key]);
	        });

	        if (this.stopInlineStylesMaxWidth) {
	            if (window.matchMedia('(max-width: ' + this.stopInlineStylesMaxWidth + 'px)').matches) {
	                this.dropdownBody.classList.add(this.bodyClassMap.inlineStylingWasStopped);

	                this.dropdownBody.style.position = 'fixed';
	                this.dropdownBody.style.overflowX = 'auto';
	                this.dropdownBody.style.overflowY = 'auto';
	                this.dropdownBody.style.top = 0;
	                this.dropdownBody.style.right = 0;
	                this.dropdownBody.style.bottom = 0;
	                this.dropdownBody.style.left = 0;
	                this.dropdownBody.style.height = null;
	                this.dropdownBody.style.width = '100%';
	                this.dropdownBody.style.webkitOverflowScrolling = null;

	                return;
	            }
	        }

	        let scrollSize, isScrollOuter, tempTrigger, trigger, viewport, body, scale,
	            left, top, right;

	        scrollSize = AccessDropdown.prototype.scrollSize;
	        isScrollOuter = AccessDropdown.prototype.isScrollOuter;

	        // viewport
	        viewport = {
	            width: (window.clientWidth || document.documentElement.clientWidth || document.getElementsByTagName(
	                'body')[0].clientWidth),
	            height: (window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName(
	                'body')[0].clientHeight)
	        };

	        if (window.innerWidth > document.documentElement.clientWidth) {
	            scale = 1 / (document.body.clientWidth / (window.innerWidth - scrollSize));
	        } else {
	            scale = 1 / (document.body.clientWidth / window.innerWidth);
	        }

	        scale = parseFloat(scale.toFixed(2));
	        viewport.width = viewport.width * scale;
	        viewport.height = viewport.height * scale;

	        // reset
	        this.dropdownBody.style.position = 'fixed';
	        this.dropdownBody.style.webkitOverflowScrolling = 'touch';
	        this.dropdownBody.style.top = '0';
	        this.dropdownBody.style.left = '0';
	        this.dropdownBody.style.right = 'auto';
	        this.dropdownBody.style.bottom = 'auto';
	        this.dropdownBody.style.height = 'auto';
	        this.dropdownBody.style.width = 'auto';

	        body = {
	            // HERE: "OS" = Outer+Scroll, "O" = Outer
	            width: this.dropdownBody.clientWidth,
	            widthO: this.dropdownBody.clientWidth + this.plusLeft + this.plusRight,
	            widthOS: this.dropdownBody.clientWidth + this.plusLeft + this.plusRight + (isScrollOuter ? scrollSize : 0),
	            height: this.dropdownBody.clientHeight,
	            heightO: this.dropdownBody.clientHeight + this.plusTop + this.plusBottom,
	            heightOS: this.dropdownBody.clientHeight + this.plusTop + this.plusBottom + (isScrollOuter ? scrollSize : 0)
	        };

	        this.dropdownBody.style.overflowX = 'hidden';
	        this.dropdownBody.style.overflowY = 'hidden';
	        this.dropdownBody.style.top = 'auto';
	        this.dropdownBody.style.left = 'auto';
	        this.dropdownBody.style.right = 'auto';
	        this.dropdownBody.style.bottom = 'auto';
	        this.dropdownBody.style.height = 'auto';
	        this.dropdownBody.style.width = 'auto';

	        // trigger
	        tempTrigger = this.dropdownTrigger.getBoundingClientRect();
	        trigger = {
	            left: tempTrigger.left,
	            top: tempTrigger.top,
	            right: tempTrigger.left + tempTrigger.width,
	            bottom: tempTrigger.top + tempTrigger.height,
	            width: tempTrigger.width,
	            height: tempTrigger.height
	        };

	        if (!this.isPointWithinViewport(trigger.left, trigger.top, viewport) &&
	            !this.isPointWithinViewport(trigger.left + trigger.width, trigger.top, viewport) &&
	            !this.isPointWithinViewport(trigger.left, trigger.top + trigger.height, viewport) &&
	            !this.isPointWithinViewport(trigger.left + trigger.width, trigger.top + trigger.height, viewport)
	        ) {
	            this.close('Trigger is not within viewport');

	            return;
	        } else {
	            this.dropdownBody.style.display = 'block';
	        }

	        if (body.widthOS >= viewport.width && body.heightOS >= viewport.height) {
	            this.dropdownBody.classList.add(this.bodyClassMap.fullScreen);

	            this.dropdownBody.style.left = this.plusLeft + 'px';
	            this.dropdownBody.style.right = this.plusRight + 'px';
	            this.dropdownBody.style.top = this.plusTop + 'px';
	            this.dropdownBody.style.bottom = this.plusBottom + 'px';
	            this.dropdownBody.style.overflowX = 'auto';
	            this.dropdownBody.style.overflowY = 'auto';

	            return;
	        }

	        if (body.widthOS >= viewport.width) {
	            this.dropdownBody.classList.add(this.bodyClassMap.allWidthCenterHeight);

	            this.dropdownBody.style.left = this.plusLeft + 'px';
	            this.dropdownBody.style.right = this.plusRight + 'px';
	            this.dropdownBody.style.top = this.plusTop + ((viewport.height - body.heightOS) / 2) + 'px';
	            this.dropdownBody.style.overflowX = 'auto';
	            this.dropdownBody.style.overflowY = 'hidden';

	            return;
	        }

	        if (body.heightOS >= viewport.height) {
	            this.dropdownBody.classList.add(this.bodyClassMap.allHeightCenterWidth);

	            this.dropdownBody.style.top = this.plusTop + 'px';
	            this.dropdownBody.style.bottom = this.plusBottom + 'px';
	            this.dropdownBody.style.left = this.plusLeft + ((viewport.width - body.widthOS) / 2) + 'px';
	            this.dropdownBody.style.overflowX = 'hidden';
	            this.dropdownBody.style.overflowY = 'auto';

	            return;
	        }

	        // Left Bottom
	        if (trigger.left + body.widthOS < viewport.width &&
	            trigger.bottom + body.heightOS < viewport.height
	        ) {
	            this.dropdownBody.classList.add(this.bodyClassMap.leftBottom);

	            top = this.plusTop + trigger.bottom;
	            top = top < this.plusTop ? this.plusTop : top;

	            left = this.plusLeft + trigger.left;
	            left = left < this.plusLeft ? this.plusLeft : left;

	            this.dropdownBody.style.top = top + 'px';
	            this.dropdownBody.style.left = left + 'px';

	            return;
	        }

	        // Left Bottom Scroll
	        if (this.dropdownBodyMinHeight !== false &&
	            trigger.left + body.widthOS < viewport.width &&
	            viewport.height - trigger.bottom - this.plusTop > this.dropdownBodyMinHeight
	        ) {
	            this.dropdownBody.classList.add(this.bodyClassMap.leftBottom);

	            top = this.plusTop + trigger.bottom;
	            top = top < this.plusTop ? this.plusTop : top;

	            left = this.plusLeft + trigger.left;
	            left = left < this.plusLeft ? this.plusLeft : left;

	            this.dropdownBody.style.height = (viewport.height - top - this.plusBottom) + 'px';
	            this.dropdownBody.style.overflowX = 'hidden';
	            this.dropdownBody.style.overflowY = 'auto';

	            this.dropdownBody.style.top = top + 'px';
	            this.dropdownBody.style.left = left + 'px';

	            return;
	        }

	        // Left Top (+scroll in extra cases)
	        if (trigger.left + body.widthOS < viewport.width &&
	            trigger.top - body.heightOS >= -this.dropdownBodyMinHeight
	        ) {
	            this.dropdownBody.classList.add(this.bodyClassMap.leftTop);

	            top = trigger.top - body.height - this.plusBottom;
	            top = top < this.plusTop ? this.plusTop : top;

	            left = trigger.left + this.plusLeft;
	            left = left < this.plusLeft ? this.plusLeft : left;

	            if (trigger.top - body.heightOS < 0) {
	                this.dropdownBody.style.height = trigger.top - this.plusTop - this.plusBottom + 'px';
	                this.dropdownBody.style.overflowX = 'hidden';
	                this.dropdownBody.style.overflowY = 'auto';
	            }

	            this.dropdownBody.style.top = top + 'px';
	            this.dropdownBody.style.left = left + 'px';

	            return;
	        }

	        // Right Bottom
	        if (trigger.right - body.widthOS >= 0 &&
	            trigger.bottom + body.heightO < viewport.height
	        ) {
	            this.dropdownBody.classList.add(this.bodyClassMap.rightBottom);

	            top = this.plusTop + trigger.bottom;
	            top = top < this.plusTop ? this.plusTop : top;

	            right = viewport.width - trigger.right + this.plusRight;
	            right = right < this.plusRight ? this.plusRight : right;

	            this.dropdownBody.style.top = top + 'px';
	            this.dropdownBody.style.right = right + 'px';

	            return;
	        }

	        // Right Bottom Scroll
	        if (this.dropdownBodyMinHeight !== false &&
	            trigger.right - body.widthOS >= 0 &&
	            viewport.height - trigger.bottom > this.dropdownBodyMinHeight
	        ) {
	            this.dropdownBody.classList.add(this.bodyClassMap.rightBottom);

	            top = this.plusTop + trigger.bottom;
	            top = top < this.plusTop ? this.plusTop : top;

	            right = viewport.width - trigger.right + this.plusRight;
	            right = right < this.plusRight ? this.plusRight : right;

	            this.dropdownBody.style.height = (viewport.height - top - this.plusTop - this.plusBottom) + 'px';
	            this.dropdownBody.style.overflowX = 'hidden';
	            this.dropdownBody.style.overflowY = 'auto';

	            this.dropdownBody.style.top = top + 'px';
	            this.dropdownBody.style.right = right + 'px';

	            return;
	        }

	        // Right Top
	        if (trigger.right - body.widthO >= 0 &&
	            viewport.height - trigger.top >= 0
	        ) {
	            this.dropdownBody.classList.add(this.bodyClassMap.rightTop);

	            top = trigger.top - body.height - this.plusBottom;
	            top = top < this.plusBottom ? this.plusBottom : top;

	            right = viewport.width - trigger.right + this.plusRight;
	            right = right < this.plusRight ? this.plusRight : right;

	            if (trigger.top - body.heightOS < 0) {
	                this.dropdownBody.style.height = trigger.top - this.plusTop - this.plusBottom + 'px';
	                this.dropdownBody.style.overflowX = 'hidden';
	                this.dropdownBody.style.overflowY = 'auto';
	            }

	            this.dropdownBody.style.top = top + 'px';
	            this.dropdownBody.style.right = right + 'px';

	            return;
	        }
	    }

	    /**
	     * @method callCustom
	     * @memberOf AccessDropdown
	     * @instance
	     * @summary execute an implementation defined callback on a certain action
	     * @private
	     */
	    callCustom(userFn) {
	        let sliced;

	        sliced = Array.prototype.slice.call(arguments, 1);

	        if (this.callbacks !== undefined && this.callbacks[userFn] !== undefined && typeof this.callbacks[userFn] === 'function') {
	            this.callbacks[userFn].apply(this, sliced);
	        }
	    }

	    /**
	     * @method isPointWithinViewport
	     * @memberOf AccessDropdown
	     * @instance
	     * @summary Internal measurement function
	     * @private
	     */
	    isPointWithinViewport(x, y, viewport) {
	        return 0 <= x && x <= 0 + viewport.width && 0 <= y && y <= 0 + viewport.height;
	    }

	    /**
	     * @method destroy
	     * @memberOf AccessDropdown
	     * @instance
	     * @summary Public function to destroy a dropdown instance
	     */
	    destroy() {
	        this.callCustom('preDestroy');

	        this.close('destroy');

	        if (this.closeClickFn !== null) {
	            this.closeTrigger.removeEventListener('click', this.closeClickFn);
	            this.closeClickFn = null;
	        }

	        if (this.triggerClickFn) {
	            this.dropdownTrigger.removeEventListener('click', this.triggerClickFn);
	            this.dropdownTrigger.removeEventListener('touch', this.triggerClickFn);
	            this.triggerClickFn = null;
	        }

	        if (this.bodyFocusOutFn) {
	            this.dropdownBody.removeEventListener('focusout', this.bodyFocusOutFn);
	            this.bodyFocusOutFn = null;
	        }

	        if (this.accessDropdownCloseFn) {
	            this.dropdownBody.removeEventListener('access-dropdown:close', this.accessDropdownCloseFn);
	            this.dropdownTrigger.removeEventListener('access-dropdown:close', this.accessDropdownCloseFn);
	            this.accessDropdownCloseFn = null;
	        }

	        this.callCustom('postDestroy');
	    }

	    /**
	     * @method close
	     * @memberOf AccessDropdown
	     * @instance
	     * @summary Public function to close a dropdown
	     */
	    close(reason) {
	        this.isOpen = false;

	        this.callCustom('preClose', reason);

	        this.dropdownTrigger.setAttribute('aria-expanded', false);
	        this.dropdownBody.setAttribute('aria-hidden', true);
	        if (!this.disabledDisplayAttr) {
	            this.dropdownBody.style.display = 'none';
	        }

	        if (this.closeTrigger !== null) {
	            this.closeTrigger.style.display = 'none';
	        }

	        // Stop listening "globals"
	        //

	        if (this.escKeyFn !== null) {
	            document.removeEventListener('keydown', this.escKeyFn);
	            this.escKeyFn = null; //done with this listener, destroy it
	        }

	        if (this.documentClickFn !== null) {
	            document.removeEventListener('click', this.documentClickFn);
	            document.removeEventListener('touch', this.documentClickFn);
	            this.documentClickFn = null;
	        }

	        if (this.windowResizeFn !== null) {
	            window.removeEventListener('resize', this.windowResizeFn);
	            this.windowResizeFn = null;
	        }

	        if (this.windowScrollFn !== null) {
	            window.removeEventListener('scroll', this.windowScrollFn);
	            this.windowScrollFn = null;
	        }

	        for (let i = 0; i < this.focusableChildList.length; i++) {
	            this.focusableChildList[i].removeEventListener('focus', this.childFocusFn);
	        }

	        this.callCustom('postClose', reason);
	    }

	    /**
	     *
	     * @param elem
	     * @param selector
	     * @returns {*}
	     */
	    getClosest(elem, selector) {
	        // Element.matches() polyfill
	        if (!Element.prototype.matches) {
	            Element.prototype.matches =
	                Element.prototype.matchesSelector ||
	                Element.prototype.mozMatchesSelector ||
	                Element.prototype.msMatchesSelector ||
	                Element.prototype.oMatchesSelector ||
	                Element.prototype.webkitMatchesSelector ||
	                function (s) {
	                    let matches = (this.document || this.ownerDocument).querySelectorAll(s),
	                        i = matches.length;
	                    while (--i >= 0 && matches.item(i) !== this) {
	                    }

	                    return i > -1;
	                };
	        }

	        // Get closest match
	        for (; elem && elem !== document; elem = elem.parentNode) {
	            if (elem.matches(selector)) {
	                return elem;
	            }
	        }

	        return null;
	    }
	}

	return AccessDropdown;

}());
//# sourceMappingURL=bundle.js.map
