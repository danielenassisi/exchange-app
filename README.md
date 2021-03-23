# exchange-app

L'applicativo si compone di quattro microservizi:
 - api
 - exchange
 - users
 - frontend

## Come avviare il progetto
L'unico prerequisito per avviare il progetto su una macchina è avere installato Docker.
Di seguito sono indicati i passi per garantire un corretto funzionamento:
 1. Creare un file .env nella cartella base del progetto
 2. Nel file settare due variabili
  1. MYSQL_ROOT_PASSWORD: variabile che indica la password dell'utente root del database
  2. MYSQL_DATABASE: variabile che indica il nome del database creato da settare con il valore **users_db**
 3. Nella cartella users creare un file .env
 4. Settare in questo file le seguenti variabili:
  1. DATABASE_URL: variabile che indica la connection string del database che deve essere del tipo mysql://root:password@usersdb:3306/users_db
  2. SECRET_JWT_KEY: variabile che indica la chiave con cui verra crittografato il JWT (da generare utilizzando appositi servizi)

Successivamente per far partire il progetto bisogna eseguire nella cartella base il comando:
```
docker-compose up
```

L'ultimo passo è generare lo schema del database (sarà sufficiente farlo solo al primo avvio):
  1. Aprire una shell dei comandi nel container del servizio users
  2. Eseguire il seguente comando:
  ```
  npx prisma migrate dev --preview-feature
  ```