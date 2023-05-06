// Multiple Lines (Took medication by Age)

let data = []



// Draw multiple lines (Took medication by Age)

async function getData() {
    // get data
    dataGet = await d3.csv('../dataSource/Sheet 1-Mental_Health_Care_in_the_Last_4_Weeks.csv')
    data = dataGet.filter(i => i.Group === "By Age" && i.Indicator === 'Needed Counseling or Therapy But Did Not Get It, Last 4 Weeks' && i.Phase > 0)
    drawChart()
    console.log('data', data)
};
getData()

function drawChart() {
    // 刪除原本的svg.charts，重新渲染改變寬度的svg
    d3.select('.lineChart svg').remove();

    // RWD 的svg 寬高
    const rwdSvgWidth = parseInt(d3.select('.lineChart').style('width')),
        rwdSvgHeight = rwdSvgWidth * 0.5,
        margin = 30,
        bandWidth = 20

    const svg = d3.select('.lineChart')
        .append('svg')
        .attr('width', rwdSvgWidth)
        .attr('height', rwdSvgHeight);

    // map 資料集
    xData = data.map((i) => i['Time Period Start Date']);
    yData = data.map((i) => parseInt(i.Value));
    console.log('yData', yData);

    //資料分組                
    var valueByAge = d3.group(data, d => d.Subgroup);
    //console.log(valueByAge);


    //X axis
    var parseTime = d3.timeParse("%m/%d/%Y");

    var dates = [];
    for (let i of xData) {
        dates.push(parseTime(i));
    }
    console.log('dates', dates);

    var xScale = d3.scaleTime()
        .domain(d3.extent(dates))
        .range([ 2 * margin, rwdSvgWidth - 4 * margin]);

    const xAxis = d3.axisBottom(xScale)
                .ticks(15)

    // 呼叫繪製x軸、調整x軸位置
    const xAxisGroup = svg.append("g")
        .call(xAxis)
        .attr("transform", `translate( 0,${rwdSvgHeight - 2 * margin})`)


    // X axis label:
    svg.append("text")
        .attr("text-anchor", "end")
        .attr("x", (rwdSvgWidth) / 2)
        .attr("y", rwdSvgHeight)
        .text("Time");

    // rwd X軸的刻度
    // let tickNumber = window.innerWidth > 900 ? xData.length / 2 : 8;
    // const xAxis = d3.axisBottom(xScale)
    //     .ticks(tickNumber)
    //     .tickFormat(d => d)


    // 設定要給 Y 軸用的 scale 跟 axis
    const yScale = d3.scaleLinear()
        .domain([0, d3.max(yData)])
        .range([rwdSvgHeight - 2 * margin, 2 * margin]); // 數值要顛倒，才會從低往高排

    const yAxis = d3.axisLeft(yScale)
        .ticks(5)


    // 呼叫繪製y軸、調整y軸位置
    const yAxisGroup = svg.append("g")
        .call(yAxis)
        .attr("transform", `translate(${2 * margin},0)`)

    // Y axis label:
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("text-anchor", "end")
        .attr("x", -rwdSvgHeight / 2)
        .attr("y", 10)
        .text("Percentage");
    

    // color palette
        var res = Array.from(valueByAge.keys()); // list of group names
        var color = d3.scaleOrdinal()
            .domain(res)
            .range(['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink'])

        // var color = d3.scaleSequential()
        //     .domain([Array.from(valueByAge.keys())])
        //     .interpolator(d3.interpolatePuRd);
    
        //var color = d3.scale.category10();


    svg.selectAll(".line")
        .data(valueByAge)
        .join("path")
        .attr('fill', 'none')
        .attr('stroke-width', 1.5)
        // .attr("stroke", function () { // Add dynamically
        //     return d.color = color(d.key);
        // })
        .attr('stroke', d => color(d[0]))
        .attr("d", d => {
            return d3.line()
                .x(d => (xScale(parseTime(d['Time Period Start Date'])))) //?
                .y(d => yScale(d.Value))
                (d[1]);
        });
    
    svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("r", 2)
        .attr("fill", 'gray')
        .attr("cx", d => (xScale(parseTime(d['Time Period Start Date']))))
        .attr("cy", d => yScale(d.Value));

    // Draw legend
    var legend_keys = ["18 - 29 years", "30 - 39 years", "40 - 49 years", "50 - 59 years", "60 - 69 years", "70 - 79 years", "80 years and above"]
    //var legend_keys = ["18 - 29 years"]


    var lineLegend = svg.selectAll(".lineLegend").data(legend_keys)
        .enter()
        .append("g")
        .attr("class", "lineLegend")
        .attr("transform", function (d, i) {
            return `translate(${rwdSvgWidth - 3 * margin}, ${(i + 1) * 20})`;
            //return `translate(${i * 150}, 10)`;
        });

    lineLegend.append("text").text(function (d) { return d; })
        .attr("transform", "translate(15, 6)"); //align texts with boxes

    lineLegend.append("rect")
        .attr("fill", d => color(d[0]))
        .attr("width", 12).attr('height', 5);

}

d3.select(window).on('resize', drawChart);



