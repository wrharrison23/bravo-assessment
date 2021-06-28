import { getUsers } from "./provider.js"

export const UserModalForm = () => {
  return `
  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addUserModal">
  Add User
</button>
  <div class="modal fade" id="addUserModal" tabindex="-1" aria-labelledby="addUser" aria-hidden="true">
            <div class="modal-dialog ">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Add New User</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                <div class="modal-body">
                    <div class="container">
                        <form class="form-horizontal" id="userForm">
                            <div class="form-group">
                                <label for="First Name" class="col-sm-2 control-label">First Name</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" id="firstName" name="first">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="Last Name" class="col-sm-2 control-label">Last Name</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" id="lastName" name="last">
                                </div>
                            </div>
                                <div class="form-group">
                                <label for="phone" class="col-sm-2 control-label">Phone</label>
                                <div class="col-sm-10">
                                    <input type="tel" class="form-control" id="phone" name="phone">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="email" class="col-sm-2 control-label">Email</label>
                                <div class="col-sm-10">
                                    <input type="email" class="form-control" id="email" name="email">
                                </div>
                            </div> 
                        </form>
                    </div> 
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" id='save-user' class="save-user btn btn-primary"  data-bs-dismiss="modal">Save changes</button>
                    
                </div>
            </div>
        </div>
    </div>
  </div>`;
}

$(document).on("click", "#save-user", function (e) {

   var $inputs = $("#userForm :input");
   var newUser = {};
   $inputs.each(function () {
     newUser[this.name] = $(this).val();
   });
  newUser.id = assignId();
  newUser.registrationDate = new Date();
  console.log(newUser)
  var users = JSON.parse(localStorage.getItem("users"));
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
  var table = $("#userDataTable").DataTable();
  table.clear().rows.add(users).draw();
});

function assignId() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}