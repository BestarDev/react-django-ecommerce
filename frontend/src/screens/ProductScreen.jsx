import { Link, useNavigate, useParams } from "react-router-dom"
import { Badge, Button, Card, Col, Form, Image, ListGroup, Row } from "react-bootstrap"
import Rating from "../components/Rating"
import { useGetProductByIdQuery } from "../store/slices/productsApiSlice"
import Message from "../components/Message"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { addToCart } from "../store/slices/cartSlice"

const ProductScreen = () => {
    const [qty, setQty] = useState(1)
    const {id} = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {data: product, isLoading, error} = useGetProductByIdQuery(id)

    const addToCartHandler = () => {
        dispatch(addToCart({...product, qty}))
        navigate('/cart')
    }

    return (
        <>
        { isLoading ? <h2>isLoading...</h2> 
        : error ? <Message variant='danger'>{error?.error || "Error"}</Message>
        : (
            <div>
                <Link to='/' className="btn btn-light my-3">Go Back</Link>
                <Row>
                    <Col md={6}>
                        <Image src={product.image} alt={product.name} fluid className="rounded" />
                    </Col>
                    <Col md={3}>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h3>{product.name}</h3>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Rating value={product.rating} text={product.numReviews} />
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Price: ${product.price}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Description: {product.description}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={3}>
                        <Card>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Price:</Col>
                                        <Col><strong>{product.price}</strong></Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Status:</Col>
                                        <Col>
                                            <Badge className={`rounded-pill p-2 px-3 ${product.countInStock > 0 ? 'bg-success' : 'bg-danger'}`}>
                                                {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                            </Badge>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                {product.countInStock > 0 && (
                                    <ListGroup.Item>
                                        <Row className="align-items-center">
                                            <Col>Qty:</Col>
                                            <Col className="my-1">
                                                <Form.Control as='select'
                                                    value={qty}
                                                    onChange={(e) => setQty(Number(e.target.value))}
                                                >
                                                    {[...Array(product.countInStock).keys()].map(x => (
                                                        <option key={x + 1} value={x + 1}>
                                                            {x + 1}
                                                        </option>
                                                    ))}
                                                </Form.Control>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                )}
                                <ListGroup.Item>
                                    <Button className="btn btn-block w-100" variant="dark"
                                        disabled={product.countInStock <= 0} onClick={addToCartHandler}
                                    >Add to Cart</Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            </div>
        )}
        </>
    )
}

export default ProductScreen