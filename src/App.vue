<script setup>
  import {  RouterView } from 'vue-router' // RouterView es un componente de Vue Router que se utiliza para renderizar las rutas
  import { useAuthStore } from './stores/auth' // useAuthStore es un hook que se utiliza para obtener el store de autenticación
  const auth = useAuthStore() // useAuthStore es un hook que se utiliza para obtener el store de autenticación
</script>

<template>
    <v-card
      elevation="3"
      max-width="1200"
      class="mx-auto"
    >
      <v-layout>
          <v-app-bar
            color="blue-darken-1"
          >
             <template v-slot:prepend> <!-- v-slot es una directiva de Vue que se utiliza para pasar contenido a un componente -->  
              <v-btn :to="{name: 'home'}"> <!-- :to es una propiedad de Vuetify que se utiliza para redirigir a una ruta -->
                    Bienes Raices - VueFire
                </v-btn>
            </template>
            
            <template v-slot:append>
              <div v-if="auth.isAuth">
                <v-btn :to="{name: 'admin-propiedades'}">Admin</v-btn>
                <v-btn @click="auth.logout">Cerrar Sesión</v-btn>
              </div>
              <div v-else>
                <v-btn :to="{name: 'home'}">Inicio</v-btn>
                <v-btn :to="{name: 'login'}">Iniciar Sesión</v-btn>
              </div>
                
            </template>
          </v-app-bar>

          <v-main>
            <v-container>
              <RouterView />
            </v-container>
          </v-main>
      </v-layout>
    </v-card>
</template>
