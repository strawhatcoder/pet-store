const gallery = document.querySelector(".gallery");
const buttons = document.querySelectorAll(".btn");
const search = document.querySelector("i");
let searchInput = document.querySelector("#search");
let pets;

// Grab API data
(async () => {
  const data = await fetch("api.json");
  const petsData = await data.json();
  pets = petsData;
})();

// Available Options for Search
const searchOptions = [
  "all",
  "dogs",
  "dog",
  "cats",
  "cat",
  "rabbits",
  "rabbit",
  "turtles",
  "turtle",
];

// Add Event Listener to Buttons
buttons.forEach((button) => {
  button.addEventListener("click", handleButton);
});

// Add Event Listener to Search
search.addEventListener("click", handleSearch);

// Add Event Listener to Iput
searchInput.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    handleSearch();
  }
});

// Handle Button Clicked
function handleButton(e) {
  e.preventDefault();
  let button = e.currentTarget.textContent.toLowerCase();
  button = makeSingular(button);
  displayData(button);
}

// Display Data Onto Page
function displayData(getPetData) {
  let petGallery = "";

  arrayShuffle(pets);

  if (getPetData === "all") {
    pets.forEach((pet) => {
      petGallery += `
      <div class="flex-item">
        <div class="card">
          <img
            src="${pet.src}"
            alt="${pet.type}"
          />
          <div class="container">
            <div>${pet.name}</div>
            <div>${pet.price}</div>
          </div>
        </div>
      </div>
      `;
    });
  } else {
    const petsSelected = pets.filter((pet) => pet.type === getPetData);

    petsSelected.forEach((pet) => {
      petGallery += `
      <div class="flex-item">
        <div class="card">
          <img
            src="${pet.src}"
            alt="${pet.type}"
          />
          <div class="container">
            <div>${pet.name}</div>
            <div>${pet.price}</div>
          </div>
        </div>
      </div>
      `;
    });
  }

  gallery.innerHTML = petGallery;
}

// Search Functionality
function handleSearch() {
  let value = searchInput.value.toLowerCase();
  checkInput(value);
  searchInput.value = "";
}

// Check Input; Display Data if Found
checkInput = (value) => {
  const petNames = pets.map((pet) => pet.name.toLowerCase());

  if (searchOptions.includes(value)) {
    value = makeSingular(value);
    displayData(value);
  } else if (petNames.includes(value)) {
    let specificPet = pets.find((pet) => pet.name === capitalize(value));

    gallery.innerHTML = `
      <div class="flex-item">
        <div class="card">
          <img
            src="${specificPet.src}"
            alt="${specificPet.type}"
          />
          <div class="container">
            <div>${specificPet.name}</div>
            <div>${specificPet.price}</div>
          </div>
        </div>
      </div>
      `;
  } else {
    gallery.innerHTML = `
      <h1>Sorry, that does not seem to be in our inventory
    `;
  }
};

// Singularize Type
function makeSingular(word) {
  word[word.length - 1] == "s" ? (word = word.slice(0, word.length - 1)) : word;
  return word;
}

// Capitalize Word
capitalize = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

// Shuffle Array Function
arrayShuffle = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
};
