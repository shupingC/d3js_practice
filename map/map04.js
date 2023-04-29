console.log('success')

function drawSvg() {
    // 刪除原本的svg.charts，重新渲染改變寬度的svg
    d3.select('.map svg').remove();

    // RWD 的svg 寬高
    const rwdSvgWidth = parseInt(d3.select('.map').style('width')),
        rwdSvgHeight = rwdSvgWidth * 0.5,
        margin = 30,
        bandWidth = 20

    const svg = d3.select('.map')
        .append('svg')
        .attr('width', rwdSvgWidth)
        .attr('height', rwdSvgHeight);
    
    console.log('drawSvg')
}


unemployment = [
    { "name": "Vermont", "rate": 2.1, "rank": 1 }, 
    { "name": "North Dakota", "rate": 2.4, "rank": 2 },
    { "name": "Iowa", "rate": 2.5, "rank": 3 },
    { "name": "New Hampshire", "rate": 2.5, "rank": 3 },
    { "name": "Hawaii", "rate": 2.8, "rank": 5 },
    { "name": "Utah", "rate": 2.8, "rank": 5 },
    { "name": "Colorado", "rate": 2.9, "rank": 7 },
    { "name": "Idaho", "rate": 2.9, "rank": 7 },
    { "name": "Massachusetts", "rate": 2.9, "rank": 7 },
]

// 9: Object { "name": "South Dakota", "rate": 2.9, "rank": 7 }
// 10: Object { "name": "Virginia", "rate": 2.9, "rank": 7 }
// 11: Object { "name": "Maine", "rate": 3, "rank": 12 }
// 12: Object { "name": "Wisconsin", "rate": 3, "rank": 12 }
// 13: Object { "name": "Nebraska", "rate": 3.1, "rank": 14 }
// 14: Object { "name": "Oklahoma", "rate": 3.2, "rank": 15 }
// 15: Object { "name": "Alabama", "rate": 3.3, "rank": 16 }
// 16: Object { "name": "Delaware", "rate": 3.3, "rank": 16 }
// 17: Object { "name": "Florida", "rate": 3.3, "rank": 16 }
// 18: Object { "name": "Kansas", "rate": 3.3, "rank": 16 }
// 19: Object { "name": "Missouri", "rate": 3.3, "rank": 16 }
// 20: Object { "name": "New Jersey", "rate": 3.3, "rank": 16 }
// 21: Object { "name": "Arkansas", "rate": 3.4, "rank": 22 }
// 22: Object { "name": "Indiana", "rate": 3.4, "rank": 22 }
// 23: Object { "name": "Minnesota", "rate": 3.4, "rank": 22 }
// 24: Object { "name": "Montana", "rate": 3.4, "rank": 22 }
// 25: Object { "name": "South Carolina", "rate": 3.4, "rank": 22 }
// 26: Object { "name": "Texas", "rate": 3.4, "rank": 22 }
// 27: Object { "name": "Rhode Island", "rate": 3.5, "rank": 28 }
// 28: Object { "name": "Tennessee", "rate": 3.5, "rank": 28 }
// 29: Object { "name": "Connecticut", "rate": 3.6, "rank": 30 }
// 30: Object { "name": "Georgia", "rate": 3.6, "rank": 30 }
// 31: Object { "name": "Wyoming", "rate": 3.6, "rank": 30 }
// 32: Object { "name": "Maryland", "rate": 3.8, "rank": 33 }
// 33: Object { "name": "Pennsylvania", "rate": 3.9, "rank": 34 }
// 34: Object { "name": "New York", "rate": 4, "rank": 35 }
// 35: Object { "name": "Ohio", "rate": 4, "rank": 35 }
// 36: Object { "name": "Oregon", "rate": 4, "rank": 35 }
// 37: Object { "name": "California", "rate": 4.1, "rank": 38 }
// 38: Object { "name": "Nevada", "rate": 4.1, "rank": 38 }
// 39: Object { "name": "Illinois", "rate": 4.2, "rank": 40 }
// 40: Object { "name": "North Carolina", "rate": 4.2, "rank": 40 }
// 41: Object { "name": "Kentucky", "rate": 4.3, "rank": 42 }
// 42: Object { "name": "Louisiana", "rate": 4.3, "rank": 42 }
// 43: Object { "name": "Michigan", "rate": 4.3, "rank": 42 }
// 44: Object { "name": "Washington", "rate": 4.6, "rank": 45 }
// 45: Object { "name": "West Virginia", "rate": 4.7, "rank": 46 }
// 46: Object { "name": "Arizona", "rate": 4.9, "rank": 47 }
// 47: Object { "name": "New Mexico", "rate": 4.9, "rank": 47 }
// 48: Object { "name": "Mississippi", "rate": 5.1, "rank": 49 }
// 49: Object { "name": "District of Columbia", "rate": 5.6, "rank": 50 }
// 50: Object { "name": "Alaska", "rate": 6.3, "rank": 51 }
// columns: Array(3)[""name"", ""rate"", ""rank""]
// ]

namemap = new Map(states.features.map(d => [d.properties.name, d.id]))

chart = UsStateChoropleth(unemployment, {
    id: d => namemap.get(d.name),
    value: d => d.rate,
    scale: d3.scaleQuantize,
    domain: [1, 10],
    range: d3.schemeBlues[6],
    title: (f, d) => `${f.properties.name}\n${d?.rate}%`
})

function UsStateChoropleth(data, {
    features = states,
    borders = statemesh,
    width = 975,
    height = 610,
} = {}) {
    return Choropleth(data, { features, borders, width, height});
}

//drawSvg()

//might need to import "name"map
    //"name"map = new Map(states.features.map(d => [d.properties."name", d.id]))
