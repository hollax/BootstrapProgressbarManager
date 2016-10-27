/* 
 * @package Botsrap Progress Bar Manager
 * @copyright Wakeel Ogunsanya
 * @author Wakeel Ogunsanya
 * @author_url wakeel.oguns@gmail.com
 * 
 * @version 1.0.1
 */

(function ($) {  
    /**
     * 
     * @param {object} opts
     * @returns {Progress|bootstrap-brogressbar-manager_L10.$.fn.progressbarManager.Progress}
     * 
     * 
     */
    $.fn.progressbarManager = function(opts) {    
        
        // auto generated id index
        if(!$.fn.progressbarManager.GUID){
            $.fn.progressbarManager.GUID = 1;
        }
        var options = $.extend({
                // whether to log to console
                debug : false ,
                // for the default bar 
                currentValue : 0,
                // for the default bar 
                totalValue : 100 ,
                // for the default bar 
                style : 'primary' ,
                // for default bar
                animate : false ,
                // for default bar
                stripe : false ,
                // Progress element id
                id : 'pbm-bootsrap-progress-' +  $.fn.progressbarManager.GUID ,
                // prefix for the genrated bar id
                barIdPrefix : 'pbm-progress-bar-' ,
                //This option is for stacked progress bar. the total value of the progress
                total : opts.totalValue ,
                //Whether to create default bar
                addDefaultBar : true ,
                // this called when Prohgress.showValue() method is called
                showValueHandler : function(bar){
                    var value = bar.elem.attr('aria-valuenow')+'%';
                    bar.elem.text( value );
                },
                // this called when Prohgress.hideValue() method is called
                hideValueHandler : function(bar){
                    bar.elem.text( '' );
                },
                // callback that is fired when the value reaches total
                // if using the stack progress bar features , this is fired when all the bars are completed
                onComplete : function(){
                    
                },
                onBarComplete : function(){
                    
                }
            },opts);
            var $PBM = $(this);
            function Progress( id  ){
                var base = this;
                // keep tracks of multiple bars
                var count = 1;
                // saves bars meta
                var bars =  {} ;
                // first progress bar
                var mainBarElemId ;
                /**
                 * This contains the sum of the value of all bars within the progress
                 * We use it to determine whether the progress can take new bar and whether all
                 * the progress bar has been conpleted if multiple bar is added in a progress 
                 * a
                 * @type Number
                 */
                var sum  = 0;
                // determines whether pregress (container) has no space for new bar element 
                var noMoreSpace = false;
                 // bar element container
                var container = generateContainerHtml(id);
                // append the container to the base container (progress container)
                $PBM.append(container);
                /**
                 * 
                 * @type String|@this;@call;addBar
                 */
                var mainBarElemId = '';
                
                /**
                 * to reset sum when new bar is added or when bar value changes
                 * @returns {undefined}
                 */
                var resetSum = function(){
                    // reset sum
                    sum = 0;
                    for(var i in bars){
                        sum += bars[i].totalValuePercentRounded;
                    }
                    
                };
                /**
                 * Start public methods
                 */
                
                /**
                 * Set the current bar value
                 * 
                 * @param {int|string} newValue You can use something like 200kb
                 * @param {string} barId
                 * @returns {bootstrap-brogressbar-manager_L10.$.fn.progressbarManager.Progress}
                 */                               
                this.setValue = function( newValue  , barId  ){
                    var bar = this.getBar(barId) ;
                    newValue = parseInt(newValue);
                    
                    if(bar){
                        // convert new value to percent to percent
                        //var newValuePercent = 100 - (bar.total - newValue ) / bar.total  * 100 ;
                        var newValuePercent =  getValuePercentage( newValue , options.total ) ;
                        var newValuePercentRounded = Math.round(newValuePercent * 10 ) / 10;
                        // nomalize the value
                        if(newValue > bar.totalValue){
                            debug("New Bar value is greater that the totalValue. Setting the bar percentage to full");
                            newValuePercent = 100;
                            newValuePercentRounded = 100;
                            newValue = bar.totalValue;
                            
                        }
                        bar.elem.attr('aria-valuenow' , newValuePercentRounded);
                        bar.currentPercent = newValuePercent;
                        bar.currentPercentRounded = newValuePercentRounded;
                        bar.currentValue = newValue;
                        
                        // handled by showValue()
//                        if( bar.showText )
//                        {
//                            bar.elem.text(newValuePercentRounded+'%');
//                        }
                        bar.elem.css('width' , newValuePercentRounded+'%');
                        // attempt to fire the show value callback
                        if(bar.showText){
                            this.showValue(barId);
                        };
                        // call calback
                        if(this.isComplete(barId)){
                            options.onBarComplete.call(bar);
                        }
                        resetSum();
                        // is all completed
                        if(this.isComplete()){
                            options.onComplete();
                        }
                    }
                    return this;
                };
                
                /**
                 * Animate progress bar
                 * 
                 * @param {string|null} barId Bar id or null to use dafault bar
                 * @returns {Progressbar}
                 */
                this.animate = function(barId){
                   var bar = this.getBar(barId) ;
                    if(bar){
                        bar.elem.addClass('active');
                    }
                    return this;
                };
                
                /**
                 * Remove animation from progressbar
                 * 
                 * @param {type} barId
                 * @returns {Progressbar}
                 */
                this.animateRemove = function(barId){
                    var bar = this.getBar(barId) ;
                    if(bar){
                        bar.elem.removeClass('active');
                    }
                     return this;
                };
                
                /**
                 * 
                 * @param {string} barId
                 * @returns {void}
                 */
                this.stripe = function(barId){
                   var bar = this.getBar(barId) ;
                    if(bar){
                        bar.elem.addClass('progress-bar-striped');
                    }
                    return this;
                };
                
                /**
                 * Remove the stripe from progress bar
                 * 
                 * @param {string} barId Optionally
                 * @returns {Progressbar}
                 */
                this.removeStripe = function(barId){
                    var bar = this.getBar(barId) ;
                    if(bar){
                        bar.elem.removeClass('progress-bar-striped');
                    }
                     return this;
                };
                 
                /**
                 * Change contectual stye for progress bar
                 * 
                 * @param {string} type success|danger|info|warning|{your own}
                 * @param {string|null} barId
                 * @returns {void}
                 */
                this.style = function(type , barId){
                    
                    var bar = this.getBar(barId) ;
                    if(bar){
                        bar.elem.removeClass('progress-bar-'+bar.style);
                        bar.style = type ;
                        bar.elem.addClass('progress-bar-'+type);
                    }
                    return this;
                };
                
                /**
                 * Display the crrent bar value
                 * 
                 * it calls the custom show value handler if set in the options
                 * 
                 * @param {string|boolean} barId Optionally provide the bar id
                 * If the parameter is TRUE then all the bar value will display
                 * @param {callable|null} callback
                 * 
                 * @returns {Progressbar}
                 */
                this.showValue =  function(barId ){
                    
                    var bar = this.getBar(barId) ;
                    
                    if(barId === true){
                        for(var b in bars){
                           // update the option
                            b.showText = true;
                            b.showValueHandler(bar); 
                        }
                        
                    }
                    if(bar){
                        // update the option
                        bar.showText = true;
                        bar.showValueHandler(bar);
                    }
                    return this;
                };
                
                /**
                 * Hide the progress bar value 
                 * @param {string|boolean} barId Optionally provide the bar id
                 * If the parameter is TRUE then all the bar value will be hidden
                 * @returns {progressBar}
                 */
                this.hideValue = function(barId){
                    var bar = this.getBar(barId) ;
                    
                     if(barId === true){
                        for(var b in bars){
                           // update the option
                            b.showText = false;
                            b.hideValueHandler(bar); 
                        }
                        
                    }
                    if(bar){
                        bar.showText = false;
                        bar.hideValueHandler(bar);
                    }
                    return this;
                };
                
                /**
                 * Check if bar has been completed
                 * @param {string|null} barId
                 * @returns {Boolean}
                 */
                this.isComplete = function(barId){
                    var bar = this.getBar(barId);
                    return  (bar && bar.currentValue >= bar.totalValue ) ;

                };
                
                /**
                 * Mark bar as comleted
                 * @param {type} barId
                 * 
                 * @returns {progressBar}
                 */
                this.complete = function(barId){
                    var bar = this.getBar(barId) ;
                    
                    if(bar){
                        this.setValue(bar.totalValue, barId);
                    }
                    return this;
                };
                
                /**
                 * Complete all bar 
                 * 
                 * @returns {void}
                 */
                this.completeAll = function(){
                    var i; 
                    for(i in bars){
                        base.complete(i);
                    }
                };
                
                /**
                 * Add progress bar section to existing progess 
                 * 
                 * This can be used to create stacked progres bar
                 * 
                 * This is called when the plugin is first initialized to generate the default 
                 * bar unless the addDefaultBar option is set to false
                 * 
                 * @param {object} barOptions The bar option
                 * <table>
                 *      <thead>
                 *          <td>Name </td>
                 *          <td>type </td>
                 *          <td>required </td>
                 *          <td>description</td>
                 *      </thead>
                 *      <tbody>
                 *          <tr>
                 *              <td> initValue </td>
                 *              <td> int </td>
                 *              <td> yes </td>
                 *              <td> The initial value of the prgress bar</td>
                 *          </tr>
                 *          <tr>
                 *              <td> totalValue </td>
                 *              <td>  int </td>
                 *              <td> yes </td>
                 *              <td> The total value of the progress bar</td>
                 *          </tr>
                 *          <tr>
                 *              <td> style </td>
                 *              <td> string </td>
                 *              <td> no default: primary </td>
                 *              <td> Bootsrap contextual styling. . primary|success|danger|warning</td>
                 *          </tr>
                 *          <tr>
                 *              <td> animate </td>
                 *              <td> boolean </td>
                 *              <td> no default: false </td>
                 *              <td> Whether to animate the progress</td>
                 *          </tr>
                 *          <tr>
                 *              <td> stripe </td>
                 *              <td> boolean </td>
                 *              <td> no default: false </td>
                 *              <td> Whether to add stripe to the progress bar</td>
                 *          </tr>
                 *          <tr>
                 *              <td> showValueHandler </td>
                 *              <td> callable </td>
                 *              <td> no default: The inbuilt function which displays the current percentge</td>
                 *              <td> Function that will be called to to show the value of the progress. The function is 
                 *              passed an object with bar data</td>
                 *          </tr>
                 *          <tr>
                 *              <td> hideValueHandler </td>
                 *              <td> callable </td>
                 *              <td> no default: The inbuilt function which hides the current percentge</td>
                 *              <td> Function that will be called to to hide the value of the progress</td>
                 *          </tr>
                 *          
                 *      </tbody>
             
                 * @returns {String} Progress Bar element ID
                 */
                this.addBar = function( barOptns ){
                    
                    if(noMoreSpace){
                        debug('container can not take new bar element, space full!');
                        return false;
                    }
                    var barOptions = $.extend({
                                                initValue : 0 ,
                                                totalValue : 100 ,
                                                style : 'primary',
                                                animate : false,
                                                stripe : false,
                                                showValueHandler : options.showValueHandler,
                                                hideValueHandler : options.hideValueHandler
                                            },barOptns);
                                            
                    var id = options.barIdPrefix + count ;
                    var initVal = parseInt(barOptions.initValue) || 0  ;
                    var totalVal = parseInt(barOptions.totalValue) || (100 - sum)  ;
                    // convert the init value to percent
                    var initValuePercent =  getValuePercentage( initVal , options.total );
                    var initValuePercentRounded = Math.round(initValuePercent * 10 ) / 10;
                    // convert the total value to percent
                    var totalValuePercent =  getValuePercentage( totalVal , options.total );
                    var totalValuePercentRounded = Math.round(totalValuePercent * 10 ) / 10;
                    // we
                    var availableSpace = 100 - sum  ;
                    
                    if(initValuePercent >= availableSpace ){
                        // normalize value
                        initValuePercent  = availableSpace ;
                        noMoreSpace = true;
                    }
                    // gemerate the progress bar html
                    var elem = generateProgressBarHtml( id , initValuePercentRounded , barOptions.style , initVal , totalVal , barOptions.animate , barOptions.stripe );
                    // add new bar to the progress
                    container.append(elem);
                    
                    //save the bar data
                    // The object is passed to callbacks 
                    bars[id] = { 
                        /**
                         * int Total value for the bar
                         */
                        'totalValue' : totalVal ,     
                        /**
                         * Initial value for the bar
                         * This figure is relative to the total value
                         */
                        'currentValue' : initVal ,
                        /**
                         * Holds the initial value
                         * It is never changed
                         */
                        'init' : initVal ,     
                        /**
                         * 
                         * Initial percentage
                         * 
                         * Dont change in callbacks 
                         */
                        'initPercent' : initValuePercent ,
                        /**
                         * 
                         * Initial percentage
                         * 
                         * Dont change in callbacks 
                         */
                        'totalValuePercent' : totalValuePercent ,
                        /**
                         * 
                         * Initial percentage
                         * 
                         * Dont change in callbacks 
                         */
                        'totalValuePercentRounded' : totalValuePercentRounded ,
                        /**
                         * Current percentage
                         */
                        'currentPercent' : initValuePercent ,
                        /**
                         * Initial percentage rounded value 
                         */
                        'currentPercentRounded' : initValuePercentRounded ,
                        /**
                         * Contectuak bootsrap style using bootsrap
                         * 
                         * success|danger|info|primary
                         */
                        'style' : barOptions.style ,
                        /**
                         * Jquery element
                         * The Progress bar element
                         * The element with 'progress-bar' class
                         */
                        'elem' : elem ,
                        /**
                         * Keep track of showValue()/hideValue() settings
                         * Whether to show value 
                         * 
                         */
                        'showText' : true,
                        /**
                         * This is the id of the bar 
                         * 
                         * This can be used to refrence specific when using 
                         * stacked progress bar 
                         */
                        'id' : id ,
                        /**
                         * Function that shows the current value/state of the progress bar
                         */
                        showValueHandler : barOptions.showValueHandler ,
                        /**
                         * function that hides the current value/state of the progress bar
                         */
                        hideValueHandler : barOptions.hideValueHandler 
                        
                        
                    };
                    barOptions.showValueHandler(bars[id]);
                    // monitor the progress bar count
                    count ++;  
                   // reset the sum
                    resetSum();
                    return id ;
                };
                
                
                /**
                 * Remove a bar element 
                 * @param {string} barId Optional specify the id of bar to remove
                 * @returns {void}
                 */
                this.removeBar = function(barId){
                    var bar = this.getBar(barId);
                    if(bar){
                        bar.elem.remove();
                    }
                };
                
                /**
                 * Destroy progress  
                 * @returns {undefined}
                 */
                this.destroy = function(){
                    container.remove();
                }
                /**
                 * Get progress bar by id 
                 * A progress can have multiple bar (stacked)
                 * When you call addBar() the id or the progress bar is returned
                 * 
                 * @param {string} barId
                 * @returns {Nyra.util.bootstrap.progeressBar.progressBar.bars|bars}
                 */
                this.getBar = function(barId){
                     // use the main bar added at init if not specified
                    var id = barId || mainBarElemId;
                    if(bars[id]){
                        return bars[id];
                    }
                    debug('No progress bar element with id: ' + id);
                    return null;
                }; 
                // add the initial
                if(options.addDefaultBar){
                    mainBarElemId = this.addBar(options);
                }
                
            };
            
            /**
             * Generate progress element
             * 
             * @param {string} id
             * @returns {jQuery|$|@exp;window@pro;$|Window.$}
             */
            var generateContainerHtml = function(id){
                return $('<div></div>' , { 'id' : id , 'class' : 'progress' } ) ;
            };
            /**
             * Generate the progress bar htm 
             * 
             * @param {string} id
             * @param {int} initVal
             * @param {string} style success|danger|info|warning
             * @param {int} min
             * @param {int} max
             * @param {boolean} animate
             * @param {boolean} stripe
             * @returns {jQuery|$|@exp;_$|Window.$}
             */
            var generateProgressBarHtml = function(id , initVal , style , min , max , animate , stripe ){
                var child = $('<div></div>');
                var classNames = 'progress-bar progress-bar-' +style;
                // add optionall styling
                if(animate) classNames += ' active ';
                if(stripe) classNames += ' progress-bar-striped';
                
                child.attr('id' , id ).attr('role' , 'progress-bar');
                child.attr('aria-valuenow' , initVal ).attr('aria-valuemin' , min );
                child.attr('aria-valuemax' , max).css({
                     width : initVal+'%' ,
                    'min-width' :'2em' ,
                });style
                child.addClass(classNames);
                child.append('<span class="sr-only sr-indicator">'+initVal+'% Complete</span></div>') ;
                return child;
            }
            /**
             * Get the percentage value 
             * @param {int} currentValue
             * @param {int} totalValue
             * @returns {Number}
             */
            var getValuePercentage = function( currentValue , totalValue ){
                return 100 - (totalValue - currentValue ) / totalValue  * 100
            };
            
            var debug = function( text ){
                if(options.debug) console.log('Progress Bar Manager Debug => ' + text);
            };
           
            // increase index for auto id
            $.fn.progressbarManager.GUID ++;
            
            return new Progress( options.id );
    }   
}( jQuery ));
