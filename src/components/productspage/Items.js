import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { fade, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import AppBar from "../homepage/AppBar";
import AddBoxRoundedIcon from "@material-ui/icons/AddBoxRounded";
import AddTwoToneIcon from "@material-ui/icons/AddTwoTone";
import IndeterminateCheckBoxRoundedIcon from "@material-ui/icons/IndeterminateCheckBoxRounded";
import AddShoppingCartRoundedIcon from "@material-ui/icons/AddShoppingCartRounded";
import ShoppingCartRoundedIcon from "@material-ui/icons/ShoppingCartRounded";
import Carousel from "react-material-ui-carousel";
import Alert from "@material-ui/lab/Alert";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import RemoveShoppingCartRoundedIcon from "@material-ui/icons/RemoveShoppingCartRounded";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import limitedOffer from "./asset/offerimage/limitedOffer.jpg";
//import photo from './asset/16294850825087n9x67nMicrosoftTeams-image.png'
import photo1 from "../../assets/images/blue-polycotton-ph0003-perfect-homes-by-flipkart-blue-original-imaf6dhhsfhvvjdn.jpeg";
import { Icon } from "@material-ui/core";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { flowRight as compose } from "lodash";

const useStyles = makeStyles((theme) => ({
  body: {},
  box: {
    [theme.breakpoints.up("xs")]: {
      width: "20rem",
      height: "9rem",
      //width: '20rem', height: '21rem',
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
    },
  },

  isDesktop: {
    [theme.breakpoints.up("xs")]: {
      backgroundColor: "pink",
    },
    [theme.breakpoints.up("sm")]: {
      display: "block",
      backgroundColor: "pink",
    },
  },
  imageHide: {
    [theme.breakpoints.up("xs")]: {
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
      width: "90%",
      height: "75%",
    },
    [theme.breakpoints.up("md")]: {
      display: "block",
      width: "325px",
      height: "325px",
      marginLeft: "auto",
      marginRight: "auto",
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
      height: "2rem",
      //backgroundColor:'pink'
    },
  },
  topDiv1: {
    [theme.breakpoints.up("xs")]: {
      position: "relative",
      width: "100%",
      height: "7rem",
    },
    [theme.breakpoints.up("sm")]: {
      position: "relative",
      width: "100%",
      height: "10rem",
      //backgroundColor:'pink'
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
  textSize: {
    [theme.breakpoints.up("xs")]: {
      textAlign: "center",
      fontSize: 20,
    },
  },
  textSize1: {
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
  categoryNameTypo: {
    [theme.breakpoints.up("xs")]: {
      fontSize: "15px",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "25px",
    },
  },
  image: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
  imagesDiv: {
    [theme.breakpoints.up("xs")]: {
      display: "none",
    },
    [theme.breakpoints.up("md")]: {
      display: "block",
    },
  },
  carouselDiv: {
    [theme.breakpoints.up("xs")]: {
      display: "block",
    },
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

const productsByCategoryId = gql`
  query ($id: ID!) {
    productsByCategory(categoryId: $id) {
      productName
      id
      size
      type
      proCode
      pricePkt
      oldPricePkt
    }
  }
`;

const updateCartDetails = gql`
  mutation ($id: String!, $productList: String!) {
    updateCartDetails(id: $id, productList: $productList)
  }
`;
function Items(props) {
  const classes = useStyles();
  const history = useHistory();
  const [flag, setFlag] = useState();
  const [intervalId, setIntervalId] = useState();
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [products, setProducts] = useState();
  const [categories, setCategories] = useState(
    JSON.parse(localStorage.getItem("categories"))
  );
  const [productState, setProductState] = useState({});
  const [cartProduct, setCartProduct] = useState({});
  /*const clickHandler = (e) => {
        setCount(prevCount => prevCount+1);
    }*/
  const handleClose = () => {
    setOpen(false);
  };
  const handleClose1 = () => {
    setOpen1(false);
  };
  const handleChange = async (event) => {
    await localStorage.setItem("cart", JSON.stringify(cartProduct));
    let n = event.target.value.split(",");
    props.urlVal(n[0], n[1]);
  };

  const updateCartDetails = async () => {
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
  useEffect(async () => {
    if (Object.keys(cartProduct).length !== 0)
      localStorage.setItem("cart", JSON.stringify(cartProduct));
  }, [flag]);
  useEffect(() => {
    return () => updateCartDetails();
  }, []);
  useEffect(async () => {
    const productsbycategory = await props.data.productsByCategory;
    const cartData = await JSON.parse(localStorage.getItem("cart"));
    if (productsbycategory) {
      setProducts(productsbycategory);
      if (cartData) setCartProduct(cartData);
      let result = {};
      productsbycategory.forEach((element) => {
        if (cartData && cartData[element.id])
          result[element.id] = cartData[element.id];
        else result[element.id] = [0, 0, false, false, element];
      });
      setProductState(result);
    }
    return () => {
      console.log("celshiya");
      localStorage.setItem("cart", JSON.stringify(cartProduct));
    };
  }, [props.data.productsByCategory]);

  var items = [1, 2, 3, 4, 5];
  var items1 = [1, 2, 3, 4];
  return (
    <div>
      <AppBar title="Products" />
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        autoHideDuration={1000}
        message="Added to cart"
        onClose={handleClose}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      >
        <Alert onClose={handleClose} severity="success">
          Added to cart!
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open1}
        autoHideDuration={1000}
        message="Added to cart"
        onClose={handleClose1}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose1}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      >
        <Alert onClose={handleClose} severity="error">
          Removed from cart!
        </Alert>
      </Snackbar>
      <div className={classes.topDiv}></div>
      <div className={classes.isDesktop}>
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
                      <MenuItem
                        value={category.id + "," + category.categoryName}
                        style={{ width: "100%" }}
                      >
                        {category.categoryName}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </td>
            <td style={{ textAlign: "center" }}>
              <Button
                variant="contained"
                onClick={() => {
                  localStorage.setItem("cart", JSON.stringify(cartProduct));
                  history.replace("/cart");
                }}
                color="primary"
              >
                View cart
              </Button>
            </td>
          </TableRow>
          <TableRow>
            <td style={{ textAlign: "center" }} colSpan="2">
              <Typography
                style={{ color: "#4a4f4c" }}
                className={classes.categoryNameTypo}
              >
                {props.categoryName}
              </Typography>
            </td>
          </TableRow>
        </Table>
        <div className={classes.topDiv1}></div>
        <div className={classes.carouselDiv}>
          <Carousel>
            {items.map((i) => (
              <img
                src={
                  "/CategoryImagesServer/" + props.categoryId + "/" + i + ".jpg"
                }
                className={classes.imageHide}
                alt="no preview"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/nopreview.png";
                }}
              />
            ))}
          </Carousel>
        </div>
        <div style={{ width: "87%", marginLeft: "auto", marginRight: "auto" }}>
          <table className={classes.imagesDiv}>
            <tr>
              {items1.map((i) => (
                <td style={{ textAlign: "center" }}>
                  <img
                    src={
                      "/CategoryImagesServer/" +
                      props.categoryId +
                      "/" +
                      i +
                      ".jpg"
                    }
                    className={classes.imageHide}
                    alt="Image not found"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/nopreview.png";
                    }}
                  />
                </td>
              ))}
            </tr>
          </table>
        </div>

        <Grid container>
          {products &&
            products.map((item) => {
              return (
                productState[item.id] && (
                  <Grid xs={12} md={4} key={item.id}>
                    <Box
                      boxShadow={20}
                      bgcolor="background.paper"
                      m={1}
                      p={1}
                      className={classes.box}
                      borderRadius={6}
                    >
                      <Grid container>
                        <Grid item xs={12}>
                          <Typography className={classes.textSize}>
                            {item.productName}
                          </Typography>

                          <Typography
                            className={classes.textSize1}
                            align="left"
                            noWrap
                          >
                            {item.size}
                          </Typography>
                          <Grid container>
                            <Grid item xs={12}>
                              <Typography
                                className={classes.textSize1}
                                align="center"
                                style={{ color: "green" }}
                                noWrap
                              >
                                Type : {item.type}
                              </Typography>

                              <div className={classes.cartDiv} align="center">
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
                                        {item.oldPricePkt} Rs
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
                                        {item.pricePkt} Rs
                                      </Typography>
                                    </td>
                                  </tr>
                                </table>
                                <IndeterminateCheckBoxRoundedIcon
                                  className={classes.minusBtn}
                                  color="primary"
                                  onClick={() => {
                                    let state = productState;
                                    if (state[item.id][0] != 0) {
                                      state[item.id][0] -= 1;
                                      if (state[item.id][0] == 0) {
                                        state[item.id][2] = false;
                                        if (
                                          !state[item.id][2] &&
                                          !state[item.id][3]
                                        ) {
                                          let cartState = cartProduct;
                                          delete cartState[item.id];
                                          setCartProduct(cartState);
                                        }
                                      }
                                      setProductState(state);
                                      setFlag((prevState) => !prevState);
                                    }
                                  }}
                                />
                                <input
                                  className={classes.input}
                                  value={productState[item.id][0]}
                                />
                                <AddBoxRoundedIcon
                                  color="primary"
                                  className={classes.addBtn}
                                  onClick={() => {
                                    let state = productState;
                                    state[item.id][0] += 1;
                                    setProductState(state);
                                    setFlag((prevState) => !prevState);
                                  }}
                                />
                                {(productState[item.id][2] && (
                                  <RemoveShoppingCartRoundedIcon
                                    className={classes.cartIcon}
                                    color="primary"
                                    onClick={() => {
                                      let state = productState;
                                      state[item.id][2] = false;
                                      var cart = cartProduct;
                                      if (cart[item.id]) {
                                        console.log(cart);
                                        cart[item.id][2] = false;
                                        console.log(cart);
                                        if (
                                          !cart[item.id][2] &&
                                          !cart[item.id][3]
                                        )
                                          delete cart[item.id];
                                      }
                                      setCartProduct(cart);
                                      setProductState(state);
                                      setOpen1(true);
                                      setFlag((prevState) => !prevState);
                                    }}
                                  />
                                )) ||
                                  (!productState[item.id][2] && (
                                    <ShoppingCartIcon
                                      className={classes.cartIcon}
                                      color="primary"
                                      onClick={() => {
                                        let state = productState;
                                        if (state[item.id][0] > 0) {
                                          state[item.id][2] =
                                            !state[item.id][2];
                                          let cart = cartProduct;
                                          cart[item.id] = state[item.id];
                                          setCartProduct(cart);
                                          setProductState(state);
                                          setOpen(true);
                                          setFlag((prevState) => !prevState);
                                        }
                                      }}
                                    />
                                  ))}
                              </div>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                )
              );
            })}
        </Grid>
      </div>
    </div>
  );
}
export default compose(
  graphql(productsByCategoryId, {
    options: (props) => ({
      variables: {
        id: props.categoryId,
      },
    }),
  }),
  graphql(updateCartDetails, { name: "updateCartDetails" })
)(Items);
