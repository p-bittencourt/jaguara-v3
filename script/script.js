function getParameters() {

    var params = new Array();
    var paramsRet = new Array();
    var url = window.location.href;     // Obtém a URL
    var paramsStart = url.indexOf("?"); // Procura ? na URL
  
    if (paramsStart == -1) return null;
      // Encontrou ? na URL
    var paramString = url.substring(paramsStart + 1); // Retorna parte da URL após ?
    paramString = decodeURIComponent(paramString);    // Decodifica código de URI da URL
    var params = paramString.split("&"); // Retorna trechos da String separados por &
    for (var i = 0; i < params.length; i++) {
      var pairArray = params[i].split("="); // Retorna trechos da String separados por =
      if (pairArray.length == 2) {
        paramsRet[pairArray[0]] = pairArray[1];
      }
    }
    return paramsRet;// Não encontrou ? na URL
  }

  function mascaraTelefone(event) {
    let tecla = event.key;
    // Regex: 
    // g = não termina verificação enquanto não houver combinação para todos os elementos  
    // \D+ = troca qualquer caractere que não seja um dígito por caracter vazio
    let telefone = event.target.value.replace(/\D+/g, "");
  
    // Regex: i = case insensitive
    // Se Tecla é número, concatena com telefone
    if (/^[0-9]$/i.test(tecla)) {
      telefone = telefone + tecla;
      let tamanho = telefone.length;
  
      if (tamanho >= 12) { // Se telefone com 12 ou mais caracteres, não faz mais nada
        return false;
      }
  
      if (tamanho > 10) { 
        telefone = telefone.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
      } else if (tamanho > 5) { 
        telefone = telefone.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
      } else if (tamanho > 2) { 
        telefone = telefone.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
      } else {
        telefone = telefone.replace(/^(\d*)/, "($1");
      }
  
      event.target.value = telefone;
    }
  
    if (!["Backspace", "Delete", "Tab"].includes(tecla)) {
      return false;
    }
  }

//FUNÇÕES REFERENTE AOS POP-UPs DE PRODUTOS
function openModal(produto) {
  var txt1 = document.getElementById("detalhesProd1");
  var txt2 = document.getElementById("detalhesProd2");
  var txt3 = document.getElementById("detalhesProd3");
  var estilo;
  switch (produto) {
    case "produto01":
      txt1.innerHTML  = "Camiseta compeão do coração";
      txt2.innerHTML  = "Poliester Poliester";
      txt3.innerHTML  = "R$81,00";
      estilo = "28%"
      break;
    case "produto02":
      txt1.innerHTML  = "JAQUETA";
      txt2.innerHTML  = "COURO FODÃO ";
      txt3.innerHTML  = "R$82,00";
      estilo = "48%"
      break;
    case "produto03":
      txt1.innerHTML  = "CANECA";
      txt2.innerHTML  = "Plástico atóxico";
      txt3.innerHTML  = "R$83,00";
      estilo = "68%"
      break;
         /* .. continuar igual para as 6 imagens */
  default:
      txt1.innerHTML  = "Escolha novamente";    
      txt2.innerHTML  = "Produto não selecionado";      
      //txt3.innerHTML  = "R$85,00";
  }
  document.getElementById("knowMore").style.left = estilo;
  document.getElementById("knowMore").style.display = "block";
}

function closeModal() {
  document.getElementById("knowMore").style.display = 'none';
}

/* FUNÇÕES REFERENTES AO POP-UP  */
document.addEventListener("DOMContentLoaded", function()
{
  abrirDialog();
  if (window.location.href.endsWith('/produtos.html?aceito=true') || (window.location.href.endsWith('/produtos.html')) || (window.location.href.endsWith('?aceito=true')))
  {
    concedeDesconto();
  }
})

function abrirDialog(){
  var params = getParameters();
  if (Object.keys(params).length != 0) { mostrarDialog()};
}

function mostrarDialog(){
  var dialog = document.getElementById("promo");
  if (dialog != null){dialog.showModal()}
}

function redirecionarParaProdutos() {
  var URL = "produtos.html?aceito=true";
  window.location.href = URL;
  concedeDesconto();
}

function fecharDialog() {
  var dialog = document.getElementById("promo");
  dialog.close();
}


/* VERIFICA SE O USUARIO ACEITOU O DESCONTO DO POP-UP  */
function verificaAceite() {
    var url = window.location.href;
    return (url.indexOf("?")?true:false);
  }

function concedeDesconto() {
    if (verificaAceite()) {
        var valorElement = document.getElementById("valor");
        var valorTexto = valorElement.textContent;
        
        var valorNumerico = parseFloat(valorTexto.replace("R$ ", "").replace(",", "."));
        console.log(valorNumerico)
        var novoValor = valorNumerico - (0.1 * valorNumerico);

        valorElement.textContent = "R$ " + novoValor.toFixed(2); // Arredonda para 2 casas decimais
    }
}


