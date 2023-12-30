document.addEventListener('DOMContentLoaded', function () {
    const bmiForm = document.getElementById('bmiForm');
    const resultContainer = document.getElementById('result');

    bmiForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const heightInput = document.getElementById('height');
        const weightInput = document.getElementById('weight');
        const ageInput = document.getElementById('age');

        if (!isValidInput(heightInput.value) || !isValidInput(weightInput.value) || !isValidInput(ageInput.value)) {
            alert('Please enter valid numeric values for height, weight, and age.');
            return;
        }

        const formData = new FormData(bmiForm);
        const calculatedBMI = calculateBMI(formData);

        resultContainer.innerHTML = `<p>BMI: ${calculatedBMI.bmi}</p><p>Classification: ${calculatedBMI.classification}</p>`;
    });

    function isValidInput(value) {
        return !isNaN(parseFloat(value)) && isFinite(value);
    }

    function calculateBMI(formData) {
        const height = parseFloat(formData.get('height'));
        const weight = parseFloat(formData.get('weight'));
        const age = parseInt(formData.get('age'));
        const units = formData.get('units');

        let heightInMeters;
        let weightInKg;

        if (units === 'metric') {
            heightInMeters = height / 100;
            weightInKg = weight;
        } else if (units === 'imperial') {
            heightInMeters = height * 0.3048;
            weightInKg = weight * 0.4536;
        } else {
            alert('Invalid units selected.');
            return;
        }

        const bmi = weightInKg / (heightInMeters * heightInMeters);

        let classification;
        if (age >= 20) {
            if (bmi < 16) {
                classification = 'Severe Thinness';
            } else if (bmi >= 16 && bmi < 17) {
                classification = 'Moderate Thinness';
            } else if (bmi >= 17 && bmi < 18.5) {
                classification = 'Mild Thinness';
            } else if (bmi >= 18.5 && bmi < 25) {
                classification = 'Normal';
            } else if (bmi >= 25 && bmi < 30) {
                classification = 'Overweight';
            } else if (bmi >= 30 && bmi < 35) {
                classification = 'Obese Class I';
            } else if (bmi >= 35 && bmi < 40) {
                classification = 'Obese Class II';
            } else {
                classification = 'Obese Class III';
            }
        } else {
            const bmiPercentile = calculateBMIPercentile(bmi, age);

            if (bmiPercentile < 5) {
                classification = 'Underweight';
            } else if (bmiPercentile >= 5 && bmiPercentile <= 85) {
                classification = 'Healthy weight';
            } else if (bmiPercentile > 85 && bmiPercentile <= 95) {
                classification = 'At risk of overweight';
            } else {
                classification = 'Overweight';
            }
        }

        return { bmi: bmi.toFixed(2), classification };
    }


    function calculateBMIPercentile() {
        return 50;
    }
});
