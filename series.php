<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
    <link rel="stylesheet" href="./assets/css/scrollbar.css">
    <title>Films | Cinetech</title>
</head>

<body class="text-bg-dark">

    <?php require_once("./header.php");
    if (!empty($_GET["id"])) { ?>
        <h1 id="<?= $_GET["id"] ?>" class="param my-5"></h1>
        <div id="myContainer" class="container d-flex flex-column align-items-center gap-3">
        </div>
        <div class="container d-flex justify-content-center my-5">

            <button id="btnBack" href="./movies.php" class="btn btn-outline-light border-0 orange  px-3 py-2"><span>Retour</span> </button>
        </div>
        <script type="module" src="./assets/js/serieChoice.js"></script>
    <?php } else { ?>
        <h1 class="text-center my-5">Les Séries TV</h1>
        <div id="myContainer" class="d-flex flex-column align-items-center gap-3 mx-3">


        </div>
        <script type="module" src="./assets/js/series.js"></script>
    <?php } ?>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>



</body>

</html>