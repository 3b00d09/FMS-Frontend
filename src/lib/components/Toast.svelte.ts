import { getContext, setContext } from "svelte"

type Status = "error" | "success"

interface ToastState{
    isActive: boolean,
    message: string,
    status: Status
    triggerToast:(message: string, status: Status, time: number) => void
}

export class ToastStateClass implements ToastState{
    isActive = $state(false)
    message = $state("")
    status = $state<Status>("success")    
    

    triggerToast = (message: string, status: Status, time: number) =>{
        this.isActive = true
        this.message = message;
        this.status = status

        setTimeout(() => {
            this.isActive = false;
        }, time);
    }
}


const DEFAULT_KEY = '$_toast_state';

export const getToastState = (key = DEFAULT_KEY) => {
	return getContext<ToastState>(key);
};

export const setToastState = (key = DEFAULT_KEY) => {
	const toastState = new ToastStateClass();
	return setContext(key, toastState);
};