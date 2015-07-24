Ext.define('TheOpenDoor.view.phone.order.DateTimeView', {
    extend: 'Ext.Container',
    requires: [
    ],
    config: {
        layout : {
            type : 'vbox',
            align : 'center',
            pack : 'center'
        },
        cls: 'date-view',
        items:[{
            xtype: 'headerPanel',
            flex: 1,
            width: '100%',
            itemId: 'headerPanel',
            useBackButton: true,
            useNextButton: true
        },{
            xtype: 'image',
            src: 'resources/images/bulletpoint.jpg',
            docked: 'top',
            itemId : 'centerLogo',
            cls: 'center-logo-image',
        },{
            xtype: 'container',
            flex: 9,
            layout: {
                type: 'vbox',
                align: 'center',
                pack: 'stretch'
            },
            cls: 'date-time-container',           
            items: [{
                xtype: 'label',
                html : 'Please select date and time from the available slots',
                cls : 'date-time-label'
            },{
                xtype: 'container',
                layout : {
                    type: 'hbox'
                },
                cls: 'date-picker-container',
                items:[{
                    xtype : 'label',
                    html : 'Order Date',
                    cls : 'order-date-label'
                },{
                   xtype:'DatePickerField',
                    cls:'datePickerTextFieldCls',
                    pickerCls:['timePickerCls'],
                    clearIcon:false,
                    itemId:'datePickerId',
                    pickerHeight:'10.5em' 
                }]                
            },{
                xtype: 'container',
                layout : {
                    type: 'hbox'
                },
                cls: 'time-picker-container',
                itemId: 'timePickerContainer',
                hidden :true,
                items:[{
                    xtype : 'label',
                    html : 'Order Time',
                    cls : 'order-time-label'
                },{
                    xtype:'TimePickerField',
                    cls:'timePickerTextFieldCls',
                    pickerCls:['timePickerCls'],
                    clearIcon:false,
                    itemId:'timePickerId',
                    pickerHeight:'10.5em'
                }]
            },{
                xtype: 'label',
                html: '',
                cls: 'date-time-selected-label',
                itemId: 'dateTimeSelectedLabel'
            }]
        }]           
    }
});
