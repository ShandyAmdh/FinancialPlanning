<?php

// flash message
// cara menyimpan pesan sementara dalam section ditampilkan 1x

// biasanya setelah melakukan crud pesan tersebut akan ditampilkan kemudia flash message akan hilang

// disini buat message agar bisa akses global

// buat pengecekan dulu di bawah
if (! function_exists(function: 'flashmessage')) {
    function flashmessage($message, $type = 'SUCCESS'): void
    {
        session()->flash('message', $message);

        session()->flash('message', $message);
    }
}

// harus didaftarkan dulu baru bisa digunakan
// composer.json cari di autoload-dev tambahkan file di bawah
/*
  "files": [
    "app/Helpers/helpers.php"
]
*/

/*
kemudian jalankan perintah:
composer dump-autoload
 */

/* seandainya ada error perbaiki
 errornya dan jalankan lagi
  composer dump-autoload
*/
