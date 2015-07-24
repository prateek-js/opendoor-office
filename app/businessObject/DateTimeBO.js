
Ext.define('TheOpenDoor.businessObject.DateTimeBO', {
	extend: 'TheOpenDoor.businessObject.BaseBO',
	requires: [
	           'Ext.Ajax'
	     ],

	controllerObj: null,
	successCb: null,
	failureCb: null,
	inputDetails: null,
	serviceId: null,
	inputDetails: null,

	constructor: function (cObj) {
		if (Ext.isDefined (cObj)) {
			this.controllerObj = cObj;
		}
		return this;
	},
	doGetDateTime: function(serviceId,successCb, failureCb){
        this.serviceId = serviceId;
        this.successCb = successCb;
        this.failureCb = failureCb;
        
        this.inputDetails = {
        };
        
        this.doDateTimeAjaxRequest();
	},

	doDateTimeAjaxRequest: function () {
        this.doSendAjax({
            url: UrlHelper.getServerUrl().getSlots+this.serviceId+'/slots',
            //url: UrlHelper.getServerUrl().getSlots,
            method:'GET',
			disableCaching: false ,
            jsonData: this.inputDetails,
            success: this.onDateTimeSuccess,
            failure: this.onDateTimeFailure,
            scope: this,
            timeout: 30000
        });        
    },

    onDateTimeSuccess: function(responseObj, opts){
        try{
        	var getSlotsStore = Ext.getStore('GetSlotsStore');
        	var decodedObj = (responseObj.responseText && responseObj.responseText.length) ?  Ext.decode (responseObj.responseText) : null;
            if (Ext.isObject(decodedObj) && decodedObj.slots != null) {
            	getSlotsStore.addToStore(decodedObj.slots);
                getSlotsStore.load();
                hideSpinner();      	
    	    }
    	}catch(e){
			var errorText = localeString.errorMsg_defaultFailure;
			hideSpinner();
			//Display Error Message
			showErrorDialog(false, false, errorText);
            hideSpinner();
		}
    },

    onDateTimeFailure: function(responseObj, opts){
    	var decodedObj = (responseObj.statusText);
        errorHandled = this.genericErrorCheck(responseObj, false);
        if(!errorHandled){
            var errorText = "Error";
            AppMessage.showMessageBox(4,null,null,localeString.errorInGettingResponse);
            hideSpinner();
        }
        hideSpinner();
    }
});
