Ext.define('TheOpenDoor.view.phone.ProfileView', {
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
                    itemId: 'nameProfileField',
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
                    itemId: 'emailProfileFieldId'
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
                    readOnly: true,
                    name: 'ContactNumber',
                    itemId : 'mobileNumberProfileField'
                }]                
            }]
        },{
            xtype: 'button',
            ui: 'plain',
            text: 'Save',
            docked: 'bottom',
            itemId: 'saveProfileButton',
            cls: 'save-button'
        }]           
    }
});
