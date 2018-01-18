app.controller("petController", function ($scope, $state, $stateParams, $http, petService, userService) {



  //ADDS A NEW PET FOR CURRENT USER
  $scope.addPet = function () {
    var newPet = ({
      Name: $scope.petName, Description: $scope.description, Image: $scope.image, LostSince: $scope.missingSince, LastKnownLoc: $scope.lastKnownLocation, Status: $scope.status, OwnerId: userService.currentUserReturn()
    })
    petService.postPet(newPet);
    setTimeout(function () {
      $state.go("pets");
    }, 500)
  }

  //REPORTS LOST PET TO LIST OF LOST PETS
  $scope.lost = function (pet) {
    petService.setCurrentLostPet(pet)
    $state.go("lostUpdate");
  }

  //CHANGES PET STATUS TO LOST AND ADDS LAST KNOWN LOCATION
  $scope.report = function () {
    var petInfo = ({
      id: petService.returnLostPet().id, name: petService.returnLostPet().name, image: petService.returnLostPet().image, lastKnownLoc: $scope.lostLocation, status: "Lost", lostSince: $scope.lostDate, description: petService.returnLostPet().description, ownerId: petService.returnLostPet().ownerId
    })
    petService.updatePetLost(petInfo).then(function(){
      $state.go("lostPets");
    })
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
    petService.setCurrentPet(pet);
    $state.go("petCreate")
  }

  //HIDES PET EDIT BUTTON SHOWS ADD BUTON
  $scope.hidePetEdit = true; 
  $scope.hideAddPet = false; 

  // LOADS PET FORM FOR EDITING
  if (petService.returnCurrentPet() != null) {
    $scope.hidePetEdit = false; 
    $scope.hideAddPet = true; 
    $scope.petName = petService.returnCurrentPet().name;
    $scope.description = petService.returnCurrentPet().description;
    $scope.image = petService.returnCurrentPet().image;
    $scope.status = petService.returnCurrentPet().status;
    $scope.missingSince = petService.returnCurrentPet().lostSince;
    $scope.lastKnownLocation = petService.returnCurrentPet().lastKnownLoc;
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
  if (petService.returnCurrentPet() != null) {
    $scope.getOwnerInfo();
  };

  //UPDATE PET BUTTON 
  $scope.updatePet = function (){
    var updatePet = ({ id: petService.returnCurrentPet().id,
      Name: $scope.petName, Image: $scope.image, Description: $scope.description,  LostSince: $scope.missingSince, LastKnownLoc: $scope.lastKnownLocation, Status: $scope.status, OwnerId: userService.currentUserReturn()
    })
    petService.updatePet(updatePet);
    setTimeout(function () {
      $state.go("pets");
    }, 500)
  }
  
  //DELETES PET
  $scope.deletePet = function(){
    petService.deletePet().then(function(){
       $state.go("pets");
    })
  }

  //NOTIFY SUBMIT BUTTON
  $scope.notifySubmit = function () {
    var owner = ({
      id: $scope.owner.id, firstName: $scope.owner.firstName, lastName: $scope.owner.lastName, email: $scope.owner.email, password: $scope.owner.password, phoneNumber: $scope.owner.phoneNumber, address: $scope.owner.address, message: $scope.notifyMessage
    })
    userService.setOwner($scope.owner.id);
    userService.messageOwner(owner);
    $state.go("lostPets");
  }


});