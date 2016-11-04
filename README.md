    
     
# BootstrapProgressbarManager

Easily create and  manipulate Bootstrap progress bar.

##Features

1. No need to write html for the progress bar
2. Easily update progress value
2. Easily style bootstrap progress bar 
3. Easily create and manage stacked progress bar

##Usage 
 
Call the plugin on the container element you want the progress html to be *appended* to. This will not override existing elements or content of the container element

    $(selector).progressbarManager( options );

Where 
* **Selector** : Jquery selector for the container to append the progress bar html to
* **options** : Object literal to set the plugin options 

###HTML

    <div id="progress">
       <strong>Simple Progress  Bar Example</strong>
    </div>

####Javascript

```javascript 
 myProgress = $('#progress').progressbarManager({      
     totalValue : 50,
     initValue : 10 ,
     animate : true ,
     stripe : true
  });
```

The above generates:

```html  
<div id="pbm-bootsrap-progress-1" class="progress">
    <div id="pbm-progress-bar-1" role="progress-bar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"     class="progress-bar progress-bar-primary active progress-bar-striped" style="width: 20%; min-width: 2em;">20%</div>
</div>
```

and append it to the element with id _progress_. 

The call to `progressbarManager` returns `progress` object which you can be used to modify the *progress* 
element on the fly.
  
To update the value of the progress for instance : 

```javascript 
    myProgress.setValue(30 );
```

*The plugin automatically converts values to percentage representation.*

Note: *If you attempt to set a value higher than the value of the `totalValue` option, 
the progress bar percentage value will be set to 100% *.
    
The `totalValue` option can be a string that can be converted to number representation for instance if 
you are using it to monitor download or upload progress, you can use the bytes representation 

```javascript 
 myDownloadProgress = $('#progress').progressbarManager({      
     totalValue : '40000kb',
     animate : true ,
     stripe : true
  });
  myDownloadProgress.setValue( '4000kb');
```


```javascript 
 myDownloadProgress = $('#progress').progressbarManager({      
     totalValue : '40000kb',
  });
```

    myDownloadProgress.animate().stripe().setValue( '4000kb');


or remove the stripe 

    myDownloadProgress.removeStripe();
    
     
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
     
     
##Stacked Progress Bar

    
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
You can change the style of any progress bar within the stack by specifying the id returned after calling `addBar()` method on the plugin returned progress object

     myProgressStacked.style('success' , StackedBar6 ); 
     myProgressStacked.animate('success' , StackedBar6 ).stripe( StackedBar6) ; 
     

[Read Docs](https://hollax.github.io/BootstrapProgressbarManager)

