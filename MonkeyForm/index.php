<?php
if (isset($_POST['submit'])) {
    $input = array();
    $error = array();

    // Firstname
    if (isset($_POST['firstname']) && strlen(trim($_POST['firstname'])) && !is_array($_POST['firstname'])) {
        $input['firstname'] = htmlspecialchars(trim($_POST['firstname']));
    } else {
        $error['firstname'] = 'Please provide a valid Firstname.';
    }

    // Lastname
    if (isset($_POST['lastname']) && strlen(trim($_POST['lastname'])) && !is_array($_POST['lastname'])) {
        $input['lastname'] = htmlspecialchars(trim($_POST['lastname']));
    } else {
        $error['lastname'] = 'Please provide a valid Lastname.';
    }

    // Birthdate
    if (isset($_POST['birthdate']) && $_POST['birthdate'] != "") {
        $input['birthdate'] = htmlspecialchars($_POST['birthdate']);
    } else {
        $error['birthdate'] = 'Please provide a valid Birthdate.';
    }

    // Number
    if (isset($_POST['number']) && strlen(trim($_POST['number'])) && is_numeric($_POST['number'])) {
        $input['number'] = htmlspecialchars(trim($_POST['number']));
    } else {
        $error['number'] = 'Please provide a valid Number.';
    }

    // E-mail
    if (isset($_POST['mail']) && filter_var($_POST['mail'], FILTER_VALIDATE_EMAIL)) {
        $input['mail'] = htmlspecialchars($_POST['mail']);
    } else {
        $error['email'] = 'Please provide a valid E-mail address.';
    }

    // Location
    if (isset($_POST['location']) && is_array($_POST['location']) && count($_POST['location']) > 0) {
        $input['location'] = $_POST['location'];
    } else {
        $error['location'] = 'Please select a Location.';
    }

    // Vaccine Type
    if (isset($_POST['vaccineType']) && is_array($_POST['vaccineType']) && count($_POST['vaccineType']) > 0) {
        $input['vaccineType'] = $_POST['vaccineType'];
    } else {
        $error['vaccineType'] = 'Please select a Vaccine Type.';
    }

    // Vaccination Date
    if (isset($_POST['vaccinationDate']) && $_POST['vaccinationDate'] != "") {
        $input['vaccinationDate'] = htmlspecialchars($_POST['vaccinationDate']);
    } else {
        $error['vaccinationDate'] = 'Please provide a valid Vaccination Date.';
    }

    // Process the data or display errors accordingly
    if (empty($error)) {
        $success = 'All inputs are correct';
    } else {
        $errors = implode(', ', $error);
        $err = 'Something went wrong. Errors: ' . $errors;
    }
}
?>





<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Vaccination</title>
    <link rel="stylesheet" href="./style.css" type="text/css">
</head>
<body>
<main>
        <div class="header">
            <div class="header-option">Appointments</div>
            <div class="header-option">Other Services</div>
            <div class="header-option">News</div>
            <div class="header-option">Info</div>
        </div>


    <?php
    if (isset($success)) {
        // Display success message
        ?>
        <div class="main-element success">
            <div class="textDone">
                Your Appointment has been noted and will be taking place on the <?php echo( str_replace( 'T', ' at ', str_replace('-', '.', $input['vaccinationDate'])))?> in <?php echo $input['location'][0]; ?>. You will be Notified by e-mail.
            </div>
        </div>

    <?php
    }
    if (!isset($success)) {
        // Display form
        ?>
        <form class="main-element" action="<?php echo htmlentities($_SERVER['PHP_SELF']); ?>" method="post">
            <!-- Firstname -->
            <label>
                Firstname:
                <input id="Firstname" type="text" name="firstname" <?php if (isset($input['firstname'])) echo 'value="'.$input['firstname'].'"';?>>
                <?php if (isset($error['firstname'])) echo '<span class="error">' . $error['firstname'] . '</span>';?>
            </label>
            <!-- Lastname -->
            <label>
                Lastname:
                <input id="Lastname" type="text" name="lastname" <?php if (isset($input['lastname'])) echo 'value="'.$input['lastname'].'"';?>>
                <?php if (isset($error['lastname'])) echo '<span class="error">' . $error['lastname'] . '</span>';?>
            </label>
            <!-- Birthdate -->
            <label>
                Birthdate:
                <input id="Birthdate" type="date" name="birthdate" <?php if (isset($input['birthdate'])) echo 'value="'.$input['birthdate'].'"';?>>
                <?php if (isset($error['birthdate'])) echo '<span class="error">' . $error['birthdate'] . '</span>';?>
            </label>
            <!-- Number -->
            <label>
                Number:
                <input id="number" type="tel" name="number" <?php if (isset($input['number'])) echo 'value="'.$input['number'].'"';?>>
                <?php if (isset($error['number'])) echo '<span class="error">' . $error['number'] . '</span>';?>
            </label>
            <!-- E-mail -->
            <label>
                E-mail:
                <input type="email" name="mail" <?php if (isset($input['mail'])) echo 'value="'.$input['mail'].'"';?>>
                <?php if (isset($error['email'])) echo '<span class="error">' . $error['email'] . '</span>';?>
            </label>
            <!-- Location -->
            <br>
            <label>
                Linz: <input class="location" id="Linz" type="radio" name="location[]" value="Linz"
                    <?php if (isset($input['location']) && in_array('Linz', $input['location'])) echo 'checked';?>>
            </label>
            <label>
                Wels: <input class="location" id="Wels" type="radio" name="location[]" value="Wels"
                    <?php if (isset($input['location']) && in_array('Wels', $input['location'])) echo 'checked';?>>
            </label>
            <label>
                Enns: <input class="location" id="Enns" type="radio" name="location[]" value="Enns"
                    <?php if (isset($input['location']) && in_array('Enns', $input['location'])) echo 'checked';?>>
            </label><br>

            <!-- Vaccine Type -->
            <br>
            <label>
                Bimer­vax: <input type="radio" name="vaccineType[]" value="Bimer­vax"
                    <?php if (isset($input['vaccineType']) && in_array('Bimer­vax', $input['vaccineType'])) echo 'checked';?>>
            </label>
            <label>
                Comir­naty: <input type="radio" name="vaccineType[]" value="Comir­naty"
                    <?php if (isset($input['vaccineType']) && in_array('Comir­naty', $input['vaccineType'])) echo 'checked';?>>
            </label>
            <label>
                Omi­cron: <input type="radio" name="vaccineType[]" value="Omi­cron"
                    <?php if (isset($input['vaccineType']) && in_array('Omi­cron', $input['vaccineType'])) echo 'checked';?>>
            </label>
            <label>
                Spike­vax: <input type="radio" name="vaccineType[]" value="Spike­vax"
                    <?php if (isset($input['vaccineType']) && in_array('Spike­vax', $input['vaccineType'])) echo 'checked';?>>
            </label><br>

            <!-- Vaccination Date -->
            <label>
                Vaccination Date:
                <input type="datetime-local" name="vaccinationDate" <?php if (isset($input['vaccinationDate'])) echo 'value="'.$input['vaccinationDate'].'"';?>>
                <?php if (isset($error['vaccinationDate'])) echo '<span class="error">' . $error['vaccinationDate'] . '</span>';?>
            </label><br>

            <!-- Submit button -->
            <input class="commit-button" type="submit" name="submit" value="submit">
        </form>
        <?php
    }
    ?>
</main>
</body>
</html>
