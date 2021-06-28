import { getUsers } from "./provider.js";
console.log("Welcome to the main module");

export function fnLoadDataTableInstance() {
  $("#userDataTable").dataTable({
    dom: "Blfrtip",
    ajax: function (data, callback, settings) {
      callback({ data: JSON.parse(localStorage.getItem("users")) }); //reloads data
    },
    rowId: "id",
    columns: [
      { data: "last", class: "editable text" },
      { data: "first", class: "editable text" },
      {
        data: "phone",
        render: function (data) {
          return data.replace(/(\d{3})(\d{3})(\d{4})/,'$1-$2-$3');
        },
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
          return createButton("delete", this);
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

function createButton(buttonType, rowId) {
  var buttonText = buttonType == "edit" ? "Edit" : "Delete";
  return `<button id=${rowId} class="${buttonType}" type="button">
    ${buttonText}</button>`;
}

$("#userDataTable").on("click", "tbody td .edit", function (e) {
  fnResetControls();
  var dataTable = $("#userDataTable").DataTable();
  var clickedRow = $($(this).closest("td")).closest("tr");
  console.log(clickedRow);
  $(clickedRow)
    .find("td")
    .each(function () {
      // do your cool stuff
      if ($(this).hasClass("editable")) {
        if ($(this).hasClass("text")) {
          var html = fnCreateTextBox($(this).html(), "name");
          $(this).html($(html));
        }
      }
    });
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

function fnCreateTextBox(value, fieldprop) {
  return (
    '<input data-field="' +
    fieldprop +
    '" type="text" value="' +
    value +
    '" ></input>'
  );
}

$("#userDataTable").on("click", "tbody td .delete", function (e) {
  var clickedRow = $($(this).closest("td")).closest("tr");
  var id = clickedRow[0].id;
  var users = JSON.parse(localStorage.getItem("users"));
  for (var i = 0; i < users.length; i++) {
    if (users[i].id === id) {
      users.splice(i, 1);
    }
  }
  localStorage.setItem("users", JSON.stringify(users));
  var table = $("#userDataTable").DataTable();
  table.clear().rows.add(users).draw();
});
$("#userDataTable").on("click", "tbody td .cancel", function (e) {
  fnResetControls();
  $("#userDataTable tbody tr td .update")
    .removeClass("update")
    .addClass("edit")
    .html("Edit");
  $("#userDataTable tbody tr td .cancel")
    .removeClass("cancel")
    .addClass("delete")
    .html("Delete");
});

function fnResetControls() {
  var openedTextBox = $("#userDataTable").find("input");
  $.each(openedTextBox, function (k, $cell) {
    $(openedTextBox[k]).closest("td").html($cell.value);
  });
}

$("#userDataTable").on("click", "tbody td .update", function (e) {
  var openedTextBox = $("#userDataTable").find("input");
  let newData = [];
  $.each(openedTextBox, function (k, $cell) {
    debugger;
    newData.push($cell.value);
    fnUpdateDataTableValue($cell, $cell.value);
    $(openedTextBox[k]).closest("td").html($cell.value);
  });
  var clickedRow = $($(this).closest("td")).closest("tr");
  var id = clickedRow[0].id;
  var users = JSON.parse(localStorage.getItem("users"));
  for (var i = 0; i < users.length; i++) {
    if (users[i].id === id) {
      users[i].last = newData[0];
      users[i].first = newData[1];
      users[i].phone = newData[2];
      users[i].email = newData[3];
    }
  }
  localStorage.setItem("users", JSON.stringify(users));
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

function fnUpdateDataTableValue($inputCell, value) {
  var dataTable = $("#userDataTable").DataTable();
  var rowIndex = dataTable.row($($inputCell).closest("tr")).index();
  console.log(rowIndex);
  var fieldName = $($inputCell).attr("data-field");

  dataTable.rows().data()[rowIndex][fieldName] = value;
}

const deleteRow = (value) => {
  debugger;
  var users = JSON.parse(localStorage.getItem("users"));
  for (var i = 0; i < users.length; i++) {
    if (users[i].id === value) {
      users.splice(i, 1);
    }
  }
  localStorage.setItem("users", JSON.stringify(users));
  var table = $("#userDataTable").DataTable();
  table.clear().rows.add(users).draw();
  // $("#userDataTable").DataTable().data(newArray);
  debugger;
};
