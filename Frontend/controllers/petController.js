app.controller("petController", function ($scope, $state, $stateParams, $http, petService, userService) {

  // CONNECTS SERVICE TO USE IN HTML FILES
  $scope.petService = petService;

  // PET NAME, DESCRIPTION, IMAGE, AND STATUS FORM VALIDATION (ASTERISK) HIDES ON DEFAULT
  $scope.petNameReq = false;
  $scope.descriptionReq = false;
  $scope.imageReq = false;
  $scope.statusReq = false;
  $scope.missingSinceReq = false;
  $scope.lastKNownLocationReq = false;

  // ADDS A NEW PET FOR CURRENT USER
  $scope.addPet = function() {
    var newPet = ({
      Name: $scope.petName, Description: $scope.description, Image: $scope.image, LostSince: $scope.missingSince, LastKnownLoc: $scope.lastKnownLocation, Status: $scope.status, OwnerId: userService.currentUserReturn()
    });

    if ($scope.petName == "" || $scope.petName == null) {
      $scope.petNameReq = true;
    } else {
      $scope.petNameReq = false;
    };
    if ($scope.description == "" || $scope.description == null) {
      $scope.descriptionReq = true;
    } else {
      $scope.descriptionReq = false;
    };
    if ($scope.image == "" || $scope.image == null) {
      $scope.imageReq = true;
    } else {
      $scope.imageReq = false;
    };
    if ($scope.status == "" || $scope.status == null) {
      $scope.statusReq = true;
    } else {
      $scope.statusReq = false;
    };
    if ($scope.missingSince == "" || $scope.missingSince == null) {
      $scope.missingSinceReq = true;
    } else {
      $scope.missingSinceReq = false;
    };
    if ($scope.lastKnownLocation == "" || $scope.lastKnownLocation == null) {
      $scope.lastKnownLocationReq = true;
    } else {
      $scope.lastKnownLocationReq = false;
    };

    if ($scope.petName != "" && $scope.petName != null && $scope.description != "" && $scope.description != null && $scope.image != "" && $scope.image != null && $scope.status != "" && $scope.status != null) {
      petService.postPet(newPet);
      setTimeout(function() {
        $state.go("pets");
      }, 500);
    };
  };

  // REPORTS LOST PET TO LIST OF LOST PETS
  $scope.lost = function(pet) {
    petService.setCurrentLostPet(pet)
    $state.go("lostUpdate");
    petService.setCurrentPet(pet)
    $state.go("lostUpdate");
  };

  // LOST DATE AND LAST KNOWN LOCATION FORM VALIDATION (ASTERISK) HIDES ON DEFAULT
  $scope.missingReq = false;
  $scope.locationReq = false;

  // CHANGES PET STATUS TO LOST AND ADDS LAST KNOWN LOCATION
  $scope.report = function() {
    var petInfo = ({
      id: petService.returnLostPet().id, name: petService.returnLostPet().name, image: petService.returnLostPet().image, lastKnownLoc: $scope.lostLocation, status: "lost", lostSince: $scope.lostDate, description: petService.returnLostPet().description, ownerId: petService.returnLostPet().ownerId
    });

    if ($scope.lostDate == "" || $scope.lostDate == null) {
      $scope.missingReq = true;
    } else {
      $scope.missingReq = false;
    };
    if ($scope.lostLocation == "" || $scope.lostLocation == null) {
      $scope.locationReq = true;
    } else {
      $scope.locationReq = false;
    };

    if ($scope.lostDate != "" && $scope.lostDate != null && $scope.lostLocation != "" && $scope.lostLocation != null) {
      petService.updatePetLost(petInfo).then(function() {
        // petService.setCurrentPet(null);
        $state.go("lostPets");
      });
    };
  };

  // LOADS ALL PETS FOR CURRENT USER
  $scope.loadPets = function() {
    petService.getAllPets()
    .then(function(response) {
      var ownerPets = [];
      for (var i = 0; i < response.data.length; i++) {
        if (userService.currentUserReturn() == response.data[i].ownerId) {
            ownerPets.push(response.data[i]);
        };
      };
      $scope.myPets = ownerPets;
    });
  };

  $scope.loadPets();

  // GETS ALL LOST PETS 
  $scope.loadAllPets = function() {
    petService.getAllPets().then(function(response) {
      var lostPets = [];
      for(var i = 0; i < response.data.length; i++) {
        if (response.data[i].status == "lost") {
          lostPets.push(response.data[i]);
        };
      };
      // console.log(lostPets)
      $scope.allPets = lostPets; 
    });
  };

  $scope.loadAllPets();

  // EDITS PET
  $scope.editPet = function(pet) {
    petService.setCurrentPet(pet);
    $state.go("petCreate");
  };

  // HIDES PET EDIT BUTTON AND SHOWS ADD BUTTON
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
  };

  // FOUND PET BUTTON NOTIFY OWNER
  $scope.found = function(pets) {
    petService.setCurrentPet(pets);
    $state.go("notifyOwner");
  };

  // GET OWNER FOR LOST PET
  $scope.getOwnerInfo = function() {
    var currentPet = petService.returnCurrentPet();
    userService.getOwnerById(currentPet.ownerId).then(function(response) {
      $scope.owner = response.data;
    });
  };

  if (petService.returnCurrentPet() != null) {
    $scope.getOwnerInfo();
  };

  // UPDATE PET BUTTON 
  $scope.updatePet = function() {
    var updatePet = ({
      id: petService.returnCurrentPet().id,
      Name: $scope.petName, Image: $scope.image, Description: $scope.description, LostSince: $scope.missingSince, LastKnownLoc: $scope.lastKnownLocation, Status: $scope.status, OwnerId: userService.currentUserReturn()
    });

    if ($scope.petName == "" || $scope.petName == null) {
      $scope.petNameReq = true;
    } else {
      $scope.petNameReq = false;
    };
    if ($scope.description == "" || $scope.description == null) {
      $scope.descriptionReq = true;
    } else {
      $scope.descriptionReq = false;
    };
    if ($scope.image == "" || $scope.image == null) {
      $scope.imageReq = true;
    } else {
      $scope.imageReq = false;
    };
    if ($scope.status == "" || $scope.status == null) {
      $scope.statusReq = true;
    } else {
      $scope.statusReq = false;
    };
    if ($scope.missingSince == "" || $scope.missingSince == null) {
      $scope.missingSinceReq = true;
    } else {
      $scope.missingSinceReq = false;
    };
    if ($scope.lastKnownLocation == "" || $scope.lastKnownLocation == null) {
      $scope.lastKnownLocationReq = true;
    } else {
      $scope.lastKnownLocationReq = false;
    };

    if ($scope.petName != "" && $scope.petName != null && $scope.description != "" && $scope.description != null && $scope.image != "" && $scope.image != null && $scope.status != "" && $scope.status != null) {
      petService.updatePet(updatePet).then(function() {
        // petService.setCurrentPet(null);
        $state.go("pets");
      });
    };
  };

  // DELETES PET
  $scope.deletePet = function() {
    petService.deletePet().then(function() {
      petService.setCurrentPet(null);
      $state.go("pets");
    });
  };

  $scope.messageDateReq = false;
  $scope.messageNameReq = false;
  $scope.messageNumberReq = false;
  $scope.messageEmailReq = false;
  $scope.messageReq = false;
  
  // NOTIFY SUBMIT BUTTON
  $scope.notifySubmit = function() {
    var owner = ({
      id: $scope.owner.id, firstName: $scope.owner.firstName, lastName: $scope.owner.lastName, email: $scope.owner.email, password: $scope.owner.password, phoneNumber: $scope.owner.phoneNumber, address: $scope.owner.address, messageDate: $scope.messageDate, messageName: $scope.messageName, messageNumber: $scope.messageNumber, messageEmail: $scope.messageEmail, message: $scope.message
    });

    if ($scope.messageDate == "" || $scope.messageDate == null) {
      $scope.messageDateReq = true;
    } else {
      $scope.messageDateReq = false;
    };
    if ($scope.messageName == "" || $scope.messageName == null) {
      $scope.messageNameReq = true;
    } else {
      $scope.messageNameReq = false;
    };
    if ($scope.messageNumber == "" || $scope.messageNumber == null) {
      $scope.messageNumberReq = true;
    } else {
      $scope.messageNumberReq = false;
    };
    if ($scope.messageEmail == "" || $scope.messageEmail == null) {
      $scope.messageEmailReq = true;
    } else {
      $scope.messageEmailReq = false;
    };
    if ($scope.message == "" || $scope.message == null) {
      $scope.messageReq = true;
    } else {
      $scope.messageReq = false;
    };

    if ($scope.messageDate != "" && $scope.messageDate != null && $scope.messageName != "" && $scope.messageName != null && $scope.messageNumber != "" && $scope.messageNumber != null && $scope.messageEmail != "" && $scope.messageEmail != null && $scope.message != "" && $scope.message != null) {
      userService.setOwner($scope.owner.id);
      userService.messageOwner(owner).then(function() {
        petService.setCurrentPet(null); {
          $state.go("lostPets");
        };
      });
    };
  };

  // GOOGLE API MAP FUNCTION
  var initMap = function() {
    var uluru = { lat: petService.returnLat(), lng: petService.returnLng() };
    console.log(petService.returnLat(), petService.returnLng())
    var map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: petService.returnLat(), lng: petService.returnLng() },
      zoom: 18
    });
    var marker = new google.maps.Marker({
      position: uluru,
      map: map
    });
  };
    
  // GOOGLE MAP LOCATION BUTTON 
  $scope.map = function(loc) {
    console.log(loc);
    petService.getLatLong(loc).then(function() {
      console.log(loc);
      initMap();
    });
  };

});