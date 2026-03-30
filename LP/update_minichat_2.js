const fs = require('fs');
const path = 'Mini-Chat-Original/index.html';
let html = fs.readFileSync(path, 'utf8');

// Restore h3
html = html.replace(/<h3>Dra\. Deyse Oliveira<\/h3>/g, '<h3>Clínica íntegra</h3>');

// Update user data to include clinica
html = html.replace(/momento: '',\s*nome: ''/, "momento: '',\n        clinica: '',\n        nome: ''");

// Replace questions with bold instead of asterisks and add clinica question
const oldQuestionsRegex = /const questions = \[\s*\{[\s\S]*?\}\s*\];/;
const newQuestions = `const questions = [
        {
            id: 'procedimento',
            text: "Olá! 👋 Seja bem-vindo(a) ao atendimento da Dra. Deyse Oliveira.\\n\\nVou te fazer perguntas rápidas para entender melhor seu caso e agilizar seu agendamento.\\n\\n<b>Qual procedimento mais despertou seu interesse?</b>",
            options: ["Cirurgia Plástica Corporal", "Cirurgias da Mama", "Cirurgias da Face", "Harmonização e Preenchimento"],
            allowText: false
        },
        {
            id: 'objetivo',
            text: "Entendi! ✨\\n\\n<b>Qual é o seu principal objetivo com o procedimento?</b>",
            options: ["Melhorar o contorno corporal", "Rejuvenescer o rosto", "Melhorar proporção/simetria", "Quero uma avaliação completa"],
            allowText: false
        },
        {
            id: 'momento',
            text: "Perfeito! 📅\\n\\n<b>Quando você pretende realizar sua consulta ou procedimento?</b>",
            options: ["O quanto antes", "Ainda este mês", "Nos próximos meses", "Quero apenas tirar dúvidas"],
            allowText: false
        },
        {
            id: 'clinica',
            text: "Maravilha! 🏥\\n\\n<b>Em qual clínica você prefere ser atendido(a)?</b>",
            options: ["Cataguases/MG", "Leopoldina/MG"],
            allowText: false
        },
        {
            id: 'nome',
            text: "Ótimo! Quase lá... 😊\\n\\n<b>Qual é o seu nome?</b>",
            type: 'text',
            placeholder: "Digite seu nome completo"
        }
    ];`;
html = html.replace(oldQuestionsRegex, newQuestions);

// Update WhatsApp message to include clinica
html = html.replace(/`\*Momento para iniciar:\* \$\{userData\.momento\}\\n\\n` \+/, 
"`*Momento para iniciar:* ${userData.momento}\\n` +\n            `*Clínica de preferência:* ${userData.clinica}\\n\\n` +");

// Fix final message asterisk
html = html.replace(/✅ \*Triagem Concluída!\*/, '✅ <b>Triagem Concluída!</b>');

fs.writeFileSync(path, html, 'utf8');
console.log('Updated successfully');
