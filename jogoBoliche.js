// 2 Jogadas por quadro
// - Spare: x + y + z
// - Strike: 10 + 2 jogadas
// - Normal: x + y

class JogoDeBoliche {
  constructor() {
    this.jogadas = [];
    this.jogadaAtual = 0;
  }

  jogar(pinos) {
    if (pinos > 10) {
      pinos = 10;
    }
    if (pinos < 0) {
      pinos = 0;
    }

    this.jogadas[this.jogadaAtual++] = pinos;
  }

  obterPontuacao() {
    let pontuacao = 0;
    let quadroIndex = 0;

    // Não foi Spare/Strike
    const pontuacaoSemSpareStrike = () => {
      return this.jogadas[quadroIndex] + this.jogadas[quadroIndex + 1];
    };
    // Pontuação Spare
    const pontuacaoSpare = () => {
      return this.jogadas[quadroIndex + 2];
    };

    // Pontuação Strike
    const pontuacaoStrike = () => {
      return this.jogadas[quadroIndex + 1] + this.jogadas[quadroIndex + 2];
    };

    const checarSpare = () => {
      return this.jogadas[quadroIndex] + this.jogadas[quadroIndex + 1] === 10;
    };

    const checarStrike = () => {
      return this.jogadas[quadroIndex] === 10;
    };

    for (let quadro = 0; quadro < 10; quadro++) {
      // console.log('quadroAntes:', quadro)
      // console.log('quadroIndexAntes:', quadroIndex)
      // console.log('pontuacaoAntes:', pontuacao)

      if (checarStrike()) {
        pontuacao += 10 + pontuacaoStrike();
        quadroIndex += 3;
      } else if (checarSpare()) {
        pontuacao += 10 + pontuacaoSpare();
        quadroIndex += 2;
      } else {
        pontuacao += pontuacaoSemSpareStrike();
        quadroIndex += 2;
      }

      // console.log('quadroDepois:', quadro)
      // console.log('quadroIndexDepois:', quadroIndex)
      // console.log('pontuacaoDepois:', pontuacao)
      // console.log('###############################')
    }
    return pontuacao;
  }
}
