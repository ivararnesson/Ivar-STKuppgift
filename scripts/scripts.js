// hämtar de olika objekten från HTML-filen genom dess id
const titelInput = document.querySelector("#titel");
const genreInput = document.querySelector("#genre");
const åldersGränsInput = document.querySelector("#åldersGräns");
const läggTillButton = document.querySelector("#läggTill");
const taBortButton = document.querySelector("#taBort");
const searchBar = document.getElementById("searchBar")

// lägger till en lyssnare för knappen "Lägg till program" som vi hämtade från html
läggTillButton.addEventListener("click", function() {
    // kontrollerar så att alla uppgifter är ifyllda
    if (programForm.checkValidity()) {
        // här skapar jag ett objekt som innefattar alla användarinputs
        const program = {
        titel: titelInput.value,
        genre: genreInput.value,
        åldersGräns: åldersGränsInput.value
        };
        // här hämtar vi alla tidigare sparade program från localstorage och om det inte finns några använder vi en tom array
        let tidigareProgram = localStorage.getItem("programs");
        tidigareProgram = tidigareProgram ? JSON.parse(tidigareProgram) : [];

        // pushar upp det nya programmet i listan
        tidigareProgram.push(program);

        // sparar den nya listan i localstorage
        localStorage.setItem("programs", JSON.stringify(tidigareProgram));
       
        alert("Programmet lades till på listan.");

        uppDateraDisplay();
        återställInput()
    }
    else {
        alert("Vänligen fyll i alla kategorier");
    }
});

// lägger till en lyssnare för knappen "Ta bort program"
taBortButton.addEventListener("click", function(){
    // hämtar de tidigare sparade programmen och om det inte finns använder vi en tom array
    let tidigareProgram = JSON.parse(localStorage.getItem("programs") || []);

    // tar titeln från från inputen och gör om det till småbokstäver för att undvika fellmeddelanden
    let taBortProgram = document.getElementById("titel").value.toLowerCase();

    // kollar vilket index som inputen har
    let taBortIndex = tidigareProgram.findIndex(program => program.titel.toLowerCase() === taBortProgram);

    // om inmatningen är korrekt och det finns i listan tas det bort och uppdaterar displayen
    if (taBortIndex > -1) {
        tidigareProgram.splice(taBortIndex, 1);
        localStorage.setItem("programs", JSON.stringify(tidigareProgram));
        alert("Programmet '" + taBortProgram + "' togs bort från listan.");
    }
    else {
        alert("För att ta bort ett program behöver du ange dess titel sedan trycka på 'Ta bort program'");
    }
    uppDateraDisplay();
    återställInput();
});

// lägger till en lyssnare för sökfältet
searchBar.addEventListener("submit", (e) => {
    e.preventDefault();
    let sökning = document.getElementById("query").value.toLowerCase();

    let programLista = document.getElementById("programLista");

    let lista = programLista.getElementsByTagName("li");

    // loopar igenom alla program i listan 
    for (let i = 0; i < lista.length; i++) {
        let programTitel = lista[i].textContent.toLowerCase();

        // kontrollerar så att det man söker på verkligen finns
        let matchadSökning = programTitel.indexOf(sökning) > -1;

        // visar oss programmet om det matchar våran sökning och döljer de andra
        lista[i].style.display = matchadSökning ? "" : "none";
    }
});
function uppDateraDisplay() {
    let programLista = document.getElementById("programLista");
    programLista.innerText = "";

    let tidigareProgram = JSON.parse(localStorage.getItem("programs") || []);

    if (tidigareProgram.length > 0) {
        // loopar igenom varje program i listan och skapar ett nytt li för varje ny input som visas på displayen
        tidigareProgram.forEach(function(program) {
            let lista = document.createElement("li");

            // Vad som kommer synas på displayen
            lista.innerHTML = "TITEL: " + program.titel + "<br>GENRE: " + program.genre + "<br>ÅLDERSGRÄNS: " + program.åldersGräns;
            programLista.appendChild(lista);
        });
    }
    else {
        // när det inte finns några program skapas en "li" med detta innehåll
        let ingenLista = document.createElement("li");
        ingenLista.textContent = "Inga program tillgängliga..";
        programLista.appendChild(ingenLista);
    }
}
function återställInput() {
    titelInput.value = "";
    genreInput.value = "";
    åldersGränsInput.value = "";
}
uppDateraDisplay();
