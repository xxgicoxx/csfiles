# csfiles
Node.js package for read and update Counter-Strike 1.6 files.

<p align="center">
  <img src="assets/imgs/csfiles.png">
</p>

# Features
* Read Counter-Strike 1.6 files
* Update Counter-Strike 1.6 files

# Prerequisites
* [Node.js](https://nodejs.org/en/)

# Installation
````
npm install csfiles
````

# Example
```javascript
const CSFiles = require('csfiles');

const csfiles = new CSFiles({
  hldsPath: 'C:/Users/giovani/Desktop/hlds.lnk',
  mapsPath: 'C:/Users/giovani/Desktop/Counter-Strike 1.6/cstrike/maps',
  mapsFilter: 'fy_',
  mapsCyclePath: 'C:/Users/giovani/Desktop/Counter-Strike 1.6/cstrike/mapcycle.txt',
  cfgPath: 'C:/Users/giovani/Desktop/Counter-Strike 1.6/cstrike/server.cfg',
});

(async () => {
  const cfg = await csfiles.cfg();
  console.log(cfg);

  const mapsCycle = await csfiles.mapsCycle();
  console.log(mapsCycle);
})();
```

# Built With
* [Node.js](https://nodejs.org/en/)

# Authors
* [xxgicoxx](https://github.com/xxgicoxx)

# Acknowledgments
* [FlatIcon](https://www.flaticon.com/)