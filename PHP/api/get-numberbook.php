<?php
$conn = mysqli_connect('localhost', 'root', '', 'sellingbook') or die ('Can not connect to mysql');

$query = "SELECT COUNT(*) number FROM book";

$result = mysqli_query($conn, $query);
 
if (mysqli_num_rows($result) > 0)
{
    $row = mysqli_fetch_array($result);

    die ($row['number']);
}
?>