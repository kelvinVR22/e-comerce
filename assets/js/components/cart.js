function cart (db, printproducts) {
    let cart = []
    //elementos del dom
    const productsDOM = document.querySelector('.products__container')
    const notifyDOM = document.querySelector('.notify')
    const cartDOM = document.querySelector('.cart__body')
    const countDOM = document.querySelector('.cart__count--item')
    const totalDOM = document.querySelector('.cart__total--item')
    const checkoutDOM = document.querySelector('.btn--buy')
    //funciones

    function printcart () {
    let htmlCart = ''
      
      if (cart.length === 0){
        htmlCart += `<div class="cart__empty">
        <i class="bx bx-cart"></i>
        <p class="cart__empty--text">No hay productos en el Carrito</p>
    </div>
    `
        notifyDOM.classList.remove('show--notify')
      }else {
        for (const item of cart) {
            const product = db.find(p => p.id === item.id)
            htmlCart += `
            <article class="article">
                <div class="article__image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="article__content">
                    <h3 class="article__title">${product.name}</h3>
                    <span class="article__price">$${product.price}</span>
                    <div class="article__quantity">
                        <button type="button" class="article__quantity-btn article--minus" data-id="${item.id}">
                            <i class="bx bx-minus"></i>
                        </button>
                        <span class="article__quiantity-text">${item.qty}"</span>
                        <button type="button" class="article__quantity-btn article--plus" data-id="${item.id}">
                            <i class="bx bx-plus"></i>
                        </button>
                    </div>
                    <button type="button" class="article__btn remove-fron-cart" data-id="${item.id}">
                        <i class="bx bx-trash"></i>
                    </button>
                </div>
            </article>
            `
        }
        notifyDOM.classList.add('show--notify')
      }
      
      cartDOM.innerHTML = htmlCart
      notifyDOM.innerHTML = showitemsCount()
      countDOM.innerHTML = showitemsCount()
      totalDOM.innerHTML = showtotal()
    }

    function addTocart (id, qty = 1) {
        const itemFinded = cart.find(i => i.id === id)

        if (itemFinded){
            itemFinded.qty += qty  
        } else {
            cart.push({id, qty})
        }
       
        printcart ()
    }

    function removeFromCart (id, qty = 1) {
        const itemFinded = cart.find(i => i.id === id)

        const result = itemFinded.qty - qty
        if (qty > 0) {
            itemFinded.qty -= qty  
        } 
        else {
            cart = cart.filter(i => i.id !== id)
        }
        printcart ()
    }

    function deleteFromCart (id) {
        cart = cart.filter(i => i.id !== id)

        printcart ()
    }

    function showitemsCount (){
        let suma = 0
        for(const item of cart) {
            suma += item.qty
        }
        return suma
    }

    function showtotal () {
        let total = 0
        for (const item of cart) {
            const productFinded = db.find(p => p.id === item.id)
            total += item.qty * productFinded.price 
        }

        return total
    }

    function checkout () {
        for (const item of cart) {
            const productFinded = db.find(p => p.id === item.id)
           productFinded.quantity -= item.qty
        }

        cart = []
        printcart()
        printproducts()
        window.alert ('gracias por su compra')

    }

    printcart ()


    //evento
    productsDOM.addEventListener('click', function (e){
        if (e.target.closest('.add--to--cart')){
            const id = +e.target.closest('.add--to--cart').dataset.id
            addTocart(id)
        }
    })

    cartDOM.addEventListener('click', function (e) {
        if (e.target.closest('.article--minus')){
            const id = +e.target.closest('.article--minus').dataset.id
            removeFromCart(id)
        }

        if (e.target.closest('.article--plus')){
            const id = +e.target.closest('.article--plus').dataset.id
            addTocart(id)
        }

        if (e.target.closest('.remove-fron-cart')){
            const id = +e.target.closest('.remove-fron-cart').dataset.id
            deleteFromCart(id)
        }
    })

    checkoutDOM.addEventListener('click', function () {
        checkout()
    })
}

export default cart