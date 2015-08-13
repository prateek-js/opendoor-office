Ext.define('TheOpenDoor.view.phone.LoginView', {
    extend: 'Ext.Container',
    requires: [
    ],
    config: {
        layout : {
            type : 'vbox',
            align : 'center',
            pack : 'center'
        },
        cls: 'login-view',
        id: "OpenDoorLoginView",
        items:[{
            xtype: 'headerPanel',
            //flex: 1,
            width: '100%'
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
                align: 'center',
                pack: 'center'
            },
            cls: 'google-parent-container',           
            items: [{
                xtype: 'container',
                itemId : 'googleBtnContainer',
                cls: 'google-btn-container',
                layout: {
                    type: 'vbox',
                    align: 'center',
                    pack: 'center'
                },
                items: [{
                    xtype: 'label',
                    html: localeString.connectWith,
                    cls: 'login-via-google-label',
                },{
                    xtype: 'image',
                    src: 'resources/images/g.png',
                    cls: 'login-via-google-image'
                }],
                listeners: {
                    tap: {
                        element: 'element',
                        fn: function() {
                            TheOpenDoor.app.getController('LoginController').handleGoogleSignIn();
                        }
                    }
                }
            },{
                xtype: 'container',
                cls: 'spacer-between-social'
            },{
                xtype: 'container',
                itemId : 'facebookBtnContainer',
                cls: 'google-btn-container',
                layout: {
                    type: 'vbox',
                    align: 'center',
                    pack: 'start'
                },
                items: [{
                    xtype: 'label',
                    html: localeString.connectWith,
                    cls: 'login-via-google-label'
                },{
                    xtype: 'image',
                    src: 'resources/images/fb.png',
                    cls: 'login-via-google-image'
                }],
                listeners: {
                    tap: {
                        element: 'element',
                        fn: function() {
                            TheOpenDoor.app.getController('LoginController').handleFacebookSignIn();
                        }
                    }
                }
            }
            ]            
        }]
    }
});
