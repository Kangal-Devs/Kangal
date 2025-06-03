export function generateLevelTable(maxLevel = 99, xpInicial = 50, incrementoInicial = 50) {
  const niveis = [];
  let xpMin = 0;
  let incremento = incrementoInicial;
  let xpMax = xpMin + xpInicial;

  for (let level = 0; level <= maxLevel; level++) {
    niveis.push({
      level,
      xpMin,
      xpMax
    });

    // Atualiza valores para o próximo nível
    xpMin = xpMax + 1;
    incremento += 50; // Aumenta a dificuldade
    xpMax = xpMin + incremento - 1;
  }

  return niveis;
}