const addToCartBtn = document.getElementById("add-btn");
const inputHolder = document.getElementById("input");
const taskDisplay = document.getElementById("tasks");

function addTask() {
  taskDisplay.textContent += inputHolder.value + " ";
}

addToCartBtn.addEventListener("click", addTask);
