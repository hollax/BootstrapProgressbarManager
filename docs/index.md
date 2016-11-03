# BootstrapProgressbarManager

Easily manipulate Bootstrap progress bar.

##Some Features

1. No need to write html for the progress bar
2. Easily update progress value
2. Easily style bootstrap progress bar 
3. Easily create and manage stacked progress bar

##Usage 
 
Call the plugin on the container element you want the progress html to be *appended* to
This will not override existing elements or content of the container element

   $(selector).progressbarManager( options );

Where 
*Selector : Jquery selector for the container to append the progress bar html to
*options : Object literal to set the plugin options 

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

and appends it to the element with id _progress_. 

_progressbarManager_ returns progress object which you can use to modify the _progress_ element on the fly
  
To update the value of the progress : 

```javascript 
    myProgress.setValue(30 );
```

If you attempt to set a value higher than the value of the _totalValue_ option, the progress bar percentage value will be set to 100%
    
The totalValue option can be a string that can be converted to number representation for instance if you are using it to monitor download or upload progress, you can use the bytes representation 

```javascript 
 myDownloadProgress = $('#progress').progressbarManager({      
     totalValue : '40000kb',
     animate : true ,
     stripe : true
  });
  myDownloadProgress.setValue( '4000kb');
```

##Plugin Options 

Name | Type | Description
-----|------|------------
totalValue | int | The total value of the progress
initValue | int | Initial value of the progress.

    
