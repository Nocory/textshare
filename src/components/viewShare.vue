<template>
	<div class="component">
		<div class="subtitle is-6">
			share-ID: {{id}}
		</div>
		<div class="wrapper">
			<div class="subtitle is-4 shareTitle">
				{{title}}
			</div>
			<div class="spacer"></div>
			<router-link tag="div" to="/new" class="gotonew button">
				↩ New
			</router-link>
		</div>
		<pre class="shareContent" v-show="content.length">{{content}}</pre>
	</div>
</template>

<script>
import axios from "axios"
export default {
	props: ["id"],
	data() {
		return {
			title: "",
			link: "",
			content: "LOADING..."
		}
	},
	methods: {

	},
	watch: {
		// call again the method if the route changes
		'$route': 'fetchData'
	},
	created() {
		this.fetchData()
	},
	mounted() {

	},
	methods: {
		fetchData() {
			const url = "https://api.conroy.link/textshare"
			axios.get(`${url}/getSpecific/${this.id}`)
				.then(response => {
					this.title = response.data.title || "a share with this ID does not exist"
					//this.content = response.data.content.replace(/\n/gi, "<br>")
					this.content = response.data.content
					this.link = location.href
				})
				.catch(error => {
					console.log(error)
				})
		}
	}
}
</script>

<style scoped lang="scss">
@import "~css/colors.scss";

.component {
	background: transparent;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
}

.wrapper {
	display: flex;
	justify-content: flex-start;
	align-items: center;
	width: 100%;
	padding: 0.5rem 0;
}

.subtitle {
	margin: 0;
	padding: 0;
	color: $oc-gray-0;
}

.shareTitle {
	//box-shadow: 0px 4px 12px -2px rgba(0, 0, 0, 0.5);
	color: $oc-gray-0;
	border: 0px;
	font-family: monospace;
	padding: 0;
	min-width: 128px;
}

.spacer {
	flex-grow: 1;
}

.gotonew {
	min-width: 128px;
	background-color: $oc-blue-7;
	color: $oc-gray-0;
	box-shadow: 0px 4px 12px -2px rgba(0, 0, 0, 0.5);
	border: none;
}

.shareContent {
	line-height: 1.4;
	padding: 0.5em;
	width: 100%;
	min-height: 256px;
	background-color: $oc-gray-0;
	color: $oc-gray-7;

	box-shadow: 0px 4px 12px -2px rgba(0, 0, 0, 0.5);
	border: 0px;

	font-family: monospace;
	resize: none;
	overflow-y: hidden;
	overflow-x: hidden;
	overflow-wrap: break-word;
}
</style>