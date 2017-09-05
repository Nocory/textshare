<template>
	<div class="component">
		<div class="subtitle is-6">
			New Share:
		</div>
		<div class="controls">
			<input class="shareTitle" placeholder="Enter Title" v-model="title">
			<select class="shareTime" v-model.number="saveLength">
				<option value=600000>10 minutes</option>
				<option value=3600000>1 hour</option>
				<option value=86400000>1 day</option>
				<option value=604800000>1 week</option>
				<option value=0>forever</option>
			</select>
			<select class="isPublic" v-model.number="isPublic">
				<option value=1>Public</option>
				<option value=0>Private</option>
			</select>
			<button class="button saveButton" @click="save">Save</button>
		</div>
		<textarea placeholder="Enter Text" class="shareContent" v-model="content" maxlength="10240"></textarea>
	</div>
</template>

<script>
import axios from "axios"
export default {
	data() {
		return {
			title: "",
			content: "",
			isPublic: 1,
			saveLength: 600000,
		}
	},
	methods: {
		save() {
			const url = "https://api.conroy.link/textshare"
			axios.post(`${url}/save`, {
				title: this.title,
				content: this.content,
				saveLength: this.saveLength,
				isPublic: this.isPublic,
			})
				.then(response => {
					console.log(response);
					if (response.data) {
						this.$router.push({ path: `/view/${response.data}` })
					}
				})
				.catch(error => {
					console.log(error)
				})
		}
	},
	created() {

	},
	mounted() {

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

.subtitle {
	margin: 0;
	color: $oc-gray-0;
}

.shareContent {
	padding: 0.5em;
	width: 100%;
	height: 67vh;
	min-height: 384px;

	box-shadow: 0px 4px 12px -2px rgba(0, 0, 0, 0.5);
	border: 0px;

	font-family: monospace;
	resize: none;

	background-color: $oc-gray-0;
	color: $oc-gray-7;
}

.controls {
	display: flex;
	justify-content: flex-start;
	align-items: center;
	width: 100%;
	padding: 0.5rem 0;
}

.controls>* {
	margin-right: 1rem;
}

.shareTitle {
	box-shadow: 0px 4px 12px -2px rgba(0, 0, 0, 0.5);
	border: 0px;
	font-family: monospace;
	padding: 0.5em;
	width: 25%;
	min-width: 128px;
	flex-grow: 1;
}

.shareTime {
	box-shadow: 0px 4px 12px -2px rgba(0, 0, 0, 0.5);
	border: 0px;
	font-family: monospace;
	padding: 0.5em;
}

.isPublic {
	box-shadow: 0px 4px 12px -2px rgba(0, 0, 0, 0.5);
	border: 0px;
	font-family: monospace;
	padding: 0.5em;
}

.saveButton {
	//border-radius: 2px;
	margin: 0 !important;
	min-width: 128px;
	background-color: $oc-green-7;
	color: $oc-gray-0;
	box-shadow: 0px 4px 12px -2px rgba(0, 0, 0, 0.5);
	border: none;
}
</style>