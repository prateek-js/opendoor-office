/**
 * Singleton utility class that contains the Application Setting configuration
 * @property {String} baseUrl API baseUrl
 */
Ext.define('TheOpenDoor.helper.AppSetting', {
	singleton : true,
	alternateClassName : 'AppSetting',
	requires:['Ext.Ajax'],
	config: {
		/**
         * @cfg {String} locale App Localization string
         */
        appLocaleLang : 'en',        
	},
	
	/**
	 * Constructor Class
	 * @param {Object} config configuration properties
	 * @constructor
	 */
	constructor : function(config) {
        this.initConfig(config);
    }
});