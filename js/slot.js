'use strict';

{
  //HTMLで下書きした内容をJsで作っていく。
  class Panel {
    constructor() {
      //sectionを作る。コンストラクター内でしか使わないからconst
      const section = document.createElement('section');
      //sectionにpanelクラスをつける
      section.classList.add('panel');
      // コンストラクター外でも使えるようにthis
      this.img = document.createElement('img');
      // 最初はthis.img.src = 'img/slot1.jpg';のようにしておいて、画像の処理ができたらここを変えてあげる。↓
      this.img.src = this.getRandomImage();
      
      // 最初は値が定まっていないので、明示的に undefined。タイマーを止めるID
      this.timeoutId = undefined;
      
      //ストップボタンのdiv
      this.stop = document.createElement('div');
      //divの中のテキスト
      this.stop.textContent = 'ストップ';
      //stopクラスをつける。初めてないのにstopが押せるとおかしいのでinactiveクラスも付けておく。
      this.stop.classList.add('stop', 'inactive');
      //sectionの中にimgとstopボタンを入れる
      section.appendChild(this.img);
      section.appendChild(this.stop);
      
      //ストップボタンの処理(タイマーを止める処理)
      this.stop.addEventListener('click', () => {
        //inactiveクラスがついてたら次の処理をしない
        if (this.stop.classList.contains('inactive')) {
          return;
        }
        //同じストップを3回押した時に結果判定に移らないようにinactiveクラスをつける
        this.stop.classList.add('inactive');
        clearTimeout(this.timeoutId);

        //結果判定。panelsLeft数値を STOP ボタンを押すたびに、 1 減らしていけばい。1減らすはマイナス２つ。
        panelsLeft--;
        // panelsLeftが0になったら結果判定。checkResult()の関数は個々のパネルに関する処理でく、パネル同士を比較する処理なので、 panel クラスの外で書く
        if(panelsLeft === 0) {
          //スロットが止まった時点(panelsLeft === 0)でまたあそべるようにしてあげる
          spin.classList.remove('inactive');
          // panelsLeftもリセットして3に戻す
          panelsLeft = 3;
          checkResult();
          
        }
      });
    //HTMLのmain要素を取得。これでHTMLの<main>の中身は消してOK 
      const main = document.querySelector('main');
      // mainの中にさっき作ったsectionを入れる
      main.appendChild(section);
    }

    //getRandomImage()メソッド
    getRandomImage() {
      const images = [
        'img/slot1.jpg',
        'img/slot2.jpg',
        'img/slot3.jpg',
      ];
      //上の配列(画像)からランダムな要素を返してね。
      return images[Math.floor(Math.random() * images.length)];
    }

    //spinメソッド。ランダムな画像の生成＞getRandomImage()というメソッドにまとめる
    spin() {
      this.img.src = this.getRandomImage();
      //画像がクルクル回転するように。50ミリ秒ごとにspinメソッドを呼んであげればいい。this.timeoutIdはタイマーを止めるためのID
      this.timeoutId = setTimeout(() => {
        this.spin();
      }, 50);
    }

    //imgのsrcプロパティが他とマッチしていたらtrue、違えばfalseを返す
    isUnmatched(p1, p2) {
      if (this.img.src !== p1.img.src && this.img.src !== p2.img.src) {
          return true;
      }
      if (this.img.src !==p1.img.src || this.img.src !== p2.img.src) {
        return true;
      } else {
        false
      }
      // return this.img.src !== p1.img.src && this.img.src !== p2.img.src;
    }

    //unmatchedメソッド。マッチしなかった時にcssで作ったクラスリストを付ける。
    
    unmatch() {
      this.img.classList.add('unmatched');
    }


    //判定後に遊ぶ時にstopボタンのinactiveクラスと画像のunmatchedクラスと結果判定メッセージを外すためのactivate()メソッド
    activate() {
      this.stop.classList.remove('inactive');
      this.img.classList.remove('unmatched');
      result.classList.remove('dontMind', 'great');
    }
  }

  // 関数checkResult()をpanelクラス外で定義。１つのパネルが他のパネルとマッチしたかの判定はisUnmatched()というメソッドにして他のの２つのパネルを引数で渡す。

  //他の２枚とマッチしなければunmatched()というメソッドで色を薄くする

  const result = document.getElementById('result');
  
  function checkResult() {
    if (panels[0].isUnmatched(panels[1], panels[2])) {
      panels[0].unmatch();
      result.classList.add('dontMind');
      // result.textContent = 'ドンマイ'; 
    }
    if (panels[1].isUnmatched(panels[0], panels[2])) {
      panels[1].unmatch();
      result.classList.add('dontMind');
      // result.textContent = 'ドンマイ' ;
    }
    if (panels[2].isUnmatched(panels[0], panels[1])) {
      panels[2].unmatch();
      result.classList.add('dontMind');
      // result.textContent = 'ドンマイ'; 
    } else { 
      result.classList.add('great');
      // result.textContent = 'ヤッター'; 
    }
  }
      

    
  //インスタンスの生成。これでブラウザ上にスロットが現れる。
    const panels = [
      new Panel(),
      new Panel(),
      new Panel(),
    ];
    //３つのパネルを止めて2枚しか揃わなかったらもう1枚を薄くする。パネス3枚なので初期値は３
    let panelsLeft = 3;

    // #spin(スタートボタン)を取得
    const spin = document.getElementById('spin');

    
    //一つ一つの要素をpanelで受け取って次の処理をしなさい。処理はspinというメソッドにまとめて呼び出すことに。（上でspinを定義)
    spin.addEventListener('click', () => {
      //スタートボタンにinactiveがついたら処理をここで止める。
      if (spin.classList.contains('inactive')) {
        return;
      }
      //spin(ストップボタン)にinactiveクラスをつける
      spin.classList.add('inactive');
      panels.forEach(panel => {
        //判定後に遊ぶ時にstopボタンのinactiveクラスと画像のunmatchedクラスを外すためのactivate()メソッド
        panel.activate();
        panel.spin();
      });
    });
}
