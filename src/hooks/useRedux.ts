import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { AppDispatch, PersistedRootState } from '../store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<PersistedRootState> = useSelector;
