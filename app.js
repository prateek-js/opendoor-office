/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when it performs code generation tasks such as generating new
    models, controllers or views and when running "sencha app upgrade".

    Ideally changes to this file would be limited and most work would be done
    in other places (such as Controllers). If Sencha Cmd cannot merge your
    changes and its generated code, it will produce a "merge conflict" that you
    will need to resolve manually.
*/

Ext.application({
    name: 'TheOpenDoor',

    requires: [
        'Ext.MessageBox',
        'TheOpenDoor.overrides.History',
        'TheOpenDoor.localization.Localization',
        'TheOpenDoor.helper.AppSetting',
        'Ext.device.Connection',
        'TheOpenDoor.helper.AppMessage'
    ],
    profiles: ['Phone', 'Tablet'],
    views: [
        'TheOpenDoor.view.component.Header',
        'TheOpenDoor.view.component.DatePickerField',
        'TheOpenDoor.view.component.TimePickerField'
    ],
    controllers:[
        'BaseController',
        'MainController',
        'LoginController',
        'DashboardController',
        'OrderController',
        'OrderStartController',
        'AddEditAddressController',
        'FinalOrderPreviewController',
        'AllOrderController',
        'ProfileController',
        'OrderDetailController'
    ],
    models:[
        'DashboardModel',
        'DashboardAddressModel',
        'OrderServiceModel',
        'CreateUserModel',
        'GetSlotsModel',
        'StartTimesModel',
        'AddressGetModel',
        'GetAllOrderModel',
        'OrderDetailModel'
    ],
    stores:[
        'DashboardStore',
        'OrderServiceStore',
        'CreateUserStore',
        'GetSlotsStore',
        'TimeStore',
        'AddressGetStore',
        'GetAllOrderStore',
        'OrderDetailStore'
    ],
    icon: {
    },

    isIconPrecomposed: true,

    startupImage: {
    },

    launch: function() {
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();
        window.historyCount = 0;
        if (Ext.os.is('Android')) {
            var baseController = TheOpenDoor.app.getController('TheOpenDoor.controller.BaseController');
            document.addEventListener("backbutton", Ext.bind(onBackKeyDown, this), false);  // add back button listener
            function onBackKeyDown(e) {
                e.preventDefault();
                baseController.onAndroidBackClick();
            }
        }
    },

    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
