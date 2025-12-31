const os = require('os');

// a. Основная информация об ОС
function getOSInfo() {
    if (!checkAccessMode()) {
        console.log('Доступ запрещен! Требуется режим admin');
        return;
    }

    const info = {
        platform: os.platform(),
        arch: os.arch(),
        hostname: os.hostname(),
        totalMem: `${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB`,
        freeMem: `${(os.freemem() / 1024 / 1024 / 1024).toFixed(2)} GB`,
        uptime: `${(os.uptime() / 3600).toFixed(2)} часов`,
        cpus: os.cpus().length,
        networkInterfaces: os.networkInterfaces(),
        homedir: os.homedir()
    };

    console.log('=== Информация об операционной системе ===');
    console.log(`Платформа: ${info.platform}`);
    console.log(`Архитектура: ${info.arch}`);
    console.log(`Имя хоста: ${info.hostname}`);
    console.log(`Общая память: ${info.totalMem}`);
    console.log(`Свободная память: ${info.freeMem}`);
    console.log(`Время работы: ${info.uptime}`);
    console.log(`Количество CPU: ${info.cpus}`);
    console.log(`Домашняя директория: ${info.homedir}`);
    console.log('===========================================\n');
    
    return info;
}

// b. Проверка свободной памяти > 4GB
function checkFreeMemory() {
    const freeMemGB = os.freemem() / 1024 / 1024 / 1024;
    const isEnough = freeMemGB > 4;
    
    console.log(`Свободная память: ${freeMemGB.toFixed(2)} GB`);
    console.log(`Достаточно ли памяти (>4GB): ${isEnough ? '✅ Да' : '❌ Нет'}\n`);
    
    return isEnough;
}

// c. Проверка режима доступа
function checkAccessMode() {
    const mode = process.env.MODE || 'user';
    return mode === 'admin';
}

module.exports = {
    getOSInfo,
    checkFreeMemory,
    checkAccessMode
};
