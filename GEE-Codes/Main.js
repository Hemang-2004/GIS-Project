
var locationDatabase = {
  'Chlorophyll-a (Algae Bloom)': {
    'Lake Erie ': { region: [-83.5, 41.3, -81.0, 42.5], zoom: 9 },
    'Lake Superior': { region: [-92.0, 46.5, -84.5, 49.0], zoom: 7 },
    'Lake Michigan': { region: [-88.0, 41.5, -84.5, 46.0], zoom: 7 },
    'Lake Huron': { region: [-84.5, 43.0, -80.0, 46.0], zoom: 7 },
    'Lake Ontario': { region: [-80.0, 43.0, -76.0, 44.5], zoom: 8 },
    'Aral Sea': { region: [58.0, 43.0, 61.5, 46.0], zoom: 7 },
    'Madiwala Lake ': { region: [77.61, 12.90, 77.63, 12.92], zoom: 14 },
    'Jayanagar Area ': { region: [77.57, 12.93, 77.59, 12.94], zoom: 14 },
    'Chilika Lake ': { region: [85.0, 19.4, 85.6, 19.9], zoom: 10 },
    'Vembanad Lake ': { region: [76.3, 9.5, 76.5, 10.0], zoom: 10 }
  },
  'Turbidity (Sediment)': {
    'Chilika Lake ': { region: [85.0, 19.4, 85.6, 19.9], zoom: 10 },
    'Vembanad Lake': { region: [76.3, 9.5, 76.5, 10.0], zoom: 10 },
    'Lake Erie': { region: [-83.5, 41.3, -81.0, 42.5], zoom: 9 },
    'Lake Superior': { region: [-92.0, 46.5, -84.5, 49.0], zoom: 7 },
    'Lake Michigan': { region: [-88.0, 41.5, -84.5, 46.0], zoom: 7 },
    'Lake Huron': { region: [-84.5, 43.0, -80.0, 46.0], zoom: 7 },
    'Lake Ontario': { region: [-80.0, 43.0, -76.0, 44.5], zoom: 8 },
    'Aral Sea': { region: [58.0, 43.0, 61.5, 46.0], zoom: 7 },
    'Madiwala Lake ': { region: [77.61, 12.90, 77.63, 12.92], zoom: 14 },
  },
  'Water Stability (Shrinkage)': {
    'Chilika Lake ': { region: [85.0, 19.4, 85.6, 19.9], zoom: 10 },
    'Vembanad Lake ': { region: [76.3, 9.5, 76.5, 10.0], zoom: 10 },
    'Lake Erie': { region: [-83.5, 41.3, -81.0, 42.5], zoom: 9 },
    'Lake Superior': { region: [-92.0, 46.5, -84.5, 49.0], zoom: 7 },
    'Lake Michigan': { region: [-88.0, 41.5, -84.5, 46.0], zoom: 7 },
    'Lake Huron': { region: [-84.5, 43.0, -80.0, 46.0], zoom: 7 },
    'Lake Ontario': { region: [-80.0, 43.0, -76.0, 44.5], zoom: 8 },
    'Aral Sea': { region: [58.0, 43.0, 61.5, 46.0], zoom: 7 },
    'Bellandur Lake ': { region: [77.63, 12.92, 77.68, 12.95], zoom: 13 },
    'Ulsoor Lake ': { region: [77.61, 12.97, 77.63, 12.99], zoom: 14 },
    'Madiwala Lake ': { region: [77.61, 12.90, 77.63, 12.92], zoom: 14 },
    'Jayanagar Area ': { region: [77.57, 12.93, 77.59, 12.94], zoom: 14 }
  }
};

// 2. DATE CONFIG
var date_start = '2023-08-01';
var date_end = '2023-09-30';

// 3. LOAD SENTINEL-3 OLCI
var s3 = ee.ImageCollection("COPERNICUS/S3/OLCI")
  .filterDate(date_start, date_end)
  .select(['Oa11_radiance','Oa08_radiance','Oa06_radiance','Oa17_radiance']);
var jrc = ee.Image("JRC/GSW1_4/GlobalSurfaceWater");
var worldCover = ee.ImageCollection("ESA/WorldCover/v200").first();
var exportClickCounter = 0;

