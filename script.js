// Variables de base pour la gestion du terminal
const inputField = document.getElementById('input');
const outputDiv = document.getElementById('output');
const asciiArtDiv = document.getElementById('asciiArt');
const body = document.body; // Sélectionne le body pour changer sa couleur
const terminal = document.getElementById('terminal'); // Sélectionne le terminal
const promptLine = document.getElementById('prompt'); // Sélectionne l'invite de commande
const gradientOverlay = document.getElementById('gradientOverlay');  // Superposition du dégradé
const quizContainer = document.getElementById('quizContainer'); // Conteneur du quiz
const quizQuestion = document.getElementById('quizQuestion'); // Question du quiz
const wordGrid = document.getElementById('wordGrid'); // Grille des mots

const alternativePhrases = [
    "Qu'est-ce qu'elle raconte la yakak là",
    "Hein ?",
    "Elle est pute ou quoi cette conne ? Je suis juste un ordi, je ne comprends pas tout ce que tu racontes",
    "Elle va la fermer celle là",
    "Tais toi pour voir. Ouais c'est mieux",
    "T'as pas d'autres idées ? Parce que ça, c'est nul.",
    "Et là, tu attends quoi de moi ?",
    "Qu'est-ce que tu veux que je fasse avec ça, exactement ?",
    "On est d'accord que ça ne mène nulle part, non ?",
    "J'espère que tu as une meilleure idée que ça.",
    "T'as vraiment cru que ça allait marcher ?",
    "Encore une de tes brillantes idées, j'imagine ?",
    "Tu veux un bon conseil ? C’est pas ça.",
    "Je parie que ça a l'air mieux dans ta tête.",
    "Tu as vraiment pensé à ça, ou c'est juste sorti comme ça ?"
];

let usedPhrases = [];



// Commandes disponibles
const commands = {
    "help": "Help ? Vraiment ? Tu pensais t'en tirer comme ça ?",
    "clear": function() {
        outputDiv.innerHTML = '';
        body.style.background = "black";  // Réinitialiser la couleur de fond du body à noir
        gradientOverlay.style.opacity = 0;  // Masquer le dégradé en le rendant invisible
        terminal.classList.remove('move-up');  // Remet le terminal à sa position initiale
        quizContainer.style.display = 'none'; // Masquer le quiz
    },
    "clara": function() {
        displayRomanticMessage();
        promptLine.textContent = "Niveau 1";
    },
    "quizxxxxxxx": function() {
        startQuiz();
    },
    "raclette": function() {
        fadeToBlack();
    },
    "je t'aime": "Moi aussi je t'aime mon mimi"
};

// Gestion de l'input de l'utilisateur
inputField.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        const inputValue = inputField.value.toLowerCase().trim();
        processCommand(inputValue);
        inputField.value = ''; // Réinitialise le champ input
    }
});

function getRandomPhrase() {
    if (usedPhrases.length == alternativePhrases.length) {
        printOutput("Allez, c'est bon, tu m'as saoulé, je me tais."); // Message de fatigue
        usedPhrases.push(1);
        return null; // Aucun retour
    }
    if (usedPhrases.length >= alternativePhrases.length) {
        return null; // Aucun retour
    }
    
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * alternativePhrases.length);
    } while (usedPhrases.includes(randomIndex));

    usedPhrases.push(randomIndex); // Marquer cette phrase comme utilisée
    return alternativePhrases[randomIndex]; // Retourner la phrase
}

// Traiter la commande saisie par l'utilisateur
function processCommand(inputCommand) {
    const command = inputCommand.trim();
    if (commands[command]) {
        if (typeof commands[command] === "function") {
            commands[command](); // Exécute la fonction associée
        } else {
            printOutput(commands[command]);
        }
    } else {
        const phrase = getRandomPhrase(); // Obtenir une phrase aléatoire
        if (phrase) {
            printOutput(phrase); // Affiche la phrase si elle existe
        }
    }
}

// Affichage du message romantique pour la commande 'clara'
function displayRomanticMessage() {
    // Ajouter du texte romantique qui défile
    outputDiv.innerHTML = '';
    let text = "C'est bien toi que j'attendais";
    let i = 0;

    const scrollText = setInterval(function() {
        if (i < text.length) {
            outputDiv.innerHTML += text.charAt(i);
            i++;
        } else {
            clearInterval(scrollText);
            // Lancer le quiz après avoir affiché le message romantique
            outputDiv.innerHTML += "<br>";
            startQuiz(); // Lance le quiz
        }
    }, 30); // Vitesse du texte défilant

    // Faire apparaître le dégradé en augmentant progressivement l'opacité
    gradientOverlay.style.opacity = 1;
    gradientOverlay.classList.add('come-up-grad')

    // Ajouter la classe pour déplacer le terminal vers le haut
    terminal.classList.add('move-up');
}

