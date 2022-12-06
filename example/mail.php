<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require '../vendor/autoload.php';

$email_link = 'dadaadeife@outlook.com';
// $email_link = 'apextech2010@outlook.com';
$body = '<html lang="en">
      <head>
      <meta charset="UTF-8">
      <title>Package Delivery</title>
      <style>
      .wrapper{
        padding: 20px;
        color: #444;
        font-size: 1.3em;
      }
      a{
        background: #3a9663;
        text-decoration: none;
        padding: 8px 15px;
        border_radius: 5px;
        color: white;
      }
      </style>
      </head>

      <body>
      <div class="wrapper">
      <p>Your package is less than one kilometer away.<p>
      <a href="localhost/gps" style = "color: #fff;">Open Map</a>
      </div>
      </body>
      </html>';

$mail = new PHPMailer(true);

      // send verification mail
      try {
        //Server settings
        // $mail->SMTPDebug = SMTP::DEBUG_SERVER;                    // uncomment to enable verbose debug output
        $mail->isSMTP();                                            //Send using SMTP
        $mail->Host       = 'smtp-mail.outlook.com';                     //Set the SMTP server to send through
        $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
        $mail->Username   = $email_link;                     //SMTP username
        $mail->Password   = 'u7+:p@7q8KkRE*U';                               //SMTP password
        // $mail->Password   = 'Nifemi64';                               //SMTP password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;         //Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
        $mail->Port       = 587;
        // TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above

        // Recipients
        $mail->setFrom($email_link, 'GPS TRACKER');
        // $mail->addAddress('joe@example.net', 'Joe User');     //Add a recipient
        $mail->addReplyTo($email_link, 'GPS TRACKER');
        $mail->setFrom($email_link, 'GPS TRACKER');
        // $mail->addCC('cc@example.com');
        // $mail->addBCC('bcc@example.com');

        // Attachments
        // $mail->addAttachment('/var/tmp/file.tar.gz');         //Add attachments
        // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name

        // Content

        $mail->isHTML(true);                                  //Set email format to HTML
        $mail->Subject = 'Package Delivery';
        $mail->Body    =  $body;
        $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

        $sent = $mail->send();
        // if mail sent, fill database
        if($sent)
        {
           $json = array('success');
            print json_encode($json);
        }
 }
 catch (Exception $e)
 {
   // print "error";
   print "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
 }
