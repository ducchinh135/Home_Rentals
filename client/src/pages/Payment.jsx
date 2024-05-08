import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/Payment.scss";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Payment = () => {
  const [loading, setLoading] = useState(true);
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);

  const getBookingDetails = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_ENDPOINT}/bookings/${bookingId}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      setBooking(data);
      setLoading(false);
    } catch (err) {
      console.log("Fetch Booking Details Failed", err.message);
    }
  };

  useEffect(() => {
    getBookingDetails();
  }, []);

  console.log(bookingId);
  console.log(booking);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <div className="payment">
        <div className="booking_info">
          <h2>Booking Information</h2>
          <p>Booking ID: {bookingId}</p>
          <p>Start Date: {booking.startDate}</p>
          <p>End Date: {booking.endDate}</p>
          <p>Total Price: ${booking.totalPrice}</p>
          {/* Hiển thị các trường thông tin khác của đơn đặt phòng */}
        </div>
        <div className="customer_info">
          <h2>Customer Information</h2>
          <form>
            <label>
              Name:
              <input type="text" name="name" />
            </label>
            <label>
              Email:
              <input type="email" name="email" />
            </label>
            <label>
              Phone:
              <input type="tel" name="phone" />
            </label>
            <label>
              Address:
              <input type="text" name="address" />
            </label>
            <button type="submit">Submit Payment</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Payment;
