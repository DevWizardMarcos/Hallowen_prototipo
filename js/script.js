

    // ========================================
    // DADOS GLOBAIS (Arrays de imagens)
    // Declarados no topo para evitar ReferenceError
    // ========================================

    // Array com informações das imagens da galeria do concurso
    const galleryImages = [
      {
        src: 'assets/concurso1.PNG',
        title: '🏆 Vencedores do Concurso 2024',
        description: 'Os grandes campeões do concurso de fantasia do ano passado com suas incríveis criações que conquistaram o público e os jurados.'
      },
      {
        src: 'assets/concurso2.PNG',
        title: '🎭 Fantasias Mais Criativas',
        description: 'Uma seleção das fantasias mais originais e criativas que participaram do concurso, mostrando a diversidade e talento dos participantes.'
      },
      {
        src: 'assets/concurso3.PNG',
        title: '🎃 Melhores Momentos do Evento',
        description: 'Registros dos momentos mais marcantes da noite, com toda a atmosfera mágica e assombrada que tornou o evento inesquecível.'
      }
    ];

    // Array para os designs de tatuagem (mesma ordem das miniaturas no carousel)
    // Agora cada item pode ter `src` (miniatura) e `modalSrc` (imagem grande a ser mostrada no modal)
    const tattooDesigns = [
      { src: 'assets/ghost.png', modalSrc: 'assets/moldalFantasma.jpg', title: '👻 Fantasma Assustador', description: 'Design clássico de Halloween com um toque moderno.' },
      { src: 'assets/skull.png', modalSrc: 'assets/ModalCaveira.jpg', title: '💀 Caveira Sombria', description: 'A marca eterna do Halloween em sua pele.' },
      { src: 'assets/bat.png', modalSrc: 'assets/bat.png', title: '🦇 Morcego Noturno', description: 'Símbolo da noite e do mistério.' },
      { src: 'assets/pumpkin.png', modalSrc: 'assets/ModalAbobora.jpg', title: "🎃 Jack O'Lantern", description: 'O clássico símbolo do Halloween.' },
      { src: 'assets/spider.png', modalSrc: 'assets/ModalGato.jpg', title: '🕷️ Gato Salem', description: 'Terror adorável.' },
      { src: 'assets/heart.png', modalSrc: 'assets/heart.png', title: '😈 Coração Diabólico', description: 'O amor tem seu lado sombrio.' }
    ];

    // ========================================
    // VARIÁVEL DE CONTROLE DO CARROSSEL
    // ========================================
    let currentTattooIndex = 0;

    // ========================================
    // FIM DOS DADOS GLOBAIS
    // ========================================

    // Contador Regressivo
    function updateCountdown() {
      // Data do evento: 25 de outubro de 2025 às 17:00
      const eventDate = new Date('2025-10-25T17:00:00').getTime();
      const now = new Date().getTime();
      const distance = eventDate - now;      if (distance < 0) {
        document.querySelector('.countdown-display').innerHTML = '<p style="color: #ff4500; font-size: 1.5rem;">🎃 O EVENTO COMEÇOU! 🎃</p>';
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      document.getElementById('days').textContent = String(days).padStart(2, '0');
      document.getElementById('hours').textContent = String(hours).padStart(2, '0');
      document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
      document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }

    // Atualizar contador a cada segundo
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // ========================================
    // GESTÃO DE ACOMPANHANTES
    // ========================================
    
    // Função para mostrar/ocultar campos de acompanhantes
    document.getElementById('acompanhantes').addEventListener('change', function() {
      const numAcompanhantes = parseInt(this.value);
      const acompanhantesDetails = document.getElementById('acompanhantesDetails');
      const acompanhantesContainer = document.getElementById('acompanhantesContainer');
      
      if (numAcompanhantes > 0) {
        acompanhantesDetails.classList.remove('hidden');
        criarCamposAcompanhantes(numAcompanhantes);
      } else {
        acompanhantesDetails.classList.add('hidden');
        acompanhantesContainer.innerHTML = '';
      }
    });

    // Função para criar campos dinâmicos dos acompanhantes
    function criarCamposAcompanhantes(quantidade) {
      const container = document.getElementById('acompanhantesContainer');
      const acompanhantesExistentes = container.querySelectorAll('.acompanhante-card').length;
      
      // Limpar container se a quantidade mudou
      if (acompanhantesExistentes !== quantidade) {
        container.innerHTML = '';
        
        for (let i = 1; i <= quantidade; i++) {
          const acompanhanteCard = document.createElement('div');
          acompanhanteCard.className = 'acompanhante-card';
          acompanhanteCard.innerHTML = `
            <div class="acompanhante-header">
              <span class="acompanhante-numero">👤 Acompanhante ${i}</span>
            </div>
            
            <div class="acompanhante-form-row">
              <div class="acompanhante-form-group">
                <label for="acomp${i}_nome">Nome Completo *</label>
                <input type="text" id="acomp${i}_nome" name="acomp${i}_nome" 
                       placeholder="Nome do acompanhante" required>
              </div>
              
              <div class="acompanhante-form-group">
                <label for="acomp${i}_telefone">WhatsApp</label>
                <input type="tel" id="acomp${i}_telefone" name="acomp${i}_telefone" 
                       placeholder="(11) 99999-9999">
              </div>
            </div>
            
            <div class="acompanhante-form-row">
              <div class="acompanhante-form-group">
                <label for="acomp${i}_tipo">Você é:</label>
                <select id="acomp${i}_tipo" name="acomp${i}_tipo" required>
                  <option value="">Selecione uma opção</option>
                  <option value="aluno">👨‍🎓 Aluno da Infinity School</option>
                  <option value="visitante">👥 Visitante</option>
                </select>
              </div>
              
              <div class="acompanhante-form-group">
                <label for="acomp${i}_idade">Faixa Etária:</label>
                <select id="acomp${i}_idade" name="acomp${i}_idade" required>
                  <option value="">Selecione a faixa etária</option>
                  <option value="menor">🧒 Menor de idade (até 17 anos)</option>
                  <option value="maior">🧑‍💼 Maior de idade (18+ anos)</option>
                </select>
              </div>
            </div>
          `;
          
          container.appendChild(acompanhanteCard);
        }
      }
    }

    // Função para validar dados dos acompanhantes
    function validarAcompanhantes() {
      const numAcompanhantes = parseInt(document.getElementById('acompanhantes').value);
      
      if (numAcompanhantes === 0) return true;
      
      const erros = [];
      const nomesUtilizados = new Set();
      const telefonesUtilizados = new Set();
      
      // Adicionar dados do usuário principal para verificar duplicatas
      const nomeUsuario = document.getElementById('nome').value.trim().toLowerCase();
      const telefoneUsuario = document.getElementById('telefone').value.trim();
      nomesUtilizados.add(nomeUsuario);
      if (telefoneUsuario) telefonesUtilizados.add(telefoneUsuario);
      
      for (let i = 1; i <= numAcompanhantes; i++) {
        const nome = document.getElementById(`acomp${i}_nome`)?.value.trim();
        const telefone = document.getElementById(`acomp${i}_telefone`)?.value.trim();
        const tipo = document.getElementById(`acomp${i}_tipo`)?.value;
        const idade = document.getElementById(`acomp${i}_idade`)?.value;
        
        // Validações obrigatórias
        if (!nome) {
          erros.push(`📝 Nome do acompanhante ${i} é obrigatório`);
        } else {
          // Validar formato do nome
          if (nome.length < 2) {
            erros.push(`📝 Nome do acompanhante ${i} deve ter pelo menos 2 caracteres`);
          }
          
          // Verificar nomes duplicados
          const nomeLowerCase = nome.toLowerCase();
          if (nomesUtilizados.has(nomeLowerCase)) {
            erros.push(`⚠️ Nome "${nome}" já foi utilizado. Cada pessoa deve ter um nome único`);
          } else {
            nomesUtilizados.add(nomeLowerCase);
          }
        }
        
        if (!tipo) {
          erros.push(`🏫 Tipo do acompanhante ${i} (aluno/visitante) é obrigatório`);
        }
        
        if (!idade) {
          erros.push(`🎂 Faixa etária do acompanhante ${i} é obrigatória`);
        }
        
        // Validar telefone se informado
        if (telefone) {
          // Formato básico de telefone brasileiro
          const telefoneNumeros = telefone.replace(/\D/g, '');
          if (telefoneNumeros.length < 10 || telefoneNumeros.length > 11) {
            erros.push(`📱 Telefone do acompanhante ${i} deve ter formato válido (ex: (11) 99999-9999)`);
          }
          
          // Verificar duplicatas de telefone
          if (telefonesUtilizados.has(telefone)) {
            erros.push(`⚠️ Telefone "${telefone}" já foi utilizado. Cada pessoa deve ter um telefone único`);
          } else {
            telefonesUtilizados.add(telefone);
          }
        }
      }
      
      if (erros.length > 0) {
        alert('❌ Por favor, corrija os seguintes erros:\n\n' + erros.join('\n'));
        return false;
      }
      
      return true;
    }

    // Função para coletar dados dos acompanhantes
    function coletarDadosAcompanhantes() {
      const numAcompanhantes = parseInt(document.getElementById('acompanhantes').value);
      const acompanhantes = [];
      
      for (let i = 1; i <= numAcompanhantes; i++) {
        const nome = document.getElementById(`acomp${i}_nome`)?.value.trim();
        const telefone = document.getElementById(`acomp${i}_telefone`)?.value.trim();
        const tipo = document.getElementById(`acomp${i}_tipo`)?.value;
        const idade = document.getElementById(`acomp${i}_idade`)?.value;
        
        if (nome) { // Só adiciona se tiver nome
          acompanhantes.push({
            nome,
            telefone: telefone || 'Não informado',
            tipo,
            idade
          });
        }
      }
      
      return acompanhantes;
    }

    // Função para validar integridade geral do formulário
    function validarIntegridadeFormulario(formData) {
      // Verificar se o número de acompanhantes corresponde aos dados coletados
      const numAcompanhantesDeclarado = parseInt(formData.acompanhantes);
      const numAcompanhantesColetados = formData.dadosAcompanhantes ? formData.dadosAcompanhantes.length : 0;
      
      if (numAcompanhantesDeclarado > 0 && numAcompanhantesColetados !== numAcompanhantesDeclarado) {
        return {
          valido: false,
          mensagem: `Inconsistência nos dados: Você declarou ${numAcompanhantesDeclarado} acompanhante(s), mas apenas ${numAcompanhantesColetados} foram preenchidos completamente.`
        };
      }
      
      // Verificar se está tentando registrar blusa sem tamanho
      if (formData.querCamisa) {
        const tamanhoSelecionado = document.querySelector('input[name="tamanho"]:checked');
        if (!tamanhoSelecionado) {
          return {
            valido: false,
            mensagem: 'Você selecionou que quer a blusa, mas não escolheu o tamanho!'
          };
        }
      }
      
      // Validar caracteres suspeitos ou maliciosos
      const camposTexto = [formData.nome];
      if (formData.dadosAcompanhantes) {
        formData.dadosAcompanhantes.forEach(acomp => {
          camposTexto.push(acomp.nome);
        });
      }
      
      const caracteresProibidos = /<script|javascript:|data:|vbscript:|onload|onerror|onclick/i;
      for (const campo of camposTexto) {
        if (caracteresProibidos.test(campo)) {
          return {
            valido: false,
            mensagem: 'Caracteres não permitidos detectados nos dados. Por favor, use apenas texto normal.'
          };
        }
      }
      
      // Verificar tentativa de bypass (números absurdos)
      if (numAcompanhantesDeclarado > 5) {
        return {
          valido: false,
          mensagem: 'Número de acompanhantes muito alto. Entre em contato conosco para grupos maiores que 5 pessoas.'
        };
      }
      
      return { valido: true };
    }

    // Mostrar/ocultar opções de tamanho da camisa
    document.getElementById('querCamisa').addEventListener('change', function() {
      const camisaDetails = document.getElementById('camisaDetails');
      if (this.checked) {
        camisaDetails.classList.remove('hidden');
      } else {
        camisaDetails.classList.add('hidden');
        // Desmarcar todas as opções de tamanho
        document.querySelectorAll('input[name="tamanho"]').forEach(radio => {
          radio.checked = false;
        });
        // Resetar quantidade
        document.getElementById('quantidadeCamisas').value = '1';
      }
    });

    // Formatação automática de telefone
    function formatarTelefone(input) {
      let valor = input.value.replace(/\D/g, '');
      
      if (valor.length <= 10) {
        valor = valor.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
      } else {
        valor = valor.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
      }
      
      input.value = valor;
    }

    // Aplicar formatação ao campo telefone principal
    document.getElementById('telefone').addEventListener('input', function() {
      formatarTelefone(this);
    });

    // Aplicar formatação aos campos de telefone dos acompanhantes (delegação de eventos)
    document.getElementById('acompanhantesContainer').addEventListener('input', function(e) {
      if (e.target && e.target.type === 'tel') {
        formatarTelefone(e.target);
      }
    });

    // Hover effect da Ângella Maris com transição/fade e pré-carregamento (fallback se preload falhar)
    document.addEventListener('DOMContentLoaded', function() {
      const angella = document.getElementById('angellaImage');
      if (!angella) return;

      const originalSrc = angella.getAttribute('src');
      const hoverSrc = angella.getAttribute('data-hover-src');

      // Função utilitária para pré-carregar imagem
      function preload(src, cb) {
        const img = new Image();
        img.onload = () => cb(null, src);
        img.onerror = (e) => cb(e || new Error('failed to load'));
        img.src = src;
      }

      // Se não houver hoverSrc, não faz nada
      if (!hoverSrc) return;

      // Função que aplica os handlers (usada tanto no sucesso quanto no fallback)
      function applyHoverHandlers() {
        angella.style.cursor = 'pointer';

        let isHover = false;

        function swapTo(src) {
          angella.classList.add('fading');
          setTimeout(() => {
            angella.src = src;
            angella.classList.remove('fading');
          }, 160);
        }

        angella.addEventListener('mouseenter', function() {
          if (isHover) return;
          isHover = true;
          swapTo(hoverSrc);
        });

        angella.addEventListener('mouseleave', function() {
          if (!isHover) return;
          isHover = false;
          swapTo(originalSrc);
        });
      }

      // Tentar pré-carregar; mesmo se falhar, aplicamos os handlers (fallback)
      preload(hoverSrc, function(err) {
        if (err) console.warn('Imagem de hover não pôde ser pré-carregada, aplicando fallback:', hoverSrc);
        applyHoverHandlers();
      });
    });

    // Detectar mudança de faixa etária e atualizar mensagem do Open Bar
    document.getElementById('faixa-etaria').addEventListener('change', function() {
      const faixaEtaria = this.value;
      const openbarDefault = document.querySelector('.openbar-default');
      const openbarAdult = document.querySelector('.openbar-adult');
      const openbarMinor = document.querySelector('.openbar-minor');
      
      if (faixaEtaria === 'maior') {
        // Maior de 18 - mostrar mensagem especial com bebidas alcoólicas
        openbarDefault.classList.add('hidden');
        openbarMinor.classList.add('hidden');
        openbarAdult.classList.remove('hidden');
      } else if (faixaEtaria === 'menor') {
        // Menor de 18 - mostrar mensagem apenas com bebidas não alcoólicas
        openbarDefault.classList.add('hidden');
        openbarAdult.classList.add('hidden');
        openbarMinor.classList.remove('hidden');
      } else {
        // Nenhuma selecionada - mostrar mensagem padrão
        openbarAdult.classList.add('hidden');
        openbarMinor.classList.add('hidden');
        openbarDefault.classList.remove('hidden');
      }
    });

    // Submissão do formulário unificado
    document.getElementById('hallowinityForm').addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Coletando dados básicos do formulário
      const formData = {
        nome: document.getElementById('nome').value.trim(),
        telefone: document.getElementById('telefone').value.trim(),
        acompanhantes: document.getElementById('acompanhantes').value,
        tipoParticipante: document.getElementById('tipo-participante').value,
        faixaEtaria: document.getElementById('faixa-etaria').value,
        querCamisa: document.getElementById('querCamisa').checked,
        participarConcurso: document.getElementById('participarConcurso').checked
      };

      // Validações básicas de segurança
      const errosBasicos = [];
      
      if (!formData.nome || formData.nome.length < 2) {
        errosBasicos.push('📝 Nome deve ter pelo menos 2 caracteres');
      }
      
      if (!formData.telefone) {
        errosBasicos.push('📱 WhatsApp é obrigatório');
      } else {
        const telefoneNumeros = formData.telefone.replace(/\D/g, '');
        if (telefoneNumeros.length < 10 || telefoneNumeros.length > 11) {
          errosBasicos.push('📱 WhatsApp deve ter formato válido (ex: (11) 99999-9999)');
        }
      }
      
      if (errosBasicos.length > 0) {
        alert('❌ Por favor, corrija os erros básicos:\n\n' + errosBasicos.join('\n'));
        return;
      }

      // Validar campos obrigatórios de elegibilidade
      if (!formData.tipoParticipante || !formData.faixaEtaria) {
        alert('Por favor, preencha se você é aluno ou visitante e sua faixa etária!');
        return;
      }

      // Validar dados dos acompanhantes
      if (!validarAcompanhantes()) {
        return;
      }

      // Coletar dados dos acompanhantes
      formData.dadosAcompanhantes = coletarDadosAcompanhantes();

      // Validação anti-spam e integridade dos dados
      const validacaoIntegridade = validarIntegridadeFormulario(formData);
      if (!validacaoIntegridade.valido) {
        alert('⚠️ ' + validacaoIntegridade.mensagem);
        return;
      }

      // Se quer camisa, coletar o tamanho e quantidade
      if (formData.querCamisa) {
        const tamanhoSelecionado = document.querySelector('input[name="tamanho"]:checked');
        if (!tamanhoSelecionado) {
          alert('Por favor, selecione o tamanho da camisa!');
          return;
        }
        formData.tamanho = tamanhoSelecionado.value;
        formData.quantidadeCamisas = document.getElementById('quantidadeCamisas').value;
      }

      // Se vai participar do concurso, armazenar no localStorage para votação
      if (formData.participarConcurso) {
        const contestParticipant = {
          id: Date.now(),
          nome: formData.nome,
          telefone: formData.telefone,
          tipo: formData.tipoParticipante,
          idade: formData.faixaEtaria,
          votos: 0,
          dataRegistro: new Date().toISOString()
        };

        let contestParticipants = JSON.parse(localStorage.getItem('contestParticipants')) || [];
        const existente = contestParticipants.find(p => 
          p.telefone === formData.telefone || p.nome.toLowerCase() === formData.nome.toLowerCase()
        );

        if (!existente) {
          contestParticipants.push(contestParticipant);
          localStorage.setItem('contestParticipants', JSON.stringify(contestParticipants));
        }
      }
      
      // Função para enviar para WhatsApp
      function enviarParaWhatsApp(tipo) {
        // Construindo mensagem completa para WhatsApp
        let mensagem = `🎃 *INSCRIÇÃO COMPLETA HALLOWINITY 2025* 🎃\n\n`;
        mensagem += `👤 *Nome:* ${formData.nome}\n`;
        mensagem += `📱 *WhatsApp:* ${formData.telefone}\n`;
        mensagem += `👥 *Acompanhantes:* ${formData.acompanhantes}\n\n`;
        
        // Dados dos acompanhantes (se houver)
        if (formData.dadosAcompanhantes && formData.dadosAcompanhantes.length > 0) {
          mensagem += `👥 *DADOS DOS ACOMPANHANTES:*\n`;
          formData.dadosAcompanhantes.forEach((acomp, index) => {
            mensagem += `\n🧑‍🤝‍🧑 *Acompanhante ${index + 1}:*\n`;
            mensagem += `   • Nome: ${acomp.nome}\n`;
            mensagem += `   • WhatsApp: ${acomp.telefone}\n`;
            mensagem += `   • Tipo: ${acomp.tipo === 'aluno' ? '👨‍🎓 Aluno da Infinity School' : '👥 Visitante'}\n`;
            mensagem += `   • Idade: ${acomp.idade === 'menor' ? '🧒 Menor de idade' : '🧑‍💼 Maior de idade'}\n`;
          });
          mensagem += `\n`;
        }
        
        // Informações de elegibilidade
        mensagem += `🏫 *Você é:* ${formData.tipoParticipante === 'aluno' ? '👨‍🎓 Aluno da Infinity School' : '👥 Visitante'}\n`;
        mensagem += `🎂 *Faixa Etária:* ${formData.faixaEtaria === 'menor' ? '🧒 Menor de idade' : '🧑‍💼 Maior de idade'}\n\n`;
        
        // Informações da blusa
        if (formData.querCamisa) {
          mensagem += `👕 *BLUSA OFICIAL:* Sim ✅\n`;
          mensagem += `📏 *Tamanho:* ${formData.tamanho}\n`;
          mensagem += `🔢 *Quantidade:* ${formData.quantidadeCamisas}\n\n`;
        } else {
          mensagem += `👕 *Blusa Oficial:* Não\n\n`;
        }

        // Informações do concurso
        if (formData.participarConcurso) {
          mensagem += `🏆 *CONCURSO DE FANTASIA:* Sim ✅\n`;
          mensagem += `� *Cadastrado para concorrer aos prêmios!*\n\n`;
        } else {
          mensagem += `🏆 *Concurso de Fantasia:* Não\n\n`;
        }

        // Informações do evento
        mensagem += `🎉 *DESTAQUES DO EVENTO:*\n`;
        
        // Open Bar - mensagem personalizada baseada na idade
        if (formData.faixaEtaria === 'maior') {
          mensagem += `🍹 *OPEN BAR COMPLETO* - Bebidas alcoólicas e não alcoólicas liberadas! 🍻\n`;
        } else if (formData.faixaEtaria === 'menor') {
          mensagem += `🧃 *OPEN BAR* - Sucos, refrigerantes e bebidas não alcoólicas liberadas!\n`;
        } else {
          mensagem += `🍹 *OPEN BAR* - Bebidas liberadas durante todo o evento!\n`;
        }
        
        mensagem += `🎤 *Palestras Técnicas* com profissionais da área de tecnologia\n`;
        mensagem += `🎭 *Experiências únicas* - Música, arte, networking e muito mais!\n`;
        mensagem += `🎃 *Decoração temática* e ambiente imersivo de Halloween\n`;
        mensagem += `📸 *Fotografia profissional* para registrar seu momento\n\n`;
        
        mensagem += `📍 *DATA E LOCAL:*\n`;
        mensagem += `📅 25 de Outubro de 2025\n`;
        mensagem += `🕔 17:00\n`;
        mensagem += `📍 Av. do Contorno, 6480 - Savassi, BH\n`;
        mensagem += `🏢 Infinity School Savassi\n\n`;
        
        // Tipo de inscrição
        if (formData.querCamisa && formData.participarConcurso) {
          mensagem += `📋 *INSCRIÇÃO COMPLETA* - Evento + Blusa + Concurso`;
        } else if (formData.querCamisa) {
          mensagem += `💰 *VENDAS DE BLUSA* - Interesse em adquirir`;
        } else if (formData.participarConcurso) {
          mensagem += `🏆 *INSCRIÇÃO* - Evento + Concurso de Fantasia`;
        } else {
          mensagem += `📝 *INSCRIÇÃO BÁSICA* - Participação no evento`;
        }
        
        // Codificando mensagem para URL
        const mensagemCodificada = encodeURIComponent(mensagem);
        
        // ⚠️ CONFIGURAÇÃO DOS NÚMEROS DE WHATSAPP
        let numeroWhatsApp;
        
        if (formData.querCamisa) {
          // Números para pessoas que querem a blusa
          const numerosBlusas = [
            '5538984096878', // (38) 8409-6878
            '5531987927056'  // (1) 7168-4330
          ];
          // Alternar entre os dois números para distribuir as mensagens
          const indiceNumero = Math.floor(Math.random() * numerosBlusas.length);
          numeroWhatsApp = numerosBlusas[indiceNumero];
          console.log(`📱 Pessoa quer blusa - Usando número ${indiceNumero + 1}: ${numeroWhatsApp}`);
        } else {
          // Número padrão para inscrições sem blusa
          numeroWhatsApp = '5531987927056'; // ⚠️ NÚMERO DE EXEMPLO - ALTERAR!
          console.log(`📱 Inscrição sem blusa - Usando número padrão: ${numeroWhatsApp}`);
        }
        
        // Validar formato do número brasileiro
        function validarNumero(numero) {
          // Número brasileiro deve ter 13 dígitos: 55 + DDD + 9 + 8 dígitos
          const regex = /^55\d{2}9\d{8}$/;
          return regex.test(numero);
        }
        
        if (!validarNumero(numeroWhatsApp)) {
          console.error('⚠️ ERRO: Número de telefone inválido:', numeroWhatsApp);
          console.error('Formato esperado: 55[DDD]9[8 dígitos] (Ex: 5531987927056)');
          alert('ERRO TÉCNICO: Número de WhatsApp não configurado corretamente.\n\nContacte o desenvolvedor para configurar o número correto.');
          return;
        }
        
        console.log('✅ Número validado:', numeroWhatsApp);
        
        // Função para criar URLs válidas e testadas
        function criarURLsWhatsApp(numero, mensagem) {
          // URLs testadas e validadas
          const urls = {
            web: [
              // URL principal do WhatsApp Web (mais confiável)
              `https://web.whatsapp.com/send?phone=${numero}&text=${encodeURIComponent(mensagem)}`,
              // Fallback universal que funciona em ambos
              `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`
            ],
            mobile: [
              // URL do wa.me (funciona em mobile e desktop)
              `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`
            ]
          };
          
          // Validar se as URLs estão bem formadas
          urls.web.forEach((url, index) => {
            try {
              new URL(url);
              console.log(`✅ URL Web ${index + 1} válida:`, url.substring(0, 50) + '...');
            } catch (e) {
              console.error(`❌ URL Web ${index + 1} inválida:`, url);
            }
          });
          
          return urls;
        }
        
        const urlsWhatsApp = criarURLsWhatsApp(numeroWhatsApp, mensagem);
        const urlsParaTentar = urlsWhatsApp[tipo] || urlsWhatsApp.mobile;
        
        // Debug: mostrar URLs que serão tentadas
        console.log(`📱 Tentando abrir ${tipo.toUpperCase()}:`, urlsParaTentar.length, 'URLs disponíveis');
        
        // Redirecionamento inteligente com fallback robusto
        function tentarAbrir(urls, indice = 0) {
          if (indice >= urls.length) {
            console.error('❌ Todas as tentativas falharam');
            alert('Não foi possível abrir o WhatsApp automaticamente.\n\nPor favor:\n1. Verifique se tem WhatsApp instalado\n2. Tente copiar o número: ' + numeroWhatsApp.replace(/^55/, '+55 ').replace(/(\d{2})(\d{9})/, '($1) $2').replace(/(\d{5})(\d{4})$/, '$1-$2'));
            return;
          }
          
          const urlAtual = urls[indice];
          console.log(`🔄 Tentativa ${indice + 1}/${urls.length}:`, urlAtual.substring(0, 60) + '...');
          
          try {
            const janela = window.open(urlAtual, '_blank');
            
            if (!janela) {
              console.log('🚫 Popup bloqueado, tentando próxima...');
              setTimeout(() => tentarAbrir(urls, indice + 1), 500);
              return;
            }
            
            // Para WhatsApp Web, aguardar carregamento
            if (tipo === 'web' && indice === 0) {
              setTimeout(() => {
                try {
                  if (janela.closed) {
                    console.log('📱 WhatsApp Web fechou, usuário pode ter trocado para app');
                  } else if (janela.location.href === 'about:blank') {
                    console.log('⏳ WhatsApp Web não carregou, tentando fallback...');
                    janela.close();
                    tentarAbrir(urls, indice + 1);
                  } else {
                    console.log('✅ WhatsApp Web carregou com sucesso');
                  }
                } catch (e) {
                  // Erro de CORS indica que o WhatsApp carregou (comportamento esperado)
                  console.log('✅ WhatsApp redirecionou com sucesso');
                }
              }, 2000);
            } else {
              console.log('✅ WhatsApp Mobile aberto com sucesso');
            }
            
          } catch (error) {
            console.error('❌ Erro ao abrir URL:', error);
            setTimeout(() => tentarAbrir(urls, indice + 1), 500);
          }
        }
        
        tentarAbrir(urlsParaTentar);
        
        // Feedback visual
        const submitBtn = document.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        const tipoTexto = tipo === 'web' ? 'WhatsApp Web' : 'WhatsApp Mobile';
        
        // Mostrar qual número está sendo usado
        let feedbackTexto;
        if (formData.querCamisa) {
          const numeroFormatado = numeroWhatsApp.replace(/^55/, '+55 ').replace(/(\d{2})(\d{9})/, '($1) $2').replace(/(\d{5})(\d{4})$/, '$1-$2');
          feedbackTexto = `✅ Enviando para vendas: ${numeroFormatado}`;
        } else {
          feedbackTexto = `✅ Redirecionando para ${tipoTexto}...`;
        }
        
        submitBtn.textContent = feedbackTexto;
        submitBtn.style.background = '#25D366';
        
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.style.background = 'linear-gradient(45deg, #b30000, #e60000)';
        }, 4000); // Aumentei para 4 segundos para dar tempo de ler o número
      }

      // Ocultar botão principal e mostrar opções do WhatsApp
      const submitBtn = document.querySelector('.submit-btn');
      const whatsappOptions = document.querySelector('.whatsapp-options');
      const deviceSuggestion = document.getElementById('device-suggestion');
      
      // Detectar tipo de dispositivo
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      if (isMobile) {
        deviceSuggestion.textContent = '💡 Recomendado: WhatsApp Mobile para melhor experiência';
        // Destacar botão mobile
        document.querySelector('[data-type="mobile"]').style.background = 'linear-gradient(45deg, #1fa855, #0a6b5d)';
        document.querySelector('[data-type="mobile"]').style.transform = 'scale(1.05)';
      } else {
        deviceSuggestion.textContent = '💡 Recomendado: WhatsApp Web para computadores';
        // Destacar botão web
        document.querySelector('[data-type="web"]').style.background = 'linear-gradient(45deg, #1fa855, #0a6b5d)';
        document.querySelector('[data-type="web"]').style.transform = 'scale(1.05)';
      }
      
      submitBtn.style.display = 'none';
      whatsappOptions.style.display = 'block';
      
      // Adicionar eventos aos botões do WhatsApp
      document.querySelectorAll('.whatsapp-btn').forEach(btn => {
        btn.addEventListener('click', function() {
          const tipo = this.getAttribute('data-type');
          enviarParaWhatsApp(tipo);
          
          // Restaurar estado original após 3 segundos
          setTimeout(() => {
            submitBtn.style.display = 'block';
            whatsappOptions.style.display = 'none';
          }, 3000);
        });
      });

      // Adicionar evento ao botão voltar
      document.querySelector('.back-btn').addEventListener('click', function() {
        submitBtn.style.display = 'block';
        whatsappOptions.style.display = 'none';
      });
    });

    // Máscara para telefone
    document.getElementById('telefone').addEventListener('input', function() {
      let value = this.value.replace(/\D/g, '');
      value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
      value = value.replace(/(\d)(\d{4})$/, '$1-$2');
      this.value = value;
    });

    // Funções do Modal da Blusa
    function openShirtModal(shirtNumber = 1) {
      // Array com informações das blusas
      const shirts = [
        {
          image: 'assets/blusa1.png',
          title: '🎃 Hallowinity Edition 2025',
          subtitle: 'Coleção Oficial do Evento',
          description: 'Design exclusivo criado especialmente para o Hallowinity 2025'
        },
        {
          image: 'assets/blusa2.png',
          title: '👻 Modelo Premium 2025',
          subtitle: 'Edição Especial do Evento',
          description: 'Camisa premium com design moderno e elegante'
        },
        {
          image: 'assets/blusa3.png',
          title: '🦇 Dark Edition 2025',
          subtitle: 'Coleção Exclusiva',
          description: 'Design exclusivo com elementos sombrios e temáticos'
        }
      ];

      // Validar índice (1, 2, 3 para blusa 1, 2, 3)
      const index = Math.min(Math.max(shirtNumber - 1, 0), shirts.length - 1);
      const shirt = shirts[index];

      // Atualizar modal com a blusa selecionada
      document.getElementById('shirtImage').src = shirt.image;
      document.getElementById('shirtTitle').textContent = shirt.title;
      document.getElementById('shirtProductTitle').textContent = shirt.title;
      document.getElementById('shirtSubtitle').textContent = shirt.subtitle;

      document.getElementById('shirtModal').style.display = 'block';
      document.body.style.overflow = 'hidden';
    }

    function closeShirtModal() {
      document.getElementById('shirtModal').style.display = 'none';
      document.body.style.overflow = 'auto';
    }

    // Fechar modal clicando fora
    window.onclick = function(event) {
      const modal = document.getElementById('shirtModal');
      if (event.target === modal) {
        closeShirtModal();
      }
    }

    /* == Concurso de Fantasia - Lógica JS == */
    (function() {
      const STORAGE_KEY = 'hallowinity_contest_participants_v1';

      function carregarParticipantes() {
        try {
          const raw = localStorage.getItem(STORAGE_KEY);
          return raw ? JSON.parse(raw) : [];
        } catch (e) {
          console.error('Erro ao carregar participantes:', e);
          return [];
        }
      }

      function salvarParticipantes(list) {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
        } catch (e) {
          console.error('Erro ao salvar participantes:', e);
        }
      }

      function atualizarContadores() {
        const participants = carregarParticipantes();
        const totalParticipants = participants.length;
        const totalVotes = participants.reduce((s, p) => s + (p.votes || 0), 0);
        document.getElementById('totalParticipants').textContent = totalParticipants;
        document.getElementById('totalVotes').textContent = totalVotes;
      }

      function criarLista() {
        const participants = carregarParticipantes();
        const listEl = document.getElementById('participantsList');
        listEl.innerHTML = '';

        participants.forEach((p, idx) => {
          const li = document.createElement('li');
          li.className = 'participant-item';

          const meta = document.createElement('div');
          meta.className = 'participant-meta';
          const nameEl = document.createElement('div');
          nameEl.className = 'participant-name';
          nameEl.textContent = p.name;
          const phoneEl = document.createElement('div');
          phoneEl.className = 'participant-phone';
          phoneEl.textContent = p.phone;
          meta.appendChild(nameEl);
          meta.appendChild(phoneEl);

          const actions = document.createElement('div');
          actions.style.display = 'flex';
          actions.style.alignItems = 'center';

          const voteBtn = document.createElement('button');
          voteBtn.className = 'vote-btn';
          voteBtn.textContent = 'Votar';
          voteBtn.title = 'Votar neste participante';
          voteBtn.addEventListener('click', function() {
            votar(idx);
          });

          const votesBadge = document.createElement('span');
          votesBadge.className = 'votes-count';
          votesBadge.textContent = p.votes || 0;

          actions.appendChild(voteBtn);
          actions.appendChild(votesBadge);

          li.appendChild(meta);
          li.appendChild(actions);
          listEl.appendChild(li);
        });
      }

      function cadastrarParticipante(name, phone) {
        if (!name || !phone) return { ok: false, error: 'Nome e telefone obrigatórios' };
        const participants = carregarParticipantes();
        // evitar duplicatas exatas por nome+telefone
        const exists = participants.some(p => p.name.trim().toLowerCase() === name.trim().toLowerCase() && p.phone.replace(/\D/g,'') === phone.replace(/\D/g,''));
        if (exists) return { ok: false, error: 'Participante já cadastrado' };
        const novo = { name: name.trim(), phone: phone.trim(), votes: 0 };
        participants.push(novo);
        salvarParticipantes(participants);
        criarLista();
        atualizarContadores();
        return { ok: true };
      }

      function votar(index) {
        const participants = carregarParticipantes();
        if (!participants[index]) return;
        participants[index].votes = (participants[index].votes || 0) + 1;
        salvarParticipantes(participants);
        criarLista();
        atualizarContadores();
      }

      // Handlers do formulário
      document.getElementById('contestForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const nome = document.getElementById('contestNome').value;
        const telefone = document.getElementById('contestTelefone').value;
        const res = cadastrarParticipante(nome, telefone);
        if (!res.ok) {
          alert(res.error);
          return;
        }
        // limpar campos
        document.getElementById('contestNome').value = '';
        document.getElementById('contestTelefone').value = '';
        // feedback simples
        alert('Participante cadastrado com sucesso!');
      });

      // Inicialização
      criarLista();
      atualizarContadores();
    })();

    // ========================================
    // SISTEMA DE ABAS
    // ========================================
    function showTab(tabName) {
      // Esconder todas as abas
      const tabPanels = document.querySelectorAll('.tab-panel');
      tabPanels.forEach(panel => {
        panel.classList.remove('active');
      });

      // Remover classe active de todos os botões
      const tabButtons = document.querySelectorAll('.tab-btn');
      tabButtons.forEach(button => {
        button.classList.remove('active');
      });

      // Mostrar a aba selecionada
      const selectedPanel = document.getElementById(tabName);
      if (selectedPanel) {
        selectedPanel.classList.add('active');
      }

      // Marcar o botão correspondente como ativo
      const selectedButton = document.querySelector(`[onclick="showTab('${tabName}')"]`);
      if (selectedButton) {
        selectedButton.classList.add('active');
      }
    }

    // ========================================
    // CONCURSO DE FANTASIA
    // ========================================

    // Array para armazenar participantes do concurso
    let contestParticipants = JSON.parse(localStorage.getItem('contestParticipants')) || [];
    let contestVotes = JSON.parse(localStorage.getItem('contestVotes')) || {};

    // Função para cadastrar participante no concurso
    function registerContestant(nome, telefone, tipo, idade, fantasia = '') {
      // Verificar se já existe
      const existente = contestParticipants.find(p => 
        p.telefone === telefone || p.nome.toLowerCase() === nome.toLowerCase()
      );

      if (existente) {
        return { success: false, message: 'Participante já cadastrado!' };
      }

      // Adicionar novo participante
      const participant = {
        id: Date.now(),
        nome: nome,
        telefone: telefone,
        tipo: tipo,
        idade: idade,
        fantasia: fantasia,
        votos: 0,
        dataRegistro: new Date().toISOString()
      };

      contestParticipants.push(participant);
      localStorage.setItem('contestParticipants', JSON.stringify(contestParticipants));
      
      updateContestDisplay();
      return { success: true, message: 'Participante cadastrado com sucesso!' };
    }

    // Função para votar em um participante
    function voteForParticipant(participantId) {
      const voterKey = 'voted_' + Date.now(); // Simula controle de votação
      
      if (localStorage.getItem(voterKey)) {
        alert('Você já votou!');
        return;
      }

      const participant = contestParticipants.find(p => p.id === participantId);
      if (participant) {
        participant.votos++;
        localStorage.setItem('contestParticipants', JSON.stringify(contestParticipants));
        localStorage.setItem(voterKey, 'true');
        updateContestDisplay();
        alert(`Voto computado para ${participant.nome}!`);
      }
    }

    // Função para atualizar a exibição do concurso
    function updateContestDisplay() {
      const participantsList = document.getElementById('participants-list');
      const totalParticipants = document.getElementById('total-participants');
      const totalVotes = document.getElementById('total-votes');

      // Atualizar contadores
      totalParticipants.textContent = contestParticipants.length;
      
      const totalVotesCount = contestParticipants.reduce((sum, p) => sum + p.votos, 0);
      totalVotes.textContent = totalVotesCount;

      // Ordenar por votos (decrescente)
      const sortedParticipants = [...contestParticipants].sort((a, b) => b.votos - a.votos);

      // Limpar lista
      participantsList.innerHTML = '';

      if (sortedParticipants.length === 0) {
        participantsList.innerHTML = `
          <li class="no-participants">
            <p>🎭 Nenhum participante cadastrado ainda</p>
            <p>Seja o primeiro a se inscrever!</p>
          </li>
        `;
        return;
      }

      // Adicionar participantes
      sortedParticipants.forEach((participant, index) => {
        const li = document.createElement('li');
        li.className = 'participant-item';
        
        const positionEmoji = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '🎭';
        const tipoEmoji = participant.tipo === 'aluno' ? '👨‍🎓' : '👥';
        const idadeEmoji = participant.idade === 'menor' ? '🧒' : '🧑‍💼';
        
        li.innerHTML = `
          <div class="participant-meta">
            <div class="participant-name">
              ${positionEmoji} ${participant.nome} ${tipoEmoji} ${idadeEmoji}
            </div>
            <div class="participant-phone">${participant.telefone}</div>
            <div class="participant-details" style="color: #ff7a00; font-size: 0.8rem;">
              ${participant.tipo === 'aluno' ? 'Aluno' : 'Visitante'} • ${participant.idade === 'menor' ? 'Menor de idade' : 'Maior de idade'}
            </div>
            ${participant.fantasia ? `<div class="participant-fantasy" style="color: #ff7a00; font-size: 0.8rem; font-style: italic;">🎭 ${participant.fantasia}</div>` : ''}
          </div>
          <div style="display: flex; align-items: center; gap: 10px;">
            <button class="vote-btn" onclick="voteForParticipant(${participant.id})">
              👍 Votar
            </button>
            <span class="votes-count">${participant.votos} votos</span>
          </div>
        `;
        
        participantsList.appendChild(li);
      });
    }

    // Event listener para o formulário do concurso
    document.addEventListener('DOMContentLoaded', function() {
      const contestForm = document.getElementById('contestForm');
      
      if (contestForm) {
        contestForm.addEventListener('submit', function(e) {
          e.preventDefault();
          
          const nome = document.getElementById('contest-nome').value.trim();
          const telefone = document.getElementById('contest-telefone').value.trim();
          const tipo = document.getElementById('contest-tipo').value;
          const idade = document.getElementById('contest-idade').value;
          const fantasia = document.getElementById('contest-fantasia').value.trim();

          if (!nome || !telefone || !tipo || !idade) {
            alert('Por favor, preencha todos os campos obrigatórios!');
            return;
          }

          const result = registerContestant(nome, telefone, tipo, idade, fantasia);
          
          if (result.success) {
            // Limpar formulário
            contestForm.reset();
            
            // Enviar para WhatsApp
            const message = `🏆 *CADASTRO CONCURSO DE FANTASIA* 🏆\n\n` +
                           `👤 *Nome:* ${nome}\n` +
                           `📱 *Telefone:* ${telefone}\n` +
                           `🏫 *Tipo:* ${tipo === 'aluno' ? 'Aluno da Infinity School' : 'Visitante'}\n` +
                           `🎂 *Idade:* ${idade === 'menor' ? 'Menor de idade' : 'Maior de idade'}\n` +
                           `${fantasia ? `🎭 *Fantasia:* ${fantasia}\n` : ''}` +
                           `\n🎃 Cadastro realizado para o Concurso de Fantasia Hallowinity 2025!`;
            
            const encodedMessage = encodeURIComponent(message);
            const whatsappURL = `https://wa.me/5538984096878?text=${encodedMessage}`;
            
            // Confirmar envio
            if (confirm('Cadastro realizado com sucesso! Deseja enviar confirmação por WhatsApp?')) {
              window.open(whatsappURL, '_blank');
            }
          } else {
            alert(result.message);
          }
        });
      }

      // Inicializar display do concurso
      updateContestDisplay();
    });

    // ========================================
    // CARROSSEL DO CONCURSO DE FANTASIA
    // ========================================
    let currentSlideIndex = 0;
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    const totalSlides = slides.length;

    // Função para mostrar slide específico
    function showSlide(index) {
      // Remover active de todos os slides e indicadores
      slides.forEach(slide => slide.classList.remove('active'));
      indicators.forEach(indicator => indicator.classList.remove('active'));
      
      // Adicionar active ao slide e indicador atual
      if (slides[index]) {
        slides[index].classList.add('active');
      }
      if (indicators[index]) {
        indicators[index].classList.add('active');
      }
      
      currentSlideIndex = index;
    }

    // Função para próximo slide
    function nextSlide() {
      const nextIndex = (currentSlideIndex + 1) % totalSlides;
      showSlide(nextIndex);
    }

    // Função para slide anterior
    function previousSlide() {
      const prevIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
      showSlide(prevIndex);
    }

    // Função para ir para slide específico
    function currentSlide(index) {
      showSlide(index - 1); // index começa em 1, array em 0
    }

    // Auto-play do carrossel (opcional)
    function startCarouselAutoPlay() {
      setInterval(nextSlide, 5000); // Muda slide a cada 5 segundos
    }

    // Inicializar carrossel quando o DOM estiver carregado
    document.addEventListener('DOMContentLoaded', function() {
      // Inicializar o primeiro slide
      if (slides.length > 0) {
        showSlide(0);
        // Iniciar auto-play após 3 segundos
        setTimeout(startCarouselAutoPlay, 3000);
      }
    });

    // ========================================
    // MODAL DA GALERIA DE FOTOS
    // ========================================
    // (Arrays galleryImages e tattooDesigns já estão declarados no topo do arquivo)

    // Função para abrir modal de tatuagem usando o modal de imagem existente
    function openTattooModal(index) {
      currentTattooIndex = index;
      updateTattooModal();
    }

    // Função para atualizar o modal com a tatuagem atual
    function updateTattooModal() {
      const data = tattooDesigns[currentTattooIndex];
      if (!data) return;
      const modalImg = document.getElementById('modalImage');
      const titleEl = document.getElementById('imageTitle');
      const descEl = document.getElementById('imageDescription');

      // Se houver `modalSrc`, usar essa imagem maior; caso contrário usar `src`
      modalImg.src = data.modalSrc || data.src;
      modalImg.alt = data.title;
      titleEl.textContent = data.title;
      descEl.textContent = data.description;

      document.getElementById('imageModal').style.display = 'block';
      document.body.style.overflow = 'hidden';
    }

    // Função para navegar para próxima tatuagem
    function nextTattoo() {
      currentTattooIndex = (currentTattooIndex + 1) % tattooDesigns.length;
      updateTattooModal();
    }

    // Função para navegar para tatuagem anterior
    function previousTattoo() {
      currentTattooIndex = (currentTattooIndex - 1 + tattooDesigns.length) % tattooDesigns.length;
      updateTattooModal();
    }

    // tornar disponível globalmente para os onclick inline
    window.openTattooModal = openTattooModal;
    window.nextTattoo = nextTattoo;
    window.previousTattoo = previousTattoo;

    // Carousel controls removed: designs carousel is now static thumbnails.

    let currentImageIndex = 0;

    // Função para abrir modal da galeria
    function openGalleryModal() {
      document.getElementById('galleryModal').style.display = 'block';
      document.body.style.overflow = 'hidden'; // Previne scroll da página
    }

    // Função para fechar modal da galeria
    function closeGalleryModal() {
      document.getElementById('galleryModal').style.display = 'none';
      document.body.style.overflow = 'auto'; // Restaura scroll da página
    }

    // Função para abrir modal de imagem individual
    function openImageModal(imageIndex) {
      currentImageIndex = imageIndex;
      const imageData = galleryImages[imageIndex];
      
      document.getElementById('modalImage').src = imageData.src;
      document.getElementById('modalImage').alt = imageData.title;
      document.getElementById('imageTitle').textContent = imageData.title;
      document.getElementById('imageDescription').textContent = imageData.description;
      
      document.getElementById('imageModal').style.display = 'block';
      document.body.style.overflow = 'hidden';
      
      // Fechar galeria se estiver aberta
      closeGalleryModal();
    }

    // Função para fechar modal de imagem
    function closeImageModal() {
      document.getElementById('imageModal').style.display = 'none';
      document.body.style.overflow = 'auto';
    }

    // Função para imagem anterior
    function previousImage() {
      currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
      const imageData = galleryImages[currentImageIndex];
      
      document.getElementById('modalImage').src = imageData.src;
      document.getElementById('modalImage').alt = imageData.title;
      document.getElementById('imageTitle').textContent = imageData.title;
      document.getElementById('imageDescription').textContent = imageData.description;
    }

    // Função para próxima imagem
    function nextImage() {
      currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
      const imageData = galleryImages[currentImageIndex];
      
      document.getElementById('modalImage').src = imageData.src;
      document.getElementById('modalImage').alt = imageData.title;
      document.getElementById('imageTitle').textContent = imageData.title;
      document.getElementById('imageDescription').textContent = imageData.description;
    }

    // Event listeners para fechar modais
    document.addEventListener('DOMContentLoaded', function() {
      // Fechar modais ao clicar fora do conteúdo
      window.addEventListener('click', function(event) {
        const galleryModal = document.getElementById('galleryModal');
        const imageModal = document.getElementById('imageModal');
        
        if (event.target === galleryModal) {
          closeGalleryModal();
        }
        if (event.target === imageModal) {
          closeImageModal();
        }
      });

      // Navegação por teclado
      document.addEventListener('keydown', function(event) {
        const imageModal = document.getElementById('imageModal');
        
        if (imageModal.style.display === 'block') {
          switch(event.key) {
            case 'Escape':
              closeImageModal();
              break;
            case 'ArrowLeft':
              previousTattoo();
              break;
            case 'ArrowRight':
              nextTattoo();
              break;
          }
        }
        
        if (document.getElementById('galleryModal').style.display === 'block' && event.key === 'Escape') {
          closeGalleryModal();
        }
      });
    });
