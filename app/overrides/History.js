Ext.define('TheOpenDoor.overrides.History', {
    override: 'Ext.app.History',
 
    back: function() {
 
        var actions = this.getActions(),
            previousAction = actions[actions.length - 2];
 
        if (previousAction) {
             
            actions.pop(); // pop current view
 
            // Added by Steve Drucker
            // need to pop previous view, because it will get reinstantiated on next line
            actions.pop(); 
 
            previousAction.getController().getApplication().redirectTo(previousAction.getUrl());
        }
        else {
            actions[actions.length - 1].getController().getApplication().redirectTo('');
        }
    }
});