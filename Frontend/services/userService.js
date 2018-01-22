app.service("userService", function ($http) {

  // GET ALL USERS
  this.getUsers = function () {
    return $http.get("http://localhost:5000/api/users");
  };

  // GET USER FOR LOST PET 
  this.getOwnerById = function(id){
    return $http.get("http://localhost:5000/api/users/" + id);
  };
  
  // GET ONE USER BY ID
  this.getUserById = function(id, cb) {
    if (id == "" || id == undefined || id == null) {
      var user = {};
      cb(user);
    }
    else {
      $http.get("http://localhost:5000/api/users/" + id + "/")
        .then(function(response) {
          cb(response.data);
        }, function(error) {
          console.log(error);
        });
    };
  };

  // Create
  this.postUser = function(user) {
    return $http.post("http://localhost:5000/api/users/", user);
  };

  // SET OWNER ID
  var ownerId = null
  this.setOwner = function(id) {
    ownerId = id;
  };

  // PUT TO SEND MESSAGE TO OWNER
  this.messageOwner = function(body) {
    return $http.put("http://localhost:5000/api/users/" + ownerId + "/", body);
  };

  // UPDATE USER
  this.putUser = function(id, user) {
    return $http.put("http://localhost:5000/api/users/" + id + "/", user);
  };

  // DELETE USER
  this.delete = function() {
    return $http.delete("http://localhost:5000/api/users/" + _currentUserId);
  };

  // CURRENT USER LOGGED IN, 0 MEANS NO ONE IS LOGGED IN 
  var _currentUserId = 1;

  // LOADS THE CURRENT USER BY THE ID PASSED IN  
  this.setCurrentUser = function(id) {
    _currentUserId = id;
  };

  // RETURNS LOGGED ON USER'S ID
  this.currentUserReturn = function() {
    return _currentUserId;
  };

  // LOADS LOGGED ON USERS INFO 
  this.getCurrentUserInfo = function() {
    return $http.get("http://localhost:5000/api/users/" + _currentUserId);
  };

   // GET USER BY ID
   this.getUser = function(id) {
      return $http.get("http://localhost:5000/api/users/" + id);
  };
});

