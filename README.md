# Bondflix REST Service

## Deskripsi Singkat
Bondflix REST Service adalah sebuah server yang menyediakan layanan RESTful API untuk SOAP Client, SPA Client, dan PHP Client.

## Skema Basis Data
![Schema](/asset/SchemaRest.png)

## Endpoint API
Endpoint API dapat dilihat pada link ini: https://documenter.getpostman.com/view/30701742/2s9YXpUJYa

## Pembagian Tugas
**Anggota Kelompok**

| Nama                   | NIM      | Panggilan |
| ---------------------- | -------- | --------- |
| Cetta Reswara Parahita | 13521133 | Cetta     |
| Nicholas Liem          | 13521135 | Nicholas  |
| Haziq Abiyyu Mahdy     | 13521170 | Haziq     |

| NIM      | Nama     | Fungsionalitas                                                                                                                        |
|----------|----------|---------------------------------------------------------------------------------------------------------------------------------------|
| 13521135 | Nicholas | Database Design, Architecture Design <br/>(Docker, Setup, <br/>Folder Structuring, etc)                                               |
| 13521135 | Nicholas | Adapters, Routing, Services, Repositories, <br/>Containers, Logging, Middlewares, Caching                                             |
| 13521135 | Nicholas | Handlers, Services, Repositories, and Entities: <br/>Category, <br/>Content, <br/>Genre, <br/> Subscription, <br/> User |
| 13521170 | Haziq    | Handlers, Services, Repositories, and Entities: <br/>Sponsor, <br/>Authorization, <br/>Database                                                                                       |


## Penggunaan Redis sebagai Tembolok (Read Through)
Jika gambar tidak bisa dibuka, lihat di folder asset dan nama file Redis-Simple-UseCase.png
![Redis](/asset/Redis-Simple-UseCase.png)

## Cara Menginstall dan Menjalankan Program - How to Install and Run The Program

1. Clone this repository
```sh
https://gitlab.informatika.org/if3110-2023-k01-01-24/bondflix-rest-service.git
```

2. Change the current directory to 'bondflix-rest-service' folder
```sh
cd bondflix-rest-service
```

3. Make a new .env file based on .env.example both for the docker and inside 'src folder'
```sh
mv .env.example .env && mv docker.env.example docker.env
```

4. Build and run your docker containers
```sh
docker-compose up -d --build
```
