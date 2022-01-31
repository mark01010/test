import {ShowToastEvent} from "lightning/platformShowToastEvent";

const showErrorToast = (error) => {
    const evt = new ShowToastEvent({
        title: 'Toast Error',
        message: error.body.message,
        variant: 'error',
        mode: 'dismissable'
    });
    dispatchEvent(evt);
}
const showSuccessToast = () => {
    const evt = new ShowToastEvent({
        title: 'Success',
        message: 'Success',
        variant: 'success'
    });
    dispatchEvent(evt);
}

export {showErrorToast, showSuccessToast}