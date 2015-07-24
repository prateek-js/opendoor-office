Ext.define('TheOpenDoor.view.phone.OrderDetail',{
	extend : 'Ext.Container',
	config : {
		layout : {
            type : 'vbox',
            align : 'center',
            pack : 'stretch'
        },
		cls : ['order-detail'],
		items: [{
            xtype: 'headerPanel',
            width: '100%',
            itemId: 'headerPanel',
            flex: 1,
            useBackButton: true,
        },{
            xtype: 'image',
            src: 'resources/images/bulletpoint.jpg',
            docked: 'top',
            itemId : 'centerLogo',
            cls: 'center-logo-image',
        },{
            xtype: 'container',
            cls: 'order-detail-container',
            layout: {
            	type: 'vbox',
            	pack: 'center',
            	align: 'center'
            },
			items:[{
                xtype: 'button',
                cls: 'cancel-button',
                itemId: 'cancelButton',
                text: 'Cancel',
                hidden: false
			},{
                xtype: 'button',
                cls: 'cancel-button',
                itemId: 'submitFeedbackButton',
                text: 'Submit FeedBack',
                hidden: false
            }]
		}]
	}
});