import './styles/scss/style.scss';
import 'normalize.css';
import KEYS from './scripts/keys.js';
import Module from './scripts/module.js';

window.onload = () => {
    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');
    document.body.append(wrapper);

    const title = document.createElement('h1');
    title.classList.add('title');
    title.innerHTML = 'Virtual Keyboard';
    wrapper.append(title);

    const textarea = document.createElement('textarea');
    textarea.classList.add('textarea');
    wrapper.append(textarea);

    const keyboard = document.createElement('div');
    keyboard.classList.add('keyboard');
    wrapper.append(keyboard);

    const readme = document.createElement('p');
    readme.classList.add('readme');
    readme.innerHTML = 'Сменить раскладку клавиатуры можно нажатием клавиш <strong>Ctrl</strong> + <strong>Shift</strong>';
    wrapper.append(readme);

//Создает клавиатуру
    const module = new Module(KEYS);

//Обрабатывает нажатие клавиши
    let computerKeyPressed = (event) => {
        event.preventDefault();
        let s = module.selection();
        const virtualKey = document.querySelector(`[data-key-code="${event.code}"]`);
        if (virtualKey) {
            if (event.type == 'keydown') {
                textarea.value = module.insert(virtualKey, textarea.value);
                if(event.code == 'Delete') {
                    textarea.setSelectionRange(s, s);
                }
                if (event.code == 'Backspace') {
                    textarea.setSelectionRange(s-1, s-1);
                }
            }
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

