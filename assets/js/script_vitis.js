const ipcaData = [
    { year: 2020, ipca: 1.0452, baseYield: 0.3 },
    { year: 2021, ipca: 1.1006, baseYield: 0.31 },
    { year: 2022, ipca: 1.0579, baseYield: 0.35 },
    { year: 2023, ipca: 1.0462, baseYield: 0.37 },
    { year: 2024, ipca: 1.05, baseYield: 0.4 },
    { year: 2025, ipca: 1.05, baseYield: 0.38 },
    { year: 2026, ipca: 1.05, baseYield: 0.42 },
    { year: 2027, ipca: 1.05, baseYield: 0.44 },
    { year: 2028, ipca: 1.05, baseYield: 0.46 },
    { year: 2029, ipca: 1.05, baseYield: 0.49 },
    { year: 2030, ipca: 1.05, baseYield: 0.51 },
    { year: 2031, ipca: 1.05, baseYield: 0.54 },
    { year: 2032, ipca: 1.05, baseYield: 0.56 },
    { year: 2033, ipca: 1.05, baseYield: 0.59 },
    { year: 2034, ipca: 1.05, baseYield: 0.62 },
    { year: 2035, ipca: 1.05, baseYield: 0.65 },
    { year: 2036, ipca: 1.05, baseYield: 0.69 },
    { year: 2037, ipca: 1.05, baseYield: 0.72 },
    { year: 2038, ipca: 1.05, baseYield: 0.76 },
    { year: 2039, ipca: 1.05, baseYield: 0.79 },
    { year: 2040, ipca: 1.05, baseYield: 0.83 },
    { year: 2041, ipca: 1.05, baseYield: 0.88 },
    { year: 2042, ipca: 1.05, baseYield: 0.92 },
    { year: 2043, ipca: 1.05, baseYield: 0.97 },
    { year: 2044, ipca: 1.05, baseYield: 1.01 },
    { year: 2045, ipca: 1.05, baseYield: 1.06 },
    { year: 2046, ipca: 1.05, baseYield: 1.12 },
    { year: 2047, ipca: 1.05, baseYield: 1.17 },
    { year: 2048, ipca: 1.05, baseYield: 1.23 },
    { year: 2049, ipca: 1.05, baseYield: 1.29 },
];

// Função para atualizar o valor de vitisResult dinamicamente
function updateVitisResult() {
    let exchangeRate = 0;
    let desconto = 1;
    const vitisValue = parseFloat(document.getElementById('vitisInput').value);
    const cupom = document.getElementById('cupom').value.trim();
    const usinaSelect = document.getElementById('usina');
    const vitisResult = document.getElementById('vitisResult');

    if (cupom === '#Vitis20') {
        desconto = 0.8;
    }

    if (cupom === '#intersolar10') {
        desconto = 0.9;
    }

    if (cupom === '#intersolar15') {
        desconto = 0.85;
    }

    if (cupom === '#intersolar20') {
        desconto = 0.80;
    }

    // if (cupom === 'ANIVERSARIO') {
    //     desconto = 0.7;
    // }

    if (usinaSelect.value === 'usina-ve1') {
        exchangeRate = 218.17 * desconto; // Valor de 1 Vitis em R$ - usina ve.1 - 2023.01
    } else if (usinaSelect.value === 'usina-ve2') {
        exchangeRate = 152.78 * desconto; // Valor de 1 Vitis em R$ - usina ve.2 - 2024.01
    }

    const result = vitisValue ? (vitisValue * exchangeRate).toFixed(2) : '0,00';
    vitisResult.innerText = `R$ ${result.replace('.', ',')}`;
}

// Atualiza `dateResult` dinamicamente conforme o usuário digita o valor dos meses
document.getElementById('monthsInput').addEventListener('input', function () {
    const monthsValue = parseInt(this.value);
    const currentDate = new Date();
    const resultDate = new Date(currentDate.setMonth(currentDate.getMonth() + monthsValue));
    const formattedDate = resultDate.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    document.getElementById('dateResult').innerText = monthsValue ? formattedDate : '__/__/____';
});

