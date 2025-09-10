// import { useTheme } from "@emotion/react";
// import Navbar from "./Navbar";
// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   CardMedia,
//   CircularProgress,
//   Container,
//   FormControl,
//   FormControlLabel,
//   FormLabel,
//   Radio,
//   RadioGroup,
//   TextField,
//   Typography,
// } from "@mui/material";
// import { useEffect, useState } from "react";
// import { Link, useAsyncError } from "react-router-dom";
// import MySnackBar from "./MySnackBar";

// // Stripe
// import {
//   CardNumberElement,
//   CardExpiryElement,
//   CardCvcElement,
//   CardElement,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";

// export default function Checkout() {
//   const theme = useTheme();
//   const stripe = useStripe();
//   const elements = useElements();

//   const [loading, setLoading] = useState(false);
//   const [cart, setCart] = useState([]);
//   const [paymentMethod, setPaymentMethod] = useState("credit");
//   const navbarPages = ["Shop", "Services", "About"];

//   // make the form input like component
//   // 3. إخفاء أو إظهار آخر 4 أرقام
//   // 4. التحقق (Validation)

//   useEffect(() => {
//     const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
//     setCart(storedCart);
//     console.log(cart);
//   }, []);

//   //calc the total price
//   const subtotal = cart.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0
//   );
//   const shipping = 5;
//   const tax = subtotal * 0.08;
//   const total = subtotal + shipping + tax;
//   // const [card, setCard] = useState({
//   //   method: "credit",
//   //   cardNumber: "",
//   //   expDate: "",
//   //   cvv: "",
//   // });
//   // const [errors, setErrors] = useState({
//   //   cardNumber: null,
//   //   expDate: null,
//   //   cvv: null,
//   // });
//   // const [touched, setTouched] = useState({
//   //   cardNumber: false,
//   //   expDate: false,
//   //   cvv: false,
//   // });
//   // function handleChange(e) {
//   //   const { name, value } = e.target;
//   //   let newValue = value;

//   //   if (name === "cardNumber") {
//   //     newValue =
//   //       value
//   //         .replace(/\D/g, "")
//   //         .match(/.{1,4}/g)
//   //         ?.join(" ") || "";
//   //   }

//   //   if (name === "expDate") {
//   //     // يخلي التاريخ بصيغة MM/YY
//   //     newValue = value.replace(/\D/g, "");
//   //     if (newValue.length >= 3) {
//   //       newValue = newValue.slice(0, 2) + "/" + newValue.slice(2, 4);
//   //     }
//   //   }

//   //   setCard((prev) => ({ ...prev, [name]: newValue }));

//   //   if (touched[name]) validateField(name, newValue);
//   // }

//   // function handleBlur(e) {
//   //   const { name, value } = e.target;
//   //   setTouched((prev) => ({ ...prev, [name]: true }));
//   //   validateField(name, value);
//   // }
//   // // regex pattern validators
//   // const cardNumberRegex = /^(\d{4}\s){3}\d{4}$/;
//   // const expDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
//   // const cvvRegex = /^\d{3,4}$/;
//   // const validators = {
//   //   cardNumber: (v) =>
//   //     !v
//   //       ? "Card number is required."
//   //       : cardNumberRegex.test(v)
//   //       ? ""
//   //       : "Card number must be 16 digits (e.g. 1234 5678 9012 3456).",

//   //   expDate: (v) =>
//   //     !v
//   //       ? "Expiration date is required."
//   //       : expDateRegex.test(v)
//   //       ? ""
//   //       : "Expiration date must be in MM/YY format (e.g. 08/27).",

//   //   cvv: (v) =>
//   //     !v
//   //       ? "CVV is required."
//   //       : cvvRegex.test(v)
//   //       ? ""
//   //       : "CVV must be 3 or 4 digits.",
//   // };
//   // const validateField = (field, value) => {
//   //   const msg = validators[field](value);
//   //   setErrors((prev) => ({ ...prev, [field]: msg }));
//   //   return !msg;
//   // };

//   // DIALOG MODAL
//   const [showSignInDialog, setShowSignInDialog] = useState(false);
//   const [message, setMessage] = useState({ text: "", type: "success" });
//   const user = JSON.parse(localStorage.getItem("currentUser"));

