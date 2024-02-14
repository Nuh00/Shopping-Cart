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
    const price = item.price

    clone.querySelector('[data-name]').textContent = color
    clone.querySelector('[data-price]').textContent = price
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
export function addToCart(item){
const cartTemplate = document.querySelector('#cart-template')
document.addEventListener('DOMContentLoaded', (event) => {
    const storeButton = document.querySelectorAll('[data-store-button]');

    storeButton.forEach(button => {(renderStoreButton(button))});
});



console.log(cartTemplate)


}

function renderStoreButton(button){
    button.addEventListener('click', () => {
        const itemId = button.closest('[data-store-item]').dataset.itemId
        console.log(itemId)
        const item = items.find(item => item.id === itemId)
        console.log(item)
        addToCart(item)
    })
}
// Adding to the total price
// Delete items from the shopping cart
// SUbtracting from the total price