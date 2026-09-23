import { AUTH_BACKGROUND_IMAGES, fields, genderItemsList, ITEM_HEIGHT, ITEM_PADDING_TOP, MenuProps } from './rawData';
import { translations } from '@/translations';

const t = translations.fr;

describe('items lists', () => {
	it('keeps auth illustration and form settings available', () => {
		expect(AUTH_BACKGROUND_IMAGES).toHaveLength(4);
		expect(AUTH_BACKGROUND_IMAGES.map(({ color }) => color)).toEqual(['#E8F5E9', '#FFF3E0', '#E3F2FD', '#F3E5F5']);
		expect(fields).toEqual(['one', 'two', 'three', 'four', 'five', 'six']);
		expect(MenuProps.slotProps.paper.style.maxHeight).toBe(ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP);
	});

	describe('genderItemsList', () => {
		it('has two entries with correct codes and values', () => {
			const items = genderItemsList(t);
			expect(items).toHaveLength(2);

			expect(items[0]).toEqual({ code: 'H', value: t.rawData.genders.male });
			expect(items[1]).toEqual({ code: 'F', value: t.rawData.genders.female });

			const codes = items.map((i) => i.code);
			expect(codes).toEqual(['H', 'F']);

			const values = items.map((i) => i.value);
			expect(values).toEqual([t.rawData.genders.male, t.rawData.genders.female]);
		});

		it('contains unique codes', () => {
			const codes = genderItemsList(t).map((i) => i.code);
			const unique = Array.from(new Set(codes));
			expect(unique).toHaveLength(codes.length);
		});
	});
});
