import Header from "./components/Header";
import Meals from "./components/Meals";
import {UserProgressContextProvider} from "./context/UserProgressContext";
import {CartContextProvider} from "./context/CartContextProvider";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";

function App() {
  return (
    <>
    <UserProgressContextProvider>
    <CartContextProvider>
    <Header />
    <Cart />
    <Checkout />
    <Meals />
    </CartContextProvider>
    </UserProgressContextProvider>
    </>
  );
}

export default App;