// Adicionar listeners para atualizar `vitisResult` em tempo real
document.getElementById('vitisInput').addEventListener('input', updateVitisResult);
document.getElementById('usina').addEventListener('change', updateVitisResult);
document.getElementById('cupom').addEventListener('input', updateVitisResult);



// Variáveis globais
let currentChart = null; // Armazena o gráfico atual

// Função para criar o gráfico
function createChart(labels, data, title) {
    const ctx = document.getElementById('yieldChart').getContext('2d');

    if (currentChart) {
        currentChart.destroy(); // Destroi o gráfico anterior se existir
    }

    currentChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: title,
                data: data,
                borderColor: '#02083b',
                backgroundColor: '#6289b4',
                pointBackgroundColor: '#6289b4',
                fill: true,
            }]
        },
        options: {
            maintainAspectRatio: false,
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Meses',
                        color: '#333',
                        font: {
                            family: 'Arial',
                            size: 14,
                            weight: 'bold',
                        },
                    },
                    ticks: {
                        color: '#666',
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Rendimento Acumulado (R$)',
                        color: '#333',
                        font: {
                            family: 'Arial',
                            size: 14,
                            weight: 'bold',
                        },
                    },
                    beginAtZero: true,
                    ticks: {
                        color: '#666',
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        color: '#444',
                        font: {
                            size: 12,
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: 'rgba(0, 0, 0, 0.3)',
                    borderWidth: 1,
                    padding: 10,
                }
            }
        }
    });
}

// Função para gerar o gráfico de exemplo
function generateExampleChart() {
    const vitisValue = 0; // Valor fixo de vitis no exemplo
    const monthsValue = 0; // 50 meses
    const finalRendimento = 0;// Rendimento final desejado
    const rendimentoMensal = finalRendimento / monthsValue; // Rendimento fixo mensal
    const yieldData = [];
    const monthLabels = [];
    let bonificacaoAcumulada = 0;

    // Calcula o rendimento mês a mês, somando o valor mensal fixo
    for (let i = 0; i < monthsValue; i++) {
        const futureDate = new Date();
        futureDate.setMonth(futureDate.getMonth() + i + 1);
        const year = futureDate.getFullYear();
        const month = futureDate.getMonth() + 1;

        // Acrescenta o valor fixo mensal ao rendimento acumulado
        bonificacaoAcumulada += rendimentoMensal;
        
        // Adiciona o valor acumulado e o mês ao gráfico
        yieldData.push(bonificacaoAcumulada.toFixed(2));
        monthLabels.push(`Mês ${i + 1}`);
    }

    // Atualiza o valor do rendimento acumulado no totalYield
    document.getElementById('totalYield').innerHTML = `
        Rendimento Acumulado:<br>
        R$ ${bonificacaoAcumulada.toFixed(2).replace('.', ',')}<br>
    `;

    // Cria o gráfico de exemplo
    createChart(monthLabels, yieldData, 'Rendimento total');
}


// Evento ao carregar a página
window.addEventListener('load', generateExampleChart);

