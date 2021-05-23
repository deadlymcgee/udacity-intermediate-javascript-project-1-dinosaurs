import data from "./dino.json"
import images from "./images/*.png"

// TODO: Refactor using module reveal pattern
const dinoFactory = function(
    {species, weight, height, diet, where, when, fact}
    // dino,
) {

  // function Dino (dino) {
  //   this.species = dino.species
  //   return Object.create(dinoProto);
  // }
  // let newDino = Object.create(dinoProto);
  // this.species = dino.species;
  let _species = species;
  let _weight = weight;
  let _height = height;
  let _diet = diet;
  let _where = where;
  let _when = when;
  let _fact = fact;
  // newDino.species = dino.species;
  // function Dino () {
  //   this.species = dino;
  // }
  // newDino.weight = weight;
  // newDino.height = height;
  // newDino.diet = diet;
  // newDino.where = where;
  // newDino.when = when;
  // newDino.fact = fact;

  function getSpecies() {
    return _species;
  }

  function getFact() {
    return _fact;
  }

  function setFact(fact) {
    _fact = fact;
  }

  function getHeight() {
    return _height;
  }

  function getWeight() {
    return _weight;
  }

  function getDiet() {
    return _diet;
  }

  function createDino() {
    return {
      setFact: function (fact) {
        if (getSpecies() === "Pigeon") {
          return "Pigeon fact cannot be changed!";
        }
        else {
          setFact(fact);
          return "OK!"
        }
      },

      generateElementString: function () {
        return `
        <h2>${getSpecies()}</h2>
        <img src="${images[getSpecies().toLowerCase()]}" alt="">
        <p>${getFact()}</p>
    `;
      },

      compareWeight: function (human) {
        return `You are ${human.weight < getWeight() ? "lighter" : "heavier"} than ${getSpecies()}`;
      },

      compareHeight: function (human) {
        return `You are ${human.getHeightInInches() < getHeight() ? "shorter" : "taller"} 
      than ${getSpecies()}`;
      },

      compareDiet: function (human) {
        return `You and ${getSpecies()} have ${getDiet() === human.diet.toLowerCase() ? "the same" : "a different"} diet`;
      },

      getMethodList: function() {
        return [
          createDino().compareHeight,
          createDino().compareWeight,
          createDino().compareDiet,
          setFact
        ]
      }
    }
  }

  // return newDino;
  // return Object.create(proto);
  return Object.create(createDino());
  // return function () {
  //   return Object.create(dinoProto);
  // }
};

// Human Constructor
function Human({name, feet, inches, weight, diet}) {
  this.name = name;
  this.feet = feet;
  this.inches = inches;
  this.weight = weight;
  this.diet = diet;

  this.getHeightInInches = function() {
    return (parseInt(this.feet) * 12) + parseInt(this.inches);
  }

  this.generateElementString = function () {
    return `
      <h2>${this.name}</h2>
      <img src="${images["human"]}" alt="">
    `;
  }
}
// Create Dino Objects
let dinos = data.Dinos.map(dino => {
   return dinoFactory(dino);
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
  const randomMethod = dino.getMethodList()[result];
  if (result < 3) {
    // set 'this' in the Dino method using 'call'
    dino.setFact(randomMethod(human));
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
function addTiles(human) {
  let grid = document.getElementById("grid");
  dinos.forEach((dino, index) => {
    // (dino instanceof Dino) && randomlyCallMethod(dino, human);
    index === 5 && randomlyCallMethod(dino, human);
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
    let human = createHuman.getHumanFormData(dinoForm);
    dinos.splice(4, 0, human);
    // Remove form from screen
    dinoForm.remove();
    addTiles(human);
  }
}()));