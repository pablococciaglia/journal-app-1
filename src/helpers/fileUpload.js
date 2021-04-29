//este helper es un archivo que se encarga de la subida de la imagen a la base de datos en creada en cloudinary

export const fileUpload = async ( file ) => { //es una tarea asincrona porque se va a hacer pedido a cloudinary
    const cloudUrl = 'https://api.cloudinary.com/v1_1/dg0as7cgt/upload';
    const formData = new FormData(); //FormData que crea javascript para enviar a apis, asi se construye una sentencia de request, en este caso lo usamos para enviar a cloudinary. se puede probar todo antes con postman
    formData.append('upload_preset', 'react-journal'); //cosas de cloudinary para hacer un pedido
    formData.append('file', file); //cosas de cloudinary para hacer un pedido
    try{
        const resp = await fetch (cloudUrl, {
            method: 'POST',  //metodo que se utiliza para la peticion
            body: formData //la peticion en si
        })
        if (resp.ok){
            const cloudResp = await resp.json();
            return cloudResp.secure_url;
        } else {
            throw await resp.json();
        }
    } catch (error) {
        throw (error);
    }

}