// Fonction pour démarrer le quiz
function startQuiz() {
    // Afficher le conteneur du quiz
    quizContainer.style.display = 'block'; // Afficher le quiz
    quizQuestion.textContent = "Choisis un mot parmi les suivants :"; // Question du quiz

    const words = [
        "patate", "carambolage", "hippopotame", "salsifis",
        "canapé", "brouhaha", "oléoduc", "parapluie",
        "trombone", "gribouillage", "farfelu", "zébu",
        "abracadabra", "cacahuète", "balustrade", "nénuphar"
    ];

    // Mélanger les mots
    const shuffledWords = words.sort(() => Math.random() - 0.5);

    // Vider la grille précédente
    wordGrid.innerHTML = '';

    // Afficher les mots dans une grille
    shuffledWords.forEach((word) => {
        const wordElement = document.createElement('div');
        wordElement.textContent = word;
        wordElement.classList.add('word'); // Ajouter la classe pour le style
        wordElement.onclick = () => {
            if (word === "oléoduc") {
                // Déplacer le terminal et afficher un nouveau terminal
                terminal.classList.add('slide-up'); // Ajouter la classe pour faire glisser le terminal vers le haut
                quizContainer.classList.add('slide-up-center');
                terminal.classList.add('come-up');
                outputDiv.innerHTML = '';
                promptLine.textContent = "Niveau 2";
                const gradientOverlay = document.getElementById('gradientOverlay');
                gradientOverlay.classList.add('goodbye-grad')
                const secondGradientOverlay = document.getElementById('secondGradientOverlay');
                secondGradientOverlay.style.opacity = 1;
                secondGradientOverlay.classList.add('come-up-grad')
                startLevel2(4); // Démarrer la création des lettres



            } else {
                // Effacer tout et afficher le message "Tu n'es pas Clara"
                clearTerminalAndShowMessage();
            }
            //quizContainer.style.display = 'none'; // Masquer le quiz après un choix
        };
        wordGrid.appendChild(wordElement);
    });
}

// Fonction pour faire défiler le terminal vers le bas et afficher un nouveau terminal
function slideTerminalUp() {
    terminal.classList.add('slide-up'); // Ajouter la classe pour faire glisser le terminal vers le haut
    quizContainer.classList.add('slide-up');

    // Créer un nouvel élément terminal
    const newTerminal = document.createElement('div');
    newTerminal.id = 'new-terminal'; // Identifier le nouveau terminal
    newTerminal.style.position = 'fixed';
    newTerminal.style.bottom = '0'; // Positionner le nouveau terminal en bas
    newTerminal.style.width = '100%';
    newTerminal.style.height = '50%'; // Hauteur du nouveau terminal
    newTerminal.style.backgroundColor = 'black'; // Fond noir
    newTerminal.style.color = '#00FF00'; // Couleur du texte
    newTerminal.style.padding = '10px'; // Espacement

    // Afficher le nouveau terminal avec un style de texte
    const newOutputDiv = document.createElement('div');
    newOutputDiv.id = 'output';
    newOutputDiv.style.overflowY = 'auto';
    newOutputDiv.style.height = '100%'; // Prendre toute la hauteur

    const newPromptLine = document.createElement('div');
    newPromptLine.id = 'command-line';
    newPromptLine.innerHTML = '<span id="prompt">Entrée :</span><input type="text" id="input" autofocus>';

    newTerminal.appendChild(newOutputDiv);
    newTerminal.appendChild(newPromptLine);
    document.body.appendChild(newTerminal); // Ajouter le nouveau terminal au body

    // Ajouter la classe pour faire apparaître le nouveau terminal
    newTerminal.classList.add('slide-up');
}


