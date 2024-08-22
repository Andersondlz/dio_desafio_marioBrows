const player1  = {
    nome: "Mario",
    velocidade: 4,
    manobrabilidade: 3,
    poder: 3,
    pontos: 0,
}

const player2 = {
    nome: "Luigi",
    velocidade: 3,
    manobrabilidade: 4,
    poder: 4,
    pontos: 0,
}

//função rolar dados - ingles RollDice
// Math.floor - arredonda o numero / Math.random - numero aleatoria 0 a 1
//async - funcão que não espera ou seja ao contrario de assincrona
async function rollDice (){
    return Math.floor(Math.random()*6) + 1;
}

async function getRandomBlock() {
    let random = Math.random();
    let result 

    switch (true) {
        case random < 0.33:
            result = "RETA";
            break;
        case random > 0.66:
            result = "CURVA";
            break;
        default:
            result = "CONFRONTO"
        
    }
    return result;
}

async function logRollResult(characterName, block, diceResult, attribute) {
    console.log(`${characterName} 🎲 rolou 1 dado de ${block} ${diceResult} + ${attribute} = ${diceResult+attribute}`)
}

async function playRaceEngine(character1,character2) {
    for (let round = 1; round <= 5; round++){
        console.log(`🏁 Rodada ${round}`);

        //sortear bloco
        let block = await getRandomBlock()
        console.log(`Bloco: ${block}`)
        // Rolar os dados
        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        // Teste de Habilidade
        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;

        if(block === "RETA"){
            totalTestSkill1 = diceResult1 + character1.velocidade;
            totalTestSkill2 = diceResult2 + character2.velocidade;
            await logRollResult(character1.nome,"Velocidade",diceResult1,character1.velocidade)
            await logRollResult(character2.nome,"Velocidade",diceResult2,character2.velocidade)
        }

        if(block === "CURVA"){
            totalTestSkill1 = diceResult1 + character1.manobrabilidade;
            totalTestSkill2 = diceResult2 + character2.manobrabilidade;
            await logRollResult(character1.nome,"Manobrabilidade",diceResult1,character1.velocidade)
            await logRollResult(character2.nome,"Manobrabilidade",diceResult2,character2.velocidade)
        }
        if(block === "CONFRONTO"){
            let powerResult1 = diceResult1 + character1.poder;
            let powerResult2 = diceResult2 + character2.poder;
            console.log(`${character1.nome} Confrontou com ${character2.nome}!🥊`);
            await logRollResult(character1.nome,"Poder",diceResult1,character1.poder)
            await logRollResult(character2.nome,"Poder",diceResult2,character2.poder)
            
            // If Ternario
            //character2.pontos -= powerResult1 > powerResult2 && character2.pontos > 0 ? 1:0;
            if(powerResult1 > powerResult2 && character2.pontos > 0){
                console.log(`${character1.nome} venceu o confronto! ${character2.nome} perdeu 1 ponto 🐢`)
                character2.pontos--;
            }
            //if (powerResult1 > powerResult2){
            //    if(character2.pontos > 0){
            //        character2.pontos--;
            //    }
            //}
            //character1.pontos -= powerResult2 > powerResult1 && character1.pontos > 0 ? 1:0;
            if(powerResult2 > powerResult1 && character1.pontos > 0){
                console.log(`${character2.nome} venceu o confronto! ${character1.nome} perdeu 1 ponto 🐢`)
                character2.pontos--;
            }
            //if (powerResult2 > powerResult1){
            //    if(character1.pontos > 0){
            //        character1.pontos--;
            //    }
            //}
            console.log(powerResult2 === powerResult1 ? "Confronto empatado! Nenhum ponto foi perdido" : "");
            //if (powerResult2 === powerResult1){
            //    console.log("Confronto empatado! Nenhum ponto foi perdido")
            //}

            //}

        }
        // verificando o vencedor
        if (totalTestSkill1 > totalTestSkill2){
            console.log(`${character1.nome} marcou um ponto`)
            character1.pontos++;
        } else if(totalTestSkill2 > totalTestSkill1){
            console.log(`${character2.nome} marcou um ponto`)
            character2.pontos++;
        }

        console.log('-----------------------------------')
    }

    
}

//Funcão para declara o vencedor
async function declareWinner(character1,character2) {
    console.log("Resultado final")
    console.log(`${character1.nome}: ${character1.pontos} ponto(s)`)
    console.log(`${character2.nome}: ${character2.pontos} ponto(s)`)
    if(character1.pontos > character2.pontos){
        console.log(`\n${character1.nome} venceu a corrida! Parabens .... 🏆`);
    }else if (character2.pontos > character1.pontos){
        console.log(`\n${character2.nome} venceu a corrida! Parabens .... 🏆`);
    }else
        console.log("Ocorreu um empate entre os jogodares 🤣")
}

//Funcao de entrada, o principal das funções
//Funcao auto Invocavel ()
(async function main() {
    console.log(`🏁🚨Corrida entre ${player1.nome} e ${player2.nome} começando....\n`)

    //await - ele aguardar ser chamado
    await playRaceEngine(player1,player2);
    await declareWinner(player1,player2);
})();
