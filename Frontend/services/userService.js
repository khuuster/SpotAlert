app.service("userService", function ($http) {

  // Get all
  this.getUsers = function () {
    return $http.get("http://localhost:5000/api/users");
  };

  // Get one by Id
  this.getUserById = function (id, cb) {
    if (id == "" || id == undefined || id == null) {
      var user = {};
      cb(user);
    }
    else {
      $http.get("http://localhost:5000/api/users/" + id + "/")
        .then(function (response) {
          cb(response.data);
        }, function (error) {
          console.log(error);
        });
    };
  };

  // Create
  this.postUser = function (user) {
    return $http.post("http://localhost:5000/api/users/", user);
  };

  // Update
  this.putUser = function (id, user) {
    return $http.put("http://localhost:5000/api/users/" + id + "/", user);
  };

  // Delete
  this.delete = function () {
    return $http.delete("http://localhost:5000/api/users/" + _currentUserId);
  };

  // current user logged in, 0 means no one is logged on
  var _currentUserId = 0;

  // Loads the current user by the id passed in
  this.setCurrentUser = function (id) {
    _currentUserId = id;
  };

  // returns logged on users' id
  this.currentUserReturn = function () {
    return _currentUserId;
  };

  // loads logged on users info
  this.getCurrentUserInfo = function () {
    return $http.get("http://localhost:5000/api/users/" + _currentUserId);
  };
});