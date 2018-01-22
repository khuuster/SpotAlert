app.controller("accountController", function ($scope, $state, $stateParams, $http, userService) {

  // LOADS CURRENT USER
  if (userService.currentUserReturn() == 0) {
    $state.go("home");
  };
  $scope.loadUser = function() {
    userService.getCurrentUserInfo()
      .then(function(response) {
        console.log(response.data);
        $scope.loadedUser = response.data;
      });
  };

  $scope.loadUser();

  // LOGS OUT CURRENT USER AND SENDS BACK TO THE HOME PAGE 
  $scope.logout = function() {
    userService.setCurrentUser(0);
    $state.go("home");
  };

  // GETS ALL USERS
  $scope.getUser = function() {
    userService.getUsers()
      .then(function(response) {
        console.log("Users:", response.data)
        $scope.users = response.data;
      }, function (error) {
        console.log(error);
      });
  };
  $scope.getUser();

  // GET ONE USER BY ID
  if (userService.currentUserReturn() == 0 || userService.currentUserReturn() == null) {
    userService.getUserById($stateParams.id, function (user) {
      $scope.user = user;
      $scope.submitButton = true;
      $scope.heading = "Create New User"
    });
  }
  else {
    userService.getUserById(userService.currentUserReturn() == 0, function (user) {
      $scope.user = user;
      $scope.submitButton = false;
      $scope.heading = "Update User"
    });
  };

  // FIRST NAME, LAST NAME, EMAIL, AND PASSWORD FORM VALIDATION (ASTERISK) HIDES ON DEFAULT
  $scope.firstNameReq = false;
  $scope.lastNameReq = false;
  $scope.emailReq = false;
  $scope.passwordReq = false;

  // IF PASSWORDS DOESN'T MATCH FORM VALIDATION HIDES ON DEFAULT
  $scope.passwordError = false;

  // CREATE NEW USER
  $scope.addUser = function (user) {
    userService.postUser(user)
      .then(function(response) {
        console.log("New User Added:", response.data);
        console.log("Updated Users:", $scope.users);
      }, function (error) {
        console.log(error);
      });

    if ($scope.user.firstName == "" || $scope.user.firstName == null) {
      $scope.firstNameReq = true;
    } else {
      $scope.firstNameReq = false;
    };
    if ($scope.user.lastName == "" || $scope.user.lastName == null) {
      $scope.lastNameReq = true;
    } else {
      $scope.lastNameReq = false;
    };
    if ($scope.user.email == "" || $scope.user.email == null) {
      $scope.emailReq = true;
    } else {
      $scope.emailReq = false;
    };
    if ($scope.user.address == "" || $scope.user.address == null) {
      $scope.addressReq = true;
    } else {
      $scope.addressReq = false;
    };
    if ($scope.user.phoneNumber == "" || $scope.user.phoneNumber == null) {
      $scope.phoneReq = true;
    } else {
      $scope.phoneReq = false;
    };
    if ($scope.user.password == "" || $scope.user.password == null) {
      $scope.passwordReq = true;
    } else {
      $scope.passwordReq = false;
    };
    if (($scope.user.password == "" || $scope.user.password == null) && ($scope.user.confirmPassword != "" || $scope.user.confirmPassword != null)) {
      $scope.passwordError = true;
    } else {
      $scope.passwordError = false;
    };
    if ($scope.user.password != $scope.user.confirmPassword) {
      $scope.passwordError = true;
    } else {
      $scope.passwordError = false;
    };

    if ($scope.user.firstName != "" && $scope.user.firstName != null && $scope.user.lastName != "" && $scope.user.lastName != null && $scope.user.email != "" && $scope.user.email != null && $scope.user.password != "" && $scope.user.password != null && $scope.user.confirmPassword != "" && $scope.user.confirmPassword != null && $scope.user.password == $scope.user.confirmPassword) {
      $state.go("login");
    };
  };

  // UPDATE USER
  $scope.updateUser = function(user) {
    userService.putUser($stateParams.id, user)
      .then(function(response) {
        if ($scope.user.firstName == "" || $scope.user.firstName == null) {
          $scope.firstNameReq = true;
        } else {
          $scope.firstNameReq = false;
        };
        if ($scope.user.lastName == "" || $scope.user.lastName == null) {
          $scope.lastNameReq = true;
        } else {
          $scope.lastNameReq = false;
        };
        if ($scope.user.email == "" || $scope.user.email == null) {
          $scope.emailReq = true;
        } else {
          $scope.emailReq = false;
        };
        if ($scope.user.password == "" || $scope.user.password == null) {
          $scope.passwordReq = true;
        } else {
          $scope.passwordReq = false;
        };
        if (($scope.user.password == "" || $scope.user.password == null) && ($scope.user.confirmPassword != "" || $scope.user.confirmPassword != null)) {
          $scope.passwordError = true;
        } else {
          $scope.passwordError = false;
        };
        if ($scope.user.password != $scope.user.confirmPassword) {
          $scope.passwordError = true;
        } else {
          $scope.passwordError = false;
        };

        if ($scope.user.firstName != "" && $scope.user.firstName != null && $scope.user.lastName != "" && $scope.user.lastName != null && $scope.user.email != "" && $scope.user.email != null && $scope.user.password != "" && $scope.user.password != null && $scope.user.confirmPassword != "" && $scope.user.confirmPassword != null && $scope.user.password == $scope.user.confirmPassword) {
          $state.go("account");
        };
      }, function (error) {
        console.log(error);
      });
  };

  // DELETE USER
  $scope.deleteUser = function() {
    userService.delete()
      .then(function(response) {
        console.log(response.data);
        console.log($scope.users);
        $state.go("home");
      }, function (error) {
        console.log(error);
      });
  };
});