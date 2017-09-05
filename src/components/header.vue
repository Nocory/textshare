<template>
	<div class="component">
		<div class="container">
			<div class="title is-2">
				TextShare
				<div class="underline"></div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			msg: "Message from data"
		}
	},
	methods: {

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
	padding: 1rem 0.5rem;
	background: transparent;
}

.title {
	color: $oc-gray-0;
}

.underline {
	display: block;
	position: absolute;
	bottom: 0;
	height: 2px;
	width: 100%;
	background-color: $oc-gray-6;
}
</style>