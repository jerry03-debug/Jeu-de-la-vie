document.addEventListener('DOMContentLoaded', function () {
    const conteneurGrille = document.getElementById('grid-container');
    const tailleGrille = 50;
    
    // Créer la grille
    creerGrille();

    // Initialiser le jeu de la vie
    initialiserJeu();

    function creerGrille() {
        for (let i = 0; i < tailleGrille * tailleGrille; i++) {
            const cellule = document.createElement('div');
            cellule.className = 'cellule';
            conteneurGrille.appendChild(cellule);
        }

        conteneurGrille.addEventListener('click', gererClicCellule);
    }

    function initialiserJeu() {
        const cellules = document.querySelectorAll('.cellule');
        cellules.forEach(cellule => {
            // Initialiser les cellules de manière aléatoire
            cellule.classList.toggle('vivante', Math.random() > 0.7);
        });

        // Lancer la boucle de jeu
        setInterval(mettreAJourJeu, 100);
    }

    function mettreAJourJeu() {
        const cellules = document.querySelectorAll('.cellule');
        const nouveauxEtats = [];

        cellules.forEach((cellule, index) => {
            const voisins = obtenirVoisins(index);
            const voisinsVivants = voisins.filter(n => cellules[n].classList.contains('vivante'));

            if (cellule.classList.contains('vivante')) {
                // Appliquer les règles de survie
                if (voisinsVivants.length === 2 || voisinsVivants.length === 3) {
                    nouveauxEtats[index] = true;
                } else {
                    nouveauxEtats[index] = false;
                }
            } else {
                // Appliquer la règle de naissance
                if (voisinsVivants.length === 3) {
                    nouveauxEtats[index] = true;
                } else {
                    nouveauxEtats[index] = false;
                }
            }
        });

        // Mettre à jour les états des cellules
        nouveauxEtats.forEach((etat, index) => {
            cellules[index].classList.toggle('vivante', etat);
        });
    }

    function obtenirVoisins(index) {
        const ligne = Math.floor(index / tailleGrille);
        const colonne = index % tailleGrille;
        const voisins = [];

        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const ligneVoisin = ligne + i;
                const colonneVoisin = colonne + j;

                if (ligneVoisin >= 0 && ligneVoisin < tailleGrille &&
                    colonneVoisin >= 0 && colonneVoisin < tailleGrille &&
                    !(i === 0 && j === 0)) {
                    voisins.push(ligneVoisin * tailleGrille + colonneVoisin);
                }
            }
        }

        return voisins;
    }

    function gererClicCellule(event) {
        const celluleClickee = event.target;
        celluleClickee.classList.toggle('vivante');
    }
});
