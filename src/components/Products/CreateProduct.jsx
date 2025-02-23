import Modal from 'react-modal'
import { useState, useEffect } from 'react';
//import { category } from './ProductList';
// your-app.js
import Swal from 'sweetalert2/src/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import { getListCategory } from '../../services/categoryService';
import { createProduct } from '../../services/productService';
// your-app.scss
//import 'sweetalert2/themes/dark/dark.scss';
function CreateProduct(props) {
    const {onReLoad}=props;
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState({});
    const [dataCategory, setDataCategory] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
            const result =await getListCategory();
            setDataCategory(result)
        }
        fetchApi();

    }, []);
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };
    const handleChange = (e) => {
        //console.log(e.target.value);
        const name = e.target.name;
        const value = e.target.value;
        setData({
            ...data,
            [name]: value
        })
    }
    const openModal = () => {
        setShowModal(true);
    }
    const closeModal = () => {
        setShowModal(false);
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        const result= await createProduct(data);
        if(result){
            setShowModal(false);
                onReLoad();
                Swal.fire({
                    //position: "top-end",
                    icon: "success",
                    title: "ban da tao moi thanh cong",
                    showConfirmButton: false,
                    timer: 1500
                  });
        }
        
        
    }
    //console.log(dataCategory);
    return (

        <>
            <button onClick={openModal}>Taọ sản phẩm mới</button>
            <Modal
                isOpen={showModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <form action="" onSubmit={handleSubmit}>
                    <table>
                        <tbody>
                            <tr>
                                <td>Tiêu đề</td>
                                <td>
                                    <input type="text" name='title' onChange={handleChange} />
                                </td>
                            </tr>
                            {
                                dataCategory.length > 0 && (
                                    <tr>
                                        <td>Danh mục</td>
                                        <td>
                                            <select name="category" id="" onChange={handleChange}>
                                                {dataCategory.map((item,index)=>(
                                                    <option key={index} value={item}>{item}</option>
                                                ))}
                                            </select>
                                        </td>
                                    </tr>
                                )
                            }

                            <tr>
                                <td>Giá</td>
                                <td>
                                    <input type="text" name='price' onChange={handleChange} />
                                </td>
                            </tr>
                            <tr>
                                <td>Giảm Giá</td>
                                <td>
                                    <input type="text" name='discountPercentage' onChange={handleChange} />
                                </td>
                            </tr><tr>
                                <td>Số lượng còn lại</td>
                                <td>
                                    <input type="text" name='stock' onChange={handleChange} />
                                </td>
                            </tr>
                            <tr>
                                <td>Đường dẫn ảnh</td>
                                <td>
                                    <input type="text" name='thumbnail' onChange={handleChange} />
                                </td>
                            </tr>
                            <tr>
                                <td>Mô tả</td>
                                <td>
                                    <textarea rows={4} name="" id="" onChange={handleChange}></textarea>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <button onClick={closeModal}>Hủy</button>
                                </td>
                                <td>
                                    <input type="submit" value="tạo mới" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </Modal>
        </>
    )
}
export default CreateProduct