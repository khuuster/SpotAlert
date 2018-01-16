app.controller("petController", function ($scope, $state, $stateParams, $http, petService, userService) {



  //ADDS A NEW PET FOR CURRENT USER
  $scope.addPet = function(){
    var newPet = ({Name: $scope.petName, Description: $scope.description,  
      Status: "not lost", OwnerId: userService.currentUserReturn()
    }) 
    petService.postPet(newPet);
    $state.go("pets");
  }

// LOADS ALL PETS FOR CURRENT USER
$scope.loadPets = function(){
  petService.getAllPets().then(
    function(response){
      var ownerPets = [];
      for(var i = 0; i < response.data.length; i++){
        if(userService.currentUserReturn() == response.data[i].ownerId){
          ownerPets.push(response.data[i])
        }
      }
     $scope.myPets = ownerPets; 
    }
  )
}
$scope.loadPets();

//EDITS PET
$scope.editPet = function(pet){
console.log(pet);
}

});