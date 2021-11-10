<?php 
$page = 1; $size = 20; $search = ''; $cate = 0 ;
if(isset($_GET['page'])) {
    $page = $_GET['page'];
}
if(isset($_GET['size'])) {
    $size = $_GET['size'];
}
if(isset($_GET['search'])) {
    $search = $_GET['search'];
}
if(isset($_GET['cate'])) {
    $cate = $_GET['cate'];
}

$offset = ($page - 1) * $size;

$conn = mysqli_connect('localhost', 'root', '', 'sellingbook') or die ('Can not connect to mysql');

$query = '';

if($cate == 0)
    $query = "SELECT * FROM book WHERE ten_sach LIKE '%" . $search . "%' ORDER BY id DESC LIMIT " . $offset . "," . $size;
else
    $query = "SELECT * FROM book WHERE ten_sach LIKE '%" . $search . "%' AND id_danhmuc = " . $cate . " ORDER BY id DESC LIMIT " . $offset . "," . $size;

$result = mysqli_query($conn, $query);
 
$datas = array();
 
if (mysqli_num_rows($result) > 0)
{
    while ($row = mysqli_fetch_array($result)){
        $datas[] = array(
            'id' => $row['id'],
            'id_danhmuc' => $row['id_danhmuc'],
            'ten_sach' => $row['ten_sach'],
            'tac_gia' => $row['tac_gia'],
            'so_luong' => $row['so_luong'],
            'gia_ban' => $row['gia_ban'],
            'gia_chua_giam' => $row['gia_chua_giam'],
            'giam_gia' => $row['giam_gia'],
            'mo_ta' => $row['mo_ta'],
            'anh' => $row['anh']
        );
    }
}
 
die (json_encode($datas));
?>