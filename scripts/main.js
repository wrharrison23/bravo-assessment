import { LoadDataTable } from "./DataTable.js"
import { getUsers } from "./provider.js";
import { UserModalForm } from "./UserModalForm.js"

//When page is ready, initiate AJAX request to api, load datatable to page, add modal and button for adding users to data

$(document).ready(function () {
  getUsers().then(() => {
    LoadDataTable();
    $("#container").prepend(UserModalForm());
  }
  );
});