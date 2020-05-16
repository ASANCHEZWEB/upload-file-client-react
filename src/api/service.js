// api/service.js

import axios from 'axios';

const service = axios.create({
  baseURL: 'http://localhost:5000/api',
  // withCredentials: true // => necesitaras esto cuando esten los users en la app
});

const errorHandler = err => {
  // console.error(err);
  throw err;
};

export default {
  service,

  handleUpload (theFile) {
    //envia el archivo a cloudinary
    return service.post('/upload', theFile)
      .then(res => res.data)
      .catch(errorHandler);
  },

  saveNewThing (newThing) {
    // guarda el la foto junto a un titulo y descripcion
    return service.post('/things/create', newThing)
      .then(res => res.data)
      .catch(errorHandler);
  }
}