//   function openSignInDialog(text, type = "success") {
//     setMessage({ text, type });
//     setShowSignInDialog(true);
//   }
//   function handleSignInClose() {
//     setShowSignInDialog(false);
//   }
//   // form submit
//   async function handleShoppingCart(e) {
//     e.preventDefault();
//     setLoading(true);
//     // use stripe
//     if (!stripe || !elements) {
//       openSignInDialog("Stripe not loaded", "error");
//       setLoading(false);
//       return;
//     }
//     const cardElement = elements.getElement(CardElement);
//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: "card",
//       card: cardElement,
//     });
//     if (error) {
//       openSignInDialog(error.message, "error");
//     } else {
//       console.log("✅ Payment method:", paymentMethod);
//       openSignInDialog("Order placed successfully!", "success");

//       setLoading(false);
//     }

//     // 🔑 ابعتي paymentMethod.id للسيرفر علشان يكمل الدفع
//     await fetch("http://localhost:5000/create-payment-intent", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         paymentMethodId: paymentMethod.id,
//         amount: total * 100,
//       }),
//     });

//     // setTimeout(() => {
//     //   const isCardValid = validateField("cardNumber", card.cardNumber);
//     //   const isExpValid = validateField("expDate", card.expDate);
//     //   const isCvvValid = validateField("cvv", card.cvv);

//     //   if (isCardValid && isExpValid && isCvvValid) {
//     //     openSignInDialog("Order placed!", "success");
//     //   } else {
//     //     openSignInDialog("Fix validation errors", "error");
//     //     console.log("");
//     //   }
//     //   setLoading(false);
//     // }, 1000);
//   }
//   return (
//     <>
//       {/* SIGN IN MODAL */}
//       <MySnackBar
//         open={showSignInDialog}
//         message={message}
//         onClose={handleSignInClose}
//       />
//       <Navbar
//         pages={navbarPages}
//         showSearchIcon={false}
//         showFavoriteIcon={false}
//         showCartIcon={false}
//         cartItems={cart.length}
//       />
//       <Container maxWidth="md" sx={{ my: 6 }}>
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "flex-start",
//             justifyContent: "center",
//           }}
//         >
//           <Box sx={{ textAlign: "start" }}>
//             <Link to="/shopping-cart">
//               <Typography
//                 variant="body2"
//                 sx={{
//                   color: theme.palette.secondary.main,
//                   textDecoration: "none",
//                   "&:hover": { textDecoration: "underline" },
//                 }}
//               >
//                 Cart
//               </Typography>
//             </Link>
//             <Typography variant="body2"> / Checkout</Typography>
//           </Box>
//           <Typography
//             variant="h4"
//             sx={{ fontWeight: "bold", my: 2, textAlign: "start" }}
//           >
//             Checkout
//           </Typography>
//         </Box>

//         <Box
//           component="form"
//           sx={{
//             width: "100%",
//             mb: 4,
//             display: "flex",
//             flexDirection: "column",
//           }}
//         >
//           {/* Shipping Address */}
//           <FormControl sx={{ width: { xs: "100%", md: "50%" } }}>
//             <Typography
//               variant="h6"
//               sx={{ fontWeight: 600, mb: 3, textAlign: "start" }}
//             >
//               Shipping Address
//             </Typography>

//             <FormControl sx={{ mb: 2 }}>
//               <FormLabel
//                 sx={{ textAlign: "start", color: theme.palette.text.primary }}
//               >
//                 Username
//               </FormLabel>
//               <TextField
//                 defaultValue={user.username}
//                 margin="normal"
//                 disabled
//                 fullWidth
//               />
//             </FormControl>
//             <FormControl sx={{ mb: 2 }}>
//               <FormLabel sx={{ textAlign: "start" }}>Address</FormLabel>
//               <TextField
//                 defaultValue={user.address}
//                 margin="normal"
//                 disabled
//                 fullWidth
//               />
//             </FormControl>
//             <FormControl sx={{ mb: 2 }}>
//               <FormLabel
//                 sx={{ textAlign: "start", color: theme.palette.text.primary }}
//               >
//                 City
//               </FormLabel>
//               <TextField
//                 defaultValue={user.city}
//                 margin="normal"
//                 disabled
//                 fullWidth
//               />
//             </FormControl>

