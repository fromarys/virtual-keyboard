import './styles/scss/style.scss';
import 'normalize.css';
import KEYS from './scripts/keys.js';
import Module from './scripts/module.js';

let textarea = document.querySelector('.textarea');

window.onload = () => {
    //Создает клавиатуру
    const module = new Module(KEYS);

    //Обрабатывает нажатие клавиши
    let computerKeyPressed = (event) => {
        event.preventDefault();
        const virtualKey = document.querySelector(`[data-key-code="${event.code}"]`);
        console.log(virtualKey)
        if (virtualKey) {
            // console.log(virtualKey);//Возвращает элемент в DOM для нажатой клавиши
            // console.log(event.code);
            if (event.type == 'keydown') textarea.value = module.insert(virtualKey, textarea.value);
            module.press(event.code, event.type);
        }
    };

    //Захватывает нажатие клавиш
    document.addEventListener('keydown', computerKeyPressed);
    document.addEventListener('keyup', computerKeyPressed);

};

