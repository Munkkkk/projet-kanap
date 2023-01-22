const displayOrderId = () => {
    const url = new URL(window.location.href);

    const getId = document.querySelector("#orderId");
    const urlId = url.searchParams.get("id");
    getId.innerHTML = urlId;
};

displayOrderId();