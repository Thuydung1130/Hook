import ProductList from "./ProductList";
import CreateProduct from "./CreateProduct";
import { useState } from "react";
function Product(){
    const [reload,setReLoad]=useState(false);
    const handleReload=()=>{
        setReLoad(!reload)
    }
    return(
        <>
        <h2>Danh sách sản phẩm</h2>
        <CreateProduct onReLoad={handleReload}/>
        <ProductList reload={reload}/>
        </>
    )
}
export default Product;