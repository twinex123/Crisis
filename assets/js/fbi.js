const phoneNumber = document.getElementById('phone-number');
const keys = document.querySelectorAll('.key');

let number = '';

keys.forEach(key => {
    key.addEventListener('click', (e) => {
        const num = e.target.getAttribute('data-number');
        if (num) {
            if (number.length < 15) { 
                number += num;
                phoneNumber.textContent = number;
            }
        } else if (e.target.id === 'del') {
            number = '';
            phoneNumber.textContent = '';
        } else if (e.target.id === 'clear') { {
            var phone_number = phoneNumber.textContent
            if (phone_number === '3354'){
                var calling_sound = new Audio("../assets/sounds/phone.mp3");
                calling_sound.play();

                setTimeout(() => {
                    window.parent.postMessage({type: 'repairPhone'}, '*'); 
                }, 15000)
            }
        }
    }});
});
