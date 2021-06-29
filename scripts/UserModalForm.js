import { setData, getData } from "./provider.js";

export const UserModalForm = () => {
  return `
  <button type="button" class="btn btn-primary mb-2" data-bs-toggle="modal" data-bs-target="#addUserModal">
  Add User
</button>
  <div class="modal fade" id="addUserModal" tabindex="-1" aria-labelledby="addUser" aria-hidden="true">
            <div class="modal-dialog ">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="addUserModalLabel">Add New User</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                <div class="modal-body">
                    <div class="container">
                        <form class="form-horizontal" id="userForm">
                            <div class="form-group">
                                <label for="First Name" class="form-label">First Name</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" id="firstName" name="first" required>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="Last Name" class="form-label">Last Name</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" id="lastName" name="last" required>
                                </div>
                            </div>
                                <div class="form-group">
                                <label for="phone" class="form-label">Phone</label>
                                <div class="col-sm-10">
                                    <input type="tel" class="form-control" id="phone" name="phone" required>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="email" class="form-label">Email</label>
                                <div class="col-sm-10">
                                    <input type="email" class="form-control" id="email" name="email" required>
                                </div>
                            </div> 
                        </form>
                    </div> 
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="submit" id='save-user' class="save-user btn btn-primary" form="userForm">Save changes</button>
                    
                </div>
            </div>
        </div>
    </div>
  </div>`;
};

$(document).on("submit", "#userForm", function (e) {
  e.preventDefault();

  //Grab user input from form, loop through inputs, adding each to user object
  var $inputs = $("#userForm :input");
  var newUser = {};
  $inputs.each(function () {
    newUser[this.name] = $(this).val();
  });
  newUser.id = assignId();
  newUser.registrationDate = new Date();

    //Get stored dataset as array, add user to array, set new array to local storage
  var users = getData()
  users.push(newUser);
    setData(users)
    $("#userForm").find("input:text").val("");
    $("#email").val("");
    $("#phone").val("");
    //Redraw table with new data
  var table = $("#userDataTable").DataTable();
  table.clear().rows.add(users).draw();
  $("#addUserModal").modal("hide");
});

//Creates unique ID for added user
function assignId() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
