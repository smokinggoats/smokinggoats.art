import type { NormalizedBy } from '$lib/index.types';

export type Reducer<K extends keyof T, T extends Record<any, any>> = (
	acc: NormalizedBy<K, T>,
	el: T,
	index: number,
	array: T[]
) => NormalizedBy<K, T>;

export function normalizeBy<K extends keyof T, T extends Record<any, any>>(
	indexer: K
): [Reducer<K, T>, NormalizedBy<K, T>] {
	return [
		(acc, el) => {
			const { byId, ids } = acc;
			const id = el[indexer] as T[K];
			return {
				ids: [...ids, id],
				byId: {
					...byId,
					[id]: el
				}
			};
		},
		{
			ids: [],
			byId: {}
		} as NormalizedBy<K, T>
	];
}