//             <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
//               <FormControl>
//                 <FormLabel
//                   sx={{ textAlign: "start", color: theme.palette.text.primary }}
//                 >
//                   State
//                 </FormLabel>
//                 <TextField
//                   defaultValue={user.state}
//                   margin="normal"
//                   disabled
//                   fullWidth
//                 />
//               </FormControl>
//               <FormControl>
//                 <FormLabel
//                   sx={{ textAlign: "start", color: theme.palette.text.primary }}
//                 >
//                   Zip Code
//                 </FormLabel>
//                 <TextField
//                   defaultValue={user.zipCode}
//                   margin="normal"
//                   disabled
//                   fullWidth
//                 />
//               </FormControl>
//             </Box>
//           </FormControl>
//           {/* Payment Method */}
//           <FormControl>
//             <Typography
//               variant="h6"
//               sx={{ fontWeight: 600, mt: 4, mb: 2, textAlign: "start" }}
//             >
//               Payment Method
//             </Typography>
//             {/* OPTION 1  STRIPE */}
//             <FormControl>
//               <RadioGroup
//                 value={paymentMethod}
//                 onChange={(e) => setPaymentMethod(e.target.value)}
//                 sx={{ mb: 2 }}
//               >
//                 <FormControlLabel
//                   value="credit"
//                   control={
//                     <Radio
//                       sx={{
//                         "&.Mui-checked": {
//                           color: theme.palette.text.primary,
//                         },
//                       }}
//                     />
//                   }
//                   label="Credit Card"
//                 />
//                 <FormControlLabel
//                   value="paypal"
//                   control={
//                     <Radio
//                       sx={{
//                         "&.Mui-checked": {
//                           color: theme.palette.text.primary,
//                         },
//                       }}
//                     />
//                   }
//                   label="PayPal"
//                 />
//               </RadioGroup>
//             </FormControl>
//             {paymentMethod === "credit" && (
//               <>
//                 {/* Card Number */}
//                 <FormControl sx={{ mb: 2 }}>
//                   <FormLabel sx={{ textAlign: "start" }}>Card Number</FormLabel>
//                   <Box
//                     sx={{
//                       border: "1px solid #ccc",
//                       borderRadius: 2,
//                       p: 2,
//                     }}
//                   >
//                     <CardNumberElement
//                       options={{
//                         style: {
//                           base: {
//                             "& .MuiInputBase-input": {
//                               color: theme.palette.secondary.main,
//                             },
//                             "& .MuiInputLabel-root": {
//                               color: theme.palette.secondary.main,
//                             },
//                           },
//                         },
//                       }}
//                       margin="normal"
//                       fullWidth
//                     />
//                   </Box>
//                 </FormControl>

//                 {/* Expiration Date + CVV */}
//                 <Box
//                   sx={{
//                     display: "flex",
//                     gap: 2,
//                     color: theme.palette.secondary.main,
//                   }}
//                 >
//                   <FormControl sx={{ mb: 2, flex: 1 }}>
//                     <FormLabel sx={{ textAlign: "start" }}>
//                       Expiration Date
//                     </FormLabel>
//                     <Box
//                       sx={{ border: "1px solid #ccc", borderRadius: 2, p: 1.5 }}
//                     >
//                       <CardExpiryElement
//                         options={{
//                           style: {
//                             base: {
//                               "& .MuiInputBase-input": {
//                                 color: theme.palette.secondary.main,
//                               },
//                               "& .MuiInputLabel-root": {
//                                 color: theme.palette.secondary.main,
//                               },
//                             },
//                           },
//                         }}
//                         margin="normal"
//                         fullWidth
//                       />
//                     </Box>
//                   </FormControl>
//                   <FormControl sx={{ mb: 2, flex: 1 }}>
//                     <FormLabel sx={{ textAlign: "start" }}>CVV</FormLabel>
//                     <Box
//                       sx={{ border: "1px solid #ccc", borderRadius: 2, p: 1.5 }}
//                     >
//                       <CardCvcElement
//                         options={{
//                           style: {
//                             base: {
//                               "& .MuiInputBase-input": {
//                                 color: theme.palette.secondary.main,
//                               },
//                               "& .MuiInputLabel-root": {
//                                 color: theme.palette.secondary.main,
//                               },
//                             },
//                           },
//                         }}
//                         fullWidth
//                       />
//                     </Box>
//                   </FormControl>
//                 </Box>
//               </>
//             )}
//             {paymentMethod === "paypal" && (
//               <Box sx={{ mt: 2 }}>
//                 <Typography variant="body1" color="text.secondary">
//                   You will be redirected to PayPal to complete your payment
//                   securely.
//                 </Typography>
//               </Box>
//             )}

