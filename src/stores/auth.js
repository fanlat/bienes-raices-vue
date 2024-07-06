import { ref, computed, onMounted } from 'vue' // ref y computed son funciones de Vue que se utilizan para crear referencias reactivas y propiedades computadas
import { defineStore } from 'pinia' // defineStore es una función de Pinia que se utiliza para definir una tienda
import { useFirebaseAuth } from 'vuefire' // useFirebaseAuth es un hook de VueFire que se utiliza para autenticar a los usuarios con Firebase
import { useRouter } from 'vue-router' // useRouter es un hook de Vue Router que se utiliza para acceder al enrutador de la aplicación
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth' // signInWithEmailAndPassword es una función de Firebase que se utiliza para autenticar a los usuarios con correo electrónico y contraseña
// onAuthStateChanged es una función de Firebase que se utiliza para observar el estado de autenticación de los
// singOut es una función de Firebase que se utiliza para cerrar la sesión de los usuarios

export const useAuthStore = defineStore('auth', ()=>{

    const errorMsg = ref('') // errorMsg es una referencia reactiva que se utiliza para almacenar mensajes de error

    const auth = useFirebaseAuth() // useFirebaseAuth es un hook de VueFire que se utiliza para autenticar a los usuarios con Firebase
    const authUser = ref(null) // authUser es una referencia reactiva que se utiliza para almacenar la información del usuario autenticado
    const router = useRouter() // useRouter es un hook de Vue Router que se utiliza para acceder al enrutador de la aplicación

    const errorCodes = {
        'auth/invalid-credential': 'usuario o contraseña incorrectos'
    }

    onMounted(()=>{ // onMounted es un gancho de ciclo de vida de Vue que se utiliza para ejecutar una función cuando un componente se monta
        onAuthStateChanged(auth, (user) => { // onAuthStateChanged es una función de Firebase que se utiliza para observar el estado de autenticación de los usuarios
            if(user){
                authUser.value = user
            }
        })
    })

    const login = ({email, password}) =>{
        signInWithEmailAndPassword(auth, email, password) // signInWithEmailAndPassword es una función de Firebase que se utiliza para autenticar a los usuarios con correo electrónico y contraseña
        .then((userCredential) => {
            const user = userCredential.user
            authUser.value = user
            router.push({name: 'admin-propiedades'})
        })
        .catch(error=> {
            console.log(error)
           errorMsg.value = errorCodes[error.code] // errorCodes es un objeto que se utiliza para mapear los códigos de error de Firebase a mensajes de error
        })
    }

    const logout = () => {
        signOut(auth) // signOut es una función de Firebase que se utiliza para cerrar la sesión de los usuarios
        .then(() => {
            authUser.value = null // authUser es una referencia reactiva que se utiliza para almacenar la información del usuario autenticado
            router.push({name: 'login'}) // router es un hook de Vue Router que se utiliza para acceder al enrutador de la aplicación
        })
        .catch((error) => {
            console.log(error)
        })
    }

    const hasError = computed(() => { // hasError es una propiedad computada que se utiliza para determinar si hay un mensaje de error
        return errorMsg.value
    
    }) // hasError es una propiedad computada que se utiliza para determinar si hay un mensaje de error

    const isAuth = computed(()=>{
        return authUser.value
    })

    return {
        login,
        logout,
        hasError,
        errorMsg,
        isAuth
    }
})