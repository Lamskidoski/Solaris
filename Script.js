function getBodies() {
  const apiUrl = 'https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies';
  const apiKey = 'solaris-2ngXkR6S02ijFrTP';
  
  fetch(apiUrl, { 
    method: 'GET',
    headers: {'x-zocom': `${apiKey}`}
  })
  .then(response => response.json())
  .then(data => {
    console.log(data)
    // Hantera den mottagna datan här
  })
  .catch(error => {
    console.error('Det uppstod ett fel:', error);
  });
}

getBodies();

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
    const qH = skySize.width / 500 * (QUANTITY / 2 );
    const qV = skySize.heigt / 500 * (QUANTITY / 2 );
    return qH + qV;
  }
  function getStarPos(skySize) {
    return {
      top: Math.floor(Math.random() * skySize.heigt),
      left: Math.floor(Math.random() * skySize.width)
    }
  }
}

const mercury = document.querySelector(".mercury")
const venus = document.getElementsByClassName("venus")
const earth = document.getElementsByClassName("earth")
const mars = document.getElementsByClassName("mars")
const jupiter = document.getElementsByClassName("jupiter")
const saturn = document.getElementsByClassName("saturn")
const uranus = document.getElementsByClassName("uranus")
const neptune = document.getElementsByClassName("neptune")



mercury.addEventListener("click", function() {
planetInfo(fetchData.bodies[1])
})

function planetInfo(planetData) {
  const popUp = document.getElementsByClassName("popUp");

  popUp.innerHTML = `
  <h1>${planetData.name}</h1>
  <h2>${planetData.latinName}</h2>
  <p>${planetData.desc}</p>
  <h3>Omkrets</h3>
  <p>${planetData.circumference}</p>
  <h4>KM från solen</h4>
  <p>${planetData.distance}</p>
  <h5>Tepmeratur</h5>
  <p>${planetData.temp}</p>
  <h6>Månar</h6>
  <p>${planetData.moons}</p>
  `
}

// visar popUp när den är fylld med information
// popUp.style.display = "block";
// popUp.style.position = "absolute";
