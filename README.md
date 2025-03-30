# Pump Web

## Технологии

Frontend: Angular 19

Backend: ASP.NET Core (.NET 9)

База данных: PostgreSQL 17


## Доступ к приложению:

Сейчас приложение развернуто на Render

`https://wilo-frontend.onrender.com`



Чтобы запустить проект локально через Docker, нужно изменить базовый URL API с HTTPS на HTTP в Angular-приложении.

В папке Wilo/Frontend/pump-web/src/app/services

Замените в файлах:

- material.service.ts

- motor.service.ts

- pump.service.ts

apiUrl = 'https://wilo-backend.onrender.com/api/...';

на

apiUrl = 'http://localhost:5097/api/...';

(вместо троеточия нужно поставить materials, motors или pumps, взависимости от файла)


## Как запустить:


` docker compose up --build `


## После запуска:

Backend: http://localhost:5097

Frontend: http://localhost:4200

PostgreSQL: localhost:5432
