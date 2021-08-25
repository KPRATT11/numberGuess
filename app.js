const gameProperties = {
    amountOfNums: 99,
    randomNumber: 0
}
//instantly generate random number first time around
gameProperties.randomNumber = generateRandomNumber()


const inputContainer = document.querySelector('.inputNumbers')
const numberOfGuessDisplayer = document.querySelector('.numberOfGuesses')
const resultsMessage = document.querySelector('.resultsMessage')
const resetButton = document.querySelector('.guessButton')

resetButton.addEventListener('click', resetGame)

function resetGame(){
    resultsMessage.classList.remove('success')
    resultsMessage.textContent = 'Press a number to guess'
    gameProperties.randomNumber = generateRandomNumber()
    numberOfGuessDisplayer.textContent = 0
    enableAllButtons()
}


function generateRandomNumber(){
    return Math.ceil(Math.random() * gameProperties.amountOfNums)   
}

function generateButtons(targetParent){
    for (let i = 1; i <= gameProperties.amountOfNums; i ++){
        let newButton = document.createElement('button')
        newButton.classList.add(i.toString())
        newButton.classList.add('guessButton')
        newButton.textContent = i.toString()
        newButton.addEventListener('click', guessButtonFunction)
        targetParent.appendChild(newButton)
    }
}

function guessButtonFunction(e){
    increaseNumberOfGuesses()
    e.target.disabled = true
    if (gameProperties.randomNumber === Number(e.target.classList[0])){
        winningGuess()
    }else {
        badGuess()
    }
}

function enableAllButtons(){
    let buttons = inputContainer.childNodes
    buttons.forEach((button) => {
        button.disabled = false
    })
}

function disableAllButtons(){
    let buttons = inputContainer.childNodes
    buttons.forEach((button) => {
        button.disabled = true
    })
}

function increaseNumberOfGuesses(){
    numberOfGuessDisplayer.textContent = Number(numberOfGuessDisplayer.textContent) + 1
}


function generateMessage(messageArray){
    return messageArray[Math.floor(Math.random() * messageArray.length)]
}


const randomBadMessages = [
    'You are trash', 'Bruh are stupid', 'Heres a hint the number is higher than your iq',
    'Just give up', `THERE ARE ${gameProperties.amountOfNums} NUMBERS HOW BAD CAN YOU BE`, 'This is a childrens game and you are still bad',
    'I hope you feel embarssed', 'You disgust me', 'Go back to playing candyland you pathetic child']

function badGuess(){
    let randomMessage = generateMessage(randomBadMessages)

    //this while loop makes sure that we dont get the same message twice in a row
    while (randomMessage === resultsMessage.textContent){
        randomMessage = generateMessage(randomBadMessages)
    }
    resultsMessage.textContent = randomMessage
}

const randomGoodGuess = [
    'WOWWW SO IMPRESSIVE YOU CLICKED ON A BUTTON', 'you got it right, what do you want a medal?',
    'Took your time', 'correct, but isnt it sad that this is the most you have achived this week'
]

function winningGuess(){
    disableAllButtons()
    resultsMessage.classList.add('success')
    randomMessage = generateMessage(randomGoodGuess)
    resultsMessage.textContent = randomMessage
    setTimeout(resetGame, 4000)
}

generateButtons(inputContainer)
