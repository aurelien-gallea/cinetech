<header>
    <nav class="navbar navbar-dark bg-dark navbar-expand-md fixed-top">
        <div class="container">
            <div class="navbar-brand">
                <a href="./" class="nav-link fs-3">
                    Cine<span style="color:orange;">Tech</span>
                </a>
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
                <div class="col-md-6 my-2">
                    <form id="searchForm">
                        <div class="input-group  ms-md-5">
                            
                            <input id="searchBar" class="form-control" type="search" placeholder="Rechercher film/série/acteur...">
                            <button id="button" class="btn btn-light orange border-0">Rechercher</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </nav>
</header>
<div style="height:50px"></div>