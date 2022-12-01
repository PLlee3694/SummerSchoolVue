<template>
	<div class="background">
		<el-container></el-container>
		<el-header class="header">
			<globalHeader></globalHeader>
		</el-header>
		<el-main style="background-color: white;width: 70%;margin-left: 15%">
			<manu></manu>
		</el-main>
	</div>
</template>

<script>
	import globalHeader from "@/components/globalHeader";
	import manu from "@/components/ranks/manu"

	export default {
		components: {
			globalHeader,
			manu
		},
		name: "carManu"
	}
</script>

<style scoped>
	.header {
		margin: 0;
		padding: 0;
	}

	.background {
		/* background-color: #f2f2f2; */
		background-image: url("~@/assets/What-lies-Beyond-200-Vertices2.jpeg");
		background-repeat: no-repeat;
		background-size: cover;
		margin-top: 0px;
		top: 0px;
		height: 100%;
		display: grid;
	}
</style>
