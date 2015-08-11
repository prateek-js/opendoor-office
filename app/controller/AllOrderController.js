
Ext.define('TheOpenDoor.controller.AllOrderController',{
	extend : 'TheOpenDoor.controller.BaseController',
	requires: [
        'TheOpenDoor.businessObject.GetAllOrderBO',
        'TheOpenDoor.businessObject.GetOrderDetailsBO'
    ],
	config : {
		allOrderBO: 'TheOpenDoor.businessObject.GetAllOrderBO',
		orderDetailBO: 'TheOpenDoor.businessObject.GetOrderDetailsBO',
		refs:{
			allOrderView : 'AllOrderView',
			slideNavigator: 'SlideNavigator',
			allOrderList : 'AllOrderView [itemId=allOrderList]',
			orderDetail: 'OrderDetail',
            noOrderContainer: 'AllOrderView [itemId=noOrderContainer]',
            bookNowBtn: 'AllOrderView [itemId=bookNowBtn]'
		},
		control:{
			allOrderView: {
				initialize : 'handleAllOrderViewInit'
			},
			allOrderList: {
				itemtap : 'handleOrderListTap'
			},
            bookNowBtn: {
                tap: 'handleBookNowBtn'
            }
		},
	},


	applyAllOrderBO: function(boName) {
        return Ext.create(boName, this);
    },
    applyOrderDetailBO: function(boName){
    	return Ext.create(boName, this);
    },
    handleAllOrderViewInit: function(){
    	showSpinner("Loading...");
    	var me = this;
        successCb = this.handleGetAllOrderSucess,
        failureCb = this.handleGetAllOrderFailure;
        this.getAllOrderBO().doGetAllOrder(successCb, failureCb);
    },
    handleGetAllOrderSucess: function(){
        var count = Ext.getStore('GetAllOrderStore').getCount();
        if(count == 0){
            this.getNoOrderContainer().setHidden(false);
            this.getAllOrderList().setHidden(true);
        }
        else{
            this.getNoOrderContainer().setHidden(true);
            this.getAllOrderList().setHidden(false);
        }
    	hideSpinner();
    },
    handleGetAllOrderFailure: function(){
    	hideSpinner();
    },
    handleOrderListTap: function(list, index, target, record){
    	var orderId = record.data.order_id;
    	showSpinner("Loading");
    	var me = this;
        successCb = this.handleGetOrderDetailSucess,
        failureCb = this.handleGetOrderDetailFailure;
        this.getOrderDetailBO().doGetOrderDetail(orderId,successCb, failureCb);
    },
    handleOrderDetailViewShow: function(){
    	var slideNavigator = this.getSlideNavigator();
    	if(slideNavigator){
            Ext.Viewport.remove(slideNavigator, true);
        }
        this.addToViewPort({
            xtype : 'OrderDetail'
        },true);
    },
    handleBookNowBtn: function(){
        var slideNavigator = this.getSlideNavigator();
        if(slideNavigator){
            Ext.Viewport.remove(slideNavigator, true);
        }
        this.addToViewPort({
            xtype : 'SlideNavigator'
        },true);
    }
});