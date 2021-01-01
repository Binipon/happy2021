'use strict';

{
  const draw = document.getElementById('draw');
  
  function kujibiki () {
    
  const omikujiImg = document.getElementById('omikujiImg');

  let randomNumber = Math.floor(Math.random() * 4 + 1);
  
  //setattribute=指定の要素に新しい属性を追加または属性の値を変更。
  // 例えば元の画像から他の画像へ変更
  omikujiImg.setAttribute('src', `img/kuji${randomNumber}.jpg`); 

}
    
  draw.addEventListener('click', () => {
    kujibiki();

    draw.innerHTML = "もう1度引く";
    draw.classList.add('oncemore');
    omikujiImg.classList.add('transition');
  }); 
}
    


   
    
    
    

  
  
  
  
    

 
   

    

  
  
  
