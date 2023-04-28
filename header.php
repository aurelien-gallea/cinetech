<header>
    <nav class="navbar navbar-dark bg-dark navbar-expand-md">
        <div class="container">
            <div class="navbar-brand">
                Cine<span style="color:orange;">Tech</span>
            </div>
            <!-- Le bouton s'affichera en petit écran -->
            <button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#monMenuDeroulant">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="monMenuDeroulant">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a href="./" class="nav-link active">Accueil</a>
                    </li>
                    <li class="nav-item">
                        <a href="./movies.php" class="nav-link">Films</a>
                    </li>
                    <li class="nav-item">
                        <a href="./series.php" class="nav-link">Séries</a>
                    </li>
                </ul>
                <div class="input-group w-50 ms-5">

                    <input id="searchBar" class="form-control" type="text">
                    <button id="button" class="btn btn-light orange border-0">Rechercher</button>
                </div>
            </div>
        </div>
    </nav>
</header>