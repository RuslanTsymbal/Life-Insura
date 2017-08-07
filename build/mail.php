<?php
/**
 *  PHPMailer config
 */

date_default_timezone_set('Etc/UTC');

require_once('PHPMailer/PHPMailerAutoload.php');

// Fields picked from form
$name = $_POST["name"];
$tel = $_POST["tel"];


// From
$recipient = "josh.nattrass@gmail.com";


if (empty($name) || empty($tel)) {
  $arr = array('status' => 'error', 'message' => 'is blank');
  echo json_encode($arr);
  exit;
} else {

// PHPMailer
  $mail = new PHPMailer;
  $mail->From = 'josh.nattrass@gmail.com';
  $mail->FromName = $name;
  $mail->AddAddress($recipient);
  $mail->Subject = 'Subject';
  $mail->Body = "Name: $name\r\n\r\nPhone Number: $tel";

// Send the message, check for errors
  if (!$mail->send()) {
    $arr = array('status' => 'error', 'message' => 'error');
    echo json_encode($arr);
    exit;
  } else {
    $arr = array('status' => 'ok', 'message' => 'complite');
    echo json_encode($arr);
    exit;
  }
}
