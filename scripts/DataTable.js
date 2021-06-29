import { setData, getData } from "./provider.js";

export function LoadDataTable() {
  $("#userDataTable").dataTable({
    dom: "Blfrtip",
    data: JSON.parse(localStorage.getItem("users")),
    rowId: "id",
    columns: [
      { data: "last", class: "editable text" },
      { data: "first", class: "editable text" },
      {
        data: "phone",
        class: "editable text",
        orderable: false,
      },
      { data: "email", class: "editable text", orderable: false },
      {
        data: "registrationDate",
        type: "date",
        render: function (data) {
          return new Date(data).toLocaleDateString();
        },
      },
      {
        render: function (data, type, row) {
          return createButton("edit", row.id);
        },
        orderable: false,
      },
      {
        render: function (data, type, row) {
          return createButton("delete", row.id);
        },
        orderable: false,
      },
    ],
    searching: true,
    paging: true,
    info: true,
    language: {
      emptyTable: "No data available",
    },
    lengthMenu: [
      [10, 25, 50, 100],
      [10, 25, 50, 100],
    ],
  });
}

$("#userDataTable").on("click", "tbody td .edit", function (e) {
  removeInputFields();
  //Searches row targeted by user, replaces existing cells value with an input field if the cell is designated as editable
  var clickedRow = $($(this).closest("td")).closest("tr");
  $(clickedRow)
    .find("td")
    .each(function () {
      if ($(this).hasClass("editable")) {
        if ($(this).hasClass("text")) {
          var html = fnCreateTextBox($(this).html(), "name");
          $(this).html($(html));
        }
      }
    });

  //Replaces "Edit" and "Delete" buttons with "Update" and "Cancel" buttons, if another row shows "Update" and "Cancel" buttons does opposite
  $("#userDataTable tbody tr td .update")
    .removeClass("update")
    .addClass("edit")
    .html("Edit");
  $("#userDataTable tbody tr td .cancel")
    .removeClass("cancel")
    .addClass("delete")
    .html("Delete");
  $(clickedRow)
    .find("td .edit")
    .removeClass("edit")
    .addClass("update")
    .html("Update");
  $(clickedRow)
    .find("td .delete")
    .removeClass("delete")
    .addClass("cancel")
    .html("Cancel");
});

$("#userDataTable").on("click", "tbody td .delete", function (e) {
  //Finds row associated with clicked delete button, gets row id,
  var clickedRow = $($(this).closest("td")).closest("tr");
  var id = clickedRow[0].id;

  //Get dataset from localstorage, set new array to localstorage without object deleted by user
  var users = getData();
  for (var i = 0; i < users.length; i++) {
    if (users[i].id === id) {
      users.splice(i, 1);
    }
  }
  setData(users);

  //Clear data form table, update with new array
  var table = $("#userDataTable").DataTable();
  table.clear().rows.add(users).draw();
});

$("#userDataTable").on("click", "tbody td .cancel", function (e) {
  removeInputFields();
  //Dismiss any inputs by refreshing table data
  var users = getData();
  var table = $("#userDataTable").DataTable();
  table.clear().rows.add(users).draw();
});

$("#userDataTable").on("click", "tbody td .update", function (e) {
  var openedTextBox = $("#userDataTable").find("input");
  let newData = [];
  //Loop through inputs, add input values to array, set cell value = input,
  $.each(openedTextBox, function (k, $cell) {
    newData.push($cell.value);
    updateCellValue($cell, $cell.value);
  });

  //Get input values from array, update user in dataset with new values, set new array to local storage, redraw table with updated data
  var clickedRow = $($(this).closest("td")).closest("tr");
  var id = clickedRow[0].id;
  var users = getData();
  for (var i = 0; i < users.length; i++) {
    if (users[i].id === id) {
      users[i].last = newData[0];
      users[i].first = newData[1];
      users[i].phone = newData[2];
      users[i].email = newData[3];
    }
  }
  setData(users);
  var table = $("#userDataTable").DataTable();
  table.clear().rows.add(users).draw();

  $("#userDataTable tbody tr td .update")
    .removeClass("update")
    .addClass("edit")
    .html("Edit");
  $("#userDataTable tbody tr td .cancel")
    .removeClass("cancel")
    .addClass("delete")
    .html("Delete");
});

// Creates edit or delete button, called by render functions
function createButton(buttonType, rowId) {
  var buttonText = buttonType == "edit" ? "Edit" : "Delete";
  var buttonClass =
    buttonType === "edit"
      ? `edit btn btn-outline-secondary`
      : "delete btn btn-outline-danger";
  return `<button id=${rowId} class="${buttonClass}" type="button">
    ${buttonText}</button>`;
}

function updateCellValue($inputCell, value) {
  //Change cell value to input value
  var dataTable = $("#userDataTable").DataTable();
  var rowIndex = dataTable.row($($inputCell).closest("tr")).index();
  var fieldName = $($inputCell).attr("data-field");

  dataTable.rows().data()[rowIndex][fieldName] = value;
}

function fnCreateTextBox(value, fieldprop) {
  return (
    '<input data-field="' +
    fieldprop +
    '" type="text" value="' +
    value +
    '" ></input>'
  );
}

//Remove input fields
function removeInputFields() {
  var openedTextBox = $("#userDataTable").find("input");
  $.each(openedTextBox, function (k, $cell) {
    $(openedTextBox[k]).closest("td").html($cell.value);
  });
}
