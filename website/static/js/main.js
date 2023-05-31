const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];


let date = new Date();

function getCurrentDate(element, asString) {
    if (element) {
        if (asString) {
            return element.textContent = weekdays[date.getDay()] + ', ' + date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();
        }
        return element.value = date.toISOString().substr(0, 10);
    }
    return date;
}


function generateCalendar() {

    const calendar = document.getElementById('calendar');
    if (calendar) {
        calendar.remove();
    }

    const table = document.createElement("table");
    table.id = "calendar";

    const trHeader = document.createElement('tr');
    trHeader.className = 'weekends';
    weekdays.map(week => {
        const th = document.createElement('th');
        const w = document.createTextNode(week.substring(0, 3));
        th.appendChild(w);
        trHeader.appendChild(th);
    });

    table.appendChild(trHeader);

    const weekDay = new Date(
        date.getFullYear(),
        date.getMonth(),
        1
    ).getDay();

    const lastDay = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
    ).getDate();

    let tr = document.createElement("tr");
    let td = '';
    let empty = '';
    let btn = document.createElement('button');
    let week = 0;

    while (week < weekDay) {
        td = document.createElement("td");
        empty = document.createTextNode(' ');
        td.appendChild(empty);
        tr.appendChild(td);
        week++;
    }

    for (let i = 1; i <= lastDay;) {
        while (week < 7) {
            td = document.createElement('td');
            let text = document.createTextNode(i);
            btn = document.createElement('button');
            btn.className = "btn-day";
            btn.addEventListener('click', function () { changeDate(this) });
            week++;
            if (i <= lastDay) {
                i++;
                btn.appendChild(text);
                td.appendChild(btn)
            } else {
                text = document.createTextNode(' ');
                td.appendChild(text);
            }
            tr.appendChild(td);
        }
        table.appendChild(tr);

        tr = document.createElement("tr");

        week = 0;
    }
    const content = document.getElementById('table');
    content.appendChild(table);
    changeActive();
    changeHeader(date);
    document.getElementById('date').textContent = date;
    getCurrentDate(document.getElementById("currentDate"), true);
    getCurrentDate(document.getElementById("date"), false);
}

function setDate(form) {
    let newDate = new Date(form.date.value);
    date = new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate() + 1);
    generateCalendar();
    return false;
}

function changeHeader(dateHeader) {
    const month = document.getElementById("month-header");
    if (month.childNodes[0]) {
        month.removeChild(month.childNodes[0]);
    }
    const headerMonth = document.createElement("h1");
    const textMonth = document.createTextNode(months[dateHeader.getMonth()].substring(0, 3) + " " + dateHeader.getFullYear());
    headerMonth.appendChild(textMonth);
    month.appendChild(headerMonth);
}

function changeActive() {
    let btnList = document.querySelectorAll('button.active');
    btnList.forEach(btn => {
        btn.classList.remove('active');
    });
    btnList = document.getElementsByClassName('btn-day');
    for (let i = 0; i < btnList.length; i++) {
        const btn = btnList[i];
        if (btn.textContent === (date.getDate()).toString()) {
            btn.classList.add('active');
        }
    }
}
function resetDate() {
    date = new Date();
    generateCalendar();
}

function changeDate(button) {
    let newDay = parseInt(button.textContent);
    date = new Date(date.getFullYear(), date.getMonth(), newDay);
    generateCalendar();
}

function nextMonth() {
    date = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    generateCalendar(date);
}

function prevMonth() {
    date = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    generateCalendar(date);
}


function prevDay() {
    date = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1);
    generateCalendar();
}

function nextDay() {
    date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
    generateCalendar();
}

document.onload = generateCalendar(date);


const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

let ticketPrice = +movieSelect.value;

//Update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

//Movie Select Event
movieSelect.addEventListener('change', e => {
  ticketPrice = +e.target.value;
  updateSelectedCount();
});

//Seat click event
container.addEventListener('click', e => {
  if (e.target.classList.contains('seat') &&
     !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected');
  }
  updateSelectedCount();
});


//Elements
const heroSection = document.querySelector(".hero_section");
const heroSectionDetails = document.querySelector(".hero_section_details");
const cardContainer = document.querySelector(".card_container");

let selectedCardElements = [];
let pressed = false;
let startX;
let startScrollLeft;

