/**
 * This class will allows to define properties specific to English locale
 */
Ext.define('TheOpenDoor.localization.LocaleEnglish', {
	extend: 'TheOpenDoor.localization.LocaleAbstract',
	
	appName: 'TheOpenDoor',
	loading : 'Loading',
	appExitErrorMessage : 'Do you really want to exit the <br> application?',
	norecordsfound: 'No Records found',
	order_success: 'Order Placed Successfully',
	connectionerrormessage : "Connection Error",
	tryagainmessage : "Try Again",
	retry_generic : "Retry",
	errorInGettingResponse : 'Due to some technical error, we are unable to fetch the response. Please try again later.',
	noInternetConnection  : 'No Internet. Please connect to a network and try again',
	error_generic_title : "Error",
	error_status_title : "Status title",
	error_generic_warning : "Warning",
	error_generic_success : "Success",
	error_generic_failure : "Failure",
	error_generic_delete : "Delete",
	error_generic_retry : "Retry",
	connectWith: "Connect with",

	//web services success strings
	profileSaveSuccess: "Profile Updated",
	profileDetails: "Profile Details",
});
