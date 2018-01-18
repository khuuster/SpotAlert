app.service("petService", function ($http) {
  
  //POSTS NEW PET
  this.postPet = function (pet) {
    return $http.post("http://localhost:5000/api/pets/", pet);
  };

  //GETS ALL PETS
  this.getAllPets = function(){
    return $http.get("http://localhost:5000/api/pets/")
  }

  // SET CURRENT PET VIEWED
  var currentPet = null;
  this.setCurrentPet = function(pet){
    currentPet = pet; 
    console.log(currentPet);
  }

  //GETS CURRENT PET
  this.returnCurrentPet = function(){
    return currentPet; 
  }

  //sets current pet for report lost pet
    var currentLostPet = null;
  this.setCurrentLostPet = function(pet){
    currentLostPet = pet; 
  }
//returns current lost pet
  this.returnLostPet = function(){
    return currentLostPet; 
  }

  //UPDATES LOST PET STATUS AND KNOWN LOCATION
  this.updatePetLost = function(pet){
    return $http.put("http://localhost:5000/api/pets/" + currentLostPet.id, pet)
  }

  //UPDATES PET 
  this.updatePet = function(pet){
    return $http.put("http://localhost:5000/api/pets/" + currentPet.id, pet)
  }

  //DELTE PET
  this.deletePet = function(){
    return $http.delete("http://localhost:5000/api/pets/" + currentPet.id)
  }
});