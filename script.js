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


// Commandes disponibles
const commands = {
    "help": "Commandes disponibles: clara, help, clear, quiz",
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
    "quiz": function() {
        startQuiz();
    }
};

// Gestion de l'input de l'utilisateur
inputField.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        const inputValue = inputField.value.toLowerCase().trim();
        processCommand(inputValue);
        inputField.value = ''; // Réinitialise le champ input
    }
});

// Traiter la commande saisie par l'utilisateur
function processCommand(command) {
    if (commands[command]) {
        if (typeof commands[command] === "function") {
            commands[command](); // Exécute la fonction associée
        } else {
            printOutput(commands[command]);
        }
    } else {
        printOutput("Commande non reconnue. Tape 'help' pour voir la liste des commandes.");
    }
}

// Affichage du message romantique pour la commande 'clara'
function displayRomanticMessage() {
    // Ajouter du texte romantique qui défile
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
        "amour", "espoir", "rêve", "lumière",
        "ciel", "étoile", "passion", "coeur",
        "joie", "sourire", "souvenir", "fantaisie",
        "poésie", "mer", "fleur", "musique"
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
            if (word === "fantaisie") {
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
                startLevelTwo(); // Démarrer la création des lettres



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
const targetWord = "je t'aime"; // Le mot à former
let formedWordArray = Array.from(targetWord).map(char => char === ' ' ? ' ' : ''); // Préremplir avec des espaces
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
        if (letter === ' ') {
            // Ajouter directement l'espace au conteneur du mot sans clic
            formedWordArray[index] = ' '; // Mettre à jour le tableau formé
            moveLetterToWordContainer(letterElement, letter, index); // Déplacer l'espace vers la bonne position
        }

        // Événement de clic pour placer la lettre
        letterElement.onclick = () => {
            // Vérifier si la lettre à cet index n'a pas déjà été cliquée
            if (!clickedIndexes.has(index)) {
                clickedIndexes.add(index); // Marquer cet index comme cliqué
                moveLetterToWordContainer(letterElement, letter, index); // Déplacer la lettre vers la bonne position
            }
        };

        lettersContainer.appendChild(letterElement);
        animateLetter(letterElement); // Animer la lettre
    });

    // Initialiser l'affichage du mot avec les espaces
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
        letterElement.textContent = letter; // Afficher la lettre ou l'espace
        letterElement.classList.add('letterInPlace'); // Classe pour le style

        // Ajouter chaque lettre (ou espace) au conteneur du mot
        wordContainer.appendChild(letterElement);
    });
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
function startLevelTwo() {
    createLetters(); // Créer et animer les lettres
}
