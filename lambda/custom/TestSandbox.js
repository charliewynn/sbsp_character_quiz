const gm = require('./GameManager');
gm.NewGame('Easy');
console.log(gm.Hint(true));
console.log(gm.Hint(false));
console.log(gm.Hint(false));
console.log(gm.Hint(false));
console.log(gm.Hint(false));
console.log(gm.Score());