const { CSFilesService } = require('../services');

class CSFilesController {
  /**
   * @param {Object} config Configs
   * @param {string} config.hldsPath hlds.exe path
   * @param {string} config.mapsPath Maps path
   * @param {string} config.mapsFilter Maps filter
   * @param {string} config.mapsCyclePath Maps cycle path
   * @param {string} config.cfgPath server.cfg path
   */
  constructor(config) {
    this._service = new CSFilesService(config);
  }

  /**
   * Start hlds
   *
   * @returns {Promise} Promise
   */
  async start() {
    return this._service.start();
  }

  /**
   * Stop hlds
   *
   * @returns {Promise} Promise
   */
  async stop() {
    return this._service.stop();
  }

  /**
   * Returns server.cfg file
   *
   * @returns {Promise} Promise
   */
  async cfg() {
    return this._service.cfg();
  }

  /**
   * Update first map of server.cfg
   *
   * @param {string} map Map for update
   *
   * @returns {Promise} Promise
   */
  async updateFirstMap(map) {
    return this._service.updateFirstMap(map);
  }

  /**
   * Returns maps cycle
   *
   * @returns {Promise} Promise
   */
  async mapsCycle() {
    return this._service.mapsCycle();
  }

  /**
   * Update maps cycle
   *
   * @param {string} maps Maps for update
   *
   * @returns {Promise} Promise
   */
  async updateMapsCycle(maps) {
    return this._service.updateMapsCycle(maps);
  }

  /**
   * Returns maps on cstrike folder
   *
   * @returns {Promise} Promise
   */
  async maps() {
    return this._service.maps();
  }

  /**
   * Returns 10 random maps on cstrike folder
   *
   * @returns {Promise} Promise
   */
  async randomMaps() {
    return this._service.randomMaps();
  }
}

module.exports = CSFilesController;
