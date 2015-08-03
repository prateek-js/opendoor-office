Ext.define('TheOpenDoor.view.phone.order.DateTimeView', {
    extend: 'Ext.Container',
    requires: [
    ],
    config: {
        layout : {
            type : 'vbox',
            align : 'center',
            pack : 'start'
        },
        cls: 'date-view',
        items:[{
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
            flex: 9,
            layout: {
                type: 'vbox',
                align: 'start',
                pack: 'start'
            },
            cls: 'date-time-container',           
            items: [{
                xtype: 'label',
                html : localeString.dateTimeslots,
                cls : 'date-time-label'
            },{
                xtype: 'container',
                layout : {
                    type: 'hbox'
                },
                cls: 'date-picker-container',
                items:[{
                    xtype : 'image',
                    src : 'resources/images/datetime/date.png',
                    cls : 'order-date-label'
                },{
                   xtype:'DatePickerField',
                    cls:'datePickerTextFieldCls',
                    pickerCls:['timePickerCls'],
                    clearIcon:false,
                    id:'datePickerId',
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
                    xtype : 'image',
                    src : 'resources/images/datetime/time.png',
                    cls : 'order-time-label'
                },{
                    xtype:'TimePickerField',
                    cls:'timePickerTextFieldCls',
                    pickerCls:['timePickerCls'],
                    clearIcon:false,
                    id:'timePickerId',
                    pickerHeight:'10.5em'
                }]
            },{
                xtype: 'label',
                html: '',
                cls: 'date-time-selected-label',
                itemId: 'dateTimeSelectedLabel'
            }]
        },{
            xtype: 'button',
            ui: 'plain',
            text: 'Continue',
            docked: 'bottom',
            itemId: 'dateTimeContinueButton',
            cls: 'date-time-continue-button'
        }]           
    }
});
