Ext.define('TheOpenDoor.controller.OrderStartController',{
	extend : 'TheOpenDoor.controller.BaseController',
	requires: [
        'TheOpenDoor.businessObject.DateTimeBO',
        'TheOpenDoor.businessObject.GetAddressBO',
    ],
	config : {
        dateTimeBO: 'TheOpenDoor.businessObject.DateTimeBO',
        addressBO: 'TheOpenDoor.businessObject.GetAddressBO',
        refs:{
            slideNavigator: 'SlideNavigator',
            dateTimeView: 'DateTimeView',
            baseNavigationView: 'BaseNavigationView',
            myNavView: 'MyNavView',
            dateTimeViewBackButton: 'DateTimeView [itemId=headerPanel] [itemId=leftImage]',
            dateTimeContinueButton: 'DateTimeView button[itemId=dateTimeContinueButton]',
            timePickerId: '[itemId=timePickerId]',
            datePickerId: '[itemId=datePickerId]',
            timePickerContainer : '[itemId=timePickerContainer]',
            dateTimeSelectedLabel : '[itemId=dateTimeSelectedLabel]'
        },

        control:{
            dateTimeView:{
                initialize: 'handledateTimeViewInit'
            },
            dateTimeViewBackButton:{
            	tap: 'handleDateTimeViewBackButtonTap'
            },
            dateTimeContinueButton:{
                tap: 'handleDateTimeViewNextButtonTap'
            },
            datePickerId:{
                change:'showTimeFieldHandle'
            },
            timePickerId:{
                change: 'showTimeDateLabel'
            }
        },
	},

    applyDateTimeBO: function(boName) {
        return Ext.create(boName, this);
    },
    applyAddressBO: function(boName) {
        return Ext.create(boName, this);
    },
	handledateTimeViewInit: function(){
        showSpinner("Loading");
        var me = this,
        successCb = this.handleGetServicesSucess,
        failureCb = this.handleGetServicesFailure;
        var serviceId = serviceIdSelected;
        this.getDateTimeBO().doGetDateTime(serviceId,successCb, failureCb);
	},
	handleDateTimeViewBackButtonTap: function(){
        Ext.getCmp('datePickerCreate').destroy();
        Ext.getCmp('timePickerCreate').destroy();
		this.getBaseNavigationView().onNavBack();
        // var dateTimeView = this.getDateTimeView();
        // if(dateTimeView){
        //     Ext.Viewport.remove(dateTimeView, true);
        // }
        // this.addToViewPort({
        //     xtype : 'SlideNavigator'
        // },true);
        // this.getSlideNavigator().list.select(1);
	},
    handleDateTimeViewNextButtonTap: function(){
        if(this.getDatePickerId().getValue()!= "" && this.getTimePickerId().getValue()!= ""){
            var me = this;
            successCb = this.handleGetAddressSucess,
            failureCb = this.handleGetAddressFailure;
            this.getAddressBO().doGetAddress(successCb, failureCb); 
                        
        }
        else{
            alert("Pls select date and time");
        }
        
    },
    handleGetAddressSucess: function(){
        this.getBaseNavigationView().pushtoNavigationView('AddressOrderService');     
        TheOpenDoor.app.getController('AddEditAddressController').handleAddressOrderServiceInit();
        hideSpinner();
    },
    handleGetAddressFailure: function(){
        hideSpinner();
    },
    showTimeFieldHandle: function(){
        this.getTimePickerContainer().setHidden(false);
    },
    showTimeDateLabel: function(){
        var dateSelected = convertDateToTimestamp(this.getDatePickerId().getValue());
        var timeSelected = convertTimeToTimestamp(this.getTimePickerId().getValue());
        orderStartTime = this.getDatePickerId().getValue()+ " " +this.getTimePickerId().getValue();
        var labelText = "Your Selected Order Date is " +dateSelected+ " at " +timeSelected;
        this.getDateTimeSelectedLabel().setHtml(labelText);
    }
});
