// Inicializa o Cleave.js para formatação de moeda
var cleave = new Cleave('#monthlyBill', {
    numeral: true,
    numeralThousandsGroupStyle: 'thousand',
    delimiter:'.',
    numeralDecimalMark: ',',
    prefix: 'R$ ',
    // rawValueTrimPrefix: true
  });

  function calcularEconomia(valorConta) {
    const precoEnergia = 1.1; // R$/kWh (Preço da Energia)
    const energiaGerada = 10000; // kWh (Energia Gerada pela Usina)
    const maiorEconomiaPercentual = 30; // Maior economia percentual (%)
    var valor = String(valorConta)
    valor = valor.replace('R$ ','')
    
    valor = parseFloat(valor)
    console.log(valor)
    // Calcula a economia usando a fórmula fornecida
    const economia = valor * (maiorEconomiaPercentual - maiorEconomiaPercentual * Math.exp(-(valor * 7 / (precoEnergia * energiaGerada)))) / 100;

    console.log(economia)
    return economia;
}
  
  function calculateSavings() {
    const monthlyBillValue = cleave.getRawValue();
    
    if (monthlyBillValue === "") {
      document.getElementById('result').innerHTML = "Por favor, insira um valor válido.";
      return;
    }
    
    // Converte a string para número
    const monthlyBill = parseFloat(monthlyBillValue);
  
    // Calcular economia aleatória (por exemplo, entre 10% e 30% do valor da conta)
    const savingsPercentage = calcularEconomia(monthlyBillValue);
    var savings = savingsPercentage.toFixed(2);

    // if (savings < 0){
    //   savings = -1 *(Math.round(savings) * 0.3).toFixed(2)
    // }
  
    document.getElementById('result').innerHTML = `Economia de aproximadamente <div>R$ ${savings} por mês!</div>`;
  }
  