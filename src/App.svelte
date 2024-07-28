<script lang="ts">
  import svelteLogo from './assets/svelte.svg'
  import viteLogo from '/vite.svg'
  import Color from './lib/Color/Color.svelte';
	import Colors from './lib/Colors/Colors.svelte';
</script>

<style>
  main {
    padding: 0;
    margin: 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    display: flex;
  }

  * {
    transition: all 100ms ease-in;
  }
</style>

<main>

  <Colors/>

</main>