// Evento ao clicar no botão "Calcular"
document.getElementById('calculateButton').addEventListener('click', function () {
    const vitisValue = parseFloat(document.getElementById('vitisInput').value);
    const monthsValue = parseInt(document.getElementById('monthsInput').value);
    const vitisSelect = document.getElementById('usina');
    const currentDate = new Date();

    // Verifica se os valores inseridos são válidos
    if (isNaN(vitisValue) || isNaN(monthsValue) || vitisValue <= 0 || monthsValue <= 0) {
        alert('Por favor, insira valores válidos para Vitis e Meses.');
        return;
    }
    if (vitisSelect.value === 'default') {
        alert('Por favor, selecione a usina a investir.');
        return;
    }

    let bonificacaoAcumulada = 0;
    const yieldBase = 0.38; // Base Yield
    const yieldData = [];   // Para armazenar o rendimento acumulado de cada mês
    const monthLabels = [];  // Para armazenar os rótulos dos meses

    // Calcula o rendimento para os meses selecionados
    for (let i = 0; i < monthsValue; i++) {
        const futureDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + i + 1, currentDate.getDate());
        const year = futureDate.getFullYear();
        const month = futureDate.getMonth() + 1;

        const ipcaEntry = ipcaData.find(data => data.year === year);
        const baseYield = ipcaEntry ? ipcaEntry.baseYield : 0;

        let rendimentoMensal;
        if (vitisSelect.value === 'usina-ve1') {
            if (year == 2024 && month < 8) {
                rendimentoMensal = yieldBase * vitisValue;
            } else {
                rendimentoMensal = baseYield * vitisValue * Math.pow(2, 3); // Nível 3 a partir de agosto de 2024 para todos os anos
            }
        } else if (vitisSelect.value === 'usina-ve2') {
            if (year == 2024 && month < 8) {
                rendimentoMensal = yieldBase * vitisValue;
            } else {
                rendimentoMensal = baseYield * vitisValue * Math.pow(2, 0); // Nível 0 até segunda ordem
            }
        }

        bonificacaoAcumulada += rendimentoMensal;
        yieldData.push(bonificacaoAcumulada.toFixed(2));
        monthLabels.push(`Mês ${i + 1}`);
    }

    // Exibe o rendimento acumulado
    if (vitisSelect.value === 'usina-ve1') {
        document.getElementById('totalYield').innerHTML = `Rendimento Acumulado:<br>R$ ${bonificacaoAcumulada.toFixed(2).replace('.', ',')}<br>(Usina VE.1 - 2023.01)`;
    } else if (vitisSelect.value === 'usina-ve2') {
        document.getElementById('totalYield').innerHTML = `Rendimento Acumulado:<br>R$ ${bonificacaoAcumulada.toFixed(2).replace('.', ',')}<br>(Usina VE.2 - 2024.01)`;
    }

    // Cria o gráfico com os novos dados
    createChart(monthLabels, yieldData, 'Rendimento total');
});

// Função para gerar o gráfico personalizado
function generateCustomChart() {
    const vitisValue = parseFloat(document.getElementById('vitisInput').value);
    const monthsValue = parseInt(document.getElementById('monthsInput').value);
    const usinaSelect = document.getElementById('usina');

    if (isNaN(vitisValue) || isNaN(monthsValue) || vitisValue <= 0 || monthsValue <= 0) {
        alert('Por favor, insira valores válidos para Vitis e Meses.');
        return;
    }

    if (usinaSelect.value === 'default') {
        alert('Por favor, selecione a usina a investir.');
        return;
    }

    const yieldData = [];
    const monthLabels = [];
    let accumulatedYield = 0;

    for (let i = 0; i < monthsValue; i++) {
        const futureDate = new Date();
        futureDate.setMonth(futureDate.getMonth() + i);
        const year = futureDate.getFullYear();

        const ipcaEntry = ipcaData.find(data => data.year === year);
        const baseYield = ipcaEntry ? ipcaEntry.baseYield : 0.35;

        const monthlyYield = baseYield * vitisValue;
        accumulatedYield += monthlyYield;

        yieldData.push(accumulatedYield.toFixed(2));
        monthLabels.push(`Mês ${i + 1}`);
    }

    document.getElementById('totalYield').innerHTML = `
        Rendimento Acumulado:<br>
        R$ ${accumulatedYield.toFixed(2).replace('.', ',')}<br>
        (${usinaSelect.options[usinaSelect.selectedIndex].text})
    `;

    createChart(monthLabels, yieldData, `Rendimento (${usinaSelect.options[usinaSelect.selectedIndex].text})`);
}







function resizeHandler() { //função para alterar o placeholder para que caiba
    const width = window.innerWidth;
    const inputFieldVitis = document.getElementById('vitisInput');
    const inputFieldMonths = document.getElementById('monthsInput');

    if (width > 767 && width < 3000) {
        inputFieldVitis.placeholder = 'Vitis';
        inputFieldMonths.placeholder = 'Meses';
    } else {
        inputFieldVitis.placeholder = 'Quantidade de Vitis';
        inputFieldMonths.placeholder = 'Meses Aportados';
    }
}


window.addEventListener('resize', resizeHandler); // Adicionar o evento de redimensionamento
window.addEventListener('load', resizeHandler); // Adicionar o ajuste inicial

