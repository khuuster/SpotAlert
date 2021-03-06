app.service("petService", function ($http) {
  
  // POSTS NEW PET
  this.postPet = function (pet) {
    return $http.post("http://localhost:5000/api/pets/", pet);
  };

  // GETS ALL PETS
  this.getAllPets = function() {
    return $http.get("http://localhost:5000/api/pets/");
  };

  // SET CURRENT PET VIEWED
  var currentPet = null;
  this.setCurrentPet = function(pet) {
    currentPet = pet; 
    console.log(currentPet);
  };

  // GETS CURRENT PET
  this.returnCurrentPet = function() {
    return currentPet; 
  };

  // SETS CURRENT PET FOR REPORT LOST PET
  var currentLostPet = null;
  this.setCurrentLostPet = function(pet) {
    currentLostPet = pet; 
  };

  // RETURNS CURRENT LOST PET
  this.returnLostPet = function() {
    return currentLostPet; 
  };

  // UPDATES LOST PET STATUS AND KNOWN LOCATION
  this.updatePetLost = function(pet){
    return $http.put("http://localhost:5000/api/pets/" + currentLostPet.id, pet);
  };

  //UPDATES PET 
  this.updatePet = function(pet){
    return $http.put("http://localhost:5000/api/pets/" + currentPet.id, pet);
  };

  //DELTE PET
  this.deletePet = function() {
    return $http.delete("http://localhost:5000/api/pets/" + currentPet.id);
  };

  // GETS LAT LONG FROM GOOGLE
  // API KEY: AIzaSyDKGHq0MzAIJPw-VzzVqoIU8YA4PsSRKQQ
  var currentLat = 0;
  var currentLng = 0;
  this.getLatLong = function(loc) {
    return $http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + loc + '&key=AIzaSyDKGHq0MzAIJPw-VzzVqoIU8YA4PsSRKQQ').then(function(response) {
    currentLat = response.data.results[0].geometry.location.lat;
    currentLng = response.data.results[0].geometry.location.lng;
    });
  };
  
  //RETURNS HELD LAT
  this.returnLat = function() {
    return currentLat; 
  };

  //RETURNS HELD LONG
  this.returnLng = function() {
    return currentLng; 
  };

});