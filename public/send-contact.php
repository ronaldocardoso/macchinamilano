<?php
declare(strict_types=1);

function redirect_to(string $fragment): never
{
    header('Location: /contatti/#' . $fragment, true, 303);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    http_response_code(405);
    exit('Metodo non consentito.');
}

$honeypot = trim((string) ($_POST['website'] ?? ''));
if ($honeypot !== '') {
    redirect_to('messaggio-inviato');
}

$nome = trim((string) ($_POST['nome'] ?? ''));
$cognome = trim((string) ($_POST['cognome'] ?? ''));
$email = filter_var(trim((string) ($_POST['email'] ?? '')), FILTER_VALIDATE_EMAIL);
$telefono = trim((string) ($_POST['telefono'] ?? ''));
$messaggio = trim((string) ($_POST['messaggio'] ?? ''));
$aggiornamenti = isset($_POST['aggiornamenti']) ? 'Sì' : 'No';

if ($nome === '' || $cognome === '' || $email === false || $messaggio === '') {
    redirect_to('errore-invio');
}

$nome = str_replace(["\r", "\n"], ' ', substr($nome, 0, 100));
$cognome = str_replace(["\r", "\n"], ' ', substr($cognome, 0, 100));
$telefono = str_replace(["\r", "\n"], ' ', substr($telefono, 0, 60));
$messaggio = substr($messaggio, 0, 5000);

$destinatario = 'ciao@macchinamilano.it';
$oggetto = 'Nuovo contatto Macchina Milano — ' . $nome . ' ' . $cognome;
$oggettoCodificato = '=?UTF-8?B?' . base64_encode($oggetto) . '?=';

$corpo = implode("\n", [
    'Nuovo messaggio dal sito Macchina Milano',
    '',
    'Nome: ' . $nome,
    'Cognome: ' . $cognome,
    'E-mail: ' . $email,
    'Telefono: ' . ($telefono !== '' ? $telefono : 'Non indicato'),
    'Aggiornamenti: ' . $aggiornamenti,
    '',
    'Messaggio:',
    $messaggio,
]);

$headers = implode("\r\n", [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'From: Macchina Milano <noreply@macchinamilano.it>',
    'Reply-To: ' . $email,
    'X-Mailer: PHP/' . PHP_VERSION,
]);

$inviato = mail($destinatario, $oggettoCodificato, $corpo, $headers);
redirect_to($inviato ? 'messaggio-inviato' : 'errore-invio');
