import { useDispatch } from 'react-redux';
import {AppDispatchType} from "../../state/store";

export const useAppDispatch: () => AppDispatchType = useDispatch;