//             {/* OPTION 2 STRIPE */}
//             {/* <CardElement options={{ hidePostalCode: true }} /> */}

//             {/* OPTION 3 REGEX VALIDATION  */}
//             {/* <FormControl>
//               <RadioGroup
//                 value={card.method}
//                 onChange={(e) => {
//                   const method = e.target.value;
//                   setCard({
//                     method,
//                     cardNumber: "",
//                     expDate: "",
//                     cvv: "",
//                   });
//                   setErrors({
//                     cardNumber: null,
//                     expDate: null,
//                     cvv: null,
//                   });
//                   setTouched({
//                     cardNumber: false,
//                     expDate: false,
//                     cvv: false,
//                   });
//                 }}
//                 sx={{ mb: 2 }}
//               >
//                 <FormControlLabel
//                   value="credit"
//                   control={
//                     <Radio
//                       sx={{
//                         "&.Mui-checked": {
//                           color: theme.palette.text.primary,
//                         },
//                       }}
//                     />
//                   }
//                   label="Credit Card"
//                 />
//                 <FormControlLabel
//                   value="paypal"
//                   control={
//                     <Radio
//                       sx={{
//                         "&.Mui-checked": {
//                           color: theme.palette.text.primary,
//                         },
//                       }}
//                     />
//                   }
//                   label="PayPal"
//                 />
//               </RadioGroup>
//             </FormControl>
//             <FormControl sx={{ mb: 2 }}>
//               <FormLabel sx={{ textAlign: "start" }}>Card Number</FormLabel>
//               <TextField
//                 placeholder="1234 5678 9012 3456"
//                 margin="normal"
//                 // value={card.cardNumber}
//                 // name="cardNumber"
//                 // helperText={errors.cardNumber}
//                 // onChange={handleChange}
//                 // onBlur={handleBlur}
//                 // touch={touched.cardNumber}
//                 // error={Boolean(errors.cardNumber)}
//                 fullWidth
//                 inputProps={{
//                   inputMode: "numeric",
//                   pattern: "[0-9]*",
//                   maxLength: 19,
//                 }}
//                 sx={{
//                   "& .MuiInputBase-input": {
//                     color: theme.palette.secondary.main,
//                   },
//                   "& .MuiInputLabel-root": {
//                     color: theme.palette.secondary.main,
//                   },
//                 }}
//               />
//             </FormControl>
//             <Box
//               sx={{
//                 display: "flex",
//                 gap: 2,
//                 color: theme.palette.secondary.main,
//               }}
//             >
//               <FormControl sx={{ mb: 2 }}>
//                 <FormLabel sx={{ textAlign: "start" }}>
//                   Expiration Date
//                 </FormLabel>
//                 <TextField
//                   // value={card.expDate}
//                   // name="expDate"
//                   // onChange={handleChange}
//                   // onBlur={handleBlur}
//                   // touch={touched.expDate}
//                   // error={Boolean(errors.expDate)}
//                   // helperText={errors.expDate || ""}
//                   placeholder="MM/YY"
//                   margin="normal"
//                   fullWidth
//                   inputProps={{
//                     inputMode: "numeric",
//                     maxLength: 5, // MM/YY
//                   }}
//                   sx={{
//                     "& .MuiInputBase-input": {
//                       color: theme.palette.secondary.main,
//                     },
//                     "& .MuiInputLabel-root": {
//                       color: theme.palette.secondary.main,
//                     },
//                   }}
//                 />
//               </FormControl>
//               <FormControl sx={{ mb: 2 }}>
//                 <FormLabel sx={{ textAlign: "start" }}>CVV</FormLabel>
//                 <TextField
//                   // value={card.cvv}
//                   // name="cvv"
//                   // onChange={handleChange}
//                   // onBlur={handleBlur}
//                   // touch={touched.cvv}
//                   // error={Boolean(errors.cvv)}
//                   // helperText={errors.cvv || ""}
//                   placeholder="123"
//                   margin="normal"
//                   fullWidth
//                   inputProps={{
//                     nputMode: "numeric",
//                     pattern: "[0-9]*",
//                     maxLength: 3,
//                   }}
//                   sx={{
//                     "& .MuiInputBase-input": {
//                       color: theme.palette.secondary.main,
//                     },
//                     "& .MuiInputLabel-root": {
//                       color: theme.palette.secondary.main,
//                     },
//                   }}
//                 />
//               </FormControl>
//             </Box> */}
//           </FormControl>
//         </Box>

