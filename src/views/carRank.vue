<template>
	<div id="hello">
		<el-container></el-container>
		<el-header class="header">
			<globalHeader></globalHeader>
		</el-header>
		<el-main id="app" style="background-color: white;width: 70%;margin-left: 15%">
			<rank></rank>
		</el-main>
	</div>
</template>

<script>
	import globalHeader from "../components/globalHeader"
	import rank from "@/components/rank";

	export default {
		name: "carRank",
		components: {
			globalHeader,
			rank
		}
	}
</script>

<style scoped>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #77bbff;
		width: 100%;
		height: 100%;
	}

	#hello {
		/* background-color: #f2f2f2; */
		background-image: url("../assets/What-lies-Beyond-200-Vertices2.jpeg");
		background-repeat: no-repeat;
		background-size: cover;
		margin-top: 0px;
		top: 0px;
		height: 100%;
		display: grid;
	}

	.header {
		margin: 0;
		padding: 0;
	}
</style>
