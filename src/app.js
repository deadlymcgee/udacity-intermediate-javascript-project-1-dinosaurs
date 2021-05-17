import data from "./dino.json"
import images from "./images/*.png"

// TODO: Refactor using module reveal pattern
// Create Dino Constructor
function Dino ({species, weight, height, diet, where, when, fact}) {
  this.species = species;
  this.weight = weight;
  this.height = height;
  this.diet = diet;
  this.where = where;
  this.when = when;
  this.fact = fact;

  this.setFact = function (fact) {
    if (this.species === "Pigeon") {
      return "Pigeon fact cannot be changed!";
    }
    else {
      this.fact = fact;
      return "OK!"
    }
  };
  this.generateElementString = function () {
    return `
      <div>
          <h2>${this.species}</h2>
          <img src="${images[this.species.toLowerCase()]}" alt="">
          <p>${this.fact}</p>
      </div>
    `;
  };

  this.compareWeight = function (human) {
    return "comparing weight!";
  };

  this.compareHeight = function (human) {
    return "comparing height!";
  };

  this.compareDiet = function (human) {
    return "comparing diet!";
  };

  this.methodList = [
      this.compareHeight,
      this.compareWeight,
      this.compareDiet,
      this.setFact
  ]
}

// Human Constructor
function Human({name, feet, inches, weight, diet}) {
  this.name = name;
  this.feet = feet;
  this.inches = inches;
  this.weight = weight;
  this.diet = diet;

  this.generateElementString = function () {
    return `
      <h2>${this.name}</h2>
      <img src="${images["human"]}" alt="">
    `;
  }
}
// Create Dino Objects
let dinos = data.Dinos.map(dino => {
   return new Dino(dino);
})
console.log(images);
console.log(dinos);


    // Create Human Object
let createHuman = (function () {
  let data = {};

  return {
    getHumanFormData: function (dinoForm) {
      const formData = new FormData(dinoForm);
      for (const field of formData) {
        data[field[0]] = field[1];
      }
      return new Human(data);
    }
  }

}());

    // Use IIFE to get human data from form
// (function (formElement) {
//   console.log(formElement);
// }(dinoForm));

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function randomlyCallMethod(dino, human) {
  const result = getRandomInt(4);
  const randomMethod = dino.methodList[result];
  if (result < 3) {
    dino.setFact(randomMethod());
  }
}
    // Create Dino Compare Method 1
    // NOTE: Weight in JSON file is in lbs, height in inches. 

    
    // Create Dino Compare Method 2
    // NOTE: Weight in JSON file is in lbs, height in inches.

    
    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.


    // Generate Tiles for each Dino in Array
  
        // Add tiles to DOM
function addTiles() {
  let grid = document.getElementById("grid");
  dinos.forEach((dino, index) => {
    (dino instanceof Dino) && randomlyCallMethod(dino);
    let container = document.createElement("div");
    container.className = "grid-item";
    container.innerHTML = dino.generateElementString();
    grid.appendChild(container);
  })
}

// On button click, prepare and display infographic
const button = document.getElementById("btn");
button.addEventListener("click", (function () {

  return function () {
    console.log("comparing!")
    const dinoForm = document.getElementById("dino-compare");
    dinos.splice(4, 0, createHuman.getHumanFormData(dinoForm));
    // Remove form from screen
    dinoForm.remove();
    addTiles();
  }
}()));