import { ref } from 'vue'
export default function useLocationMap() {
    const zoom = ref(15)
    const center = ref([-33.4495053, -70.6320367])

    function pin(e) {
        const marker = e.target.getLatLng() // marker es una variable que se utiliza para almacenar la posición del marcador
        center.value = [marker.lat, marker.lng] // center es una variable que se utiliza para almacenar la posición del centro
    }

    return{
        zoom,
        center,
        pin
    }
}