# dtables-epic-filters
Datatables epic interdependent filters with multi-select.

After trying various js-plugins out-there, I decided to write my own filter processing plugin. 

**Requirements**
1. Datatables https://datatables.net/
2. Bootstrap-select https://github.com/snapappointments/bootstrap-select/
3. CSS section for upper footers
```
<style>
tfoot {
    display: table-header-group;
}
thead {
    display: table-row-group;
}
tfoot input {
    width: 100%;
    padding: 3px;
    box-sizing: border-box;
}
a.dropdown-item{
  padding:5px !important;
}
</stle>
```
4. the table container must contain footers for each column that you want to use
```
<tfoot>
  <tr>
    <th></th>
    <th></th>
    <th></th>
  </tr>
</tfoot>
```

**How to use:**
call the function from your DataTables initComplete.
example with 1-9 columns with search enabled and small buttons:
```
initComplete: function () {
  megaEpicFilters(this,[1,2,3,4,5,6,7,8,9],{search:true,title:'All',datastyle:'btn-primary btn-sm'});
},
```
See examples in examples folder.

Minor customization options are available:
```
var defaultOptions = {
  multiselect:false,
  datastyle:'btn-info btn-sm',
  search:false,
  actions:false,
  title:"Nothing selected",
  calcotals:false,
}
```


Version 0.1.0 updated on 2019-05-09 16:10:44 

**Changelog:**
  _2019-05-09_
    - published first version to github for the quick cdn access
  _2019-05-05_
    - added the megafilter function which requires less injections and works faster. The filters are puplated only on change filter or "Search" field. Otherwise they don't get repopulated on each draw event
  2019-04-10
    - initial rollup. 3 scripts for datatables support

Hint:
To compress use https://jscompress.com/