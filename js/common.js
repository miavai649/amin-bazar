document.getElementById('complete-order').addEventListener('click', () => {
    const cart = getLocalStorage('cart');
    const order = getLocalStorage('order');
    
    setLocalStorage('order', [...order, ...cart]);
    setLocalStorage('cart', []);

    const cartContainer = document.getElementById("cart-item-container");
    cartContainer.innerHTML = '';

    document.getElementById("product-count").innerText = 0;
  
    document.getElementById("cart-count").innerText = 0;
  
    document.getElementById("price").innerText = 0;
  
    document.getElementById("vat").innerText = 0;
  
    document.getElementById("total-price").innerText = 0;

    window.location.href = '/page/orders.html';
});