// Fonction pour effacer le terminal et afficher le message
function clearTerminalAndShowMessage() {
    // Vider le terminal
    outputDiv.innerHTML = '';
    terminal.style.display = 'none'; // Masquer le terminal

    // Créer un nouvel élément pour afficher le message
    const messageContainer = document.createElement('div');
    messageContainer.style.position = 'fixed';
    messageContainer.style.top = '0';
    messageContainer.style.left = '0';
    messageContainer.style.width = '100%';
    messageContainer.style.height = '100%';
    messageContainer.style.backgroundColor = 'black';
    messageContainer.style.color = 'white';
    messageContainer.style.display = 'flex';
    messageContainer.style.justifyContent = 'center';
    messageContainer.style.alignItems = 'center';
    messageContainer.style.fontSize = '48px'; // Grande taille de police
    messageContainer.textContent = 'Tu n\'es pas Clara';

    // Ajouter le message au body
    document.body.appendChild(messageContainer);

    // Remplacer le message par "Au revoir" après un délai
    setTimeout(() => {
        messageContainer.textContent = 'Au revoir'; // Remplace le message
    }, 2000); // Délai avant de changer le message

    // Fermer la fenêtre après un délai
    setTimeout(() => {
        window.close(); // Ferme la fenêtre après 4 secondes (2 secondes pour le premier message + 2 secondes pour le second message)
    }, 4000);
}


// Afficher les résultats dans le terminal
function printOutput(text) {
    const p = document.createElement('p');
    p.textContent = text;
    outputDiv.appendChild(p);
}

const lettersContainer = document.getElementById('lettersContainer');
const wordContainer = document.getElementById('wordContainer'); // Conteneur du mot à former
const targetWord = "Joyeux anniversaire"; // Le mot à former
let formedWordArray = Array.from(""); // Préremplir avec des espaces
let remainingLetters = targetWord.split(""); // Liste des lettres restantes à cliquer
let clickedIndexes = new Set(); // Set pour suivre les index déjà cliqués

function createLetters() {
    lettersContainer.style.display = 'block';
    const letters = targetWord.split(''); // Obtenir toutes les lettres, y compris les espaces

    letters.forEach((letter, index) => {
        const letterElement = document.createElement('div');
        letterElement.textContent = letter;
        letterElement.classList.add('letter');
        letterElement.dataset.index = index; // Stocker l'index de la lettre pour la suivre
        setRandomPosition(letterElement); // Positionner les lettres aléatoirement

        // Vérifier si la lettre est un espace
        if (index === 6) {
            clickedIndexes.add(index); // Marquer cet index comme déjà cliqué
            moveLetterToWordContainer(letterElement, letter, index); // Déplacer directement la lettre
        }

        // Événement de clic pour placer les autres lettres
        letterElement.onclick = () => {
            if (!clickedIndexes.has(index)) {
                clickedIndexes.add(index); // Marquer cet index comme cliqué
                moveLetterToWordContainer(letterElement, letter, index); // Déplacer la lettre vers la bonne position
            }
        };

        lettersContainer.appendChild(letterElement);
        animateLetter(letterElement); // Animer la lettre
    });

    // Initialiser l'affichage du mot avec la lettre "J" déjà en place
    updateWordDisplay();
}


function moveLetterToWordContainer(letterElement, letter, index) {
    // Obtenir la position actuelle de la lettre
    const letterRect = letterElement.getBoundingClientRect();
    
    // Obtenir la position cible (dans le mot formé)
    const wordContainerRect = wordContainer.getBoundingClientRect();
    
    // Calculer la position de destination pour la lettre (index correspond à la position dans le mot)
    const targetX = wordContainerRect.left + index * 30; // Ajuster l'espace entre les lettres (30px par lettre)
    const targetY = wordContainerRect.top;

    // Animation vers le conteneur du mot
    const duration = 500; // Durée de l'animation en millisecondes
    let startTime = null;

    // Fonction d'animation
    function animate(time) {
        if (!startTime) startTime = time;
        const progress = Math.min((time - startTime) / duration, 1); // Progrès entre 0 et 1

        // Calculer la position intermédiaire pendant l'animation
        const currentX = letterRect.left + (targetX - letterRect.left) * progress;
        const currentY = letterRect.top + (targetY - letterRect.top) * progress;

        // Appliquer la transformation pour déplacer la lettre
        letterElement.style.transform = `translate(${currentX}px, ${currentY}px)`;

        // Si l'animation n'est pas terminée, continuer
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            // Une fois l'animation terminée, placer la lettre dans le mot
            formedWordArray[index] = letter; // Ajouter la lettre à sa position correcte
            updateWordDisplay(); // Mettre à jour l'affichage du mot
            letterElement.style.display = 'none'; // Masquer la lettre cliquée
        }
    }

    // Démarrer l'animation
    requestAnimationFrame(animate);
}




