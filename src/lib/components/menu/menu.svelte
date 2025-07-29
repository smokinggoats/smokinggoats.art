<script lang="ts">
	import { page } from '$app/state';
	import { ROUTES, menu, type Route } from '$lib/utils/constants';
	import Icon from '@iconify/svelte';

	let selected: string = $state(page.route.id || '');

	function updateSelected(index: string | null) {
		selected = index || page.route.id || '';
	}

	function isSelected(item: Route) {
		return item.path !== ROUTES.home() && selected.startsWith(item.path);
	}
</script>

<div class="menu">
	<a href={ROUTES.home()} class="menu__logo" onclick={() => updateSelected(ROUTES.home())}>
		<img class="menu__logo__img" src="/logo.png?url" alt="logo" />
	</a>
	<nav class="menu__items">
		{#each menu as item}
			<a
				class="menu__items__item"
				class:menu__items__item--selected={isSelected(item)}
				onclick={() => updateSelected(item.path)}
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
	:root {
		--bg-purple: rgb(128, 0, 128);
		--bg-purple-text: #fff;
		--bg-pink: rgb(255, 192, 203);
		--bg-pink-text: #333;
		--bg-black: #222;
		--text-grey: #666;
	}
	$boxShadow:
		var(--bg-purple) 0px 0px 5px 0px,
		var(--bg-pink) 0px 0px 1px 0px;
	.menu {
		z-index: 2016;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		max-width: 100vw;
		height: 4rem;
		background-color: var(--bg-black);
		display: inline-flex;
		justify-content: space-between;
		align-items: center;
		box-shadow: $boxShadow;
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
				color: var(--text-grey);
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
				box-shadow: $boxShadow;
				transition: all 0.4s ease;
				&:hover {
					color: var(--bg-purple-text);
					background-color: var(--bg-purple);
					box-shadow: var(--bg-pink) -10px 0px -10px 0px;
				}
				&--selected {
					background: var(--bg-pink);
					color: var(--bg-pink-text);
				}
			}
		}
	}
</style>
