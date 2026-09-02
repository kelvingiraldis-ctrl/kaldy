/**
 * KALDY DIGITAL - FORMULÁRIO DE DIAGNÓSTICO E QUALIFICAÇÃO DINÂMICO
 * Roteamento Inteligente: Empresa (Social Media + Tráfego) / Evento (Cobertura & Storymaker)
 */

document.addEventListener('DOMContentLoaded', () => {
    // ================= CONFIGURAÇÕES PRINCIPAIS =================
    // WhatsApp oficial da Kaldy Digital
    const WHATSAPP_NUMBER = '5511999382989';
    
    // Webhook opcional do Google Sheets (desconectado por padrão)
    const GOOGLE_SHEETS_WEBHOOK_URL = ''; 

    const form = document.getElementById('leadForm');
    const stepCards = document.querySelectorAll('.step-card');
    const formCardProgress = document.getElementById('formCardProgress');
    const cardProgressFill = document.getElementById('cardProgressFill');
    
    // Inputs Principais
    const inputNome = document.getElementById('inputNome');
    const inputWhatsapp = document.getElementById('inputWhatsapp');
    
    // Inputs Empresa
    const inputInstagramEmpresa = document.getElementById('inputInstagramEmpresa');
    const inputEmailEmpresa = document.getElementById('inputEmailEmpresa');
    const inputSiteEmpresa = document.getElementById('inputSiteEmpresa');
    
    // Inputs Evento
    const inputInstagramEvento = document.getElementById('inputInstagramEvento');
    const inputDataEvento = document.getElementById('inputDataEvento');
    const inputLocalEvento = document.getElementById('inputLocalEvento');
    const inputEmailEvento = document.getElementById('inputEmailEvento');
    
    // Botões
    const btnStart = document.getElementById('btnStart');
    const nextBtns = document.querySelectorAll('.btn-next');
    const prevBtns = document.querySelectorAll('.btn-prev');
    const btnSkipFaturamento = document.getElementById('btnSkipFaturamento');
    const btnSkipSiteEmpresa = document.getElementById('btnSkipSiteEmpresa');
    const whatsappDirectBtn = document.getElementById('whatsappDirectBtn');

    // Estado da navegação
    let currentStep = '1';
    let selectedSegmento = 'empresa'; // 'empresa' ou 'evento'

    const FLOW_MAP = {
        empresa: ['1', '2', '3', '4', '5e', '6e', '7e', '8e', '9e', '10e', '10'],
        evento:  ['1', '2', '3', '4', '5v', '6v', '7v', '8v', '9v', '10']
    };

    let leadSessionId = 'lead_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
    let hasTriggeredSuccess = false;

    function initNewLeadSession() {
        leadSessionId = 'lead_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
        hasTriggeredSuccess = false;
    }

    // ================= CAPTURA DE UTMS =================
    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get('utm_source') || urlParams.get('src') || 'Direto';
    const utmMedium = urlParams.get('utm_medium') || 'organic';
    const utmCampaign = urlParams.get('utm_campaign') || 'Não informada';

    // ================= SINCRONIZAÇÃO OPCIONAL =================
    function syncLeadToSheet(statusText) {
        if (!GOOGLE_SHEETS_WEBHOOK_URL) return;

        const nome = inputNome ? inputNome.value.trim() : '';
        const whatsapp = inputWhatsapp ? inputWhatsapp.value.trim() : '';
        if (!nome && !whatsapp) return;

        const payload = {
            lead_id: leadSessionId,
            data_hora: new Date().toLocaleString('pt-BR'),
            segmento: selectedSegmento,
            nome: nome,
            whatsapp: whatsapp,
            status: statusText || 'Em andamento',
            utm_source: utmSource,
            utm_campaign: utmCampaign,
            utm_medium: utmMedium
        };

        try {
            fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                body: JSON.stringify(payload)
            }).catch(err => console.warn('Sync aviso:', err));
        } catch (err) {
            console.warn('Sync aviso:', err);
        }
    }

    // ================= MÁSCARAS & INPUT LISTENERS =================
    if (inputWhatsapp) {
        inputWhatsapp.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 11) value = value.slice(0, 11);

            if (value.length > 10) {
                value = value.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
            } else if (value.length > 6) {
                value = value.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3');
            } else if (value.length > 2) {
                value = value.replace(/^(\d{2})(\d{0,5})$/, '($1) $2');
            } else if (value.length > 0) {
                value = value.replace(/^(\d*)$/, '($1');
            }
            e.target.value = value;
            clearError('errorWhatsapp', inputWhatsapp);
        });
    }

    if (inputInstagramEmpresa) {
        inputInstagramEmpresa.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/^@+/, '').trim();
            clearError('errorInstagramEmpresa', inputInstagramEmpresa);
        });
    }

    if (inputInstagramEvento) {
        inputInstagramEvento.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/^@+/, '').trim();
        });
    }

    if (inputNome) inputNome.addEventListener('input', () => clearError('errorNome', inputNome));
    if (inputEmailEmpresa) inputEmailEmpresa.addEventListener('input', () => clearError('errorEmailEmpresa', inputEmailEmpresa));
    if (inputEmailEvento) inputEmailEvento.addEventListener('input', () => clearError('errorEmailEvento', inputEmailEvento));
    if (inputLocalEvento) inputLocalEvento.addEventListener('input', () => clearError('errorLocalEvento', inputLocalEvento));

    // ================= SELEÇÃO DE SEGMENTO (BIFURCAÇÃO ETAPA 4) =================
    const segmentRadios = document.querySelectorAll('input[name="segmento"]');
    segmentRadios.forEach(radio => {
        radio.addEventListener('change', function () {
            if (this.checked) {
                selectedSegmento = this.value;
                document.querySelectorAll('.segment-choice-card').forEach(c => c.classList.remove('selected'));
                const card = this.closest('.segment-choice-card');
                if (card) card.classList.add('selected');
                clearError('errorSegmento');

                setTimeout(() => {
                    const nextTarget = selectedSegmento === 'empresa' ? '5e' : '5v';
                    goToStep(nextTarget);
                }, 200);
            }
        });
    });

    // ================= SELEÇÃO DE CHECKBOXES (MULTI-SELEÇÃO) =================
    const allCheckboxes = document.querySelectorAll('.checkbox-card input[type="checkbox"]');
    allCheckboxes.forEach(checkbox => {
        // Garante que o estado inicial do DOM esteja sincronizado
        const card = checkbox.closest('.checkbox-card');
        if (card) {
            if (checkbox.checked) {
                card.classList.add('selected');
            } else {
                card.classList.remove('selected');
            }
        }

        checkbox.addEventListener('change', function () {
            const parentCard = this.closest('.checkbox-card');
            if (parentCard) {
                if (this.checked) {
                    parentCard.classList.add('selected');
                } else {
                    parentCard.classList.remove('selected');
                }
            }
            clearError('errorServicosEmpresa');
            clearError('errorServicosEvento');
        });
    });

    // ================= SELEÇÃO DE RADIOS (OPÇÃO ÚNICA COM AUTO-AVANÇO) =================
    const allRadios = document.querySelectorAll('.option-card input[type="radio"]');
    allRadios.forEach(radio => {
        radio.addEventListener('change', function () {
            if (this.checked) {
                const groupName = this.name;
                document.querySelectorAll(`input[name="${groupName}"]`).forEach(r => {
                    const c = r.closest('.option-card');
                    if (c) c.classList.remove('selected');
                });

                const parentCard = this.closest('.option-card');
                if (parentCard) parentCard.classList.add('selected');

                if (groupName === 'faturamento') {
                    clearError('errorFaturamento');
                    setTimeout(() => goToStep('8e'), 220);
                } else if (groupName === 'investimento') {
                    clearError('errorInvestimento');
                    setTimeout(() => goToStep('9e'), 220);
                } else if (groupName === 'tipo_evento') {
                    clearError('errorTipoEvento');
                } else if (groupName === 'porte_evento') {
                    clearError('errorPorteEvento');
                }
            }
        });
    });

    // ================= PROGRESSO & NAVEGAÇÃO =================
    function updateProgress(stepId) {
        if (stepId === '1' || stepId === '10') {
            if (formCardProgress) formCardProgress.classList.remove('visible');
        } else {
            if (formCardProgress) formCardProgress.classList.add('visible');
            const currentFlow = FLOW_MAP[selectedSegmento];
            const currentIndex = currentFlow.indexOf(stepId);
            const totalSteps = currentFlow.length - 1; // excluindo etapa final

            if (currentIndex > 0) {
                const percentage = (currentIndex / (totalSteps - 1)) * 100;
                if (cardProgressFill) cardProgressFill.style.width = `${Math.min(percentage, 100)}%`;
            }
        }
    }

    function goToStep(targetStepId) {
        stepCards.forEach(card => card.classList.remove('active'));

        const targetCard = document.querySelector(`.step-card[data-step="${targetStepId}"]`);
        if (targetCard) {
            targetCard.classList.add('active');
            currentStep = targetStepId;
            updateProgress(targetStepId);

            setTimeout(() => {
                const autoFocusInput = targetCard.querySelector('input:not([type="radio"]):not([type="checkbox"]):not([type="hidden"])');
                if (autoFocusInput) autoFocusInput.focus();
                if (window.lucide) lucide.createIcons();
            }, 80);

            if (targetStepId === '10') {
                onSuccessStep();
            }
        }
    }

    function showError(errorId, inputElement) {
        const errorEl = document.getElementById(errorId);
        if (errorEl) errorEl.classList.add('visible');
        if (inputElement) inputElement.focus();
    }

    function clearError(errorId, inputElement) {
        const errorEl = document.getElementById(errorId);
        if (errorEl) errorEl.classList.remove('visible');
    }

    // ================= VALIDAÇÕES POR ETAPA =================
    function validateStep(stepId) {
        switch (stepId) {
            case '1':
                return true;

            case '2': // Nome
                if (!inputNome.value.trim() || inputNome.value.trim().length < 2) {
                    showError('errorNome', inputNome);
                    return false;
                }
                return true;

            case '3': // WhatsApp
                const phoneDigits = inputWhatsapp.value.replace(/\D/g, '');
                if (phoneDigits.length < 10) {
                    showError('errorWhatsapp', inputWhatsapp);
                    return false;
                }
                return true;

            case '4': // Segmento
                const checkedSegmento = document.querySelector('input[name="segmento"]:checked');
                if (!checkedSegmento) {
                    showError('errorSegmento');
                    return false;
                }
                selectedSegmento = checkedSegmento.value;
                return true;

            // -------- RAMO EMPRESA --------
            case '5e': // Instagram Empresa
                if (!inputInstagramEmpresa.value.trim()) {
                    showError('errorInstagramEmpresa', inputInstagramEmpresa);
                    return false;
                }
                return true;

            case '6e': // Serviços Empresa
                const srvEmpSelected = document.querySelectorAll('input[name="servicos_empresa"]:checked');
                if (srvEmpSelected.length === 0) {
                    showError('errorServicosEmpresa');
                    return false;
                }
                return true;

            case '7e': // Faturamento Empresa
                return true;

            case '8e': // Investimento Empresa
                const invSelected = document.querySelector('input[name="investimento"]:checked');
                if (!invSelected) {
                    showError('errorInvestimento');
                    return false;
                }
                return true;

            case '9e': // E-mail Empresa
                const emailEmpVal = inputEmailEmpresa.value.trim();
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailEmpVal || !emailRegex.test(emailEmpVal)) {
                    showError('errorEmailEmpresa', inputEmailEmpresa);
                    return false;
                }
                return true;

            case '10e': // Site Empresa (Opcional)
                return true;

            // -------- RAMO EVENTO --------
            case '5v': // Tipo de Evento
                const tipoEvtSelected = document.querySelector('input[name="tipo_evento"]:checked');
                if (!tipoEvtSelected) {
                    showError('errorTipoEvento');
                    return false;
                }
                return true;

            case '6v': // Serviços do Evento
                const srvEvtSelected = document.querySelectorAll('input[name="servicos_evento"]:checked');
                if (srvEvtSelected.length === 0) {
                    showError('errorServicosEvento');
                    return false;
                }
                return true;

            case '7v': // Data & Duração Evento
                return true;

            case '8v': // Porte & Local do Evento
                const porteSelected = document.querySelector('input[name="porte_evento"]:checked');
                if (!porteSelected) {
                    showError('errorPorteEvento');
                    return false;
                }
                if (!inputLocalEvento.value.trim()) {
                    showError('errorLocalEvento', inputLocalEvento);
                    return false;
                }
                return true;

            case '9v': // E-mail Evento
                const emailEvtVal = inputEmailEvento.value.trim();
                const emailRegexEvt = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailEvtVal || !emailRegexEvt.test(emailEvtVal)) {
                    showError('errorEmailEvento', inputEmailEvento);
                    return false;
                }
                return true;

            default:
                return true;
        }
    }

    // ================= LISTENERS DE BOTÕES =================
    if (btnStart) {
        btnStart.addEventListener('click', () => {
            initNewLeadSession();
            goToStep('2');
        });
    }

    if (btnSkipFaturamento) {
        btnSkipFaturamento.addEventListener('click', () => {
            const checkedRadio = document.querySelector('input[name="faturamento"]:checked');
            if (checkedRadio) checkedRadio.checked = false;
            document.querySelectorAll('input[name="faturamento"]').forEach(r => {
                const c = r.closest('.option-card');
                if (c) c.classList.remove('selected');
            });
            clearError('errorFaturamento');
            goToStep('8e');
        });
    }

    if (btnSkipSiteEmpresa) {
        btnSkipSiteEmpresa.addEventListener('click', () => {
            if (inputSiteEmpresa) inputSiteEmpresa.value = '';
            goToStep('10');
        });
    }

    nextBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const nextStep = this.getAttribute('data-next');
            if (validateStep(currentStep)) {
                if (currentStep === '4') {
                    const nextTarget = selectedSegmento === 'empresa' ? '5e' : '5v';
                    goToStep(nextTarget);
                } else {
                    goToStep(nextStep);
                }
            }
        });
    });

    prevBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const prevStep = this.getAttribute('data-prev');
            goToStep(prevStep);
        });
    });

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (validateStep(currentStep)) {
                goToStep('10');
            }
        });
    }

    // ================= ATALHOS DE TECLADO =================
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            if (currentStep === '1') {
                e.preventDefault();
                initNewLeadSession();
                goToStep('2');
            } else if (['2', '3', '5e', '6e', '7e', '8e', '9e', '5v', '6v', '7v', '8v'].includes(currentStep)) {
                e.preventDefault();
                if (validateStep(currentStep)) {
                    const currentFlow = FLOW_MAP[selectedSegmento];
                    const currentIndex = currentFlow.indexOf(currentStep);
                    if (currentIndex !== -1 && currentIndex + 1 < currentFlow.length) {
                        goToStep(currentFlow[currentIndex + 1]);
                    }
                }
            } else if (currentStep === '10e' || currentStep === '9v') {
                e.preventDefault();
                if (validateStep(currentStep)) {
                    goToStep('10');
                }
            }
        }
    });

    // ================= SUCESSO & WHATSAPP PERSONALIZADO =================
    function onSuccessStep() {
        if (hasTriggeredSuccess) return;
        hasTriggeredSuccess = true;

        const nome = inputNome ? inputNome.value.trim() : 'Cliente';
        const whatsapp = inputWhatsapp ? inputWhatsapp.value.trim() : 'Não informado';

        let msgText = '';

        if (selectedSegmento === 'empresa') {
            const insta = inputInstagramEmpresa ? inputInstagramEmpresa.value.trim().replace(/^@+/, '') : 'Não informado';
            
            const srvs = [];
            document.querySelectorAll('input[name="servicos_empresa"]:checked').forEach(c => srvs.push(c.value));
            const srvsText = srvs.length > 0 ? srvs.join(', ') : 'Não informado';
            
            const fatChecked = document.querySelector('input[name="faturamento"]:checked');
            const faturamento = fatChecked ? fatChecked.value : 'Pular / A combinar';

            const invChecked = document.querySelector('input[name="investimento"]:checked');
            const investimento = invChecked ? invChecked.value : 'Não informado';

            const email = inputEmailEmpresa ? inputEmailEmpresa.value.trim() : 'Não informado';
            const site = inputSiteEmpresa ? (inputSiteEmpresa.value.trim() || 'Não informado') : 'Não informado';

            // Mensagem formatada WhatsApp Empresa
            msgText = 
`Olá! Acabei de responder o Diagnóstico da *Kaldy Digital* para a minha empresa. 🚀

*📋 Dados do Projeto (Empresa):*
👤 *Nome:* ${nome}
📱 *WhatsApp:* ${whatsapp}
📸 *Instagram da Empresa:* @${insta}
🎯 *Serviços de Interesse:* ${srvsText}
📊 *Faturamento Mensal:* ${faturamento}
💰 *Investimento em Anúncios:* ${investimento}
✉️ *E-mail:* ${email}
🌐 *Site:* ${site}

Gostaria de entender a melhor estratégia de posicionamento e tráfego pago para o meu negócio!`;

        } else {
            // RAMO EVENTO
            const tipoEvtChecked = document.querySelector('input[name="tipo_evento"]:checked');
            const tipoEvento = tipoEvtChecked ? tipoEvtChecked.value : 'Não informado';

            const insta = inputInstagramEvento ? (inputInstagramEvento.value.trim().replace(/^@+/, '') || 'Não informado') : 'Não informado';

            const srvs = [];
            document.querySelectorAll('input[name="servicos_evento"]:checked').forEach(c => srvs.push(c.value));
            const srvsText = srvs.length > 0 ? srvs.join(', ') : 'Não informado';

            const dataRaw = inputDataEvento ? inputDataEvento.value : '';
            const dataFmt = dataRaw ? dataRaw.split('-').reverse().join('/') : 'A combinar';

            const durChecked = document.querySelector('input[name="duracao_evento"]:checked');
            const duracao = durChecked ? durChecked.value : 'A combinar';

            const porteChecked = document.querySelector('input[name="porte_evento"]:checked');
            const porte = porteChecked ? porteChecked.value : 'A combinar';

            const local = inputLocalEvento ? inputLocalEvento.value.trim() : 'A combinar';
            const email = inputEmailEvento ? inputEmailEvento.value.trim() : 'Não informado';

            // Mensagem formatada WhatsApp Evento
            msgText = 
`Olá! Acabei de responder o Diagnóstico da *Kaldy Digital* para cobertura de evento. ✨

*🎉 Dados do Evento:*
👤 *Nome do Responsável:* ${nome}
📱 *WhatsApp:* ${whatsapp}
🎈 *Tipo de Evento:* ${tipoEvento}
📸 *Instagram:* @${insta}
🎬 *Profissionais/Serviços:* ${srvsText}
📅 *Data Prevista:* ${dataFmt} (${duracao})
👥 *Porte Estimado:* ${porte}
📍 *Local/Cidade:* ${local}
✉️ *E-mail:* ${email}

Gostaria de verificar a disponibilidade de agenda e solicitar a proposta personalizada!`;
        }

        // Sincronização Opcional
        syncLeadToSheet('100% Concluído');

        // Configura link do WhatsApp
        const encodedMsg = encodeURIComponent(msgText);
        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMsg}`;

        if (whatsappDirectBtn) {
            whatsappDirectBtn.href = whatsappUrl;
        }

        // Confetes
        if (typeof confetti === 'function') {
            confetti({
                particleCount: 75,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#590A16', '#7a1523', '#c59b27', '#25d366']
            });
        }

        if (window.lucide) lucide.createIcons();
    }

    // Inicialização
    updateProgress('1');
    if (window.lucide) lucide.createIcons();
});