// Fonction pour mettre à jour l'affichage du mot formé
function updateWordDisplay() {
    // Vider le conteneur du mot
    wordContainer.innerHTML = '';

    // Ajouter chaque lettre formée ou un espace si la lettre est déjà à sa place
    formedWordArray.forEach((letter) => {
        const letterElement = document.createElement('span');
        letterElement.style.color = 'red';
        if (letter === ' ') {
            letterElement.innerHTML = '&nbsp;'; // Affiche un espace insécable
        } else {
            letterElement.textContent = letter; // Affiche la lettre
        }
        letterElement.classList.add('letterInPlace'); // Classe pour le style

        // Ajouter chaque lettre (ou espace) au conteneur du mot
        wordContainer.appendChild(letterElement);
    });

    // Vérifier si le mot est entièrement formé
    if (formedWordArray.join('') === targetWord) {
        displayHeartRain(); // Afficher le coeur quand le mot est complété
        startJeTaimeAnimation(); // Lancer l'animation du mot "je t'aime"
    }
}

function startJeTaimeAnimation() {
    wordContainer.classList.add('animate-word-up'); // Déplacer vers le haut
    wordContainer.querySelectorAll('.letterInPlace').forEach((letter) => {
        letter.classList.add('animate-letter-grow'); // Animer la taille des lettres
        letter.classList.add('animate-word-up');
    });
    const thirdGradientOverlay = document.getElementById('thirdGradientOverlay');
    thirdGradientOverlay.classList.add('goodbye-grad');
    const endGradientOverlay = document.getElementById('endGradientOverlay');
    endGradientOverlay.style.opacity = 1;
    endGradientOverlay.classList.add('come-up-grad');

    // Remplace les retours à la ligne par <br> pour le texte
    let text = "Texte censuré. Encore un coup de Macron.<br>J'ai fait cette modification avant de te l'envoyer,<br>je pense que tu comprends pourquoi c'était nécessaire";
    let i = 0;
    const letter = document.getElementById('letter');

    const scrollText = setInterval(function() {
        if (i < text.length) {
            // Ajoute une lettre ou un <br> selon le caractère
            if (text.charAt(i) === '<') {
                // Si on trouve un <, on lit jusqu'à > pour ne pas afficher le tag, juste ajouter une ligne
                while (text.charAt(i) !== '>') {
                    i++;
                }
                // On avance d'une position pour passer le >
                i++;
                // On insère un retour à la ligne
                letter.innerHTML += '<br>';
            } else {
                letter.innerHTML += text.charAt(i);
                i++;
            }
        } else {
            clearInterval(scrollText);
        }
    }, 30); // Vitesse du texte défilant
    // Attendre 10 secondes après la fin de createLetters
    setTimeout(() => {
        fadeToBlack(); // Affiche l'écran noir avec le cœur rouge
    }, 10000); // 10000 millisecondes = 10 secondes
}


// Fonction pour positionner aléatoirement les lettres
function setRandomPosition(letterElement) {
    const buffer = 50; // Espace pour éviter les bords
    const x = Math.random() * (window.innerWidth - buffer * 2) + buffer; // Largeur de la fenêtre - espace
    const y = Math.random() * (window.innerHeight - buffer * 2) + buffer; // Hauteur de la fenêtre - espace
    letterElement.style.transform = `translate(${x}px, ${y}px)`;
}

// Fonction d'animation pour les lettres
function animateLetter(letterElement) {
    const speed = 0.5; // Vitesse de déplacement
    let xDirection = Math.random() < 0.5 ? 1 : -1; // Déterminer la direction initiale
    let yDirection = Math.random() < 0.5 ? 1 : -1;

    // Animation en continu
    function move() {
        const currentTransform = letterElement.style.transform;
        const translateValues = currentTransform.match(/translate\(([^,]+)px,\s*([^)]+)px\)/);
        
        if (translateValues) {
            let newX = parseFloat(translateValues[1]) + (speed * xDirection);
            let newY = parseFloat(translateValues[2]) + (speed * yDirection);

            // Vérifier les limites de la fenêtre pour éviter que les lettres ne sortent de l'écran
            if (newX <= 0 || newX >= window.innerWidth - 30) { // 30 est la largeur approximative d'une lettre
                xDirection *= -1; // Inverser la direction en X
            }

            if (newY <= 0 || newY >= window.innerHeight - 30) { // 30 est la hauteur approximative d'une lettre
                yDirection *= -1; // Inverser la direction en Y
            }

            // Appliquer la nouvelle position
            letterElement.style.transform = `translate(${newX}px, ${newY}px)`;

            // Répéter l'animation
            requestAnimationFrame(move);
        }
    }

    move(); // Démarrer le mouvement
}

