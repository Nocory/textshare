<template>
	<div class="component">
		<div class="container">
			<p>
				Lorem ipsum dolor sit amet.
			</p>
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
	background: $oc-gray-0;
}
</style>