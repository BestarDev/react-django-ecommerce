import { Col, Row } from "react-bootstrap"
import Product from "../components/Product"
import { useGetProductsQuery } from "../store/slices/productsApiSlice"
import Loader from "../components/Loader"
import Message from "../components/Message"

const HomeScreen = () => {
  const {data:products, isLoading, error} = useGetProductsQuery()

  return (
    <div>
        <h1>Latest Products</h1>
        {isLoading ? <Loader /> : 
        error ? <Message variant='danger'>{error?.error || "Error"}</Message>:
        (
          <Row>
            {products.map(product => (
                <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                    <Product product={product} />
                </Col>
            ))}
          </Row>
        )}
    </div>
  )
}

export default HomeScreen