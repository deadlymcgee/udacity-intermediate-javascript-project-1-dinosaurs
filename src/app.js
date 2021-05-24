import data from "./dino.json"
import images from "./images/*.png"

// TODO: Refactor using module reveal pattern
/**
 * @description Factory function that creates a Dinosaur object with shared methods and private attributes
 * @param {Object} dino - An object representing a Dinosaur from a JSON file
 * @returns {Object} - A Dinosaur object
 */
const dinoFactory = function(
    {species, weight, height, diet, where, when, fact}
) {
  let _type = "Dino";
  let _species = species;
  let _weight = weight;
  let _height = height;
  let _diet = diet;
  let _where = where;
  let _when = when;
  let _fact = fact;

  /**
   * @description Gets the Object type
   * @returns {string}
   */
  function getType() {
    return _type;
  }

  /**
   * @description Gets the species
   * @returns {string}
   */
  function getSpecies() {
    return _species;
  }

  /**
   * @description Gets the fact
   * @returns {string}
   */
  function getFact() {
    return _fact;
  }

  /**
   * @description Sets the fact
   * @param {string} fact
   */
  function setFact(fact) {
    _fact = fact;
  }

  /**
   * @description Gets the height
   * @returns {string}
   */
  function getHeight() {
    return _height;
  }

  /**
   * @description Gets the weight
   * @returns {string}
   */
  function getWeight() {
    return _weight;
  }

  /**
   * @description Gets the diet
   * @returns {string}
   */
  function getDiet() {
    return _diet;
  }

  /**
   * @description Creates the object containing the shared public methods to be used as the prototype
   * @returns {Object} - the prototype object
   */
  function createDino() {
    return {
      /**
       * @description Gets the Object type
       * @returns {string}
       */
      getType: function () {
        return getType();
      },

      /**
       * @description Sets the fact for Dinosaurs not of species Pigeon
       * @param {string} fact
       * @returns {string} - the status of the operation
       */
      setFact: function (fact) {
        if (getSpecies() === "Pigeon") {
          return "Pigeon fact cannot be changed!";
        }
        else {
          setFact(fact);
          return "OK!"
        }
      },

      /**
       * @description Generate a string representing the HTML element of the Dinosaur
       * @returns {string}
       */
      generateElementString: function () {
        return `
        <h2>${getSpecies()}</h2>
        <img src="${images[getSpecies().toLowerCase()]}" alt="">
        <p>${getFact()}</p>
    `;
      },

      /**
       * @description Compares the weight of the Dinosaur to the weight of the Human
       * @param {Object} human - An Object representing the Human
       * @returns {string} - The result of the comparison
       */
      compareWeight: function (human) {
        return `You are ${human.weight < getWeight() ? "lighter" : "heavier"} than ${getSpecies()}`;
      },

      /**
       * @description Compares the height of the Dinosaur to the height of the Human
       * @param {Object} human - An Object representing the Human
       * @returns {string} - The result of the comparison
       */
      compareHeight: function (human) {
        return `You are ${human.getHeightInInches() < getHeight() ? "shorter" : "taller"} 
      than ${getSpecies()}`;
      },

      /**
       * @description Compares the diet of the Dinosaur to the diet of the Human
       * @param {Object} human - An Object representing the Human
       * @returns {string} - The result of the comparison
       */
      compareDiet: function (human) {
        return `You and ${getSpecies()} have ${getDiet() === human.diet.toLowerCase() ? "the same" : "a different"} diet`;
      },

      /**
       * @description Gets the list of methods that should be subject to a random call
       * @returns {Array} - The methods on the prototype object
       */
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

  return Object.create(createDino());
};

/**
 * @description Represents a Human
 * @constructor
 * @param {Object} formData - An object representing the relevant fields from the form
 */
function Human({name, feet, inches, weight, diet}) {
  this.type = "Human";
  this.name = name;
  this.feet = feet;
  this.inches = inches;
  this.weight = weight;
  this.diet = diet;

  /**
   * @description Gets the Object type
   * @returns {string}
   */
  this.getType = function () {
    return this.type;
  }

  /**
   * @description Gets the height in inches converted from height in feet and inches
   * @returns {int}
   */
  this.getHeightInInches = function() {
    return (parseInt(this.feet) * 12) + parseInt(this.inches);
  }

  /**
   * @description Generate a string representing the HTML element of the Human
   * @returns {string}
   */
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

/**
 * @description Uses an IIFE to expose a helper function for instantiating a Human object. Protects the data attribute.
 * @returns {Object} - The object containing the public function
 */
let createHuman = (function () {
  let data = {};

  return {
    /**
     * @description Instantiates a Human object using form field values
     * @returns {Object} - The Human object
     */
    getHumanFormData: function (dinoForm) {
      const formData = new FormData(dinoForm);
      for (const field of formData) {
        data[field[0]] = field[1];
      }
      return new Human(data);
    }
  }

}());

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
/**
 * @description Generates a random number between 0 and the maximum value provided
 * @param {number} max - maximum value
 * @returns {number}
 */
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

/**
 * @description Randomly calls a method on the Dinosaur object to set the Dinosaur fact
 * @param {Object} dino - A Dinosaur object
 * @param {Object} human - The Human object
 */
function randomlyCallMethod(dino, human) {
  const result = getRandomInt(4);
  const randomMethod = dino.getMethodList()[result];
  if (result < 3) {
    dino.setFact(randomMethod(human));
  }
}

/**
 * @description Generates and adds the tiles to the DOM
 * @param {Object} human - The Human object
 */
function addTiles(human) {
  let grid = document.getElementById("grid");
  dinos.forEach((dino, index) => {
    dino.getType() === "Dino" && randomlyCallMethod(dino, human);
    let container = document.createElement("div");
    container.className = "grid-item";
    container.innerHTML = dino.generateElementString();
    grid.appendChild(container);
  })
}

// On button click, prepare and display infographic
const button = document.getElementById("btn");
button.addEventListener("click", (function () {

  /**
   * @description Prepares and display infographic on button click
   */
  return function () {
    const dinoForm = document.getElementById("dino-compare");
    let human = createHuman.getHumanFormData(dinoForm);
    dinos.splice(4, 0, human);
    // Remove form from screen
    dinoForm.remove();
    addTiles(human);
  }
}()));