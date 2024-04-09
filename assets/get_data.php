<?php 
if(isset($_POST['username'])) {
    $username=$_POST['username'];
    $phone_number=$_POST['phone_number'];
    $conx=mysqli_connect("localhost","root","root","uiproject");
    $sql="INSERT INTO `uiproject`.`users` (
        `username` ,
        `phone_number` 
        )
        VALUES ('$username','$phone_number')
        
        );";
    $result=mysqli_query($conx,$sql);
    if($result===true){
        echo "<h3>Inserted</h3>";
    }
}

