import { Helmet } from "react-helmet-async";
import SharedCover from "../menu/SharedCover";
import img from '../../assets/shop/banner2.jpg'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useEffect, useState } from "react";
import FoodCart from "./FoodCart";
import { useParams } from "react-router-dom";

const OrderFood = () => {
    const [items, setItem] = useState([]);
    const [item1, setItem1] = useState([]);
    const [item2, setItem2] = useState([]);
    const [item3, setItem3] = useState([]);
    const [item4, setItem4] = useState([]);
    const categories = ['Salad', 'Pizza', 'Soup', 'Dessert', 'Drink'];
    const { category } = useParams();
    const categori = categories.indexOf(category);
    const [tabsIndex, setTabsIndex] = useState(categori);

    useEffect(() => {
        fetch('https://bistro-boss-restuarant-server.onrender.com/menu')
            .then(res => res.json())
            .then(data => {
                const popular = data.filter(d => d.category === "dessert");
                const popular1 = data.filter(d => d.category === "soup");
                const popular2 = data.filter(d => d.category === "salad");
                const popular3 = data.filter(d => d.category === "pizza");
                const popular4 = data.filter(d => d.category === "drinks");
                setItem(popular)
                setItem1(popular1)
                setItem2(popular2)
                setItem3(popular3)
                setItem4(popular4)
            })
    }, [])
    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Order food</title>
            </Helmet>
            <SharedCover img={img} title='Order food'></SharedCover>
            <Tabs defaultIndex={tabsIndex} onSelect={(index) => setTabsIndex(index)}>
                <TabList>
                    <Tab>Salad</Tab>
                    <Tab>Pizza</Tab>
                    <Tab>Soup</Tab>
                    <Tab>Dessert</Tab>
                    <Tab>Drink</Tab>
                </TabList>
                <TabPanel>
                    <div className="grid md:grid-cols-3 gap-10">
                        {
                            item2.map(item => <FoodCart item={item} key={item._id}></FoodCart>)
                        }
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="grid md:grid-cols-3 gap-10">
                        {
                            item3.map(item => <FoodCart item={item} key={item._id}></FoodCart>)
                        } </div>
                </TabPanel>
                <TabPanel>
                    <div className="grid md:grid-cols-3 gap-10">
                        {
                            item1.map(item => <FoodCart item={item} key={item._id}></FoodCart>)
                        } </div>
                </TabPanel>
                <TabPanel>
                    <div className="grid md:grid-cols-3 gap-10">
                        {
                            items.map(item => <FoodCart item={item} key={item._id}></FoodCart>)
                        } </div>
                </TabPanel>
                <TabPanel>
                    <div className="grid md:grid-cols-3 gap-10">
                        {
                            item4.map(item => <FoodCart item={item} key={item._id}></FoodCart>)
                        } </div>
                </TabPanel>
            </Tabs>

        </div>

    );
};

export default OrderFood;