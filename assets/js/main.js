import loader from "./components/loader.js";
import showmenu from "./components/showmenu.js";
import showcart from "./components/showcart.js";
import products from "./components/products.js";
import getproducts from "./helpers/getproducts.js";
import cart from "./components/cart.js";
/*UI Elements*/
/*ocultar loader*/
loader ()

/*mostrar menu*/
showmenu ()

/*mostrar carrito*/
showcart ()

/*End UI Elements*/


/*products*/
const {db, printproducts} = products (await getproducts ())

/*carrito */
cart (db, printproducts)

const darkModeToggle = document.getElementById("dark-mode-toggle");
const body = document.body;

darkModeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
});