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
      txt1.innerHTML  = "Camiseta Listrada";
      txt2.innerHTML  = "100% Poliéster";
      txt3.innerHTML  = "R$79,90";
      estilo = "28%"
      break;
    case "produto02":
      txt1.innerHTML  = "Jaqueta";
      txt2.innerHTML  = "Corta-Vento ";
      txt3.innerHTML  = "R$119,90";
      estilo = "48%"
      break;
    case "produto03":
      txt1.innerHTML  = "Copo Americano";
      txt2.innerHTML  = "Vidro";
      txt3.innerHTML  = "R$9,90";
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
  if (window.location.href.includes('formAction.html')){ abrirDialog() }
  if (window.location.href.includes('produtos.html?aceito=true'))
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
        var valorElements = document.getElementsByClassName("valor");
        var valoresTexto = [];
        var valoresNumericos = [];
        var novosValores =[];
        for (let i = 0; i < valorElements.length; i = i + 1){
          valoresTexto[i] = valorElements[i].textContent;
          valoresNumericos[i] = parseFloat(valoresTexto[i].replace("R$ ","").replace(",","."));
          novosValores[i] = (valoresNumericos[i] - (0.1 * valoresNumericos[i])).toFixed(2);
          valorElements[i].textContent = "R$ " + novosValores[i];
        }
        var promo = document.getElementsByClassName("item");
        for (let i = 0; i < promo.length; i = i + 1){
          promo[i].innerHTML = promo[i].innerHTML + '<div class="sell">PROMOÇÃO</div>';
        }
    }
}

/* REDIRECIONA PARA A PAGINA INICIAL OU SOBRE NÓS */
function redireciona(tela){
  var URL = tela + ".html";
  window.location.href = URL;
} 

