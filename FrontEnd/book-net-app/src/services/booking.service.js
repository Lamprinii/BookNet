import api from "./api";
import axios from 'axios';

class BookingService {

    validatebookingbyId(id){
        return api
        .put("/bookings/checkin/"+id,
            
    )}

    getBookingsByShowTimeId(id){
        return api
        .get("/bookings/showtime/"+id)
        .then(response => {
          return response.data;
        });
    }

    expirebookingbyId(id){
        var booking = this.getBookingById(id)
        var user=booking.user
        var id=booking.id
        var time=booking.time
        var seat=booking.seat
        return api
        .put("/bookings/expire/"+id,{
            user,
            id,
            time,
            seat
    })}


    getBookingById(id){
        var booking;
        axios.get("http://localhost:8080/api/bookings/"+id).then(response => {
            //booking =  new Booking(response.data.user,response.data.id,response.data.time,response.data.seat); 
        });
        return booking;
    }

    getAllBookings(){
        return api
        .get("/bookings/all")
        .then(response => {
            console.log(response.data);
            return response.data;
        })
        .catch(error => {
            console.error("Error getting bookings:", error);
            throw error; // Rethrow the error to handle it in the caller
        });
    }
      
    addBookings(bookid, userEmail,firstName,lastName,telephone){
        return api
        .post("/bookings/create",{
            bookid,
            userEmail,
            firstName,
            lastName,
            telephone
        })
        .then(response => {

          return response.data;
        })
        .catch(error => {
            console.error("Error adding booking:", error);
            throw error; // Rethrow the error to handle it in the caller
        });
    }

    getBookingByUserId(user_id){
        return api.get("/bookings/user/"+user_id)
        .then(response => {
            console.log(response.data);
            return response.data;
        })
        .catch(error => {
            console.error("Error getting bookings:", error);
            throw error; // Rethrow the error to handle it in the caller
        });
    }

    deleteBooking(booking_id){
        return api.delete("/bookings/delete/"+booking_id)
        .then(response => {
            console.log(response.data);
            return response.data;
        })
        .catch(error => {
            console.error("Error deleting booking:", error);
            throw error; // Rethrow the error to handle it in the caller
        });
    }

    giveBooking(booking_id){
        return api.put("/bookings/give/"+booking_id)
        .then(response => {
            console.log(response.data);
            return response.data;
        })
        .catch(error => {
            console.error("Error deleting booking:", error);
            throw error; // Rethrow the error to handle it in the caller
        });
    }

    recieveBooking(booking_id){
        return api.put("/bookings/get/"+booking_id)
        .then(response => {
            console.log(response.data);
            return response.data;
        })
        .catch(error => {
            console.error("Error deleting booking:", error);
            throw error; // Rethrow the error to handle it in the caller
        });
    }


}

export default new BookingService() ;