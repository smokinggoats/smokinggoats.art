import type { NormalizedBy } from '$lib/index.types';

export type Reducer<K extends keyof T, T extends Record<any, any>, P extends Record<any, any>> = (
	acc: NormalizedBy<K, P>,
	el: T,
	index: number,
	array: T[]
) => NormalizedBy<K, P>;

export function normalizeBy<
	K extends keyof P,
	T extends Record<any, any>,
	P extends Record<any, any> = T
>(indexer: K, parser?: (t: T) => P): [Reducer<K, T, P>, NormalizedBy<K, P>] {
	return [
		(acc, el) => {
			const { byId, ids } = acc;
			const id = el[indexer] as T[K];
			if (!id) return acc;
			const updatedEl = parser ? parser(el) : el;
			return {
				ids: [...ids, id],
				byId: {
					...byId,
					[id]: updatedEl
				}
			};
		},
		{
			ids: [],
			byId: {}
		} as NormalizedBy<K, P>
	];
}
