const { loadData } = require('./modules/dataLoader');
const { sortStringsIgnoringSpaces } = require('./modules/stringSorter');
const fsModule = require('./modules/fileSystem');

async function main() {
    console.log('=== Использование кастомных модулей ===\n');
    
    // a. Загрузка данных с JSONPlaceholder
    console.log('1. Загрузка данных пользователей...');
    const usersData = await loadData('https://jsonplaceholder.typicode.com/users');
    
    if (usersData.error) {
        console.error(`❌ Ошибка: ${usersData.error}`);
        return;
    }
    
    console.log(`✅ Загружено ${usersData.data.length} пользователей\n`);
    
    // b. Сортировка по именам
    const names = usersData.data.map(user => user.name);
    const sortedNames = sortStringsIgnoringSpaces([...names]);
    
    console.log('2. Отсортированные имена пользователей:');
    sortedNames.forEach((name, index) => {
        console.log(`   ${index + 1}. ${name}`);
    });
    console.log('');
    
    // c. Создание структуры папок и файлов
    console.log('3. Создание структуры файлов...');
    
    // Создаем папку users
    await fsModule.createDirAsync('./users');
    
    // Подготавливаем данные для записи
    const namesContent = sortedNames.join('\n');
    const emailsContent = usersData.data
        .map(user => user.email)
        .join('\n');
    
    // Создаем файлы
    await fsModule.writeFileAsync('./users/names.txt', namesContent);
    await fsModule.writeFileAsync('./users/emails.txt', emailsContent);
    
    console.log('✅ Структура создана успешно!');
    console.log('   📁 users/');
    console.log('     📄 names.txt');
    console.log('     📄 emails.txt');
    console.log('');
    
    // Чтение для проверки
    const readNames = await fsModule.readFileAsync('./users/names.txt');
    const readEmails = await fsModule.readFileAsync('./users/emails.txt');
    
    console.log('4. Проверка содержимого файлов:');
    console.log('   names.txt (первые 3 строки):');
    console.log(readNames.split('\n').slice(0, 3).map(line => `     - ${line}`).join('\n'));
    console.log('\n   emails.txt (первые 3 строки):');
    console.log(readEmails.split('\n').slice(0, 3).map(line => `     - ${line}`).join('\n'));
}

main().catch(console.error);
