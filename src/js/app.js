import geolocationEnter from "./geolocationEnter";

export default class MessageClass {
    constructor() {
        this.messageArea = document.querySelector('.message-area');
    }

    init() {
        this.inputListener();
    }

    async navigator() {
        if (navigator.geolocation) {
            try {
                const data = await new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true });
                });
                const { latitude, longitude } = data.coords;
                this.latitude = latitude;
                this.longitude = longitude;
            } catch (err) {
                this.navigatorError();
                console.log(err);
            }
        }
    }

    navigatorError() {
        const modal = document.createElement('div');
        modal.className = 'modal';

        const modalText = document.createElement('div');
        modalText.innerHTML = `Что-то пошло не так! </br></br> К сожалению, нам не удалось определить ваше местоположение. Пожалуйста, дайте разрешение на использование геолокации или введите координаты вручную. </br></br> Широта и долгота через запятую.`;
        modalText.className = 'modalText';

        const modalInput = document.createElement('input');
        modalInput.className = 'modalInput';

        const modalOkBtn = document.createElement('button');
        modalOkBtn.textContent = 'OK';
        modalOkBtn.className = 'modalBtn';

        const modalCancelBtn = document.createElement('button');
        modalCancelBtn.textContent = 'Отменить'
        modalCancelBtn.className = 'modalBtn';

        modal.append(modalText);
        modal.append(modalInput);
        modal.append(modalOkBtn);
        modal.append(modalCancelBtn);
        document.body.append(modal);

        modalOkBtn.addEventListener('click', () => {
            const result = geolocationEnter(modalInput.value);
            this.latitude = result.latitude;
            this.longitude = result.longitude;

            modal.classList.add('hidden');
        })

        modalCancelBtn.addEventListener('click', () => {
            modal.classList.add('hidden');
        })
    }

    inputListener() {
        const inputArea = document.querySelector('.input-area');

        inputArea.addEventListener('keyup', (e) => {
            if (e.keyCode === 13) {
                this.addMessage(inputArea.value);
                inputArea.value = '';
            }
        })
    }

    async addMessage(text) {
        if (this.latitude === undefined || this.longitude === undefined) {
            await this.navigator();
            return;
        }
        const messageContainer = document.createElement('div');
        messageContainer.className = 'messageContainer';

        const message = document.createElement('div');
        message.textContent = text;

        const geolocationData = document.createElement('div');
        geolocationData.textContent = `[${this.latitude}, ${this.longitude}]`;
        geolocationData.className = 'geolocationText';

        messageContainer.append(message);
        messageContainer.append(geolocationData);
        this.messageArea.prepend(messageContainer);
    }


}

const messageClass = new MessageClass();

messageClass.init();