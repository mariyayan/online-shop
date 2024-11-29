function setMakeRequestToServer() {

    function validateFormData(e, reArr) {

        e.preventDefault();
        let form = e.target.closest('form');
        let inputs = form.querySelectorAll('input');

        let showedErrors = form.querySelectorAll('.show-element');
        let validationResult = true;
        showedErrors.length ? showedErrors.forEach(item => item.classList.remove('show-element')) : null;

        inputs.forEach((inputElement, index) => {
            if (!reArr[index].test(inputElement.value)) {
                let inputId = inputElement.getAttribute('id');
                form.querySelector(`.${inputId}-error`).classList.add('show-element');
                validationResult = false;
            }
        })
        return [validationResult, form];
    }

    function sendPOSTData(form, path) {
        return fetch(path, {
            method: 'POST',
            body: new FormData(form)
        })
    }


    function sendGETData(path) {
        return fetch(path);
    }

    function getPath(e, opt) {

        let path = e.target.closest('.clickable').getAttribute('id');
        if (opt) {
            let inputValue = e.currentTarget.querySelector('input').value;
            path = `${path}/${inputValue}`;
        }
        return path;
    }


    async function makeGetRequest(e, opt = false) {
        if (!e.target.closest('.clickable')) return;

        let path = getPath(e, opt);
        let serverResponce = await sendGETData(path);
        await processServerResponce(serverResponce);
    }

    async function makePostRequest(e) {

        let re = [/\w{3,10}/, /\w{5,15}/];
        let [resultOfValidation, form] = validateFormData(e, re);

        if (resultOfValidation) {

            let path = getPath(e);
            let serverResponce = await sendPOSTData(form, path);
            await processServerResponce(serverResponce);
        }
    }

    async function processServerResponce(responce) {

        let responceJSON = await responce.json();

        if (responceJSON.authenticated) {
            return location.reload(true);
        }
        if (responceJSON.authenticated === false) {
            return window.location.href = '/';
        }
        if (responceJSON.formError) {
            return showErrorFields(responceJSON.formError, responceJSON.errorType);
        }
        if (responceJSON.message) {
            return showMessage(responceJSON.message);
        }
        if (responceJSON.removed) {
            return removeElement(responceJSON.elementId);
        }
    }

    function showMessage(text) {
        let messageWindow = document.querySelector('#message-window');
        let messageText = messageWindow.querySelector('#message-text');
        messageText.textContent = text;
        messageWindow.classList.add('show-element');
        setTimeout(() => messageWindow.classList.remove('show-element'), 3000); 
    }

    function removeElement(elementId) {
        document.getElementById(elementId).remove();
    }

    function showErrorFields(text, errorType) {

        let errorField = document.querySelector(`#${errorType}-server-error`);
        errorField.textContent = text;
        errorField.classList.add('show-element');
    }
    return [makeGetRequest, makePostRequest];
}

export let [makeGetRequest, makePostRequest] = setMakeRequestToServer();