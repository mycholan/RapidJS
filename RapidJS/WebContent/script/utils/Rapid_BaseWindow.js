var RapidBaseWindow = function(){
	this.ApplicationListContainer = null;
	this.WindowListContainer = null;
	this.WindowContainer = null;
	this.RapidMenu = null;
	this.RapidBanner = null;
	
	this.Members = {
			
	};
	
	/*Getter method for primary containers and other elements*/
	this.GetApplicationListContainer = function() {
		return this.ApplicationListContainer;
	};
	
	this.GetWindowListConatiner = function(){
		return this.WindowListContainer;
	};
	
	this.GetWindowContainer = function(){
		return this.WindowContainer;
	};
	
	this.GetRapidMenu = function(){
		return this.RapidMenu;
	};
	
	this.GetRapidBanner = function(){
		return this.RapidBanner;
	};
	
	/*Show and  hide method for primary containers*/
	this.ShowAppListContainer = function(){
		this.ApplicationListContainer.show();
	};
	
	this.HideAppListContainer = function(){
		this.ApplicationListContainer.hide();
	};
	
	this.ShowWindowListContainer = function() {
		this.WindowListContainer.show();
	};
	
	this.HideWindowListContainer = function() {
		this.WindowListContainer.hide();
	};
	
	this.ShowWindowContainer = function(){
		this.WindowContainer.show();
	};
	
	this.HideWindowContainer = function(){
		this.WindowContainer.hide();
	};
	
	/*Initialisation function of base window*/
	this.InitBaseWindow = function(){
		var parentDiv = $("#MainContainer");
		var masterTable = $('<table id="MasterTable" class="RapidTable MasterTable"></table>');
		var masterTR = $('<tr></tr>');
		var masterTD = $('<td></td>');
		this.RapidBanner = $('<img src="Resource/images/rapid_banner.png" class="RapidBanner"></img>');
		masterTD.append(this.RapidBanner);
		masterTR.append(masterTD);
		masterTable.append(masterTR);
		parentDiv.append(masterTable);
		
		var mainMenu = new RapidList({
			ListName : "", 
			ListID : "MainMenuUL", 
			ListClass : "MainMenuUL", 
			ListItem : JSON.parse(MainMenuJson_User)
		});
		
		mainMenu.PrepareListObject();	
		this.RapidMenu = mainMenu.CreateList();
		
		masterTD = $('<td></td>');
		masterTD.css({"height":"50px"});
		masterTD.append(this.RapidMenu);
		masterTR.append(masterTD);
		
		this.ApplicationListContainer = $('<div id="AppListDiv" class="RapidContainer AppListContainer"></div>');
		this.WindowListContainer = $('<div id="WindowListDiv" class="RapidContainer WindowListContainer"></div>');
		this.WindowContainer = $('<div id="WindowDiv" class="RapidContainer WindowContainer"></div>');
		
		masterTR = $('<tr></tr>');
		masterTD = $('<td colspan="2" style="vertical-align:top; height:100%"></td>');
		masterTR.append(masterTD);
		masterTable.append(masterTR);
		
		masterTD.append(this.ApplicationListContainer);
		masterTD.append(this.WindowListContainer);
		masterTD.append(this.WindowContainer);
	};
};