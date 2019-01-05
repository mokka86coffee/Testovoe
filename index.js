

function handleInput(e, type) {
    let 
        value = e.target.value.toLowerCase(),
        classLink = e.target.parentNode.classList,
        testEmail = /\w{3,}@\w{3,}\.\w{2,}/g,
        testName = /\w{3,}/g;
        switch (type) {
        case 'email': if (
            testEmail.test(value) 
            && !(value.search(/(([\s])+|([@]){2,})/g) + 1) 
            && (value.search(/[@\.\w]+/g) + 1)) 
            { classLink.remove('invalid'); classLink.add('valid'); checkEmail=1;} 
            else { classLink.remove('valid'); classLink.add('invalid'); checkEmail=0;} break;
        default:
            if (testName.test(value) && !(value.search(/[\W]+/g) + 1 ) ) { 
                classLink.remove('invalid'); classLink.add('valid'); 
                if (type === 'name') { checkName = 1 } else { checkSurname = 1 }
            }
            else { 
                classLink.remove('valid'); classLink.add('invalid'); 
                if (type === 'name') { checkName = 0 } else { checkSurname = 0 }
            } break;
    }
}

let checkSum=0, checkEmail=0, checkName=0, checkSurname=0;

document.addEventListener("DOMContentLoaded", () => {
    let modalBtn = document.querySelector('.openForm');
    let modalClose = document.querySelector('.header__closeElem');
    let modalFormWrap = document.querySelector('.modal');
    modalBtn.addEventListener('click', e => modalFormWrap.style.display = 'block');
    modalClose.addEventListener('click', e => modalFormWrap.style.display = 'none');

    Array
        .from( document.querySelectorAll('.select select'))
        .forEach(el=> el.addEventListener('change', e => e.target.parentNode.classList.add('valid')) );

    document.querySelector('.select:nth-of-type(3) input').addEventListener('change', e => e.target.parentNode.classList.add('valid') );

    Array
        .from(document.querySelectorAll('.select:nth-of-type(n+4) input'))
        .forEach(el => {
            el.addEventListener('click', e => e.target.classList.add('focused'));
            el.addEventListener('change', e => handleInput(e,el.name));
    });

    let modalform = document.querySelector('.modalForm__form');
    modalform.addEventListener('submit', e=>{
        checkSum = checkEmail + checkName + checkSurname;
        if (checkSum!==3) { e.preventDefault() }
    });

});

// ReactDOM.render(<App />, document.querySelector('#root'));

