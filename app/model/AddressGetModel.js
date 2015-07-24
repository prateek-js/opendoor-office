Ext.define('TheOpenDoor.model.AddressGetModel',{
	extend: 'Ext.data.Model',
	config: {
		fields: [
			{name: 'id', type: 'integer'},
			{name: 'line1', type: 'string'},
      		{name: 'line2', type: 'string'},
      		{name: 'landmark', type: 'string'},
      		{name: 'city', type: 'string'},
      		{name: 'state', type: 'string'},
	      	{name: 'country', type: 'string'},
	      	{name: 'pincode', type: 'integer'},
	      	{name: 'name', type: 'string'},
	      	{name: 'phone_number', type: 'integer'},
	      	{
	      		name: 'address_line', 
	      		type: 'string',
	      		convert: function(value, record) {
            	  	val = record.get('line1')+' '+record.get('line2')+' '+record.get('landmark');
      				return val;
      			}
      		},
      		{
      			name: 'address_cps', 
	      		type: 'string',
	      		convert: function(value, record) {
            	  	val = record.get('city')+' '+record.get('pincode')+' '+record.get('state');
      				return val;
      			}
      		}
		]
	}
});
