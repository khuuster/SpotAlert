app.controller("userController", function ($scope, $state, $stateParams, $http, userService) {

  $scope.

  // Get all user
  $scope.getUser = function () {
    userService.getUsers()
      .then(function (response) {
        console.log("Users:", response.data);
        $scope.users = response.data;
      }, function (error) {
        console.log(error);
      });
  };
  $scope.getUser();

  // Get one user by Id
  if (userService.currentUserReturn() == 0 || userService.currentUserReturn() == null) {
    userService.getUserById($stateParams.id, function (user) {
      $scope.user = user;
      $scope.submitButton = true;
      $scope.heading = "Sign Up";
      $scope.profileNav = false;
      $scope.aboutus = false;
      $scope.dashboard = false;
      $scope.lostpet = false;
      $scope.pets = false;
    });
  }
  else {
    userService.getUserById(userService.currentUserReturn()).then(function(response){
      $scope.user = response.data;
      $scope.submitButton = false;
      $scope.heading = "Update Account";
      $scope.profileNav = true;
      $scope.aboutus = true;
      $scope.dashboard = true;
      $scope.lostpet = true;
      $scope.pets = true;
    }) 
  };

  // If fields are empty error message in the user form validation (hidden as default)
  $scope.firstNameReq = false;
  $scope.lastNameReq = false;
  $scope.emailReq = false;
  $scope.phoneReq = false;
  $scope.addressReq = false;
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

    // Checks if password field matches confirm password field, if it does not match, error message will show, otherwise, it will stay hidden
    if ($scope.user.password != $scope.user.confirmPassword) {
      $scope.passwordError = true;
    } else {
      $scope.passwordError = false;
    }

    // If forms are not empty & passwords do match, register button will proceed to home-login view
    if ($scope.user.firstName != "" && $scope.user.firstName != null && $scope.user.lastName != "" && $scope.user.lastName != null && $scope.user.email != "" && $scope.user.email != null && $scope.user.password != "" && $scope.user.password != null && $scope.user.confirmPassword != "" && $scope.user.confirmPassword != null && $scope.user.password == $scope.user.confirmPassword) {
      $state.go("home");
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
          $state.go("dashboard");
        };
      }, function (error) {
        console.log(error);
      });
  };

  // Delete
  $scope.deleteUser = function (user) {
    userService.delete($stateParams.id, user)
      .then(function (response) {
        console.log(response.data);
        console.log($scope.users);
        $state.go("home");
      }, function (error) {
        console.log(error);
      });
  };

  // Login form validation error message hidden on initial load
  $scope.errorMessage = false;

  // Login
  $scope.login = function (user) {
    userService.getUsers()
      .then(function (response) {
        console.log("Users:", response);
        // if user's email and password does not match database, login form validation error will show; or else, it will stay hidden and proceed to users view (as logged in user)
        for (var i = 0; i < response.data.length; i++) {
          if (response.data[i].email == user.email && response.data[i].password == user.password) {
            $scope.errorMessage = false;
            userService.setCurrentUser(response.data[i].id);
            $state.go("dashboard");
            break; // stops error message in else block from running if log in is correct
          }
          else {
            $scope.errorMessage = true;
          };
        };
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  // logout function
  $scope.logout = function () {
    userService.setCurrentUser(0);
    $state.go("home");
  };
});