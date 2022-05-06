import './styles/scss/style.scss';
import 'normalize.css';
import KEYS from './scripts/keys.js';
import Module from './scripts/module.js';



window.onload = () => {
    const key = new Module(KEYS);

    let computerKeyPressed = (event) => {
        event.preventDefault();
        const virtualKey = document.querySelector(`[data-key-code="${event.code}"]`);
        if (virtualKey) {
            console.log(event.code)
        }
    }
    document.addEventListener('keydown', computerKeyPressed);
    document.addEventListener('keyup', computerKeyPressed);
}

