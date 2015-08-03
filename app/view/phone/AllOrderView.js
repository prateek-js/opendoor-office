Ext.define('TheOpenDoor.view.phone.AllOrderView',{
	extend : 'Ext.Container',
	requires : ['Ext.dataview.List'],
	config : {
		layout : {
			type : 'vbox'
		},
		cls : ['view-all-orders'],
		items: [{
            xtype: 'list',
			emptyText: '<div class="listEmptyMyBillsText">'+localeString.norecordsfound+'</div>',
			itemId: 'allOrderList',
			itemTpl: '<div><div class="order-status-image-div"><img src="resources/images/user.png" class="order-status-image"></div><div class="main-order-div"><div class="order-date">Date: <span class="order-value-label">{orderDate}</span></div><div class="order-time">Time: <span class="order-value-label">{orderTime}</span></div><div class="order-service">Service: <span class="order-value-label">{service_name}</span></div></div><div class="arrow-image-div"><img src="resources/images/icons/next.png" class="arrow-image"></div></div>',
			cls: 'all-order-list',
			infinite: false,
			useSimpleItems: true,
			variableHeights: false,
			striped: true,
			ui: 'plain',
			store:'GetAllOrderStore',
			flex: 0.88
		}]
	}
});