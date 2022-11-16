let inputs = document.querySelectorAll(".form_point-input"), // Inputs
  textarea = document.querySelector(".textarea-comment"); // Textarea Field

inputs.forEach((input) => {
  input.addEventListener("blur", removePlaceHolder);
});

textarea.addEventListener("blur", removePlaceHolder);

// Function Remove Label From Field
function removePlaceHolder() {
  let value = this.value;
  if (value.length > 0 && !this.classList.contains("filled")) {
    this.classList.add("filled");
  } else if (value.length == 0 && this.classList.contains("filled")) {
    this.classList.remove("filled");
  }
}

let selects = document.querySelectorAll(".form_select-point"); // Select Blocks

// Function Create Button Accepts: Parent Block, Value For "Placeholder" - First Option (Default)
const createButtonSelect = (parent, placeholder) => {
  let button = document.createElement("button");
  button.setAttribute("class", "form_body-select text-normal form_text-color");
  button.type = "button";
  button.innerText = placeholder;
  parent.appendChild(button);
  button.addEventListener("click", dropdownSelect);
  button.addEventListener("blur", () => {
    setTimeout(() => {
      button.classList.remove("active");
    }, 100);
  });
};

// Function Create Ul List Accepts: Parent Block, Count Items To Create, Context For User, Context For Submit.
const createListSelect = (parent, count, visibleValue, value) => {
  let ul = document.createElement("ul");
  ul.setAttribute("class", "form_select-list");
  createListItemSelect(ul, count, visibleValue, value);
  parent.appendChild(ul);
};

// Function Create List Item Accepts: Parent Block (Ul Or Ol), Count Items To Create, Context For User, Context For Submit
const createListItemSelect = (parent, count, visibleValue, value) => {
  let i = 0;
  while (parent.children.length < count) {
    let li = document.createElement("li");
    li.setAttribute("class", "form_select-list-item text-normal");
    li.setAttribute("data-value", `${value[i]}`);
    li.innerHTML = `${visibleValue[i]}`;
    parent.appendChild(li);
    i++;
    li.addEventListener("click", setOption);
  }
};

// Function For Create Input For Send Value Of Select
const createInputOptionValue = (parent) => {
  let input = document.createElement("input");
  input.setAttribute("class", "selected_option");
  input.setAttribute("type", "text");
  input.disabled = true;
  parent.appendChild(input);
};

// Function For Change Default Select Item To Costom Select Item
const searchOptions = (block) => {
  let options = [],
    optionsValue = [],
    select = block.firstElementChild,
    selectOptions = select.children,
    countOptions = select.length,
    placeholder = select.getAttribute("data-placeholder");

  // Getting the required data
  while (selectOptions.length > 0) {
    options.push(selectOptions[0].innerHTML);
    optionsValue.push(selectOptions[0].getAttribute("value"));
    select.removeChild(selectOptions[0]);
  }

  // Create New Select Structure
  createButtonSelect(block, placeholder);
  createListSelect(block, countOptions, options, optionsValue);
  createInputOptionValue(block);

  // Remove Standart Select
  block.removeChild(select);
};

selects.forEach((block) => {
  searchOptions(block);
});

// Toggle Class "Active"
function dropdownSelect() {
  this.classList.toggle("active");
}

// Function For Setting Required Option
function setOption() {
  let value = this.innerHTML,
    select = document.querySelector(".form_body-select.active"),
    formValue = this.getAttribute("data-value"),
    dataInput = this.closest(".form_select-list").nextElementSibling;
  select.innerHTML = value;
  dataInput.value = formValue;
  select.classList.remove("active");
}

// Map

// Content In Content Menu
const content = `<div class="content">
<h3 class="content_text">Voodoo</h3>
<p class="content_text">
  137 Glasgow St., Unit 115 <br />
  Kitchener, ON N2G 4X8 <br />
  Ukraine
</p>
<div class="content_contact">
  <img class="content_contact-image" src="../images/Shape.png" alt="" />
  <p class="content_contact-text">1-800-480-9597</p>
</div>
<div class="content_contact">
  <img class="content_contact-image" src="../images/mail.png" alt="" />
  <p class="content_contact-text">info@voodoo.com</p>
</div>
</div>`;

// Create Map, Set Zoom, Remove Controls
map = new google.maps.Map(document.getElementById("map"), {
  center: { lat: 43.45162864328603, lng: -80.51385701353273 },
  zoom: 17,
  zoomControl: false,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  rotateControl: false,
  fullscreenControl: false,
});

// Set Custom Marker
const marker = new google.maps.Marker({
  position: { lat: 43.45162864328603, lng: -80.51385701353273 },
  map: map,
  icon: "../images/marker.png",
});

// Set Content Block On Map
const infowindow = new google.maps.InfoWindow({
  content: content,
  ariaLabel: { lat: 43.45162864328603, lng: -80.51385701353273 },
});

// Make Content Block Visible
infowindow.open({
  anchor: marker,
  map,
});
