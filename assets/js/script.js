// Inicializa o Cleave.js para formatação de moeda
var cleave = new Cleave('#monthlyBill', {
    numeral: true,
    numeralThousandsGroupStyle: 'thousand',
    prefix: 'R$ ',
    rawValueTrimPrefix: true
  });


  function calcularEconomia(gastoMes) {
    const maxGasto = 6365.88;
    const x = gastoMes / maxGasto; // Proporção direta do gasto mensal em relação ao máximo
    const y = 0.30 * (1 - Math.exp(-5 * x)); // Ajuste para garantir que 100% do gasto corresponde a 30% de economia
    return y;
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
    const savings = (monthlyBill * savingsPercentage / 100).toFixed(2);
  
    document.getElementById('result').innerHTML = `Economia de R$ ${savings} por mês!`;
  }
  