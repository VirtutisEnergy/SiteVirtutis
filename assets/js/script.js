// Inicializa o Cleave.js para formatação de moeda
var cleave = new Cleave('#monthlyBill', {
    numeral: true,
    numeralThousandsGroupStyle: 'thousand',
    prefix: 'R$ ',
    rawValueTrimPrefix: true
  });
  
  function calculateSavings() {
    const monthlyBillValue = cleave.getRawValue();
    
    if (monthlyBillValue === "") {
      document.getElementById('result').innerHTML = "Por favor, insira um valor válido.";
      return;
    }
    
    // Converte a string para número
    const monthlyBill = parseFloat(monthlyBillValue);
  
    // Calcular economia aleatória (por exemplo, entre 10% e 30% do valor da conta)
    const savingsPercentage = Math.random() * (30 - 10) + 10;
    const savings = (monthlyBill * savingsPercentage / 100).toFixed(2);
  
    document.getElementById('result').innerHTML = `Economia de R$ ${savings} por mês!`;
  }
  