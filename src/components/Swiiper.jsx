import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import img1 from '../assets/home/slide1.jpg';
import img2 from '../assets/home/slide2.jpg';
import img3 from '../assets/home/slide3.jpg';
import img4 from '../assets/home/slide4.jpg';
import img5 from '../assets/home/slide5.jpg';
import SectionTitle from './SectionTitle';

const Swiiper = () => {
    return (
        <>
            <SectionTitle heading='Order online' subTitle='From 11 am to 10 pm'></SectionTitle>
            <Swiper
                slidesPerView={4}
                spaceBetween={30}
                centeredSlides={true}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper mb-24"
            >
                <SwiperSlide>
                    <img src={img1} alt="" />
                    <h3 className='text-2xl uppercase text-white -mt-16 text-center'>Salads</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={img2} alt="" />
                    <h3 className='text-2xl uppercase text-white -mt-16 text-center'>pizzas</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={img3} alt="" />
                    <h3 className='text-2xl uppercase text-white -mt-16 text-center'>soups</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={img4} alt="" />
                    <h3 className='text-2xl uppercase text-white -mt-16 text-center'>Desserts</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={img5} alt="" />
                    <h3 className='text-2xl uppercase text-white -mt-16 text-center'>Salads</h3>
                </SwiperSlide>

            </Swiper>
        </>
    );
};

export default Swiiper;