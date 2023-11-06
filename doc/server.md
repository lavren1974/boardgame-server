# Server

# Nakama v3.18

Компилируем

```
go get
go build



Download the source tree.

git clone "https://github.com/heroiclabs/nakama" nakama
cd nakama

Build the project from source.

go build -trimpath -mod=vendor
./nakama --version

// тестовый запуск
// сменить password на свой пароль к базе

./nakama.exe migrate up --database.address postgres:password@127.0.0.1:5432
./nakama.exe --database.address postgres:password@127.0.0.1:5432 




Переименовать `config-example.yml` в `config.yml` в папке `config`



./nakama.exe --config ../config/config.yml

```
http://127.0.0.1:7351/

admin:password