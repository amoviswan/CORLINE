<meta charset="utf-8"> 
<?php
$anketa="Анкета";
$posled="Последние места работы : ";
$period="Период работы :";
$po="по";
error_reporting( E_ERROR );   //Отключение предупреждений и нотайсов (warning и notice) на сайте
// создание переменных из полей формы		
if (isset($_POST['vac']))			{$vac			= $_POST['vac'];		if ($vac == '')	    {unset($vac);}}
if (isset($_POST['surname']))		{$surname		= $_POST['surname'];	if ($surname == '')	{unset($surname);}}
if (isset($_POST['name']))		    {$name		    = $_POST['name'];	    if ($name == '')	{unset($name);}}
if (isset($_POST['otc']))			{$otc			= $_POST['otc'];		if ($otc == '')	    {unset($otc);}}
if (isset($_POST['date']))			{$date			= $_POST['date'];		if ($date == '')	{unset($date);}}
if (isset($_POST['email']))			{$email			= $_POST['email'];		if ($email == '')	{unset($email);}}
if (isset($_POST['homePhone']))		{$homePhone		= $_POST['homePhone'];	if ($homePhone == '')   {unset($homePhone);}}
if (isset($_POST['text']))		    {$text		    = $_POST['text'];	    if ($text == '')	{unset($text);}}

if (isset($_POST['work0company']))		    {$work0company		    = $_POST['work0company'];	    if ($work0company == '')	{unset($work0company);}}
if (isset($_POST['work0beginmonth']))		    {$work0beginmonth		    = $_POST['work0beginmonth'];	    if ($work0beginmonth == '')	{unset($work0beginmonth);}}
if (isset($_POST['work0beginyear']))		    {$work0beginyear		    = $_POST['work0beginyear'];	    if ($work0beginyear == '')	{unset($work0beginyear);}}
if (isset($_POST['work0endmonth']))		    {$work0endmonth		    = $_POST['work0endmonth'];	    if ($work0endmonth == '')	{unset($work0endmonth);}}
if (isset($_POST['work0endyear']))		    {$work0endyear		    = $_POST['work0endyear'];	    if ($work0endyear == '')	{unset($work0endyear);}}
if (isset($_POST['work0position']))		    {$work0position		    = $_POST['work0position'];	    if ($work0position == '')	{unset($work0position);}}
if (isset($_POST['work0responsibility']))		    {$work0responsibility		    = $_POST['work0responsibility'];	    if ($work0responsibility == '')	{unset($work0responsibility);}}
if (isset($_POST['work1company']))		    {$work1company		    = $_POST['work1company'];	    if ($work1company == '')	{unset($work1company);}}
if (isset($_POST['work1beginmonth']))		    {$work1beginmonth		    = $_POST['work1beginmonth'];	    if ($work1beginmonth == '')	{unset($work1beginmonth);}}
if (isset($_POST['work1beginyear']))		    {$work1beginyear		    = $_POST['work1beginyear'];	    if ($work1beginyear == '')	{unset($work1beginyear);}}
if (isset($_POST['work1endmonth']))		    {$work1endmonth		    = $_POST['work1endmonth'];	    if ($work1endmonth == '')	{unset($work1endmonth);}}
if (isset($_POST['work1endyear']))		    {$work1endyear		    = $_POST['work1endyear'];	    if ($work1endyear == '')	{unset($work1endyear);}}
if (isset($_POST['work1position']))		    {$work1position		    = $_POST['work1position'];	    if ($work1position == '')	{unset($work1position);}}
if (isset($_POST['work1responsibility']))		    {$work1responsibility		    = $_POST['work1responsibility'];	    if ($work1responsibility == '')	{unset($work1responsibility);}}


if (isset($_POST['salary']))		    {$salary		    = $_POST['salary'];	    if ($salary == '')	{unset($salary);}}
if (isset($_POST['letter']))		    {$letter		    = $_POST['letter'];	    if ($letter == '')	{unset($letter);}}
if (isset($_POST['resume']))		    {$resume		    = $_POST['resume'];	    if ($resume == '')	{unset($resume);}}

if (isset($_POST['sab']))			{$sab			= $_POST['sab'];		if ($sab == '')		{unset($sab);}}
//стирание треугольных скобок из полей формы
/* комментарий */








