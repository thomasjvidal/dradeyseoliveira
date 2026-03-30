const fs = require('fs');
const path = 'Mini-Chat-Original/index.html';
let html = fs.readFileSync(path, 'utf8');

const htmlToAdd = `
    <div class="result-overlay" id="resultOverlay">
        <div class="check-icon">
            <svg viewBox="0 0 24 24">
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
        </div>
        
        <h2>Análise Completa</h2>
        <p>Seu diagnóstico está pronto. Você está a um passo da sua consulta com a Dra. Deyse.</p>

        <div class="profile-card">
            <div class="profile-card-title">SEU PERFIL</div>
            
            <div class="profile-row">
                <span class="profile-label">Nome</span>
                <span class="profile-value" id="resNome">-</span>
            </div>
            <div class="profile-row">
                <span class="profile-label">Interesse</span>
                <span class="profile-value" id="resProcedimento">-</span>
            </div>
            <div class="profile-row">
                <span class="profile-label">Objetivo</span>
                <span class="profile-value" id="resObjetivo">-</span>
            </div>
            <div class="profile-row">
                <span class="profile-label">Quando</span>
                <span class="profile-value" id="resMomento">-</span>
            </div>
            <div class="profile-row">
                <span class="profile-label">Clínica</span>
                <span class="profile-value" id="resClinica">-</span>
            </div>
        </div>

        <a href="#" class="whatsapp-btn-full" onclick="sendToWhatsApp()">
            📱 Enviar para o WhatsApp
        </a>
    </div>
</div>`;

// We use regex to match the end of phone-container regardless of newlines
if (!html.includes('id="resultOverlay"')) {
    html = html.replace(/<\/div>\s*<script>/, htmlToAdd + '\n\n<script>');
    fs.writeFileSync(path, html, 'utf8');
    console.log('Fixed overlay HTML insertion!');
} else {
    console.log('Overlay already present');
}
