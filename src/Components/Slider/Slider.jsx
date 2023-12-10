import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import './style.css';

import { EffectCoverflow, Pagination } from 'swiper/modules';
import Container from '../Shared/Container/Container';

const Slider = () => {
    return (
        <Container>
            <div>
                <Swiper
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    initialSlide={3}
                    slidesPerView={'auto'}
                    coverflowEffect={{
                        rotate: 50,
                        stretch: -100,
                        depth: 500,
                        modifier: 1,
                        loop: true,
                        autoplay: {
                            delay: 5000,
                            disbaleOnInterection:false,
                        },
                        slideShadows: true,
                    }}
                    pagination={true}
                    modules={[EffectCoverflow, Pagination]}
                    className="mySwiper"
                >
                    <SwiperSlide>
                        <img src="https://i.ibb.co/wwNSYrT/images-7.jpg" className='h-full'/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="https://i.ibb.co/7pmpnrR/images-9.jpg"className='h-full' />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="https://i.ibb.co/RCFPcXQ/images-8.jpg" className='h-full' />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="https://i.ibb.co/tLv7rfr/run-nike-running-shoes-646cdd1a19c41.jpg" className='h-full' />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="https://i.ibb.co/2P4kktn/images-6.jpg" className='h-full' />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="https://i.ibb.co/2YRkFLx/images-10.jpg " className='h-full' />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="https://i.ibb.co/PNQQy21/images-13.jpg" className='h-full' />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="https://i.ibb.co/qxppD46/images-12.jpg" className='h-full' />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="https://i.ibb.co/YL6fwB3/images-11.jpg" className='h-full' />
                    </SwiperSlide>
                </Swiper>
            </div>
        </Container>
    );
};

export default Slider;