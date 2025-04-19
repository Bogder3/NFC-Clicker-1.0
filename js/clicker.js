// Ждем, пока загрузится вся страница
document.addEventListener('DOMContentLoaded', function() {
    // При загрузке
    let clicks = localStorage.getItem('clicks') || 0;
    let x = localStorage.getItem('x') || 1;
    let upg = localStorage.getItem('upg') || 10;

    update();

    clickButton.addEventListener('click', () => {
        clicks += x;
        console.log('(id="clickButton") Clicked! Cicks: '+clicks);
        update();
    });

    upgButton.addEventListener('click', () => {
        if (clicks >= upg) {
            clicks -= upg;
            upg *= 2;
            x ++
            console.log('(id="upgButton") Clicked! Clicks: '+clicks);
            console.log('(id="upgButton") Clicked! X: '+x);
            console.log('(id="upgButton") Clicked! UpgPrice: '+upg+' clicks');
        update();
        };
    });

    function update() {
        document.getElementById('clickButton').textContent = "Clicks: "+clicks;
        document.getElementById('upgButton').textContent = "Upg Price: "+upg;
        document.getElementById('xDiv').textContent = "X: "+x;

        localStorage.setItem('clicks', clicks);
        localStorage.setItem('x', x);
        localStorage.setItem('upg', upg);
    }

    // Функция для получения параметров из URL
    function getUrlParams() {
        const params = new URLSearchParams(window.location.search);
        return {
            bonus: params.get('bonus') // Пример: ?bonus=gold
        };
    }
  
    // Проверяем параметры при загрузке игры
    const urlParams = getUrlParams();
    if (urlParams.bonus) {
        activateBonus(urlParams.bonus);
    }
  
    // Функция активации бонуса
    function activateBonus(type) {
        switch (type) {
        case '100':
            clicks += 100;
            console.log('(id="?bonus=100") Bonus Activated! +100 clicks!');
            break;
        case '1k':
            clicks += 1000;
            console.log('(id="?bonus=1k") Bonus Activated! +1K clicks!');
            break;
        case '1m':
            clicks += 1000000;
            console.log('(id="?bonus=1m") Bonus Activated! +1M click!');
            break;
        default:
            console.log('(id="?bonus=...") bonus=???');
        }
        update();
    }

});

