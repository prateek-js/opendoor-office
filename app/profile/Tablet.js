/*
	* Here we will define the views required for tablet profile
	* and on detecting tablet OS we are acknowledging flag as true
*/
Ext.define('TheOpenDoor.profile.Tablet', {
	extend: 'Ext.app.Profile',
	config: {
		name: 'Tablet',
		views: [
			'Main'
		]		        
	},
	//on active acknowledge as true
	isActive: function() {
		//console.log('Tablet: '+ Ext.os.is.Tablet);
		if(Ext.os.is.Desktop) {
			//console.log('Desktop: '+ Ext.os.is.Desktop);
			return false;
		}
		//console.log('Tablet return : '+ Ext.os.is.Tablet);
		return false;
	},
	//load the xtypes on launch of tablet profile
	launch: function() {
		Ext.Viewport.add(Ext.create('TheOpenDoor.view.tablet.Main'));
		TheOpenDoor.view.phone.Main.addXtype('Main');
    }    
});