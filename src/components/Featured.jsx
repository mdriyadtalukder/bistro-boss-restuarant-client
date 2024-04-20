import SectionTitle from "./SectionTitle";
import img from '../assets/home/featured.jpg';
import './All.css';
const Featured = () => {
    return (
        <div className="featured-item bg-fixed text-white pt-8 my-20">
            <SectionTitle heading='featured item' subTitle='Check it out'></SectionTitle>

            <div className="md:flex justify-center items-center pb-20 pt-12  px-36 bg-slate-500 bg-opacity-60">
                <div>
                    <img src={img} alt="" />
                </div>
                <div className="md:ml-10">
                    <p>Aug 20,2024</p>
                    <p className="uppercase">Where can i get some?</p>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem optio deserunt repellat dolor temporibus pariatur id esse voluptatibus at ex odio recusandae excepturi quas provident molestiae corporis alias, natus libero suscipit modi, fugit exercitationem hic dolorem rerum. Labore veniam sit molestias esse natus id repellat odit, placeat quibusdam, illo dolores.</p>
                    <button className="btn btn-outline mt-3 border-0 border-b-4">Order Now</button>
                </div>



            </div>
        </div>
    );
};

export default Featured;