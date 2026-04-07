const fs = require('fs');
const path = 'Mini-Chat-Original/index.html';
let html = fs.readFileSync(path, 'utf8');

// 1. Add CSS for the overlay
const cssToAdd = `
        /* Overlay Styles */
        .result-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #0f0f0f;
            z-index: 100;
            display: none;
            flex-direction: column;
            align-items: center;
            padding: 50px 25px;
            box-sizing: border-box;
            color: white;
            animation: fadeIn 0.5s ease-out;
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        .result-overlay .check-icon {
            width: 90px;
            height: 90px;
            background: #25D366;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 25px;
            box-shadow: 0 0 30px rgba(37, 211, 102, 0.3);
        }

        .result-overlay .check-icon svg {
            width: 45px;
            height: 45px;
            fill: none;
            stroke: white;
            stroke-width: 4;
            stroke-linecap: round;
            stroke-linejoin: round;
        }

        .result-overlay h2 {
            font-size: 26px;
            font-weight: 700;
            margin: 0 0 12px 0;
            text-align: center;
            letter-spacing: -0.5px;
        }

        .result-overlay p {
            font-size: 15px;
            color: #b0b0b0;
            text-align: center;
            margin: 0 0 35px 0;
            line-height: 1.5;
        }

        .result-overlay .profile-card {
            background: #1e1e1e;
            border-radius: 20px;
            width: 100%;
            padding: 25px;
            box-sizing: border-box;
            margin-bottom: 35px;
            border: 1px solid #333;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }

        .result-overlay .profile-card-title {
            font-size: 12px;
            color: #888;
            letter-spacing: 1.5px;
            text-transform: uppercase;
            font-weight: 700;
            margin-bottom: 20px;
        }

        .result-overlay .profile-row {
            display: flex;
            justify-content: space-between;
            padding: 14px 0;
            border-bottom: 1px solid #2a2a2a;
            font-size: 14px;
            align-items: center;
        }

        .result-overlay .profile-row:last-child {
            border-bottom: none;
            padding-bottom: 0;
        }

        .result-overlay .profile-label {
            color: #888;
            flex: 0.8;
        }

        .result-overlay .profile-value {
            color: white;
            font-weight: 600;
            flex: 1.2;
            text-align: right;
        }

        .result-overlay .whatsapp-btn-full {
            background: #25D366;
            color: white;
            width: 100%;
            padding: 18px;
            border-radius: 14px;
            text-align: center;
            font-weight: 700;
            font-size: 17px;
            text-decoration: none;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 12px;
            transition: all 0.2s;
            box-shadow: 0 8px 20px rgba(37, 211, 102, 0.25);
            margin-top: auto;
        }

        .result-overlay .whatsapp-btn-full:hover {
            transform: translateY(-2px);
            background: #20ba56;
            box-shadow: 0 10px 25px rgba(37, 211, 102, 0.35);
        }
    </style>`;

if (!html.includes('.result-overlay {')) {
    html = html.replace('</style>', cssToAdd);
}

// 2. Add HTML for the overlay
const htmlToAdd = `
    <div class="result-overlay" id="resultOverlay">
        <div class="check-icon">
            <svg viewBox="0 0 24 24">
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
        </div>
        
        <h2>Triagem Concluída</h2>
        <p>Seu pré-diagnóstico está pronto. Você está a um passo de agendar sua consulta com a Dra. Deyse.</p>

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

if (!html.includes('id="resultOverlay"')) {
    html = html.replace('</div>\n\n<script>', htmlToAdd + '\n\n<script>');
}

// 3. Update finishChat function
const oldFinishChat = /function finishChat\(\) \{[\s\S]*?function sendToWhatsApp\(\)/;
const newFinishChat = `function finishChat() {
        showTyping();

        setTimeout(() => {
            removeTyping();

            // Preenche os dados no overlay
            document.getElementById('resNome').textContent = userData.nome.split(' ')[0];
            document.getElementById('resProcedimento').textContent = userData.procedimento;
            document.getElementById('resObjetivo').textContent = userData.objetivo;
            document.getElementById('resMomento').textContent = userData.momento;
            document.getElementById('resClinica').textContent = userData.clinica;

            // Esconde input e mostra overlay
            document.getElementById('chatInput').style.display = 'none';        
            progressBar.style.width = '100%';
            
            document.getElementById('resultOverlay').style.display = 'flex';

        }, 1500);
    }

    function sendToWhatsApp()`;

html = html.replace(oldFinishChat, newFinishChat);

fs.writeFileSync(path, html, 'utf8');
console.log('Updated full screen overlay successfully');
