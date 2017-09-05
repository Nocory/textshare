<template>
	<div id="app">
		<headerComponent></headerComponent>
		<div class="container">
			<div class="columns is-marginless">
				<router-view class="column is-8"></router-view>
				<!--<editorComponent class="column is-8"></editorComponent>-->
				<sidebarComponent class="column is-4 is-hidden-mobile"></sidebarComponent>
			</div>
		</div>
		<!--<footerComponent></footerComponent>-->
	</div>
</template>

<script>
const routes = [
	{
		path: "/view/:id",
		component: require("./viewShare.vue").default,
		props: true
	},
	{
		path: "/new",
		component: require("./editor.vue").default
	},
	{
		path: "*",
		redirect: '/new'
	},

]

import VueRouter from "vue-router"
const router = new VueRouter({
	routes // short for `routes: routes`
})

export default {
	router,
	data() {
		return {

		}
	},
	components: {
		headerComponent: require("./header.vue").default,
		editorComponent: require("./editor.vue").default,
		sidebarComponent: require("./sidebar.vue").default,
		footerComponent: require("./footer.vue").default,
	}
}
</script>

<style lang="scss" scoped>
@import "~css/colors.scss";
#app {
	z-index: 0;
	position: relative;
	background: transparent;
}

.main {}
</style>