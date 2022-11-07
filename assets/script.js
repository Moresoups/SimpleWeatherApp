





const form = document.querySelector(".top-banner form");
const userinput = document.querySelector(".top-banner input");
const msg = document.querySelector(".top-banner .msg");
const list = document.querySelector(".ajax-section .cities");

const url = `https://api.openweathermap.org/data/2.5/weather?q=${userinput}&appid=${e399156459a95a7ca0de1a333acc798d}&units=metric`;
  
fetch(url)
  .then(response => response.json())
  .then(data => {
    const { main, name, sys, weather } = data;
    const li = document.createElement("li");
    li.classList.add("city");
    const markup = `
      <h2 class="city-name" data-name="${name},${sys.country}">
        <span>${name}</span>
        <sup>${sys.country}</sup>
      </h2>
      <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
      <figure>
        <img class="city-icon" src="${icon}" alt="${
      weather[0]["description"]
    }">
        <figcaption>${weather[0]["description"]}</figcaption>
      </figure>
    `;
    li.innerHTML = markup;
    list.appendChild(li);
  })
  .catch(() => {
    msg.textContent = "something went wrong, please try again";
  });

msg.textContent = "";
form.reset();
userinput.focus();


form.addEventListener("submit", e => {
    e.preventDefault();
    let inputVal = input.value;
  
  
    const listItems = list.querySelectorAll(".ajax-section .city");
    const listItemsArray = Array.from(listItems);
  
    if (listItemsArray.length > 0) {
      const filteredArray = listItemsArray.filter(el => {
        let content = "";
       
    if (inputVal.includes(",")) {
          
    if (inputVal.split(",")[1].length > 2) {
            inputVal = inputVal.split(",")[0];
            content = el
              .querySelector(".city-name span")
              .textContent.toLowerCase();
     } else {
            content = el.querySelector(".city-name").dataset.name.toLowerCase();
          }
     } else {
         
          content = el.querySelector(".city-name span").textContent.toLowerCase();
        }
        return content == inputVal.toLowerCase();
      });
  
      if (filteredArray.length > 0) {
        msg.textContent = `You already know the weather for ${
          filteredArray[0].querySelector(".city-name span").textContent
        } ...otherwise be more specific by providing the country code as well 😉`;
        form.reset();
        userinput.focus();
        return;
      }
    }
  
});
  