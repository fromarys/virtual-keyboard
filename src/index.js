import './styles/scss/style.scss';
import 'normalize.css';
import KEYS from './scripts/keys.js';
import Module from './scripts/module.js';

let textarea = document.querySelector('.textarea');
let keyboard = document.querySelector('.keyboard');

window.onload = () => {
    //Создает клавиатуру
    const module = new Module(KEYS);

    //Обрабатывает нажатие клавиши
    let computerKeyPressed = (event) => {
        event.preventDefault();
        const virtualKey = document.querySelector(`[data-key-code="${event.code}"]`);
        if (virtualKey) {
            if (event.type == 'keydown') textarea.value = module.insert(virtualKey, textarea.value);
            module.changeState(virtualKey, event.code, event.type);
        }
    };
//Обрабатывает клики мыши
    let mousePressed = (event) => {
        textarea.value = module.insert(event.target, textarea.value);
        module.changeState(event.target, event.target.dataset.keyCode, event.type);
    };

//Захватывает нажатие клавиш
    document.addEventListener('keydown', computerKeyPressed);
    document.addEventListener('keyup', computerKeyPressed);
    keyboard.addEventListener('mousedown', mousePressed);
    keyboard.addEventListener('mouseup', mousePressed);

};

