const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const taskkill = require('taskkill');

const { constants } = require('../utils');

const fsp = fs.promises;

class CSFilesService {
  constructor(config = {}) {
    this.config = config;
  }

  async start() {
    const running = await this.isRunning(constants.EXECUTABLE);

    if (!running) {
      exec(this.config.hldsPath);
    }
  }

  async stop() {
    const running = await this.isRunning(constants.EXECUTABLE);

    if (running) {
      await taskkill([constants.EXECUTABLE]);
    }
  }

  async cfg() {
    const serverCfg = (await fsp.readFile(this.config.cfgPath)).toString().split('\n');
    const serverCfgJson = {};

    serverCfg.forEach((line) => {
      if (!line.startsWith('//') && line.trim() !== constants.EMPTY) {
        const currentline = line.split(' ');
        serverCfgJson[currentline[0].trim().replace(/["]/g, constants.EMPTY)] = currentline[1].trim().replace(/["]/g, constants.EMPTY);
      }
    });

    return serverCfgJson;
  }

  async updateFirstMap(map) {
    const serverCfg = (await fsp.readFile(this.config.cfgPath)).toString().split('\n');
    const newServerCfg = [];

    serverCfg.forEach((line) => {
      if (line.startsWith('map ')) {
        newServerCfg.push(`map ${map}`);
      } else {
        newServerCfg.push(line);
      }
    });

    const serverCfgStream = fs.createWriteStream(`${this.config.cfgPath}`, { flags: constants.FLAGS });

    newServerCfg.forEach((line) => {
      serverCfgStream.write(`${line}\n`);
    });

    serverCfgStream.end();
  }

  async mapsCycle() {
    const mapCycle = (await fsp.readFile(this.config.mapsCyclePath)).toString().split('\n');
    return mapCycle;
  }

  async updateMapsCycle(maps) {
    const mapCycleStream = fs.createWriteStream(`${this.config.mapsCyclePath}`, { flags: constants.FLAGS });

    maps.forEach((map) => {
      mapCycleStream.write(`${map}\n`);
    });

    mapCycleStream.end();
  }

  async maps() {
    const dirPath = this.config.mapsPath;
    const filter = this.config.mapsFilter;
    const files = await fsp.readdir(dirPath);

    const maps = [];

    files.filter((file) => {
      const extension = path.extname(file).toLowerCase();
      const includesFilter = filter != null ? file.includes(filter) : true;

      return extension === constants.MAPS_EXTENSION && includesFilter;
    }).forEach((file) => {
      maps.push(file.replace(constants.MAPS_EXTENSION, constants.EMPTY));
    });

    return maps;
  }

  async randomMaps() {
    const maps = await this.maps();

    return maps.map((a) => ({
      sort: Math.random(),
      value: a,
    }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value)
      .slice(0, 10);
  }

  async isRunning() {
    return new Promise((resolve) => {
      if (constants.COMMAND_TASKLIST === constants.EMPTY || constants.EXECUTABLE === constants.EMPTY) {
        resolve(false);
      }

      exec(constants.COMMAND_TASKLIST, (err, stdout) => {
        resolve(stdout.toLowerCase().indexOf(constants.EXECUTABLE.toLowerCase()) > -1);
      });
    });
  }
}

module.exports = CSFilesService;
