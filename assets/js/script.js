// Inicializa o Cleave.js para formatação de moeda
var cleave = new Cleave('#monthlyBill', {
    numeral: true,
    numeralThousandsGroupStyle: 'thousand',
    prefix: 'R$ ',
    rawValueTrimPrefix: true
  });


  function calcularEconomia(x) {
    // Converte o valor de x para número caso seja uma string
    x = Number(x);
    
    // Calcula a economia usando a fórmula dada
    const economia = 30 - 30 * x * Math.exp(-x / 12);
    
    // Retorna o valor economizado
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
    const savings = (monthlyBill * savingsPercentage / 100).toFixed(2);
  
    document.getElementById('result').innerHTML = `Economia de R$ ${savings} por mês!`;
  }
  