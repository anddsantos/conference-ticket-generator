const input = document.querySelector('#upFile')
const dropzone = document.querySelector('.drop-zone')
const iconUpload = document.querySelector('.icon-upload')
const upFileDesc = document.querySelector('.upFile-instructions')
const bxCircle = document.querySelector('.bx-info-circle')
const afterUpload = document.querySelector('.after-upload')
const removeImageBtn = document.querySelector('.remove-image-btn')
const changeImageBtn = document.querySelector('.change-image-btn')
let userIcon = null


input.addEventListener('change', () => {
    if (input.files.length > 0) {
        const type = input.files[0].type
        const formats = ['image/jpeg', 'image/png']
        const fileSize = (input.files[0].size / 1024).toFixed(2)
        if (!formats.includes(type) || fileSize > 500) {
            upFileDesc.innerText = 'File too large or wrong file type. Please upload a valid format and size file'
            upFileDesc.classList.add('error')
            bxCircle.classList.add('error')

            return
        }
        else {
            upFileDesc.innerText = 'Upload your photo (JPG or PNG, max size: 500KB)'
            upFileDesc.classList.remove('error')
            bxCircle.classList.remove('error')
        }

        const img = document.createElement('img')
        img.id = 'user-icon'
        img.class = 'user-icon'
        img.src = URL.createObjectURL(input.files[0])
        userIcon = img

        dropzone.innerHTML = ``
        iconUpload.remove()
        dropzone.appendChild(img)
        afterUpload.appendChild(removeImageBtn)
        afterUpload.appendChild(changeImageBtn)

        afterUpload.style.display = 'flex'
        afterUpload.style.opacity = 1

        removeImageBtn.addEventListener('click', () => {
            img.remove()
        })
    }
})

const changeInput = document.querySelector('.change-image-btn input');

changeInput.addEventListener('change', () => {
    if (changeInput.files.length > 0) {
        const type = changeInput.files[0].type;
        const formats = ['image/jpeg', 'image/png'];
        const fileSize = (changeInput.files[0].size / 1024).toFixed(2);

        if (!formats.includes(type) || fileSize > 500) {
            upFileDesc.innerText = 'File too large or wrong file type. Please upload a valid format and size file';
            upFileDesc.classList.add('error');
            bxCircle.classList.add('error');
            return;
        } else {
            upFileDesc.innerText = 'Upload your photo (JPG or PNG, max size: 500KB)';
            upFileDesc.classList.remove('error');
            bxCircle.classList.remove('error');
        }

        const oldImg = dropzone.querySelector('#user-icon');
        if (oldImg) {
            oldImg.remove();
        }

        const img = document.createElement('img');
        img.id = 'user-icon';
        img.className = 'user-icon';
        img.src = URL.createObjectURL(changeInput.files[0]);

        dropzone.innerHTML = '';
        dropzone.appendChild(img);

        afterUpload.style.display = 'flex';
        afterUpload.style.opacity = 1;

        removeImageBtn.addEventListener('click', (e) => {
            e.preventDefault()
            img.remove()
        })

        userIcon = img
    }
});

//email validation
const emailInput = document.querySelector('#email')
const form = document.querySelector('#form')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const email = emailInput.value
    const isValid = validatEmail(email)

    if (!isValid) {
        iziToast.show({
            title: 'Invalid email',
            message: 'Please check your email format',
            position: 'bottomLeft',
            timeout: 3100,
            backgroundColor: 'hsl(7, 88%, 67%)'
        })
    }
    else {
        animation()
        generateTicket(userIcon)
    }
})

function validatEmail(email) {
    const regex = /^[^\s]+@[^\s]+\.[^\s]+$/
    return regex.test(email)
}

//github user name input
const githubInput = document.querySelector('#gitHub')
githubInput.addEventListener('focus', () => {
    if (githubInput.value === '') githubInput.value = '@'
})

//generating ticket
const ticket = document.querySelector('.ticket-container')

function generateTicket(userIcon){
    const email = emailInput.value
    const emailSpan = document.querySelector('.email-span')
    emailSpan.textContent = email

    const userNameInput = document.querySelector('.name')
    const userName = userNameInput.value
    const gitHubUserName = githubInput.value

    const userNameSpan = document.querySelector('.name-span')
    userNameSpan.textContent = userName
    
    const ticketUserName = document.querySelector('.ticket-user-name')
    const ticketGitHubName = document.querySelector('.ticket-github-name')

    ticketUserName.textContent = userName
    ticketGitHubName.textContent = gitHubUserName

    const badgeNumber = Math.floor(Math.random() * 10000)
    const badgeNumberInput = document.querySelector('.ticket-number')

    if(badgeNumberInput){
        badgeNumberInput.textContent = `#${badgeNumber}`
    }

    const ticketImage = document.querySelector('.ticket-user-icon')
    if (ticketImage && userIcon) {
        ticketImage.src = userIcon.src
    }
}

function animation() {
    const header = document.querySelector('.header')
    const loader = document.querySelector('.loader')
    const loaderStatus = document.querySelector('.loader-status')
    const loaderContainer = document.querySelector('.loader-container')
    loaderContainer.style.display = 'flex'

    if(loader){
        loader.style.display = 'block'
        loader.offsetHeight;
    }
    form.style.display = 'none'
    header.style.display = 'none'

    const status = [
        'Putting everything in its place',
        'Generating code',
        'Generating ticket'
    ]

    let i = 0;

    const interval = setInterval(() => {
        loaderStatus.textContent = status[i];
        i++;

        if (i >= status.length) {
            clearInterval(interval);
            loader.style.display = 'none'
            ticket.style.display = 'block'
            loaderContainer.style.display = 'none'
        }
    }, 2000);
}