if (isset($vac) ) {
$vac=stripslashes($vac);
$vac=htmlspecialchars($vac);
}
if (isset($surname) ) {
$surname=stripslashes($surname);
$surname=htmlspecialchars($surname);
}
if (isset($name) ) {
$name=stripslashes($name);
$name=htmlspecialchars($name);
}
if (isset($otc) ) {
$otc=stripslashes($otc);
$otc=htmlspecialchars($otc);
}
if (isset($date) ) {
$date=stripslashes($date);
$date=htmlspecialchars($date);
}
if (isset($email) ) {
$email=stripslashes($email);
$email=htmlspecialchars($email);
}
if (isset($homePhone) ) {
$homePhone=stripslashes($homePhone);
$homePhone=htmlspecialchars($homePhone);
}
if (isset($text) ) {
$text=stripslashes($text);
$text=htmlspecialchars($text);
}







if (isset($work0company) ) {
$work0company=stripslashes($work0company);
$work0company=htmlspecialchars($work0company);
}  
if (isset($work0beginmonth) ) {
$work0beginmonth=stripslashes($work0beginmonth);
$work0beginmonth=htmlspecialchars($work0beginmonth);
}  
if (isset($work0beginyear) ) {
$work0beginyear=stripslashes($work0beginyear);
$work0beginyear=htmlspecialchars($work0beginyear);
}  
if (isset($work0endmonth) ) {
$work0endmonth=stripslashes($work0endmonth);
$work0endmonth=htmlspecialchars($work0endmonth);
}  
if (isset($work0endyear) ) {
$work0endyear=stripslashes($work0endyear);
$work0endyear=htmlspecialchars($work0endyear);
}  
if (isset($work0position) ) {
$work0position=stripslashes($work0position);
$work0position=htmlspecialchars($work0position);
}  
if (isset($work0responsibility) ) {
$work0responsibility=stripslashes($work0responsibility);
$work0responsibility=htmlspecialchars($work0responsibility);
}  
if (isset($work1company) ) {
$work1company=stripslashes($work1company);
$work1company=htmlspecialchars($work1company);
}  
if (isset($work1beginmonth) ) {
$work1beginmonth=stripslashes($work1beginmonth);
$work1beginmonth=htmlspecialchars($work1beginmonth);
}  
if (isset($work1beginyear) ) {
$work1beginyear=stripslashes($work1beginyear);
$work1beginyear=htmlspecialchars($work1beginyear);
}  
if (isset($work1endmonth) ) {
$work1endmonth=stripslashes($work1endmonth);
$work1endmonth=htmlspecialchars($work1endmonth);
} 
if (isset($work1endyear) ) {
$work1endyear=stripslashes($work1endyear);
$work1endyear=htmlspecialchars($work1endyear);
}  
if (isset($work1position) ) {
$work1position=stripslashes($work1position);
$work1position=htmlspecialchars($work1position);
}  
if (isset($work1responsibility) ) {
$work1responsibility=stripslashes($work1responsibility);
$work1responsibility=htmlspecialchars(work1responsibility);
}  


if (isset($salary) ) {
$salary=stripslashes($salary);
$salary=htmlspecialchars($salary);
}
if (isset($letter) ) {
$letter=stripslashes($letter);
$letter=htmlspecialchars($letter);
}
if (isset($resume) ) {
$resume=stripslashes($resume);
$resume=htmlspecialchars($resume);
}


// адрес почты куда придет письмо
$address="volk7123@yandex.ru";
// текст письма 
$note_text=" \r\n Вакансия : $vac \r\n Фамилия : $surname \r\n Имя : $name \r\n Отчество : $otc \r\n Дата рождения : $date \r\n E-MAIL : $email \r\n Адрес : $text  \r\n Контактный телефон : $homePhone 
\r\n $posled\r\n 1. Название организации : $work0company \r\n $period $work0beginmonth $work0beginyear $po $work0endmonth $work0endyear \r\n Должность : $work0position \r\n Обязаности : $work0responsibility
\r\n 2. Название организации : $work1company \r\n $period $work1beginmonth $work1beginyear $po $work1endmonth $work1endyear \r\n Должность : $work1position \r\n Обязаности : $work1responsibility
\r\n Ожидаемая оплата труда: $salary \r\n Сопроводительное письмо: $letter 
\r\n Прикрепить резюме: $resume ";

if ( isset($name)  &&  isset ($sab) ) {
mail($address,$anketa,$note_text,"Content-type:text/plain; windows-work0beginyear51"); 
// сообщение после отправки формы
    
echo "<p style='color:green;'>Уважаемый(ая) <b style='color:red;'>$name</b> Ваше письмо отправленно успешно. <br> Спасибо. <br>Вам скоро ответят на почту <b style='color:red;'> $email</b>.</p>";
}

?>