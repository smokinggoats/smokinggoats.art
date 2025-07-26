export type NormalizedBy<K extends keyof T, T extends Record<any, any>> = {
	ids: T[K][];
	byId: Record<any, T>;
};
