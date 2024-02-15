/* -------------------------------------------- */
/*                //* products.js               */
/* -------------------------------------------- */

console.log('products socket');

const socket = io();

socket.on('products', (products) => {
  const template = products
    .map(
      (product) => `
    <div class="card" style="width: 18rem;">
      <img src=${product.thumbnail} class="card-img-top" alt=${product.title}>
      <div class="card-body">
        <h5 class="card-title">${product.title}</h5>
        <p class="card-text">${product.description}</p>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">code: ${product.code}</li>
        <li class="list-group-item">stock: ${product.stock}</li>
      </ul>
      <div class="card-footer">
        $ ${product.price}
      </div>
    </div>
    `,
    )
    .join('');
  document.querySelector('#products').innerHTML = template;
});
