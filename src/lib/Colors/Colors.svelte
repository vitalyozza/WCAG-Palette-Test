<script lang="ts">
	import { readable } from "svelte/store";
	import Color from "../Color/Color.svelte";
	import ColorBox from "../ColorBox/ColorBox.svelte";
	import palette from "./../../sources/palette.json5";
	import { createTable } from "svelte-headless-table";
	

	let Palette = palette.palette

</script>

<section class="boxes">
	<ColorBox/>
</section>

<section class="colors">

	{#each Object.entries(Palette) as [colorName, colorValues]}
    <h2>{colorName}</h2>
      {#each Object.entries(colorValues) as [variant, color]}
	  	<Color 
			engineerColor='{colorName}-{variant}'
			engineerColorValue={color.value}
		/>
      {/each}
  	{/each}
</section>

<style lang="scss">
	.colors {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		height: 100vh;
		overflow: scroll;

		h2 {
			margin-left: 16px;
		}
	}

	.boxes {
		display: flex;
		flex-grow: 0;
		height: 100vh;
		background-color: #fff;
	}
</style>