/**
 * PLUGIN : FactoryGrid
 * AUTHOR : SARAVANA KUMAR K
 * USE    : To render grid view
 * FEATURE: pagination, number of entries, variable column width and search.
 * INPUT  : { 
 * "column":["current number", "csr number", "petitioner name", "petitioner phone", "counter petitioner name"],
 * "data":[["123", "321", "abcd", "1234567890", "asdaddqwqewe"], ["234", "1121", "gffdgfdg", "0987654321", "dsadasdasdadaasda"],
 *  }
 */

var FactoryGrid = function(){
	/*Holds input object*/
	this.MetaData = null;
	/*Holds filtered rows*/
	this.Rows = null;
	/*Used for rapidjs */
	this.PrimaryIDs = null;
	/*Holds current data source's keys*/
	this.Columns = null;
	/*pagination starting index*/
	this.StartIndex = 1;
	/*pagination ending index*/
	this.EndIndex = 1;
	/*pagination current active page number*/
	this.CurrentPage = 1;
	/*pagination number entries per page*/
	this.NumberOfEntries = 10;
	/*number of columns should be shown*/
	this.NumberOfColumn = 0;
	/*if any password field*/
	this.PasswordIndex = -1;
	
	this.ParentContainer = null;
	this.ParentTable = null;
	this.SelectedRow = null;
	
	this.SetDataSource = function(mData) {
		this.MetaData = mData;		
		this.Rows = mData;
	};	
	
	/**
	 * Constructor for FactoryGrid (this is where everything start)
	 */
	this.InitGrid = function(pcontainer) {
		this.ParentContainer = pcontainer;
		this.PasswordIndex = -1;
		
		$("#rapidjs-factory-grid-search").keydown(this, function(e){
			e.data.DoSearch($(this).val());
		});

		$("#rapidjs-factory-grid-num-rows-select").change(this, function(e){
			e.data.SetPagination();
		});
		
		this.ParentContainer.html("");
		this.RenderSkeletton();
		this.SelectedRow = null;
		this.SetPagination();
	};
	
	/**
	 * Used set grid title
	 */
	this.SetTitle = function(){
		
	};

	/**
	 * Called by keypress event handler of Search Text Box
	 */
	this.DoSearch =function(sText) {
		var searchText = sText.toUpperCase();	
		var flaQ = false;
		
		if(sText == "" || sText == " " || sText == null) {
			this.Rows = this.MetaData;
		}else {
			this.Rows = new Array();
			for(var i = 0; i < this.MetaData.length; i++) {
				flaQ = false;
				for(var j = 0; j < this.NumberOfColumn; j++) {
					if(this.MetaData[i][j].toUpperCase().indexOf(searchText) !== -1) {	
						flaQ = true;								
					}
				}
				if(flaQ) {
					this.Rows.push(this.MetaData[i]);	
				}
			}						
		}		
		this.SetPagination();
 	};
	
	/**
	 * Display pagination info at grid footer 
	 */
	this.SetFooterInfo = function(){	
		$("#rapidjs-factory-grid-row-index-start").html(this.StartIndex);
		$("#rapidjs-factory-grid-row-index-end").html(this.EndIndex);
		$("#rapidjs-factory-grid-row-total-count").html(this.Rows.length);	
	};
		
	/**
	 * Initiate Pagination
	 */
	this.SetPagination = function(){
		var paginationConatier = $("#rapidjs-factory-grid-pagination-div");
		paginationConatier.html("");		
		
		this.NumberOfEntries = parseInt($("#rapidjs-factory-grid-num-rows-select").val());
				
		var firstBtn = $('<a class="rapidjs-factory-grid-pagination-btn ui-state-disabled" id="rapidjs-factory-grid-pagination-first-btn">First</a>');		
		var lastBtn = $('<a class="rapidjs-factory-grid-pagination-btn" id="rapidjs-factory-grid-pagination-last-btn">Last</a>');
				
		var btnContainerSpan = $('<span id="rapidjs-factory-grid-page-btn-container-span"></span>');
		
		paginationConatier.append(firstBtn);		
		paginationConatier.append(btnContainerSpan);
		paginationConatier.append(lastBtn);
		
		if(this.Rows.length <= this.NumberOfEntries) {
			firstBtn.removeClass().addClass("rapidjs-factory-grid-pagination-btn ui-state-disabled");			
			lastBtn.removeClass().addClass("rapidjs-factory-grid-pagination-btn ui-state-disabled");
			
			this.StartIndex = 1;
			this.EndIndex = this.Rows.length;			
		}else {
			var numPage = this.Rows.length / this.NumberOfEntries;					
			for(var i = 0; i <= parseInt(numPage); i++) {
				var $pgBtn = null;
				if(i == 0) {
					$pgBtn = $('<a class="rapidjs-factory-grid-pagination-btn-active" data="'+parseInt(i+1)+'">'+parseInt(i+1)+'</a>');
				}else {
					$pgBtn = $('<a class="rapidjs-factory-grid-pagination-btn" data="'+parseInt(i+1)+'">'+parseInt(i+1)+'</a>');
				}
				
				$pgBtn.click(this, function(e){
					$("#rapidjs-factory-grid-page-btn-container-span a").each(function(){
						$(this).removeClass().addClass("rapidjs-factory-grid-pagination-btn");
					});
					$(this).removeClass().addClass("rapidjs-factory-grid-pagination-btn-active");
					e.data.CurrentPage = $(this).attr("data"); 
					e.data.Paginate();
				});
				
				btnContainerSpan.append($pgBtn);				
			}	
			
			lastBtn.removeClass().addClass("rapidjs-factory-grid-pagination-btn");
		
			this.StartIndex = 1;
			this.EndIndex = this.NumberOfEntries;			
		}

		firstBtn.click(this, function(e){
			if($(this).hasClass("ui-state-disabled")) {
				return;
			}else {
				e.data.CurrentPage = 1;
				e.data.StartIndex = 1;

				if(e.data.Rows.length <= e.data.NumberOfEntries ) {
					e.data.EndIndex = e.data.Rows.length; 
					$("#rapidjs-factory-grid-pagination-last-btn").removeClass().addClass("rapidjs-factory-grid-pagination-btn ui-state-disabled");	
				}else {
					e.data.EndIndex = e.data.NumberOfEntries;
					$("#rapidjs-factory-grid-pagination-last-btn").removeClass().addClass("rapidjs-factory-grid-pagination-btn");
				}
				
				$(this).removeClass().addClass("rapidjs-factory-grid-pagination-btn ui-state-disabled");

				e.data.SetFooterInfo();
				e.data.SetContent();
			}
		});
				
		lastBtn.click(this, function(e){
			if($(this).hasClass("ui-state-disabled")) {
				return;
			}else {
				var numPage = e.data.Rows.length / e.data.NumberOfEntries;	
				e.data.CurrentPage = parseInt(numPage)+1;
				e.data.StartIndex = (parseInt(e.data.NumberOfEntries) * parseInt(numPage));
				e.data.EndIndex = e.data.Rows.length;

				$("#rapidjs-factory-grid-pagination-first-btn").removeClass().addClass("rapidjs-factory-grid-pagination-btn");				
				$(this).removeClass().addClass("rapidjs-factory-grid-pagination-btn ui-state-disabled");

				e.data.SetFooterInfo();
				e.data.SetContent();
			}
		});
		
		this.SetFooterInfo();
		this.SetContent();
	};
	
	/**
	 * Action handler for pagination button click
	 */
	this.Paginate = function(pgnum) {
		if(this.CurrentPage == 1) {
			this.StartIndex = 1;
			$("#rapidjs-factory-grid-pagination-first-btn").removeClass().addClass("rapidjs-factory-grid-pagination-btn ui-state-disabled");
			if(this.Rows.length <= this.NumberOfEntries ) {
				this.EndIndex = this.Rows.length; 
				$("#rapidjs-factory-grid-pagination-last-btn").removeClass().addClass("rapidjs-factory-grid-pagination-btn ui-state-disabled");
			}else {
				this.EndIndex = this.NumberOfEntries;
				$("#rapidjs-factory-grid-pagination-last-btn").removeClass().addClass("rapidjs-factory-grid-pagination-btn");
			}
		}else {
			if(this.Rows.length <= (parseInt(this.NumberOfEntries) * parseInt(this.CurrentPage))) {
				this.StartIndex = (parseInt(this.NumberOfEntries) * (parseInt(this.CurrentPage)-1)+1);
				this.EndIndex = this.Rows.length;
				$("#rapidjs-factory-grid-pagination-first-btn").removeClass().addClass("rapidjs-factory-grid-pagination-btn");
				$("#rapidjs-factory-grid-pagination-last-btn").removeClass().addClass("rapidjs-factory-grid-pagination-btn ui-state-disabled");
			}else {
				this.StartIndex = (parseInt(this.NumberOfEntries) * (parseInt(this.CurrentPage)-1)+1);
				this.EndIndex = (parseInt(this.NumberOfEntries) * parseInt(this.CurrentPage));
				$("#rapidjs-factory-grid-pagination-first-btn").removeClass().addClass("rapidjs-factory-grid-pagination-btn");
				$("#rapidjs-factory-grid-pagination-last-btn").removeClass().addClass("rapidjs-factory-grid-pagination-btn");
			}
		}		
		
		this.SetContent();
		this.SetFooterInfo();
	};	
	
	/**
	 * Procedure to form the basic skeleton of grid view
	 */
	this.RenderSkeletton = function() {
		var skeleton = $('<div id="rapidjs-activity-factory-container" class="rapidjs-activity-factory-container" style="padding: 20px 30px; background:#fff;"></div>');
		var toolbar = $('<div class="rapidjs-factory-grid-toolbar-div"></div>');
		
		var rowCountDiv = $('<div id="rapidjs-factory-grid-row-count" class="rapidjs-factory-grid-row-count"></div>');								
		var entryLabelFirst = $('<label>Show</label>');
		var entryLabelLast = $('<label>entries</label>');
		
		var entryCountSelect = $('<select id="rapidjs-factory-grid-num-rows-select" style="margin:0px 5px; width:auto;padding:0px;"></select>');
		entryCountSelect.append($('<option value="10" selected="selected">10</option>'));
		entryCountSelect.append($('<option value="25">25</option>'));
		entryCountSelect.append($('<option value="50">50</option>'));
		entryCountSelect.append($('<option value="100">100</option>'));
			
		rowCountDiv.append(entryLabelFirst);
		rowCountDiv.append(entryCountSelect);
		rowCountDiv.append(entryLabelLast);
		toolbar.append(rowCountDiv);
		
		var searchBarDiv = $('<div class="rapidjs-factory-grid-search-bar-div" id="rapidjs-factory-grid-search-bar-div"></div>');
		var searchLabel = $('<label>Search: </label>');
		var searchText = $('<input type="text" id="rapidjs-factory-grid-search"></input>');
		searchBarDiv.append(searchLabel);
		searchBarDiv.append(searchText);
		toolbar.append(searchBarDiv);
		
		var contentDiv = $('<div class="rapidjs-factory-grid-content-div"></div>');
		var contentTable = $('<table class="rapidjs-factory-grid-content-table" id="rapidjs-factory-grid-content-table"></div>');
		contentDiv.append(contentTable);
		
		var footerContainer = $('<div class="rapidjs-factory-grid-footer-div"></div>');
		var footerInfoDiv = $('<div class="rapidjs-factory-grid-footer-info" id="rapidjs-factory-grid-footer-info"></div>');
		footerInfoDiv.append($('<span style="font-weight:normal;">Showing </span>'));
		var indexStart = $('<span id="rapidjs-factory-grid-row-index-start"></span>');
		var indexEnd = $('<span id="rapidjs-factory-grid-row-index-end"></span>');
		var totalRows = $('<span id="rapidjs-factory-grid-row-total-count"></span>');
		footerInfoDiv.append(indexStart);
		footerInfoDiv.append($('<span style="font-weight:normal;"> to </span>'));
		footerInfoDiv.append(indexEnd);
		footerInfoDiv.append($('<span style="font-weight:normal;"> of </span>'));
		footerInfoDiv.append(totalRows);
		footerInfoDiv.append($('<span style="font-weight:normal;"> entries</span>'));
		footerContainer.append(footerInfoDiv);
		
		var paginationDiv = $('<div class="rapidjs-factory-grid-pagination-div" id="rapidjs-factory-grid-pagination-div"></div>');	
		footerContainer.append(paginationDiv);	
				
		skeleton.append(toolbar);
		skeleton.append(contentDiv);
		skeleton.append(footerContainer);		
		
		this.ParentTable = contentTable;
		this.ParentContainer.append(skeleton);
	};
	
	/**
	 * Set table grid's Columns
	 */
	this.SetColumn = function() {
		this.Columns = []; 
		var firstRowObj = this.MetaData[0];		
		this.NumberOfColumn = RjUtils.GetKeyCount(firstRowObj);		
		
		for (var key in firstRowObj) {
			 if (firstRowObj.hasOwnProperty(key)) {
				 this.Columns.push(key);
			 }
		}		
		
		var $thead = $('<thead></thead>');
		var $tr = $('<tr style="background:#fff;"></tr>');		
		
		for(var i = 0; i < this.Columns.length; i++) {
			if(this.Columns[i].toUpperCase() != "ID") {
				/*Check any password field there.*/
				if(this.Columns[i].toLowerCase().indexOf("password") != -1) {
					this.PasswordIndex = i;
				}			
				$tr.append($('<th><div class="rapidjs-factory-grid-column-div"><span class="rapidjs-factory-grid-column-header-span">'+this.Columns[i].replace(/_/g, " ").replace(/-/g, " ")+'</span></div></th>'));
			}
		}
		
		$thead.append($tr);
		this.ParentTable.append($thead);		
	};
	
	/**
	 * Render child records (like counter petitioners rows of XXXX-PETITION)
	 */
	this.SetChildContent = function(ChildRows, childTitle) {		
		if($("#rapidjs-grid-view-child-records") != null || $("#rapidjs-grid-view-child-records") != undefined) {
			$("#rapidjs-grid-view-child-records").remove();
		}
		
		var row = null;
		var childRecordsParent = $("<div id='rapidjs-grid-view-child-records'></div>");
		childRecordsParent.insertAfter($("#rapidjs-activity-factory-container"));
		
		childRecordsParent.append($("<span class='rapidjs-factory-grid-column-div' style='padding: 10px 15px;display: block;font-weight: bold;text-transform: capitalize;'>" + childTitle.replace(/_/g, " ").replace(/-/g, " ") + "</span>"));
		var contentTable = $('<table class="rapidjs-factory-grid-content-table" id="rapidjs-factory-grid-child-content-table">');
		
		var $thead = $('<thead></thead>');
		var $tr = $('<tr style="background:#fff;"></tr>');		
		
		if(ChildRows.length > 0) {
			row = ChildRows[0];			
			for (var kkey in row) {
				if(kkey.indexOf("id") == -1) {
					$tr.append($('<th><div class="rapidjs-factory-grid-column-div" style="font-size: 13px;">' + kkey.replace(/_/g, " ").replace(/-/g, " ") + '</div></th>'));
				}
			}
		}else {
			return;
		}
		
		$thead.append($tr);
		contentTable.append($thead);		
		
		for(var i = 0; i < ChildRows.length; i++) {
			row = ChildRows[i];	
			$tr = $('<tr></tr>');					
			for (var kkey in row) {
				if(kkey.indexOf("id") == -1) {
					$tr.append('<td><div class="rapidjs-factory-grid-cell-div">' + row[kkey] + '</div></td>');
				}
			}
			contentTable.append($tr);	
		}
		
		childRecordsParent.append(contentTable);
	};
	
	/**
	 * Render table grid's data rows
	 */
	this.SetContent = function() {
		this.ParentTable.html("");
		this.SetColumn();		
		
		var $tbody = $('<tbody></tbody>');
		var $tr = null; 
		var row = null; 
		
		for(var i = this.StartIndex; i <= this.EndIndex; i++) {
			//$tr = $('<tr data="'+this.PrimaryIDs[i-1]+'"></tr>');
			$tr = $('<tr data="'+this.Rows[i-1]["ID"]+'"></tr>');
			
			$tr.click(this, function(e){
				e.data.SelectedRow = $(this).attr('data');				
				var tid = $(this).parent().parent().attr('id');
				
				$("#"+tid+" tr").each(function() {
					$(this).children().each(function(){
						$(this).removeClass();
					});
				});
				
				$(this).children().each(function(){
					$(this).addClass("rapidjs-factory-grid-content-table-tr-active");
				});						
			});		
				
			row = this.Rows[i-1];			
			for(var j = 0; j < this.Columns.length; j++) {
				if(this.Columns[j].toUpperCase() != "ID") {
					if(this.PasswordIndex != -1 && this.PasswordIndex == j){
						$tr.append('<td><div class="rapidjs-factory-grid-cell-div">##############</div></td>');
					} else {
						$tr.append('<td><div class="rapidjs-factory-grid-cell-div">' + row[this.Columns[j]] + '</div></td>');
					}
				}
			}			
			
			$tbody.append($tr);			
		}	
		this.ParentTable.append($tbody);		
	};
};

