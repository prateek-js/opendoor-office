
Ext.define('TheOpenDoor.controller.OrderController',{
	extend : 'TheOpenDoor.controller.BaseController',
	requires: [
        'TheOpenDoor.businessObject.OrderServicesBO',
        'TheOpenDoor.view.component.RateCardPopup'
    ],
	config : {
        overlay: null,
        orderServicesBO: 'TheOpenDoor.businessObject.OrderServicesBO',
        refs:{
            slideNavigator: 'SlideNavigator',
            dashboardView: 'DashboardView',
            orderPageView: 'OrderPageView',
            dateTimeView: 'DateTimeView',
            rateCardPopup: 'RateCardPopup',
            orderServicesDataView: 'OrderPageView [itemId = orderServicesDataView]',
            serviceNameLabel: 'OrderPageView [itemId = serviceNameLabel]',
            rateCardBtn: 'OrderPageView button[itemId = rateCardBtn]',
            bookNowBtn: 'OrderPageView button[itemId = bookNowBtn]',
            rateCardText: 'RateCardPopup [itemId = rateCardText]'
        },

        control:{
            orderPageView:{
                initialize: 'handleOrderPageViewInit'
            },
            bookNowBtn: {
                tap : 'handleDataViewTap'
            },
            rateCardBtn: {
                tap: 'handleRateCardBtnTap'
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
        window.pageCount = 1;
        var slideNavigator = this.getSlideNavigator();    
        if(slideNavigator){
            Ext.Viewport.remove(slideNavigator, true);
        }
        this.addToViewPort({
            xtype : 'MyNavView'
        },true);
    },
    handleRateCardBtnTap: function(){
        Ext.Viewport.remove(this.getOverlay(), true);
        var overlay= Ext.create('TheOpenDoor.view.component.RateCardPopup');
        this.setOverlay(overlay);
        Ext.Viewport.add(overlay);
        overlay.show();
        var orderServiceStore = Ext.getStore('OrderServiceStore');
        rateText = '<div><div class="rate-image"></div><div class="rate-div">'+orderServiceStore.data.items[0].data.price_per_hour+'</div></div>';
        this.getRateCardText().setHtml(rateText);
    }
});
