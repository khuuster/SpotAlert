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
});