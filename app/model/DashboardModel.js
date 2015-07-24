/* 
 * File Name:       DashboardModel.js
 * Description:     Model which hold data related to 
 *      
 */
Ext.define('TheOpenDoor.model.DashboardModel', {
	extend : 'Ext.data.Model',
	config : {
		fields : [
      {name: 'email_id', type: 'string'},
      {name: 'name', type: 'string'},
      {name: 'phone_number', type: 'string'},
      {name: 'user_id', type: 'string'}
	  ]
  }
});

