// export let users = [];
export const getUsers = () => {
  var users = JSON.parse(localStorage.getItem("users") || "[]");
  if (users.length === 0) {
    return $.ajax({
      url: "https://randomuser.me/api/?results=20&inc=name,email,phone,registered,login&noinfo&seed=foobar",
      dataType: "json",
      success: function (data) {
        let users = [];
        data.results.forEach((user) => {
          let newUserObject = {
            id: user.login.uuid,
            first: user.name.first,
            last: user.name.last,
            phone: user.phone,
            email: user.email,
            registrationDate: user.registered.date,
          };
          users.push(newUserObject);
        });
        localStorage.setItem("users", JSON.stringify(users));
      },
    });
  } else return Promise.reject("Data already in memory");
};
