var RapidWindows = function(param) {
		/*Parent of window*/
		this.WindowsParentContainer = null;
		this.Param = param;
		this.Window = null;
		/*Parent container for Containers*/
		this.ContainerContainer = null;
		/*Table object that contains Containers*/
		this.ContainerTable = null;
		/*Rapid Container Object*/		
		this.RapidContainerObj = null;
		
		this.Members  = {
				WindowName : "",
				WindowTitle : "",
				WindowID : "",
				WindowType : "",
				WindowWidth : "",
				WindowHeight : "",				
				WindowPosX : "",
				WindowPosY : "",
				WindowIsCenterAlign : "",
				WindowIsTitleVisible : "",
				WindowIsResizable : "",				
				ContainerList : null
		};
		
		this.TypeW = {
				WINDOW :  1,
				DIALOG	: 2,
				CONFIRM : 3,
				ALERT : 4
		};
		
		this.BaseContainerMembers = {
				ContainerType : "",
				ContainerCount : "",			
				Containers : null
		};
		
		this.TypeC = {
				SINGLE : 1,
				HORIZONTAL : 2,
				VERTICAL : 3			
		};
		
		this.SetWindowObject = function(){
			for(var x in this.Param) {
				this.Members[x] = this.Param[x];
			}
		};
		
		this.SetBaseWindowContainer = function (pContainer){
			this.WindowsParentContainer = pContainer;
		};
		
		this.InitWindow = function(){
			if(this.Members.WindowType == this.TypeW.WINDOW){
				this.CreateWindow_Window();
			}else if(this.Members.WindowType == this.TypeW.DIALOG) {
				this.CreateWIndow_Dialog();
			}else if(this.Members.WindowType == this.TypeW.CONFIRM) {
				this.CreateWIndow_Confirm();
			}else if(this.Members.WindowType == this.TypeW.ALERT) {
				this.CreateWindow_Alert();
			}
		};
		
		this.CreateWindow_Window = function() {
			this.Window = $('<div id="window_'+this.Members.WindowID+'" class="RapidContainer RapidWindow '+this.Members.WindowClass+'"></div>');
			
			var $titlebar = $('<div class="RapidWindowTitleBar"></div>');			
			var $titletext = $("<span></span>");			
			var $appicon = $("<img></img>");			

			this.Window.css({
				"height" : this.Members.WindowHeight,
				"width" : this.Members.WindowWidth			
			});		

			$titlebar.addClass("titleBar");

			$appicon.attr("src", "Resource/images/icon1/png/16x16/app.png");
			$titlebar.append($appicon);		

			$titletext.html(this.Members.WindowTitle);
			$titlebar.append($titletext);		

			this.Window.append($titlebar);			
			this.ContainerContainer = $('<div class="RapidContainer RapidContainerParent"></div>');
			this.Window.append(this.ContainerContainer);
			this.InitContainer();				
			
			this.ShowWindow();
			this.WindowsParentContainer.append(this.Window);			
		};
		
		this.CreateWIndow_Dialog = function(){
			
		};
		
		this.CreateWIndow_Confirm = function(){
			
		};
		
		this.CreateWindow_Alert = function(){
			
		};
		
		this.InitContainer = function(){
			var tableTR = $('<tr></tr>');
			var tableTD = $('<td></td>'); 
			
			this.BaseContainerMembers.ContainerType =  this.Members.ContainerList.TYPE;
			this.BaseContainerMembers.ContainerCount = this.Members.ContainerList.COUNT;
			this.BaseContainerMembers.Containers = this.Members.ContainerList.CONTAINERS;			
			
			this.ContainerTable = $('<table class="RapidTable RapidContainerTable"></table>');
			this.ContainerContainer.append(this.ContainerTable);
			
			if(this.BaseContainerMembers.ContainerType == this.TypeC.SINGLE) {
				this.ContainerTable.append(tableTR);
				tableTR.append(tableTD);				
				
				this.RapidContainerObj = new RapidContainer({
					ID : this.Members.ContainerList.CONTAINERS[0].ID,
			        CONTAINER_TITLE : this.Members.ContainerList.CONTAINERS[0].CONTAINER_TITLE,
			        DISPLAY : this.Members.ContainerList.CONTAINERS[0].DISPLAY,
			        ACTIVE : this.Members.ContainerList.CONTAINERS[0].ACTIVE,
			        LAYOUT : this.Members.ContainerList.CONTAINERS[0].layout
				});
				
				this.RapidContainerObj.SetContainerObject();
				this.RapidContainerObj.SetContainerParent(tableTD);
				this.RapidContainerObj.ConstructContainer();
				
				RapidContext.Container.push(this.RapidContainerObj);
			}else if(this.BaseContainerMembers.ContainerType == this.TypeC.HORIZONTAL) {
				this.ContainerTable.append(tableTR);
				for(var i = 0; i < this.BaseContainerMembers.ContainerCount; i++) {
					tableTD = $('<td></td>'); 			
					tableTR.append(tableTD);	
					
					this.RapidContainerObj = new RapidContainer({
						ID : this.BaseContainerMembers.Containers[i].ID,
				        CONTAINER_TITLE : this.BaseContainerMembers.Containers[i].CONTAINER_TITLE,
				        DISPLAY : this.BaseContainerMembers.Containers[i].DISPLAY,
				        ACTIVE : this.BaseContainerMembers.Containers[i].ACTIVE,
				        LAYOUT : this.Members.ContainerList.CONTAINERS[0].layout
					});
					
					this.RapidContainerObj.SetContainerObject();
					this.RapidContainerObj.SetContainerParent(tableTD);
					this.RapidContainerObj.ConstructContainer();				
					
					RapidContext.Container.push(this.RapidContainerObj);
				}		
			}else if(this.BaseContainerMembers.ContainerType == this.TypeC.VERTICAL) {
				for(var i = 0; i < this.BaseContainerMembers.ContainerCount; i++) {
					tableTR = $('<tr></tr>');
					tableTD = $('<td></td>'); 
					
					this.ContainerTable.append(tableTR);
					tableTR.append(tableTD);		
	
					this.RapidContainerObj = new RapidContainer({
						ID : this.BaseContainerMembers.Containers[i].ID,
				        CONTAINER_TITLE : this.BaseContainerMembers.Containers[i].CONTAINER_TITLE,
				        DISPLAY : this.BaseContainerMembers.Containers[i].DISPLAY,
				        ACTIVE : this.BaseContainerMembers.Containers[i].ACTIVE,
				        LAYOUT : this.Members.ContainerList.CONTAINERS[0].layout
					});
					
					this.RapidContainerObj.SetContainerObject();
					this.RapidContainerObj.SetContainerParent(tableTD);
					this.RapidContainerObj.ConstructContainer();
					
					RapidContext.Container.push(this.RapidContainerObj);
				}
			}			
		};
		
		this.ShowWindow = function(){
			this.Window.show();
		};
		
		this.HideWindow = function(){
			this.Window.hide();
		};
		
		this.ExitWindow = function(){
			this.Window.remove();
		};
		
		this.ReloadWindow = function(){
			
		};
};