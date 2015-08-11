Ext.define('TheOpenDoor.view.phone.OrderDetail',{
	extend : 'Ext.Container',
	config : {
		layout : {
            type : 'vbox',
            align : 'center',
            pack : 'stretch'
        },
		cls : ['order-detail'],
        id: "OpenDoorOrderDetail",
		items: [{
            xtype: 'headerPanel',
            flex: 1,
            width: '100%',
            itemId: 'headerPanel',
            useLeftImage: true
        },{
            xtype: 'image',
            src: 'resources/images/logo.png',
            docked: 'top',
            itemId : 'centerLogo',
            cls: 'center-logo-image',
        },{
            xtype: 'container',
            cls: 'order-detail-container',
            layout: {
            	type: 'vbox',
            	pack: 'start',
            	align: 'stretch'
            },
            flex: 9,
			items:[{
                xtype: 'container',
                layout: {
                    type: 'hbox',
                    align: 'center'
                },
                cls: 'order-id-status-service',
                itemId: 'orderIdStatusService',
                items:[{
                    xtype: 'container',
                    layout: {
                        type: 'vbox',
                        pack: 'center'
                    },
                    cls: 'order-service-id',
                    itemId: 'orderServiceId',
                    docked: 'left',
                    items:[{
                        xtype: 'label',
                        html: '',
                        cls: 'order-service',
                        itemId: 'orderService'
                    },{
                        xtype: 'label',
                        html: '',
                        cls: 'order-id',
                        itemId: 'orderId'
                    }]
                },{
                    xtype: 'container',
                    html: '',
                    itemId: 'orderStatus',
                    cls: 'order-status',
                    docked: 'right'
                }]
            },{
                xtype: 'container',
                itemId: 'bookedTimeContainer',
                cls: 'booked-time-container',
                html: ''
            },{
                xtype: 'container',
                itemId: 'addressContainer',
                cls: 'address-container',
                html: ''
            },{
                xtype: 'container',
                itemId: 'scheduledTimeContainer',
                cls: 'scheduled-time-container',
                html: ''
            },{
                xtype: 'container',
                itemId: 'timeContainer',
                cls: 'time-container',
                layout: {
                    type: 'hbox'
                },
                items:[{
                    xtype: 'label',
                    itemdId: 'startTime',
                    cls: 'start-time-label',
                    html: ''
                },{
                    xtype: 'label',
                    itemdId: 'endTime',
                    cls: 'start-time-label',
                    html: ''
                },{
                    xtype: 'label',
                    itemdId: 'totalTime',
                    cls: 'start-time-label',
                    html: ''
                }]
            },{
                xtype: 'container',
                layout: {
                    type: 'hbox',
                    align: 'center'
                },
                cls: 'total-bill-container',
                itemId: 'totalBillContainer',
                items:[{
                    xtype: 'container',
                    layout: {
                        type: 'vbox',
                        pack: 'center'
                    },
                    cls: 'total-bill',
                    itemId: 'totalBill',
                    docked: 'left',
                    items:[{
                        xtype: 'label',
                        html: localeString.totalBill,
                        cls: 'order-service',
                        itemId: 'orderService'
                    },{
                        xtype: 'label',
                        html: '',
                        cls: 'bill-value',
                        itemId: 'billValue'
                    }]
                },{
                    xtype: 'button',
                    text: localeString.mailInvoice,
                    itemId: 'mailInvoiceBtn',
                    cls: 'mail-invoice-button',
                    docked: 'right'
                }]
            }]
		},{
            xtype: 'button',
            cls: 'cancel-order-button',
            itemId: 'cancelOrderButton',
            text: localeString.cancelOrder,
            hidden: false,
            docked: 'bottom'
        },{
            xtype: 'button',
            cls: 'cancel-order-button',
            itemId: 'submitFeedbackButton',
            text: localeString.bookAgain,
            hidden: false,
            docked: 'bottom'
        }]
	}
});