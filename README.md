# L'application
Suivre les trajets de transports en commun de la SNCF (train, TGV, autocar etc.) sur une horaire particulière ou de manière journalière.

Utilisation des technologies React Native et Expo Go. Les données sont cherchées depuis l'API Nativia.io.

# Développement
>>>
	Etape en cours : requêtage des données pour les fonctionnalités Back-End principales.
>>>

## Debug avec chrome, s'assurer : 

device localhost:port dans les machines chromes
- https://reactnative.dev/docs/hermes#debugging-js-on-hermes-using-google-chromes-devtools

hermes est défini en tant que débugger dans app.json
- https://docs.expo.dev/guides/using-hermes/

si erreur "open" lors de l'ouverture du debugger
- https://github.com/jhen0409/react-native-debugger/issues/760

vérifier si c'est une bonne application hermes
- http://{serveur:port}/json/list
si vide : npm run start --localhost ou -tunnel

# Après le développement
Nettoyer cmdr