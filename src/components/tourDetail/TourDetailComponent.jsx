import React, { useState } from 'react';
import './TourDetailComponent.css';
import { useNavigate } from 'react-router-dom';
import { Star, ChevronRight, ChevronLeft, Calendar } from 'lucide-react';
import SliderPaging from '../slider/SliderPaging';
import '../slider/sliderStyle.css';
// import Calendar from 'react-calendar';
import TourCalendar from './Calendar/TourCalendar';
import DepartureDates from './Calendar/DepartureDates';
import ItineraryDetail from './InfomaitionTour/ItineraryDetail';
const TourDetailComponent = ({ tourData }) => {
  const navigate = useNavigate();
  const [selectedDeparture, setSelectedDeparture] = useState(tourData.departures[0]);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const toggleDescription = () => {
    setIsDescriptionExpanded(prev => !prev);
  };
  const mainImgDimension = {
    width: 750,
    height: 500
  };

  const thumbImgDimension = {
    width: 70,
    height: 70
  };
  console.log('tourData', tourData);
  const averageRating = tourData.reviews.reduce((acc, review) => acc + review.rating, 0) / tourData.reviews.length;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };
  const handleDateSelect = (departure) => {
    console.log('Selected departure:', departure);
  };
  const imageUrls = tourData.images.map(img => img.imageUrl);

  const participantTypeTranslation = {
    ADULTS: 'Người lớn',
    CHILDREN: 'Trẻ em',
    ELDERLY: 'Người cao tuổi'
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Image Slider Section */}
        <div className="md:w-1/2">
          <SliderPaging
            images={imageUrls}
            mainImgDimension={mainImgDimension}
            thumbImgDimension={thumbImgDimension}
          />
          {/* Tour Description Section */}
          <div className="description-section">
            <h3 className="font-semibold mb-2 ">Bạn sẽ trải nghiệm</h3>
            <p className="description-text">
              {isDescriptionExpanded ? tourData.tourDescription : `${tourData.tourDescription.substring(0, 100)}...`}
            </p>
            <button onClick={toggleDescription} className="text-blue-600 hover:underline mt-2">
              {isDescriptionExpanded ? 'Xem ít hơn' : 'Xem thêm'}
            </button>
          </div>
        </div>

        {/* Tour Information Section */}
        <div className="md:w-1/2">
          <div className="border rounded-lg shadow-lg p-6 h-full">
            <h1 className="text-3xl font-bold mb-4 tour-name">{tourData.tourName}</h1>
            {/* <p className="text-gray-600 mb-4">{tourData.tourDescription}</p> */}

            {/* Price Section */}
            <div className="mb-4">
              <h3 className="font-semibold text-center">Giá</h3>
              <div className="space-y-2 text-center">
                {selectedDeparture.tourPricing.map((price) => {
                  const translatedType = participantTypeTranslation[price.participantType] || price.participantType;

                  return (
                    <div key={price.participantType} className="flex justify-center">
                      <span>{translatedType}:</span>
                      <span className="font-bold text-red-600 ml-2">{formatPrice(price.price)}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Tour Details */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="font-semibold">Thời gian</span>
                <span>{tourData.duration} ngày</span>
              </div>

              {/* Rating Section */}
              <div className="flex items-center gap-2">
                <span className="font-semibold">Đánh giá</span>
                <div className="flex items-center">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      className={index < Math.round(averageRating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                      size={20}
                    />
                  ))}
                  <span className="ml-2">({tourData.reviews.length} đánh giá)</span>
                </div>
              </div>

              {/* Destinations Section */}
              <div>
                <h3 className="font-semibold mb-2">Lịch trình</h3>
                <div className="space-y-2">
                  {tourData.destinations.map((dest, index) => (
                    <div key={dest.destinationId} className="flex items-center gap-2">
                      <span className="font-medium">{index + 1}.</span>
                      <span>{dest.name}, {dest.province}</span>
                      <span className="text-gray-500">({dest.duration} giờ)</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Có vé trống cho bạn</h3>
                <div className="flex-container">
                  <TourCalendar departures={tourData.departures} onDateSelect={handleDateSelect} />
                  <DepartureDates departures={tourData.departures} onDateSelect={handleDateSelect} />
                </div>
              </div>
            </div>


            {/* Booking Button */}
            <button
              onClick={() => navigate('/booking', { state: tourData })}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Đặt tour ngay
            </button>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">Lịch trình chi tiết</h2>
        <ItineraryDetail destinations={tourData.destinations} />
      </div>
      {/* Reviews Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Đánh giá từ khách hàng</h2>
        <div className="space-y-4">
          {tourData.reviews.map(review => (
            <div key={review.reviewId} className="border rounded-lg p-4 bg-white shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-medium">{review.userName}</span>
                <div className="flex items-center">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      className={index < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                      size={16}
                    />
                  ))}
                </div>
                <span className="text-gray-500 text-sm">
                  {new Date(review.reviewDate).toLocaleDateString('vi-VN')}
                </span>
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TourDetailComponent;