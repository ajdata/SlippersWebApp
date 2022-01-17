import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "../../node_modules/swiper/swiper.min.css";
import "../../node_modules/swiper/modules/effect-coverflow/effect-coverflow.min.css";
import "../../node_modules/swiper/modules/navigation/navigation.min.css";
import "../../node_modules/swiper/modules/pagination/pagination.min.css";
import "../styles.css";
import { connect } from "react-redux";
import shoeActions from "../redux/actions/shoeActions";
import SwiperCore, {
  EffectCoverflow,
  Pagination,
  Navigation,
} from "swiper/core";
import Logo from "../assets/logo2.png";
// import Img1 from "../assets/img1.jpg";
// import Img2 from "../assets/img2.jpg";
// import Img3 from "../assets/img3.jpg";
// import Img4 from "../assets/img4.jpg";
// import Img5 from "../assets/img5.jpg";
// import Img6 from "../assets/img6.jpg";

SwiperCore.use([EffectCoverflow, Pagination, Navigation]);

function Carousel(props) {
  const { arrayShoes } = props;

  useEffect(() => {
    arrayShoes();
  }, [arrayShoes]);

  return (
    <div className="container-carousel">
      <div className="title_wrapper">
        <div className="title_"></div>
      </div>
      <Swiper
        navigation={true}
        effect={"coverflow"}
        centeredSlides={true}
        slidesPerView={window.innerWidth < 768 ? 1 : "auto"}
        loop={true}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{
          clickable: true,
        }}
        className="mySwiper"
      >
        {console.log(props.allShoes)}
        <div className="shoes-container-card">
          {props.allShoes ? (props.allShoes.map((elem,i) => {
            return (
              <SwiperSlide key={i}>
                <div className="card-shoe">
                  <div className="img-div">
                    <img src={elem.image} alt={elem.name} />
                    <p className="name-shoe">{elem.name}</p>
                  </div>
                </div>
              </SwiperSlide>
            )
          }))
            :
            <SwiperSlide>
              <img src={Logo} alt="placeholder logo" />
            </SwiperSlide>
          }
        </div>
      </Swiper>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    allShoes: state.shoeReducer.shoes,
  };
};

const mapDispatchToProps = {
  arrayShoes: shoeActions.getShoes,
};

export default connect(mapStateToProps, mapDispatchToProps)(Carousel);
