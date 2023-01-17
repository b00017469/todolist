import {Dispatch} from 'redux';
import {ResponseType} from "../../api/todolistsAPI";
import {setError, setStatus} from "../../state/app-reducer";
import {AppActions} from "../../state/store";

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: Dispatch<AppActions>) => {
    if (data.messages.length) {
        dispatch(setError(data.messages[0]))
    } else {
        dispatch(setError('Some error occurred'))
    }
    dispatch(setStatus('failed'))
}

export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch<AppActions>) => {
    dispatch(setError(error.message))
    dispatch(setStatus('failed'))
}
