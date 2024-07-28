<script lang="ts">
	import { copy } from 'svelte-copy';
	import toast, { Toaster } from 'svelte-french-toast';
	import { HSLAToRGBA, RGBAToHexA, getColorValues } from "./Converter";

	export let engineerColor:string;
	export let engineerColorValue:string;

</script>

<style lang="scss">
@import "./styles.scss"
</style>

<div class="color">
	  <div class="color-preview" style="background-color: {engineerColorValue};"></div>
	  <div class="color-engineer-name">
		{engineerColor}
	  </div>

	  <div class="color-values">
		<div class="hsla">
			<span class="mini-preview"></span>
			{getColorValues(engineerColorValue).hsla}
			<span 
				class="copy"
				use:copy={getColorValues(engineerColorValue).hsla}>
				copy
			</span>
		</div>
		<div class="rgba">
			{getColorValues(engineerColorValue).rgba}
			<span 
				class="copy"
				use:copy={getColorValues(engineerColorValue).rgba}>
				copy
			</span>
		</div>
		<div class="hex">
			{getColorValues(engineerColorValue).hexa}
			<span 
				class="copy" 
				use:copy={getColorValues(engineerColorValue).hexa}>
				copy
			</span>
		</div>
	  </div>
	</div>