function products (products) {
    const db = [...products]

    function printproducts () {
        const productsDOM = document.querySelector('.products__container')
        let htmlproduct = ''

        for (const product of db ) {
            htmlproduct += `
            <article class="product">
                <div class="product__image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product__content">
                    <button type="button" class="product__btn add--to--cart" data-id="${product.id}">
                        <i class='bx bx-cart-add' ></i>
                    </button>
                    <span class="product__price">${product.price}</span>
                    <span class="product__stock">Disponibles: ${product.quantity}</span>
                    <h3 class="product__title">${product.name}</h3>
                </div>
            </article>`
           
        }

        productsDOM.innerHTML = htmlproduct
    }

    printproducts ()


    return {
        db,
        printproducts
    }
}

export default products