/*
	* @ ##BaseController
	* where all common functionalities will be defined
	* Each Controller will have to extend  Base controller
	* and need to call common functions located in this controller
*/
Ext.define('TheOpenDoor.controller.BaseController',{
	extend : 'Ext.app.Controller',
	requires: [
	           ],
    statics : {
        loggedIn : false
    },
	gvar : {
		
	},
	config : {
		currentNavigationView: null,
		currentDate: new Date(),
		maximumDate: null,
		delayedTask: null
	},

    sessionManager : null,
	init : function() {
	},
	
	 /**
     * @method addToViewPort
     * @param item
     * adds view to the viewport
     */
	addToViewPort : function(item) {
		// Get all the views
		var viewPort = Ext.Viewport;
		var items = viewPort.getItems();
		var count = items.length;
		var xTypeVal = '';

		var itemXType = item.xtype;
        var index;

		var found = false;
		// Iterate through to see any item of xtype as item is presnt in viewport already
		for (index = 0; index < count; index++) {
			xTypeVal = this.getViewXType(items.getAt(index));
			if (xTypeVal === itemXType) {
				found = true;
				break;
			}
		}
		if (found) {
			Ext.Viewport.setActiveItem(items.getAt(index));
		} else {
			Ext.Viewport.setActiveItem(item);
		}
	},

	/**
     * @method getViewXType
     * @param item
     * gets the xtype of view
     */
	getViewXType : function(item) {
		var currentCompleteXType = item.getXTypes();
		var XTypeArray = currentCompleteXType.split('/');
		var currentXType = XTypeArray[XTypeArray.length - 1];

		return currentXType;
	},

	/**
     * @method removeXType
     * @param xType
     * remove the view from viewport
     */
	removeXType: function(xType) {
        var items = Ext.Viewport.getInnerItems();
        var count = items.length;
        var xTypeVal = '';
        var index;
        // Iterate through to see any item of xtype as item is presnt in viewport already
        for (index = 0; index < count; index++) {
        	xTypeVal = this.getViewXType(items[index]);
        	if (xTypeVal === xType) {
        		//console.log('removing '+ xType);
    			Ext.Viewport.remove(items[index], true);
        		break;
        	}
        }
	},

    /**
     * @method onAndroidBackClick
     * Help to navigate to the client detail page
     * @param storeId
     */
    onAndroidBackClick:function(){
        document.addEventListener("backbutton", onNativeBackKeyDown, false);
    },
    /**
     * @method login
     * Method will start the session manager
     * @return void
     */
    login : function() {
        
    },
    /**
     * @method logout
     * Method will stop the session manager
     * @return void
     */
    logout : function() {
        
    },
    /**
     * @method cleaningUpStore
     * This method will clean the stores on logging out
     * @return void
     */
    cleaningUpStore:function()
    {
        var stores=[
        ];
        Ext.Array.each(stores,function(key,value,dataSelf){
                var store = Ext.getStore(key);
                if(store)
                {
                    store.removeAll(true);
                    store.sync();
                }
            }
        );
    },
    /**
     * @method isLoggedIn
     * Returns the value whether the user is logged in or not.
     * @return boolean
     */
    isLoggedIn : function() {
        return this.statics.loggedIn;
    },
    /**
     * @method setIsLoggedIn
     * Returns the value whether the user is logged in or not.
     * @return boolean
     */
    setIsLoggedIn : function(value) {
         this.statics.loggedIn = value;
    }
});
