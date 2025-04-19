// Ждем, пока загрузится вся страница
document.addEventListener('DOMContentLoaded', function() {
    // При загрузке
    // После загрузки страницы
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        const installButton = document.createElement('button');
        installButton.textContent = 'Install App';
        document.body.appendChild(installButton);
  
        installButton.addEventListener('click', () => {
            e.prompt();
        });
    });
    
    let clicks = Number(localStorage.getItem('clicks')) || 0;
    let x = Number(localStorage.getItem('x')) || 1;
    let upg = Number(localStorage.getItem('upg')) || 10;

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

    resetButton.addEventListener('click', () => {
        localStorage.clear(); // Удаляет ВСЕ данные из localStorage
        clicks = 0;
        x = 1;
        upg = 10;
        update();
        console.log('(id="resetButton") Reseted!');
    });

    function update() {
        clicks = Number(clicks)
        x = Number(x)
        upg = Number(upg)
        
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

