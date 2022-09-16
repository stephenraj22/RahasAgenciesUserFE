import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { Button, makeStyles } from "@material-ui/core";
import photo from "./asset/blue-polycotton-ph0003-perfect-homes-by-flipkart-blue-original-imaf6dhhsfhvvjdn.jpeg";
import Typography from "@material-ui/core/Typography";
import IndeterminateCheckBoxRoundedIcon from "@material-ui/icons/IndeterminateCheckBoxRounded";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AddBoxRoundedIcon from "@material-ui/icons/AddBoxRounded";
import HighlightOffRoundedIcon from "@material-ui/icons/HighlightOffRounded";
import RemoveShoppingCartRoundedIcon from "@material-ui/icons/RemoveShoppingCartRounded";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Footer from "./Footer";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { graphql } from "react-apollo";
import { flowRight as compose } from "lodash";
import gql from "graphql-tag";

const updateCartDetails = gql`
  mutation ($id: String!, $productList: String!) {
    updateCartDetails(id: $id, productList: $productList)
  }
`;
const useStyles = makeStyles((theme) => ({
  body: {},
  box: {
    width: "20rem",
    height: "11rem",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
  isMobile: {
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  isDesktop: {
    [theme.breakpoints.up("xs")]: {
      display: "none",
    },
    [theme.breakpoints.up("sm")]: {
      display: "block",
      backgroundColor: "pink",
    },
  },
  input: {
    position: "absolute",
    width: "1.5rem",
    height: "1rem",
    border: "0px",
    marginTop: "4px",
    padding: "1px",
    marginLeft: theme.spacing(0.5),
  },
  cartIcon: {
    marginLeft: theme.spacing(3.5),
  },
  addBtn: {
    marginLeft: theme.spacing(3.5),
  },
  minusBtn: {
    marginLeft: theme.spacing(0.5),
  },
  cartDiv: {
    position: "relative",
    marginTop: "4px",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(2),
      marginTop: "5px",
    },
  },
  productImage: {
    marginLeft: theme.spacing(1),
  },
  topDiv: {
    [theme.breakpoints.up("xs")]: {
      position: "relative",
      width: "100%",
      height: "3.5rem",
    },
    [theme.breakpoints.up("sm")]: {
      position: "relative",
      width: "100%",
      height: "1rem",
    },
  },
  buyBtn: {
    [theme.breakpoints.up("sm")]: {
      marginTop: "50px",
    },
  },
  textSize1_1: {
    [theme.breakpoints.up("xs")]: {
      //textDecoration:"line-through",
      textAlign: "center",
      fontSize: 16,
      fontColor: "green",
    },
  },
  textSize2: {
    [theme.breakpoints.up("xs")]: {
      textAlign: "center",
      fontSize: 18,
      fontColor: "green",
    },
  },
  textSize3: {
    [theme.breakpoints.up("xs")]: {
      textDecoration: "line-through",
      textAlign: "center",
      fontSize: 18,
      fontColor: "green",
    },
  },
  formControl: {
    marginTop: "5%",
    minWidth: 190,
  },
  selectBox: {
    [theme.breakpoints.up("xs")]: {
      height: "50px",
      marginBottom: "20px",
    },
    [theme.breakpoints.up("sm")]: {
      height: "50px",
      marginBottom: "20px",
    },
  },
  topDiv1: {
    [theme.breakpoints.up("xs")]: {
      position: "relative",
      width: "100%",
      height: "5.5rem",
    },
    [theme.breakpoints.up("sm")]: {
      position: "relative",
      width: "100%",
      height: "8rem",
    },
  },
  textSize: {
    [theme.breakpoints.up("xs")]: {
      textAlign: "center",
      fontSize: 18,
    },
  },
  textSize1: {
    [theme.breakpoints.up("xs")]: {
      textAlign: "center",
      fontSize: 12,
      fontColor: "red",
    },
  },
  image: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
  bottomDiv: {
    [theme.breakpoints.up("xs")]: {
      height: "6rem",
      position: "relative",
      width: "100%",
    },
    [theme.breakpoints.up("xs")]: {
      height: "6rem",
      position: "relative",
      width: "100%",
    },
  },
}));

function HomePage(props) {
  const classes = useStyles();
  const history = useHistory();
  const [iter, setIter] = useState([0, 1]);
  const [flag, setFlag] = useState(false);
  const [openFlag, setOpenFlag] = useState(false);
  const [openFlag1, setOpenFlag1] = useState(false);
  const [price, setPrice] = useState(0);
  const [count, setCount] = useState(0);
  const [dialogOpen, setDialogOpen] = useState({ item: "", index: 0 });
  const [categories, setCategories] = useState(
    JSON.parse(localStorage.getItem("categories"))
  );
  const [cartProduct, setCartProduct] = useState(
    JSON.parse(localStorage.getItem("cart"))
  );
  const updateCartDetails = async () => {
    console.log("called");
    const cartData = localStorage.getItem("cart");
    const cartIdfromLs = localStorage.getItem("cartId");
    const result = await props.updateCartDetails({
      variables: {
        id:
          cartIdfromLs !== undefined && cartIdfromLs !== null
            ? cartIdfromLs
            : "",
        productList:
          cartData !== undefined && cartData !== null ? cartData : "",
      },
    });
    console.log("result123 " + result);
  };
  useEffect(() => {
    return () => updateCartDetails();
  }, []);
  useEffect(() => {
    console.log(cartProduct);
    let totalPrice = 0;
    setCount(0);
    if (cartProduct) {
      Object.keys(cartProduct).map((item) => {
        if (cartProduct[item][2]) {
          totalPrice += cartProduct[item][0] * cartProduct[item][4].pricePkt;
          setCount((prevCount) => prevCount + 1);
        }
        if (cartProduct[item][3]) {
          totalPrice += cartProduct[item][1] * cartProduct[item][4].priceCarton;
          setCount((prevCount) => prevCount + 1);
        }
      });
    }
    setPrice(totalPrice);
    return () => {
      localStorage.setItem("cart", JSON.stringify(cartProduct));
    };
  }, [flag]);
  const handleClose3 = () => {
    setOpenFlag1(false);
  };
  const handleClose1 = () => {
    setOpenFlag(false);
  };
  const handleClose2 = async () => {
    let openObj = dialogOpen;
    let state = cartProduct;
    state[openObj.item][openObj.index + 2] = false;
    /*await console.log(price)
        if(openObj.index == 0)
            await setPrice(prevState => prevState-(state[openObj.item][0]*state[openObj.item][4].pricePkt))
        else
            await setPrice(prevState => prevState-(state[openObj.item][1]*state[openObj.item][4].priceCarton))
        console.log(price)*/
    setCartProduct(state);
    setFlag((prevState) => !prevState);
    setOpenFlag(false);
  };
  const handleChange = async (event) => {
    await localStorage.setItem("cart", JSON.stringify(cartProduct));
    let n = event.target.value.split(",");
    history.replace("/products?categoryId=" + n[0] + "&categoryName=" + n[1]);
  };
  return (
    <div>
      <Dialog open={openFlag1} aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">
          {"Order response"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Accepting order only for 5000 RS and more
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose3} color="primary" autoFocus>
            close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openFlag} aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">
          {"Remove from cart?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Remove this product from cart</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose1} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose2} color="primary" autoFocus>
            Remove
          </Button>
        </DialogActions>
      </Dialog>
      <div className={classes.topDiv}></div>
      <Table
        style={{ position: "fixed", backgroundColor: "white", zIndex: 200 }}
      >
        <TableRow>
          <td style={{ textAlign: "center" }}>
            <FormControl variant="filled" className={classes.formControl}>
              <InputLabel
                id="demo-simple-select-label"
                htmlFor="filled-age-native-simple"
              >
                Buy other Category
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                label="Select Category"
                onChange={handleChange}
                className={classes.selectBox}
              >
                {categories !== null &&
                  categories.map((category) => (
                    <MenuItem value={category.id + "," + category.categoryName}>
                      {category.categoryName}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </td>
          {count != 0 && (
            <td style={{ textAlign: "left" }}>
              <Button
                variant="contained"
                className={classes.buyBtn}
                style={{ backgroundColor: "#ff8200", color: "white" }}
                onClick={() => {
                  if (price < 5000) {
                    setOpenFlag1(true);
                    return;
                  }
                  localStorage.setItem("cart", JSON.stringify(cartProduct));
                  history.replace("/buy");
                }}
                color="primary"
              >
                Buy
              </Button>
            </td>
          )}
        </TableRow>
      </Table>
      <div className={classes.topDiv1}></div>
      <Grid container>
        {cartProduct &&
          Object.keys(cartProduct).map((item) =>
            iter.map(
              (index) =>
                cartProduct[item][index + 2] && (
                  <Grid xs={12} sm={3}>
                    <Box
                      boxShadow={15}
                      bgcolor="background.paper"
                      m={1}
                      p={1}
                      className={classes.box}
                      borderRadius={6}
                    >
                      <Typography className={classes.textSize}>
                        {cartProduct[item][4].productName}
                      </Typography>
                      <Typography
                        className={classes.textSize1_1}
                        align="left"
                        noWrap
                      >
                        {cartProduct[item][4].size}
                      </Typography>
                      {index === 0 ? (
                        <Typography
                          variant="subtitle2"
                          className={classes.textSize1_1}
                          align="left"
                          style={{ color: "green" }}
                          noWrap
                        >
                          Type : {cartProduct[item][4].type}
                        </Typography>
                      ) : (
                        <Typography
                          variant="subtitle2"
                          className={classes.textSize1}
                          align="left"
                          style={{ color: "green" }}
                          noWrap
                        ></Typography>
                      )}
                      {index === 0 ? (
                        <div align="center">
                          <table>
                            <tr>
                              <td>
                                <Typography
                                  variant="subtitle2"
                                  className={classes.textSize3}
                                  align="left"
                                  style={{ color: "grey" }}
                                  noWrap
                                >
                                  {cartProduct[item][4].oldPricePkt} Rs
                                </Typography>
                              </td>
                              <td>
                                <Typography
                                  variant="subtitle2"
                                  className={classes.textSize2}
                                  align="left"
                                  style={{ color: "red" }}
                                  noWrap
                                >
                                  {cartProduct[item][4].pricePkt} Rs
                                </Typography>
                              </td>
                            </tr>
                          </table>{" "}
                        </div>
                      ) : (
                        <Typography
                          variant="subtitle2"
                          className={classes.textSize1}
                          align="left"
                          style={{ color: "green" }}
                          noWrap
                        ></Typography>
                      )}

                      {index === 0 ? (
                        <Typography
                          variant="h6"
                          align="center"
                          style={{ color: "green" }}
                          noWrap
                        >
                          Total:{" "}
                          {cartProduct[item][4].pricePkt * cartProduct[item][0]}
                        </Typography>
                      ) : (
                        <Typography
                          variant="h6"
                          align="center"
                          style={{ color: "green" }}
                          noWrap
                        ></Typography>
                      )}
                      {index === 0 ? (
                        <div className={classes.cartDiv} align="center">
                          <IndeterminateCheckBoxRoundedIcon
                            className={classes.minusBtn}
                            color="primary"
                            onClick={() => {
                              let state = cartProduct;
                              state[item][0] -= 1;
                              if (state[item][0] == 0) {
                                let openObj = dialogOpen;
                                openObj.item = item;
                                openObj.index = index;
                                setDialogOpen(openObj);
                                setOpenFlag(true);
                                return;
                              }
                              setCartProduct(state);
                              setFlag((prevState) => !prevState);
                            }}
                          />
                          <input
                            className={classes.input}
                            value={cartProduct[item][0]}
                          />
                          <AddBoxRoundedIcon
                            color="primary"
                            className={classes.addBtn}
                            onClick={() => {
                              let state = cartProduct;
                              state[item][0] += 1;
                              setCartProduct(state);
                              setFlag((prevState) => !prevState);
                            }}
                          />
                          <RemoveShoppingCartRoundedIcon
                            className={classes.cartIcon}
                            color="primary"
                            onClick={() => {
                              let openObj = dialogOpen;
                              openObj.item = item;
                              openObj.index = index;
                              setDialogOpen(openObj);
                              setOpenFlag(true);
                            }}
                          />
                        </div>
                      ) : (
                        <div className={classes.cartDiv} align="center">
                          <IndeterminateCheckBoxRoundedIcon
                            className={classes.minusBtn}
                            color="primary"
                            onClick={() => {
                              let state = cartProduct;
                              state[item][1] -= 1;
                              setCartProduct(state);
                              setFlag((prevState) => !prevState);
                            }}
                          />
                          <input
                            className={classes.input}
                            value={cartProduct[item][1]}
                          />
                          <AddBoxRoundedIcon
                            color="primary"
                            className={classes.addBtn}
                            onClick={() => {
                              let state = cartProduct;
                              state[item][1] += 1;
                              setCartProduct(state);
                              setFlag((prevState) => !prevState);
                            }}
                          />
                          <RemoveShoppingCartRoundedIcon
                            className={classes.cartIcon}
                            color="primary"
                            onClick={() => {
                              let openObj = dialogOpen;
                              openObj.item = item;
                              openObj.index = index;
                              setDialogOpen(openObj);
                              setOpenFlag(true);
                            }}
                          />
                        </div>
                      )}
                    </Box>
                  </Grid>
                )
            )
          )}
      </Grid>
      {count != 0 && <div className={classes.bottomDiv}></div>}
      <Footer price={price} />
    </div>
  );
}
export default compose(
  graphql(updateCartDetails, { name: "updateCartDetails" })
)(HomePage);
