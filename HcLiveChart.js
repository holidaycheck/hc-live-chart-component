(function () {function p(t){return(p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function q(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function d(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function r(t,e,r){return e&&d(t.prototype,e),r&&d(t,r),t}function s(t,e){return!e||"object"!==p(e)&&"function"!=typeof e?u(t):e}function u(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function v(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&a(t,e)}function w(t){var e="function"==typeof Map?new Map:void 0;return(w=function(t){if(null===t||!z(t))return t;if("function"!=typeof t)throw new TypeError("Super expression must either be null or a function");if(void 0!==e){if(e.has(t))return e.get(t);e.set(t,r)}function r(){return y(t,arguments,f(this).constructor)}return r.prototype=Object.create(t.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),a(r,t)})(t)}function x(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(t){return!1}}function y(t,e,r){return(y=x()?Reflect.construct:function(t,e,r){var n=[null];n.push.apply(n,e);var o=new(Function.bind.apply(t,n));return r&&a(o,r.prototype),o}).apply(null,arguments)}function z(t){return-1!==Function.toString.call(t).indexOf("[native code]")}function a(t,e){return(a=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function f(t){return(f=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function A(t){return(A="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function B(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function g(t,e){for(var r=0;r<e.length;r++){var a=e[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}function C(t,e,r){return e&&g(t.prototype,e),r&&g(t,r),t}function D(t,e){return!e||"object"!==A(e)&&"function"!=typeof e?E(t):e}function E(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function F(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&b(t,e)}function G(t){var e="function"==typeof Map?new Map:void 0;return(G=function(t){if(null===t||!J(t))return t;if("function"!=typeof t)throw new TypeError("Super expression must either be null or a function");if(void 0!==e){if(e.has(t))return e.get(t);e.set(t,r)}function r(){return I(t,arguments,h(this).constructor)}return r.prototype=Object.create(t.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),b(r,t)})(t)}function H(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(t){return!1}}function I(t,e,r){return(I=H()?Reflect.construct:function(t,e,r){var a=[null];a.push.apply(a,e);var n=new(Function.bind.apply(t,a));return r&&b(n,r.prototype),n}).apply(null,arguments)}function J(t){return-1!==Function.toString.call(t).indexOf("[native code]")}function b(t,e){return(b=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function h(t){return(h=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var i=document.createElement("template");i.innerHTML="\n    <style>\n    :host {\n    \tdisplay: block;\n    }\n    </style>\n    <canvas style=\"height: 100%; width: 100%;\"></canvas>\n";var j=Object.values({hcblue:"rgba(0, 88, 163, 1.000)",hcyellow:"rgba(251, 215, 58, 1.000)",hcfishorange:"rgba(255, 88, 0, 1.000)",hcdarkblue:"rgba(2, 57, 103, 1.000)",hcawardblue:"rgba(47, 160, 196, 1.000)",purple:"rgb(153, 102, 255)",grey:"rgb(201, 203, 207)"}),e=function(t){function e(){var t;return B(this,e),(t=D(this,h(e).call(this))).attachShadow({mode:"open"}).appendChild(i.content.cloneNode(!0)),t}return F(e,G(HTMLElement)),C(e,[{key:"_selectInShadowRoot",value:function(t){return this.shadowRoot&&this.shadowRoot.querySelector(t)}},{key:"connectedCallback",value:function(){Chart.defaults.global.animation.duration=100,Chart.defaults.global.legend.display=!1,this.createChart(),this.updateChartData([])}},{key:"createChart",value:function(){this.chartData={datasets:[{backgroundColor:j}]};var t={ticks:{beginAtZero:!0},minBarLength:5};this.chart=new Chart(this.$chart,{type:"horizontalBar",data:this.chartData,options:{scales:{yAxes:[Object.assign({},t)],xAxes:[Object.assign({},t)]}}})}},{key:"updateChartData",value:function(t){var e=this.chartData;e.labels=t.map(function(t){var e=t.label;return e.length>30?"..."+e.substring(e.length-30):e}),e.datasets[0].data=t.map(function(t){return t.value}),this.chart.update()}},{key:"updateWaterfallData",value:function(t){this._waterfallOptions();var e=this.chartData;e.labels=t.map(function(t){return t.label}),e.datasets=[{data:[],backgroundColor:"transparent"},{data:[],backgroundColor:j}],e.datasets[0].data=t.map(function(t){return t.start}),e.datasets[1].data=t.map(function(t){return t.end+1-t.start}),this.chart.update()}},{key:"_waterfallOptions",value:function(){this.chart.options.scales.yAxes=[{stacked:!0}],this.chart.options.scales.xAxes=[{stacked:!0}],this.chart.options.tooltips={callbacks:{label:function(t,e){var r=t.datasetIndex,a=t.index,n=e.datasets;if(0===r)return"";var o=n[0].data[a],i=n[1].data[a]+o-1;return"duration: ".concat((i-o).toFixed(0)," (").concat(o.toFixed(0),"...").concat(i.toFixed(0),")")}}}}},{key:"$chart",get:function(){return this._selectInShadowRoot("canvas")}}]),e}();customElements.define("hc-chart",e);function K(t){return(K="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function L(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function M(t,e){return!e||"object"!==K(e)&&"function"!=typeof e?N(t):e}function N(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function k(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function l(t,e,r){return e&&k(t.prototype,e),r&&k(t,r),t}function O(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&c(t,e)}function P(t){var e="function"==typeof Map?new Map:void 0;return(P=function(t){if(null===t||!S(t))return t;if("function"!=typeof t)throw new TypeError("Super expression must either be null or a function");if(void 0!==e){if(e.has(t))return e.get(t);e.set(t,r)}function r(){return R(t,arguments,m(this).constructor)}return r.prototype=Object.create(t.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),c(r,t)})(t)}function Q(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(t){return!1}}function R(t,e,r){return(R=Q()?Reflect.construct:function(t,e,r){var n=[null];n.push.apply(n,e);var o=new(Function.bind.apply(t,n));return r&&c(o,r.prototype),o}).apply(null,arguments)}function S(t){return-1!==Function.toString.call(t).indexOf("[native code]")}function c(t,e){return(c=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function m(t){return(m=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var n=document.createElement("template");n.innerHTML="\n    <style>\n    :host {\n    \tdisplay: block;\n    }\n    textarea {\n        width: 100%;\n        height: 100%;\n        margin: 0;\n        font-family: monospace;\n        border: 0;\n        background: inherit;\n        font-size: inherit;;\n    }\n    </style>\n    <textarea></textarea>\n";var t=function(t){function e(){var t;return L(this,e),(t=M(this,m(e).call(this))).attachShadow({mode:"open"}).appendChild(n.content.cloneNode(!0)),t}return O(e,P(HTMLElement)),l(e,null,[{key:"observedAttributes",get:function(){return["sourceCode"]}}]),l(e,[{key:"_selectInShadowRoot",value:function(t){return this.shadowRoot&&this.shadowRoot.querySelector(t)}},{key:"connectedCallback",value:function(){var t=this;this.setSourceCode(this.innerHTML),this.setAttribute("sourceCode",this.$editor.value),this.$editor.addEventListener("keyup",function(){t.setAttribute("sourceCode",t.$editor.value),t._dispatchChangeEvent()})}},{key:"setSourceCode",value:function(t){this._setSourceCode(t)}},{key:"_setSourceCode",value:function(t){this.$editor.value=this._ensureCharsAreNotHtmlEncoded(t),this._dispatchChangeEvent()}},{key:"_dispatchChangeEvent",value:function(){var t=new CustomEvent("change",{detail:{type:"change",sourceCode:this.$editor.value}});this.dispatchEvent(t)}},{key:"_ensureCharsAreNotHtmlEncoded",value:function(t){var e=document.createElement("pre");return e.innerHTML=t,e.innerText}},{key:"$editor",get:function(){return this._selectInShadowRoot("textarea")}}]),e}();customElements.define("hc-js-editor",t);var o=document.createElement("template");o.innerHTML="\n    <style>\n    :host {\n\t\t--margin: 0.5rem;\n        display: flex;\n        height: auto;\n        width: auto;\n        justify-content: center;\n    }\n    hc-js-editor {\n        flex: 1;\n        width: auto;\n        height: auto;\n    }\n    hc-chart {\n        flex: 1;\n    }\n    .jsError {\n    \tposition: absolute;\n    \tmargin-top: calc(-1.3rem - 2 * var(--margin));\n    \tright: 50%;\n    \tbackground: rgba(255,0,0,0.7);\n    \tcolor: white;\n    \tpadding: var(--margin);\n    }\n    .hidden {\n    \tdisplay: none;\n    }\n    \n    </style>\n\n    <hc-js-editor></hc-js-editor>\n\t<hc-chart style=\"height: 100%;\"></hc-chart>\n\t<div class=\"jsError hidden\"></div>\n";var T=function(t){function e(){var t;return q(this,e),(t=s(this,f(e).call(this))).attachShadow({mode:"open"}).appendChild(o.content.cloneNode(!0)),t}return v(e,w(HTMLElement)),r(e,[{key:"_selectInShadowRoot",value:function(t){return this.shadowRoot&&this.shadowRoot.querySelector(t)}},{key:"connectedCallback",value:function(){var t=this;this.$jsEditor.addEventListener("change",function(e){var r=e.detail;t.evaluateAndRerenderChart(r.sourceCode)}),this.$jsEditor.setSourceCode(this.innerHTML)}},{key:"evaluateAndRerenderChart",value:function(t){var e;try{e=new Function(t)()}catch(r){return this.$jsError.innerHTML=r,void this.$jsError.classList.remove("hidden")}this.$jsError.innerHTML="",this.$jsError.classList.add("hidden"),this.updateChartData(e)}},{key:"updateChartData",value:function(t){"start"in t[0]&&"end"in t[0]?this.$chart.updateWaterfallData(t):this.$chart.updateChartData(t)}},{key:"$jsEditor",get:function(){return this._selectInShadowRoot("hc-js-editor")}},{key:"$chart",get:function(){return this._selectInShadowRoot("hc-chart")}},{key:"$jsError",get:function(){return this._selectInShadowRoot(".jsError")}}]),e}();customElements.define("hc-live-chart",T);})();