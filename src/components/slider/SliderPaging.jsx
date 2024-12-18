import React from "react";
import SliderComponent from "./SliderComponent";
import "../slider/sliderStyle.css";

function SliderPaging({ images, mainImgDimension, thumbImgDimension }) {
  // const [imageSize, setImageSize] = React.useState({ width: 0, height: 0 });
  // const handleOnload = (e) => {
  //   const { naturalWidth, naturalHeight } = e.target;
  //   if (naturalWidth > naturalHeight) {
  //     setImageSize({ width: mainImgDimension.width, height: 'auto' });
  //     return;
  //   }
  //   setImageSize({ width: 'auto', height: mainImgDimension.height });
  // }
  const settings = {
    customPaging: function (i) {
      return (
        <a>
          <img
            style={{
              width: thumbImgDimension.width,
              height: thumbImgDimension.height,
            }}
            src={images[i]}
          />
        </a>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const callBack = (image) => (
    <img
      style={{ width: mainImgDimension.width, height: mainImgDimension.height }}
      src={image}
    />
  );

  const CustomSliderOneImage = ({ images }) => {
    return (
      <div style={{ overflow: "hidden" }}>
        <img
          style={{
            width: mainImgDimension.width,
            height: mainImgDimension.height,
          }}
          src={images[0]}
        />
        <img
          style={{
            width: thumbImgDimension.width,
            height: thumbImgDimension.height,
            marginTop: 10,
          }}
          src={images[0]}
        />
      </div>
    );
  };
  return images.length === 1 ? (
    <CustomSliderOneImage
      images={images}
      settings={settings}
      callBack={callBack}
    />
  ) : (
    <SliderComponent images={images} settings={settings} callBack={callBack} />
  );
}

export default SliderPaging;
