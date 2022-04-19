let displayText = ''; let inputText; let calcString = ''; // main strings
let finalRes = ''; // salvar valor
let locker = false; // impedir digitação de dois operadores (inicia como falso para ser possível inserir o - inicialmente)

function typing(inputText){

    if(typeof(inputText) == 'number'){ // para números:
        displayText += inputText; // concatena o numero no string de exibição
        calcString += inputText; // concatena o numero no string de calculo
        locker = false; // deixa o estado do locker em falso, para permitir a digitação de outro operador
    } 

    else{ // para operadores:
        if(!locker){ // caso um operador ainda não tenha sido escolhido
            if(inputText == '^'){
                calcString += '**'; // caso seja escolhida a função potência, concatena ** (pow)
            } else{
                calcString += inputText; // caso contrário, apenas realiza o procedimento padrão
            }
            displayText += inputText; // concatena o operador no string de exibição
            locker = true; // trava o bool, assim o código irá entrar no else caso outro operador seja inserido
        }

        else{ //caso um operador já tenha sido escolhido
            displayText = displayText.replace(/.$/, inputText); // troca o ultimo operador pelo selecionado
            if(calcString.slice(-2)=='**'){ // caso o ultimo operador tenha sido potência (string de calculo recebeu **)
                calcString = calcString.slice(0, -2); // remove os dois últimos caracteres
                calcString+= inputText; // e insere o novo
            }   else{
                calcString = calcString.replace(/.$/, inputText);                
            }
        }
    }
    document.getElementById("display").value = displayText; // printa a string de exibição ao final
}

function res(){
    calcString = displayText = finalRes = eval(calcString); // calcula o valor final e armazena
    document.getElementById("display").value = displayText; // printa a string de exibição ao final
}

function clearText(){
    document.getElementById("display").value = displayText = calcString = '' // limpa todas as variáveis
}

function removeLast(){
    
    if(displayText != finalRes){

        displayText = displayText.replace(/.$/, ''); // remove o ultimo caractere da string de exibição

        if(calcString.slice(-2)=='**'){ // caso o ultimo operador tenha sido potência (string de calculo recebeu **)
            calcString = calcString.slice(0, -2); // remove os dois últimos caracteres da string de cálculo
        }   else{ //caso tenha sido outro operador
            calcString = calcString.replace(/.$/, '');  // remove o ultimo caractere da string de cálculo
        }
    }

    else{ //se o valor digitado for igual ao resultado, limpa tudo
        clearText()
    }

    document.getElementById("display").value = displayText; // printa a string de exibição ao final
    locker = false // destrava o locker
}