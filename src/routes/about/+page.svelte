<script lang="ts">
	import Icon from '@iconify/svelte';
</script>

<div class="page">
	<div class="page__links">
		<a class="page__links__link" href="https://linktr.ee/smoking.goats" target="_blank">
			<Icon class="page__links__link__icon" icon="solar:suitcase-tag-line-duotone" />
			<span class="page__links__link__text">Smoking Goats</span>
		</a>
	</div>
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

	.page {
		padding: 1rem 1rem 4rem 1rem;
		box-sizing: border-box;
		overflow: auto;
		height: 100%;
		&__links {
			margin: 2rem 0;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		&__links {
			&__link {
				display: flex;
				align-items: center;
				justify-content: space-around;
				cursor: pointer;
				margin: 0;
				border: none;
				padding: 1rem 2rem;
				border-radius: 10rem;
				box-shadow:
					var(--bg-purple) 0px 0px 5px 0px,
					var(--bg-pink) 0px 0px 5px 0px;
				font-size: 2rem;
				text-align: center;
				text-decoration: none;
				transition: all 0.3s ease;
				color: #fff;
				background-color: #222;
				&__text {
					margin: 0.5rem;
				}
				&:hover,
				&:focus {
					background-color: #ffffff;
					color: #333;
					transform: scale(1.1);
					box-shadow:
						var(--bg-purple) 0px 5px,
						var(--bg-pink) 0px 10px;
				}
			}
		}
	}
</style>
