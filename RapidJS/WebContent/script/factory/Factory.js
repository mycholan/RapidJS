/*Global scopes factory object, which will be instantiated according to 
* user selected factory category (CRUD, WF and CMS)*/
var FactoryObj = null;
/*Contains list all existing applications (previously created)*/
var RapidAppList = null;
/*Contains app contexts (datasources, windows, containers, toolbars, layouts, view and controls) 
* for currently selected application*/
var RapidAppObject = null;
/*Factory grid object, which is used for rendering multi row forms*/
var FactoryGridObj = null;
/*RapidUtils object, which contains commonly used helper routines*/
var RjUtils = null;
/*Jquery UI Alert box object*/
var AlertObj = null;
/*Meta object which holds main tab item, used by FactoryTabHandler*/
var BaseTab = null;
/*Meta object which holds main sub tab item, used by FactoryTabHandler*/
var SubTab = null;

$(document).ready(function(){
	AlertObj = new RapidAlertBox();
	FactoryGridObj = new FactoryGrid(null);
	RjUtils = new RapidUtils();
	
	$("#CrudLink").click(function(){
		ResetView();
		FactoryObj = new RapidCrud();	
		FactoryObj.FetchMainTab();
	});

	$("#WorkflowLink").click(function(){
		ResetView();
		FactoryObj = new RapidWorkflow();
		FactoryObj.FetchMainTab();
	});

	$("#CmsLink").click(function(){
		ResetView();
		FactoryObj = new RapidCms();
		FactoryObj.FetchMainTab();
	});
});

function ShowHideTopBar() {
	$('#TopControlDiv').slideToggle('slow', function() {
		$('#SlideToggle').toggleClass('ui-icon-triangle-1-s');
	});
}

function ResetView() {
	$("#WelcomeDiv").hide();
	$("#FactoryMainDiv").hide();	
}