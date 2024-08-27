import { IKImage, IKVideo, IKContext, IKUpload } from 'imagekitio-react';


    const publicK="public_RpxufWizWBajeZch607qowKJCrg="
    const urlEP="https://ik.imagekit.io/cineticketbooking"
    const authEndpoint="http://localhost:8080/api/imagekitauth"


    function uploadProfile(data,id,folder,file) {
        var imagekit = new ImageKit({
            publicKey : publicK,
            urlEndpoint : urlEP+"/Users",
            authenticationEndpoint : authEndpoint
        });
        imagekit.upload({
            file : file.files[0],
            fileName : id+".jpeg",
        }, function(err, result) {
            console.log(arguments);
            console.log(imagekit.url({
            src: result.url,
            transformation : [{ height: 512, width: 512}]
        }));
    })
}

    function uploadBook(data,id,file) {
        var imagekit = new ImageKit({
            publicKey : "public_RpxufWizWBajeZch607qowKJCrg=",
            urlEndpoint : "https://ik.imagekit.io/cineticketbooking/Movies",
            authenticationEndpoint : "http://localhost:8080/api/imagekitauth"
        });
        imagekit.upload({
            file : file.files[0],
            fileName : id+".jpeg",
        }, function(err, result) {
            console.log(arguments);
            console.log(imagekit.url({
                src: result.url,
                transformation : [{ height: 2560, width: 1699}]
            }));
        })
    }