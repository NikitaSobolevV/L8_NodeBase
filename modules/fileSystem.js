const fs = require('fs').promises;
const fsSync = require('fs');
const path = require('path');

// 1. Функция записи в файл (асинхронная)
async function writeFileAsync(filePath, data) {
    try {
        await fs.writeFile(filePath, data);
        console.log(`✅ Файл ${filePath} записан успешно`);
        return true;
    } catch (error) {
        console.error(`❌ Ошибка записи в файл ${filePath}:`, error.message);
        return false;
    }
}

// 1. Функция записи в файл (синхронная)
function writeFileSync(filePath, data) {
    try {
        fsSync.writeFileSync(filePath, data);
        console.log(`✅ Файл ${filePath} записан успешно`);
        return true;
    } catch (error) {
        console.error(`❌ Ошибка записи в файл ${filePath}:`, error.message);
        return false;
    }
}

// 2. Функция чтения из файла (асинхронная)
async function readFileAsync(filePath) {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        console.log(`✅ Файл ${filePath} прочитан успешно`);
        return data;
    } catch (error) {
        console.error(`❌ Ошибка чтения файла ${filePath}:`, error.message);
        return null;
    }
}

// 2. Функция чтения из файла (синхронная)
function readFileSync(filePath) {
    try {
        const data = fsSync.readFileSync(filePath, 'utf8');
        console.log(`✅ Файл ${filePath} прочитан успешно`);
        return data;
    } catch (error) {
        console.error(`❌ Ошибка чтения файла ${filePath}:`, error.message);
        return null;
    }
}

// 3. Изменение информации в файле (асинхронная)
async function updateFileAsync(filePath, newData) {
    try {
        await fs.writeFile(filePath, newData);
        console.log(`✅ Файл ${filePath} обновлен успешно`);
        return true;
    } catch (error) {
        console.error(`❌ Ошибка обновления файла ${filePath}:`, error.message);
        return false;
    }
}

// 4. Удаление информации из файла (асинхронная)
async function clearFileAsync(filePath) {
    try {
        await fs.writeFile(filePath, '');
        console.log(`✅ Файл ${filePath} очищен успешно`);
        return true;
    } catch (error) {
        console.error(`❌ Ошибка очистки файла ${filePath}:`, error.message);
        return false;
    }
}

// 5. Удаление шума из файла (асинхронная)
async function cleanFileAsync(filePath) {
    try {
        let content = await fs.readFile(filePath, 'utf8');
        content = content.replace(/\d/g, ''); // удаляем цифры
        content = content.toLowerCase(); // переводим в нижний регистр
        await fs.writeFile(filePath, content);
        console.log(`✅ Файл ${filePath} очищен от шума`);
        return true;
    } catch (error) {
        console.error(`❌ Ошибка очистки файла ${filePath}:`, error.message);
        return false;
    }
}

// 6. Копирование файла (асинхронная)
async function copyFileAsync(sourcePath, destPath) {
    try {
        const data = await fs.readFile(sourcePath);
        await fs.writeFile(destPath, data);
        console.log(`✅ Файл скопирован из ${sourcePath} в ${destPath}`);
        return true;
    } catch (error) {
        console.error(`❌ Ошибка копирования файла:`, error.message);
        return false;
    }
}

// 7. Создание папки (асинхронная)
async function createDirAsync(dirPath) {
    try {
        await fs.mkdir(dirPath, { recursive: true });
        console.log(`✅ Папка ${dirPath} создана успешно`);
        return true;
    } catch (error) {
        console.error(`❌ Ошибка создания папки ${dirPath}:`, error.message);
        return false;
    }
}

// 8. Удаление папки (асинхронная)
async function removeDirAsync(dirPath) {
    try {
        await fs.rm(dirPath, { recursive: true, force: true });
        console.log(`✅ Папка ${dirPath} удалена успешно`);
        return true;
    } catch (error) {
        console.error(`❌ Ошибка удаления папки ${dirPath}:`, error.message);
        return false;
    }
}

// 9. Получение путей ко всем файлам (асинхронная)
async function getAllFilesAsync(dirPath = '.', result = []) {
    try {
        const items = await fs.readdir(dirPath, { withFileTypes: true });
        
        for (const item of items) {
            const fullPath = path.join(dirPath, item.name);
            
            // Пропускаем служебные папки
            if (item.name.startsWith('.') || 
                item.name === 'node_modules' || 
                item.name === 'package-lock.json') {
                continue;
            }
            
            if (item.isDirectory()) {
                await getAllFilesAsync(fullPath, result);
            } else {
                result.push(fullPath);
            }
        }
        
        return result;
    } catch (error) {
        console.error(`❌ Ошибка сканирования директории:`, error.message);
        return [];
    }
}

// 10. Очистка проекта (асинхронная)
async function cleanProjectAsync() {
    try {
        const files = await getAllFilesAsync();
        
        for (const file of files) {
            // Пропускаем текущий файл и package.json
            if (file.includes('fileSystem.js') || 
                file.includes('package.json') ||
                file.includes('.env')) {
                continue;
            }
            
            await fs.unlink(file);
        }
        
        console.log('✅ Проект очищен (за исключением служебных файлов)');
        return true;
    } catch (error) {
        console.error('❌ Ошибка очистки проекта:', error.message);
        return false;
    }
}

module.exports = {
    // Асинхронные функции
    writeFileAsync,
    readFileAsync,
    updateFileAsync,
    clearFileAsync,
    cleanFileAsync,
    copyFileAsync,
    createDirAsync,
    removeDirAsync,
    getAllFilesAsync,
    cleanProjectAsync,
    
    // Синхронные функции
    writeFileSync,
    readFileSync
};
