/**
	*@ ## BaseNavigation  view. 
	* Will be called from different tabs inside tabpanel view.
	* provides easy navigation  to startview called from tabpanel
*/

Ext.define('TheOpenDoor.view.phone.BaseNavigationView',{
	extend : 'Ext.NavigationView',
	xtype : 'BaseNavigationView',
	config : {
		cls: 'basenavigationview',
		startView: '', // comma separated list of views that are end of the stack
		navigationBar: {
   		 hidden: true
		},
		listeners : {
			activate: 'onNavigationViewShow',
			deactivate: 'onNavigationViewDeactivate',
			activeitemchange: 'onNavigationViewActiveItemChange'
		},
		layout: {
			type: 'card',
			animation: {
				duration: 300,
				easing: 'ease-out',
				type: 'slide',
				direction: 'left'
			}
		}
	},

	onNavBack : function() {
		console.log('onNavBack');
		var xType = this.getViewXType(this.getActiveItem());
		console.log(xType);
		//console.log('Inner Items Length: ' +this.getInnerItems().length);
		// check if this is end view
        var navigationview = this;
        var items = navigationview.getInnerItems();
        var preView = this.getViewXType(items[0]);
        var count = items.length;
        if(1 == count) {
        	Ext.getStore('OrderServiceStore').removeAll(true);
	       	var baseController = TheOpenDoor.app.getController('TheOpenDoor.controller.BaseController');
	        baseController.addToViewPort({
	            xtype : 'SlideNavigator'
	        });
	        baseController.removeXType('MyNavView');
        
        	
        } else {
        	this.pop();
        }        
	},
	// This is as per the requirement by client. 
	// If the user clicks on an major tabs, 
	// the system should take to the respective main screens.
	onNavigationViewDeactivate: function() {
		//console.log('onNavigationViewDeactivate');           
        if(this.getStartView()){
            this.pop(this.getStartView());
        }         
	},
	
	//on navigation view activate
	// we will be pushing the startview of the item clicked on tabpanel
	onNavigationViewShow: function() {
		//console.log('onNavigationViewShow');
		if(this.getStartView()) {
			this.pushtoNavigationView(this.getStartView());	
		}
	},
	
	//will return the xtype of the view which is being sent to navigation view
	getViewXType : function(item) {
        var currentCompleteXType = item.getXTypes();
        var XTypeArray = currentCompleteXType.split('/');
        currentXType = XTypeArray[XTypeArray.length - 1];
        return currentXType;
    },
    
    //will check for startview present in viewport or will push it as the current active view
    pushtoNavigationView : function(viewXtype,viewItemId,dataObj){
        //console.log("pushtoNavigationView: "+ viewXtype);
        var navigationview = this;
        var items = navigationview.getInnerItems();
        var count = items.length;
        var xTypeVal = '';
           //console.log("navigation view count" + count);
        var bFound = false;
        var index;
           // Iterate through to see any item of xtype as item is present in viewport already
        for (index = 0; index < count; index++) {
        	xTypeVal = this.getViewXType(items[index]);
        	if (xTypeVal === viewXtype && ((viewItemId) ? (items[index].getItemId() === viewItemId) : true)) {
        		bFound = true;
        		break;
        	}
        }
        if (bFound) {
        	//console.log("navigation view current View already added");
            this.setActiveItem(viewXtype);
            var activeItem = this.getActiveItem();
        	return;
        } else {          
            var newObj = {
                xtype : viewXtype,
                itemId : viewItemId,
                data : dataObj
            };
            this.push(newObj);
        }
	}
});
