import items from './items.json'

export function setUpStore(){
    console.log("Store is set up" )

    items.forEach(renderItem)
    
}


const storeTemplate = document.querySelector('#store-item-template')
const container = document.querySelector(".flex.flex-wrap.-m-4");






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
const cartContainer = document.querySelector('.overflow-y-auto.px-4.pt-4')
console.log(cartContainer)
const cartTemplate = document.querySelector('#cart-template')


export function addToCart(){
    document.addEventListener('DOMContentLoaded', (event) => {
        const storeButton = document.querySelectorAll('[data-store-button]');
        
        storeButton.forEach(button => {(renderStoreButton(button))});
    });
    
    
    
    
    
}


let quantityPrice = 0; // Initialize total
function renderStoreButton(button){
    button.addEventListener('click', () => {
        const itemId = button.closest('[data-store-item]').dataset.itemId
        
        
        
        
        const cartClone = cartTemplate.content.cloneNode(true)
        
        const obj = items.find(item => item.id === Number(itemId))
        
        // Check if item is already in the cart
        const existingItem = Array.from(cartContainer.children).find(child => child.dataset.cartId === itemId);
        console.log(existingItem)
        
        // We need to add the price to the total even if the item is already in the cart
        const price = obj.priceCents

        quantityPrice += price // Add the price to the item total

        addTotal(price / 100)// function for the total price

        
        if (existingItem) {
            const input = existingItem.querySelector('[data-cart-quantity]')
            const quantity = parseInt(input.innerHTML.slice(1))
            input.innerHTML = "x" + (quantity + 1)
             

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
    })
}


let total = 0; // Initialize total

function addTotal(price) {
    total += price;
    // Update the total in the UI
    const totalElement = document.querySelector('[data-total]');
    totalElement.textContent = "$" + total.toFixed(2);
}

// Adding to the total price
// Delete items from the shopping cart
// SUbtracting from the total price