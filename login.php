<?php
session_start() ?>

<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./assets/css/defaults.css">
    <link rel="stylesheet" href="./assets/css/scrollbar.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <title>Connexion/inscription | Cinetech</title>
</head>

<body class="text-bg-dark">

    <?php require_once("./header.php"); ?>



    <section id="signIn">

        <h1 class="text-center my-5">Connexion</h1>
        <div id="myContainer" class="d-flex justify-content-center flex-wrap gap-3 mx-3">


            <form class="d-flex flex-column justify-content-center gap-4 mt-5" action="login.php" method="post">
                <div class="input-group gap-2">
                    <label class="input-group-text rounded-circle" for="login"><i class="fa-solid fa-user"></i></label>
                    <input class="form-control rounded-pill" type="text" id="login" placeholder="Identifiant">
                </div>
                <div class="input-group rounded-pill gap-2">
                    <label class="input-group-text rounded-circle" for="pass"><i class="fa-solid fa-lock"></i></label>
                    <input class="form-control rounded-pill" type="password" id="pass" placeholder="Mot de passe">
                </div>

                <div>
                    <button class="btn btn-primary rounded-pill w-100 mt-2" type="submit">Connexion</button>
                </div>

                <div class="text-white d-flex align-items-center justify-content-center">
                    <span>Nouveau membre ?
                        <span class="ms-2 text-primary btnToggler pointer">Inscription</span>
                    </span>
                </div>

            </form>
        </div>
    </section>
    <section id="signUp" class="d-none">

        <h1 class="text-center my-5">Inscription</h1>
        <div id="myContainer" class="d-flex justify-content-center flex-wrap gap-3 mx-3">


            <form class="d-flex flex-column justify-content-center gap-4 mt-5" action="login.php" method="post">
                <div class="input-group gap-2">
                    <label class="input-group-text rounded-circle" for="login1"><i class="fa-solid fa-user"></i></label>
                    <input class="form-control rounded-pill" type="text" id="login1" placeholder="Identifiant">
                </div>
                <div class="input-group rounded-pill gap-2">
                    <label class="input-group-text rounded-circle" for="pass1"><i class="fa-solid fa-lock"></i></label>
                    <input class="form-control rounded-pill" type="password" id="pass1" placeholder="Mot de passe">
                </div>
                <div>
                    <small>identifiant : 3 caractères minimum </small>
                    <div>
                        <p><small>MDP : 8 caracères minimum</small></p>
                        <p><small>1 Majuscules minimum et 1 caracères spécial</small></p>

                    </div>
                </div>
                <div>
                    <button class="btn btn-primary rounded-pill w-100 mt-2" type="submit">Inscription</button>
                </div>


                <div class="text-white d-flex align-items-center justify-content-center">
                    <span>Déjà membre ?
                        <span class="ms-2 text-primary btnToggler pointer">Connexion</span>
                    </span>
                </div>
            </form>
        </div>

    </section>
    <?php
    if (isset($_GET['error']) && !empty($_GET['message'])) {
        echo '<p class="alert error">' . htmlspecialchars($_GET['message']) . '</p>';
    }
    ?>
    <footer class="mt-5"></footer>



    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
    <script src="./assets/js/handleFormToggler.js"></script>


</body>

</html>