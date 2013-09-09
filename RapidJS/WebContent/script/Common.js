var RequestObject = null;
var ResponseObject = null;

var MainMenuJson_User = '[{"DisplayName" : "Home", "MenuID" : "home", "ToolTip" : "", "Handler" : "RapidInitHome"},'+
	'{"DisplayName" : "Applications", "MenuID" : "applications", "Handler" : "RapidInitApplicationList"},'+
	'{"DisplayName" : "Windows", "MenuID" : "windows", "Handler" : "RapidInitWindowsList"},'+
	'{"DisplayName" : "Logout", "MenuID" : "logout", "Handler" : "RapidClearSession"}]';

var MainMenuJson_Admin = '[{"DisplayName" : "Home", "MenuID" : "home", "Handler" : "RapidInitHome"},'+
	'{"DisplayName" : "Application Management", "MenuID" : "application_management", "Handler" : "RapidInitApplicationManagement"},'+
	'{"DisplayName" : "Window Management", "MenuID" : "windows", "Handler" : "RapidInitWindowManagement"},'+
	'{"DisplayName" : "User Management", "MenuID" : "windows", "Handler" : "RapidInitUserManagement"},'+
	'{"DisplayName" : "Access Management", "MenuID" : "windows", "Handler" : "RapidInitAccessManagement"},'+
	'{"DisplayName" : "Logout", "MenuID" : "logout", "Handler" : "RapidClearSession"}]';

var CrudMainTab = '[{"DisplayName" : "Application", "MenuID" : "application", "ToolTip" : "", "Handler" : "PrepareApplicationTab"},'+
	'{"DisplayName" : "Window", "MenuID" : "window", "ToolTip" : "", "Handler" : "PrepareWindowTab"},'+
	'{"DisplayName" : "Container", "MenuID" : "container", "ToolTip" : "", "Handler" : "PrepareContainerTab"},'+
	'{"DisplayName" : "Layout", "MenuID" : "layout", "ToolTip" : "", "Handler" : "PrepareLayoutTab"},'+
	'{"DisplayName" : "Toolbar", "MenuID" : "toolbar", "ToolTip" : "", "Handler" : "PrepareToolbarTab"},'+	
	'{"DisplayName" : "View", "MenuID" : "view", "ToolTip" : "", "Handler" : "PrepareViewTab"}]';

var WorkFlowTab = '[{}, {}, {}]';

var CmsTab = '[{}, {}, {}]';

var RapidMainOperationManager = function(){
	this.RapidInitHome = function() {
		
	};
	
	this.RapidInitApplicationList = function(){
		
	};
	
	this.RapidInitWindowsList = function(){
		
	};
	
	this.RapidInitApplicationManagement = function(){
		
	};
	
	this.RapidInitWindowManagement = function(){
		
	};
	
	this.RapidInitUserManagement = function(){
		
	};
	
	this.RapidInitAccessManagement = function(){
		
	};
	
	this.RapidClearSession = function(){
		
	};
};

function TooltipAttacher(elem) {
	elem.tooltip({ 
		delay : 2,
	    bodyHandler: function() { 
	        return $(this).attr("tooltip"); 
	    }, 
	    showURL: false 
	});
}

function Communicator(callback) {
	ResponseObject = null;
	
	$.getJSON("Rapid_Docker", {
		"DATA" : JSON.stringify(RequestObject)
	}, function(data) {		
		/*Reseting */
		RequestObject = null;		
		ResponseObject = data;	
		
		if(callback instanceof Function) {
			callback();
		}else if(callback instanceof String) {
			if(window[callback] != null && window[callback] != 'undefined') {
				window[callback]();
			}else {
				console.log('Handler not found.!');
			}	
		}	
	}).error(function() {
		RequestObject = null;
		ResponseObject = null;
		console.log("Error Occurred.!");
		/*Bring the common error page*/
	});
}

/*Used to create initial request object*/
function InitRequestObject() {
	return new CreateRequestObject("RJS", "INIT", "", "NO", 0, 0, "", "", [], [], [], []);
}

function CreateRequestObject(target, action, table, user, startindex, endindex, wherekey, wherevalue, dkey, dvalue, ukey, uvalue) {
	this.TARGET_TYPE = target;
	this.ACTION = action;	
	this.TABLE = table;
	this.USER = user;
	this.START_INDEX = startindex;
	this.END_INDEX = endindex;
	this.WHERE_KEY = wherekey;
	this.WHERE_VALUE = wherevalue;
	this.DOWNLOAD_KEY = dkey;
	this.DOWNLOAD_VALUE = dvalue;
	this.UPLOAD_KEY = ukey;
	this.UPLOAD_VALUE = uvalue;
}

function InitRapidContext() {
	return new CreateRapidContextObject("", "", "", new Array(), new Array(), new Array());
}

/*One of the main object used by RapidJS, this constructor function creates object 
 * which holds active application, active container, active layout and active view*/
function CreateRapidContextObject (user, app, window, container, layout, view) {
	this.User = user;
	this.Application = app;
	this.Window = window;
	this.Container = container;
	this.Layout = layout;
	this.View = view;
}