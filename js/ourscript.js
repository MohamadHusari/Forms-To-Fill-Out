let AllbtnNext , AllbtnPrevious, myTabsContent, Student, displayImg, displayName, displayEmail, displayBirthDate, displayLocation, displayHobbies;
Student = {};
AllbtnNext = document.querySelectorAll('.btnNext');
AllbtnPrevious = document.querySelectorAll('.btnPrevious');
myTabsContent = document.querySelector('myTabsContent');
displayImg = document.querySelector('#displatImg');
displayName = document.querySelector('#displayName');
displayEmail = document.querySelector('#displayEmail');
displayBirthDate = document.querySelector('#displayBirthDate');
displayLocation = document.querySelector('#displayLocation');
displayHobbies = document.querySelector('#displayHobbies');
AllbtnNext.forEach(function (btnNext) {
    btnNext.addEventListener('click', () => {
        const activetab = document.querySelector('.nav-item > .active');
        const phaseinputs = document.querySelectorAll(activetab.getAttribute('href') +' input[id^="txt"]');
        let retval = false;
        if(phaseinputs) {
            retval = true;
            for (let input of phaseinputs) {
                if (!input.classList.contains('is-valid')) {
                    if(!input.classList.contains('is-invalid')) {
                        input.classList.add('is-invalid');
                    }
                    retval = false;
                }
            }
        }
        if(retval){
            const nextactivelink = activetab.closest('li').nextElementSibling.querySelector('a');
            activetab.setAttribute('aria-selected', 'false');
            activetab.classList.remove('active');
            activetab.classList.add('disabled');
            nextactivelink.setAttribute('aria-selected', 'true');
            nextactivelink.classList.remove('disabled');
            nextactivelink.classList.add('active');
            nextactivelink.click;
            const disbletab = document.querySelector('#myTabContent ' + activetab.getAttribute('href'));
            const enabletab = document.querySelector('#myTabContent ' + nextactivelink.getAttribute('href'));
            disbletab.classList.remove('show');
            disbletab.classList.remove('active');
            disbletab.classList.add('d-none');
            enabletab.classList.add('show');
            enabletab.classList.add('active');
            enabletab.classList.remove('d-none');
            for (let input of phaseinputs) {
                Student[input.getAttribute('id')] = input.value;
            }
            if (Student['txtImage']){
                Student['txtHobbies'] = Array.from(document.querySelectorAll(activetab.getAttribute('href') +' input[type=checkbox]:checked'))
                    .map(item => item.value)
                    .join(',');
                displayImg.src = Student['txtImage'];
                displayName.innerText = Student['txtName'];
                displayEmail.innerHTML = `<i class="fas fa-envelope-open"></i> ${Student['txtEmail']}`;
                displayBirthDate.innerHTML = `<i class="fas fa-birthday-cake"></i> ${Student['txtBirthdate']}`;
                displayHobbies.innerHTML = `<i class="fas fa-ticket-alt"></i> ${Student['txtHobbies']}`;
                displayLocation.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${Student['txtCity']}, ${Student['txtStreet']} - ${Student['txtNumber']}`;
            }
        }
    });
});
AllbtnPrevious.forEach(function (btnPrevious) {
    btnPrevious.addEventListener('click', () => {
        const activetab = document.querySelector('.nav-item > .active');
        const nextactivelink = activetab.closest('li').previousElementSibling.querySelector('a');
        const phaseinputs = document.querySelectorAll(activetab.getAttribute('href') +' input[id^="txt"]');
        if(phaseinputs) {
            for (let input of phaseinputs) {
                if (input.classList.contains('is-invalid')) {
                    input.classList.remove('is-invalid');
                }
            }
        }
        activetab.setAttribute('aria-selected','false');
        activetab.classList.remove('active');
        activetab.classList.add('disabled');
        nextactivelink.setAttribute('aria-selected','true');
        nextactivelink.classList.remove('disabled');
        nextactivelink.classList.add('active');
        nextactivelink.click();
        const disbletab = document.querySelector('#myTabContent ' + activetab.getAttribute('href'));
        const enabletab = document.querySelector('#myTabContent ' + nextactivelink.getAttribute('href'));
        disbletab.classList.remove('show');
        disbletab.classList.remove('active');
        disbletab.classList.add('d-none');
        enabletab.classList.add('show');
        enabletab.classList.add('active');
        enabletab.classList.remove('d-none');
        // activetab.classList.remove('active');
        for (let input of phaseinputs) {
            if(Student[input.getAttribute('id')])
                delete Student[input.getAttribute('id')];
        }
        if (Student['txtHobbies']){
            delete Student['txtHobbies'];
        }
    });
});

function TurnOn(elem) {
    if(elem.classList.contains('is-invalid'))
    {
        elem.classList.remove('is-invalid');
        elem.classList.add('is-valid');
    }
    else {
        elem.classList.add('is-valid');
    }
}
function TurnOff(elem) {
    if(elem.classList.contains('valid')){
        elem.classList.add('is-invalid');
        elem.classList.remove('is-valid');
    }
    else {
        elem.classList.add('is-invalid');
    }
}
function NameCheck(elem) {
    // console.log(elem);
    if(elem.value.length >= 3)
        TurnOn(elem);
    else
        TurnOff(elem);
}

function EmailCheck(elem) {
    if(elem.value.includes('@') && elem.value.length > 5 && elem.value.includes('.'))
        TurnOn(elem);
    else
        TurnOff(elem);
}
function isGoodDate(dt) {
    const reGoodDate = /^\d{4}-\d{2}-\d{2}$/;
    return reGoodDate.test(dt);
}

function BirthdateCheck(elem) {
    // console.log(elem.value);
    // console.log(isGoodDate(elem.value));
    if(isGoodDate(elem.value))
        TurnOn(elem);
    else
        TurnOff(elem);
}

function FeildNotEmpty(elem) {
    if(elem.value.length > 0)
        TurnOn(elem);
    else
        TurnOff(elem);
}

function NumberCheck(elem) {
    if(elem.value > 0)
        TurnOn(elem);
    else
        TurnOff(elem);
}

function ImageCheck(elem) {
    if(elem.value && (elem.value.startsWith('http://') || elem.value.startsWith('https://')))
        TurnOn(elem);
    else
        TurnOff(elem);
}
