import type store from "../redux/store";
import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";

//rootState tipini tanımla (Storun tipi use Selector da kullanılacak.)
export type RootState = ReturnType<typeof store.getState>;

export const useAppSelector : TypedUseSelectorHook<RootState> = useSelector;

//AppDispatch tipini tanımla (useDispatch hooku için kullanılacak.)
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();