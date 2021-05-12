import data from "./dino.json"

// Create Dino Constructor
function Dino ({species, weight, height, diet, where, when, fact}) {
  this.species = species;
  this.weight = weight;
  this.height = height;
  this.diet = diet;
  this.where = where;
  this.when = when;
  this.fact = fact;

  this.element = `
    <div>
        <h2>${this.species}</h2>
    </div>
  `;
  this.getRandomFact = function () {
    console.log("random facts!");
  };
  this.getDinoElement = function () {
    return this.element;
  };
}

// Create Dino Objects
let dinos = data.Dinos.map(dino => {
   return new Dino(dino);
})

console.log(dinos);


const dinoForm = document.getElementById("dino-compare");


    // Create Human Object
let createHuman = (function () {
  let human = {};

  return {
    getHumanFormData: function (dinoForm) {
      const formData = new FormData(dinoForm);
      human.name = formData.get("name");
      human.height = {
        feet: formData.get("feet"),
        inches: formData.get("inches")
      };
      human.weight = formData.get("weight");
      human.diet = formData.get("diet");
      return human;
    }
  }

}());

    // Use IIFE to get human data from form
// (function (formElement) {
//   console.log(formElement);
// }(dinoForm));

    // Create Dino Compare Method 1
    // NOTE: Weight in JSON file is in lbs, height in inches. 

    
    // Create Dino Compare Method 2
    // NOTE: Weight in JSON file is in lbs, height in inches.

    
    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.


    // Generate Tiles for each Dino in Array
  
        // Add tiles to DOM

    // Remove form from screen
function removeDinoForm() {
  // const dinoForm = document.getElementById("dino-compare");
  dinoForm.remove();
}

// On button click, prepare and display infographic
const button = document.getElementById("btn");
button.addEventListener("click", (function () {

  return function () {
    console.log("comparing!")
    const dinoForm = document.getElementById("dino-compare");
    let human = createHuman.getHumanFormData(dinoForm);
    // removeDinoForm();
  }
}()));