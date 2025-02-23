import { useEffect } from "react";
import { useState } from "react";
import "./product.css";
import EditProduct from "./EditProduct";
import DeleteProduct from "./DeleteProduct";
import { getProductList } from "../../services/productService";
function ProductList(props) {
    const {reload}=props;
    const [data, setData] = useState([]);
    const [editReload,setEditReload]=useState(false)
    //const [dataCategory, setDataCategory] = useState([]);
    const handleReLoad=()=>{
        setEditReload(!editReload)
    }
    useEffect(() => {
        const fetchApi = async () => {
            const result= await getProductList();
            setData(result.reverse());
            
        }
        fetchApi();
        
    }, [reload,editReload]);
    //sconsole.log(data)
    
    //console.log(dataCategory)
    return (
        <>
            <div className="product__list">
                {data.map(item => (
                    <div className="product__item" key={item.id}>
                        <div className="product__img">
                            <img src={item.thumbnail} alt={item.title} />
                        </div>
                        <h4 className="product__title">{item.title}</h4>
                        <p className="product__price">{item.price}</p>
                        <p className="product__discount">{item.discountPercentage}</p>
                        <div>
                            <EditProduct item={item} onReLoad={handleReLoad}/>
                            <DeleteProduct item={item} onReLoad={handleReLoad}/>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
export default ProductList;