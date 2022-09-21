document.getElementById('complete-order').addEventListener('click', () => {
    const cart = getLocalStorage('cart');
    const order = getLocalStorage('order');
    
    setLocalStorage('order', [...order, ...cart]);
    setLocalStorage('cart', []);

    
});