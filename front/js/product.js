let id = new URL(window.location.href).searchParams.get("id");
const url = `http://localhost:3000/api/products/` + id;
let cartObject = [];

let product = document.querySelector(".item");

fetch(`http://localhost:3000/api/products/` + id)
  .then((res) => res.json()
    .then(function (data) {

      console.log(data);

      // On prépare le tableau des couleurs
      let select_color = `<option value="">--SVP, choisissez une couleur --</option>"`;
      data.colors.forEach(c => {
        select_color += `<option value="${c}">${c}</option>`;
      });

      // On injecte le innerHTML dans la classe ".item"
      product.innerHTML = `<article>
      <div class="item__img">
        <img src="${data.imageUrl}" alt="${data.altTxt}">
      </div>
      <div class="item__content">

        <div class="item__content__titlePrice">
          <h1 id="title">${data.name}</h1>
          <p>Prix : <span id="price">${data.price}</span>€</p>
        </div>

        <div class="item__content__description">
          <p class="item__content__description__title">Description :</p>
          <p id="description">${data.description}</p>
        </div>

        <div class="item__content__settings">
          <div class="item__content__settings__color">
            <label for="color-select">Choisir une couleur :</label>
            <select name="color-select" id="colors">
                ${select_color}
            </select>
          </div>

          <div class="item__content__settings__quantity">
            <label for="itemQuantity">Nombre d'article(s) (1-100) :</label>
            <input type="number" name="itemQuantity" min="1" max="100" value="0" id="quantity">
          </div>
        </div>

        <div class="item__content__addButton">
          <button id="addToCart">Ajouter au panier</button>
        </div>

      </div>
    </article>`;





      let btn = document.querySelector("#addToCart");
      btn.addEventListener("click", () => {

        let value = document.querySelector("#quantity").value;

        if (value < 1 || value > 100) {
          alert("La valeur doit être comprise entre 0 et 100");
          return;
        }

        let checkColor = document.querySelector("#colors").value;

        if (checkColor === "" || checkColor === null) {
          alert("Veuillez choisir une couleur");
          return;
        }

        let color = document.querySelector("#colors").value;
        let quantity = document.querySelector("#quantity").value;


        let cartItem = {
          id: id,
          // name: data.name,
          color: color,
          quantity: parseInt(quantity),
          // imageUrl: data.imageUrl,
          // altTxt: data.altTxt,
        };


        let currentLocalStorage = localStorage.getItem("cartObject") || [];


        if (currentLocalStorage.length < 1) {
          currentLocalStorage.push(cartItem);
          localStorage.setItem("cartObject", JSON.stringify(currentLocalStorage));
        }


        else {
          currentLocalStorage = JSON.parse(localStorage.getItem("cartObject"));



          for (let i = 0; i < currentLocalStorage.length; i++) {
            if (currentLocalStorage[i].id == cartItem.id && currentLocalStorage[i].color == cartItem.color) {
              currentLocalStorage[i].quantity += parseInt(cartItem.quantity);
              localStorage.setItem("cartObject", JSON.stringify(currentLocalStorage));
              window.location.href = "cart.html"
              return;
            }
          }


          currentLocalStorage.push(cartItem);
          localStorage.setItem("cartObject", JSON.stringify(currentLocalStorage));
        }

        window.location.href = "cart.html";

      });

    })
  );











