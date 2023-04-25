function addProduct() {
  let product = {};

  product.name = prompt("Nome do produto:");
  if(product.name === null){
    alert('Digite um nome de produto válido.')
    return
  }
  product.qtd = parseInt(prompt("Quantas unidades deseja comprar?"));
  product.price = Number(prompt("Qual o valor unitário desse produto?"));

  if(isNaN(product.qtd) || isNaN(product.price)){
    alert('Produto com dados inválidos, por favor tente novamente!')
  } else {
    productList.push(product);
    alert("Produto adicionado com sucesso");
  }
 
}

function listProducts() {
  for (let product of productList) {
    for (key in product) {
        
      document.write(
        `${product["name"]} // Valor Unitário: R$ ${product["price"].toFixed(
          2
        )} // Quantidade: ${product["qtd"]} // Valor total: R$ ${(
          product["price"] * product["qtd"]
        ).toFixed(2)}<br>`
      );
      break;
    }
  }
}

function totalPrice() {
  let priceSum = 0;

  for (product of productList) {
    for (price in product) {
      priceSum += product["price"] * product["qtd"];
      break;
    }
  }

  return priceSum;
}

function checkout() {
    if(totalPrice()=== 0){
        alert('Não existem produtos no seu carrinho de compras. Por favor adicione algo antes de seguir para o Checkout')
        return
    }

  alert(
    `O total da sua compra foi de R$ ${totalPrice().toFixed(
      2
    )}. Na próxima tela, selecione o método de pagamento`
  );

  modality = parseInt(
    prompt(
      "Escolha como deseja pagar a sua compra, digitando o número equivalente: \n1 - CRÉDITO\n2 - DÉBITO\n3 - PIX\n4 - DINHEIRO"
    )
  );

  if (isNaN(modality) || modality < 1 || modality > 4) {
    alert("Método de pagamento inválido! Tente novamente!");
    return
  } else {
    switch (modality) {
      case 1:
        payData.mod = "CRÉDITO";
        break;
      case 2:
        payData.mod = "DÉBITO";
        break;
      case 3:
        payData.mod = "PIX";
        break;
      case 4:
        payData.mod = "DINHEIRO";
        break;
      default:
        payData.mod = "ENTRADA-INVALIDA";
    }
  }

  payment(payData.mod);
}

function payment(method) {
  if (method == "CRÉDITO") {
    payData.qtdParcels = parseInt(
      prompt(
        "Em quantas parcelas deseja dividir sua compra? (Em até 15x) \nAté 5x - 5% de juros\nAté 10x - 10% de juros\nAté 15x - 15% de juros"
      )
    );

    if (
      isNaN(payData.qtdParcels) ||
      payData.qtdParcels < 0 ||
      payData.qtdParcels > 15
    ) {
      alert("Quantidade de parcelas inválido, por favor, tente novamente");
      return;
    }

    if (payData.qtdParcels > 0 && payData.qtdParcels <= 5) {
      payData.tax = 0.05;
    } else if (payData.qtdParcels > 5 && payData.qtdParcels <= 10) {
      payData.tax = 0.1;
    } else if (payData.qtdParcels > 10 && payData.qtdParcels <= 15) {
      payData.tax = 0.15;
    }
    if (payData.qtdParcels !== 0) {
      payData.valueParcel =
        (totalPrice() + totalPrice() * payData.tax) / payData.qtdParcels;
    }
  } else if (method === "DÉBITO") {
    payData.discount = 0.05;
  } else {
    payData.discount = 0.1;
  }

  showShop();
}

function showPayment(method) {
  let finalPrice = 0;
  const newShop = `
    '   <div>
            <br>
            <button onclick="location.reload()">Nova compra</button>
        </div>
    `;

  if (method === "CRÉDITO") {
    finalPrice = totalPrice() + totalPrice() * payData.tax;

    document.write(`
        <h3> VALOR TOTAL DA COMPRA: R$ ${totalPrice().toFixed(2)} <h3>
        <h3> VALOR TOTAL DA COMPRA COM JUROS: R$ ${finalPrice.toFixed(2)} <h3>
        Método de pagamento selecionado: ${payData.mod}<br><br>

        Acréscimo de Juros: (R$ ${(totalPrice() * payData.tax).toFixed(2)}) <br>
        Número de parcelas: ${payData.qtdParcels}<br>
        Valor de cada Parcela: R$ ${payData.valueParcel.toFixed(2)}
        
        ${newShop}
    `);
  } else {
    finalPrice = totalPrice() - totalPrice() * payData.discount;
    document.write(`
        <h3> VALOR TOTAL DA COMPRA: R$ ${totalPrice().toFixed(2)} <h3>
        <h3> VALOR TOTAL DA COMPRA COM DESCONTO: R$ ${finalPrice.toFixed(
          2
        )} <h3>
        Método de pagamento selecionado: ${payData.mod}<br><br>

        
        Desconto aplicado: (R$ ${(totalPrice() * payData.discount).toFixed(2)})

        ${newShop}
        
    `);
  }
}

function showShop() {
  document.write(
    ` <h1> CHECKOUT - RESUMO DA SUA COMPRA: </h1> <h2>Lista de Produtos</h2>`
  );

  listProducts();

  showPayment(payData.mod);
}

function preview(){
    alert (`
        Quantidade de itens adicionados: ${productList.length}\n
        Valor total até o momento: R$ ${totalPrice().toFixed(2)}
    `)

}

let productList = [ ];

let payData = {
  mod: "",
  qtdParcels: 0,
  discount: 0,
  tax: 0,
  valueParcel: 0.0,
};