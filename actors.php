<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./assets/css/defaults.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

    <title>Acteurs | Cinetech</title>
</head>

<body class="text-bg-info" >

    <?php require_once("./header.php");
    if (!empty($_GET["id"])) { ?>
        <h1 id="<?= $_GET["id"] ?>" class="param my-5 text-center"></h1>
        <div id="btnContainer" class="container d-flex justify-content-between my-4 flex-wrap gap-3"></div>

        <div id="myContainer" class="container d-flex flex-column justify-content-center gap-3">
        </div>
        
        <div class="container d-flex justify-content-center my-5">

            
        </div>
        <footer class="mt-5"></footer>
        <script type="module" src="./assets/js/myChoice.js"></script>
    <?php } else { ?>
        <h1 class="text-center my-5">Les Acteurs</h1>
        <div id="btnContainer" class="container d-flex justify-content-center my-4 flex-wrap gap-3"></div>

        <div id="myContainer" class="d-flex justify-content-center flex-wrap gap-3 mx-3"></div>

        <footer class="mt-5"></footer>
        <script type="module" src="./assets/js/actors.js"></script>
    <?php } ?>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>



</body>

</html>