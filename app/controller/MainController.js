
Ext.define('TheOpenDoor.controller.MainController',{
	extend : 'TheOpenDoor.controller.BaseController',
	requires: [
	   'Ext.fx.easing.EaseOut',
        'Ext.carousel.Item',
        'Ext.carousel.Indicator',
        'Ext.carousel.Carousel'
    ],
	config : {
        refs:{
            carouselContainer : 'Main carousel[itemId = carouselContainer]',
            mainContinueButton : 'Main button[itemId = mainContinueButton]',
            loginView: 'LoginView',
            mainView : 'Main'
        },

        control:{
            mainContinueButton : {
                tap: 'handleContinueButtonTap'
            }
        },

	},
    /**
    * Init method to register or catch the custome events
    * @param {app} app level component
    */
    init : function(app) {
        Ext.define('Override.util.PaintMonitor', {
            override : 'Ext.util.PaintMonitor',

            constructor : function(config) {
                return new Ext.util.paintmonitor.CssAnimation(config);
            }
        });

        Ext.define('Override.util.SizeMonitor', {
            override : 'Ext.util.SizeMonitor',

            constructor : function(config) {
                var namespace = Ext.util.sizemonitor;

                if (Ext.browser.is.Firefox) {
                    return new namespace.OverflowChange(config);
                } else if (Ext.browser.is.WebKit || Ext.browser.is.IE11) {
                    return new namespace.Scroll(config);
                } else {
                    return new namespace.Default(config);
                }
            }
        });
    },
    
    handleLoginViewInit: function(){
        var loginView = this.getLoginView();
        var mainView = this.getMainView();
        this.addToViewPort({
            xtype : 'LoginView'
        },true);
        Ext.Viewport.remove(mainView, true);
    }
});
