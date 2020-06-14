export default {
  monumentTypes: {
    DOMESTIC_URBAN: require('../assets/marker_p-domestic-urban.png'), //require.context('./../assets/', false, /DOMESTIC_URBAN\.png/),
    DOMESTIC_RURAL: require('../assets/marker_p-domestic-rural.png'),
    ADMINISTRATIV: require('../assets/marker_p-administrativ.png'),
    RELIGIOS: require('../assets/marker_p-religios.png'),
    TRANSPORTURI: require('../assets/marker_p-transporturi.png'),
    REPREZENTATIV: require('../assets/marker_p-reprezentativ.png'),
    PREINDUSTRIAL_PRELUCRATOR: require('../assets/marker_p-preindustrial-prelucrator.png'),
    INDUSTRIAL_PRELUCRATOR: require('../assets/marker_p-industrial-prelucrator.png'),
    INDUSTRIAL_ENERGETIC: require('../assets/marker_p-industrial-energetic.png'),
    INDUSTRIAL_EXTRACTIV: require('../assets/marker_p-industrial-extractiv.png'),
  },
  searchableFields: ['denumire', 'adresa', 'cod_lmi', 'tip_monument', 'tip_patrimoniu', 'sector'],
}