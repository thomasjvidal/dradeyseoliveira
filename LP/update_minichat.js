const fs = require('fs');
const path = 'Mini-Chat-Original/index.html';
let html = fs.readFileSync(path, 'utf8');

// Update header titles and meta
html = html.replace(/<title>.*?<\/title>/, '<title>Dra. Deyse Oliveira - Atendimento</title>');
html = html.replace(/<h3>Clínica íntegra<\/h3>/g, '<h3>Dra. Deyse Oliveira</h3>');
html = html.replace(/<p>Pré-Diagnóstico Online<\/p>/g, '<p>Atendimento Online</p>');
html = html.replace(/alt="Clínica íntegra"/g, 'alt="Dra. Deyse Oliveira"');

// Replace questions
const oldQuestionsRegex = /const questions = \[\s*\{[\s\S]*?\}\s*\];/;
const newQuestions = `const questions = [
        {
            id: 'procedimento',
            text: "Olá! 👋 Seja bem-vindo(a) ao atendimento da Dra. Deyse Oliveira.\\n\\nVou te fazer 3 perguntas rápidas para entender melhor seu caso e agilizar seu agendamento.\\n\\n*Qual procedimento mais despertou seu interesse?*",
            options: ["Cirurgia Plástica Corporal", "Cirurgias da Mama", "Cirurgias da Face", "Harmonização e Preenchimento"],
            allowText: false
        },
        {
            id: 'objetivo',
            text: "Entendi! ✨\\n\\n*Qual é o seu principal objetivo com o procedimento?*",
            options: ["Melhorar o contorno corporal", "Rejuvenescer o rosto", "Melhorar proporção/simetria", "Quero uma avaliação completa"],
            allowText: false
        },
        {
            id: 'momento',
            text: "Perfeito! 📅\\n\\n*Quando você pretende realizar sua consulta ou procedimento?*",
            options: ["O quanto antes", "Ainda este mês", "Nos próximos meses", "Quero apenas tirar dúvidas"],
            allowText: false
        },
        {
            id: 'nome',
            text: "Ótimo! Quase lá... 😊\\n\\n*Qual é o seu nome?*",
            type: 'text',
            placeholder: "Digite seu nome completo"
        }
    ];`;
html = html.replace(oldQuestionsRegex, newQuestions);

// Replace final message
html = html.replace(/✅ \*Pré-Diagnóstico Concluído!\*<br><br>[\s\S]*?Clique abaixo para continuar o atendimento no WhatsApp:/, 
`✅ *Triagem Concluída!*<br><br>
                Obrigado(a), \${userData.nome.split(' ')[0]}! Já tenho um resumo inicial do seu interesse em \${userData.procedimento.toLowerCase()}.<br><br>
                Clique abaixo para falar diretamente com a nossa equipe no WhatsApp e agendarmos sua consulta:`);

// Replace whatsapp initial message
html = html.replace(/\*Novo Pré-Diagnóstico - Clínica íntegra\* ✨/, '*Novo Atendimento - Dra. Deyse Oliveira* ✨');

fs.writeFileSync(path, html, 'utf8');
console.log('Updated successfully');
