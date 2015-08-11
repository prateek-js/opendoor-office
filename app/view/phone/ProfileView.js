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
        id: "OpenDoorProfileView",
        items:[{
            xtype: 'headerPanel',
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
                    src: 'resources/images/profile/profile.png',
                    cls: 'name-icon'
                },{
                    xtype: 'textfield',
                    itemId: 'nameProfileField',
                    placeHolder: 'Name',
                    cls: 'other-textfield'
                }]                
            },{
                xtype: 'container',
                layout: 'hbox',
                cls: 'icon-field-container',
                items:[{
                    xtype: 'image',
                    src: 'resources/images/profile/email.png',
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
                    src: 'resources/images/profile/call.png',
                    cls: 'number-icon'
                },{
                    xtype: 'numberfield',
                    cls: 'other-textfield',
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
