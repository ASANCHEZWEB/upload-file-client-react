// components/AddThing.js
import React, { Component } from "react";

// importamos el servicio axios creado en el otro documento para nuestras peticiones
import service from '../api/service';

class AddThing extends Component {
    constructor(props) {
        super(props);
        this.state = {
          name: "",
          description: "",
          imageUrl: ""
        };
    }
    
    handleChange = e => {  
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    // este metodo sube el archivo a cloudinary
    handleFileUpload = e => {
        console.log("The file to be uploaded is: ", e.target.files[0]);

        const uploadData = new FormData();
        // imageUrl => este nombre debe ser igual que el nombre del modelo del back
        // req.body a .create() metodo crea una nueva cosa '/api/things/create' POST ruta
        uploadData.append("imageUrl", e.target.files[0]);
        
        service.handleUpload(uploadData)
        .then(response => {
            // console.log('response is: ', response);
            // after the console.log we can see that response carries 'secure_url' which we can use to update the state 
            this.setState({ imageUrl: response.secure_url });
          })
          .catch(err => {
            console.log("Error while uploading the file: ", err);
          });
    }

    // este metodo envia el formulario
    handleSubmit = e => {
        e.preventDefault();
        
        service.saveNewThing(this.state)
        //esto guarda el objeto en la db 
        .then(res => {
            console.log('added: ', res);
            // aqí puedes hacer lo que quieras despues de enviar a la db.
        })
        .catch(err => {
            console.log("Error while adding the thing: ", err);
        });
    }  
    
    render() {
        return (
          <div>
            <h2>New Thing</h2>
            <form onSubmit={e => this.handleSubmit(e)}>
                <label>Name</label>
                <input 
                    type="text" 
                    name="name" 
                    value={ this.state.name } 
                    onChange={ e => this.handleChange(e)} />
                <label>Description</label>
                <textarea 
                    type="text" 
                    name="description" 
                    value={ this.state.description } 
                    onChange={ e => this.handleChange(e)} />
                <input 
                    type="file" 
                    onChange={(e) => this.handleFileUpload(e)} /> 
                <button type="submit">Save new thing</button>
            </form>
          </div>
        );
    }
}

export default AddThing;