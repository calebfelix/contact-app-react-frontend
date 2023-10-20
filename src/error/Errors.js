import { enqueueSnackbar } from "notistack";

export const MessageSuccess=(message)=>{
    enqueueSnackbar(message,{variant:"success"})
}

export const MessageError=(message)=>{
    enqueueSnackbar(message,{variant:"error"})
}

export const MessageWarning=(message)=>{
    enqueueSnackbar(message,{variant:"warning"})
}

export const MessageInfo=(message)=>{
    enqueueSnackbar(message,{variant:"info"})
}
