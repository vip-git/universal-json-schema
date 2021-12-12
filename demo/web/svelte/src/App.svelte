<TopAppBar variant="static">
	<Row>
		<Section>
			<Icon component={Img} style="height: 48px; width: 48px;" src="https://raw.githubusercontent.com/hperrin/svelte-material-ui/master/packages/site/static/logo.png" />
			<Title>Svelte Material UI in a REPL</Title>
		</Section>
	</Row>
</TopAppBar>

{#if !showCard}
	<p class="mdc-typography--body1">
		What's your name?
	</p>
	<Textfield label="Name" bind:value={name} on:keypress={event => showCard = event.key === 'Enter'} />
	<Button on:click={() => showCard = true}>
		Submit
	</Button>
{:else}
	<Card style="width: 360px; margin: 2em auto;">
		<Content class="mdc-typography--body2">
			<h2 class="mdc-typography--headline6" style="margin: 0;">
				Hello, {name}
			</h2>
			<h3 class="mdc-typography--subtitle2" style="margin: 0 0 10px; color: #888;">
				How do you like my Svelte REPL with SMUI components?
			</h3>

			It's a pretty cool feature to be able to quickly test out a design with Material
			UI in the Svelte REPL. Wanna learn more about SMUI?
		</Content>
		<Actions>
			<Button href="https://github.com/hperrin/svelte-material-ui" target="_blank" style="text-decoration: none;">
				<Label>GitHub Repo</Label>
			</Button>
			<Button href="https://sveltematerialui.com/" target="_blank" style="text-decoration: none;">
				<Label>Website</Label>
			</Button>
		</Actions>
	</Card>
{/if}

<script>
  	import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';
	import Button from '@smui/button';
	import Card, { Content, Actions } from '@smui/card';
	import Textfield from '@smui/textfield';
	import { Label, Icon } from '@smui/common';
	import { Img } from '@smui/common/elements';
	
	let name = '';
	let showCard = false;
</script>

<svelte:head>
	<!-- Fonts -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,600,700">
	
  <!-- Material Typography -->
	<link rel="stylesheet" href="https://unpkg.com/@material/typography@13.0.0/dist/mdc.typography.css" />
	
	<!-- SMUI -->
	<link rel="stylesheet" href="https://unpkg.com/svelte-material-ui/bare.css" />
</svelte:head>