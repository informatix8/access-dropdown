import ShortUniqueId from 'short-unique-id';
import debounce from 'lodash.debounce';
import merge from 'lodash.merge';
import whatInput from 'what-input';
import zenscroll from 'zenscroll';

class AccessDropdown {

    /**
     @class AccessDropdown
     @summary Autopositioning accessible dropdown
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

        if (document.body.getAttribute('data-access-dropdowns-opened') === null) {
            document.body.setAttribute('data-access-dropdowns-opened', '0');
        }

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
        merge(this, defaults, options);

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
        let uid = new ShortUniqueId();
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
            debounce((originalEvent) => {
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

        document.body.setAttribute('data-access-dropdowns-opened', document.body.getAttribute('data-access-dropdowns-opened') * 1 + 1);

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
            this.windowResizeFn = debounce(this.onWindowResize.bind(this), this.windowResizeDelay, {
                leading: false,
                trailing: true
            });
            window.addEventListener('resize', this.windowResizeFn);

            this.windowScrollFn = debounce(this.onWindowScroll.bind(this), this.windowScrollDelay, {
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

        document.body.setAttribute('data-access-dropdowns-opened', document.body.getAttribute('data-access-dropdowns-opened') * 1 - 1);
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
                    // jscs:disable disallowEmptyBlocks
                    while (--i >= 0 && matches.item(i) !== this) {
                    }
                    // jscs:enable disallowEmptyBlocks

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

export default AccessDropdown;
