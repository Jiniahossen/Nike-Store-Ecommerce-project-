
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import './css.css';
import { Pagination } from 'swiper/modules';
import useCategory from '../../hooks/useCategory';


const CategorySlide = () => {

    const [category]=useCategory([]);
    
    return (
        <div>
            <Swiper
        slidesPerView={'auto'}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {
            category.map(data=><SwiperSlide key={data._id}>
                <img src={data.category_img} alt={''} />
                <h1>{data.category}</h1></SwiperSlide>)
        }
      </Swiper>
        </div>
    );
};

export default CategorySlide;