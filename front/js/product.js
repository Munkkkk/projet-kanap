let id = new URL(window.location.href).searchParams.get("id");
const url = `http://localhost:3000/api/products/` + id;
let cartObject = [];

let product = document.querySelector(".item");

fetch(`http://localhost:3000/api/products/` + id)
  .then((res) => res.json()
    .then(function (data) {
      /*
        Steve 29/10/2022
        On passe par une nouvelle méthode, innerHTML (plus lisible) plutôt que du creatElemet
        (l'ancien code est dessous)
      */

      // On debug pour être sur de voir toutes les données (à commenter un fois fini)
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

      // On vérifie la quantité (entre 0 et 100)
      function checkQuantity() {
        let value = document.querySelector("#quantity").value;

        if (value < 1 || value > 100) {
          alert("La valeur doit être comprise entre 0 et 100");
          document.querySelector("#quantity").value = 1;
          return;
        }
      }

      // On vérifie si une couleur a été choisie
      function checkColor() {
        let color = document.querySelector("#colors").value;

        if (color === "" || color === null) {
          alert("Veuillez choisir une couleur");
          return;
        }
      }

      // Action sur le bouton "Ajouter au panier"
      let btn = document.querySelector("#addToCart");
      btn.addEventListener("click", () => {
        checkQuantity();
        checkColor();

        // Nos 2 inputs, à savoir, quantité et couleur
        let color = document.querySelector("#colors").value;
        let quantity = document.querySelector("#quantity").value;

        // Notre canapé en cours
        let cartItem = {
          id: id,
          name: data.name,
          color: color,
          quantity: parseInt(quantity),
          imageUrl: data.imageUrl,
          altTxt: data.altTxt,
        };

        // On initialise notre cartObject, si il ne contient rien, on en fait un tableau vide
        // Dans le code voir cartObject comme un caddie et cartItem comme un article dans le caddie (je sais c'est imagé, mais c'est le principe)
        let currentLocalStorage = localStorage.getItem("cartObject") || [];

        // Est ce que l'on a déjà quelque chose dans le localStorage ? non, on pousse le canapé en cours dans le localStorage
        if (currentLocalStorage.length < 1) {
          currentLocalStorage.push(cartItem);
          localStorage.setItem("cartObject", JSON.stringify(currentLocalStorage));
        }

        // Si oui on regarde ce qu'il y a pour ne pas créer de doublons et le cas échéan augmenter juste la quantité
        else {
          currentLocalStorage = JSON.parse(localStorage.getItem("cartObject"));

          // Si on trouve un doublon (id, couleur) on augmente que la quantité et on replace dans le localStorage
          for (let i = 0; i < currentLocalStorage.length; i++) {
            if (currentLocalStorage[i].id == cartItem.id && currentLocalStorage[i].color == cartItem.color) {
              currentLocalStorage[i].quantity += parseInt(cartItem.quantity);
              localStorage.setItem("cartObject", JSON.stringify(currentLocalStorage));
              return; // on sort d'ici pas besoin d'aller plus loin.
            }
          }

          // Sinon on pousse un nouveau canapé dans le localStorage
          currentLocalStorage.push(cartItem);
          localStorage.setItem("cartObject", JSON.stringify(currentLocalStorage));
        }
        // on passe à la page panier
        window.location.href = "cart.html";

      });

    })
  );

 // ancien code
/*
let name = document.querySelectorAll('#items title');
title.setAttribute('class', data.name);
title.textContent = data.name;

let paragraphe = document.querySelectorAll('#items price');
price.setAttribute('class', data.price);
price.textContent = data.price;

let description__title = document.querySelectorAll('#items description');
description.setAttribute('class', data.description);
description.textContent = data.description;
 
let option = document.querySelectorAll('#items colors'); 
colors.setAttribute('class', data.colors);
data.colors.forEach(c => {
  colors.innerHTML += `<option value="${c}">${c}</option>`
});
 
 
let imageUrl = document.querySelector('.item__img');
 
imageUrl.innerHTML = `<img src="${data.imageUrl}" />`;
*/











