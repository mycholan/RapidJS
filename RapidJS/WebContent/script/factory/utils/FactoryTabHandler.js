var FactoryTabHandler = function() {
	this.CurrentTab = null;
	
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
				$("#"+$(this).attr("metaname")).show();
				e.data.CurrentTab = $(this).attr("metaname");
				FactoryObj.MainTabItemClickHandler($(this));				
			});
			/*Context list container (app list, datasource list ..etc)*/
			TabDiv.append($('<div id="'+MainTabObj[i]+'-context-list-parent" class="rapidjs-factory-tabs-panel rapidjs-factory-widget-content"></div>'));
			/*Context sub tab container (element, data, action , css ..etc)*/
			TabDiv.append($('<div id="'+MainTabObj[i]+'-context-subtab-parent" class="rapidjs-factory-tabs-panel rapidjs-factory-widget-content"></div>'));
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
			liElem = $('<li metaname="'+FactoryObj.SubTab[i]+'" maintab="'+this.CurrentTab+'" class="rapidjs-factory-state-default"><a href="#'+FactoryObj.SubTab[i]+'">'+FactoryObj.SubTab[i]+'</a></li>');
			ulElem.append(liElem);
			liElem.click(function(){
				$(this).parent().children().each(function(){					
					$(this).attr('class', 'rapidjs-factory-state-default');
				});				
				$(this).removeClass().addClass("rapidjs-factory-state-active");
				AlertObj.AlertUser("Tab Selected", "Youe have selected tab : "+$(this).attr("maintab"));
				FactoryObj.GetTabChildMetaData($(this).attr("maintab"));
			});
			if(i == 0) {
				subTabDiv.append($('<div class="tabs-spacer"></div>'));
			}
			subTabDiv.append($('<div id="'+FactoryObj.SubTab[i]+'"></div>'));
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