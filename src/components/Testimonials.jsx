import SectionTitle from './SectionTitle';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useEffect, useState } from 'react';
import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'

const Testimonials = () => {
    const [item, setItem] = useState([]);
    useEffect(() => {
        fetch('reviews.json')
            .then(res => res.json())
            .then(data => setItem(data))
    }, [])
    return (
        <section>
            <SectionTitle heading='Testimonials' subTitle='What our client say'></SectionTitle>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                {
                    item.map((r) => <SwiperSlide key={r._id}>
                        <div className=' flex flex-col items-center mx-24 my-16'>
                            <Rating
                                style={{ maxWidth: 180 }}
                                value={r.rating}
                                readOnly
                            />
                            <p className='py-8'>{r.details}</p>
                            <h3 className='text-2xl text-orange-400'>{r.name}</h3>
                        </div>
                    </SwiperSlide>)
                }
            </Swiper>
        </section>
    );
};

export default Testimonials;