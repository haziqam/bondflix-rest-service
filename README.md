# Bondflix REST Service

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