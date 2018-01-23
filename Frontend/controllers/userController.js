app.controller("userController", function ($scope, $state, $stateParams, $http, userService) {
 
  // LOADS MESSAGES ON DASHBOARD
  if (userService.currentUserReturn() != 0){
    userService.getOwnerById(userService.currentUserReturn())
    .then(function(response){
      $scope.dashMessage = response.data; 
    });
  };

  // GETS ALL USERS
  $scope.getUser = function() {
    userService.getUsers()
      .then(function(response) {
        console.log("Users:", response.data);
        $scope.users = response.data;
      }, function(error) {
        console.log(error);
      });
  };

  $scope.getUser();

  // GETS ONE USER BY ID
  if ($stateParams.id == '' || $stateParams.id == undefined || $stateParams.id == null) {
    userService.getUserById($stateParams.id, function(user) {
      $scope.user = user;
      $scope.submitButton = true;
      $scope.heading = "Sign Up";
    });
  } else {
    userService.getUserById($stateParams.id, function(user) {
      $scope.user = user;
      $scope.submitButton = false;
      $scope.heading = "Update Account";
    });
  };

  // FIRST NAME, LAST NAME, EMAIL. PHONE, ADDRESS, PASSWORD, CONFIRM PASSWORD FORM VALIDATION (ASTERISK) HIDES ON DEFAULT
  $scope.firstNameReq = false;
  $scope.lastNameReq = false;
  $scope.emailReq = false;
  $scope.phoneReq = false;
  $scope.addressReq = false;
  $scope.passwordReq = false;
  $scope.confirmPasswordReq = false;
  $scope.bothPasswordReq = true;

  // IF PASSWORDS DOESN'T MATCH FORM VALIDATION (ASTERISK) HIDES ON DEFAULT
  $scope.passwordError = false;

  // CREATE USER
  $scope.addUser = function(user) {
    userService.postUser(user)
      .then(function(response) {
        console.log("New User Added:", response.data);
        console.log("Updated Users:", $scope.users);
      }, function(error) {
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
    if ($scope.user.confirmPassword == "" || $scope.user.confirmPassword == null) {
      $scope.confirmPasswordReq = true;
    } else {
      $scope.confirmPasswordReq = false;
    };
    if ($scope.user.password != $scope.user.confirmPassword) {
      $scope.bothPasswordReq = false;
    } else {
      $scope.bothPasswordReq = true;
    };

    if ($scope.user.firstName != "" && $scope.user.firstName != null && $scope.user.lastName != "" && $scope.user.lastName != null && $scope.user.email != "" && $scope.user.email != null && $scope.user.address != "" && $scope.user.address != null && $scope.user.phoneNumber != "" && $scope.user.phoneNumber != null && $scope.user.password != "" && $scope.user.password != null && $scope.user.confirmPassword != "" && $scope.user.confirmPassword != null && $scope.user.password == $scope.user.confirmPassword) {
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
          $scope.bothPasswordReq = false;
        } else {
          $scope.bothPasswordReq = true;
        };

        if ($scope.user.firstName != "" && $scope.user.firstName != null && $scope.user.lastName != "" && $scope.user.lastName != null && $scope.user.email != "" && $scope.user.email != null && $scope.user.password != "" && $scope.user.password != null && $scope.user.confirmPassword != "" && $scope.user.confirmPassword != null && $scope.user.password == $scope.user.confirmPassword) {
          $state.go("account");
        };
      }, function(error) {
        console.log(error);
      });
  };

  // DELETE USER
  $scope.deleteUser = function(user) {
    userService.delete($stateParams.id, user)
      .then(function(response) {
        console.log(response.data);
        console.log($scope.users);
        $state.go("home");
      }, function(error) {
        console.log(error);
      });
  };

  // LOGIN FORM VALIDATION (ASTERISK) HIDES ON DEFAULT
  $scope.errorMessage = false;

  // USER LOGIN
  $scope.login = function(user) {
    userService.getUsers()
      .then(function(response) {
        console.log("Users:", response);
        // if user's email and password does not match database, login form validation error will show; or else, it will stay hidden and proceed to users view (as logged in user)
        for (var i = 0; i < response.data.length; i++) {
          if (response.data[i].email == user.email && response.data[i].password == user.password) {
            $scope.errorMessage = false;
            userService.setCurrentUser(response.data[i].id);
            $state.go("dashboard");
            break; // stops error message in else block from running if log in is correct
          } else {
            $scope.errorMessage = true;
          };
        };
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  // USER LOGOUT
  $scope.logout = function() {
    userService.setCurrentUser(0);
    $state.go("home");
  };

  // DELETE MESSAGE
  $scope.deleteMessage = function(){
    userService.getUser(userService.currentUserReturn())
    .then(function(response){
      var put = ({
        id: response.data.id, firstName: response.data.firstName, lastName: response.data.lastName, email: response.data.email, password: response.data.password, confirmPassword: response.data.confirmPassword, phoneNumber: response.data.phoneNumber, address: response.data.address
      })
      userService.putUser(response.data.id, put)
    }).then(function(){
      $state.go("dashboard");
    });
  };

});