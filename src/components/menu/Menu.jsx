import { Helmet } from 'react-helmet-async';
import SharedCover from './SharedCover';
import img from '../../assets/menu/menu-bg.jpg';
import { useEffect, useState } from 'react';
import SectionTitle from '../SectionTitle';
import MenuCategory from './MenuCategory';
import dimg from '../../assets/menu/dessert-bg.jpeg';
import pimg from '../../assets/menu/pizza-bg.jpg';
import simg from '../../assets/menu/soup-bg.jpg';
import saimg from '../../assets/menu/salad-bg.jpg';

const Menu = () => {
    const [item, setItem] = useState([]);
    const [item1, setItem1] = useState([]);
    const [item2, setItem2] = useState([]);
    const [item3, setItem3] = useState([]);
    const [item4, setItem4] = useState([]);
    useEffect(() => {
        fetch('https://bistro-boss-restuarant-server.onrender.com/menu')
            .then(res => res.json())
            .then(data => {
                const popular = data.filter(d => d.category === "dessert");
                const popular1 = data.filter(d => d.category === "soup");
                const popular2 = data.filter(d => d.category === "salad");
                const popular3 = data.filter(d => d.category === "pizza");
                const popular4 = data.filter(d => d.category === "offered");
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
                <title>Bistro Boss | Menu</title>
            </Helmet>
            <SharedCover img={img} title='our menu'></SharedCover>
            <SectionTitle heading='todays offer' subTitle='Dont miss!!'></SectionTitle>
            <MenuCategory item={item4}></MenuCategory>
            <MenuCategory item={item} title='Dessert' img={dimg}></MenuCategory>
            <MenuCategory item={item3} title='Pizza' img={pimg}></MenuCategory>
            <MenuCategory item={item2} title='Salad' img={saimg}></MenuCategory>
            <MenuCategory item={item1} title='Soup' img={simg}></MenuCategory>

        </div>
    );
};

export default Menu;