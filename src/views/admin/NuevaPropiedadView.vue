<script setup>
    import { useForm, useField } from 'vee-validate'
    import { collection, addDoc } from 'firebase/firestore'
    import { useFirestore } from 'vuefire' // useFirestore es un hook de VueFire que se utiliza para obtener la instancia de Firestore
    import { useRouter } from 'vue-router' // useRouter es un hook de Vue Router que se utiliza para obtener la instancia de Router
    import { validationSchema, imageSchema } from '@/validation/propiedadSchema'
    import useImage from '@/composables/useImage' // useImage es un hook que se utiliza para subir imágenes a Firebase Storage
    import useLocationMap from '@/composables/useLocationMap' // useLocationMap es un hook que se utiliza para obtener la ubicación en un mapa
    import "leaflet/dist/leaflet.css";
    import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet"

    
    const items = [1,2,3,4,5]

    const { url, uploadImage, image } = useImage() // uploadImage es una función que se utiliza para subir imágenes a Firebase Storage
    const { zoom, center, pin } = useLocationMap() // zoom es una propiedad que se utiliza para definir el nivel de zoom del mapa

    const router = useRouter() // useRouter es un hook de Vue Router que se utiliza para obtener la instancia de Router
    const db = useFirestore() // useFirestore es un hook de VueFire que se utiliza para obtener la instancia de Firestore

    const { handleSubmit } = useForm({
        validationSchema:{ // Usamos el objeto validationSchema para definir las reglas de validación de los campos del formulario
            ...validationSchema,
            ...imageSchema // Usamos el sprit operator para unir los esquemas de validación
        
        }
    })

    const titulo = useField('titulo') // useField es un hook de VeeValidate que se utiliza para crear un campo de formulario
    const imagen = useField('imagen')
    const precio = useField('precio')
    const habitaciones = useField('habitaciones')
    const wc = useField('wc')
    const estacionamiento = useField('estacionamiento')
    const descripcion = useField('descripcion')
    const piscina = useField('piscina', null,{
        initialValue: false // Usamos la propiedad initialValue para definir el valor inicial del campo
    }) // no tiene validación pero es necesario para obtener el dato del formulario.

    const submit = handleSubmit(async(values) => {
        const { imagen, ...propiedad} = values

        const docRef = await addDoc(collection(db, "propiedades"), {
            ...propiedad,
            imagen: url.value,
            ubicacion:center.value
        });
        if( docRef.id){
            router.push({name: 'admin-propiedades'})
        }
    })

</script>
<template>
    <v-card max-width="800" flat class="mx-auto my-10">
        <v-card-title
            class="text-h4 font-weight-bold"
            tag="h3"
        >Nueva Propiedad</v-card-title> <!-- tag es una propiedad de Vuetify que define el tipo de etiqueta HTML que se utilizará para el título -->
        <v-card-subtitle
            class="text-h5 py-5"
        > <!-- v-card-subtitle es un componente de Vuetify que se utiliza para mostrar subtítulos -->
            Crea una nueva propiedad llenando el formulario
        </v-card-subtitle>
        <v-form class="mt-10">
            <v-text-field
                class="mb-5"
                label="Titulo Propiedad"
                v-model="titulo.value.value"
                :error-messages="titulo.errorMessage.value"
            />
            <v-file-input
                accept="image/jpeg"
                label="Fotografia de la propiedad"
                prepend-icon="mdi-camera"
                class="mb-5"
                v-model="imagen.value.value"
                :error-messages="imagen.errorMessage.value"
                @change="uploadImage"
            />
            <dir v-if="image" class="my-5">
                <p class="font-weight-bold">Imagen Propiedad:</p>
                <img :src="image" alt="Imagen Propiedad" class="w-50"
            </dir>
            <v-text-field
                class="mb-5"
                label="Precio"
                v-model="precio.value.value"
                :error-messages="precio.errorMessage.value"
            />
            <v-row>
                <v-col
                    cols="12"
                    md="4"
                >
                    <v-select
                        label="Habitaciones"
                        class="mb-5"
                        :items="items"
                        v-model="habitaciones.value.value"
                        :error-messages="habitaciones.errorMessage.value"
                    />
                </v-col>
                <v-col
                    cols="12"
                    md="4"
                >
                    <v-select
                        label="WC"
                        class="mb-5"
                        :items="items"
                        v-model="wc.value.value"
                        :error-messages="wc.errorMessage.value"
                    />
                </v-col>
                <v-col
                    cols="12"
                    md="4"
                >
                    <v-select
                        label="Lugares Estacionamiento"
                        class="mb-5"
                        :items="items"
                        v-model="estacionamiento.value.value"
                        :error-messages="estacionamiento.errorMessage.value"
                    />
                </v-col>
            </v-row>
                <v-textarea 
                    class="mb-5" 
                    label="Descripción"
                    v-model="descripcion.value.value"
                    :error-messages="descripcion.errorMessage.value"
                ></v-textarea>
                <v-checkbox 
                    label="piscina"
                    v-model="piscina.value.value"
                    :error-messages="piscina.errorMessage.value"
                />
                <h2 class="font-weight-bold text-center my-5">Ubicación</h2>
                <div class="pb-10">
                    <div style="height:600px;">
                        <LMap
                            v-model:zoom="zoom" 
                            :center="center" 
                            :use-global-leaflet="false"
                        >
                        <LMarker
                            :lat-lng="center"
                            draggable
                            @moveend="pin"
                        />
                        <LTileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        ></LTileLayer>
                        </LMap>
                    </div>
                </div>
                <v-btn
                    color="pink-accent-3"
                    block
                    @click="submit"
                >Agregar Propiedad</v-btn>
        </v-form>
    </v-card>
</template>