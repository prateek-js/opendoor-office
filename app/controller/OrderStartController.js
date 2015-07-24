Ext.define('TheOpenDoor.controller.OrderStartController',{
	extend : 'TheOpenDoor.controller.BaseController',
	requires: [
        'TheOpenDoor.businessObject.DateTimeBO'
    ],
	config : {
        dateTimeBO: 'TheOpenDoor.businessObject.DateTimeBO',
        refs:{
            slideNavigator: 'SlideNavigator',
            dateTimeView: 'DateTimeView',
            baseNavigationView: 'BaseNavigationView',
            myNavView: 'MyNavView',
            dateTimeViewBackButton: 'DateTimeView [itemId=headerPanel] button[itemId=backButtonId]',
            dateTimeViewNextButton: 'DateTimeView [itemId=headerPanel] button[itemId=nextButtonId]',
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
            dateTimeViewNextButton:{
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
	handledateTimeViewInit: function(){
        showSpinner("Loading");
        var me = this,
        successCb = this.handleGetServicesSucess,
        failureCb = this.handleGetServicesFailure;
        var serviceId = TheOpenDoor.app.getController('TheOpenDoor.controller.OrderController').getServiceIdSelected;
        this.getDateTimeBO().doGetDateTime(serviceId,successCb, failureCb);
	},
	handleDateTimeViewBackButtonTap: function(){
		this.getBaseNavigationView().onNavBack();
	},
    handleDateTimeViewNextButtonTap: function(){
        if(this.getDatePickerId().getValue()!= "" && this.getTimePickerId().getValue()!= ""){
           this.getBaseNavigationView().pushtoNavigationView('AddressOrderService'); 
        }
        else{
            alert("Pls select date and time");
        }
        
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