function initialize(cards) {
  //Add card card items
  for(let i = 0; i < cards.length; i++) {
    
    let cardElement = createCardElement(cards[i]);
    //The first card when initializing will marked as animated already
    if(i == 0) {
      setHeroSectionBackground(cardElement.style.backgroundImage);
      selectedCardElements.push(cardElement);
      cardElement.remove();

      createCardFullscreenDetails(cards[i].id);
    }
  }

  cardContainer.addEventListener("mousedown", (event) => {
    pressed = true;
    startX = event.clientX;
    startScrollLeft = cardContainer.scrollLeft;
  });

  cardContainer.addEventListener("mouseup", () => {
    cardContainer.style.cursor = "default";
    pressed = false;
  });  

  cardContainer.addEventListener("mousemove", (event) => {
    if (!pressed) return;
    event.preventDefault();

    cardContainer.style.cursor = 'grabbing';

    // How far the mouse has been moved
    const dx = event.clientX - startX;

    // Scroll the element
    cardContainer.scrollLeft = startScrollLeft - dx;
  });
}

function setHeroSectionBackground(backgroundImage) {
  //Transfer image from cardFullscreen to heroSection
  heroSection.style.backgroundImage = backgroundImage;
}

function appendCardContentElements(card, cardElement) {
  const infoDiv = document.createElement("div");
  infoDiv.className = "card_info";

  const cardLocation = document.createElement("p");
  cardLocation.className = "card_info_location";
  cardLocation.innerText = card.location;

  const cardName = document.createElement("h3");
  cardName.className = "card_info_name";
  cardName.innerText = card.name;

  infoDiv.appendChild(cardLocation);
  infoDiv.appendChild(cardName);

  cardElement.appendChild(infoDiv);
}

function createCardElement(card) {
  const cardElement = document.createElement("div");
  cardElement.className = "card slideIn";
  cardElement.style.backgroundImage = "url(" + card.image + ")";
  cardElement.dataset.cardId = card.id;

  cardElement.addEventListener("click", cardClick);
  cardElement.addEventListener("animationend", cardSlideInAnimationEnd);

  appendCardContentElements(card, cardElement);

  cardContainer.appendChild(cardElement);

  return cardElement;
}

function cardSlideInAnimationEnd(event) {
  event.target.classList.remove("slideIn");
}

function cardSlideOutAnimationEnd(event) {
  event.target.remove();
}

function cardClick(event) {
  event.stopPropagation();

  const cardInfo = event.target.querySelector(".card_info");
  cardInfo.classList.add("textSlideOut");
  cardInfo.addEventListener("animationend", cardInfoAnimationEnd);
}

function cardInfoAnimationEnd(event) {
  event.stopPropagation();
  event.target.removeEventListener("animationend", cardInfoAnimationEnd);

  //Get the card element
  const cardElement = event.target.parentElement;

  //Hide clicked card before starting background animation
  cardElement.style.visibility = "hidden";
  //Animate hidden clicked card with slideOut
  cardElement.classList.add("slideOut");
  cardElement.addEventListener("animationend", cardSlideOutAnimationEnd);

  /* If card offsetLef is bigger than the window width, 
    remove (card width + (card margin * 2)) from the offsetLeft value 
    to prevent body horizontal scroll */
  const posLeft = (cardElement.offsetLeft >= window.outerWidth ? 
    (cardElement.offsetLeft - (cardElement.offsetWidth + 32)) :
    cardElement.offsetLeft);

  //Create cardFullscreen
  const cardFullscreen = document.createElement("div");
  cardFullscreen.className = "card_fullscreen";
  cardFullscreen.style.left = posLeft + 'px';
  cardFullscreen.style.top = cardElement.offsetTop + 'px';
  cardFullscreen.style.backgroundImage = cardElement.style.backgroundImage;
  cardFullscreen.dataset.cardId = cardElement.dataset.cardId;
  cardFullscreen.addEventListener("animationend", cardFullscreenAnimationEnd);

  heroSection.appendChild(cardFullscreen);

  //Save into the list of cards already selected
  selectedCardElements.push(cardElement);

  //Start slideIn animation for cards in the slider
  startCardSlideInAnimation(parseInt(cardElement.dataset.cardId));

  //Check if need to add back the previous cliked card to the slider
  if(selectedCardElements.length >= 2) {
    //Get card ID from previous card selected
    const previousCardItem = cards.filter(x => 
      x.id === parseInt(selectedCardElements[0].dataset.cardId))[0];

    //Remove first item from the selectedCardElements array
    selectedCardElements.shift();

    //Add card back to the card slider
    createCardElement(previousCardItem);
  }
}

