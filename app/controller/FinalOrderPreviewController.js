Ext.define('TheOpenDoor.controller.FinalOrderPreviewController',{
	extend : 'TheOpenDoor.controller.BaseController',
	// requires: [
 //        ''
 //    ],
	config : {
		finalOrderObj: '',
		refs: {
			finalOrderPreview: 'FinalOrderPreview',
			baseNavigationView: 'BaseNavigationView',
			myNavView: 'MyNavView',
			slideNavigator: 'SlideNavigator',
			finalOrderBackButton: 'FinalOrderPreview [itemId=headerPanel] button[itemId=backButtonId]',
			selectedServiceLabel: 'FinalOrderPreview [itemId=selectedServiceLabel]',
			selectedTimeLabel: 'FinalOrderPreview [itemId=selectedTimeLabel]',
			selectedAddressLabel: 'FinalOrderPreview [itemId=selectedAddressLabel]',
			placeOrderButton : 'FinalOrderPreview [itemId=placeOrderButton]'
		},

		control:{
			finalOrderBackButton: {
				tap: 'handleFinalOrderBackButton'
			},
			finalOrderPreview: {
				initialize: 'handleFinalOrderPreviewInit'
			},
			placeOrderButton: {
				tap : 'handleOrderPlaceBtnTap'
			}
		},
	},

	handleFinalOrderBackButton: function(){
		this.getBaseNavigationView().onNavBack();
	},
	handleFinalOrderPreviewInit: function(){
		var serviceSelected = serviceIdSelected;
		var addressSelected = TheOpenDoor.app.getController('TheOpenDoor.controller.AddEditAddressController').addressIdSelected;
		var timeSlotSelected = orderStartTime;
		var recordAddress = Ext.getStore('AddressGetStore').findRecord('id',addressSelected);
		var recordService = Ext.getStore('OrderServiceStore').findRecord('service_id',serviceSelected);
		var recordServiceText = "You requested for <b>" +recordService.data.name+ "</b> service"
		var recordAddressText = '<div><b>' +recordAddress.data.name+ '</b></div><div>' +recordAddress.data.address_line+ '</div><div>' +recordAddress.data.address_cps+ '</div><div><b>' +recordAddress.data.phone_number+ '</b></div>';
		var timeSlotText = "Your Requested Slot at <b>" +timeSlotSelected;
		this.getSelectedServiceLabel().setHtml(recordServiceText);
		this.getSelectedAddressLabel().setHtml(recordAddressText);
		this.getSelectedTimeLabel().setHtml(timeSlotText);
		var finalOrder = {};
		finalOrder.service_id = serviceSelected;
		finalOrder.address_id = addressSelected;
		finalOrder.start_time = timeSlotSelected;
		finalOrderObj = finalOrder;
	},
	handleOrderPlaceBtnTap: function(){
		showSpinner("Loading");
		Ext.Ajax.request({
            url: UrlHelper.getServerUrl().submitOrder,
            method: 'POST',          
            headers: {'Content-Type': 'text/json'},
            waitTitle: 'Connecting',
            waitMsg: 'Sending data...',                                     
            jsonData: {
                "service_id": finalOrderObj.service_id,
                "address_id": finalOrderObj.address_id,
                "start_time": finalOrderObj.start_time
            },
            timeout: 30000,
            scope:this,
            success: this.handleOrderPlaceSuccess,                                    
            failure: this.handleOrderPlaceFailure        
        });
	},
	handleOrderPlaceSuccess: function(responseObj, opts){
		 try{
            var decodedObj = (responseObj.responseText && responseObj.responseText.length) ?  Ext.decode (responseObj.responseText) : null;
            if (Ext.isObject(decodedObj)) {
            	var controller = TheOpenDoor.app.getController('TheOpenDoor.controller.FinalOrderPreviewController');
            	Ext.Msg.alert("Success",localeString.order_success, function(buttonId, value, opt) {
                    	controller.confirmOrder();
                    }, 
                controller);
               // AppMessage.showMessageBox(1, controller.confirmOrder, null,localeString.order_success);            
            }
        }catch(e){
            var errorText = localeString.errorMsg_defaultFailure;
            hideSpinner();
            //Display Error Message
            showErrorDialog(false, false, errorText);
        }
		hideSpinner();
	},
	handleOrderPlaceFailure: function(responseObj){
		var decodedObj = (responseObj.statusText);
        errorHandled = genericErrorCheck(responseObj, false);
        if(!errorHandled){
            var errorText = "Error";
            AppMessage.showMessageBox(4,null,null,localeString.errorInGettingResponse);
            hideSpinner();
        }
        hideSpinner();
	},

	confirmOrder: function(buttonId,value,opt){
		var myNavView = this.getMyNavView();
    	if(myNavView){
            Ext.Viewport.remove(myNavView, true);
        }
        this.addToViewPort({
            xtype : 'SlideNavigator'
        },true);
        this.getSlideNavigator().list.select(0);
	}
});