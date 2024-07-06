import { computed, ref } from 'vue'
import { collection, doc, deleteDoc } from 'firebase/firestore' // Importamos collection de firestore
import { ref as storageRef, deleteObject } from 'firebase/storage' // Importamos ref y deleteObject de storage
import { useFirestore, useCollection, useFirebaseStorage } from 'vuefire'


export default function usePropiedades() {

    const piscina = ref(false)
    const storage = useFirebaseStorage() // Inicializamos el storage
    const db = useFirestore() // Inicializamos la base de datos


    const propiedadesCollection = useCollection(collection(db, 'propiedades')) // Obtenemos la colección de propiedades

    async function deleteItem(id, urlImage) {
        if (confirm('¿Estás seguro de eliminar esta propiedad?')){
            const docRef = doc(db, 'propiedades', id) // Referencia al documento
            const imageRef = storageRef(storage, urlImage) // Referencia a la imagen
            await Promise.all([ // Usamos Promise.all para esperar a que se eliminen ambos elementos
                deleteDoc(docRef),
                deleteObject(imageRef)
            ])
        }
    }
    
    const propiedadesFiltradas = computed(() => {
        return piscina.value ?
        propiedadesCollection.value.filter(propiedad => propiedad.piscina) :
        propiedadesCollection.value
    } )

    return {
        propiedadesCollection,
        propiedadesFiltradas,
        piscina,
        deleteItem
    }
}