app.controller("accountController", function ($scope, $state, $stateParams, $http, userService) {

  // loads the current user
  if (userService.currentUserReturn() == 0) {
    $state.go("home");
  };
  $scope.loadUser = function () {
    userService.getCurrentUserInfo()
      .then(function (response) {
        console.log(response.data)
        $scope.loadedUser = response.data;
      });
  };
  $scope.loadUser();

  // this logs out the current user and brings them back to the home page
  $scope.logout = function () {
    userService.setCurrentUser(0);
    $state.go("home");
  };

  // Get all user
  $scope.getUser = function () {
    userService.getUsers()
      .then(function (response) {
        console.log("Users:", response.data)
        $scope.users = response.data;
      }, function (error) {
        console.log(error);
      });
  };
  $scope.getUser();

  // Get one user by Id
  if ($stateParams.id == "" || $stateParams.id == undefined || $stateParams.id == null) {
    userService.getUserById($stateParams.id, function (user) {
      $scope.user = user;
      $scope.submitButton = true;
      $scope.heading = "Create New User"
    });
  }
  else {
    userService.getUserById($stateParams.id, function (user) {
      $scope.user = user;
      $scope.submitButton = false;
      $scope.heading = "Update User"
    });
  };

  // If fields are empty error message in the user form validation (hidden as default)
  $scope.firstNameReq = false;
  $scope.lastNameReq = false;
  $scope.emailReq = false;
  $scope.passwordReq = false;

  // If passwords do not match error message in the new user form (hidden as default)
  $scope.passwordError = false;

  // Create
  $scope.addUser = function (user) {
    userService.postUser(user)
      .then(function (response) {
        console.log("New User Added:", response.data);
        console.log("Updated Users:", $scope.users);
      }, function (error) {
        console.log(error);
      });

    // Checks if fields are empty, form validation error message will show, otherwise, it will stay hidden
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

    // Checks if password field matches confirm password field, if it does not match, error message will show, otherwise, it will stay hidden
    if ($scope.user.password != $scope.user.confirmPassword) {
      $scope.passwordError = true;
    } else {
      $scope.passwordError = false;
    };

    // If forms are not empty & passwords do match, register button will proceed to home-login view
    if ($scope.user.firstName != "" && $scope.user.firstName != null && $scope.user.lastName != "" && $scope.user.lastName != null && $scope.user.email != "" && $scope.user.email != null && $scope.user.password != "" && $scope.user.password != null && $scope.user.confirmPassword != "" && $scope.user.confirmPassword != null && $scope.user.password == $scope.user.confirmPassword) {
      $state.go("login");
    };
  };

  // Update
  $scope.updateUser = function (user) {
    userService.putUser($stateParams.id, user)
      .then(function (response) {

        // Checks if fields are empty, form validation error message will show, otherwise, it will stay hidden
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

        // Checks if password field matches confirm password field, if it does not match, error message will show, otherwise, it will stay hidden
        if ($scope.user.password != $scope.user.confirmPassword) {
          $scope.passwordError = true;
        } else {
          $scope.passwordError = false;
        };

        // If forms are not empty & passwords do match, register button will proceed to home-login view
        if ($scope.user.firstName != "" && $scope.user.firstName != null && $scope.user.lastName != "" && $scope.user.lastName != null && $scope.user.email != "" && $scope.user.email != null && $scope.user.password != "" && $scope.user.password != null && $scope.user.confirmPassword != "" && $scope.user.confirmPassword != null && $scope.user.password == $scope.user.confirmPassword) {
          $state.go("account");
        };
      }, function (error) {
        console.log(error);
      });
  };

  // Delete
  $scope.deleteUser = function () {
    userService.delete()
      .then(function (response) {
        console.log(response.data);
        console.log($scope.users);
        $state.go("home")
      }, function (error) {
        console.log(error);
      });
  };
});