document.addEventListener('DOMContentLoaded', () => {
    const numberInput = document.getElementById('numberInput');
    const outputValue = document.getElementById('outputValue');
    
    function processNumber(number) {
        if (number === '') {
            return '';
        }
        
        const num = parseFloat(number);
        
        if (isNaN(num)) {
            return 'Please enter a valid number';
        }
        let num_array = num.toString().split('').reverse()
        
        let res = "", multiple = "", three = "", section = " "

        let multiple_counter = 0, sum = 0

        for (let i = 0; i < num_array.length; i = i + 3) {
            sum = num_sum([num_array[i + 2], num_array[i + 1], num_array[i]])
            multiple = get_multiply(sum, multiple_counter)
            three = handle_three(Number(num_array[i]), Number(num_array[i + 1]), Number(num_array[i + 2]))
            section = get_section(sum, three, multiple)
            res = res? (section.trim()? section + " و " + res : res) : three || " "
            multiple_counter++
        }
        return res
    }

    function handle_three(n1, n2, n3) {
        let two_numbers = ""
        if(n2) {
            if(n2 == 1) {
                if(n1 == 0) {
                    two_numbers = "عشرة"
                }else {
                    two_numbers = ten_ones[n1] + " " + tens[n2 -1]
                }
            }else {
                if (n1 == 0) {
                    two_numbers = tens[n2 -1]
                }else {
                    two_numbers = ones[n1] + " و " + tens[n2 -1]
                }
            }
        }else if (n1) {
            two_numbers =  ones[n1]
        }
        if(n3) {
            return two_numbers? hundreds[n3 -1] + " و " + two_numbers : hundreds[n3 -1]
        }else {
            return two_numbers
        }
    }

    function get_multiply(sum, multiple) {
        if (!sum || !multiple) {
            return ""
        }
        if (sum == 1 || sum == 2){
            return multiples[multiple - 1][sum - 1]
        }
        if (sum < 10) {
            return multiples[multiple - 1][2] 
        }
        return multiples[multiple - 1][3] 
    }

    function num_sum(num_array){
        let num_str = ""
        num_array.forEach(n => {
            if (Number(n)) {
                num_str = num_str + n
            }
        });
        return Number(num_str)
    }

    function get_section(sum, three, multiple) {
        if (sum == 1 || sum == 2){
            return multiple
        }
        return three + " " + multiple
    }
    
    // Add event listener for input changes
    numberInput.addEventListener('input', (event) => {
        const result = processNumber(event.target.value);
        outputValue.innerHTML = result;
    });
    
    // Initialize with empty value
    outputValue.innerHTML = '';
});
