import { createConnect } from 'vuex-connect'

export const connect = createConnect((options, lifecycle) => {
    options.beforeRouteEnter = lifecycle.beforeRouteEnter
})