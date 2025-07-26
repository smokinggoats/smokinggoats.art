export type BasePost = {
	id: number;
	status: string;
	date_created: string;
	date_updated: string;
	title: string;
};

export type PoopPost = BasePost & {
	description?: string;
	tags?: string[];
	content?: string;
	image?: string;
};

export type PoopPostDetails = BasePost & {
	description?: string;
	tags?: string[];
	content?: string;
	image?: PostImage;
};

export type PostImage = {
	id: string;
	storage: string;
	filename_disk: string;
	filename_download: string;
	title: string;
	type: string;
	folder?: string | number | string[];
	uploaded_by: string;
	uploaded_on: string;
	modified_by?: string | number | string[];
	modified_on: string;
	charset?: string | number | string[];
	filesize: number;
	width: number;
	height: number;
	duration?: string | number | string[];
	embed?: string | number | string[];
	description?: string | number | string[];
	location?: string | number | string[];
	tags?: string | number | string[];
	metadata?: {};
	focal_point_x?: string | number | string[];
	focal_point_y?: string | number | string[];
};

export type TextPost = BasePost & {
	tags?: string[];
	content?: string;
	header?: string;
};

export type TextPostDetails = BasePost & {
	tags?: string[];
	content?: string;
	header?: PostImage;
};
