Ext.define('TheOpenDoor.businessObject.DeleteAddressBO', {
	extend: 'TheOpenDoor.businessObject.BaseBO',
	requires: [
	           'Ext.Ajax'
	     ],

	controllerObj: null,
	successCb: null,
	failureCb: null,
	inputDetails: null,
	addressId: null,
	inputDetails: null,
    userFbEmail: null,
	constructor: function (cObj) {
		if (Ext.isDefined (cObj)) {
			this.controllerObj = cObj;
		}
		return this;
	},
	doAddressDelete: function(addressId, successCb, failureCb){
		this.addressId = addressId;
        this.successCb = successCb;
        this.failureCb = failureCb;
        
        this.inputDetails = {
       			"address_ids": addressId
        };
        
        this.doAddressDeleteAjaxRequest();
	},
	doAddressDeleteAjaxRequest: function () {
    	/* Call Login API */
        this.doSendAjax({
            url: UrlHelper.getServerUrl().deleteAddress,
            method:'POST',
			disableCaching: false ,
            jsonData: this.inputDetails,
            success: this.onAddressDeleteSuccess,
            failure: this.onAddressDeleteFailure,
            scope: this,
            timeout: 30000
        });        
    },

    onAddressDeleteSuccess: function(responseObj, opts){
    	try{
        	var decodedObj = (responseObj.responseText && responseObj.responseText.length) ?  Ext.decode (responseObj.responseText) : null;
            if (Ext.isObject(decodedObj)) {
            	//this.getAddressView().refresh();
                TheOpenDoor.app.getController('AddEditAddressController').handleAddressViewRefresh();
                hideSpinner();
    	    }
    	}catch(e){
			var errorText = localeString.errorMsg_defaultFailure;
			hideSpinner();
			//Display Error Message
			showErrorDialog(false, false, errorText);
		}
    },

    onAddressDeleteFailure: function(responseObj, opts){
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
