/*!
  Documentation here: https://github.com/LuckyGiga/dtables-epic-filters
*/



// ! initComplete epic filters initialiation
function kirilFiltersEpicInit(table, columns, options){
  if (typeof options === 'undefined') options = 0;
  // default options
  var defaultOptions = {
    multiselect:false,
    datastyle:'btn-info btn-sm',
    search:false,
    actions:false,
    title:"Nothing selected",
    newmode:false,
  }
  if(options == null){options = defaultOptions;}
  else{
    options.multiselect = (options.multiselect === undefined)?defaultOptions.multiselect:options.multiselect;
    options.datastyle = (options.datastyle === undefined)?defaultOptions.datastyle:options.datastyle;
    options.search = (options.search === undefined)?defaultOptions.search:options.search;
    options.actions = (options.actions === undefined)?defaultOptions.actions:options.actions;
    options.title = (options.title === undefined)?defaultOptions.title:options.title;
  }

  table.api().columns(columns).every( function () {
    var column = this;
    var val;
    // data-live-search="true" 
    // data-actions-box="true" multiple
    var select = $('<select class="selectpicker" data-selected-text-format="count > 3" title="'+options.title+'" data-width="100%" data-style="'+options.datastyle+'"'+((options.multiselect)?' multiple':'')+((options.search)?' data-live-search="true"':'')+((options.actions)?' data-actions-box="true"':'')+'>'+(!(options.multiselect)?'<option value="" placeholder="filter">All</option>':'<option value="" placeholder="filter" style="display:none;">All</option>')+'</select>')
        .appendTo( $(column.footer()).empty() )
        .on( 'change', function () {
            if(Array.isArray(select.val())){
              val = select.val().join('|');
            } else {
              val = $.fn.dataTable.util.escapeRegex(
                  $(this).val()
              );
            }
            column
                .search( val ? '^'+val+'$' : '', true, false )
                .draw();
        });

    column.data({ filter : 'applied'}).unique().sort().each( function ( d ) {
        select.append( '<option value="'+d+'">'+d+'</option>' )
    });
    select.selectpicker('refresh');
  });
}

// ! epic filters with bootstrap-select (selectpicker)
function kirilFiltersEpicDraw(table, columns){
  table.api().columns(columns, { filter : 'applied'}).every( function () {
    var column = this;
    var multiselect = false;
    var select = $(column.footer()).find('select');
    select.find('option', this).not(':eq(0), :selected').remove();
    var val = select.val();
    // option for multiselect :)
    if(Array.isArray(val)){
      multiselect = true;
      val = select.val().join('|');
    }
    // temporarily disable filter for currrent column
    column.search('',true,false);
    // get items and refresh selectpicker
    if (multiselect == false && val != ''){select.prepend('<option value="" placeholder="filter">All</option>');}
    column.data().unique().sort().each( function ( d ) {
      if(val == undefined||val ==''){
        select.append( '<option value="'+d+'">'+d+'</option>' )
      } else {
        if(val.indexOf(d) == -1){
          select.append( '<option value="'+d+'">'+d+'</option>' )
        }
      }
    });
    select.selectpicker('refresh');
    // put the current column filter back
    column.search( val ? '^'+val+'$' : '', true, false );
  });
}


// ! initComplete megaepic filters initialiation
function megaEpicFilters(table, columns, options){
  if (typeof options === 'undefined') options = 0;
  // default options
  var defaultOptions = {
    multiselect:false,
    datastyle:'btn-info btn-sm',
    search:false,
    actions:false,
    title:"Nothing selected",
    calcotals:false,
  }
  if(options == null){options = defaultOptions;}
  else{
    options.multiselect = (options.multiselect === undefined)?defaultOptions.multiselect:options.multiselect;
    options.datastyle = (options.datastyle === undefined)?defaultOptions.datastyle:options.datastyle;
    options.search = (options.search === undefined)?defaultOptions.search:options.search;
    options.actions = (options.actions === undefined)?defaultOptions.actions:options.actions;
    options.calcotals = (options.calcotals === undefined)?defaultOptions.calcotals:options.calcotals;
  }

  // search trigger
  $('.dataTables_filter').find('input').on('change',function(){
    kirilFiltersEpicDraw(table, columns);
  });

  table.api().columns(columns).every( function () {
    var column = this;
    var val;
    // data-live-search="true" 
    // data-actions-box="true" multiple
    var select = $('<select class="selectpicker" data-selected-text-format="count > 3" title="'+options.title+'" data-width="100%" data-style="'+options.datastyle+'"'+((options.multiselect)?' multiple':'')+((options.search)?' data-live-search="true"':'')+((options.actions)?' data-actions-box="true"':'')+'>'+(!(options.multiselect)?'<option value="" placeholder="filter">All</option>':'<option value="" placeholder="filter" style="display:none;">All</option>')+'</select>')
        .appendTo( $(column.footer()).empty() )
        .on( 'change', function () {
            if(Array.isArray(select.val())){
              val = select.val().join('|');
            } else {
              val = $.fn.dataTable.util.escapeRegex(
                  $(this).val()
              );
            }
            column
              .search( val ? '^'+val+'$' : '', true, false )
              .draw();
            if(options.calcotals){
              calculateTotals();
            }
            kirilFiltersEpicDraw(table, columns);
        });
    column.data({ filter : 'applied'}).unique().sort().each( function ( d ) {
        select.append( '<option value="'+d+'">'+d+'</option>' )
    });
    select.selectpicker('refresh');
  });
}