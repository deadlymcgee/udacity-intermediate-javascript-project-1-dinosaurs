import data from "./dino.json"

// Create Dino Constructor
function Dino () {
  this.species = null
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
   return Object.assign(Object.create(new Dino()), dino);
})

console.log(dinos);




    // Create Human Object

    // Use IIFE to get human data from form


    // Create Dino Compare Method 1
    // NOTE: Weight in JSON file is in lbs, height in inches. 

    
    // Create Dino Compare Method 2
    // NOTE: Weight in JSON file is in lbs, height in inches.

    
    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.


    // Generate Tiles for each Dino in Array
  
        // Add tiles to DOM

    // Remove form from screen


// On button click, prepare and display infographic
