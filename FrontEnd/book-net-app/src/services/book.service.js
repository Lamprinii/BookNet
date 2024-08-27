import api from "./api";
class BookService {
    getAllBooks(){
        return api
        .get("/books/getAllBooks")
        .then(response => {
          return response.data;
        });
    }

    addBook(name,category,numofpages,releaseDate,description,author,agerating){
        
        
        return api
        .post("/books",{
            name,
            category,
            numofpages,
            releaseDate,
            description,
            author,
            agerating
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

    editBook(id,name,category,numofpages,releaseDate,description,author,agerating){
        

        return api
        .put("/books/update/"+id,{
            name,
            category,
            numofpages,
            releaseDate,
            description,
            author,
            agerating
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