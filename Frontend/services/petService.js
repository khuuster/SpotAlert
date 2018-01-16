app.service("petService", function ($http) {
  
  //POSTS NEW PET
  this.postPet = function (pet) {
    return $http.post("http://localhost:5000/api/pets/", pet);
  };

  //GETS ALL PETS
  this.getAllPets = function(){
    return $http.get("http://localhost:5000/api/pets/")
  }
});