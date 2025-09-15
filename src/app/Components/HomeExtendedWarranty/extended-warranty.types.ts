export type WarrantyIcon = 'shield' | 'wrench' | 'star';

export interface WarrantyCard {
	id: string;
	title: string;
	description: string;
	icon: WarrantyIcon;
	href?: string;
}

export type { WarrantyCard as default };

