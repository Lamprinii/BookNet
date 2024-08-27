import api from "./api";
class BookService {
    getAllBooks(){
        return api
        .get("/books/getAllBooks")
        .then(response => {
          return response.data;
        });
    }

    addBook(name,genre,duration,releaseDate,description,director,actors,rating,language){
        if (typeof actors === 'string') {
            actors = actors.split(',').map(actor => actor.trim());
        }
        
        return api
        .post("/books",{
            name,
            genre,
            duration,
            releaseDate,
            description,
            director,
            actors,
            rating,
            language
        })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error("Error adding book:", error);
            throw error; // Rethrow the error to handle it in the caller
        });
    }

    deleteBook(id){
        return api
        .delete("/books/delete/"+id)
        .then(response =>{
            return response.data;
        })
        .catch(error => {
            console.error("Error deleting book:", error);
            throw error; // Rethrow the error to handle it in the caller
        });
    }

    editBook(id,genre,duration,releaseDate,description,director,actors,rating,language){
        if (typeof actors === 'string') {
            actors = actors.split(',').map(actor => actor.trim());
        }

        return api
        .put("/books/update/"+id,{
            genre,
            duration,
            releaseDate,
            description,
            director,
            actors,
            rating,
            language
        })
        .then(response =>{
            return response.data;
        })
        .catch(error => {
            console.error("Error updating book:", error);
            throw error; // Rethrow the error to handle it in the caller
        });
    }
    

}

export default new BookService() ;