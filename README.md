Trzeba wejść, w terminalu w VS code np w folder projektu i "npm install" wpisać

Można stworzyć certyfikaty/klucze czy coś, ale powinno zadziałać bez, najwyżej jak bez, to z .env wywalić część o kluczach i w package.json
to:
 "start": "set SSL_CRT_FILE=./certs/cert.crt&&set SSL_KEY_FILE=./certs/cert.key&&react-scripts start"

zmienić na to:
 "start": "react-scripts start"
Na końcu jak po npm install pojawi się node modules, to znowu będąc w głównym folderze "npm start"
