Ext.define('TheOpenDoor.view.phone.order.AddressItem',{
	extend: 'Ext.dataview.component.DataItem',
    config: {
        layout: {
            type: 'vbox'
        },
        btnRef:'',
        itemId:'addressItemCnt',
        cls: 'data-item-container',
        items: [{
        	xtype: 'container',
            itemId: 'addressItem',
            cls: 'full-address-container',
            tpl: '<div class="full-address-div"><div class="address-name">{name}</div><div class="address-line">{address_line}</div><div class="address-cps">{address_cps} &nbsp &nbsp {phone_number}</div><div class="address-country">{country}</div></div>',
            flex: 0.5
        },{
            xtype: 'radiofield',
            name : 'address',
            value: '',
            itemId: 'addressRadioField',
            flex: 0.1,
            cls: 'address-radiofield',
            listeners:{
                'change': function(radio) {
                    var me = this;
                    addressView = me.getParent().up('#addressView').down('#addressItemCnt');
                    addressView.setBtnRef('radio');
                }
            }
        },{
        	xtype: 'container',
        	layout:{
        		type: 'hbox',
        		pack: 'center',
        		align: 'center'
        	},
        	flex: 0.2,
            cls: 'address-deledit-button-container',
        	items:[{
        		xtype: 'button',
        		ui: 'plain',
	        	flex: 1,
	        	text: 'Edit',
	        	itemId: 'editButton',
	        	cls: 'address-edit-button',
                listeners:[{
                    element: 'element',
                    event: 'tap',
                    fn: function(ElementObj, e) {
                        var me = this, addressOrderServiceView = null;
                        addressView = me.getParent().up('#addressView').down('#addressItemCnt');
                        addressView.setBtnRef('edit');
                    }
                }]
        	},{
	        	xtype: 'button',
	        	ui: 'plain',
	        	flex: 1,
	        	text: 'Delete',
	        	itemId: 'deleteButton',
	        	cls: 'address-delete-button',
                listeners:[{
                    element: 'element',
                    event: 'tap',
                    fn: function(ElementObj, e) {
                        var me = this, addressOrderServiceView = null;
                        addressView = me.getParent().up('#addressView').down('#addressItemCnt');
                        addressView.setBtnRef('delete');                        
                    }
                }]
        	}]
	    }]
    },
    updateRecord: function(record) {
        var me = this;
        if(!record)
            return;
        me.down('#addressItem').setData({name: record.get('name'), address_line: record.get('address_line'),address_cps: record.get('address_cps'),country: record.get('country')});
        me.callParent(arguments);
    }
});