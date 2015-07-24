Ext.define('TheOpenDoor.model.CreateUserModel',{
	extend: 'Ext.data.Model',
	config: {
		fields: [
			{name : 'email_id', type: 'string' },
		    {name : 'gender', type: 'string' },
		    {name : 'displayName', type: 'string'}
		]
	}
});
