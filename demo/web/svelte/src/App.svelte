<script>
	import ReactAdapter from "./utils/ReactAdapter.svelte";
	
	// react mui components
	import Button from "@material-ui/core/Button";
	import Divider from '@material-ui/core/Divider';

	// JSON Schema Form
	// import Form from "../../../../src/framework";
  </script>
  
  <main>
	<h1>React inside Svelte</h1>
	<h2>with React Material UI!</h2>
	
	<ReactAdapter 
	  el={Divider} 
	  variant="middle" 
	  class={"mui-divider"}
	/>
	
	<h3>A MUI React Button</h3>
	<ReactAdapter
	  el={Button}
	  class="mui-btn"
	  children="Say Hello"
	  variant="contained"
	  color="primary"
	  onClick={() => alert("Hello Fella!")}
	/>
  
	<h3>Simple Badge</h3>
	<!-- <ReactAdapter el={Form} badgeContent={4} color="primary" /> -->
  
  </main>
  
  <style>
	/**
	 * Styling a React Component using Svelte styles.
	 */
	:global(.mui-btn) {
	  margin: 20px;
	}
	:global(.mui-divider) {
	  margin-bottom: 20px;
	}
	/* ----------------------------------------------- */
	main {
	  text-align: center;
	  padding: 1em;
	  max-width: 240px;
	  margin: 0 auto;
	  margin-top: 20px;
	}
	h1,
	h2, 
	h3 {
	  color: #ff3e00;
	  text-transform: uppercase;
	  font-size: 4em;
	  font-weight: 100;
	  margin: 0;
	  line-height: 3.5rem;
	}
	h2 {
	  font-size: 2em;
	  margin-bottom: 30px;
	}
	h3 {
	  font-size: 1em;
	  font-weight: 300;
	  color: #8800ff;
	  margin-top: 30px;
	}
	@media (min-width: 640px) {
	  main {
		max-width: 800px;
	  }
	}
  </style>
