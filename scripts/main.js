import { fnLoadDataTableInstance } from "./DataTable.js"
import { getUsers } from "./provider.js";
import { UserModalForm } from "./UserModalForm.js"
$(document).ready(function () {
  getUsers().then(fnLoadDataTableInstance());
  $("#container").prepend(UserModalForm())
});