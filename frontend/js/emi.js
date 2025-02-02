// Sliders and Display Elements
const loanAmountSlider = document.getElementById('loanAmount');
const loanTenureSlider = document.getElementById('loanTenure');
const interestRateSlider = document.getElementById('interestRate');

const loanAmountValue = document.getElementById('loanAmountValue');
const loanTenureValue = document.getElementById('loanTenureValue');
const interestRateValue = document.getElementById('interestRateValue');
const emiValueDisplay = document.getElementById('emiValue');

const ctx = document.getElementById('emiChart').getContext('2d');
let emiChart;

/**
 * Initialize the EMI Breakdown Doughnut Chart
 * @param {number} principal - The loan principal amount
 * @param {number} interest - The total interest
 */
function initializeChart(principal, interest) {
  if (emiChart) emiChart.destroy();

  emiChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Principal', 'Interest'],
      datasets: [{
        data: [principal, interest],
        backgroundColor: ['#6a67ce', '#ffbc00'],
        hoverBackgroundColor: ['#5d5ab4', '#e0a800']
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              const value = tooltipItem.raw;
              return `${tooltipItem.label}: ₹ ${value.toLocaleString()}`;
            }
          }
        }
      }
    }
  });
}

/**
 * Update the EMI Calculation and Display the Result
 */
function updateEMI() {
  const loanAmount = parseFloat(loanAmountSlider.value);
  const loanTenure = parseFloat(loanTenureSlider.value) * 12;
  const interestRate = parseFloat(interestRateSlider.value) / 12 / 100;

  // Update slider value displays
  loanAmountValue.textContent = loanAmount.toLocaleString();
  loanTenureValue.textContent = loanTenureSlider.value;
  interestRateValue.textContent = interestRateSlider.value;

  let emi = 0;
  let totalInterest = 0;

  // EMI Calculation Formula
  if (interestRate > 0) {
    emi = (loanAmount * interestRate * Math.pow(1 + interestRate, loanTenure)) /
          (Math.pow(1 + interestRate, loanTenure) - 1);
    totalInterest = emi * loanTenure - loanAmount;
  }

  emiValueDisplay.textContent = `₹ ${Math.round(emi).toLocaleString()}`;
  
  // Update the EMI chart
  initializeChart(loanAmount, totalInterest);
}

// Event Listeners for Slider Inputs
loanAmountSlider.addEventListener('input', updateEMI);
loanTenureSlider.addEventListener('input', updateEMI);
interestRateSlider.addEventListener('input', updateEMI);

// Initial Calculation
updateEMI();
