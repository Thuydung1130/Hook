import Swal from 'sweetalert2/src/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import { deleteProduct } from '../../services/productService';
function DeleteProduct(props) {
    const { item, onReLoad } = props;
    const deleteItem = async () => {
        const result= await deleteProduct(item.id)
        if (result) {
            onReLoad();
            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
        }

    }
    const handleDelete = async () => {
        //console.log(item.id);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteItem();


            }
        });
    }
    return (
        <>
            <button onClick={handleDelete}>Delete</button>
        </>
    )
}
export default DeleteProduct;