/**
 * 
 * <div> //Context parent container (context could be "", "" or "")
 * 		<ul> //Main tab
 * 			<li>Main Tab Item 1</li>
 * 			<li>Main Tab Item 2</li>
 * 			--------
 * 			--------
 * 		</ul> 
 * 		
 * 		<div>
 * 			Toolbar container
 * 		</div>
 * 
 * 		<div> //Main Tab Item 1's content panel
 * 			<div> //Context list container
 * 
 * 			</div>
 * 
 * 			<div> //Sub tab container
 * 				<div> //Sub tab wrapper div
 * 
 * 					<div> //Sub Tab Item 1's content panel
 * 
 * 					</div>
 * 
 * 					<div> //Sub Tab Item 2's content panel
 * 
 * 					</div>
 * 
 * 					-------------
 * 					-------------
 * 
 * 					<ul> //Sub tab
 * 						<li>Sub Tab Item 1</li>
 * 						<li>Sub Tab Item 2</li>
 * 						---------
 * 						---------
 * 					</ul> 
 * 				</div>
 * 			</div>
 * 		</div>
 * 
 * 		<div> //Main Tab Item 2's content panel
 * 			---------
 * 			---------
 * 			---------
 * 		</div>
 * 
 * 		-------------
 * 		-------------
 * </div>
 * 
 */

var FactoryTabHandler = function() {
	this.CurrentMainTab = null;
	this.CurrentSubTab = null;
	
	this.InitMainTabBar = function(MainTabObj, TabDiv) {
		var ulElem = $("<ul class='rapidjs-factory-tabs-nav rapidjs-factory-reset rapidjs-factory-clearfix rapidjs-factory-widget rapidjs-factory-widget-header'></ul>");		
		var liElem = null;
		
		TabDiv.append(ulElem);
		TabDiv.append(this.GetTabToolBar());
		
		for(var i = 0; i < MainTabObj.length; i++) {
			liElem = $('<li metaname="'+MainTabObj[i]+'" class="rapidjs-factory-state-default"><a href="#'+MainTabObj[i]+'">'+MainTabObj[i].substring(3)+'</a></li>');			
			ulElem.append(liElem);
			liElem.click(this, function(e){	
				$(this).parent().children().each(function(){					
					$(this).attr('class', 'rapidjs-factory-state-default');
				});				
				$(this).removeClass().addClass("rapidjs-factory-state-active");
				
				$(this).parent().parent().children("div").each(function(){
					if(!$(this).hasClass('rapidjs-factory-toolbar')) {
						$(this).hide();
					}					
				});				
				$("#"+$(this).attr("metaname")+"-tab-panel-div").show();
				
				e.data.CurrentMainTab = $(this).attr("metaname");
				FactoryObj.MainTabItemClickHandler($(this));				
			});
			
			/*Main tab item's panel div*/
			TabDiv.append($('<div id="'+MainTabObj[i]+'-tab-panel-div" class="rapidjs-factory-tabs-panel rapidjs-factory-widget-content"></div>'));
		}	
	};
	
	this.InitSubTabBar = function(pDiv) {
		var subTabDiv = $('<div id="subTab" class="tabs-bottom"></div>');
		var ParentDiv = pDiv;
		var ulElem = $('<ul class="rapidjs-factory-tabs-bottom rapidjs-factory-reset rapidjs-factory-clearfix rapidjs-factory-widget-header"></ul>');		
		var liElem = null;
		
		ParentDiv.html("");		
		ParentDiv.append(subTabDiv);		
				
		for(var i = 0; i < FactoryObj.SubTab.length; i++) {			
			liElem = $('<li metaname="'+FactoryObj.SubTab[i]+'" maintab="'+this.CurrentMainTab+'" class="rapidjs-factory-state-default"><a href="#'+FactoryObj.SubTab[i]+'">'+FactoryObj.SubTab[i]+'</a></li>');
			ulElem.append(liElem);
			liElem.click(this, function(e){
				if(FactoryGridObj.SelectedRow != null) {
					/*Hide current context list container (here it will be like application list, datasource list ...)*/
					$("#"+e.data.CurrentMainTab+"-context-list-parent").hide();
					
					$(this).parent().children().each(function(){					
						$(this).attr('class', 'rapidjs-factory-state-default');
					});				
					$(this).removeClass().addClass("rapidjs-factory-state-active");
					e.data.CurrentSubTab = $(this).attr("metaname");
					
					FactoryObj.GetTabChildMetaData($(this).attr("maintab"));
				}else {
					AlertObj.AlertUser("Something missing ...", "Please select any '" + FactoryObj.TabHandler.CurrentMainTab.substring(3).toLowerCase() + "' to continue.!");
				}
			});
			if(i == 0) {
				//subTabDiv.append($('<div class="tabs-spacer"></div>'));
			}
			subTabDiv.append($('<div id="'+FactoryObj.SubTab[i]+'" class="rapidjs-factory-subtab-panel"></div>'));
		}
		
		ulElem.appendTo( ".tabs-bottom" );		
	};
	
	this.InitSubTabContent = function(ContentObj) {
		
	};
	
	this.GetTabToolBar = function(){
		var Toolbar = $('<div class="rapidjs-factory-toolbar rapidjs-factory-widget-header rapid-factory-clearfix"></div>');
		var Buttonset = $('<div class="rapidjs-factory-buttonset rapidjs-factory-clearfix"></div>');		
		
		Toolbar.append(Buttonset);
		Buttonset.append($('<a href="#" class="rapidjs-factory-button rapidjs-factory-state-default" title="Open"><span class="rapidjs-factory-icon-new"></span></a>'));
		Buttonset.append($('<a href="#" class="rapidjs-factory-button rapidjs-factory-state-default" title="Save"><span class="rapidjs-factory-icon-save"></span></a>'));
		Buttonset.append($('<a href="#" class="rapidjs-factory-button rapidjs-factory-state-default" title="Cancel"><span class="rapidjs-factory-icon-cancel"></span></a>'));
		Buttonset.append($('<a href="#" class="rapidjs-factory-button rapidjs-factory-state-default" title="Delete"><span class="rapidjs-factory-icon-delete"></span></a>'));
		Buttonset.append($('<a href="#" class="rapidjs-factory-button rapidjs-factory-state-default" title="Reload"><span class="rapidjs-factory-icon-reload"></span></a>'));
		Buttonset.append($('<a href="#" class="rapidjs-factory-button rapidjs-factory-state-default" title="Export"><span class="rapidjs-factory-icon-export"></span></a>'));
		Buttonset.append($('<a href="#" class="rapidjs-factory-button rapidjs-factory-state-default" title="Print"><span class="rapidjs-factory-icon-print"></span></a>'));
		Buttonset.append($('<a href="#" class="rapidjs-factory-button rapidjs-factory-state-default" title="Toggle"><span class="rapidjs-factory-icon-toggle"></span></a>'));
		
		return Toolbar;
	};
};