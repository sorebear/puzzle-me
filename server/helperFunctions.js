function generatePuzzleID(length=10){
	let potentials = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
	let output = '';
	for(let i=0; i<length; i++){
      output += potentials[( (Math.random() * potentials.length) >> 0 )];
	}
	return output;

}

module.exports = generatePuzzleID;