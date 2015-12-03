var path = require('path');

// Postgres DATABASE_URL = postgres://user:passwd@host:port/database
// SQLite   DATABASE_URL = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name  = (url[6]||null);
var user     = (url[2]||null);
var pwd      = (url[3]||null);
var protocol = (url[1]||null);
var dialect  = (url[1]||null);
var port     = (url[5]||null);
var host     = (url[4]||null);
var storage  = process.env.DATABASE_STORAGE;

//Cargar modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite
/*var sequelize = new Sequelize(null, null, null,
  { dialect:  "sqlite",
    storage:  "soundify.sqlite"  // solo SQLite (.env)
  }
);*/

// Usar BBDD SQLite o Postgres
var sequelize = new Sequelize(DB_name, user, pwd,
  { dialect:  protocol,
    protocol: protocol,
    port:     port,
    host:     host,
    storage:  storage,  // solo SQLite (.env)
    omitNull: true      // solo Postgres
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
