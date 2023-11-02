import Carousel from "react-multi-carousel";
import CustomDot from "../CustomDot";
import "react-multi-carousel/lib/styles.css";

const Slider = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 640 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 640, min: 0 },
      items: 1,
    },
  };

  const slides = [
    "https://cdn.uc.assets.prezly.com/16cf446e-8883-4821-beff-595ca9340f39/-/format/auto/Low_Resolution_JPG-G915TKL%20Social%20KeyVisual%20Twitter%201200x675.jpg",
    "https://carlosvassan.com/wp-content/uploads/2021/08/Mejores-ofertas-semana-gamer-2021.jpg",
    "https://i.ytimg.com/vi/E6Ax-xuOBzI/maxresdefault.jpg",
    "https://i.postimg.cc/7xLKDbdQ/Hyper-X-Product-Banner-desktop-1920x1080-1.jpg",
  ];

  return (
    <Carousel
      showDots={true}
      responsive={responsive}
      infinite={true}
      removeArrowOnDeviceType={["tablet", "mobile"]}
      customDot={<CustomDot />}
      className=" rounded-3xl h-auto sm:h-auto lg:w-auto"
    >
      {slides.map((imageUrl, index) => (
        <div key={index}>
          <img
            className="w-auto h-auto"
            src={imageUrl}
            alt={`Slide ${index + 1}`}
          />
        </div>
      ))}
    </Carousel>
  );
};
export default Slider;
