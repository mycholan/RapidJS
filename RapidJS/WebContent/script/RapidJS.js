/*Context Object which tells everything about currently active application*/
var RapidContext = null;
/*Holds all the actions mapped for the current application (meta object)*/
var RapidAction = null;
/*Holds the action handler object for the current application*/
var ActionHandler = null;

/*As you already aware, this is where everything begins*/
$(document).ready(function() {
	RequestObject = InitRequestObject();
	Communicator("RapidInit");
});

function RapidInit() {
	RapidContext = InitRapidContext();
	if(ResponseObject != null){
		var RapidObj = new RapidApp({
			AppName : ResponseObject.application.APP_NAME,
			AppID : ResponseObject.application.ID,
			AppType : ResponseObject.application.APP_TYPE,
			AppActive : ResponseObject.application.ACTIVE
		});
		
		RapidContext.Application = RapidObj;
		
		RapidObj.PrepareApplicationObject();
		RapidObj.SetWindowsObject(ResponseObject.window);
		RapidAction = ResponseObject.action;
		RapidObj.InitApp();
	}else {
		
	}	
}