function cardFullscreenAnimationEnd(event) {
  setHeroSectionBackground(event.target.style.backgroundImage);
  //Add card fullscreen details to the document.
  createCardFullscreenDetails(parseInt(event.target.dataset.cardId));

  //Remove cardFullscreen element
  event.target.remove();
}

function startCardSlideInAnimation(ignoreCardId) {
  const cards = document.querySelectorAll(".card");

  for(let i = 0; i < cards.length; i++) {
    if(parseInt(cards[i].dataset.cardId) === ignoreCardId) {
      continue;
    }

    cards[i].classList.add("slideIn");
  }
}

function createCardFullscreenDetails(cardId) {
  const cardFullscreenDetailsClassName = "card_fullscreen_details";

  //Remov old element with the card details
  const oldCardfullscreenDetailsElement = heroSectionDetails
    .querySelector("." + cardFullscreenDetailsClassName);
    
  if(oldCardfullscreenDetailsElement)
   oldCardfullscreenDetailsElement.remove();


  //Add new element with the card details 
  const card = cards.filter(x => x.id === cardId)[0];

  const cardFullscreenDetails = document.createElement("div");
  cardFullscreenDetails.className = cardFullscreenDetailsClassName;
  
  const cardLocation = document.createElement("p");
  cardLocation.innerText = card.location;

  const cardName = document.createElement("h1");
  cardName.innerText = card.name;

  cardFullscreenDetails.appendChild(cardLocation);
  cardFullscreenDetails.appendChild(cardName);

  heroSectionDetails.appendChild(cardFullscreenDetails);
}

const cards = [{
  id: 1,
  image: "https://wallpaperaccess.com/full/2116417.jpg",
  location: "An exploration of Arthur Fleck, a man disregarded by society.",
  name: "Joker"
},
{
  id: 2,

  image: "https://images5.alphacoders.com/118/1181492.jpg",
  location: "A noble family becomes embroiled in a war for control over the galaxy's most valuable asset.",
  name: "Dune"
},
{
  id: 3,
  image: "https://images3.alphacoders.com/723/thumb-1920-72397.jpg",
  location: "When a sadistic serial killer threatens Gotham, Batman is forced to investigate.",
  name: "The Batman"
},
{
  id: 4,
  image: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/5298bac0-b8bf-4c80-af67-725c1272dbb0/dfu6vo6-9d7336b6-aae1-48c9-a196-30c0dc8223a4.jpg/v1/fill/w_1192,h_670,q_70,strp/the_super_mario_bros_movie_wallpaper_by_thekingblader995_dfu6vo6-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTA4MCIsInBhdGgiOiJcL2ZcLzUyOThiYWMwLWI4YmYtNGM4MC1hZjY3LTcyNWMxMjcyZGJiMFwvZGZ1NnZvNi05ZDczMzZiNi1hYWUxLTQ4YzktYTE5Ni0zMGMwZGM4MjIzYTQuanBnIiwid2lkdGgiOiI8PTE5MjAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.ChNuLMs7CCcHaI_JdZfBYGo0zkRcA9Gh3vTOyg1XRYY",
  location: "The story of The Super Mario Bros. on their journey through the Mushroom Kingdom.",
  name: "Super Mario Bros."
},
{
  id: 5,
  image: "https://cdn.wallpapersafari.com/76/30/ksaDjd.jpg",
  location: "Wick must face off against a new enemy with powerful alliances across the globe and forces that turn old friends into foes.",
  name: "John Wick"
}
]


initialize(cards);


// Testemonials Start
const btn = document.getElementsByClassName("btn");
const slide = document.getElementById("slide");

btn[0].onclick = function () {
  slide.style.transform = "translateX(0px)";
  for (i = 0; i < 4; i++) {
    btn[i].classList.remove("active");
  }
  this.classList.add("active");
};

btn[1].onclick = function () {
  slide.style.transform = "translateX(-800px)";
  for (i = 0; i < 4; i++) {
    btn[i].classList.remove("active");
  }
  this.classList.add("active");
};

btn[2].onclick = function () {
  slide.style.transform = "translateX(-1600px)";
  for (i = 0; i < 4; i++) {
    btn[i].classList.remove("active");
  }
  this.classList.add("active");
};

btn[3].onclick = function () {
  slide.style.transform = "translateX(-2400px)";
  for (i = 0; i < 4; i++) {
    btn[i].classList.remove("active");
  }
  this.classList.add("active");
};


// Testemonials End