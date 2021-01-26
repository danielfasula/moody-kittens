let kittens = [];

function addKitten(event) {
  event.preventDefault()
  let form = event.target

  let kitten = {
    id: generateId(),
    name: form.name.value,
    mood: 'Tolerant',
    affection: 5,
  }

  kittens.push(kitten)
  saveKittens()
  setKittenMood(kitten.id)
  form.reset()
}

function saveKittens() {
  window.localStorage.setItem("kittens", JSON.stringify(kittens))
  drawKittens()
}

function loadKittens() {
  let storedKittens = JSON.parse(window.localStorage.getItem("kittens"))
  if (storedKittens) {
    kittens = storedKittens
  }
}

function drawKittens() {
  let kittenListElement = document.getElementById("kittens")
  let kittensTemplate = ""

  kittens.forEach(kitten => {
    kittensTemplate += `
    <div class="card mt-1 mb-1">
      <div id="kitten-image" class="kitten ${kitten.mood.toLowerCase()}">
        <img src="https://robohash.org/${kitten.name}?set=set4" alt="RoboHashImage" class="">
      </div>
      <h3 class="mt-1 mb-1">Name: ${kitten.name}</h3>
      <h3>Mood: ${kitten.mood}</h3>
      <h3>Affection: ${kitten.affection}</h3>
      <span id="button" class"">
      <button onclick="pet(${kitten.id})">Pet Kitty</button>
      <button class="btn" onclick="catnip(${kitten.id})">Catnip</button>
      <button onclick="deleteCat(${kitten.id})">TRASH</button>
      </span>
      </div>
    `
  })
  kittenListElement.innerHTML = kittensTemplate
}


function findKittenById(id) {
  return kittens.find(k => k.id == id);
}

function pet(id) {
  let thisCat = findKittenById(id)
  let i = Math.random()
  if (i > 0.7) {
    thisCat.affection++
  }
  else {
    thisCat.affection--
  }
  setKittenMood(id)
  saveKittens()

}

function catnip(id) {
  let thisCat = findKittenById(id)
  thisCat.mood == 'Tolerant'
  thisCat.affection = 5
  setKittenMood(id)
  saveKittens()
  drawKittens()
}

function setKittenMood(id) {
  let thisCat = findKittenById(id)
  debugger
  if (thisCat.affection <= 0) {
    thisCat.mood = 'Gone'
  }
  else if (thisCat.affection <= 3) {
    thisCat.mood = 'Angry'
  }
  else if (thisCat.affection <= 5) {
    thisCat.mood = 'Tolerant'
  }
  else if (thisCat.affection > 6) {
    thisCat.mood = 'Happy'
  }
}

function deleteCat(id) {
  let index = kittens.findIndex(kitten => kitten.id == id)
  kittens.splice(index, 1)
  saveKittens()
} 

function getStarted() {
  document.getElementById("kittens").classList.remove("hidden")
  document.getElementById("welcome").remove();
  drawKittens();
}

function generateId() {
  return (
    Math.floor(Math.random() * 10000000) +
    Math.floor(Math.random() * 10000000)
  );
}

loadKittens()
drawKittens()