//         {/* Order Summary */}
//         <FormControl sx={{ display: "flex", flexDirection: "column" }}>
//           <Typography
//             variant="h6"
//             sx={{ fontWeight: "bold", mb: 2, textAlign: "start" }}
//           >
//             Order Summary
//           </Typography>
//           {cart.map((item) => (
//             <Card
//               key={item.id}
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 mb: 2,
//                 boxShadow: "none",
//               }}
//             >
//               <CardMedia
//                 component="img"
//                 image={item.img}
//                 alt={item.title}
//                 sx={{ width: 60, height: 60, mr: 2, borderRadius: 2 }}
//               />
//               <CardContent sx={{ flexGrow: 1, textAlign: "start", p: 0 }}>
//                 <Typography fontWeight={500}>{item.title}</Typography>
//                 <Typography
//                   variant="body2"
//                   color={theme.palette.secondary.main}
//                 >
//                   {item.category} • Qty: {item.quantity}
//                 </Typography>
//               </CardContent>
//               <Typography>
//                 {(item.price * item.quantity).toFixed(2)}$
//               </Typography>
//             </Card>
//           ))}

//           {/* Totals */}
//           <Box sx={{ pt: 2 }}>
//             <Box display="flex" justifyContent="space-between" mb={1}>
//               <Typography color={theme.palette.secondary.main}>
//                 Subtotal
//               </Typography>
//               <Typography>${subtotal.toFixed(2)}</Typography>
//             </Box>
//             <Box display="flex" justifyContent="space-between" mb={1}>
//               <Typography color={theme.palette.secondary.main}>
//                 Shipping
//               </Typography>
//               <Typography>${shipping.toFixed(2)}</Typography>
//             </Box>
//             <Box display="flex" justifyContent="space-between" mb={1}>
//               <Typography color={theme.palette.secondary.main}>Tax</Typography>
//               <Typography>${tax.toFixed(2)}</Typography>
//             </Box>
//             <Box
//               display="flex"
//               justifyContent="space-between"
//               fontWeight="bold"
//               mb={3}
//             >
//               <Typography color={theme.palette.secondary.main}>
//                 Total
//               </Typography>
//               <Typography>${total.toFixed(2)}</Typography>
//             </Box>
//           </Box>

//           {/* Place Order Button */}
//           <Button
//             variant="contained"
//             fullWidth
//             sx={{
//               backgroundColor: "#00C853",
//               py: 1.5,
//               fontWeight: "bold",
//               width: { xs: "100%", md: "50%" },
//               "&:disabled": {
//                 backgroundColor: theme.palette.grey[400],
//                 color: theme.palette.common.white,
//               },
//               "&:hover": {
//                 backgroundColor: theme.palette.success.dark,
//                 color: theme.palette.common.white,
//               },
//             }}
//             disabled={loading}
//             onClick={handleShoppingCart}
//           >
//             {loading ? (
//               <CircularProgress size={20} color="inherit" />
//             ) : (
//               "Place Order"
//             )}
//           </Button>
//         </FormControl>
//       </Container>
//     </>
//   );
// }
