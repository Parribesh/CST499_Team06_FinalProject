// first variable is stability and second variable is speed
// stability: 0 low variability - 1 high variability
// speed: 0 being no connection - 1 being very fast

module.exports = {

  getDownloadSpeed: function (stability, speed) {
    if (stability === undefined) {
      stability = .1
    }
    if (speed === undefined) {
      speed = .1
    }

    var startSpeed = 1000

    var min = startSpeed * speed;
    min -= min * stability
    console.log("min: " + min);
    if (min < 0) {
      min = 0;
    }

    var max = startSpeed * speed;
    max += max * stability;
    console.log("max: " + max);

    return Math.floor(Math.random() * (max - min) + min);
  },

  getUploadSpeed: function (stability, speed) {
    if (stability === undefined) {
      stability = .1
    }
    if (speed === undefined) {
      speed = .1
    }

    var startSpeed = 1000

    var min = startSpeed * speed;
    min -= min * stability
    console.log("min: " + min);
    if (min <= 0) {
      min = 1;
    }

    var max = startSpeed * speed;
    max += max * stability;
    console.log("max: " + max);

    return Math.floor(Math.random() * (max - min) + min);
  },

  getPing: function (stability, speed) {
    if (stability === undefined) {
      stability = .3
    }
    if (speed === undefined) {
      speed = .2
    }

    var startSpeed = 300

    var min = startSpeed * speed;
    min -= min * stability
    console.log("min: " + min);
    if (min <= 0) {
      min = 1;
    }

    var max = startSpeed * speed;
    max += max * stability;
    console.log("max: " + max);

    return Math.floor(Math.random() * (max - min) + min);
  },

  getJitter: function (stability, speed) {
    if (stability === undefined) {
      stability = .1
    }
    if (speed === undefined) {
      speed = .5
    }

    var startSpeed = 60

    var min = startSpeed * speed;
    min -= min * stability
    console.log("min: " + min);
    if (min <= 0) {
      min = 1;
    }

    var max = startSpeed * speed;
    max += max * stability;
    console.log("max: " + max);

    return Math.floor(Math.random() * (max - min) + min);
  }
};