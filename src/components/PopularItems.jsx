import { useEffect, useState } from 'react';
import SectionTitle from './SectionTitle';
import MenuItems from './MenuItems';

const PopularItems = () => {
    const [item, setItem] = useState([]);
    useEffect(() => {
        fetch('https://bistro-boss-restuarant-server.onrender.com/menu')
            .then(res => res.json())
            .then(data => {
                const popular = data.filter(d => d.category === "popular");
                setItem(popular)
            })
    }, [])
    return (
        <>
            <SectionTitle heading='From our menu' subTitle='Popular Items'></SectionTitle>
            <div className='grid md:grid-cols-2 gap-10 mb-12'>
                {
                    item.map(d => <MenuItems d={d} key={d?._id}></MenuItems>)
                }
            </div>
            <button className="btn btn-outline mt-3 border-0 border-b-4">View all menu</button>

        </>
    );
};

export default PopularItems;