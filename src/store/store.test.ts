import { jest } from '@jest/globals';
import type { Middleware } from '@reduxjs/toolkit';
import type { SagaStore, RootState, AppDispatch } from './store';

jest.mock('@/store/slices/_initSlice', () => ({
	__esModule: true,
	default: (state = { init: true }) => state,
}));
jest.mock('@/store/slices/accountSlice', () => ({
	__esModule: true,
	default: (state = { account: true }) => state,
}));

function makeApiMock(name: string) {
	const dummyMiddleware: Middleware = () => (next) => (action) => next(action);
	return {
		reducerPath: name,
		reducer: (state = {}) => state,
		middleware: dummyMiddleware,
	};
}

jest.mock('@/store/services/account', () => ({
	__esModule: true,
	accountApi: makeApiMock('accountApi'),
	profilApi: makeApiMock('profilApi'),
	usersApi: makeApiMock('usersApi'),
}));

// --- Mock rootSaga only (use a lightweight generator) ---
jest.mock('@/store/sagas', () => ({
	__esModule: true,
	rootSaga: function* rootSaga() {
		// no-op for store wiring tests
	},
}));

// --- Import fresh store per test so mocks apply ---
let store: SagaStore;

beforeEach(() => {
	jest.resetModules();
	// eslint-disable-next-line @typescript-eslint/no-require-imports
	store = require('./store').store as SagaStore;
});

describe('Redux Saga Store', () => {
	it('creates store with expected reducers', () => {
		const state: RootState = store.getState();
		expect(state).toHaveProperty('_init');
		expect(state).toHaveProperty('account');
		expect(state).toHaveProperty('accountApi');
		expect(state).toHaveProperty('profilApi');
		expect(state).toHaveProperty('usersApi');
	});

	it('attaches sagaTask after running rootSaga', () => {
		expect(store.sagaTask).toBeDefined();
		expect(typeof store.sagaTask?.isRunning).toBe('function');
	});

	it('dispatch works with thunk actions', async () => {
		const thunkAction = (): ((dispatch: AppDispatch) => Promise<void>) => {
			return async (dispatch) => {
				dispatch({ type: 'TEST_ACTION' });
			};
		};

		const dispatch: AppDispatch = store.dispatch;
		await dispatch(thunkAction());
		const result = dispatch({ type: 'CHECK' });
		expect(result).toEqual({ type: 'CHECK' });
	});

	it('dispatches plain actions correctly', () => {
		const action = { type: 'PLAIN_ACTION' };
		const result = store.dispatch(action);
		expect(result).toEqual(action);
	});
});