// Appelez cette fonction pour créer et animer les lettres après le niveau 2
function startFinal() {
    const secondGradientOverlay = document.getElementById('secondGradientOverlay');
    secondGradientOverlay.classList.add('goodbye-grad')
    const thirdGradientOverlay = document.getElementById('thirdGradientOverlay');
    thirdGradientOverlay.style.opacity = 1;
    thirdGradientOverlay.classList.add('come-up-grad');
    createLetters(); // Créer et animer les lettres
}

function fadeToBlack() {
    // Créer un élément pour l'écran noir
    const heartScreen = document.createElement('div');
    heartScreen.id = 'heartScreen'; // Ajouter un ID pour le styliser
    heartScreen.style.opacity = 0; // Commencer transparent
    document.body.appendChild(heartScreen); // Ajouter à la page

    // Transition pour assombrir l'écran
    setTimeout(() => {
        heartScreen.classList.add("fade");
    }, 1000); // Petite attente pour appliquer la transition

    // Attendre 2 secondes après que l'écran soit devenu noir pour afficher le cœur
    setTimeout(() => {
        showHeart(); // Affiche le cœur
    }, 5000); // 2000 millisecondes = 2 secondes
}

async function showHeart() {
    // Créer un élément pour le cœur
    const heart = document.createElement('div');
    heart.id = 'bigHeart';
    document.getElementById('heartScreen').appendChild(heart); // Ajouter le cœur à l'écran noir

    // Lancer l'animation de grandissement de 0 à 1
    await new Promise((resolve) => {
        setTimeout(() => {
            heart.style.transform = 'translate(-50%, -50%) scale(1)'; // Appliquer le grandissement
            resolve(); // Résoudre la promesse lorsque l'animation commence
        }, 50);
    });

    await new Promise((resolve) => {
        setTimeout(() => {
            resolve(); // Attendre 2 secondes avant de passer à l'échelle suivante
        }, 20000); // Ajustez ce délai si nécessaire
    });

    // Attendre 2 secondes pour que l'animation soit visible
    await new Promise((resolve) => {
        setTimeout(() => {
            heart.style.transform = 'translate(-50%, -50%) scale(10)'; // Appliquer le grandissement à 10
            resolve();
        }, 20000);
    });

    // Attendre avant d'appeler printGift
    await new Promise((resolve) => {
        setTimeout(() => {
            printGift(); // Appel à printGift
            resolve();
        }, 2000);
    });
}


// Fonction pour afficher un cœur
function displayHeart() {
    // Créer un élément pour le cœur
    const heartElement = document.createElement('div');
    heartElement.classList.add('heart');
    
    // Positionner le cœur au centre de l'écran
    heartElement.style.position = 'fixed';
    heartElement.style.left = '50%';
    heartElement.style.top = '50%';
    heartElement.style.transform = 'translate(-50%, -50%)'; // Centrer
    heartElement.style.width = '100px';
    heartElement.style.height = '90px';
    heartElement.style.backgroundColor = 'red';

    // Ajouter le cœur au body
    document.body.appendChild(heartElement);

    // Lancer l'animation
    heartElement.classList.add('animate-heart');

    // Optionnel : ajouter une transition de disparition après un certain temps
    setTimeout(() => {
        heartElement.style.opacity = '0';
        heartElement.style.transition = 'opacity 2s';
    }, 3000); // Disparaît après 3 secondes
}

// Fonction pour afficher une pluie de cœurs
function displayHeartRain() {
    // Générer plusieurs cœurs
    const heartCount = 100;  // Nombre de cœurs à afficher
    for (let i = 0; i < heartCount; i++) {
        createFallingHeart();
    }
}

// Fonction pour créer un cœur qui tombe
function createFallingHeart() {
    const heartElement = document.createElement('div');
    heartElement.classList.add('falling-heart');
    
    // Positionner chaque cœur aléatoirement sur l'axe X
    heartElement.style.left = Math.random() * 100 + 'vw'; // Position horizontale aléatoire
    heartElement.style.animationDuration = (Math.random() * 3 + 2) + 's'; // Durée aléatoire pour la chute

    const isInFront = Math.random() < 0.5; // 50% de chance d'être devant
    heartElement.style.zIndex = isInFront ? '1001' : '999'; // Définir z-index

    // Ajouter le cœur au body
    document.body.appendChild(heartElement);

    // Supprimer le cœur après qu'il soit tombé en bas
    heartElement.addEventListener('animationend', () => {
        heartElement.remove(); // Enlever l'élément une fois l'animation terminée
    });
}

