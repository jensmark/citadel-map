const urllib = require('urllib')
const mapslice = require('mapslice')
const process = require('process')
const log = require('npmlog')
const fs = require('fs');
const tempWrite = require('temp-write');

const url = 'https://citadelforgedwithfire.gamepedia.com/media/citadelforgedwithfire.gamepedia.com/a/ab/Citadel_map.jpg'

urllib.request(url, {
  timeout: 60000
}).then((res) => {

  log.info('Successfully downloaded map. Building tiles ... ')
  const filepath = tempWrite.sync(res.data, 'map.jpg')

  const mapSlicer = mapslice({
    file: filepath,
    output: "map/{z}/tile_{y}_{x}.jpg",
    background: 'black',
    imageMagick: true,
    skipEmptyTiles: true,
    minWidth: 100
  })

  mapSlicer.on("start", function(files, options) {
    log.enableProgress()
  })

  mapSlicer.on("error", function(err) {
    log.error(err)
    process.exit(-1)
  })

  let tracker = log.newItem("Build tiles", 1);
  mapSlicer.on("progress", function(progress, total, current, file) {
    tracker.completeWork(progress)
  })

  mapSlicer.on("end", function() {
    tracker.finish()
    log.info('Tiles built')
    process.exit(0)
  })

  mapSlicer.start()

}).catch((err) => {
  log.error('Failed to download Citadel Map')
  log.error(err)
  process.exit(-1)
})
