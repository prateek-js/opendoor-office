
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
			baseNavigationView: 'BaseNavigationView',
			slideNavigator: 'SlideNavigator',
			allOrderList : 'AllOrderView [itemId=allOrderList]',
			orderDetail: 'OrderDetail',
			orderDetailBackButton: 'OrderDetail [itemId=headerPanel] button[itemId=backButtonId]',
		},
		control:{
			allOrderView: {
				initialize : 'handleAllOrderViewInit'
			},
			allOrderList: {
				itemtap : 'handleOrderListTap'
			},
			orderDetailBackButton: {
				tap : 'handleOrderDetailBackBtnTap'
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
    	showSpinner("Loading");
    	var me = this;
        successCb = this.handleGetAllOrderSucess,
        failureCb = this.handleGetAllOrderFailure;
        this.getAllOrderBO().doGetAllOrder(successCb, failureCb);
    },
    handleGetAllOrderSucess: function(){
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
    	var orderDetailStore = Ext.getStore('OrderDetailStore');
    	var slideNavigator = this.getSlideNavigator();
    	if(slideNavigator){
            Ext.Viewport.remove(slideNavigator, true);
        }
        this.addToViewPort({
            xtype : 'OrderDetail'
        },true);
	    var record =  orderDetailStore.data.items[0].data
    },
    handleOrderDetailBackBtnTap : function(){
    	var orderDetail = this.getOrderDetail();
    	if(orderDetail){
            Ext.Viewport.remove(orderDetail, true);
        }
        this.addToViewPort({
            xtype : 'SlideNavigator'
        },true);
        this.getSlideNavigator().list.select(1);

    }
});