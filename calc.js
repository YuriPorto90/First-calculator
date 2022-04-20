let displayText = "";
let inputText;
let calcString = ""; // main strings
let finalRes = ""; // salvar valor
let locker = false; // impedir digitação de dois operadores (inicia como falso para ser possível inserir o - inicialmente)
let isSqrt = false;
let lock = "";

function typing(inputText) {
  if (typeof inputText == "number" || inputText == "√") {
    displayText += inputText; // concatena o numero no string de exibição
    locker = false; // deixa o estado do locker em falso, para permitir a digitação de outro operador

    if (inputText == "√") {
      isSqrt = true;
      calcString += "(";
    } else {
      // para números:
      calcString += inputText; // concatena o numero no string de calculo
    }
  } else {
    if (isSqrt && calcString.slice(-1) != "(") {
      calcString += "**.5)";
      isSqrt = false;
    } else if (isSqrt && calcString.slice(-1) == "(") {
      locker = true;
      isSqrt = false;
    }

    // para operadores:
    if (!locker) {
      // caso um operador ainda não tenha sido escolhido
      if (inputText == "^") {
        calcString += "**"; // caso seja escolhida a função potência, concatena ** (pow)
      } else {
        calcString += inputText; // caso contrário, apenas realiza o procedimento padrão
      }

      displayText += inputText; // concatena o operador no string de exibição
      locker = true; // trava o bool, assim o código irá entrar no else caso outro operador seja inserido
    } else {
      //caso um operador já tenha sido escolhido
      displayText = displayText.replace(/.$/, inputText); // troca o ultimo operador pelo selecionado
      if (calcString.slice(-2) == "**") {
        // caso o ultimo operador tenha sido potência (string de calculo recebeu **)
        calcString = calcString.slice(0, -2); // remove os dois últimos caracteres
        calcString += inputText; // e insere o novo
      } else if (calcString.slice(-2) == "*(") {
        // caso o ultimo operador tenha sido raiz (string de calculo recebeu '*(' )
        calcString = calcString.slice(0, -2); // remove os dois últimos caracteres
        calcString += inputText; // e insere o novo
        isSqrt = false;
      } else {
        calcString = calcString.replace(/.$/, inputText);
      }
    }
  }
  document.getElementById("display").value = displayText; // printa a string de exibição ao final
  console.log(calcString);
}

function res() {
  if (isSqrt && calcString.slice(-1) != "(") {
    //verifica se a ultima raiz foi fechada (e se há numeros dentro dela), e caso não (var true), fecha ela antes do cálculo
    calcString += "**.5)";
    isSqrt = false;
  }
  calcString = displayText = finalRes = eval(calcString).toString(); // calcula o valor final e armazena
  document.getElementById("display").value = displayText; // printa a string de exibição ao final
}

function clearText() {
  document.getElementById("display").value = displayText = calcString = ""; // limpa todas as variáveis
}

function removeLast() {
  if (displayText != finalRes) {
    displayText = displayText.replace(/.$/, ""); // remove o ultimo caractere da string de exibição

    if (calcString.slice(-2) == "**") {
      // caso o ultimo operador tenha sido potência (string de calculo recebeu **)
      calcString = calcString.slice(0, -2); // remove os dois últimos caracteres da string de cálculo
    } else if (calcString.slice(-1) == "(") {
      // caso o ultimo operador tenha sido raiz (aberta) (string de calculo recebeu '*(' )
      calcString = calcString.slice(0, -1); // remove o último caractere
      isSqrt = false;
    } else if (calcString.slice(-1) == ")") {
      // caso o ultimo operador tenha sido raiz (fechada) (string de calculo termina em ')' )
      for (let i = 0; lock != "("; i++) {
        lock = calcString.slice(-1);
        calcString = calcString.replace(/.$/, ""); // remove o ultimo caractere da string de cálculo
      }
      displayText = displayText.replace(/.$/, ""); // remove o caractere de raiz da exibição
      isSqrt = false;
    } else {
      //caso tenha sido outro operador ou um numero
      calcString = calcString.replace(/.$/, ""); // remove o ultimo caractere da string de cálculo
    }
  } else {
    //se o valor digitado for igual ao resultado, limpa tudo
    clearText();
  }
  console.log(calcString);
  document.getElementById("display").value = displayText; // printa a string de exibição ao final
  locker = false; // destrava o locker
}
