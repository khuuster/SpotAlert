var app = angular.module("spotAlert", ["ui.router"])

app.config(function($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise("/");

  $stateProvider
    // HOME VIEW
    .state("home", {
      url: "/",
      templateUrl: "./views/home.html"
    })

    // USER LOGIN VIEW
    .state("login", {
      url: "/user",
      templateUrl: "./views/login.html",
      controller: "userController"
    })

    // USER CREATE VIEW
    .state("userCreate", {
      url: "/users/new",
      templateUrl: "./views/login-form.html",
      controller: "userController"
    })

    // USER SHOW VIEW (ACCOUNT)
    .state("account", {
      url: "/account",
      templateUrl: "./views/account.html",
      controller: "accountController"
    })

    // USER UPDATE VIEW BY ID
    .state("userUpdate", {
      url: "/users/:id/edit",
      templateUrl: "./views/login-form.html",
      controller: "userController"
    })

    // USER DASHBOARD VIEW (CURRENT USER AFTER LOGGED IN)
    .state("dashboard", {
      url: "/users",
      templateUrl: "./views/dashboard.html",
      controller: "userController"
    })

    // PETS LIST VIEW
    .state("pets", {
      url: "/pets",
      templateUrl: "./views/pets.html",
      controller: "petController"
    })

    // PET CREATE VIEW
    .state("petCreate", {
      url: "/pets/new",
      templateUrl: "./views/pets-form.html",
      controller: "petController"
    })

    // PET SHOW VIEW BY ID
    .state("pet", {
      url: "/pets/:id",
      templateUrl: "./views/pet.html",
      controller: "petController"
    })

    // PET UPDATE VIEW BY ID
    .state("petUpdate", {
      url: "/pets/:id/edit",
      templateUrl: "./views/pets-form.html",
      controller: "petController"
    })

    // LIST OF LOST PETS
    .state("lostPets", {
      url: "/lostpets",
      templateUrl: "./views/lostpets.html",
      controller: "petController"
    })

    // MISSION
    .state("mission", {
      url: "/mission",
      templateUrl: "./views/mission.html",
    })       

    // VISION
    .state("vision", {
      url: "/vision",
      templateUrl: "./views/vision.html",
    })

    // VALUES
    .state("values", {
      url: "/values",
      templateUrl: "./views/values.html",
    })

    // CONTACT US
    .state("contact", {
      url: "/contact",
      templateUrl: "./views/contact.html",
    })    

    // DEVELOPERS
    .state("developers", {
      url: "/developers",
      templateUrl: "./views/developers.html",
    })    

    // LOGOUT
    .state("logout", {
      url: "/",
      templateUrl: "./views/home.html",
      controller: "userController"
    })    

})