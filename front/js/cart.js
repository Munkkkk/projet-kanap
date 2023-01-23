let cart = JSON.parse(localStorage.getItem("cartObject"));

console.log(cart);
let articles = document.querySelector("#cart__items");
let totalPrice = document.querySelector("#totalPrice");
let totalQuantity = document.querySelector("#totalQuantity");
let totalArticlesPrice = 0;
let totalArticlesQuantity = 0;

async function showCart() {

    for (let i = 0; i < cart.length; i++) {
        console.log(cart[i].id);
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
                      <p>${cart[i].color}</p>
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

    };
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
                location.reload();
                return;
            }
            let itemsStr = JSON.stringify(items);
            localStorage.setItem("cartObject", itemsStr);
            updateCart();
            location.reload();
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
                location.reload();
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



const inputs = document.querySelectorAll("input[type=text], input[type=email]");


let nameCheck = new RegExp(/^[a-zéèçà]{2,50}(-|)?([a-zéèçà]{2,50})?$/gim);
let cityCheck = new RegExp(/^[a-zéèçà]{2,50}(-| )?([a-zéèçà]{2,50})?$/gim);
let addressCheck = new RegExp(/^[a-zA-Z0-9\s,.'-]{3,}$/);
let emailCheck = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);


const firstNameChecker = (value) => {
    let valueBoolean = false;
    if (!value.match(nameCheck)) {
        valueBoolean = false;
        document.querySelector("#firstNameErrorMsg").textContent =
            "Le prénom ne doit pas contenir de caractères spéciaux";
    } else {
        valueBoolean = true;
        document.querySelector("#firstNameErrorMsg").textContent = "";
    }
    return valueBoolean;
};

const lastNameChecker = (value) => {
    let valueBoolean = false;
    if (!value.match(nameCheck)) {
        valueBoolean = false;
        document.querySelector("#lastNameErrorMsg").textContent =
            "Le nom ne doit pas contenir de caractères spéciaux";
    } else {
        valueBoolean = true;
        document.querySelector("#lastNameErrorMsg").textContent = "";
    }
    return valueBoolean;
};

const addressChecker = (value) => {
    let valueBoolean = false;
    if (!value.match(addressCheck)) {
        valueBoolean = false;
        document.querySelector("#addressErrorMsg").textContent =
            "L'adresse ne doit pas contenir de caractères spéciaux";
    } else {
        valueBoolean = true;
        document.querySelector("#addressErrorMsg").textContent = "";
    }
    return valueBoolean;
};

const cityChecker = (value) => {
    let valueBoolean = false;
    if (!value.match(cityCheck)) {
        valueBoolean = false;
        document.querySelector("#cityErrorMsg").textContent =
            "Le nom de la ville ne doit pas contenir de caractères spéciaux";
    } else {
        valueBoolean = true;
        document.querySelector("#cityErrorMsg").textContent = "";
    }
    return valueBoolean;
};

const emailChecker = (value) => {
    let valueBoolean = false;
    if (!value.match(emailCheck)) {
        valueBoolean = false;
        document.querySelector("#emailErrorMsg").textContent =
            "L'email ne doit pas contenir de caractères spéciaux";
    } else {
        valueBoolean = true;
        document.querySelector("#emailErrorMsg").textContent = "";
    }
    return valueBoolean;
};


inputs.forEach((input) => {
    input.addEventListener("input", (e) => {
        switch (e.target.id) {
            case "firstName":
                firstNameChecker(e.target.value);
                break;
            case "lastName":
                lastNameChecker(e.target.value);
                break;
            case "address":
                addressChecker(e.target.value);
                break;
            case "city":
                cityChecker(e.target.value);
                break;
            case "email":
                emailChecker(e.target.value);
                break;
            default:
                null;
        }
    });
});

const cartForm = () => {
    const submitForm = document.getElementById("order");
    submitForm.addEventListener("click", (e) => {
        e.preventDefault();

        const products = [];
        for (let i = 0; i < cart.length; i++) {
            products.push(cart[i].id);
            console.log(cart[i].id);
        }
        if (cart.length === 0 || products.length === 0) {
            alert("Veuillez ajoutez des articles au panier");
            return 0;
        }
        console.log(cart.length);
        console.log(products.length);
        for (let i = 0; i < cart.length; i++) {
            if (+cart[i].quantity < 1 || +cart[i].quantity > 100) {
                alert(
                    "La quantité de canapé d'un même modèle doit être comprise entre 0 et 100"
                );
                return 0;
            }
        }

        console.log(products);
        const firstName = document.querySelector("#firstName").value;
        const lastName = document.querySelector("#lastName").value;
        const address = document.querySelector("#address").value;
        const city = document.querySelector("#city").value;
        const email = document.querySelector("#email").value;


        if (
            !firstNameChecker(firstName) ||
            !lastNameChecker(lastName) ||
            !addressChecker(address) ||
            !cityChecker(city) ||
            !emailChecker(email)
        ) {
            alert("Veuillez remplir correctement le formulaire !");
            return 0;
        }


        const user = {
            contact: {
                firstName,
                lastName,
                address,
                city,
                email,
            },
            products,
        };


        fetch("http://localhost:3000/api/products/order", {

            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
        })
            .then((response) => response.json())

            .then((data) => {
                window.location.href = `confirmation.html?id=${data.orderId}`;
                // localStorage.clear();
            })
            .catch((error) => alert("Il y a un problème: ", error.message));
    });
};

cartForm();





