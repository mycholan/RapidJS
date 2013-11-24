var RapidCrud = function(){
	this.TabHandler = null;
	this.BaseTab = null;
	this.SubTab = null;
	this.ElementMeta = null;
	this.ActionMeta = null;
	this.StyleMeta = null;
	this.DataMeta = null;
	this.DiviceMeta = null;
	
	this.FetchMainTab = function() {
		RequestObject = new CreateRequestObject("META", "GET", "BASE", "NO", 0, 0, [], [], [], []);
		Communicator(function(){
			FactoryObj.BaseTab = ResponseObject;
			FactoryObj.FetchSubTab();
		});
	};
	
	this.FetchSubTab = function() {
		RequestObject = new CreateRequestObject("META", "GET", "SUBTAB", "NO", 0, 0, [], [], [], []);
		Communicator(function(){
			FactoryObj.SubTab = ResponseObject;
			FactoryObj.FetchElementMeta();
		});
	};
	
	this.FetchElementMeta = function() {
		RequestObject = new CreateRequestObject("META", "GET", "ELEMENT", "NO", 0, 0, [], [], [], []);
		Communicator(function(){
			FactoryObj.ElementMeta = ResponseObject;
			FactoryObj.FetchActionMeta();
		});
	};
	
	this.FetchActionMeta = function() {
		RequestObject = new CreateRequestObject("META", "GET", "ACTION", "NO", 0, 0, [], [], [], []);
		Communicator(function(){
			FactoryObj.ActionMeta = ResponseObject;
			FactoryObj.FetchStyleMeta();
		});
	};
	
	this.FetchStyleMeta = function() {
		RequestObject = new CreateRequestObject("META", "GET", "STYLE", "NO", 0, 0, [], [], [], []);
		Communicator(function(){
			FactoryObj.StyleMeta = ResponseObject;
			FactoryObj.FetchDataMeta();
		});
	};
	
	this.FetchDataMeta = function() {
		RequestObject = new CreateRequestObject("META", "GET", "DATA", "NO", 0, 0, [], [], [], []);
		Communicator(function(){
			FactoryObj.DataMeta = ResponseObject;
			FactoryObj.FetchDeviceMeta();
		});
	};
	
	this.FetchDeviceMeta = function() {
		RequestObject = new CreateRequestObject("META", "GET", "DEVICE", "NO", 0, 0, [], [], [], []);
		Communicator(function(){
			FactoryObj.DiviceMeta = ResponseObject;
			FactoryObj.DisplayMainTab();
		});
	};
	
	this.GetApplicationObj = function(id, appname, apptype, active){
		return {
			id : id,
	        appName : appname,
	        appType : apptype,
	        active : active
		};
	};	
	
	this.DisplayMainTab = function() {
		if(ResponseObject == null){	
			AlertObj.AlertUser("Factory Tab Meta Data", "something went wrong.!");
			return;
		}
		
		ResetView();
		var factoryMainDiv = $("#FactoryMainDiv");
		factoryMainDiv.html("");
		factoryMainDiv.show();
		factoryMainDiv.append($('<div id="CrudAreaDiv" class="rapidjs-factory-tabs CrudAreaDiv"></div>'));
		this.TabHandler = new FactoryTabHandler();		
		this.TabHandler.InitMainTabBar(this.BaseTab, $("#CrudAreaDiv"));
	};
	
	this.MainTabItemClickHandler = function(liElm) {	
		if(liElm.index() == 0) {
			RequestObject = new CreateRequestObject("FACTORY", "GET", "APP_LIST", "NO", 0, 0, [], [], [], []);
			Communicator(function(){
				FactoryGridObj.SetDataSource(ResponseObject);
				FactoryGridObj.InitGrid($("#"+liElm.attr("metaname")+"-context-list-parent"));
				$("#"+liElm.attr("metaname")+"-context-list-parent").show();
				
				FactoryObj.TabHandler.InitSubTabBar($("#"+liElm.attr("metaname")+"-context-subtab-parent"));
			});
		}else {
			this.TabHandler.InitSubTabBar($("#"+liElm.attr("metaname")+"-context-subtab-parent"));
		}		
	};
	
	this.DisplaySubTab = function() {
		if(ResponseObject == null){	
			AlertObj.AlertUser("Factory Tab Meta Data", "something went wrong.!");
			return;
		}
		
		ResetView();
		$("#FactoryMainDiv").show();
		this.TabHandler.InitSubTabBar(ResponseObject);
	};
	
	this.SubTabItemClickHandler = function() {
		
	};
	
	this.GetTabChildMetaData = function(maintab) {
		RequestObject = new CreateRequestObject("META", "GET", maintab, "NO", 0, 0, [], [], [], []);
		Communicator("_TabContentCallBack");
	};
	
	this.DisplayTabChild = function() {
		if(ResponseObject == null){	
			AlertObj.AlertUser("Factory Tab Child Meta Data", "something went wrong.!");
			return;
		}
		
		//console.log(JSON.stringify(ResponseObject));
	};
	
	this.PrepareApplicationTab = function() {
		
	};
	
	this.PrepareWindowTab = function(){
		
	};
	
	this.PrepareContainerTab = function(){
		
	};
	
	this.PrepareLayoutTab = function(){
		
	};
	
	this.PrepareToolbarTab = function(){
		
	};
	
	this.PrepareViewTab = function(){
		
	};
};