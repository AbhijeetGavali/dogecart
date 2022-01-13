import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../../styles/newOrder.module.css";

export default function NewOrder() {
  const { login, user, cart } = useSelector((state) => {
    return {
      login: state.user.user.login,
      user: state.user.user,
      cart: state.order.shoppingCart,
    };
  });
  const userDetails = user.login
    ? { ...user }
    : {
        name: { userFirstName: "", userLastName: "" },
        shippingDetails: {
          street: { address1: "", address2: "" },
          city: "",
          state: "",
          pincode: "",
        },
      };
  const [name, setName] = useState({
    firstName: userDetails.name.userFirstName,
    lastName: userDetails.name.userLastName,
  });
  const [email, setEmail] = useState(userDetails.email);
  const [mobileNumber, setMobileNumber] = useState("");
  const [address1, setAddress1] = useState(
    userDetails.shippingDetails.street.address1
  );
  const [address2, setAddress2] = useState(
    userDetails.shippingDetails.street.address2
  );
  const [city, setCity] = useState(userDetails.shippingDetails.city);
  const [state, setState] = useState(userDetails.shippingDetails.state);
  const [pincode, setPincode] = useState(userDetails.shippingDetails.pincode);

  var amount = 0;
  cart.map((product) => {
    amount += product.price;
  });

  const dispatch = useDispatch();

  const placeOrder = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      {login ? (
        <>
          <div className={styles.cartProductsContainer}>
            <div className={styles.cartBody}>
              <h2>Cart</h2>
              {cart.length > 0 &&
                cart.map((product, idx) => (
                  <div key={idx} className={styles.product}>
                    <div className={styles.productImageContainer}>
                      <div className={styles.productImage}>
                        <Image
                          src={product.productUrl[0]}
                          layout="fill"
                          alt={product.title + "image"}
                        />
                      </div>
                    </div>
                    <div className={styles.productDetails}>
                      <h3>{product.title}</h3>
                      <div>
                        <span className={styles.amt}>
                          <span>Amt:</span>
                          <span>{product.price}</span>
                        </span>
                        <div className={styles.qyt}>
                          <span>Qyt:</span>
                          <span> {product.count} </span>
                        </div>
                        <div className={styles.qyt}>
                          <span>Size:</span>
                          <span> {product.choice.size || "NA"} </span>
                        </div>
                        <div className={styles.qyt}>
                          <span> Color:</span>
                          <span>
                            {product.choice.color ? (
                              <div
                                style={{
                                  minWidth: "20px",
                                  minHeight: "20px",
                                  borderRadius: "20px",
                                  backgroundColor: `${product.choice.color}`,
                                }}
                              ></div>
                            ) : (
                              "NA"
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              {!cart.length > 0 && (
                <Link href="/">
                  <a>
                    Your cart is empty,
                    <br /> Brouse Products
                  </a>
                </Link>
              )}
              <div className={styles.orderAmmount}>
                Order ammount: {amount}{" "}
              </div>
            </div>
            <div className={styles.shippingDetails}>
              <h2>Fill out Details and proceed for payment</h2>
              <div>
                <div className={styles.newUSerFormBox}>
                  <form className={styles.newUSerForm} onSubmit={placeOrder}>
                    <span>
                      <div className={styles.formGroup}>
                        <input
                          type="text"
                          name="firstName"
                          id="firstName"
                          className={styles.formInput}
                          placeholder=" "
                          value={name.firstName}
                          required
                          onChange={(e) => {
                            setMsg([""]);
                            setName({
                              ...name,
                              firstName: e.currentTarget.value,
                            });
                          }}
                        />
                        <label htmlFor="firstName" className={styles.formLable}>
                          First Name *
                        </label>
                      </div>
                      <div className={styles.formGroup}>
                        <input
                          type="text"
                          name="lastName"
                          id="lastName"
                          value={name.lastName}
                          className={styles.formInput}
                          placeholder=" "
                          required
                          onChange={(e) => {
                            setMsg([""]);
                            setName({
                              ...name,
                              lastName: e.currentTarget.value,
                            });
                          }}
                        />
                        <label htmlFor="lastName" className={styles.formLable}>
                          Last Name *
                        </label>
                      </div>
                    </span>
                    <div className={styles.formGroup}>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className={styles.formInput}
                        placeholder=" "
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <label htmlFor="email" className={styles.formLable}>
                        Email*
                      </label>
                    </div>

                    <div className={styles.formGroup}>
                      <input
                        type="text"
                        name="number"
                        id="phoneNo"
                        className={styles.formInput}
                        placeholder=" "
                        required
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                      />
                      <label htmlFor="phoneNo" className={styles.formLable}>
                        Phone No.*
                      </label>
                    </div>
                    <div className={styles.formGroup}>
                      <input
                        type="text"
                        name="address1"
                        id="address1"
                        className={styles.formInput}
                        placeholder=" "
                        required
                        value={address1}
                        onChange={(e) => setAddress1(e.target.value)}
                      />
                      <label htmlFor="address1" className={styles.formLable}>
                        Address 1*
                      </label>
                    </div>
                    <div className={styles.formGroup}>
                      <input
                        type="text"
                        name="address2"
                        id="address2"
                        className={styles.formInput}
                        placeholder=" "
                        required
                        value={address2}
                        onChange={(e) => setAddress2(e.target.value)}
                      />
                      <label htmlFor="address2" className={styles.formLable}>
                        Address 2*
                      </label>
                    </div>
                    <span>
                      {" "}
                      <div className={styles.formGroup}>
                        <input
                          type="text"
                          name="city"
                          id="city"
                          placeholder=" "
                          required
                          className={styles.formInput}
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                        />
                        <label htmlFor="city" className={styles.formLable}>
                          City*
                        </label>
                      </div>
                      <div className={styles.formGroup}>
                        <input
                          type="text"
                          name="state"
                          id="state"
                          className={styles.formInput}
                          placeholder=" "
                          required
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                        />
                        <label htmlFor="state" className={styles.formLable}>
                          State*
                        </label>
                      </div>
                    </span>

                    <div className={styles.formGroup}>
                      <input
                        type="text"
                        name="pincode"
                        id="pincode"
                        className={styles.formInput}
                        placeholder=" "
                        required
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                      />
                      <label htmlFor="pincode" className={styles.formLable}>
                        Pincode*
                      </label>
                    </div>
                    <div className={styles.formGroup}>
                      <input
                        type="submit"
                        className={styles.formBtn + " bg_gradient"}
                        value="Place Order"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className={styles.notLogedIn}>
          <h2>Order Details</h2>
          <p>
            {" "}
            to order anything u need to to login first
            <br />
            Please log in{" "}
            <Link href="/user/login">
              <a style={{ color: "skyblue" }}>here</a>
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}
