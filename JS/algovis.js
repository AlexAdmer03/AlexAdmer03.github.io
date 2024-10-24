let array = [];
let isSorting = false;
let comparisons = 0;
let swaps = 0;
let startTime;
let showNumbers = true;

// DOM Elements
const arrayContainer = document.getElementById('arrayContainer');
const arraySizeSlider = document.getElementById('arraySize');
const arraySizeValue = document.getElementById('arraySizeValue');
const speedSlider = document.getElementById('speed');
const speedValue = document.getElementById('speedValue');
const showNumbersCheckbox = document.getElementById('showNumbers');
const comparisonsElement = document.getElementById('comparison');
const swapsElement = document.getElementById('swaps');
const timeElement = document.getElementById('time');

function generateArray() {
    const size = parseInt(arraySizeSlider.value);
    array = Array(size).fill().map(() => Math.floor(Math.random() * 100) + 1);
    renderArray();
    resetStats();
}

function renderArray() {
    arrayContainer.innerHTML = '';
    const maxValue = Math.max(...array);
    array.forEach((value) => {
        const barContainer = document.createElement('div');
        barContainer.className = 'algovis-bar-container';

        const bar = document.createElement('div');
        bar.className = 'algovis-bar-element';
        bar.style.height = `${(value / maxValue) * 350}px`;

        const valueLabel = document.createElement('div');
        valueLabel.className = 'algovis-bar-value';
        valueLabel.textContent = value;
        valueLabel.style.display = showNumbers ? 'block' : 'none';

        barContainer.appendChild(valueLabel);
        barContainer.appendChild(bar);
        arrayContainer.appendChild(barContainer);
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getSpeed() {
    return 101 - parseInt(speedSlider.value);
}

async function markBarsAsComparing(i, j) {
    const bars = arrayContainer.children;
    bars[i].querySelector('.algovis-bar-element').classList.add('comparing');
    bars[j].querySelector('.algovis-bar-element').classList.add('comparing');
    comparisons++;
    comparisonsElement.textContent = comparisons;
    await sleep(getSpeed());
    bars[i].querySelector('.algovis-bar-element').classList.remove('comparing');
    bars[j].querySelector('.algovis-bar-element').classList.remove('comparing');
}

async function swapBars(i, j) {
    const bars = arrayContainer.children;
    const maxValue = Math.max(...array);

    bars[i].querySelector('.algovis-bar-element').classList.add('swapping');
    bars[j].querySelector('.algovis-bar-element').classList.add('swapping');

    // Swap values
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;

    // Update bars ans numbers
    bars[i].querySelector('.algovis-bar-element').style.height = `${(array[i] / maxValue) * 350}px`;
    bars[j].querySelector('.algovis-bar-element').style.height = `${(array[j] / maxValue) * 350}px`;
    bars[i].querySelector('.algovis-bar-value').textContent = array[i];
    bars[j].querySelector('.algovis-bar-value').textContent = array[j];

    swaps++;
    swapsElement.textContent = swaps;

    await sleep(getSpeed());
    bars[i].querySelector('.algovis-bar-element').classList.remove('swapping');
    bars[j].querySelector('.algovis-bar-element').classList.remove('swapping');
}

function resetStats() {
    comparisons = 0;
    swaps = 0;
    comparisonsElement.textContent = '0';
    swapsElement.textContent = '0';
    timeElement.textContent = '0.0s';
}

function updateTime() {
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    timeElement.textContent = elapsed + 's';
}

// Sorting Algorithms
async function bubbleSort() {
    const n = array.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (!isSorting) return;
            await markBarsAsComparing(j, j + 1);
            if (array[j] > array[j + 1]) {
                await swapBars(j, j + 1);
            }
        }
        arrayContainer.children[n - i - 1].querySelector('.algovis-bar-element').classList.add('sorted');
    }
    arrayContainer.children[0].querySelector('.algovis-bar-element').classList.add('sorted');
}

async function quickSort(start = 0, end = array.length - 1) {
    if (start >= end || !isSorting) return;

    const pivot = array[end];
    let i = start - 1;

    for (let j = start; j < end; j++) {
        if (!isSorting) return;
        await markBarsAsComparing(j, end);
        if (array[j] < pivot) {
            i++;
            await swapBars(i, j);
        }
    }
    await swapBars(i + 1, end);

    const pi = i + 1;
    arrayContainer.children[pi].querySelector('.algovis-bar-element').classList.add('sorted');

    await quickSort(start, pi - 1);
    await quickSort(pi + 1, end);

    if (start === 0 && end === array.length - 1) {
        for (let i = 0; i < array.length; i++) {
            arrayContainer.children[i].querySelector('.algovis-bar-element').classList.add('sorted');
        }
    }
}

async function mergeSort(start = 0, end = array.length - 1) {
    if (start >= end || !isSorting) return;

    const mid = Math.floor((start + end) / 2);
    await mergeSort(start, mid);
    await mergeSort(mid + 1, end);
    await merge(start, mid, end);

    if (start === 0 && end === array.length - 1) {
        for (let i = 0; i < array.length; i++) {
            arrayContainer.children[i].querySelector('.algovis-bar-element').classList.add('sorted');
        }
    }
}

async function merge(start, mid, end) {
    const maxValue = Math.max(...array);
    const left = array.slice(start, mid + 1);
    const right = array.slice(mid + 1, end + 1);
    let i = 0, j = 0, k = start;

    while (i < left.length && j < right.length && isSorting) {
        await markBarsAsComparing(start + i, mid + 1 + j);
        if (left[i] <= right[j]) {
            array[k] = left[i];
            arrayContainer.children[k].querySelector('.algovis-bar-element').style.height = 
                `${(array[k] / maxValue) * 350}px`;
            arrayContainer.children[k].querySelector('.algovis-bar-value').textContent = array[k];
            i++;
        } else {
            array[k] = right[j];
            arrayContainer.children[k].querySelector('.algovis-bar-element').style.height = 
                `${(array[k] / maxValue) * 350}px`;
            arrayContainer.children[k].querySelector('.algovis-bar-value').textContent = array[k];
            j++;
        }
        swaps++;
        swapsElement.textContent = swaps;
        k++;
        await sleep(getSpeed());
    }

    while (i < left.length && isSorting) {
        array[k] = left[i];
        arrayContainer.children[k].querySelector('.algovis-bar-element').style.height = 
            `${(array[k] / maxValue) * 350}px`;
        arrayContainer.children[k].querySelector('.algovis-bar-value').textContent = array[k];
        i++;
        k++;
        await sleep(getSpeed());
    }

    while (j < right.length && isSorting) {
        array[k] = right[j];
        arrayContainer.children[k].querySelector('.algovis-bar-element').style.height = 
            `${(array[k] / maxValue) * 350}px`;
        arrayContainer.children[k].querySelector('.algovis-bar-value').textContent = array[k];
        j++;
        k++;
        await sleep(getSpeed());
    }
}

async function startSorting(algorithm) {
    if (isSorting) return;
    isSorting = true;
    document.querySelectorAll('.algovis-button').forEach(btn => btn.disabled = true);
    arraySizeSlider.disabled = true;
    
    Array.from(arrayContainer.children).forEach(bar => {
        bar.querySelector('.algovis-bar-element').classList.remove('sorted');
    });
    
    resetStats();
    startTime = Date.now();
    const timeInterval = setInterval(updateTime, 100);
    
    await algorithm();
    
    clearInterval(timeInterval);
    isSorting = false;
    document.querySelectorAll('.algovis-button').forEach(btn => btn.disabled = false);
    arraySizeSlider.disabled = false;
}

// Event Listeners
document.getElementById('newArray').addEventListener('click', generateArray);

arraySizeSlider.addEventListener('input', () => {
    arraySizeValue.textContent = arraySizeSlider.value;
    if (!isSorting) generateArray();
});

speedSlider.addEventListener('input', () => {
    speedValue.textContent = speedSlider.value;
});

showNumbersCheckbox.addEventListener('change', () => {
    showNumbers = showNumbersCheckbox.checked;
    document.querySelectorAll('.algovis-bar-value').forEach(value => {
        value.style.display = showNumbers ? 'block' : 'none';
    });
});

document.getElementById('bubbleSort').addEventListener('click', () => startSorting(bubbleSort));
document.getElementById('quickSort').addEventListener('click', () => startSorting(quickSort));
document.getElementById('mergeSort').addEventListener('click', () => startSorting(mergeSort));


generateArray();