methods: {
	fetchData() {
		axios.get(`https://api.example.org/textshare/getSpecific/${this.id}`)
			.then(response => {
				this.title = response.data.title || "a share with this ID does not exist"
				this.content = response.data.content
				this.link = location.href
			})
			.catch(error => {
				console.log(error)
			})
	}
}