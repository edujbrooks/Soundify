var path = require('path');

//Cargar modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite
var sequelize = new Sequelize(null, null, null,
  { dialect:  "sqlite",
    storage:  "soundify.sqlite"  // solo SQLite (.env)
  }
);

// Importar la tabla de definici�n de la tabla soundify en soundify.js
var Soundify = sequelize.import(path.join(__dirname,'soundify'));

//exportar definici�n de la tabla Soundify
exports.soundify = Soundify;

//sequelize.sync() inicializa tabla de preguntas en DB
sequelize.sync().then(function() {
	//success(..) ejecuta el manejador una vez creada la tabla
	Soundify.count().then(function (count){
		if (count === 0) {
			Soundify.create({ // la tabla se inicializa solo si est� vacia
				title: 'SDUD l4D',
        link: 'evqjKvDmu4',
				videoType: 'youtube',
				videoURL: 'http://www.youtube.com/watch?v=DA_XugebODU',
				videoSeconds: 0,
				soundType: 'youtube',
				soundURL: 'http://www.youtube.com/watch?v=svngvOLPd5E',
				soundSeconds: 3552,
			});
			Soundify.create({
				title: 'Test 2',
        link: 'HgKxfSBqjK',
				videoType: 'image',
				videoURL: 'http://edubrooks.com/zade.png',
				videoSeconds: 0,
				soundType: 'youtube',
				soundURL: 'https://www.youtube.com/watch?v=wZZ7oFKsKzY',
				soundSeconds: 0,
			}).then(function(){console.log('Base de datos inicializada')});
		};
	});
});