// 4. INDEX CALCULATIONS
function calculateIndices(image) {
  // Compute NDCI
  var ndci = image.normalizedDifference(['Oa11_radiance','Oa08_radiance']);
  
  // Polynomial → CHLOROPHYLL-A estimate
  var chla = ndci.expression(
    '14.039 + 86.115 * N + 194.325 * N * N', {N: ndci}
  );
  // Clean clear water
  var chla_clean = chla.where(ndci.lt(-0.05), 0).rename('Chl_a');

  // Turbidity proxy (Original, will divide by 1000 later)
  var turbidity = image.select('Oa08_radiance').multiply(100).rename('Turbidity');

  // NDWI
  var ndwi = image.normalizedDifference(['Oa06_radiance','Oa17_radiance']).rename('NDWI');

  return image.addBands([chla_clean, turbidity, ndwi])
    .copyProperties(image, ['system:time_start']);
}

var composite = s3.map(calculateIndices).median();

// 5. WATER MASK
var waterMask = jrc.select('occurrence').gt(70)
  .and(worldCover.select('Map').eq(80));
var maskedComposite = composite.updateMask(waterMask);

// 6. VISUALIZATION SETTINGS
var vizSettings = {
  'Chlorophyll-a (Algae Bloom)': {
    band: 'Chl_a',
    min: 0, max: 30,
    mapPalette: ['000044', '0000FF', '00FFFF', '00FF00','FFFF00'],
    legendPalette: ['000044','0000FF','00FFFF','00FF00'],
    label: 'Chl-a (mg/m³)',
    legendMinTxt: '0', legendMaxTxt: '30+',
    filePrefix: 'Chla'
  },
  'Turbidity (Sediment)': {
    band: 'Turbidity',
    min: 7000, max: 11000,
    mapPalette: ['0000CC','00FFFF','D2B48C','8B4513'],
    legendPalette: ['0000CC','00FFFF','D2B48C','8B4513'],
    label: 'Turbidity',
    legendMinTxt: '0', legendMaxTxt: '50+',
    filePrefix: 'Turbidity'
  },
  'Water Stability (Shrinkage)': {
    type: 'static',
    layer: jrc.select('occurrence'),
    min: 0, max: 100,
    mapPalette: ['FF0000','FFAAAA','0000FF'],
    legendPalette: ['FF0000','FFAAAA','0000FF'],
    label: 'Permanent Water',
    legendMinTxt: '0%', legendMaxTxt: '100%',
    filePrefix: 'Shrinkage'
  }
};

// 7. MAP + UI
var mainMap = ui.Map();
mainMap.setOptions('SATELLITE');
mainMap.style().set('cursor','crosshair');
var currentMode = 'Chlorophyll-a (Algae Bloom)';

function updateMapLayer() {
  mainMap.layers().reset();
  var s = vizSettings[currentMode];
  if (s.type === 'static') {
    mainMap.addLayer(s.layer, {min:s.min, max:s.max, palette:s.mapPalette}, 'Analysis');
  } else {
    mainMap.addLayer(maskedComposite.select(s.band),
      {min:s.min, max:s.max, palette:s.mapPalette}, 'Analysis');
  }
  
  var legendImage = ee.Image.pixelLonLat().select('latitude')
    .multiply((s.max - s.min)/100).add(s.min)
    .visualize({min:s.min, max:s.max, palette:s.legendPalette});
    
  legendLabel.setValue(s.label);
  legendThumb.setImage(legendImage);
  legendMin.setValue(s.legendMinTxt);
  legendMax.setValue(s.legendMaxTxt);
}

// 8. SIDE PANEL
var inspectorPanel = ui.Panel({style:{width:'350px', padding:'10px'}});
inspectorPanel.add(ui.Label("🌊 Multi-Parameter Water Dashboard", {fontWeight:'bold', fontSize:'20px'}));

var analysisSelect = ui.Select({items:Object.keys(vizSettings)});
var locSelect = ui.Select({items:[]});

analysisSelect.onChange(function(mode){
  currentMode = mode;
  updateMapLayer();
  var names = Object.keys(locationDatabase[mode]);
  locSelect.items().reset(names);
  locSelect.setValue(names[0]);
});

locSelect.onChange(function(key){
  var loc = locationDatabase[currentMode][key];
  mainMap.setCenter((loc.region[0]+loc.region[2])/2, (loc.region[1]+loc.region[3])/2, loc.zoom);
});

inspectorPanel.add(ui.Label("1. Select Analysis:",{fontWeight:'bold'}));
inspectorPanel.add(analysisSelect);
inspectorPanel.add(ui.Label("2. Select Location:",{fontWeight:'bold'}));
inspectorPanel.add(locSelect);
inspectorPanel.add(ui.Label("3. Results:",{fontWeight:'bold'}));
var resultsPanel = ui.Panel();
inspectorPanel.add(resultsPanel);

