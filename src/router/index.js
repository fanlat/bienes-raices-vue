import { createRouter, createWebHistory } from 'vue-router'
import { onAuthStateChanged } from 'firebase/auth'
import { useFirebaseAuth } from 'vuefire'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/propiedad/:id',
      name: 'propiedad',
      component: () => import('../views/PropiedadView.vue')
    },{
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/AdminLayout.vue'),
      meta: { requiresAuth: true},
      children: [
        {
          path:'propiedades',
          name: 'admin-propiedades',
          component: () => import('../views/admin/AdminView.vue')
        },
        {
          path:'nueva',
          name: 'nueva-propiedad',
          component: () => import('../views/admin/NuevaPropiedadView.vue')
        },
        {
          path:'editar/:id',
          name: 'editar-propiedad',
          component: () => import('../views/admin/EditarPropiedadView.vue')
        },
      ]
    }
  ]
})

// Guardia de navegación
router.beforeEach(async(to, from, next) => {
  const requiresAuth = to.matched.some(url => url.meta.requiresAuth) // requiresAuth es una variable que se utiliza para determinar si la ruta requiere autenticación
  if(requiresAuth){
    // Comporbamos que el usuario esté autenticado
    try{
      await authenticateUser(); // authenticateUser es una función que se utiliza para autenticar a los usuarios
      next() // next es una función que se utiliza para continuar con la navegación
    } catch(error){
      console.log(error)
      next({name: 'login'}) 
    } 
  }else{
    // no está protegido, por lo que mostramos la vista
    next()
  }
})

function authenticateUser(){
  const auth = useFirebaseAuth() // useFirebaseAuth es un hook de VueFire que se utiliza para autenticar a los usuarios con Firebase
  return new Promise((resolve, reject)=>{ // resolve y reject son funciones que se utilizan para resolver o rechazar una promesa
    const unsubscrube = onAuthStateChanged(auth, (user) => { // onAuthStateChanged es una función de Firebase que se utiliza para observar el estado de autenticación de los usuarios
      unsubscrube() // unsubscrube es una función que se utiliza para dejar de observar el estado de autenticación de los usuarios
      if(user){
        resolve(user) // resolve es una función que se utiliza para resolver una promesa
      }else{
        reject('Usuario no autenticado')  // reject es una función que se utiliza para rechazar una promesa
      }
    })
  })
}

export default router
