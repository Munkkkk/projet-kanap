const url = "http://localhost:3000/api/products"

let canape = document.querySelector(".items")

fetch(url)
    .then(response => response.json())
    .then(data => {
        for (let items of data) {
            console.log(items)
            canape.innerHTML +=
                `<a href="./product.html?id=${items._id}">
                <article>
                  <img src="${items.imageUrl}" alt="${items.altTxt}">
                  <h3 class="productName">${items.name}</h3>
                  <p class="productDescription">${items.description}</p>
                </article>
              </a>`;
        }
    })

    .catch(function (error) {
        console.log('Impossible de charger les canapés' + error.message);
    });