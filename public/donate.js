function requestNetworkDonations(t){t=t||{};var e={};t=Object.assign(e,t);var o="https://donations.request.network/";that=this;var s={ETH:"Ethereum (ETH)",OMG:"OmiseGO (OMG)",REQ:"Request Network (REQ)",KNC:"Kyber Network (KNC)",DAI:"Dai (DAI)",DGX:"Digix Gold (DGX)"};if(null!=t.currencies&&t.currencies.length>0){for(var n in t.currencies){var i=t.currencies[n];s[i]&&(filteredCurrencies[i]=s[i])}selectedCurrency=t.currencies[0]}else filteredCurrencies=s;if(!filteredCurrencies||0==Object.keys(filteredCurrencies).length)return alert("Incorrect currencies defined in parameters"),void triggerButton.classList.add("hidden");if(!t.address)return void alert("Please enter an address");if(address=t.address,t.network){if(1!=t.network&&4!=t.network)return void alert("Network parameter must be 1 (mainnet) or 4 (rinkeby)");network=t.network}if(t.max_amount){if(isNaN(t.max_amount))return void alert("Max amount parameter is incorrect");maxDonationAmount=t.max_amount}this.loadCSS=function(t){var e=document.createElement("link");e.href=t,e.type="text/css",e.rel="stylesheet",document.getElementsByTagName("head")[0].appendChild(e)},this.initModal=function(){donationsModal=new request.modal({footer:!0,closeMethods:["overlay","button","escape"],closeLabel:"Close"});donationsModal.setFooterContent('<img class="request-footer-logo" src="https://donations.request.network/img/request-logo.png"/><span class="request-footer-copy">Powered by Request</span><button id="proceed-button" class="request-btn request-btn--primary request-btn--pull-right">Proceed<i class="spinner"></i></button>'),document.getElementById("requestDonationTrigger").addEventListener("click",function(){donationsModal.open()}),donationsModal.setContent(that.fetchContentHtml()),proceedButton=document.getElementById("proceed-button"),closeIcon=document.getElementsByClassName("request-modal__close"),customAmountButton=document.getElementById("custom-amount-trigger"),customAmountInput=document.getElementById("custom-amount-input"),conversionRate=document.getElementById("request-donations-rate"),total=document.getElementById("request-donations-total")},this.jsonToQueryString=function(t){return"?"+Object.keys(t).map(function(e){return encodeURIComponent(e)+"="+encodeURIComponent(t[e])}).join("&")},this.generateRequest=function(){var t=(new XMLHttpRequest,[location.protocol,"//",location.host].join("")),e=[t,location.pathname].join(""),o={owed:totalOwed,currency:selectedCurrency,fiat:selectedAmount,network:network,redirect:e,txid:""},s="https://donations.request.network/thank-you"+that.jsonToQueryString(o),n={to_pay:totalOwed,to_address:address,redirect_url:s,reason:"Donation to "+t,network:network,currency:selectedCurrency},i="https://sign.wooreq.com/sign"+that.jsonToQueryString(n),a=new XMLHttpRequest;a.onreadystatechange=function(){4==a.readyState&&200==a.status&&(proceedButton.classList.remove("disabled"),closeIcon[0].classList.remove("hidden"),window.location.href=a.responseText)},a.open("GET",i,!0),a.send(null)},this.fetchRates=function(){var t=(new XMLHttpRequest,{currency:selectedCurrency});if(conversionRates[selectedCurrency]){var e=conversionRates[selectedCurrency];conversionRate.innerHTML=e,totalOwed=parseFloat((e*selectedAmount).toFixed(PAYMENT_ROUND_AMOUNT)).toString(),total.innerHTML=totalOwed+" "+selectedCurrency}else{var o="https://sign.wooreq.com/rates"+that.jsonToQueryString(t),s=new XMLHttpRequest;s.onreadystatechange=function(){if(4==s.readyState&&200==s.status){var t=JSON.parse(s.responseText);conversionRate.innerHTML=t.conversion_rate,totalOwed=parseFloat((t.conversion_rate*selectedAmount).toFixed(PAYMENT_ROUND_AMOUNT)).toString(),total.innerHTML=totalOwed+" "+selectedCurrency,conversionRates[selectedCurrency]=t.conversion_rate}else 4==s.readyState&&200!=s.status&&alert("Error: Fetching conversion rates failed, this error has been logged")},s.open("GET",o,!0),s.send(null)}},this.wipeRates=function(){for(var t in conversionRates)conversionRates[t]=""},this.addClickEvents=function(){for(var t=0;t<amountTiles.length;t++)amountTiles[t].addEventListener("click",function(t){for(var e=0;e<amountTiles.length;e++)amountTiles[e]!=t&&amountTiles[e].classList.remove("active");selectedAmount=this.getAttribute("data-req-amount"),that.fetchRates(),that.clearCustomAmount(),this.classList.toggle("active")});for(var t=0;t<currencyTiles.length;t++)currencyTiles[t].addEventListener("click",function(t){for(var e=0;e<currencyTiles.length;e++)currencyTiles[e]!=t&&currencyTiles[e].classList.remove("active");selectedCurrency=this.getAttribute("data-req-currency"),that.fetchRates(),this.classList.toggle("active")});proceedButton.addEventListener("click",function(){if(4==network&&"ETH"!=selectedCurrency)alert("This application is currently running in testmode (Rinkeby), ERC20 tokens are not available in this mode - please select ETH");else if(selectedAmount>maxDonationAmount){var t=[location.protocol,"//",location.host].join("");alert(t+" only accepts donations upto the value of $"+maxDonationAmount+", please lower your donation amount")}else proceedButton.classList.add("disabled"),closeIcon[0].classList.add("hidden"),that.generateRequest()}),customAmountButton.addEventListener("click",function(){this.classList.add("show-input"),customAmountInput.focus()}),customAmountInput.addEventListener("input",function(t){if(this.value){var e=this.value.replace(/\D/g,"");if(e>maxDonationAmount){var o=[location.protocol,"//",location.host].join("");customAmountInput.value=selectedAmount,alert(o+" only accepts donations upto the value of $"+maxDonationAmount)}else{selectedAmount=e,this.value=e,customAmountButton.classList.add("active");for(var s=0;s<amountTiles.length;s++)amountTiles[s].classList.remove("active");that.fetchRates()}}}),triggerButton.addEventListener("click",function(){that.fetchRates()})},this.clearCustomAmount=function(){customAmountButton.classList.remove("show-input"),customAmountButton.classList.remove("active"),customAmountInput.value=""},this.initCustomInput=function(){!function(t,e){function o(){t.style.width=(t.value.length+1)*s+"px"}var s=Number(e),n="keyup,keypress,focus,blur,change".split(",");for(var i in n)t.addEventListener(n[i],o,!1);o()}(customAmountInput,20)},this.setRateClear=function(){setInterval(function(){that.wipeRates()},12e4)},this.filterMaxAmounts=function(){},this.start=function(){this.loadCSS(o+"request-donation-styles.min.css"),this.loadCSS("https://fonts.googleapis.com/css?family=Montserrat:400,600,700,800|Raleway:400,500,600"),this.initModal(),this.addClickEvents(),this.initCustomInput(),this.setRateClear(),this.filterMaxAmounts()},this.fetchContentHtml=function(){var t=!0,e='<div><span class="request-h1 request-modal-title">Make a donation today</span><p class="request-subtitle">How much would you like to donate?</p><div class="request-tile-container clearfix">';for(var o in presetAmounts)(void 0==maxDonationAmount||presetAmounts[o]<=maxDonationAmount)&&(e+='<div class="request-tile-outer"><div class="request-tile request-tile-amount" data-req-amount="'+presetAmounts[o]+'"><div class="request-amount"><span class="request-dollar">$</span>'+presetAmounts[o]+'</div><span class="request-tick"></span></div></div>');e+='<div class="request-tile-outer request-tile-outer-large"><div id="custom-amount-trigger" class="request-tile"><span class="request-tile-button-label">Custom amount</span><div class="custom-amount-input-container"><span class="request-dollar">$</span><input id="custom-amount-input" type="text"></div><span class="request-tick"></span></div></div></div><p class="request-subtitle">Select donation currency</p><div class="request-tile-container clearfix">';for(var s in filteredCurrencies){e+='<div class="request-tile-outer"><div class="request-tile request-tile-currency '+(t?"active":"")+'" data-req-currency="'+s+'"><div class="request-tile-payment-icon"><i class="request-payment-icon request-payment-icon--'+s.toLowerCase()+'"></i><span class="request-payment-icon-title">'+s+'</span></div><span class="request-tick"></span></div></div>',t=!1}return e+='</div><div class="request-transaction-info-block"><p class="mb-1">Conversion rate:<strong id="request-donations-rate"></strong></p><p class="mt-0 mb-0">Total owed:<strong id="request-donations-total"></strong></p></div></div>'}}!function(t,e){"function"==typeof define&&define.amd?define(e):"object"==typeof exports?module.exports=e():t.request=e()}(this,function(){function t(t){var e={onClose:null,onOpen:null,beforeOpen:null,beforeClose:null,stickyFooter:!1,footer:!1,cssClass:[],closeLabel:"Close",closeMethods:["overlay","button","escape"]};this.opts=d({},e,t),this.init()}function e(){this.modalBoxFooter&&(this.modalBoxFooter.style.width=this.modalBox.clientWidth+"px",this.modalBoxFooter.style.left=this.modalBox.offsetLeft+"px")}function o(){this.modal=document.createElement("div"),this.modal.classList.add("request-modal"),0!==this.opts.closeMethods.length&&-1!==this.opts.closeMethods.indexOf("overlay")||this.modal.classList.add("request-modal--noOverlayClose"),this.modal.style.display="none",this.opts.cssClass.forEach(function(t){"string"==typeof t&&this.modal.classList.add(t)},this),-1!==this.opts.closeMethods.indexOf("button")&&(this.modalCloseBtn=document.createElement("button"),this.modalCloseBtn.classList.add("request-modal__close"),this.modalCloseBtnIcon=document.createElement("span"),this.modalCloseBtnIcon.classList.add("request-modal__closeIcon"),this.modalCloseBtnIcon.innerHTML="×",this.modalCloseBtnLabel=document.createElement("span"),this.modalCloseBtnLabel.classList.add("request-modal__closeLabel"),this.modalCloseBtnLabel.innerHTML=this.opts.closeLabel,this.modalCloseBtn.appendChild(this.modalCloseBtnIcon),this.modalCloseBtn.appendChild(this.modalCloseBtnLabel)),this.modalBox=document.createElement("div"),this.modalBox.classList.add("request-modal-box"),this.modalBoxContent=document.createElement("div"),this.modalBoxContent.classList.add("request-modal-box__content"),this.modalBox.appendChild(this.modalBoxContent),-1!==this.opts.closeMethods.indexOf("button")&&this.modal.appendChild(this.modalCloseBtn),this.modal.appendChild(this.modalBox)}function s(){this.modalBoxFooter=document.createElement("div"),this.modalBoxFooter.classList.add("request-modal-box__footer"),this.modalBox.appendChild(this.modalBoxFooter)}function n(){this._events={clickCloseBtn:this.close.bind(this),clickOverlay:a.bind(this),resize:this.checkOverflow.bind(this),keyboardNav:i.bind(this)},-1!==this.opts.closeMethods.indexOf("button")&&this.modalCloseBtn.addEventListener("click",this._events.clickCloseBtn),this.modal.addEventListener("mousedown",this._events.clickOverlay),window.addEventListener("resize",this._events.resize),document.addEventListener("keydown",this._events.keyboardNav)}function i(t){-1!==this.opts.closeMethods.indexOf("escape")&&27===t.which&&this.isOpen()&&this.close()}function a(t){-1!==this.opts.closeMethods.indexOf("overlay")&&!r(t.target,"request-modal")&&t.clientX<this.modal.clientWidth&&this.close()}function r(t,e){for(;(t=t.parentElement)&&!t.classList.contains(e););return t}function l(){-1!==this.opts.closeMethods.indexOf("button")&&this.modalCloseBtn.removeEventListener("click",this._events.clickCloseBtn),this.modal.removeEventListener("mousedown",this._events.clickOverlay),window.removeEventListener("resize",this._events.resize),document.removeEventListener("keydown",this._events.keyboardNav)}function d(){for(var t=1;t<arguments.length;t++)for(var e in arguments[t])arguments[t].hasOwnProperty(e)&&(arguments[0][e]=arguments[t][e]);return arguments[0]}var c=function(){var t,e=document.createElement("request-test-transition"),o={transition:"transitionend",OTransition:"oTransitionEnd",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"};for(t in o)if(void 0!==e.style[t])return o[t]}();return t.prototype.init=function(){this.modal||(o.call(this),n.call(this),document.body.insertBefore(this.modal,document.body.firstChild),this.opts.footer&&this.addFooter())},t.prototype.destroy=function(){null!==this.modal&&(l.call(this),this.modal.parentNode.removeChild(this.modal),this.modal=null)},t.prototype.open=function(){var t=this;"function"==typeof t.opts.beforeOpen&&t.opts.beforeOpen(),this.modal.style.removeProperty?this.modal.style.removeProperty("display"):this.modal.style.removeAttribute("display"),this._scrollPosition=window.pageYOffset,document.body.classList.add("request-enabled"),document.body.style.top=-this._scrollPosition+"px",this.setStickyFooter(this.opts.stickyFooter),this.modal.classList.add("request-modal--visible"),c?this.modal.addEventListener(c,function e(){"function"==typeof t.opts.onOpen&&t.opts.onOpen.call(t),t.modal.removeEventListener(c,e,!1)},!1):"function"==typeof t.opts.onOpen&&t.opts.onOpen.call(t),this.checkOverflow()},t.prototype.isOpen=function(){return!!this.modal.classList.contains("request-modal--visible")},t.prototype.close=function(){if("function"==typeof this.opts.beforeClose){if(!this.opts.beforeClose.call(this))return}document.body.classList.remove("request-enabled"),window.scrollTo(0,this._scrollPosition),document.body.style.top=null,this.modal.classList.remove("request-modal--visible");var t=this;c?this.modal.addEventListener(c,function e(){t.modal.removeEventListener(c,e,!1),t.modal.style.display="none","function"==typeof t.opts.onClose&&t.opts.onClose.call(this)},!1):(t.modal.style.display="none","function"==typeof t.opts.onClose&&t.opts.onClose.call(this))},t.prototype.setContent=function(t){"string"==typeof t?this.modalBoxContent.innerHTML=t:(this.modalBoxContent.innerHTML="",this.modalBoxContent.appendChild(t)),this.isOpen()&&this.checkOverflow()},t.prototype.getContent=function(){return this.modalBoxContent},t.prototype.addFooter=function(){s.call(this)},t.prototype.setFooterContent=function(t){this.modalBoxFooter.innerHTML=t},t.prototype.getFooterContent=function(){return this.modalBoxFooter},t.prototype.setStickyFooter=function(t){this.isOverflow()||(t=!1),t?this.modalBox.contains(this.modalBoxFooter)&&(this.modalBox.removeChild(this.modalBoxFooter),this.modal.appendChild(this.modalBoxFooter),this.modalBoxFooter.classList.add("request-modal-box__footer--sticky"),e.call(this),this.modalBoxContent.style["padding-bottom"]=this.modalBoxFooter.clientHeight+20+"px"):this.modalBoxFooter&&(this.modalBox.contains(this.modalBoxFooter)||(this.modal.removeChild(this.modalBoxFooter),this.modalBox.appendChild(this.modalBoxFooter),this.modalBoxFooter.style.width="auto",this.modalBoxFooter.style.left="",this.modalBoxContent.style["padding-bottom"]="",this.modalBoxFooter.classList.remove("request-modal-box__footer--sticky")))},t.prototype.addFooterBtn=function(t,e,o){var s=document.createElement("button");return s.innerHTML=t,s.addEventListener("click",o),"string"==typeof e&&e.length&&e.split(" ").forEach(function(t){s.classList.add(t)}),this.modalBoxFooter.appendChild(s),s},t.prototype.resize=function(){console.warn("Resize is deprecated and will be removed in version 1.0")},t.prototype.isOverflow=function(){var t=window.innerHeight;return this.modalBox.clientHeight>=t},t.prototype.checkOverflow=function(){this.modal.classList.contains("request-modal--visible")&&(this.isOverflow()?this.modal.classList.add("request-modal--overflow"):this.modal.classList.remove("request-modal--overflow"),!this.isOverflow()&&this.opts.stickyFooter?this.setStickyFooter(!1):this.isOverflow()&&this.opts.stickyFooter&&(e.call(this),this.setStickyFooter(!0)))},{modal:t}});var triggerButton=document.getElementById("requestDonationTrigger"),amountTiles=document.getElementsByClassName("request-tile-amount"),currencyTiles=document.getElementsByClassName("request-tile-currency"),customAmountButton,customAmountInput,proceedButton,closeIcon,conversionRate,total,that,selectedAmount="10",selectedCurrency="ETH",totalOwed,network=1,maxDonationAmount,conversionRates=[],filteredCurrencies=[],presetAmounts=[5,10,25,50,100,250],address,PAYMENT_ROUND_AMOUNT=6;