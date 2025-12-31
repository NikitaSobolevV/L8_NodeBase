require('dotenv').config();

console.log('=== Информация о студенте ===');
console.log(`Имя: ${process.env.FIRST_NAME}`);
console.log(`Фамилия: ${process.env.LAST_NAME}`);
console.log(`Группа: ${process.env.GROUP}`);
console.log(`Номер по списку: ${process.env.STUDENT_NUMBER}`);
console.log(`Режим доступа: ${process.env.MODE}`);
console.log('=============================\n');
