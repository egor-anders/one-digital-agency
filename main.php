<?php
// Формирование самого письма
$title = "Feedback form";
$to = 'info@one-digital.agency';

$mail_data = [
  'name' => $_POST['name'],
  'email' => $_POST['email'],
  'phone' => $_POST['phone'],
  'subject' => $_POST['subject'],
  'message' => $_POST['message']
];

$c = true;
foreach ($mail_data as $key => $value) {
  if ($value != "" && $key != "project_name" && $key != "admin_email" && $key != "form_subject") {
    $body .= "
    " . (($c = !$c) ? '<tr>' : '<tr style="background-color: #f8f8f8;">') . "
      <td style='padding: 10px; border: #e9e9e9 1px solid;'><b>$key</b></td>
      <td style='padding: 10px; border: #e9e9e9 1px solid;'>$value</td>
    </tr>
    ";
  }
}

$body = "<table style='width: 100%;'>$body</table>";

try {
  $headers = [];
  $headers[] = 'MIME-Version: 1.0';
  $headers[] = 'Content-type: text/html; charset=utf-8';
  $headers[] = 'From: ONE DIGITAL AGENCY <info@one-digital.agency>';


  mail($to, $title, $body, implode("\r\n", $headers));


} catch (Exception $e) {
  $status = "Message not sent. Cause of error: {$e->getMessage()}";
}