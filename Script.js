const openBtn = document.getElementById("modal")
const closeBtn = document.getElementById("close-button")
const merkurius = document.getElementById("merkurius")
const venus = document.getElementById("venus")
const earth = document.getElementById("earth")
const mars = document.getElementById("mars")
const jupiter = document.getElementById("jupiter")
const saturn = document.getElementById("saturn")
const uranus = document.getElementById("uranus")
const neptune = document.getElementById("neptune")

const searchResult = document.getElementById("searchResult");
const searchInput = document.getElementById("searchInput");

function getBodies() {
  const apiUrl = 'https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies';
  const apiKey = 'solaris-2ngXkR6S02ijFrTP';
  
  fetch(apiUrl, { 
    method: 'GET',
    headers: {'x-zocom': `${apiKey}`}
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    let planet = data.bodies;
    
    merkurius.addEventListener("click", function () {
      openModal(planet[1]);
    })
    venus.addEventListener("click", function () {
      openModal(planet[2]);
    })
    earth.addEventListener("click", function () {
      openModal(planet[3]);
    })
    mars.addEventListener("click", function () {
      openModal(planet[4]);
    })
    jupiter.addEventListener("click", function () {
      openModal(planet[5]);
    })
    saturn.addEventListener("click", function () {
      openModal(planet[6]);
    })
    uranus.addEventListener("click", function () {
      openModal(planet[7]);
    })
    neptune.addEventListener("click", function () {
      openModal(planet[8]);
    })
    // Eventlistener på om formuläret submittas
    document.getElementById('testForm').addEventListener("submit", (e) => {
      // Tar bort defaultfunktionen för att submita form som är att ladda om sidan
      e.preventDefault();
      console.log(planet);
      // Går igenom alla planeter
      planet.forEach(searchPlanet => {
        // Gör sökvärdet och planetnamnet till lowercase för att inte ha sökfunktionen case-sensitive
        const lowerCaseSearch = searchInput.value.toLowerCase();
        const lowerCasePlanet = searchPlanet.name.toLowerCase();
        
        // Om sökvärdet stämmer överens med planetens namn
        if(lowerCasePlanet == lowerCaseSearch) {
          console.log(lowerCasePlanet, lowerCaseSearch);
          // Öppna modal med planetens värde som argument
          openModal(searchPlanet)
        }
      });
    })
    // Hantera den mottagna datan här
  })
  .catch(error => {
    console.error('Det uppstod ett fel:', error);
  });
}
getBodies();

// öppnar med hjälp av knappen
function openModal(planet) {
  getInfo(planet);
  getStatus(planet);
  getMoons(planet);
  openBtn.style.display = "block";
  console.log("du har öppnat");
}


closeBtn.addEventListener("click", function() {
  openBtn.style.display = "none"
})

function getInfo(planetData) {
  const title = document.getElementById("title")
  title.innerHTML = `
  <h1 style="color: white;">${planetData.name}</h1>
  <h2 style="color: Yellow;">${planetData.latinName}</h2>
  <p style="color: white;">${planetData.desc}</p>
  `
}

function getStatus(planetStatus) {
  const status = document.getElementById("status")
  status.innerHTML = `
  <h2 style="color: yellow;">Omkrets
  <p style="color: white;">${planetStatus.circumference}</p>
  </h2>
  
  <h2 style="color: yellow;">KM från solen
  <p style="color: white;">${planetStatus.distance}</p>
  </h2>
  
  <h2 style="color: yellow;">Tepmeratur Day
  <p style="color: white;">${planetStatus.temp.day}</p>
  </h2>
  <h2 style="color: yellow;">Tepmeratur Night
  <p style="color: white;">${planetStatus.temp.night}</p>
  </h2> `
}

function getMoons (planetMoons) {
  const moons = document.getElementById("moons")
  moons.innerHTML = `
  <h2 style="color: yellow;">Månar</h2>
  <p style="color: white; 
  ">${planetMoons.moons.length > 0 ? planetMoons.moons.join(", ") : "saknar månar"}</p>
  
  `
}
// ------------------------------------------ //
const searchWords = [
  "merkurius", 
  "venus", 
  "jorden", 
  "mars", 
  "jupiter", 
  "saturnus", 
  "uranus", 
  "neptunus", 
];
searchInput.onkeyup = function() {
  let result = [];
  let input = searchInput.value;
  if (input.length) {
    result= searchWords.filter((keyword) => {
      return keyword.includes(input);
    });
    console.log(result);
  }
  display(result);
  
  if(!result.length){
    searchResult.innerHTML = "";
  }
}
function display(result){
  const content = result.map((list)=>{
    return "<li onclick=selectInput(this)>" + list + "</li>"
  })
  searchResult.innerHTML = "<ul>" + content.join("") + "</ul>"
}
function selectInput (list){
  searchInput.value = list.innerHTML;
  searchResult.innerHTML = "";
}
function search() {
  let input = document.getElementById("searchInput").value; 
    document.getElementById("searchResult").innerHTML = "you search for: " + input;
    console.log(input);
}

// --------------------------------------------------------------- //


const SKY = document.querySelector('[data-sky]');
// quantity stars per 100x100px 
const QUANTITY = SKY.dataset.sky ? +SKY.dataset.sky : 100;

if (SKY) {
  setStars();
  window.addEventListener('resize', setStars);

  function setStars() {
    const skySize = {
      width: SKY.offsetWidth,
      heigt: SKY.offsetHeight
    }

    const TOTAL_STARS = getStarsQuantitiy(skySize);
    let starTemplate = ``;

    for (let star = 0; star < TOTAL_STARS; star++) {
      const starPos = getStarPos(skySize);
      const starStyle = `
      position: absolute;
      top: ${starPos.top}px;
      left: ${starPos.left}px;
      `;
      const starClass = `star star--type-${Math.floor(Math.random() * 3)}`;
      starTemplate += `<div style="${starStyle}" class="${starClass}"></div>` 
    }
    SKY.innerHTML = starTemplate;
  }
  function getStarsQuantitiy(skySize) {
    const qH = skySize.width / 700 * (QUANTITY / 2 );
    const qV = skySize.heigt / 700 * (QUANTITY / 2 );
    return qH + qV;
  }
  function getStarPos(skySize) {
    return {
      top: Math.floor(Math.random() * skySize.heigt),
      left: Math.floor(Math.random() * skySize.width)
    }
  }
}