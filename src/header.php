<?php
require_once('./classes/FavoritesManager.php');
?>
<header class="fixed-top">
    <nav class="navbar navbar-dark bg-black navbar-expand-lg  border-bottom border-primary">
        <div class="container">
            <div class="navbar-brand">
                <a href="./" class="nav-link fs-3">
                    Cine<span class="text-primary">Tech</span>
                </a>
            </div>
            <!-- Le bouton s'affichera en petit écran -->
            <button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#monMenuDeroulant">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="monMenuDeroulant">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a href="./" title="Accueil" class="nav-link <?= basename($_SERVER['PHP_SELF']) === "index.php" ? "active" : "" ?>"><i class="fa-solid fa-house"></i></a>
                    </li>
                    <li class="nav-item">
                        <a href="./movies.php" class="nav-link <?= (substr($_SERVER['REQUEST_URI'], -10) === 'movies.php') ? "active" : "" ?>">Films</a>
                    </li>
                    <li class="nav-item">
                        <a href="./series.php" class="nav-link <?= (substr($_SERVER['REQUEST_URI'], -10) === 'series.php') ? "active" : "" ?>">Séries</a>
                    </li>
                    <li class="nav-item">
                        <a href="./actors.php" class="nav-link <?= (substr($_SERVER['REQUEST_URI'], -10) === 'actors.php') ? "active" : "" ?>">Acteurs</a>
                    </li>
                    <?php if (!empty($_SESSION['id'])) { ?>
                        <li class="nav-item">
                            <a href="./favorites.php" class="nav-link <?= (substr($_SERVER['REQUEST_URI'], -13) === 'favorites.php') ? "active" : "" ?>"><i class="fa-solid fa-star"></i> Favoris</a>
                        </li>

                    <?php }
                    if (empty($_SESSION['id'])) { ?>

                        <li class="nav-item">
                            <a href="./login.php" class="nav-link <?= (substr($_SERVER['REQUEST_URI'], -9) === 'login.php') ? "active" : "" ?>">Connexion/Inscription</a>
                        </li>
                    <?php } else { ?>
                        <li class="nav-item">
                            <a title="Déconnexion" href="./src/logout.php" class="nav-link <?= (substr($_SERVER['REQUEST_URI'], -9) === 'login.php') ? "active" : "" ?>"><i class="fa-solid fa-right-from-bracket"></i></a>
                        </li>
                    <?php  } ?>
                </ul>
                <div class="col-md-6 my-2">
                    <?php if (!isset($_GET["id"])) { ?>
                        <form id="searchForm" class="rounded-pill">
                            <div class="input-group maxW-input ms-md-5">

                                <input id="searchBar" class="form-control border-0" type="search" placeholder="Rechercher film/série/acteur...">
                                <button id="button" class="btn btn-light orange border-0"><i class="fa-solid fa-magnifying-glass"></i></button>
                            </div>
                        </form>
                    <?php } ?>
                </div>
            </div>
        </div>
    </nav>
    <?php if (!empty($_SESSION['id'])) { ?>
        <div class="text-bg-primary ">
            <div class="container d-flex justify-content-between align-items-center">

                <span class=""><i class="fa-solid fa-user"></i> <?= $_SESSION['login'] ?></span>
                <!-- gerer l'affichage conditionnel avec la table favoris -->
                <?php if (!empty($_GET['id'])) {
                    $id_user = $_SESSION['id'];
                    $url = $_SERVER['REQUEST_URI'];
                    $id_content = $_GET['id'];
                    $newFavorite = new FavoritesManager();
                    
                    // double verif pour eviter d'avoir des doublons en cas de refresh de la page
                    if (isset($_POST['addFavorite']) && $newFavorite->alreadyFavorite($id_user, $url, $id_content) === 0) {
                        $newFavorite->addFavorite($id_user, $url, $id_content);
                    } else if (isset($_POST['removeFavorite'])) {
                        $newFavorite->removeFavorite($id_user, $url, $id_content);
                    }
                    
                    if ($newFavorite->alreadyFavorite($id_user, $url, $id_content) === 0) {?>
                <form action="<?=$url?>" method="post">
                    <button type="submit" name="addFavorite" class="btn border-0 p-0 text-white"><i class="fa-solid fa-star"></i> Ajouter aux favoris</button>
                </form>
                <?php } else { ?> 
                <form action="<?=$url?>" method="post">
                    <button type="submit" name="removeFavorite" class="btn border-0 p-0 text-white"><i class="fa-regular fa-star"></i> retirer des favoris</button>
                </form>
            </div>
        </div>
    <?php }}} ?>
</header>