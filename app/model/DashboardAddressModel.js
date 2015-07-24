Ext.define('TheOpenDoor.model.DashboardAddressModel',{
	extend: 'Ext.data.Model',
	config: {
		fields: [
			{name: 'line1', type: 'string'},
			{name: 'line2', type: 'string'},
			{name: 'landmark', type: 'string'},
			{name: 'city', type: 'string'},
			{name: 'state', type: 'string'},
			{name: 'country', type: 'string'},
			{name: 'pincode', type: 'integer'},
			{name: 'name', type: 'string'},
			{name: 'phone_number', type: 'integer'}
		]
		,
		belongsTo: [
			'TheOpenDoor.model.DashboardModel'
		]
	}
});
