import "css/critical.scss"
import "css/main.scss"

import Vue from "vue/dist/vue.runtime.esm.js"
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import app from "../components/app.vue"

import store from "./store"

new Vue({
	store,
	el: '#app',
	render: h => h(app)
});

console.log("NODE_ENV is: ", process.env.NODE_ENV)
console.log("DEBUG is: ", process.env.DEBUG)