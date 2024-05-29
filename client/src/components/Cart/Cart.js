import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { MightLike, Alert } from "../index";

import styles from "./Cart.module.css";

// Icons

import { IoIosAdd } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { LuMinus } from "react-icons/lu";
import { IoAdd } from "react-icons/io5";
import { FiMinus } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";

// states

const CartItem = ({ item, handleRemove, handleAddAndminus }) => {
  return (
    <div className={styles.cartItem}>
      <Link to={`/products/${item.slug}`} className={styles.cartItemLink}>
        <img src={item.image} alt="product" className={styles.cartItemImg} />
      </Link>

      <div className={styles.cartItemInfo}>
        <h3
          className={styles.cartItemTitle}
          onClick={() => {
            window.location.href = `/products/${item.slug}`;
          }}
        >
          {item.title}
        </h3>
        <div className={styles.cartItemActions}>
          <p className={styles.size}>{item.size}</p>
          <div className={styles.itemQuantity}>
            <FiMinus
              className={styles.minus}
              onClick={() =>
                handleAddAndminus(item._id, "minus", item.selectedSize)
              }
            />
            <p className={styles.quantity}>{item.quantity}</p>
            <IoAdd
              className={styles.add}
              onClick={() =>
                handleAddAndminus(item._id, "add", item.selectedSize)
              }
            />
          </div>
          <p className={styles.price}>${item.price}</p>
          <AiOutlineDelete
            className={styles.remove}
            onClick={() => {
              handleRemove(item._id, item.selectedSize, true);
            }}
          />
        </div>
      </div>
    </div>
  );
};

function Cart() {
  const [cartitems, setCartItems] = useState([]);
  const [clicked, setClicked] = useState(false);

  const user = JSON.parse(localStorage.getItem("currentUser"));
  let link;
  if (user) {
    link = `http://localhost:9000/users/${user._id}/cart`;
  }

  // get cart items from server
  const getCartItems = async () => {
    if (!user) return;
    const response = await fetch(link);
    const data = await response.json();
    if (data.cart) {
      setCartItems(data.cart.items);
    } else {
      setCartItems([]);
    }
  };

  useEffect(() => {
    getCartItems();
  }, []);

  //   console.log(cartitems);
  const subtotal = cartitems?.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  const request = async (method, url, data) => {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return response.json();
  };
  const handleRemove = (id, size, deleteButton = false) => {
    let newCart;
    if (deleteButton) {
      // Remove the item based on ID and size without considering quantity
      newCart = cartitems.filter(
        (item) => !(item._id === id && item.selectedSize === size)
      );
    } else {
      // Remove only if quantity is 0
      newCart = cartitems.filter(
        (item) =>
          !(
            item._id === id &&
            item.selectedSize === size &&
            item.quantity === 0
          )
      );
    }

    //   post request to update cart
    request("PATCH", link, { user, items: newCart }).then((data) => {
      setCartItems(data.cart.items);
    });
  };

  const handleAddAndminus = (id, type, size) => {
    let newCart = cartitems.map((item) => {
      if (item._id === id && item.quantity >= 1 && item.selectedSize === size) {
        type === "add" ? (item.quantity += 1) : (item.quantity -= 1);
      }
      return item;
    });

    newCart = newCart.filter((item) => item.quantity > 0);

    //   post request to update cart
    request("PATCH", link, { user, items: newCart }).then((data) => {
      setCartItems(data.cart.items);
    });
  };

  //   useEffect(() => {
  //     setCartItems(JSON.parse(localStorage.getItem("cart")));
  //   }, []);
  //   console.log(cartitems);
  const totalQuantity = cartitems
    ? cartitems.reduce((acc, item) => {
        return acc + +item.quantity;
      }, 0)
    : 0;
  const tax = 0.05;

  const handleCheckout = () => {
    const items = cartitems.map((item) => ({
      product_id: item.product,
      name: item.title,
      quantity: item.quantity,
      image: item.image,
      tax,
    }));

    fetch("http://localhost:9000/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: user._id,
        items,
      }),
    })
      .then((response) => response.json())
      .then(({ link, items, status, user }) => {
        makeOrder({
          user,
          items,
          payment_method: "card",
          total_amount: subtotal + subtotal * tax,
        });
        // open a blan
        window.open(link, "_blank");

        console.log(link, status);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const makeOrder = async (order) => {
    try {
      // Place order
      const orderResponse = await fetch(
        `http://localhost:9000/users/${order.user}/orders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(order),
        }
      );

      if (!orderResponse.ok) {
        throw new Error(`Failed to place order: ${orderResponse.statusText}`);
      }

      const orderData = await orderResponse.json();
      console.log("Order Response:", orderData);

      // Clear cart
      const cartResponse = await fetch(
        `http://localhost:9000/users/${order.user}/cart`,
        {
          method: "DELETE",
        }
      );

      if (!cartResponse.ok) {
        throw new Error(`Failed to clear cart: ${cartResponse.statusText}`);
      }

      const cartData = await cartResponse.json();
      console.log("Cart Response:", cartData);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.cart}>
        <div className={styles.cartInfo + " " + (clicked && styles.clicked)}>
          <div className={styles.cartHeader}>
            <h1 className={styles.cartTitle}>Shopping Cart</h1>
            <p className={styles.cartItemsCount}>
              {totalQuantity} {totalQuantity === 1 ? "item" : "items"}
            </p>
          </div>
          <div className={styles.cartItems}>
            {cartitems.length > 0 ? (
              cartitems.map((item) => {
                if (item.quantity === 0) {
                  // handleRemove(item._id, item.selectedSize);
                  return null;
                }

                return (
                  <CartItem
                    key={Math.random()}
                    item={item}
                    handleRemove={handleRemove}
                    handleAddAndminus={handleAddAndminus}
                  />
                );
              })
            ) : (
              <p>No items in cart</p>
            )}
          </div>
        </div>

        {/* cart summary */}
        <div className={styles.cartSummary + " " + (clicked && styles.clicked)}>
          <h3 className={styles.cartSummaryTitle}>Cart Summary</h3>
          <div className={styles.cartSummaryItem}>
            <p className={styles.cartSummaryItemText}>Subtotal</p>
            <p className={styles.cartSummaryItemPrice}>${subtotal || "-"}</p>
          </div>
          {/* <div className={styles.cartSummaryItem}>
          <p className={styles.cartSummaryItemText}>Shipping</p>
          <p className={styles.cartSummaryItemPrice}>$10</p>
        </div> */}
          <div className={styles.cartSummaryItem}>
            <p className={styles.cartSummaryItemText}>Estimated Tax</p>
            <p className={styles.cartSummaryItemPrice}>
              {/* Round to the nearest cent */}$
              {Math.round(subtotal * 0.05 * 100) / 100 || "-"}
            </p>
          </div>
          <div className={styles.cartSummaryItem}>
            <p className={styles.cartSummaryItemText}>Total</p>
            <p className={styles.cartSummaryItemPrice}>
              ${subtotal + subtotal * 0.05 || "-"}
            </p>
          </div>

          {/* <Link to="/checkout"> */}
          <button
            className={styles.checkoutButton}
            disabled={totalQuantity === 0}
            onClick={() => {
              setClicked(true);
              handleCheckout();
            }}
          >
            Proceed to Checkout
          </button>
          {/* </Link> */}
        </div>
      </div>
      <MightLike cartitems={cartitems} />
    </div>
  );
}

export default Cart;
