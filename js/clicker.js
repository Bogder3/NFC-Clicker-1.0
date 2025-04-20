document.addEventListener('DOMContentLoaded', function() {
    // Переменные
    let clicks = Number(localStorage.getItem('clicks')) || 0;
    let x = Number(localStorage.getItem('x')) || 1;
    let upg = Number(localStorage.getItem('upg')) || 10;

    // Элементы
    const clickButton = document.getElementById('clickButton');
    const upgButton = document.getElementById('upgButton');
    const resetButton = document.getElementById('resetButton');
    const xDiv = document.getElementById('xDiv');

    // Инициализация интерфейса
    update();

    // Обработчики событий
    clickButton.addEventListener('click', () => {
        clicks += x;
        console.log('(clickButton) Clicks:', clicks);
        update();
    });

    upgButton.addEventListener('click', () => {
        if (clicks >= upg) {
            clicks -= upg;
            upg *= 2;
            x++;
            console.log('(upgButton) New values:', {clicks, x, upg});
            update();
        }
    });

    resetButton.addEventListener('click', () => {
        if (confirm("Вы уверены? Весь прогресс будет потерян!")) {
            // 1. Очищаем хранилище
            localStorage.clear();

            // 2. Удаляем сервис-воркер
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.getRegistrations().then(registrations => {
                    registrations.forEach(registration => registration.unregister());
                });
            }

            // 3. Принудительная перезагрузка страницы
            window.location.reload(true);
        }
    });

    // Функции
    function update() {
        // Обновляем интерфейс
        clickButton.textContent = 'Clicks: '+clicks;
        upgButton.textContent = 'Upg Price: '+upg;
        xDiv.textContent = 'X: '+x;

        // Сохраняем данные
        localStorage.setItem('clicks', clicks);
        localStorage.setItem('x', x);
        localStorage.setItem('upg', upg);
    }

    // Бонусная система
    const urlParams = new URLSearchParams(window.location.search);
    const bonus = urlParams.get('bonus');
    
    if (bonus) {
        switch (bonus) {
            case '100': clicks += 100; break;
            case '1k': clicks += 1000; break;
            case '1m': clicks += 1000000; break;
            default: console.log('Unknown bonus type');
        }
        update();
    }
});
