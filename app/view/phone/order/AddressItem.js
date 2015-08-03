Ext.define('TheOpenDoor.view.phone.order.AddressItem',{
	extend: 'Ext.dataview.component.DataItem',
    config: {
        layout: {
            type: 'vbox',
            pack: 'start',
            align: 'start'
        },
        btnRef:'',
        itemId:'addressItemCnt',
        cls: 'data-item-container',
        items: [{
        	xtype: 'container',
            itemId: 'addressItem',
            cls: 'full-address-container',
            tpl: '<div class="full-address-div"><div class="address-name">{name}</div><div class="address-line">{line1}</div><div class="address-cps">{address_line2}</div><div class="address-cps">{address_cps}</div><div class="address-country">{phone_number}</div></div>',
            flex: 0.5
        },{
        	xtype: 'container',
        	layout:{
        		type: 'hbox',
        		pack: 'end',
        		align: 'center'
        	},
        	flex: 0.2,
            cls: 'address-deledit-button-container',
        	items:[{
                xtype: 'container',
                layout: {
                    type: 'vbox',
                },
                cls: 'delete-container',
                items:[{
                    xtype: 'image',
                    src: 'resources/images/slider/all-orders.png',
                    cls: 'address-delete-icon'
                },{
                    xtype: 'label',
                    html: localeString.delete,
                    cls: 'address-delete-label'
                }],
                listeners:[{
                    element: 'element',
                    event: 'tap',
                    fn: function(ElementObj, e) {
                        var me = this, addressOrderServiceView = null;
                        addressView = me.getParent().up('#addressView').down('#addressItemCnt');
                        addressView.setBtnRef('delete');
                    }
                }]
            },{
                xtype: 'container',
                layout: {
                    type: 'vbox',
                },
                cls: 'edit-container',
                items:[{
                    xtype: 'image',
                    src: 'resources/images/slider/all-orders.png',
                    cls: 'address-edit-icon'
                },{
                    xtype: 'label',
                    html: localeString.edit,
                    cls: 'address-edit-label'
                }],
                listeners:[{
                    element: 'element',
                    event: 'tap',
                    fn: function(ElementObj, e) {
                        var me = this, addressOrderServiceView = null;
                        addressView = me.getParent().up('#addressView').down('#addressItemCnt');
                        addressView.setBtnRef('edit');
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