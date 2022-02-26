<script>
	// JSON Schema Form
	import Form from "../../../../src/universal-schema/json/generated-svelte/Form.svelte";

	// Schema
	import NumbersSchema from '../../../examples/numbers';
</script>

<style>
	h1, figure, p {
		text-align: center;
		margin: 0 auto;
	}

	h1 {
		font-size: 2.2em;
		text-transform: uppercase;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}

	figure {
		margin: 0 0 1em 0;
	}

	img {
		width: 100%;
		max-width: 400px;
		margin: 0 0 1em 0;
	}

	p {
		margin: 1em auto;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 3em;
		}
	}
</style>

<svelte:head>
	<title>Svelte JSON Schema Form</title>
	<!-- Fonts -->
	<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,600,700">
		
	<!-- Material Typography -->
	<link rel="stylesheet" href="https://unpkg.com/@material/typography@13.0.0/dist/mdc.typography.css" />
		
	<!-- SMUI -->
	<link rel="stylesheet" href="https://unpkg.com/svelte-material-ui/bare.css" />
</svelte:head>

<h1>Svelte JSON Schema Form</h1>
<Form 
	schema={NumbersSchema.schema}
	uiSchema={NumbersSchema.uiSchema}
	formData={NumbersSchema.formData}
/>
