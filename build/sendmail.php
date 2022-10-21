<?php
  use PHPMailer\PHPMailer\PHPMailer;
  use PHPMailer\PHPMailer\Exception;

  require 'phpmailer/src/Exception.php';
  require 'phpmailer/src/PHPMailer.php';

  $mail = new PHPMailer(true);
  $mail->CharSet = 'UTF-8';
  $mail->setLanguage('ru', 'phpmailer/language/');
  $mail->IsHTML(true);

  //От кого письмо
  $mail->setFrom('zakaz@100hundred.ru', 'Landing Page');
  //кому отправить
  $mail->addAddress('oleg-00@yandex.ru, zakaz@100hundred.ru');
  //Тема письма
  $mail->Subject = 'Заявка с LP';

  //тело письма
  $body = '<h1>Письмо с заказом!</h1>';

  // if(trim(!empty($_POST['telegram']))){
    $body.='<p><strong>Телеграм:</strong> '.$_POST['telegram'].'</p>';
  // }
  // if(trim(!empty($_POST['whatsapp']))){
    $body.='<p><strong>WhatsApp:</strong> '.$_POST['whatsapp'].'</p>';
  // }
  // if(trim(!empty($_POST['viber']))){
    $body.='<p><strong>Viber:</strong> '.$_POST['viber'].'</p>';
  // }
  // if(trim(!empty($_POST['phone']))){
    $body.='<p><strong>Телефон:</strong> '.$_POST['phone'].'</p>';
  // }
  // if(trim(!empty($_POST['email']))){
    $body.='<p><strong>E-mail:</strong> '.$_POST['email'].'</p>';
  // }

  $mail->Body = $body;

  //отправляем
  if (!$mail->send()) {
    $message = 'Ошибка!php';
  } else {
    $message = 'Данные отправлены!';
  }

  $response = ['message' => $message];

  header('Content-type: application/json');
  echo json_encode($response);
?>
