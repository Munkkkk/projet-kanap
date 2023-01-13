let cart = JSON.parse(localStorage.getItem("cartObject"));

let articles = document.querySelector("#cart__items");
let totalPrice = document.querySelector("#totalPrice");
let totalQuantity = document.querySelector("#totalQuantity");
let totalArticlesPrice = 0;
let totalArticlesQuantity = 0;

async function showCart() {

    for (let i = 0; i < cart.length; i++) {
        let price = await getProductPriceById(cart[i].id);

        totalArticlesQuantity += parseInt(cart[i].quantity);
        totalArticlesPrice += parseInt(cart[i].quantity * price);

        let article = `<article class="cart__item" data-id="${cart[i].id}" data-color="${cart[i].color}">
                  <div class="cart__item__img">
                    <img src="${cart[i].imageUrl}" alt="${cart[i].altTxt}">
                  </div>
                  <div class="cart__item__content">
                    <div class="cart__item__content__description">
                      <h2>${cart[i].name}</h2>
                      <p>Vert</p>
                      <p>${price} €</p>
                    </div>
                    <div class="cart__item__content__settings">
                      <div class="cart__item__content__settings__quantity">
                        <p>Qté : </p>
                        <input  data-id="${cart[i].id}" data-color="${cart[i].color}" type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cart[i].quantity}">
                      </div>
                      <div class="cart__item__content__settings__delete">
                        <p  data-id="${cart[i].id}" data-color="${cart[i].color}" class="deleteItem">Supprimer</p>
                      </div>
                    </div>
                  </div>
                </article>`;

        articles.innerHTML += article;

        totalPrice.innerHTML = totalArticlesPrice;
        totalQuantity.innerHTML = totalArticlesQuantity;

        updateQuantity();
        deleteItemCard();

    }
}

showCart();


async function getProductPriceById(artId) {
    return fetch("http://localhost:3000/api/products/")
        .then(function (res) {
            return res.json();
        })
        .catch((err) => {

            console.log("erreur");
        })
        .then((response) => {
            for (let i = 0; i < response.length; i++) {
                if (response[i]._id == artId) {
                    return response[i].price;
                }
            }
        });
}

function updateQuantity() {
    const quantityInputs = document.querySelectorAll(".itemQuantity");
    quantityInputs.forEach((quantityInput) => {
        quantityInput.addEventListener("change", (event) => {
            event.preventDefault();
            const inputValue = event.target.value;
            const dataId = event.target.getAttribute("data-id");
            const dataColor = event.target.getAttribute("data-color");
            let cartItems = localStorage.getItem("cartObject");
            let items = JSON.parse(cartItems);

            items = items.map((item, index) => {
                if (item.id === dataId && item.color === dataColor) {
                    item.quantity = inputValue;
                }
                return item;
            });

            if (inputValue > 100 || inputValue < 1) {
                alert("La quantité doit etre comprise entre 1 et 100");
                return;
            }
            let itemsStr = JSON.stringify(items);
            localStorage.setItem("cartObject", itemsStr);
            updateCart();
        });
    });
}


function deleteItemCard() {
    let cartItem = JSON.parse(localStorage.getItem("cartObject"));
    const deleteButtons = document.querySelectorAll(".deleteItem");
    deleteButtons.forEach((deleteButton) => {
        deleteButton.addEventListener("click", (event) => {
            event.preventDefault();
            const deleteId = event.target.getAttribute("data-id");
            const deleteColor = event.target.getAttribute("data-color");
            cartItem = cartItem.filter(
                (element) => !(element.id == deleteId && element.color == deleteColor)
            );
            deleteConfirm = window.confirm(
                "Etes vous sûr de vouloir supprimer cet article ?"
            );
            if (deleteConfirm == true) {
                localStorage.setItem("cartObject", JSON.stringify(cartItem));
                alert("Article supprimé avec succès");
            }

            const card = deleteButton.closest(".cart__item");
            card.remove();
            updateCart();

            const deleteKanap = JSON.parse(localStorage.getItem("cartOject"));
            if (deleteKanap.length === 0) {
                localStorage.removeItem("cartOject");
                alert('Panier vide, retour à l\'accueil.');
                window.location.href = "index.html";
            }
        });

    });
}


async function updateCart() {
    let cartItem = JSON.parse(localStorage.getItem("cartObject"));
    let totalQuantity = 0;
    let totalPrice = 0;

    for (i = 0; i < cartItem.length; i++) {
        let price = await getProductPriceById(cart[i].id);
        totalQuantity += parseInt(cartItem[i].quantity);
        totalPrice += parseInt(price * cartItem[i].quantity);
    }

    console.log(totalPrice);

    document.getElementById("totalQuantity").innerHTML = totalQuantity;
    document.getElementById("totalPrice").innerHTML = totalPrice;
}