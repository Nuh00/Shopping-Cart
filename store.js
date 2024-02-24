import items from './items.json'



const storeTemplate = document.querySelector('#store-item-template')
const container = document.querySelector(".flex.flex-wrap.-m-4");
const LOCAL_STORAGE_TODO_PREFIX = 'SHOPPING_CART';
const LOCAL_STORAGE_TODO_KEY = `${LOCAL_STORAGE_TODO_PREFIX}-items`;

const cartContainer = document.querySelector('.overflow-y-auto.px-4.pt-4')
console.log(cartContainer)
const cartTemplate = document.querySelector('#cart-template')

export const store = loadCartOnRefresh() || []
console.log(store)




export function setUpStore(){
    

    items.forEach(renderItem)

    if(store){
        store.forEach(item => {
            addLoad(item)
        })
    }

    
    
}




function renderItem(item){
    const clone = storeTemplate.content.cloneNode(true)

    const dataStoreItem = clone.querySelector('[data-store-item]')
    dataStoreItem.dataset.itemId = item.id
    const img = item.imageColor
    const color = item.name
    const price = item.priceCents

    clone.querySelector('[data-name]').textContent = color
    clone.querySelector('[data-price]').textContent = "$" + price / 100 + ".00"
    clone.querySelector('[data-image]').src = "https://dummyimage.com/420x260/" + img + "/" + img

    container.appendChild(clone)
}

// NOW WE START TO WORK ON THE SHOPPING CART BUTTON
const topRightShoppingCart = document.querySelector('[data-shopping-cart]')
const cartButton = document.querySelector('[data-cart-button]')

cartButton.addEventListener('click', () => {
    topRightShoppingCart.classList.toggle('invisible')
    
})




// Adding items to the shopping cart



export function addToCart(){// THIS ONE
    document.addEventListener('DOMContentLoaded', (event) => {
        const storeButton = document.querySelectorAll('[data-store-button]');
        storeButton.forEach(button => {(renderStoreButton(button))});
    });
}



export function removingFromCart(){// THIS ONE
    cartContainer.addEventListener('click', event => {
        if (!event.target.matches('[data-remove-from-cart-button]')) {return}
        const button = event.target
        const parent = button.closest('.mb-6')
        const parentId = parent.dataset.cartId
        const obj = items.find(item => item.id === Number(parentId))
        const price = obj.priceCents / 100
        removeFromTotal(price)
        removeFromCartItem(parent, price)
        
        
    });
    
}







// change of the cart logo
const cartLogo = document.querySelector('[data-icon-amount]')

function renderStoreButton(button){
    button.addEventListener('click', () => {
        const itemId = button.closest('[data-store-item]').dataset.itemId
        const cartClone = cartTemplate.content.cloneNode(true)
        const obj = items.find(item => item.id === Number(itemId))
        
        store.push(obj)
        console.log(store)
        saveCart(store)
        
        // Check if item is already in the cart
        const existingItem = Array.from(cartContainer.children).find(child => child.dataset.cartId === itemId);
        console.log(existingItem)
        
        // We need to add the price to the total even if the item is already in the cart
        const price = obj.priceCents
        
        
        addTotal(price / 100)// function for the total price
        
        
        if (existingItem) {
            const input = existingItem.querySelector('[data-cart-quantity]')
            const quantity = parseInt(input.innerHTML.slice(1))
            input.innerHTML = "x" + (quantity + 1)
            
            // Add the price to cart for the item that is not being displayed.
            const nonCartItem = existingItem.querySelector('[data-cart-price]')
            const nonCartPrice = nonCartItem.innerHTML.slice(1)
            const newPrice = parseFloat(nonCartPrice) + price / 100
            nonCartItem.innerHTML = "$" + newPrice.toFixed(2)
            
            cartLogo.textContent = parseInt(cartLogo.textContent) + 1
            return;
        }
        
        const img = obj.imageColor
        const color = obj.name
        const id = obj.id
        
        const mb6 = cartClone.querySelector(".mb-6")
        mb6.dataset.cartId = id
        
        
        cartClone.querySelector('[data-cart-color]').textContent = color
        cartClone.querySelector('[data-cart-price]').textContent = "$" + price / 100 + ".00"
        cartClone.querySelector('[data-cart-image]').src = "https://dummyimage.com/420x260/" + img + "/" + img
        // Add itemId to the cart item
        
        cartContainer.appendChild(cartClone)
        
        
        // Now we need to change the icon amount of the cart button
        
        cartLogo.textContent = parseInt(cartLogo.textContent) + 1
        
    })
}





