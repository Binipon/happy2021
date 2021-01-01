'use strict';

{
  const btn = document.getElementById('btn');
  const img = document.getElementById('img');
  const message = document.getElementById('message');
  


  btn.addEventListener('click',() => {
    img.classList.add('visible');
    btn.textContent = '下の鈴をクリックしてね';
});


img.addEventListener('click', () => {
  img.setAttribute('src',`img/amabiesama.png`);
  img.classList.add('amabie');
  btn.classList.add('invisible');
  message.classList.add('show');
});
}
