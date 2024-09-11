<script lang="ts">
	import { page } from '$app/stores';
	import { ROUTES, menu } from '$lib/utils/constants';
	import Icon from '@iconify/svelte';
	let selected: string = $page.route.id || '';
	function updateSelected(index: string | null) {
		selected = index || $page.route.id || '';
	}
</script>

<div class="menu">
	<a href={ROUTES.home()} class="menu__logo" on:click={() => updateSelected(ROUTES.home())}>
		<img class="menu__logo__img" src="http://placekitten.com/300/300" alt="logo" />
	</a>
	<nav class="menu__items">
		{#each menu as item}
			<a
				class="menu__items__item"
				class:menu__items__item--selected={item.path !== ROUTES.home() &&
					selected.startsWith(item.path)}
				on:click={() => updateSelected(item.path)}
				href={item.path}
			>
				{#if item.icon}
					<Icon icon={item.icon} width="2rem" />
				{:else}
					{item.name}
				{/if}
			</a>
		{/each}
	</nav>
</div>

<style lang="scss">
	.menu {
		z-index: 100;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		max-width: 100vw;
		height: 4rem;
		background-color: #222;
		display: inline-flex;
		justify-content: space-between;
		align-items: center;
		box-shadow:
			rgb(128, 0, 128) 0px 0px 5px 0px,
			rgb(255, 192, 203) 0px 0px 1px 0px;
		&__logo {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 4rem;
			height: 100%;
			padding: 0.5rem;
			box-sizing: border-box;
			overflow: hidden;
			text-decoration: none;
			&__img {
				border-radius: 50%;
				width: 100%;
				height: 100%;
				max-width: 100%;
				max-height: 100%;
			}
		}
		&__items {
			width: 100%;

			display: flex;
			justify-content: flex-end;
			margin: auto;
			&__item {
				color: #666;
				display: flex;
				align-items: center;
				justify-content: center;
				margin: 0 1rem;
				padding: 0.5rem;
				border-radius: 2rem;
				width: 4rem;
				line-height: 160%;
				transition: all 0.1s ease-in-out;
				text-decoration: none;
				text-transform: uppercase;
				font-size: 0.8em;
				box-shadow:
					rgb(128, 0, 128) 0px 0px 5px 0px,
					rgb(255, 192, 203) 0px 0px 5px 0px;
				transition: all 0.4s ease;
				&:hover {
					color: #fff;
					background-color: rgb(128, 0, 128);
					box-shadow: rgb(255, 192, 203) -10px 0px -10px 0px;
				}
				&--selected {
					background: rgb(255, 192, 203);
					color: #333;
				}
			}
		}
	}
</style>
