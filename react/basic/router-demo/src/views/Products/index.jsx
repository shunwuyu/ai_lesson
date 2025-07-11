import { Outlet } from 'react-router-dom';

const Products = () => {
    return (
        <>
            <h1>产品列表</h1>
            <Outlet />
        </>
    )
}

export default Products