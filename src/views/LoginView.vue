<script setup>
    // vee-validate es una extención que permite validar el formulario lo usa vuetify | npm install vee-validate
    import { useForm, useField} from 'vee-validate' // useForm y useField son funciones de vee-validate que se utilizan para crear formularios y campos de formulario
    import { loginSchema as validationSchema} from '../validation/loginSchema' // loginSchema es un esquema de validación que se utiliza para validar el formulario de inicio de sesión
    import { useAuthStore } from '../stores/auth' // auth es un store que se utiliza para manejar la autenticación de los usuarios

    const { handleSubmit } = useForm({
        validationSchema // validationSchema es una propiedad de vee-validate que se utiliza para definir un esquema de validación 
    }) // handleSubmit es una función de vee-validate que se utiliza para enviar el formulario

    const auth = useAuthStore() // useAuthStore es una función de Vuex que se utiliza para obtener el store de autenticación

    const email = useField('email') // useField es una función de vee-validate que se utiliza para crear campos de formulario
    const password = useField('password') // useField es una función de vee-validate que se utiliza para crear campos de formulario

    const submit = handleSubmit((values) => {
        auth.login(values) // auth.login es una función que se utiliza para iniciar sesión
    }) // onSubmit es una función que se utiliza para enviar el formulario

</script>

<template>
    
    <v-card
        flat 
        max-width="600"
        class="mx-auto my-10"
    > <!-- flat es una propiedad de Vuetify que elimina la sombra del componente -->
        <v-card-title
            class="text-h4 font-weight-bold"
            tag="h3"
        >Iniciar Sesión</v-card-title> <!-- tag es una propiedad de Vuetify que define el tipo de etiqueta HTML que se utilizará para el título -->
        <v-card-subtitle
            class="text-h5"
        > <!-- v-card-subtitle es un componente de Vuetify que se utiliza para mostrar subtítulos -->
            Inicia Sesión con tu cuenta
        </v-card-subtitle>
        <v-alert
             v-if="auth.hasError"
            class="my-5"
            type="error"
            :title="auth.errorMsg"
        ></v-alert>
        <v-form
            class="mt-5"
        > <!-- v-form es un componente de Vuetify que se utiliza para crear formularios -->
            <v-text-field 
                type="email"
                label="Email"
                class="mb-3"
                bg-color="blue-grey-lighten-5"
                v-model="email.value.value"
                :error-messages="email.errorMessage.value"
            /> <!-- v-text-field es un componente de Vuetify que se utiliza para crear campos de texto -->
            <!-- :error-messages es una propiedad de Vuetify que se utiliza para mostrar mensajes de error -->
            <v-text-field 
                type="password"
                label="Password"
                class="mb-3"
                bg-color="blue-grey-lighten-5"
                v-model="password.value.value"
                :error-messages="password.errorMessage.value"

            />
            <v-btn
                block
                color="pink-accent-3"
                @click="submit"
            >
                Iniciar Sesión
            </v-btn>  

        </v-form>
    </v-card>
</template>