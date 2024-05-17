import PropTypes from "prop-types";
// import NewProductForm from "./NewProductForm";
import ProductItem from "./ProductItem";
import "./Products.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/slices/productSlice";
import Spinner from "../UI/Spinner";

function Products() {
  const productState = useSelector((state) => state.product);
  const { status, productData, error } = productState;
  const dispatch = useDispatch();
  console.log(error);
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  function handleDeleteProduct(id) {}

  return (
    <div className="products-wrapper">
      {/* <NewProductForm setProducts={setProducts} /> */}
      {status === "loading" && <Spinner />}
      <div className="products">
        {productData.map((product) => (
          <ProductItem
            key={product.id}
            imageLink={product.images[0]}
            title={product.title}
            price={product.price}
            handleDeleteProduct={handleDeleteProduct}
            id={product.id}
          />
        ))}
      </div>
    </div>
  );
}

Products.propTypes = {
  data: PropTypes.object,
};

export default Products;