const asciiShapes = [
    `jtmjtm<br>jtmjtm<br>jtmjtm`,
    `#-#-#-#<br>-#-#-#-<br>#-#-#-#`,
    `[]..[]<br>..[]..<br>------`,
    `oooo<br>ooo<br>oo`,
    ` /---\\\n\n \\---/`,  // Weird
    `____<br>\\../<br>.\\/`, // Triangle
    `._____<br>|....|<br>|____|`, // Square
    `----<br>--<br>----`, //E
    `------\$$$$$\n------`,
];

let gameCards = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;

function createMemoryGame(numPairs) {
    const pairs = [...asciiShapes.slice(0, numPairs), ...asciiShapes.slice(0, numPairs)];
    pairs.sort(() => 0.5 - Math.random());

    const memoryGrid = document.getElementById('memoryGrid');
    memoryGrid.innerHTML = ''; // Clear any existing content

    pairs.forEach((shape, index) => {
        const card = document.createElement('div');
        card.classList.add('memory-card');
        card.setAttribute('data-shape', shape);
        card.setAttribute('data-index', index);

        // Face avant (cachée au départ)
        const front = document.createElement('div');
        front.classList.add('front');
        front.innerHTML = ''; // Vide à l'affichage initial

        // Face arrière (révèle la forme ASCII)
        const back = document.createElement('div');
        back.classList.add('back');
        back.innerHTML = shape;

        card.appendChild(front);
        card.appendChild(back);

        card.addEventListener('click', handleCardClick);
        memoryGrid.appendChild(card);
    });

    gameCards = document.querySelectorAll('.memory-card');
}

