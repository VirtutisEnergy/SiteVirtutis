const ipcaData = [
  { year: 2020, ipca: 1.0452, baseYield: 0.3 },
  { year: 2021, ipca: 1.1006, baseYield: 0.31 },
  { year: 2022, ipca: 1.0579, baseYield: 0.35 },
  { year: 2023, ipca: 1.0462, baseYield: 0.37 },
  { year: 2024, ipca: 1.05, baseYield: 0.38 },
  { year: 2025, ipca: 1.05, baseYield: 0.4 },
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


let currentChart; // Variável para armazenar o gráfico atual e destruí-lo antes de criar um novo

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

    if (usinaSelect.value === 'usina-ve1') {
        exchangeRate = 183.34 * desconto; // Valor de 1 Vitis em R$ - usina ve.1 - 2023.01
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

document.getElementById('calculateButton').addEventListener('click', function () {
    const vitisValue = parseFloat(document.getElementById('vitisInput').value);
    const monthsValue = parseInt(document.getElementById('monthsInput').value);
    const vitisSelect = document.getElementById('usina');
    const currentDate = new Date();

    if (isNaN(vitisValue) || isNaN(monthsValue) || vitisValue <= 0 || monthsValue <= 0) {
        alert('Por favor, insira valores válidos para Vitis e Meses.');
        return;
    }
    if (vitisSelect.value === 'default') {
        alert('Por favor, selecione a usina a investir.');
        return;
    }

    let bonificacaoAcumulada = 0;
    const yieldBase = 0.37; // Base Yield
    const yieldData = [];   // Para armazenar o rendimento acumulado de cada mês
    const monthLabels = [];  // Para armazenar os rótulos dos meses

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

    if (vitisSelect.value === 'usina-ve1') {
        document.getElementById('totalYield').innerHTML = `Rendimento Acumulado:<br>R$ ${bonificacaoAcumulada.toFixed(2).replace('.', ',')}<br>(Usina VE.1 - 2023.01)`;
    } else if (vitisSelect.value === 'usina-ve2') {
        document.getElementById('totalYield').innerHTML = `Rendimento Acumulado:<br>R$ ${bonificacaoAcumulada.toFixed(2).replace('.', ',')}<br>(Usina VE.1 - 2024.01)`;
    }

    // Destruir o gráfico anterior se ele já existir
    if (currentChart) {
        currentChart.destroy();
    }

    //Fazer aparecer o gráfico
    document.getElementById('yieldChart').classList.remove('GraficoVitis');
    document.getElementById('chartContainer').classList.remove('GraficoVitis');
    
    // Configuração do gráfico
    const ctx = document.getElementById('yieldChart').getContext('2d');
    currentChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: monthLabels,
            datasets: [{
                label: 'Rendimento Acumulado (R$)',
                data: yieldData,
                borderColor: '#02083b', // Cor da linha
                backgroundColor: '#6289b4', // Cor do preenchimento
                pointBackgroundColor: '#6289b4', // Cor dos pontos
                fill: true
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
                        color: '#333', // Cor do título do eixo x
                        font: {
                            family: 'Arial',
                            size: 14,
                            weight: 'bold',
                        },
                    },
                    ticks: {
                        color: '#666', // Cor dos rótulos dos meses
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Rendimento Acumulado (R$)',
                        color: '#333', // Cor do título do eixo y
                        font: {
                            family: 'Arial',
                            size: 14,
                            weight: 'bold',
                        },
                    },
                    beginAtZero: true,
                    ticks: {
                        color: '#666', // Cor dos rótulos do eixo y
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        color: '#444', // Cor da legenda
                        font: {
                            size: 12
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
});







function resizeHandler() { //função para alterar o placeholder para que caiba
  const width = window.innerWidth;
  const inputFieldVitis = document.getElementById('vitisInput');
  const inputFieldMonths = document.getElementById('monthsInput');

  if (width > 767 && width < 3000){
    inputFieldVitis.placeholder = 'Vitis';
    inputFieldMonths.placeholder = 'Meses';
  } else {
    inputFieldVitis.placeholder = 'Quantidade de Vitis';
    inputFieldMonths.placeholder = 'Meses Aportados';
  }
}


window.addEventListener('resize', resizeHandler); // Adicionar o evento de redimensionamento
window.addEventListener('load', resizeHandler); // Adicionar o ajuste inicial

