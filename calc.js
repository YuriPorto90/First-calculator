let displayText = ''
let inputText
let finalRes = ''

function typing(inputText){
    displayText = displayText + inputText // concatena a string já existente com o valor adquirido
    document.getElementById("display").value = displayText // printa a string no display
}

function res(){
    finalRes = eval(displayText) //faz o calculo da string e guarda na variavel finalRes
    displayText = finalRes.toString() //atribui o valor do resultado final para a string
    document.getElementById("display").value = displayText // printa a string no display
}

function clearText(){
    displayText = '' //atribui um valor sem caracteres a string 
    document.getElementById("display").value = displayText //printa a string no display
    
}

function removeLast(){
    if(displayText != finalRes){ //caso o valor do display seja diferente do valor final
        displayText = displayText.replace(/.$/, ''); //remove o ultimo caractere da string
        document.getElementById("display").value = displayText //printa a string  no display
    }

    else{ //caso o valor do display seja igual ao valor final
        clearText() //chama a função de limpar tela
    }
}
