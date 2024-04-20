import { Link } from "react-router-dom";
import MenuItems from "../MenuItems";
import SharedCover from "./SharedCover";

const MenuCategory = ({ item, title, img }) => {
    return (
        <div className="pt-8">
            {title && <SharedCover img={img} title={title}></SharedCover>}
            <div className='grid md:grid-cols-2 gap-10 mb-12 mt-16'>
                {
                    item.map(d => <MenuItems d={d} key={d?._id}></MenuItems>)
                }
            </div>
            <Link to={`/order-food/${title}`}><button className="btn btn-outline mt-3 border-0 border-b-4">Order Now</button></Link>
        </div>
    );
};

export default MenuCategory;