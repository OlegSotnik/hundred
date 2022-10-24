<?php

require_once('phpmailer/src/PHPMailer.php');
require_once('phpmailer/src/SMTP.php');
require_once('phpmailer/src/Exception.php');

$mail = new PHPMailer\PHPMailer\PHPMailer();

$mail->isSMTP();
// IP или хостнейм сервера, на котором находится Ваш почтовый аккаунт. Этот адрес Вы можете найти в письме с данными от хостинг-аккаунта.

// так как мы используем 465 порт, то перед SERVER_ADDRESS надо указать ssl://
// если будем использовать 587 порт, то перед SERVER_ADDRESS надо указать tls://
// если используется 25 порт, то указывается только SERVER_ADDRESS

$mail->Host = 'ssl://mail.100hundred.ru';

$mail->SMTPAuth = true;
// наименование почтового ящика, или логин на почтовом сервере. Как правило, Вы указываете его, когда создаете почтовый ящик.
$mail->Username = 'zakaz@100hundred.ru';
// пароль от почтового ящика.
$mail->Password = 'gM6dK7mJ9asT8h';

// при указании SMTPSecure = ssl, то используется порт 465
// при указании tls - порт 587
// рекомендуется сочетать с указанием протокола в переменной Host
$mail->SMTPSecure = 'ssl';
$mail->Port = '465';
$mail->SMTPOptions = [ 'ssl' => [ 'verify_peer' => false, 'verify_peer_name' => false, 'allow_self_signed' => true, ] ];

// далее следует код, который отвечает за отправку письма
// укажите почтовый ящик отправителя. Рекомендуем указывать такой же, который указываем в авторизационных данных - LOGIN@DOMAIN.RU
$mail->From = 'zakaz@100hundred.ru';
// укажите имя отправителя, например "Сайт DOMAIN.RU"
$mail->FromName = 'Hundred.ru';
// укажите тему сообщения здесь
$mail->Subject = 'Заявка с Landing Page';
// кодировка, можете изменить на необходимую, но чаще всего используется UTF-8
$mail->CharSet = 'UTF-8';
//  укажите true вместо false, если хотите, чтобы сообщение обрабатывалось как HTML
$mail->isHTML(true);
//  указываем Русский язык
$mail->setLanguage('ru', 'phpmailer/language/');
// укажите почтовый адрес получателя
$mail->AddAddress('Oleg-00@yandex.ru');
// укажите 4, если почта не отправляется, чтобы узнать, почему
$mail->SMTPDebug = 0;

//тело письма
$body = '<h1>Контакты для обратной связи:</h1>';

if(trim(!empty($_POST['telegram']))){
  $body.='<p><strong>Телеграм:</strong> '.$_POST['telegram'].'</p>';
}
if(trim(!empty($_POST['whatsapp']))){
  $body.='<p><strong>WhatsApp:</strong> '.$_POST['whatsapp'].'</p>';
}
if(trim(!empty($_POST['viber']))){
  $body.='<p><strong>Viber:</strong> '.$_POST['viber'].'</p>';
}
if(trim(!empty($_POST['phone']))){
  $body.='<p><strong>Телефон:</strong> '.$_POST['phone'].'</p>';
}
if(trim(!empty($_POST['email']))){
  $body.='<p><strong>E-mail:</strong> '.$_POST['email'].'</p>';
}

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
