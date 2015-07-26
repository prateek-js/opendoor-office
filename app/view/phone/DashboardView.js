Ext.define('TheOpenDoor.view.phone.DashboardView', {
    extend: 'Ext.Container',
    requires: [
    ],
    config: {
        layout : {
            type : 'vbox',
            align : 'center',
            pack : 'start'
        },
        cls: 'dashboard-view',
        items:[{
            xtype: 'headerPanel',
            width: '100%'
        },{
            xtype: 'image',
            src: 'resources/images/logo.png',
            docked: 'top',
            itemId : 'centerLogo',
            cls: 'center-logo-image',
        },{
            xtype: 'container',
            layout : {
                type : 'vbox',
                align : 'start',
                pack : 'center'
            },
            cls: 'dashboard-view-container',
            items:[{
                xtype: 'label',
                cls: 'profile-details-label',
                html: localeString.profileDetails
            },{
                xtype: 'container',
                layout: 'hbox',
                cls: 'icon-field-container',
                items:[{
                    xtype: 'image',
                    src: '',
                    cls: 'name-icon'
                },{
                    xtype: 'textfield',
                    itemId: 'nameField',
                    iconCls: 'homeicon',
                    iconMask: true,
                    placeHolder: 'Name',
                    cls: 'other-textfield'
                }]                
            },{
                xtype: 'container',
                layout: 'hbox',
                cls: 'icon-field-container',
                items:[{
                    xtype: 'image',
                    src: '',
                    cls: 'email-icon'
                },{
                    xtype: 'emailfield',
                    name: 'email',
                    cls: 'other-textfield',
                    readOnly: true,
                    itemId: 'emailFieldId'
                }]                                    
            },{
                xtype: 'container',
                layout: 'hbox',
                cls: 'icon-field-container',
                items:[{
                    xtype: 'image',
                    src: '',
                    cls: 'number-icon'
                },{
                    xtype: 'numberfield',
                    cls: 'other-textfield',
                    name: 'ContactNumber',
                    placeHolder: '9876543210',
                    itemId : 'mobileNumberField'
                }]                
            }]
        },{
            xtype: 'button',
            ui: 'plain',
            text: 'Save',
            docked: 'bottom',
            itemId: 'saveButton',
            cls: 'save-button'
        }]           
    }
});
