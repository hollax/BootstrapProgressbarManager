# BootstrapProgressbarManager

Easily manipulate Bootstrap progress bar.

##Some Features

1. No need to write html for the progress bar
2. Easilly style bootstrap progress bar 
3. Easilly manage stacked progress bar

Progress bar can be used to display Upload progress to users

When you can the plugin, an object is returned which be used to manipulate the progress bar.

## Basic Usage 

    <div id="bar1">
       <strong>Simple Progress  Bar Example</strong>
    </div>
    
    myProgress = $('#bar1').progressbarManager({      
     totalValue : 50,
     initValue : 10 ,
     animate : true ,
     stripe : true
    });
    
Then you can start updating the bar value 

    myProgress.setValue(30 );
    
You can also set the bar options on the fly 

    myProgress.style('danger').animate().stripe();

    myProgress.style('danger').animateRemove().removeStripe().setValue(40);
    
You can add callback to be fired when the value reaches totalValue option


    myProgress = $('#bar1').progressbarManager({      
     totalValue : 50,
     initValue : 10 ,
     onComplete : function(){
        console.log("completed");

     }
    });
 You can complete the progress bar without set the value to the total
     myprogress.complete();
     
     
To check if the progress bar is complete
    myProgress.isComplete()
   
To use the stacked progress bar option 
  
    myProgressStacked = $('#bar1').progressbarManager({      
             totalValue : 50,
             initValue : 50 ,
             // stackec bar option
             total : 200
            });
        StackedBar2 = myProgressStacked.addBar({
             totalValue : 50 ,
             initValue : 20,
             style: 'danger'
            });
        StackedBar3 = myProgressStacked.addBar({
             totalValue : 20 ,
             initValue : 30,
             style: 'info'
        });
        StackedBar4 = myProgressStacked.addBar({
           totalValue : 20 ,
           initValue : 30,
           style: 'success'
          });
        StackedBar5 = myProgressStacked.addBar({
             totalValue : 10 ,
             initValue : 10,
             style: 'primary'
          });

        StackedBar6 = myProgressStacked.addBar({
             totalValue : 10 ,
             initValue : 5,
             style: 'success'
          });
The above will create a stacked progress bar
You can change the style of any progress bar in the stack by specifing the id returned after calling addBar() method on the plugin object

    myProgressStacked.style('success' , StackedBar6 ); 
     myProgressStacked.animate('success' , StackedBar6 ).stripe( StackedBar6) ; 
     

This is just a brief intro, link to the full documentation will be added soon.

