import { useParams } from 'react-router-dom';
const ProductDetail = () => {
    let { productId } = useParams();
    return (
        <>
            ProductDetail { productId }
        </>
    )
}

export default ProductDetail;