<template>
	<div class="component">
		<div class="subtitle is-5">
			Recently created:
		</div>
		<router-link tag="div" :to="'/view/'+entry.id" class="shareWrapper" v-for="(entry,index) in recent" :key="index">
			<div class="shareTime">{{entry.timeString}} ago</div>
			<div class="shareTitle">{{entry.title}}</div>
		</router-link>
	</div>
</template>

<script>
import axios from "axios"
export default {
	data() {
		return {
			recent: []
		}
	},
	methods: {

	},
	created() {
		const calcAge = (ageSeconds) => {
			if (ageSeconds < 60) return Math.round(ageSeconds) + " seconds"
			if (ageSeconds < 60 * 60) return Math.round(ageSeconds / 60) + " minutes"
			if (ageSeconds < 60 * 60 * 24) return Math.round(ageSeconds / (60 * 60)) + " hours"
			return Math.round(ageSeconds / (60 * 60 * 24)) + " days"
		}

		const getLastShares = () => {
			const now = Date.now()
			//const url = `${window.location.protocol}//${window.location.hostname}:2001/getRecent`
			const url = "https://api.conroy.link/textshare"
			axios.get(`${url}/getRecent`)
				.then(response => {
					//console.log(response.data)
					response.data.reverse()
					for (let entry of response.data) {
						entry.timeString = calcAge((now - entry.created) / 1000)
					}

					this.recent = response.data
				})
				.catch(error => {
					console.log(error)
				})
		}
		getLastShares()
		setInterval(getLastShares, 60000)
	},
	mounted() {

	}
}
</script>

<style scoped lang="scss">
@import "~css/colors.scss";

.component {
	background: transparent;
}

.subtitle {
	margin-bottom: 1rem;
	color: $oc-gray-0;
}

.shareWrapper {
	background-color: $oc-gray-0;
	line-height: 1;
	padding: 0.5rem;
	box-shadow: 0px 4px 12px -2px rgba(0, 0, 0, 0.5);
	font-family: monospace;
	margin-bottom: 1rem;
	cursor: pointer;
}

.shareTitle {
	margin: 0 0 0.25rem;
	font-weight: bolder;
}

.shareContent {
	line-height: 1;
	font-size: 0.875rem;
}
</style>