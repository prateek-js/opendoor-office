
Ext.define('TheOpenDoor.controller.OrderController',{
	extend : 'TheOpenDoor.controller.BaseController',
	requires: [
        'TheOpenDoor.businessObject.OrderServicesBO'
    ],
	config : {
        orderServicesBO: 'TheOpenDoor.businessObject.OrderServicesBO',
        serviceIdSelected: '',
        refs:{
            slideNavigator: 'SlideNavigator',
            dashboardView: 'DashboardView',
            orderPageView: 'OrderPageView',
            dateTimeView: 'DateTimeView',
            orderServicesDataView: 'OrderPageView [itemId = orderServicesDataView]'
        },

        control:{
            orderPageView:{
                initialize: 'handleOrderPageViewInit'
            },
            orderServicesDataView: {
                itemtap : 'handleDataViewTap'
            }
        },
	},

    applyOrderServicesBO: function(boName) {
        return Ext.create(boName, this);
    },
    handleOrderPageViewInit: function(){
        showSpinner("Loading");
        var me = this,
        successCb = this.handleGetServicesSucess,
        failureCb = this.handleGetServicesFailure;
        this.getOrderServicesBO().doOrderServices(successCb, failureCb);
    },

    handleGetServicesSucess: function(){
        hideSpinner();
    },

    handleAddAddressFailure: function(errObj, noInternetConnection, errMsg){
        hideSpinner();
    },

    handleDataViewTap: function(list, index, target, record, e){
        var indexTapped = index;
        this.getServiceIdSelected = record.data.service_id;
        serviceIdSelected = record.data.service_id;
        var slideNavigator = this.getSlideNavigator();    
        if(slideNavigator){
            Ext.Viewport.remove(slideNavigator, true);
        }
        this.addToViewPort({
            xtype : 'MyNavView'
        },true);
    }
});
