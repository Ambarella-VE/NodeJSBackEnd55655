/* -------------------------------------------- */
/*                  //* form.js                 */
/* -------------------------------------------- */
console.log("form socket");

const socket = io();

const addBtn = document.querySelector("#addProduct");
const form = document.querySelector("#addForm");

addBtn.addEventListener("click", (event) =>{
  event.preventDefault();
  const product = {
    title: document.querySelector("#title-i").value,
    description: document.querySelector("#description-i").value,
    price: document.querySelector("#price-i").value,
    code: document.querySelector("#code-i").value,
    stock: document.querySelector("#stock-i").value,
    thumbnail: document.querySelector("#thumbnail-i").value
  };
  form.reset();
  socket.emit("addProduct", product);
  
});