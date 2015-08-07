
Ext.define('TheOpenDoor.controller.OrderController',{
	extend : 'TheOpenDoor.controller.BaseController',
	requires: [
        'TheOpenDoor.businessObject.OrderServicesBO'
    ],
	config : {
        orderServicesBO: 'TheOpenDoor.businessObject.OrderServicesBO',
        refs:{
            slideNavigator: 'SlideNavigator',
            dashboardView: 'DashboardView',
            orderPageView: 'OrderPageView',
            dateTimeView: 'DateTimeView',
            orderServicesDataView: 'OrderPageView [itemId = orderServicesDataView]',
            serviceNameLabel: 'OrderPageView [itemId = serviceNameLabel]',
            rateCardBtn: 'OrderPageView button[itemId = rateCardBtn]',
            bookNowBtn: 'OrderPageView button[itemId = bookNowBtn]',
        },

        control:{
            orderPageView:{
                initialize: 'handleOrderPageViewInit'
            },
            bookNowBtn: {
                tap : 'handleDataViewTap'
            }
        },
	},

    applyOrderServicesBO: function(boName) {
        return Ext.create(boName, this);
    },
    handleOrderPageViewInit: function(){
        window.user_Id = localStorage.getItem('user_Id')
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

    handleDataViewTap: function(){
        var orderServiceStore = Ext.getStore('OrderServiceStore');
        serviceIdSelected = orderServiceStore.data.items[0].data.service_id;
        var slideNavigator = this.getSlideNavigator();    
        if(slideNavigator){
            Ext.Viewport.remove(slideNavigator, true);
        }
        this.addToViewPort({
            xtype : 'MyNavView'
        },true);
    }
});
