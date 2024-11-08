import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";
import { UserContext } from "../../context/UserContext";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useContext(UserContext);
  const [detailedProduct, setDetailedProduct] = useState();

  useEffect(()=>{
      try {
          const getProductDetail = async () => {
              await fetch(`http://localhost:3000/products/${id}`, {
                  method: "GET",
                  headers: {
                      "Content-Type": "application/json",
                    },
                })
                .then((response) => response.json())
                .then((response) => setDetailedProduct(response));
            };
            getProductDetail()
        } catch (error) {
            console.error("error:",error)
        }
    },[])
    
    const product = detailedProduct;
  

  return (
    <div className="product-container">
            {detailedProduct &&
             <div key={product.id} className="product-detail">
              <h1>{product.title}</h1>
              <div className="image-description-group">
                <img src={product.image} alt={product.title} />
                <div>
                  <p>{product.description}</p>
                  <div className="price-rating">
                    <p className="price">Price : ${product.price}</p>
                    <p className="rating-dt">Rating : {product.rating}⭐</p>
                  </div>
                  <button
                    className="buy-button"
                    onClick={() => addToCart(product)}
                  >
                    <TiShoppingCart /> Add to cart
                  </button>
                </div>
              </div>
            </div>}
    </div>
  );
};

export default ProductDetail;
