/**
 * PLUGIN : Rapid_Grid
 * AUTHOR : SARAVANA KUMAR K
 * USE    : To render grid view
 * FEATURE: pagination, number of entries, variable column width and search.
 * INPUT  : { 
 * "column":["current number", "csr number", "petitioner name", "petitioner phone", "counter petitioner name"],
 * "data":[["123", "321", "abcd", "1234567890", "asdaddqwqewe"], ["234", "1121", "gffdgfdg", "0987654321", "dsadasdasdadaasda"],
 *  }
 */

var GridMeta= '{'+
	'"action":["acknowledge", "current update"],'+
	'"column":["current number", "csr number", "petitioner name", "petitioner phone", "counter petitioner name"],'+
	'"data":[["123", "321", "abcd", "1234567890", "asdaddqwqewe"], ["234", "1121", "gffdgfdg", "0987654321", "dsadasdasdadaasda"],'+
	'["654", "322", "sdfgfgs", "122322345", "dfdfsgssdfaeeqqw"], ["544", "1222", "gdhewe", "54445443", "dafsasffewe"]]'+
'}';

$(document).ready(function(){
	var grid = new RapidGrid(JSON.parse(GridMeta));
	grid.InitGrid($("#test-report-grid-container-div"));	
});


var RapidGrid = function(meta){
	/*Holds input object*/
	this.MetaData = meta;
	/*Holds filtered rows*/
	this.Rows = meta.data;		
	/*pagination starting index*/
	this.StartIndex = 1;
	/*pagination ending index*/
	this.EndIndex = meta.data.length;
	/*pagination current active page number*/
	this.CurrentPage = 1;
	/*pagination number entries per page*/
	this.NumberOfEntries = 10;
	/*number of columns should be shown*/
	this.NumberOfColumn = 0;
	
	this.ParentContainer = null;
	this.ParentTable = null;
	this.SelectedRow = null;
	
	/**
	 * Constructor for TABLE_GRID (this is where everything start)
	 */
	this.InitGrid = function(pcontainer) {
		this.ParentContainer = pcontainer;		
	    var self = this;
	    
		$(document).on('keydown', "#rapid-grid-search", function(e){
			self.DoSearch($(this).val());
		});

		$(document).on('change', "#rapid-grid-num-rows-select", function(e){
			self.SetPagination();
		});
		
		this.ParentContainer.html("");
		this.RenderSkeletton();
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
			this.Rows = this.MetaData.data;
		}else {
			this.Rows = new Array();
			for(var i = 0; i < this.MetaData.data.length; i++) {
				flaQ = false;
				for(var j = 0; j < this.NumberOfColumn; j++) {
					if(this.MetaData.data[i][j].toUpperCase().indexOf(searchText) !== -1) {	
						flaQ = true;								
					}
				}
				if(flaQ) {
					this.Rows.push(this.MetaData.data[i]);	
				}
			}						
		}		
		this.SetPagination();
 	};
	
	/**
	 * Display pagination info at grid footer 
	 */
	this.SetFooterInfo = function(){	
		$("#rapid-grid-row-index-start").html(this.StartIndex);
		$("#rapid-grid-row-index-end").html(this.EndIndex);
		$("#rapid-grid-row-total-count").html(this.Rows.length);	
	};
		
	/**
	 * Initiate Pagination
	 */
	this.SetPagination = function(){
		var paginationConatier = $("#rapid-grid-pagination-div");
		paginationConatier.html("");		
		
		this.NumberOfEntries = parseInt($("#rapid-grid-num-rows-select").val());
				
		var firstBtn = $('<a class="rapid-grid-pagination-btn ui-state-disabled" id="rapid-grid-pagination-first-btn">First</a>');		
		var lastBtn = $('<a class="rapid-grid-pagination-btn" id="rapid-grid-pagination-last-btn">Last</a>');
				
		var btnContainerSpan = $('<span id="rapid-grid-page-btn-container-span"></span>');
		
		paginationConatier.append(firstBtn);		
		paginationConatier.append(btnContainerSpan);
		paginationConatier.append(lastBtn);
		
		if(this.Rows.length <= this.NumberOfEntries) {
			firstBtn.removeClass().addClass("rapid-grid-pagination-btn ui-state-disabled");			
			lastBtn.removeClass().addClass("rapid-grid-pagination-btn ui-state-disabled");
			
			this.StartIndex = 1;
			this.EndIndex = this.Rows.length;			
		}else {
			var numPage = this.Rows.length / this.NumberOfEntries;					
			for(var i = 0; i <= parseInt(numPage); i++) {
				var $pgBtn = null;
				if(i == 0) {
					$pgBtn = $('<a class="rapid-grid-pagination-btn-active" data="'+parseInt(i+1)+'">'+parseInt(i+1)+'</a>');
				}else {
					$pgBtn = $('<a class="rapid-grid-pagination-btn" data="'+parseInt(i+1)+'">'+parseInt(i+1)+'</a>');
				}
				
				$pgBtn.click(this, function(e){
					$("#rapid-grid-page-btn-container-span a").each(function(){
						$(this).removeClass().addClass("rapid-grid-pagination-btn");
					});
					$(this).removeClass().addClass("rapid-grid-pagination-btn-active");
					e.data.CurrentPage = $(this).attr("data"); 
					e.data.Paginate();
				});
				
				btnContainerSpan.append($pgBtn);				
			}	
			
			lastBtn.removeClass().addClass("rapid-grid-pagination-btn");
		
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
					$("#rapid-grid-pagination-last-btn").removeClass().addClass("rapid-grid-pagination-btn ui-state-disabled");	
				}else {
					e.data.EndIndex = e.data.NumberOfEntries;
					$("#rapid-grid-pagination-last-btn").removeClass().addClass("rapid-grid-pagination-btn");
				}
				
				$(this).removeClass().addClass("rapid-grid-pagination-btn ui-state-disabled");

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

				$("#rapid-grid-pagination-first-btn").removeClass().addClass("rapid-grid-pagination-btn");				
				$(this).removeClass().addClass("rapid-grid-pagination-btn ui-state-disabled");

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
			$("#rapid-grid-pagination-first-btn").removeClass().addClass("rapid-grid-pagination-btn ui-state-disabled");
			if(this.Rows.length <= this.NumberOfEntries ) {
				this.EndIndex = this.Rows.length; 
				$("#rapid-grid-pagination-last-btn").removeClass().addClass("rapid-grid-pagination-btn ui-state-disabled");
			}else {
				this.EndIndex = this.NumberOfEntries;
				$("#rapid-grid-pagination-last-btn").removeClass().addClass("rapid-grid-pagination-btn");
			}
		}else {
			if(this.Rows.length <= (parseInt(this.NumberOfEntries) * parseInt(this.CurrentPage))) {
				this.StartIndex = (parseInt(this.NumberOfEntries) * (parseInt(this.CurrentPage)-1)+1);
				this.EndIndex = this.Rows.length;
				$("#rapid-grid-pagination-first-btn").removeClass().addClass("rapid-grid-pagination-btn");
				$("#rapid-grid-pagination-last-btn").removeClass().addClass("rapid-grid-pagination-btn ui-state-disabled");
			}else {
				this.StartIndex = (parseInt(this.NumberOfEntries) * (parseInt(this.CurrentPage)-1)+1);
				this.EndIndex = (parseInt(this.NumberOfEntries) * parseInt(this.CurrentPage));
				$("#rapid-grid-pagination-first-btn").removeClass().addClass("rapid-grid-pagination-btn");
				$("#rapid-grid-pagination-last-btn").removeClass().addClass("rapid-grid-pagination-btn");
			}
		}		
		
		this.SetContent();
		this.SetFooterInfo();
	};	
	
	this.RenderSkeletton = function() {
		var skeleton = $('<div id="rapid-grid-container" class="rapid-grid-container" style="padding: 20px 30px; background:#fff;"></div>');
		var toolbar = $('<div class="rapid-grid-toolbar-div"></div>');
		
		var rowCountDiv = $('<div id="rapid-grid-row-count" class="rapid-grid-row-count"></div>');								
		var entryLabelFirst = $('<label>Show</label>');
		var entryLabelLast = $('<label>entries</label>');
		
		var entryCountSelect = $('<select id="rapid-grid-num-rows-select"></select>');
		entryCountSelect.append($('<option value="10" selected="selected">10</option>'));
		entryCountSelect.append($('<option value="25">25</option>'));
		entryCountSelect.append($('<option value="50">50</option>'));
		entryCountSelect.append($('<option value="100">100</option>'));
			
		rowCountDiv.append(entryLabelFirst);
		rowCountDiv.append(entryCountSelect);
		rowCountDiv.append(entryLabelLast);
		toolbar.append(rowCountDiv);
		
		var searchBarDiv = $('<div class="rapid-grid-search-bar-div" id="rapid-grid-search-bar-div"></div>');
		var searchLabel = $('<label>Search: </label>');
		var searchText = $('<input type="text" id="rapid-grid-search"></input>');
		searchBarDiv.append(searchLabel);
		searchBarDiv.append(searchText);
		toolbar.append(searchBarDiv);
		
		var contentDiv = $('<div class="rapid-grid-content-div"></div>');
		var contentTable = $('<table class="rapid-grid-content-table" id="rapid-grid-content-table"></div>');
		contentDiv.append(contentTable);
		
		var footerContainer = $('<div class="rapid-grid-footer-div"></div>');
		var footerInfoDiv = $('<div class="rapid-grid-footer-info" id="rapid-grid-footer-info"></div>');
		footerInfoDiv.append($('<span style="font-weight:normal;">Showing </span>'));
		var indexStart = $('<span id="rapid-grid-row-index-start"></span>');
		var indexEnd = $('<span id="rapid-grid-row-index-end"></span>');
		var totalRows = $('<span id="rapid-grid-row-total-count"></span>');
		footerInfoDiv.append(indexStart);
		footerInfoDiv.append($('<span style="font-weight:normal;"> to </span>'));
		footerInfoDiv.append(indexEnd);
		footerInfoDiv.append($('<span style="font-weight:normal;"> of </span>'));
		footerInfoDiv.append(totalRows);
		footerInfoDiv.append($('<span style="font-weight:normal;"> entries</span>'));
		footerContainer.append(footerInfoDiv);
		
		var paginationDiv = $('<div class="rapid-grid-pagination-div" id="rapid-grid-pagination-div"></div>');	
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
		this.NumberOfColumn = this.MetaData.column.length;
		var $thead = $('<thead></thead>');
		var $tr = $('<tr style="background:#fff;"></tr>');		
		
		for(var i = 0; i < this.MetaData.column.length; i++) {
			$tr.append($('<th><div class="rapid-grid-column-div">'+this.MetaData.column[i]+'</div></th>'));			
		}
		
		$thead.append($tr);
		this.ParentTable.append($thead);		
	};
	
	/**
	 * Render table grid's data rows
	 */
	this.SetContent = function() {
		this.ParentTable.html("");
		this.SetColumn();		
		
		var $tbody = $('<tbody></tbody>');
		var $tr = null; 
		
		for(var i = this.StartIndex; i <= this.EndIndex; i++) {
			$tr = $('<tr></tr>');
			
			$tr.click(this, function(e){
				e.data.SelectedRow = $(this).attr('data');				
				var tid = $(this).parent().attr('id');
				$("#"+tid+" tr").each(function(){
					$(this).children().each(function(){
						$(this).removeClass();
					});
				});
				
				$(this).children().each(function(){
					$(this).addClass("rapid-grid-content-table-tr-active");
				});
				
			});
			
			for(var j = 0; j < this.Rows[i-1].length; j++) {
				$tr.append('<td><div class="rapid-grid-cell-div">' + this.Rows[i-1][j] + '</div></td>');
			}
			$tbody.append($tr);			
		}	
		this.ParentTable.append($tbody);		
	};
};