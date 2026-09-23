import type { AccountGenderCodeValueType, PasswordResetCodeField } from '@/types/accountTypes';
import type { TranslationDictionary } from '@/types/languageTypes';
import type { AuthBackground } from '@/types/authTypes';
import CalendarSVG from '../../public/assets/images/auth_illu/calendar.svg';
import KeySVG from '../../public/assets/images/auth_illu/key.svg';
import BuildingSVG from '../../public/assets/images/auth_illu/building.svg';
import LuggageSVG from '../../public/assets/images/auth_illu/luggage.svg';

export const AUTH_BACKGROUND_IMAGES: AuthBackground[] = [
	{ image: CalendarSVG.src, color: '#E8F5E9' },
	{ image: KeySVG.src, color: '#FFF3E0' },
	{ image: BuildingSVG.src, color: '#E3F2FD' },
	{ image: LuggageSVG.src, color: '#F3E5F5' },
];

export const fields: PasswordResetCodeField[] = ['one', 'two', 'three', 'four', 'five', 'six'];

export const ITEM_HEIGHT = 48;
export const ITEM_PADDING_TOP = 8;
export const MenuProps = {
	slotProps: {
		paper: {
			style: {
				maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
				width: 250,
			},
		},
	},
};

export const genderItemsList = (t: TranslationDictionary): Array<AccountGenderCodeValueType> => [
	{ code: 'H', value: t.rawData.genders.male },
	{ code: 'F', value: t.rawData.genders.female },
];
