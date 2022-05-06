const html = document.querySelector('html');
const keyboard = document.querySelector('.keyboard');

export default class {
    constructor(keys) {
        this.keys = keys;
        this.createKeyboard();
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
          button.innerHTML = elem.system ? elem.name : elem.en;//заменить, пока добавляется только английский
          document.querySelectorAll('.keyboard__row')[createRow].append(button);
          if (elem.classes) button.classList = elem.classes;
        });
      }
      
}
