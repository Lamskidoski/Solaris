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
      getInfo(planet[1]);
      getStatus(planet[1]);
      getMoons(planet[1]);
      openModal();
    })
    venus.addEventListener("click", function () {
      getInfo(planet[2]);
      getStatus(planet[2]);
      getMoons(planet[2]);
      openModal();
    })
    earth.addEventListener("click", function () {
      getInfo(planet[3]);
      getStatus(planet[3]);
      getMoons(planet[3]);
      openModal();
    })
    mars.addEventListener("click", function () {
      getInfo(planet[4]);
      getStatus(planet[4]);
      getMoons(planet[4]);
      openModal();
    })
    jupiter.addEventListener("click", function () {
      getInfo(planet[5]);
      getStatus(planet[5]);
      getMoons(planet[5]);
      openModal();
    })
    saturn.addEventListener("click", function () {
      getInfo(planet[6]);
      getStatus(planet[6]);
      getMoons(planet[6]);
      openModal();
    })
    uranus.addEventListener("click", function () {
      getInfo(planet[7]);
      getStatus(planet[7]);
      getMoons(planet[7]);
      openModal();
    })
    neptune.addEventListener("click", function () {
      getInfo(planet[8]);
      getStatus(planet[8]);
      getMoons(planet[8]);
      openModal();
    })
    

    // Hantera den mottagna datan här
  })
  .catch(error => {
    console.error('Det uppstod ett fel:', error);
  });
}
getBodies();

// öppnar med hjälp av knappen
function openModal() {
  openBtn.style.display = "block";
  console.log("du har öppnat");
}

function onclick() {

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
  ">${planetMoons.moons}</p>
  `
}

const searchWords = [
  "merkurius", 
  "venus", 
  "earth", 
  "mars", 
  "jupiter", 
  "saturn", 
  "uranus", 
  "neptune", 
];

const searchResult = document.getElementById("searchResult");
const searchInput = document.getElementById("searchInput");

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

// --------------------------------------------------------------- //

const searchBar = document.getElementById("search.bar")

function search() {
  let input = document.getElementById("searchInput").value; 
    document.getElementById("searchResult").innerHTML = "you search for: " + input;
}

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