/*Global scopes factory object, which will be instantiated according to user selected factory category (CRUD, WF and CMS)*/
var FactoryObj = null;
/*Jquery UI Alert box object*/
var AlertObj = null;

var BaseTab = null;

var SubTab = null;

$(document).ready(function(){
	AlertObj = new RapidAlertBox();

	$("#CrudLink").click(function(){
		ResetView();
		FactoryObj = new RapidCrud();	
		FactoryObj.FetchMainTab();
	});

	$("#WorkflowLink").click(function(){
		ResetView();
		FactoryObj = new RapidWorkflow();
		InitFactoryTab();
	});

	$("#CmsLink").click(function(){
		ResetView();
		FactoryObj = new RapidCms();
		InitFactoryTab();
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

function FetchMainTabMeta() {
	
}

function FetchSubTabMeta() {
	
}

function _MainTabCallBack() {
	FactoryObj.DisplayMainTab();
}

function _SubTabCallBack() {
	FactoryObj.DisplaySubTab();
}

function _TabContentCallBack() {
	FactoryObj.DisplayTabChild();
}