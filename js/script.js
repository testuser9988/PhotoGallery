/*
ローディングから画面遷移 
================================================================*/
const loadingAreaGrey = document.querySelector("#loading");
// const loadingAreaGreen = document.querySelector("#loading-screen");
const loadingText = document.querySelector("#loading p");
window.addEventListener('load', () => {
  // ローディング中（グレイスクリーン）
  loadingAreaGrey.animate(
    {
      opacity: [1, 0],
      visibility: 'hidden',
    },
    {
      duration: 2000,
      delay: 1200,
      easing: 'ease',
      fill: 'forwards',
    }
  );

  // // ローディング中（薄緑スクリーン）
  // loadingAreaGreen.animate(
  //   {
  //     translate: ['0 100vh', '0 0', '0 -100vh']
  //   },
  //   {
  //     duration: 2000,
  //     delay: 800,
  //     easing: 'ease',
  //     fill: 'forwards',
  //   }
  // );

  // ローディング中テキスト
  loadingText.animate(
    [
      {
        opacity: 1,
        offset: .8 // 80%
      },
      {
        opacity: 0,
        offset: 1 // 100%
      },
    ],

    {
      duration: 1200,
      easing: 'ease',
      fill: 'forwards',
    }
  );
});

// 監視対象が範囲内に現れたら実行する動作
const animateFade = (entries, obs) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.animate(
        {
          opacity: [0, 1],
          filter: ['blur(.4rem)', 'blur(0)'],
          translate: ['0 4rem', 0],
        },
        {
          duration: 2000,
          easing: 'ease',
          fill: 'forwards',
        }
      );
      // 一度ふわっと表示されたら監視をやめる
      obs.unobserve(entry.target);
    }
  });
};
  
// 監視設定
const fadeObserver = new IntersectionObserver(animateFade);

// .fadeinを監視するように指示
const fadeElements = document.querySelectorAll('.fadein');
fadeElements.forEach((fadeElement) => {
  fadeObserver.observe(fadeElement);
});

/*
画像ギャラリー *
================================================================*/
const thumbImages = document.querySelectorAll('.gallery-thumbnails img');
const modal = document.querySelector('#modal');
const mask = document.querySelector('#mask');
const showKeyframes = {
  opacity: [0, 1],
  visibility: 'visible',
};
const hideKeyframes = {
  opacity: [1, 0],
  visibility: 'hidden',
};
const modalOptions = {
  duration: 500,
  easing: 'ease',
  fill: 'forwards',
};

// モーダルウィンドウを開く
thumbImages.forEach((thumbImage)=>{
  thumbImage.addEventListener('click', (event) => {

    // スクロール位置を取得
    currentScroll = window.scrollY;

    console.log(window.screen.height / 2);

    // モーダルウィンドウの画像変更
    modal.querySelector('img').src = event.target.src;

    modal.animate(showKeyframes, modalOptions);
    mask.animate(showKeyframes, modalOptions);
    
  });
});

// マスクをクリックしてモーダルウィンドウを閉じる
modal.addEventListener('click', () => {
  modal.animate(hideKeyframes, modalOptions);
  mask.animate(hideKeyframes, modalOptions);
  
});