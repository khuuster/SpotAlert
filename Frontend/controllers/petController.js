app.controller("petController", function ($scope, $state, $stateParams, $http, petService, userService) {



  //ADDS A NEW PET FOR CURRENT USER
  $scope.addPet = function () {
    var newPet = ({
      Name: $scope.petName, Description: $scope.description,
      Status: "not lost", OwnerId: userService.currentUserReturn()
    })
    petService.postPet(newPet);
    setTimeout(function () {
      $state.go("pets");
    }, 500)
  }

  //REPORTS LOST PET TO LIST OF LOST PETS
  $scope.lost = function(pet){
    petService.setCurrentLostPet(pet);
    $state.go("lostUpdate");
  }

  //CHANGES PET STATUS TO LOST AND ADDS LAST KNOWN LOCATION
  $scope.report = function(){
    
        petService.updatePet(petService.returnLostPet().id)
  }
  
  // LOADS ALL PETS FOR CURRENT USER
  $scope.loadPets = function () {
    petService.getAllPets().then(
      function (response) {
        var ownerPets = [];
        for (var i = 0; i < response.data.length; i++) {
          if (userService.currentUserReturn() == response.data[i].ownerId) {
            ownerPets.push(response.data[i])
          }
        }
        $scope.myPets = ownerPets;
      }
    )
  }
  $scope.loadPets();



  //GETS ALL PETS 
  $scope.loadAllPets = function () {
    petService.getAllPets().then(function (response) {
      $scope.allPets = response.data;
    })
  }
  $scope.loadAllPets();

  //EDITS PET
  $scope.editPet = function (pet) {
    console.log(pet);
  }

  //FOUND PET BUTTON NOTIFY OWNER
  $scope.found = function (pets) {
    petService.setCurrentPet(pets);
    $state.go("notifyOwner");
  }
  //GET OWNER FOR LOST PET
  $scope.getOwnerInfo = function () {
    var currentPet = petService.returnCurrentPet();
    userService.getOwnerById(currentPet.ownerId).then(function (response) {
        $scope.owner = response.data;
      })
  }
  if(petService.returnCurrentPet() != null){
    $scope.getOwnerInfo();
  };

  //NOTIFY SUBMIT BUTTON
  $scope.notifySubmit = function(){
    var owner = ({
      id: $scope.owner.id, firstName: $scope.owner.firstName, lastName: $scope.owner.lastName, email: $scope.owner.email, password: $scope.owner.password, phoneNumber: $scope.owner.phoneNumber, address: $scope.owner.address, message: $scope.notifyMessage
    })
    userService.setOwner($scope.owner.id);
    userService.messageOwner(owner);
    $state.go("lostPets");
  }
  

});