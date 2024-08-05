<script lang="ts">
	import { copy } from 'svelte-copy';
	import isContrastChecker from 'is-contrast-checker';
	import contast, { isAccessible, score } from 'get-contrast';
	// https://www.w3.org/TR/WCAG20/#visual-audio-contrast
	// https://webaim.org/resources/contrastchecker/

	let layer1 = '#000000ff';
	let layer2 = '#0052ccff';
	let layer3 = '#a3c8ffff';

	$: contrast1 = {
		ratio: contast.ratio(layer1, layer2).toFixed(2),
		score: contast.score(layer1, layer2),
		isAccessible: contast.score(layer1, layer2)
	};

	$: contrast2 = {
		ratio: contast.ratio(layer2, layer3).toFixed(2),
		score: contast.score(layer2, layer3),
		isAccessible: contast.score(layer2, layer3)
	};

	function refreshLayer1(event) {
		const clipboardData = event.clipboardData;
		const pastedData = clipboardData.getData('text');

		if (pastedData.split('')[0] != '#' && pastedData.length == 6) {
			layer1 = '#' + pastedData;
		} else {
			layer1 = pastedData;
		}
	}

	function refreshLayer2(event) {
		const clipboardData = event.clipboardData;
		const pastedData = clipboardData.getData('text');

		if (pastedData.split('')[0] != '#' && pastedData.length == 6) {
			layer2 = '#' + pastedData;
		} else {
			layer2 = pastedData;
		}
	}

	function refreshLayer3(event) {
		const clipboardData = event.clipboardData;
		const pastedData = clipboardData.getData('text');

		if (pastedData.split('')[0] != '#' && pastedData.length == 6) {
			layer3 = '#' + pastedData;
		} else {
			layer3 = pastedData;
		}
	}
</script>

<div class="contrast">
	<div class="contrast-test">
		<div class="pair">
			<div class="pair-data">
				<span class="label">Radio</span>
				<span class="value">{contrast1.ratio}</span>
			</div>
		</div>
		<div class="pair">
			<div class="pair-data">
				<span class="label">Radio</span>
				<span class="value">{contrast2.ratio}</span>
			</div>
		</div>
	</div>
	<div class="color-boxes">
		<div class="color-box">
			<div class="color-box-preview" style="background-color: {layer1};"></div>
			<input class="color-box-input" bind:value={layer1} readonly on:paste={refreshLayer1} />
		</div>

		<div class="color-box">
			<div class="color-box-preview" style="background-color: {layer2};"></div>
			<div class="color-box-info"></div>
			<input class="color-box-input" bind:value={layer2} readonly on:paste={refreshLayer2} />
		</div>

		<div class="color-box">
			<div class="color-box-preview" style="background-color: {layer3};"></div>
			<input class="color-box-input" bind:value={layer3} readonly on:paste={refreshLayer3} />
		</div>
	</div>
</div>

<style lang="scss">
	@import './styles.scss';
</style>
