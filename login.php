<?php
session_start();

require_once('classes/User.php');
    require_once('classes/Security.php');
    require_once('classes/Verify.php');

    // inscription -------------------------------------------
if(!empty($_POST['login1']) && !empty($_POST['pass1']) && !empty($_POST['pass2']) &&!empty($_POST['mail'])) {
    if ($_POST['pass1'] == $_POST['pass2']) {

        // protection des variables
        $login   = htmlspecialchars($_POST['login']);
        $password = htmlspecialchars($_POST['password']);
        $email    = htmlspecialchars($_POST['email']);

        // doublon login
        if(Verify::loginAlreadyExist($login)) {
            header('location:inscription.php?error=1&message=login déjà existant');
            exit();
        }

        // verifications du mail
        if(!Verify::verifySyntax($email)) {
            header('location:inscription.php?error=1&message=merci de rentrer un email valide !');
            exit();
        }
        // doublon mail
        if(Verify::emailAlreadyExist($email)) {
            header('location:inscription.php?error=1&message= mail déjà utilisé');
            exit();
        }
        
        // on chiffre le mdp
        $password = Security::hash($password);           
        // on ajoute l'utilisateur
        $user = new User($login, $password, $email);
        $user->register();
        $user->baseRole();
    
        // redirection 
        header('location:index.php');
        exit();
       
    } else {
        header('location:login.php?error=1&message=merci de rentrer des mots de passe indentiques');
        exit();
    }
}

?>

<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./assets/css/defaults.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="./assets/images/favicon.ico" rel="icon" type="image/x-icon" />
    <title>Connexion/inscription | Cinetech</title>
</head>

<body class="text-bg-info">

    <?php require_once("./header.php"); ?>


    <main class="mainContent flex-grow-1">
    <section id="signIn">

        <h1 class="text-center my-5">Connexion</h1>
        <div id="myContainer" class="d-flex justify-content-center flex-wrap gap-3 mx-3">


            <form class="d-flex flex-column justify-content-center gap-4 mt-5" action="login.php" method="post">
                <div class="input-group gap-2">
                    <label class="input-group-text rounded-circle" for="login"><i class="fa-solid fa-user"></i></label>
                    <input class="form-control rounded-pill" required type="text" id="login" placeholder="Identifiant">
                </div>
                <div class="input-group rounded-pill gap-2">
                    <label class="input-group-text rounded-circle" for="pass"><i class="fa-solid fa-lock"></i></label>
                    <input class="form-control rounded-pill" required type="password" id="pass" placeholder="Mot de passe">
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


            <form class="d-flex flex-column justify-content-center gap-3 mt-5" action="login.php" method="post">
                <div class="input-group gap-2">
                    <label class="input-group-text rounded-circle" for="login1"><i id="loginIcon" class="fa-solid fa-user"></i></label>
                    <input class="form-control rounded-pill" required minlength="3" type="text" id="login1" placeholder="Identifiant">
                </div>
                <div class="mx-2">

                    <small id="errorLogin1"><i class="fa-solid fa-check"></i> 3 caractères minimum </small>
                </div>
                <div class="input-group gap-2">
                    <label class="input-group-text rounded-circle" for="mail"><i id="mailIcon" class="fa-solid fa-envelope"></i></label>
                    <input class="form-control rounded-pill" required  type="email" id="mail" placeholder="Email">
                </div>
                <div class="mx-2">

                    <small id="errorMail"><i class="fa-solid fa-check"></i> adresse email valide </small>
                </div>
                <div class="input-group rounded-pill gap-2">
                    <label class="input-group-text rounded-circle" for="pass1"><i id="passIcon1" class="fa-solid fa-lock"></i></label>
                    <input class="form-control rounded-pill" required minlength="8" type="password" id="pass1" placeholder="Mot de passe">
                </div>
                <div class="input-group rounded-pill gap-2">
                    <label class="input-group-text rounded-circle" for="pass2"><i id="passIcon2" class="fa-solid fa-lock"></i></label>
                    <input class="form-control rounded-pill" required minlength="8" type="password" id="pass2" placeholder="Confirmation MDP">
                </div>
                <div class="d-flex flex-column mx-2">

                    <small id="errorPass1"><i class="fa-solid fa-check"></i> 8 caractères minimum, 1 Majuscule et 1 caractère spécial</small>
                    <small id="errorPass2"><i class="fa-solid fa-check"></i> mots de passe identiques</small>
                </div>



                <div>
                    <button id="subscribe" class="btn btn-primary rounded-pill w-100 " type="submit">Inscription</button>
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
    </main>
    <?php require_once("./footer.php"); ?>



    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
    <script src="./assets/js/handleFormToggler.js"></script>


</body>

</html>