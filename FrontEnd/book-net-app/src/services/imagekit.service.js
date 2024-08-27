    import axios from 'axios';

    const publicK="public_RpxufWizWBajeZch607qowKJCrg="
    const urlEP="https://ik.imagekit.io/cineticketbooking"
    const authEndpoint='http://localhost:8080/api/imagekit'


    export const authenticator =  async () => {
        try {
            const response = await fetch('http://localhost:8080/api/imagekit');
    
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Request failed with status ${response.status}: ${errorText}`);
            }
    
            const data = await response.json();
            const { signature, expire, token } = data;
            return { signature, expire, token };
        } catch (error) {
            throw new Error(`Authentication request failed: ${error.message}`);
        }
    };
    
    export const onError = err => {
      console.log("Error", err);
    };
    
    export const onSuccess = res => {
      console.log("Success", res);
    };

    export const  uploadProfile= async (id,file) =>{
            authenticator().then((response)=>{
                const { signature, expire, token }=response;
                const form = new FormData();
                form.append('file', file);
                form.append('fileName',id+".jpeg");
                form.append('signature', signature);
                form.append('publicKey', "public_RpxufWizWBajeZch607qowKJCrg=");
                form.append('token', token);
                form.append('expire', expire);
                form.append('folder', '/Users');
                form.append('useUniqueFileName','false');
                axios
                .post("https://upload.imagekit.io/api/v1/files/upload",form,{
                headers: { 
                  "Content-Type": "multipart/form-data"
                }
              }).then(function(response) {
              });
            })
            
            

}

export const  uploadBook= async (id,file) =>{
  authenticator().then((response)=>{
      const { signature, expire, token }=response;
      const form = new FormData();
      form.append('file', file);
      form.append('fileName', id+".jpeg");
      form.append('signature', signature);
      form.append('publicKey', "public_RpxufWizWBajeZch607qowKJCrg=");
      form.append('token', token);
      form.append('expire', expire);
      form.append('folder', '/Books');
      form.append('useUniqueFileName','false');
      //form.append('transformation','{post:[ { type:"transformation" ,value:"h-1699"},{ type:"transformation" ,value:"w-2560"}]}');
      axios
      .post("https://upload.imagekit.io/api/v1/files/upload",form,{
      headers: { 
        "Content-Type": "multipart/form-data"
      }
    }).then(function(response) {
        console.log(response);
    });
  })
  
  

}

