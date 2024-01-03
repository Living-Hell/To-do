import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://to-do-9c031-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const showsInDB = ref(database, "shows");

const addBtnEl = document.getElementById("add-btn");
const inputFieldEl = document.getElementById("input-field");
// const showsDisplay = document.getElementById("shows");
let watchListUl = document.getElementById("watch-list");

onValue(showsInDB, function (snapshot) {
  if (snapshot.exists()) {
    clearWatchListEl();
    let showsArray = Object.entries(snapshot.val());
    // console.log(showsArray);
    for (let i = 0; i < showsArray.length; i++) {
      const currShow = showsArray[i];
      addListItemToWatchListEl(currShow);
    }
  } else {
    watchListUl.textContent = "No shows in your watchlist...yet!";
  }
});

function addShow() {
  const inputValue = inputFieldEl.value;
  // showsDisplay.textContent += inputValue + " ";

  push(showsInDB, inputValue);
  // addListItemToWatchListEl(inputValue);
  clearInputField();
}

function addListItemToWatchListEl(item) {
  // watchListUl.innerHTML += `<li>${newItemValue}</li>`;
  const itemID = item[0];
  const itemVal = item[1];
  let newItem = document.createElement("li");
  newItem.textContent = itemVal;
  newItem.addEventListener("dblclick", function () {
    const addressOfShowInDB = ref(database, `shows/${itemID}`);
    remove(addressOfShowInDB);
  });

  watchListUl.append(newItem);
}

function clearInputField() {
  inputFieldEl.value = "";
}

function clearWatchListEl() {
  watchListUl.innerHTML = "";
}

addBtnEl.addEventListener("click", addShow);
