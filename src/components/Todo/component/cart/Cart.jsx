
import Slideshow from "./Slideshow";
import styles from "./Cart.module.scss";
import { delivery6, delivery5, delivery4, delivery3, delivery2, delivery1, } from "../../img/imgCart/imageDelivery";
import { bank6, bank5, bank4, bank3, bank2, bank1, } from "../../img/imgCart/imageBank";
import { Button, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Api_order } from "axios/Axios";
import { ThemeUseContext } from "ThemeuseContext/useContext";
import TabsEvaluate from "./TabsEvaluate";


function Cart(props) {
    const { img, name, price, id, url } = props
    const [num, setNum] = useState(1);

    const { handleChangeNumberCart } = useContext(ThemeUseContext)

    const handleApart = () => {
        setNum((prev) => {
            if (prev === 1) {
                return prev;
            }
            return prev - 1;
        });
    };
    const handleAdd = () => {
        setNum(num + 1);
    };

    const [order, setOrder] = useState([])

    useEffect(() => {
        Api_order
            .getAll()
            .then(res =>
                setOrder(res.data)
            )
    }, [])

    const handleAddCart = async (name, price, num, id, url) => {
        const orders = JSON.parse(JSON.stringify(order))
        const idnumber = orders.findIndex((name1) => name1.id === id)
        console.log(idnumber);
        handleChangeNumberCart()
        if (idnumber < 1) {
            const schema =
            {
                name: name,
                price: price,
                number: num,
                id: id,
                url: url,
            }
            await Api_order
                .post(schema)
            await Api_order
                .getAll()
                .then(res => setOrder(res.data))
        } else {
            await Api_order
                .patch(id, {
                    number: num + orders[idnumber].number
                })
            await Api_order
                .getAll()
                .then(res => setOrder(res.data))
        }
    }

    return (
        <>
            <div className={styles.addcart}>
                <div style={{ display: "flex" }}>
                    <div>
                        <Slideshow img={img} />
                    </div>

                    <div className={styles.addcartContent}>
                        <div className={styles.addcartContentTitle}>
                            <Nav.Link className={styles.nav} as={Link} to="/home">
                                TRANG CH???
                            </Nav.Link>
                            <span>/</span>
                            <Nav.Link
                                className={styles.nav}
                            >
                                {name}
                            </Nav.Link>
                        </div>
                        <strong>{price}??</strong>
                        <div className={styles.addcartContentPrice}>
                            <div>
                                {" "}
                                <p onClick={handleApart}>-</p> <p>{num}</p>{" "}
                                <p onClick={handleAdd}>+</p>
                            </div>
                            <button
                                className={styles.Button}
                                onClick={() => handleAddCart(name, price, num, id, url)}
                            >
                                TH??M V??O GI???
                            </button>
                        </div>
                        <div style={{ marginLeft: 17, display: "flex" }}>
                            <div className={styles.delivery}>
                                <span>T??nh ph?? ship t??? ?????ng</span>
                                <img alt="" src={delivery1} />
                                <img alt="" src={delivery2} />
                                <img alt="" src={delivery3} />
                                <img alt="" src={delivery4} />
                                <img alt="" src={delivery5} />
                                <img alt="" src={delivery6} />
                            </div>
                            <div className={styles.bank}>
                                <span>Thanh to??n</span>
                                <img alt="" src={bank1} />
                                <img alt="" src={bank2} />
                                <img alt="" src={bank3} />
                                <img alt="" src={bank4} />
                                <img alt="" src={bank5} />
                                <img alt="" src={bank6} />
                            </div>
                        </div>
                        <p className={styles.p}>
                            "H??y tr??? th??nh Affilicate c???a ch??ng t??i ????? t??m th??m thu nh???p th???
                            ?????ng, ki???m ti???n online"
                        </p>
                        <Button
                            variant="contained"
                            color="error"
                            className={styles.Button}
                        >
                            ????ng k?? Affilicate
                        </Button>
                    </div>
                </div>
                <TabsEvaluate />
            </div>
        </>
    )
}
export default Cart;
