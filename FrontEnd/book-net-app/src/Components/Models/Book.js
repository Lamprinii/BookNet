export class Book {
    

    constructor(name,id,category,numofpages,releaseDate,description,author,agerating, status) { 
        this.name=name;
        this.id=id;
        this.category=category
        this.numofpages=numofpages;
        this.description=description;
        this.author=author;
        this.agerating=agerating;
        this.releaseDate=releaseDate;
        this.photo="https://ik.imagekit.io/cineticketbooking/Movies/"+id+".jpeg";
        this.status=status;
     } 
  }