//Definicion del modelo de soundify
module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Soundify', {
		title: {
			type: DataTypes.STRING,
			validate: { notEmpty: {msg: "-> Falta el t�tulo"}}
		},
		link: {
			type: DataTypes.STRING,
			validate: { notEmpty: {msg: "-> Falta el link"}}
		},
		videoType: {
			type: DataTypes.STRING,
			validate: { notEmpty: {msg: "-> Falta Tipo de video"}}
		},
		videoURL: {
			type: DataTypes.STRING,
			validate: { notEmpty: {msg: "-> Falta URL de video"}}
		},
		videoSeconds: {
			type: DataTypes.INTEGER,
		},
		soundType: {
			type: DataTypes.STRING,
			validate: { notEmpty: {msg: "-> Falta Tipo de sonido"}}
		},
		soundURL: {
			type: DataTypes.STRING,
			validate: { notEmpty: {msg: "-> Falta URL de sonido"}}
		},
		soundSeconds: {
			type: DataTypes.INTEGER,
		}
	});
}
