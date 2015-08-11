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
			finalOrderBackButton: 'FinalOrderPreview [itemId=headerPanel] [itemId=leftImage]',
			selectedServiceLabel: 'FinalOrderPreview [itemId=selectedServiceLabel]',
			placeOrderButton : 'FinalOrderPreview [itemId=placeOrderButton]',
			addressLineLabel: 'FinalOrderPreview [itemId=addressLineLabel]',
			landmarkCityLabel: 'FinalOrderPreview [itemId=landmarkCityLabel]',
			pincodeLabel: 'FinalOrderPreview [itemId=pincodeLabel]',
			mobileLabel: 'FinalOrderPreview [itemId=mobileLabel]',
			timeLabel: 'FinalOrderPreview [itemId=timeLabel]',
			userNameLabel: 'FinalOrderPreview [itemId=userNameLabel]'
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
		window.pageCount = 2;
		this.getBaseNavigationView().onNavBack();
	},
	handleFinalOrderPreviewInit: function(){
		var namefield = '<div>Dear ' +localStorage.getItem('userName')+ '</div>';
		this.getUserNameLabel().setHtml(namefield);
		var serviceSelected = serviceIdSelected;
		var addressSelected = TheOpenDoor.app.getController('TheOpenDoor.controller.AddEditAddressController').addressIdSelected;
		var timeSlotSelected = orderStartTime;
		
		var recordAddress = Ext.getStore('AddressGetStore').findRecord('id',addressSelected);
		var recordService = Ext.getStore('OrderServiceStore').findRecord('service_id',serviceSelected);
		var addressLine = recordAddress.data.line1 +' '+ recordAddress.data.line2;
		var landmarkCity = recordAddress.data.landmark +' '+ recordAddress.data.city;
		var pincode = recordAddress.data.pincode;
		var mobNum = recordAddress.data.phone_number;
		var timeinFormat = splitDateAndTimeRetTime(orderStartTime);
		var dateinFormat = convertDateToTimestamp(orderStartTime);
		var dayName = convertDateforDay(orderStartTime);
		var recordServiceText = localeString.yourRequest +recordService.data.name+ localeString.requestCreated;
		var timeSlotText = "Your Requested Slot at <b>" +timeSlotSelected;
		var timeSelected = '<span class="order-time-label">Order Time: </span>'+ timeinFormat+ ' on ' +dayName+ ', ' +dateinFormat;
		this.getSelectedServiceLabel().setHtml(recordServiceText);
		//this.getSelectedTimeLabel().setHtml(timeSlotText);
		this.getAddressLineLabel().setHtml(addressLine);
		this.getLandmarkCityLabel().setHtml(landmarkCity);
		this.getPincodeLabel().setHtml(pincode);
		this.getMobileLabel().setHtml(mobNum);
		this.getTimeLabel().setHtml(timeSelected);
		var finalOrder = {};
		finalOrder.service_id = serviceSelected;
		finalOrder.address_id = addressSelected;
		finalOrder.start_time = timeSlotSelected;
		finalOrderObj = finalOrder;
	},
	handleOrderPlaceBtnTap: function(){
		showSpinner("Loading");
		if(!isOnLine()) {
            hideSpinner();
            AppMessage.showMessageBox(4,null,null,localeString.noInternetConnection);
            return;
        }
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
		Ext.getCmp('datePickerCreate').destroy();
        Ext.getCmp('timePickerCreate').destroy();
    	if(myNavView){
            Ext.Viewport.remove(myNavView, true);
        }
        this.addToViewPort({
            xtype : 'SlideNavigator'
        },true);
        this.getSlideNavigator().list.select(0);
	}
});