const unidades = {
    comprimento: {
        METRO: 1,
        CENTÍMETRO: 0.01,
        MILÍMETRO: 0.001,
        QUILÔMETRO: 1000,
        POLEGADA: 0.0254,
        PÉS: 0.3048,
        JARDA: 0.9144,
        MILHA: 1609.34
    },
    massa: {
        GRAMA: 1,
        QUILOGRAMA: 1000,
        MILIGRAMA: 0.001,
        TONELADA: 1000000,
        LIBRA: 453.592,
        ONÇA: 28.3495
    },
    temperatura: {
        CELSIUS: 'CELSIUS',
        FAHRENHEIT: 'FAHRENHEIT',
        KELVIN: 'KELVIN'
    },
    dados: {
        BIT: 1,
        BYTE: 8,
        KILOBYTE: 8 * 1024,
        MEGABYTE: 8 * 1024 * 1024,
        GIGABYTE: 8 * 1024 * 1024 * 1024,
        TERABYTE: 8 * 1024 * 1024 * 1024 * 1024
    }
};

const categoriaEl = document.getElementById('categoria');
const deSelect = document.getElementById('de');
const paraSelect = document.getElementById('para');

function atualizarUnidades() {
    const categoria = categoriaEl.value;
    const opcoes = Object.keys(unidades[categoria]);
    deSelect.innerHTML = '';
    paraSelect.innerHTML = '';

    opcoes.forEach(unidade => {
        const option1 = document.createElement('option');
        option1.value = unidade;
        option1.textContent = unidade.charAt(0).toUpperCase() + unidade.slice(1).toLowerCase();
        deSelect.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = unidade;
        option2.textContent = unidade.charAt(0).toUpperCase() + unidade.slice(1).toLowerCase();
        paraSelect.appendChild(option2);
    });
}

function converter() {
    const categoria = categoriaEl.value;
    const valor = parseFloat(document.getElementById('valor').value);
    const de = deSelect.value;
    const para = paraSelect.value;
    const resultadoEl = document.getElementById('resultado');

    if (isNaN(valor)) {
        resultadoEl.textContent = 'Digite um valor válido';
        return;
    }

    let convertido;

    if (categoria === 'temperatura') {
        let tempBaseCelsius;
        // Primeiro, converte tudo para Celsius
        if (de === 'CELSIUS') {
            tempBaseCelsius = valor;
        } else if (de === 'FAHRENHEIT') {
            tempBaseCelsius = (valor - 32) * 5 / 9;
        } else if (de === 'KELVIN') {
            tempBaseCelsius = valor - 273.15;
        }

        // Depois, converte de Celsius para a unidade de destino
        if (para === 'CELSIUS') {
            convertido = tempBaseCelsius;
        } else if (para === 'FAHRENHEIT') {
            convertido = (tempBaseCelsius * 9 / 5) + 32;
        } else if (para === 'KELVIN') {
            convertido = tempBaseCelsius + 273.15;
        }
    } else {
        // Lógica original para outras categorias
        const base = valor * unidades[categoria][de];
        convertido = base / unidades[categoria][para];
    }

    resultadoEl.textContent = `${valor} ${de} = ${convertido.toFixed(4)} ${para}`;
}

// Event listener para o select de categoria (se existir)
if (categoriaEl.tagName === 'SELECT') {
    categoriaEl.addEventListener('change', atualizarUnidades);
}

// Inicializa as unidades na carga da página
atualizarUnidades();