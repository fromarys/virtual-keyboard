const html = document.querySelector('html');
const keyboard = document.querySelector('.keyboard');

export default class {
    constructor(keys) {
      this.language = this.checkLang();
        this.keys = keys;
        this.createKeyboard();
        this.shiftPressed = false;
        this.capslockPressed = false;
      }

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
          button.innerHTML = elem.system ? elem.name : elem[this.language];//пока добавляется только английский
          document.querySelectorAll('.keyboard__row')[createRow].append(button);
          if (elem.classes) button.classList = elem.classes;
        });
      }
      
      buttonInfo(btn) {
       return this.keys.filter(e => e.code == btn.dataset.keyCode)[0];
      }


      insert(btn, text) {
        let info = this.buttonInfo(btn);
        let value = text;
        if(info.system) {
          switch(info.code) {
            case 'Backspace' :
              value = value.slice(0, -1); break;
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
            value += info[this.language];//пока добавляется только английский
            // console.log(info);
          }

        }
        return value;
      }

      setLang() {

      }

      press(code, event) {
        // console.log(code)
        if (code == 'ShiftLeft' || code == 'ShiftRight') {
          if(event == 'keydown') {
            this.shiftPressed = true;
            return this.shiftPressed;
          }
          if (event == 'keyup') {
            this.shiftPressed = false;
            return this.shiftPressed;
          }
        }
        if(code == 'CapsLock') {
          if(event == 'keydown') {
            this.capslockPressed = !this.capslockPressed;
            return this.capslockPressed;
          }
        }
      }

      changeView(code, event) {
        
      }
      changeLang() {
        let currentLang = localStorage.getItem('language');

      }


}
