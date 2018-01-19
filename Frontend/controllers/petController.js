app.controller("petController", function ($scope, $state, $stateParams, $http, petService, userService) {

  //CONNECTS SERVICE TO USE IN HTML FILES
  $scope.petService = petService;

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
    petService.setCurrentPet(pet)
    $state.go("lostUpdate");
  }

  //CHANGES PET STATUS TO LOST AND ADDS LAST KNOWN LOCATION
  $scope.report = function () {
    var petInfo = ({
      id: petService.returnLostPet().id, name: petService.returnLostPet().name, image: petService.returnLostPet().image, lastKnownLoc: $scope.lostLocation, status: "lost", lostSince: $scope.lostDate, description: petService.returnLostPet().description, ownerId: petService.returnLostPet().ownerId
    })
    petService.updatePetLost(petInfo).then(function () {
      petService.setCurrentPet(null);
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
  $scope.updatePet = function () {
    var updatePet = ({
      id: petService.returnCurrentPet().id,
      Name: $scope.petName, Image: $scope.image, Description: $scope.description, LostSince: $scope.missingSince, LastKnownLoc: $scope.lastKnownLocation, Status: $scope.status, OwnerId: userService.currentUserReturn()
    })
    petService.updatePet(updatePet).then(function () {
      petService.setCurrentPet(null);
      $state.go("pets");
    })
  }

  //DELETES PET
  $scope.deletePet = function () {
    petService.deletePet().then(function () {
      petService.setCurrentPet(null);
      $state.go("pets");
    })
  }

  $scope.messageNameReq = false;
  $scope.messageNumberReq = false;
  $scope.messageEmailReq = false;
  $scope.messageReq = false;
  
  //NOTIFY SUBMIT BUTTON
  $scope.notifySubmit = function () {
    var owner = ({
      id: $scope.owner.id, firstName: $scope.owner.firstName, lastName: $scope.owner.lastName, email: $scope.owner.email, password: $scope.owner.password, phoneNumber: $scope.owner.phoneNumber, address: $scope.owner.address, messageName: $scope.messageName, messageNumber: $scope.messageNumber, messageEmail: $scope.messageEmail, message: $scope.message
    })

    userService.setOwner($scope.owner.id);
    userService.messageOwner(owner).then(function(){
      petService.setCurrentPet(null); {
        $state.go("lostPets");
      }
    })
  }

  //GOOGLE API MAP FUNCTION
 var initMap = function () {
  console.log(petService.returnLat(), petService.returnLng())
        var map = new google.maps.Map(document.getElementById('map'), {
          center: { lat: petService.returnLat(), lng: petService.returnLng() },
          zoom: 17
        });
        var marker = new google.maps.Marker({
          position: { lat: petService.returnLat(), lng: petService.returnLng() },
          map: map
        });
      }
    
  //MAP BUTTON 
  $scope.map = function (loc) {
    petService.getLatLong(loc).then(function(){
      console.log(loc);
      initMap();

    })
  }

  var fsClient = filestack.init('AVrUbKD1iRt63Dm4iq8S2z');
  function openPicker() {
    fsClient.pick({
      fromSources:["url"]
    }).then(function(response) {
      // declare this function to handle response
      handleFilestack(response);
    });
  }

});