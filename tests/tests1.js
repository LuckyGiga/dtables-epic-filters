// epic filters with simple selectors
function kirilFilters(table, columns){
  table.api().columns(columns, { filter : 'applied'}).every( function () {
    var column = this;
    var select = $(column.footer()).find('select');
    select.find('option', this).not(':eq(0), :selected').remove();
    // console.log($(this).val());
    var val = select.val();
    column.search('',true,false);
    column.data().unique().sort().each( function ( d ) {
      if(d != val){
        select.append( '<option value="'+d+'">'+d+'</option>' )
      }
    });
    column.search( val ? '^'+val+'$' : '', true, false );
  });
}