function handleCardClick() {
    if (lockBoard) return;
    const clickedCard = this;

    // Révèle la carte cliquée
    clickedCard.classList.add('revealed');

    // Première carte sélectionnée
    if (!firstCard) {
        firstCard = clickedCard;
        return;
    }

    // Deuxième carte sélectionnée
    secondCard = clickedCard;
    lockBoard = true;

    // Compare les deux cartes
    if (firstCard.getAttribute('data-shape') === secondCard.getAttribute('data-shape')) {
        firstCard.removeEventListener('click', handleCardClick);
        secondCard.removeEventListener('click', handleCardClick);
        resetBoard();
    } else {
        // Cache les cartes après un délai si elles ne correspondent pas
        setTimeout(() => {
            firstCard.classList.remove('revealed');
            secondCard.classList.remove('revealed');
            resetBoard();
        }, 800);
    }
    checkIfGameIsFinished();
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

// Démarrage du jeu de mémoire
function startLevel2(numPairs) {
    document.getElementById('memory-game').style.display = 'block';
    document.getElementById('memory-game').classList.add('slide-fromdown-center');
    createMemoryGame(numPairs);
    startTimer();
}

// Fonction pour vérifier si le jeu est terminé
async function checkIfGameIsFinished() {
    // Sélectionne toutes les cartes
    const cards = document.querySelectorAll('.memory-card');
    
    // Vérifie si toutes les cartes sont révélées
    const allRevealed = Array.from(cards).every(card => card.classList.contains('revealed'));
    
    // Si toutes les cartes sont révélées, affiche le message de fin
    if (allRevealed) {
        clearInterval(timer); // Met le timer en pause
        timerRunning = false; // Met à jour l'état du timer
        await showMessage();
        resetGame();
    }
}

function showMessage() {
    return new Promise((resolve) => { // Retourne une promesse
        const endMessage = document.getElementById('endMessage');  // Affiche le message de fin
        endMessage.style.display = 'block';
        
        endMessage.classList.add('textunshrink');

        // Écoute l'événement de fin d'animation pour commencer la première animation
        endMessage.addEventListener('animationend', firstAnimation);

        function firstAnimation() {
            endMessage.classList.remove('textunshrink');
            endMessage.classList.add('textshrink'); // Démarre la première animation de rétrécissement

            endMessage.addEventListener('animationend', secondAnimation); // Écoute l'animation de rétrécissement
        }

        function secondAnimation() {
            endMessage.innerText = "C'était facile"; // Change le texte
            endMessage.classList.remove('textshrink');
            endMessage.classList.add('textunshrink'); // Démarre la deuxième animation d'agrandissement

            endMessage.addEventListener('animationend', thirdAnimation); // Écoute l'animation d'agrandissement
        }

        function thirdAnimation() {
            endMessage.classList.remove('textunshrink');
            endMessage.classList.add('textshrink'); // Démarre la troisième animation de rétrécissement

            endMessage.addEventListener('animationend', fourthAnimation); // Écoute l'animation de rétrécissement
        }

        function fourthAnimation() {
            endMessage.innerText = "Recommençons"; // Change le texte
            endMessage.classList.remove('textshrink');
            endMessage.classList.add('textunshrink'); // Démarre la quatrième animation d'agrandissement

            endMessage.addEventListener('animationend', fifthAnimation); // Écoute l'animation d'agrandissement
        }

        function fifthAnimation() {
            endMessage.classList.remove('textunshrink');
            endMessage.classList.add('textshrink'); // Démarre la cinquième animation de rétrécissement

            endMessage.addEventListener('animationend', () => {
                endMessage.style.display = 'none'; // Masque le message à la fin de l'animation
                resolve(); // Résout la promesse après la dernière animation
            });
        }
    });
}

function showMessage2(){
    return new Promise((resolve) => { // Retourne une promesse
        const endMessage = document.getElementById('endMessage2');  // Affiche le message de fin
        endMessage.style.display = 'block';
        
        endMessage.classList.add('textunshrink');

        // Écoute l'événement de fin d'animation pour commencer la première animation
        endMessage.addEventListener('animationend', firstAnimation);

        function firstAnimation() {
            endMessage.classList.remove('textunshrink');
            endMessage.classList.add('textshrink'); // Démarre la première animation de rétrécissement

            endMessage.addEventListener('animationend', secondAnimation); // Écoute l'animation de rétrécissement
        }

        function secondAnimation() {
            endMessage.innerText = "Tu es donc bien Clara"; // Change le texte
            endMessage.classList.remove('textshrink');
            endMessage.classList.add('textunshrink'); // Démarre la deuxième animation d'agrandissement

            endMessage.addEventListener('animationend', thirdAnimation); // Écoute l'animation d'agrandissement
        }

        function thirdAnimation() {
            endMessage.classList.remove('textunshrink');
            endMessage.classList.add('textshrink'); // Démarre la troisième animation de rétrécissement

            endMessage.addEventListener('animationend', fourthAnimation); // Écoute l'animation de rétrécissement
        }

        function fourthAnimation() {
            endMessage.innerText = "J'ai un message pour toi"; // Change le texte
            endMessage.classList.remove('textshrink');
            endMessage.classList.add('textunshrink'); // Démarre la quatrième animation d'agrandissement

            endMessage.addEventListener('animationend', fifthAnimation); // Écoute l'animation d'agrandissement
        }

        function fifthAnimation() {
            endMessage.classList.remove('textunshrink');
            endMessage.classList.add('textshrink'); // Démarre la cinquième animation de rétrécissement

            endMessage.addEventListener('animationend', () => {
                endMessage.style.display = 'none'; // Masque le message à la fin de l'animation
                resolve(); // Résout la promesse après la dernière animation
            });
        }
    });
}


let timer; // Variable pour le timer
let timeLeft = 120; // Durée du jeu en secondes
let timerRunning = false; // Pour savoir si le timer est en cours

// Fonction pour démarrer le timer
function startTimer() {
    if (!timerRunning) {
        timerRunning = true; // Indique que le timer est en cours
        timer = setInterval(() => {
            timeLeft--;
            document.getElementById('timer').innerText = `Temps restant : ${timeLeft}s`; // Mise à jour du texte du timer
            document.getElementById('timer').style.display = 'block'; // Mise à jour du texte du timer
            
            if (timeLeft <= 0) {
                clearInterval(timer); // Arrête le timer
                timerRunning = false;
                //disableCards(); // Désactive les cartes
                moveGameAway();
                startLevelThree();
            }
        }, 1000); // Met à jour toutes les secondes
    }
}

async function startLevelThree(){
    await showMessage2();
    startFinal();
}

function moveGameAway(){
    const theTimer = document.getElementById('timer');
    theTimer.classList.add('slide-up');
    const memorygame = document.getElementById('memory-game');
    memorygame.classList.remove('shrink');
    memorygame.classList.remove('unshrink');
    memorygame.classList.add('slide-up-center');
}

// Fonction pour désactiver les cartes
function disableCards() {
    document.querySelectorAll('.memory-card').forEach(card => {
        card.removeEventListener('click', cardClickHandler); // Enlève l'écouteur de clic
        card.style.pointerEvents = 'none'; // Désactive les clics sur les cartes
    });
}

function resetTimer() {
    timeLeft = 30; // Réinitialise le temps à 10 secondes
    document.getElementById('timer').textContent = `Temps restant: ${timeLeft}s`; // Mettez à jour l'affichage du timer
}

function resetGame() {
    // Masquer le jeu de mémoire
    hideGame();    // Réinitialiser les cartes
    setTimeout(() => {
        gameCards.forEach(card => {
            card.classList.remove('revealed');
            card.removeEventListener('click', handleCardClick);
        });
        // Réinitialiser les variables
        firstCard = null;
        secondCard = null;
        lockBoard = false;
        timeLeft = 10; // Réinitialise le temps à 10 secondes
        resetTimer();
        startLevel2(8);
        showGame();
    }, 2000);
}

function hideGame() {
    const memoryGame = document.getElementById('memory-game');
    
    // Ajoute la classe shrink pour démarrer l'animation
    memoryGame.classList.add('shrink');

    // Attendre la fin de l'animation avant de masquer l'élément
    // memoryGame.addEventListener('animationend', () => {
    //     memoryGame.style.display = 'none'; // Masquer complètement l'élément après l'animation
    // });
}

function showGame() {
    const memoryGame = document.getElementById('memory-game');
    
    // Ajoute la classe shrink pour démarrer l'animation
    memoryGame.classList.add('unshrink');

    // Attendre la fin de l'animation avant de masquer l'élément
    // memoryGame.addEventListener('animationend', () => {
    //     memoryGame.style.display = 'none'; // Masquer complètement l'élément après l'animation
    // });
}

function printGift() {
    // Supprime tout le contenu de la page
    document.body.innerHTML = '';

    // Crée un nouvel élément pour l'écran rouge
    const redScreen = document.createElement('div');
    redScreen.style.position = 'fixed';
    redScreen.style.top = '0';
    redScreen.style.left = '0';
    redScreen.style.width = '100%';
    redScreen.style.height = '100%';
    redScreen.style.backgroundColor = 'red';
    redScreen.style.zIndex = '10000';

    // Ajoute l'écran rouge au body
    document.body.appendChild(redScreen);

    // Crée un conteneur pour les messages et l'image
    const messageContainer = document.createElement('div');
    messageContainer.style.position = 'fixed';
    messageContainer.style.top = '50%';
    messageContainer.style.left = '50%';
    messageContainer.style.transform = 'translate(-50%, -50%)';
    messageContainer.style.color = 'white';
    messageContainer.style.fontSize = '2em';
    messageContainer.style.textAlign = 'center';
    messageContainer.style.opacity = '0';
    messageContainer.style.transition = 'opacity 1s';
    redScreen.appendChild(messageContainer);

    // Fonction pour afficher un message temporairement
    function showMessage(text, duration) {
        return new Promise((resolve) => {
            messageContainer.textContent = text;
            messageContainer.style.opacity = '1';

            // Masquer le message après la durée spécifiée
            setTimeout(() => {
                messageContainer.style.opacity = '0';
                setTimeout(resolve, 1000); // Attendre la fin de la transition
            }, duration);
        });
    }

    // Affiche les messages et l'image en séquence
    (async function displaySequence() {
        await showMessage("Encore là ?", 2000);        // Affiche pendant 2 secondes
        await showMessage("Voilà ton cadeau", 2000);   // Affiche pendant 2 secondes
        await showMessage("83199910", 10000000);
    })();
}

// Date cible pour le compte à rebours : 10 novembre 2024 à 1h00 du matin (UTC)
const targetDate = new Date('2024-11-10T01:00:00Z');

function updateCountdown() {
    const now = new Date(); // Heure actuelle
    const timeRemaining = targetDate - now; // Calcul du temps restant

    if (timeRemaining > 0) {
        // Calculer les jours, heures, minutes et secondes restantes
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        // Afficher le compte à rebours
        document.getElementById('countdown').innerHTML =
            `${days} jours ${hours} heures ${minutes} minutes ${seconds} secondes`;
    } else {
        // Si le compte à rebours est terminé
        clearInterval(countdownInterval);
        document.getElementById('countdownContainer').style.display = 'none'; // Cacher le compteur
        startNormalContent(); // Lancer le contenu normal
    }
}

// Fonction pour démarrer le contenu normal
function startNormalContent() {
    document.getElementById('terminal').style.display = 'block'; // Afficher le terminal
    // Autres initialisations pour le contenu normal...
}

// Mettre à jour le compte à rebours toutes les secondes
const countdownInterval = setInterval(updateCountdown, 1000);

// Initialiser le compte à rebours immédiatement
document.getElementById('countdownContainer').style.display = 'block'; // Afficher le compteur
updateCountdown();

