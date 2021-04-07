import React, { useRef, useState, useEffect } from "react";
import Products from "./components/ProductDisplay/Products";
import NavBar from "./components/NavBar/NavBar";
import HeroHeader from "./components/Hero/HeroHeader";
import { theme } from "./MyTheme";
import { ThemeProvider } from "@material-ui/core";
import { commerce } from "./CommerceInstance";
import { Switch, useLocation, Route } from "react-router-dom";
import ProductDisplay from "./components/ProductDisplay/ProductDisplay";

const App = () => {
  const [products, setProducts] = useState(false);
  const [categories, setCatagories] = useState([]);


  const location = useLocation();
  const scrollToProducts = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const productsElement = useRef();

  const fetchProducts = async (category) => {
    if (category.length) {
      const productList = await commerce.products.list({'category_id': [category[0].id]});
      setProducts(productList);
    } else {
      const productList = await commerce.products.list();
      setProducts(productList);
    }
  };

  const fetchCategories = async () => {
    const categoryList = await commerce.categories.list();
    setCatagories(categoryList.data);
    return categoryList.data
  };

  const fetchCurrentCategory = async (AllCategories) => {
    const currentSlug = location.pathname.slice(1);
    const currentCategory = AllCategories.filter((category) => {
      return category.slug == currentSlug;
    });
    return currentCategory
  }


  useEffect(async() => {
    const AllCategories = await fetchCategories();
    const currentCategory = await fetchCurrentCategory(AllCategories);
    fetchProducts(currentCategory);
  }, []);

  useEffect(async () => {
    const currentCategory = await fetchCurrentCategory(categories)
    fetchProducts(currentCategory)
  }, [location]);


  return products ? (
    <ThemeProvider theme={theme}>
      <NavBar />

      <Switch>
        <Route exact path="/:category">
          <ProductDisplay productInfo={products.data} genre/>
        </Route>

        <Route exact path="/">
          <div style={{ overflow: "hidden" }}>
            <HeroHeader scrollToProducts={() => scrollToProducts(productsElement)} />
            <Products reference={productsElement} productInfo={products.data} />
          </div>
        </Route>

      </Switch> 
    </ThemeProvider>
  ) : null;
};

export default App;