// 9. CLICK HANDLER (FAST & CLEAN)
mainMap.onClick(function(coords){
  resultsPanel.clear();
  resultsPanel.add(ui.Label("Processing...", {color:'gray'}));
  
  var pt = ee.Geometry.Point(coords.lon, coords.lat);
  mainMap.layers().set(1, ui.Map.Layer(pt, {color:'red'}, 'Point'));
  
  var longTerm = ee.ImageCollection("COPERNICUS/S3/OLCI")
    .filterBounds(pt)
    .filterDate('2020-01-01','2024-12-31')
    .filter(ee.Filter.calendarRange(8,9,'month'))
    .map(calculateIndices);
    
  // Simple Reducer - No complex noise logic
  var rawTable = longTerm.map(function(img){
    var stats = img.reduceRegion({
      reducer: ee.Reducer.mean(),
      geometry: pt,
      scale: 300, // Reduced scale slightly for better area averaging
      maxPixels: 1e9
    });
    return ee.Feature(null, stats).set('system:time_start', img.get('system:time_start'));
  });

  var clean = rawTable.filter(ee.Filter.notNull(['Chl_a','Turbidity','NDWI']));

  var finalTable = clean.map(function(f){
    var date = ee.Date(f.get('system:time_start')).format('YYYY-MM-dd');
    
    // Raw values
    var chla_val = ee.Number(f.get('Chl_a')).max(0);
    var turb_val = ee.Number(f.get('Turbidity'));
    var ndwi_val = ee.Number(f.get('NDWI'));

    // --- MATH ADJUSTMENTS ---
    // 1. Turbidity divided by 1000
    var turb_final = turb_val.divide(1000);
    
    // 2. Shrinkage calculation
    var shrink_final = ndwi_val.subtract(-0.5).divide(1.3).multiply(100);

    return ee.Feature(null, {
      date: date,
      'Chl_a': chla_val,
      'Turbidity': turb_final,
      'Shrinkage': shrink_final
    });
  });

  // UI PRINT
  resultsPanel.clear();
  resultsPanel.add(ui.Label("Date | Chl-a (mg/m³) | Turbidity/1000 | Shrinkage", {fontWeight:'bold'}));
  
  finalTable.toList(finalTable.size()).evaluate(function(list){
    if (!list || list.length === 0) {
      resultsPanel.add(ui.Label("No clean data available."));
      return;
    }
    list.forEach(function(f){
      var p = f.properties;
      resultsPanel.add(ui.Label(
        p.date+" | "+
        Number(p['Chl_a']).toFixed(2)+" | "+
        Number(p['Turbidity']).toFixed(3)+" | "+ // 3 decimal places for small numbers
        Number(p['Shrinkage']).toFixed(2)
      ));
    });
  });

  // EXPORT
  var suffix = String.fromCharCode(97 + (exportClickCounter % 26));
  var name = 'FastReport_' + suffix;
  exportClickCounter++;
  
  Export.table.toDrive({
    collection: finalTable,
    description: name,
    folder: 'GIS-Project',
    fileNamePrefix: name,
    fileFormat: 'CSV',
    selectors: ['date','Chl_a','Turbidity','Shrinkage']
  });
  
  resultsPanel.add(ui.Label("Export Started: "+name, {color:'blue'}));
});

// 10. LEGEND
var legendPanel = ui.Panel({
  style:{position:'bottom-right', padding:'8px', backgroundColor:'rgba(255,255,255,0.9)'}
});
var legendLabel = ui.Label('Legend',{fontWeight:'bold'});
var legendMax = ui.Label('High');
var legendMin = ui.Label('Low');
var legendThumb = ui.Thumbnail({
  image: ee.Image.constant(0),
  params:{bbox:'0,0,10,100', dimensions:'10x150'}
});
legendPanel.add(legendLabel);
legendPanel.add(ui.Panel({
  widgets:[legendMax, legendThumb, legendMin],
  style:{backgroundColor:'rgba(0,0,0,0)'}
}));
mainMap.add(legendPanel);

ui.root.clear();
ui.root.add(ui.SplitPanel(inspectorPanel, mainMap));
analysisSelect.setValue('Chlorophyll-a (Algae Bloom)');
updateMapLayer();