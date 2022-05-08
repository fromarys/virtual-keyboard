const html = document.querySelector('html');
const keyboard = document.querySelector('.keyboard');
const textarea = document.querySelector('.textarea');

export default class {
    constructor(keys) {
      this.language = this.checkLang();
        this.keys = keys;
        this.createKeyboard();
        this.shiftPressed = false;
        this.capslockPressed = false;
        this.ctrlPressed = false;
      }
//Выполняет проверку языка
      checkLang() {
        let currentLang = localStorage.getItem('language');
        if(!currentLang) {
          currentLang = 'en';
        } 
        return currentLang;
      }
//Создает клавиши
      createKeyboard() {
        let createRow;
        this.keys.forEach((elem) => {
          if (createRow !== elem.row) {
            const row = document.createElement('div');
            row.classList.add('keyboard__row');
            keyboard.append(row);
            createRow = elem.row;
          }
          const button = document.createElement('div');
          button.classList.add('keyboard__button');
          button.dataset.keyCode = elem.code;
          button.innerHTML = elem.system ? elem.name : elem[this.language];
          document.querySelectorAll('.keyboard__row')[createRow].append(button);
          if (elem.classes) button.classList = elem.classes;
        });
      }
//Находит код кнопки в массиве объектов
      buttonInfo(btn) {
       return this.keys.filter(e => e.code == btn.dataset.keyCode)[0];
      }


//Вводит текст в textarea
      insert(btn, text) {
        let info = this.buttonInfo(btn);
        let value = text;
        if (info == undefined) return value;
        if(info.system) {
          switch(info.code) {
            case 'Backspace' :
              value = value.slice(0, -1); break;
            case 'Delete' :
              let arr;
              arr = value.split('');
              arr.splice(textarea.selectionStart, 1);
              value = arr.join('');
              this.setSelection(textarea.selectionStart, 5);
              break;
            case 'Tab' :
              value += '\t'; break;
            case 'Enter' :
              value += '\n'; break;
            case 'Space' :
              value += ' '; break;
            default :
            value = value;
          }
        } else {
          if(this.shiftPressed || this.capslockPressed) {
            value = value + info[`${this.language}Shift`];
          } else {
            value += info[this.language];
          }
        }
        return value;
      }

  //Обрабатывает зажатие клавиш shift и capslock
      press(code, event) {
        if (code == 'ShiftLeft' || code == 'ShiftRight') {
          switch (event) {
            case 'keydown' :
              this.shiftPressed = true; break;
            case 'keyup' :
              this.shiftPressed = false; break;
          }
        }
        if(code == 'CapsLock') {
          if(event == 'keydown' || event == 'mousedown') {
            this.capslockPressed = !this.capslockPressed;
          }
        }
        if(code == 'ControlLeft' || code == 'ControlRight') {
          switch (event) {
            case 'keydown' :
              this.ctrlPressed = true; break;
            case 'keyup' :
              this.ctrlPressed = false; break;
          }
        }
      }
//Подсвечивает клавиши при нажатии
      highlight(key, code, event) {
        if (code == 'CapsLock') {
          if (event == 'keydown' || event == 'mousedown') {
            if (Array.from(key.classList).includes('active')) {
              key.classList.remove('active');
            } else {
              key.classList.add('active');
            }
          }
        } else {
          switch (event) {
            case 'keydown' || 'mousedown' :
              key.classList.add('active'); break;
            case 'keyup' || 'mouseup' :
              key.classList.remove('active'); break;
          }
        }
      }
//Обрабатывает смену состояния клавиш (языка, стиля)
      changeState(key, code, event) {
        this.press(code, event);
        this.highlight(key, code, event);
        this.changeLang(code, event);
      }

//Меняет язык
      changeLang(code, event) {
        if(this.shiftPressed && this.ctrlPressed) {
          this.language == 'en' ? this.language = 'ru' : this.language = 'en';
          keyboard.innerHTML = '';
          this.createKeyboard();
        }
      }
}