let total = 0; // Initialize total

function addTotal(price) {
    total += price;
    // Update the total in the UI
    const totalElement = document.querySelector('[data-total]');
    totalElement.textContent = "$" + total.toFixed(2);
    
    // removeFromTotal(price)
}




function removeFromTotal(price) {
    const totalElementR = document.querySelector('[data-total]');
    if(totalElementR.textContent === "$0.00") return;
    const totalElementRValue = parseFloat(totalElementR.textContent.slice(1))
    totalElementR.textContent = "$" + (totalElementRValue - price).toFixed(2);
}


// // SUbtracting from the total price

function removeFromCartItem(parent, price){
    if(cartLogo.textContent === "1"){
        cartLogo.textContent = "0"
    };
    const quantity = parent.querySelector('[data-cart-quantity]').innerHTML
    if(quantity === "x1"){
        parent.remove()
        total = 0
        return;
    }
    const quantityNumber = parseInt(quantity.slice(1))
    parent.querySelector('[data-cart-quantity]').innerHTML = "x" + (quantityNumber - 1)
    
    const cartItemPrice = parent.querySelector('[data-cart-price]').innerHTML.slice(1)
    const newPrice = parseFloat(cartItemPrice) - price
    parent.querySelector('[data-cart-price]').innerHTML = "$" + newPrice.toFixed(2)
    
    cartLogo.textContent = parseInt(cartLogo.textContent) - 1
    
    
    
    
}



// Saving the cart to local storage


function saveCart(store){
    
    localStorage.setItem(LOCAL_STORAGE_TODO_KEY, JSON.stringify(store));
}



function loadCartOnRefresh(){
    const storeString = localStorage.getItem(LOCAL_STORAGE_TODO_KEY);
    const store = JSON.parse(storeString);

    
    return store
    // deleteLoad(store)

}


 function addLoad(item){

    
        const cartClone = cartTemplate.content.cloneNode(true)
        const img = item.imageColor
        const color = item.name
        const price = item.priceCents
        const id = item.id
        const mb6 = cartClone.querySelector(".mb-6")
        const existingItem = Array.from(cartContainer.children).find(child => child.dataset.cartId == id);


        addTotal(price / 100)

        if(existingItem) {
            
            const input = existingItem.querySelector('[data-cart-quantity]')
            const quantity = parseInt(input.innerHTML.slice(1))
            input.innerHTML = "x" + (quantity + 1)
            const nonCartItem = existingItem.querySelector('[data-cart-price]')
            const nonCartPrice = nonCartItem.innerHTML.slice(1)
            const newPrice = parseFloat(nonCartPrice) + price / 100
            nonCartItem.innerHTML = "$" + newPrice.toFixed(2)
            cartLogo.textContent = parseInt(cartLogo.textContent) + 1

            return;
        }


        mb6.dataset.cartId = id
        cartClone.querySelector('[data-cart-color]').textContent = color
        cartClone.querySelector('[data-cart-price]').textContent = "$" + price / 100 + ".00"
        cartClone.querySelector('[data-cart-image]').src = "https://dummyimage.com/420x260/" + img + "/" + img
        cartContainer.appendChild(cartClone)
        cartLogo.textContent = parseInt(cartLogo.textContent) + 1
    


}

function deleteLoad(store){
    if(store){
        store.forEach(item => {
            const price = item.priceCents / 100
            removeFromTotal(price)
        })
    }
}