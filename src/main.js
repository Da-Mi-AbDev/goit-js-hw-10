// Тут пиши JavaScript свого домашнього завдання.
// Додаткові модулі створюй поруч у src/ і імпортуй їх сюди:
import { PREP_TIME } from './js/menu.js';

console.log('Шаблон готовий. Можна писати код 🚀');

const form = document.querySelector('.form');
const orderList = document.querySelector('.order-log');

const addOrderRow = drink => {
  const listItem = document.createElement('li');
  listItem.classList.add('row-pending');
  listItem.textContent = `⏳${drink} · у роботі…`;
  orderList.append(listItem);
  return listItem;
};

const makeOrder = (delay, shouldResolve) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve === true) {
        resolve(delay);
      }
      if (shouldResolve === false) {
        reject(delay);
      }
    }, delay);
  });
};

form.addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const drinkName = formData.get('drink');
  const stateValue = formData.get('state');
  const shouldResolve = stateValue === 'fulfilled';
  const delay = PREP_TIME[drinkName];
  const row = addOrderRow(drinkName);
  makeOrder(delay, shouldResolve)
    .then(value => {
      row.classList.remove('row-pending');
      row.classList.add('row-ok');
      row.textContent = `✅ ${drinkName} · готове · ${delay} ms`;
    })
    .catch(error => {
      row.classList.remove('row-pending');
      row.classList.add('row-err');
      row.textContent = `❌ ${drinkName} · скасовано · ${delay} ms`;
    })
    .finally(() => {
      const localTime = new Date().toLocaleTimeString('uk-UA');
      row.textContent += ` · ${localTime}`;
    });
  form.reset();
});
