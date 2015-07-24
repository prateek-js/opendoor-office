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
			itemTpl: '<div>{slot_start_time}&nbsp&nbsp{order_id}<div class="div-arrow-image"></div></div>',
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