import axios from "axios";
import {
  BOOKING_TOUR,
  GET_PAGE_BOOKING,
  getAPI,
  UPDATE_BOOKING_STATUS,
} from "../config/host";

const getAllBooking = async (page, size, sortBy, sortDirection) => {
  if (page === undefined) page = 0;
  if (size === undefined) size = 10;
  if (sortBy === undefined) sortBy = "bookingDate";
  if (sortDirection === undefined) sortDirection = "desc";
  const result = await axios.get(
    getAPI(GET_PAGE_BOOKING, { page, size, sortBy, sortDirection }),
  );
  return result.data;
};

const bookingTour = async (data) => {
  const response = await axios.post(getAPI(BOOKING_TOUR, data));
  return response.data;
};

const updateBookingStatus = async (bookingId) => {
  const response = await axios.put(
    getAPI(UPDATE_BOOKING_STATUS, { bookingId }),
  );
  return response.data;
};

export { getAllBooking, updateBookingStatus };
export default bookingTour;
