import { useLocation } from 'react-router-dom'

function Cart() {
    const location = useLocation()
    console.log(location.state)

    return <div>Cart</div>
}

export default Cart
