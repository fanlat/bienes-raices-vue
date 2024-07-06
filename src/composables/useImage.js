import { computed } from 'vue';
import { ref as storageRef } from 'firebase/storage';
import { useFirebaseStorage, useStorageFile } from 'vuefire';
import { uid } from 'uid';

export default function useImage() {
    
    const storage = useFirebaseStorage()// storage es una variable que se utiliza para acceder a las funciones de almacenamiento de Firebase
    // storage es una variable que se utiliza para acceder a las funciones de almacenamiento de Firebase
    const storageRefPath = storageRef(storage, `/propiedades/${uid()}.jpg`) // uid es una función que se utiliza para generar un id único

    const {
        url,
        upload
    } = useStorageFile(storageRefPath) // url es una variable que se utiliza para almacenar la url de la imagen y upload es una función que se utiliza para subir la imagen al almacenamiento de Firebase

    function uploadImage(e){
        const data = e.target.files[0] // data es una variable que se utiliza para almacenar la imagen seleccionada por el usuario
        if(data){
            upload(data) // upload es una función que se utiliza para subir la imagen al almacenamiento de Firebase
        }
    }
    const image = computed(()=>{
        return url.value ? url.value : null // image es una variable que se utiliza para almacenar la url de la imagen
    })

    return {
        url,
        uploadImage,
        image
    }
}