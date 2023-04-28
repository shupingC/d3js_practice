// Multiple Lines (Took medication by Age)

    let data = []

        // async function getData() {
        //     // 取資料
        //     dataGet = await d3.csv('./dataSource/Sheet 1-Mental_Health_Care_in_the_Last_4_Weeks (2).csv')
        //     data = dataGet.filter(i => i.Group === "By Age" && i.Indicator === 'Took Prescription Medication for Mental Health, Last 4 Weeks' && i.Subgroup === '18 - 29 years' && i.Phase > 0)
        //     drawChart()
        // };
        // getData()

        // function drawChart() {
        //     // 刪除原本的svg.charts，重新渲染改變寬度的svg
        //     d3.select('.chart svg').remove();

        //     // RWD 的svg 寬高
        //     const rwdSvgWidth = parseInt(d3.select('.chart').style('width')),
        //         rwdSvgHeight = rwdSvgWidth * 0.8,
        //         margin = 40,
        //         bandWidth = 20

        //     const svg = d3.select('.chart')
        //         .append('svg')
        //         .attr('width', rwdSvgWidth)
        //         .attr('height', rwdSvgHeight);

        //     // map 資料集
        //     xData = data.map((i) => parseInt(i['Time Period']));
        //     yData = data.map((i) => parseInt(i['Value']));

        //     // 設定要給 X 軸用的 scale 跟 axis
        //     const xScale = d3.scaleLinear()
        //         .domain(d3.extent(xData))
        //         .range([margin, rwdSvgWidth - margin]); // 寬度

        //     // rwd X軸的刻度
        //     let tickNumber = window.innerWidth > 900 ? xData.length / 2 : 8;
        //     const xAxis = d3.axisBottom(xScale)
        //         .ticks(tickNumber)
        //         .tickFormat(d => d)

        //     // 呼叫繪製x軸、調整x軸位置
        //     const xAxisGroup = svg.append("g")
        //         .call(xAxis)
        //         .attr("transform", `translate(0,${rwdSvgHeight - margin})`)

        //     // 設定要給 Y 軸用的 scale 跟 axis
        //     const yScale = d3.scaleLinear()
        //         .domain([0, d3.max(yData)])
        //         .range([rwdSvgHeight - margin, margin]); // 數值要顛倒，才會從低往高排

        //     const yAxis = d3.axisLeft(yScale)
        //         .ticks(5)

        //     // 呼叫繪製y軸、調整y軸位置
        //     const yAxisGroup = svg.append("g")
        //         .call(yAxis)
        //         .attr("transform", `translate(${margin},0)`)

        //     // 設定 path 的 d 
        //     const lineChart = d3.line()
        //         .x((d) => xScale(parseInt(d['Time Period'])))
        //         .y((d) => yScale(parseInt(d['Value'])))

        //     //再把 lineChart 這個方法帶入資料，並把返還的值賦予給 path

        //     // 建立折線圖
        //     svg.append('path')
        //         .data(data)
        //         .attr("d", lineChart(data))
        //         .attr("fill", "none")
        //         .attr("stroke", "steelblue")
        //         .attr("stroke-width", 1.5)


        //     // 使用 d3.bisector() 找到滑鼠的 X 軸 index 值
        //     const bisect = d3.bisector(d => d['Time Period']).left;

        //     // 建立沿著折線移動的圓點點
        //     const focus = svg.append('g')
        //         .append('circle')
        //         .style("fill", "none")
        //         .attr("stroke", "black")
        //         .attr('r', 8.5)
        //         .style("opacity", 0)

        //     // 建立移動的資料標籤
        //     const focusText = svg.append('g')
        //         .append('text')
        //         .style("opacity", 0)
        //         .attr("text-anchor", "left")
        //         .attr("alignment-baseline", "middle")

        //     // 建立一個覆蓋svg的方形
        //     svg
        //         .append('rect')
        //         .style("fill", "transparent")
        //         // .style("pointer-events", "all")
        //         .attr('width', rwdSvgWidth - margin)
        //         .attr('height', rwdSvgHeight - margin)
        //         .style('cursor', 'pointer')
        //         .on('mouseover', mouseover)
        //         .on('mousemove', mousemove)
        //         .on('mouseout', mouseout);

        //     function mouseover() {
        //         console.log('over')
        //         focus.style("opacity", 1)
        //         focusText.style("opacity", 1)
        //     }

        //     function mousemove() {
        //         // 把目前X的位置用xScale去換算
        //         const x0 = xScale.invert(d3.pointer(event, this)[0])
        //         // 由於我的X軸資料是擷取過的，這邊要整理並補零
        //         const fixedX0 = parseInt(x0).toString().padStart(2, '0')
        //         // 接著把擷取掉的2021補回來，因為data是帶入原本的資料
        //         let i = bisect(data, fixedX0)
        //         selectedData = data[i]

        //         // 圓點
        //         focus
        //             // 換算到X軸位置時，一樣使用擷取過的資料，才能準確換算到正確位置
        //             .attr("cx", xScale(selectedData['Time Period']))
        //             .attr("cy", yScale(selectedData['Value']))

        //         focusText
        //             .html('Percent:' + selectedData['Value'] + '%')
        //             .attr("x", xScale(selectedData['Time Period']))
        //             .attr("y", yScale(selectedData['Value']))

        //     }

        //     function mouseout() {
        //         focus.style("opacity", 0)
        //         focusText.style("opacity", 0)
        //     }

        // }


        // Draw multiple lines

    async function getData() {
            // get data
            dataGet = await d3.csv('./dataSource/Sheet 1-Mental_Health_Care_in_the_Last_4_Weeks.csv')
            data = dataGet.filter(i => i.Group === "By Age" && i.Indicator === 'Took Prescription Medication for Mental Health, Last 4 Weeks' && i.Phase > 0)
            drawChart()
            // console.log('data', data) 
        };
    getData();

    function drawChart() {
        // 刪除原本的svg.charts，重新渲染改變寬度的svg
        d3.select('.lineChart svg').remove();

        // RWD 的svg 寬高
        const rwdSvgWidth = parseInt(d3.select('.lineChart').style('width')),
        rwdSvgHeight = rwdSvgWidth * 0.5,
        margin = 40,
        bandWidth = 20

        const svg = d3.select('.lineChart')
        .append('svg')
        .attr('width', rwdSvgWidth)
        .attr('height', rwdSvgHeight);

        // map 資料集
        xData = data.map((i) => parseInt(i['Time Period']));
        yData = data.map((i) => parseInt(i.Value));
        console.log('yData', yData)

        //資料分組                
        var valueByAge = d3.group(data, d => d.Subgroup);
        console.log(valueByAge);


        // 設定要給 X 軸用的 scale 跟 axis
        const xScale = d3.scaleLinear()
        .domain(d3.extent(xData))
        .range([margin, rwdSvgWidth - margin]); // 寬度


        // rwd X軸的刻度
        let tickNumber = window.innerWidth > 900 ? xData.length / 2 : 8;
        const xAxis = d3.axisBottom(xScale)
                    .ticks(tickNumber)
                    .tickFormat(d => d)
        
        // 呼叫繪製x軸、調整x軸位置
        const xAxisGroup = svg.append("g")
                        .call(xAxis)
                        .attr("transform", `translate(0,${rwdSvgHeight - margin})`)
        

        // X axis label:
        svg.append("text")
            .attr("text-anchor", "end")
            //.attr("transform", "rotate(-90)")
            .attr("x", (rwdSvgWidth) / 2)
            .attr("y", rwdSvgHeight)
            .text("Time Period");


        // 設定要給 Y 軸用的 scale 跟 axis
        const yScale = d3.scaleLinear()
                    .domain([0, d3.max(yData)])
                    .range([rwdSvgHeight - margin, margin]); // 數值要顛倒，才會從低往高排

        const yAxis = d3.axisLeft(yScale)
                     .ticks(5)

        // 呼叫繪製y軸、調整y軸位置
        const yAxisGroup = svg.append("g")
            .call(yAxis)
            .attr("transform", `translate(${margin},0)`)
        
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


        svg.selectAll(".line")
        .data(valueByAge)
        .join("path")
        .attr('fill', 'none')
        .attr('stroke-width', 1.5)
                        .attr('stroke', d => color(d[0]))
                        .attr("d", d => {
                            return d3.line()
                                .x(d => xScale(parseInt(d['Time Period'])))
                                .y(d => yScale(parseInt(d.Value)))
                             (d[1]);
                        });
        
        // Draw legend
        var legend_keys = ["18 - 29 years", "30 - 39 years", "40 - 49 years", "50 - 59 years", "60 - 69 years", "70 - 79 years", "80 years and above"]
        //var legend_keys = ["18 - 29 years"]

        
        var lineLegend = svg.selectAll(".lineLegend").data(legend_keys)
            .enter().append("g")
            .attr("class", "lineLegend")
            .attr("transform", function (d, i) {
                return `translate(100, ${ (i+1) * 20})`;
                //return `translate(${i * 150}, 10)`;
            });

        lineLegend.append("text").text(function (d) { return d; })
            .attr("transform", "translate(15, 6)"); //align texts with boxes

        lineLegend.append("rect")
            .attr("fill", d => color(d[0]))
            .attr("width", 12).attr('height', 5);
        
    }

    d3.select(window).on('resize', drawChart);





let dataUnmet = []



// Draw multiple lines (Unmet needs by Age)

async function getDataUnmet() {
    // 取資料
    dataGet = await d3.csv('./dataSource/Sheet 1-Mental_Health_Care_in_the_Last_4_Weeks (2).csv')
    dataUnmet = dataGet.filter(i => i.Group === "By Age" && i.Indicator === 'Needed Counseling or Therapy But Did Not Get It, Last 4 Weeks' && i.Phase > 0)
    drawChart()
    console.log(dataUnmet)
};
getDataUnmet()

function drawChartUnmet() {
    // 刪除原本的svg.charts，重新渲染改變寬度的svg
    d3.select('.lineChartUnmet svg').remove();

    // RWD 的svg 寬高
    const rwdSvgWidth = parseInt(d3.select('.lineChartUnmet').style('width')),
        rwdSvgHeight = rwdSvgWidth * 0.8,
        margin = 40,
        bandWidth = 20

    const svg = d3.select('.lineChartUnmet')
        .append('svg')
        .attr('width', rwdSvgWidth)
        .attr('height', rwdSvgHeight);

    // map 資料集
    xData = dataUnmet.map((i) => parseInt(i['Time Period']));
    yData = dataUnmet.map((i) => parseInt(i.Value));

    //資料分組                
    var valueByAge = d3.group(dataUnmet, d => d.Subgroup);
    console.log(valueByAge);


    // 設定要給 X 軸用的 scale 跟 axis
    const xScale = d3.scaleLinear()
        .domain(d3.extent(xData))
        .range([margin, rwdSvgWidth - margin]); // 寬度


    // rwd X軸的刻度
    let tickNumber = window.innerWidth > 900 ? xData.length / 2 : 8;
    const xAxis = d3.axisBottom(xScale)
        .ticks(tickNumber)
        .tickFormat(d => d)

    // X axis label:
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("text-anchor", "end")
        .attr("x", -rwdSvgHeight / 2)
        .attr("y", 10)
        .text("Percentage");

    // 呼叫繪製x軸、調整x軸位置                
    const xAxisGroup = svg.append("g")
        .call(xAxis)
        .attr("transform", `translate(0,${rwdSvgHeight - margin})`)

    // 設定要給 Y 軸用的 scale 跟 axis
    const yScale = d3.scaleLinear()
        .domain([0, d3.max(yData)])
        .range([rwdSvgHeight - margin, margin]); // 數值要顛倒，才會從低往高排

    const yAxis = d3.axisLeft(yScale)
        .ticks(5)

    // Y axis label:
    svg.append("text")
        .attr("text-anchor", "end")
        //.attr("transform", "rotate(-90)")
        .attr("x", (rwdSvgWidth) / 2)
        .attr("y", rwdSvgHeight)
        .text("Time Period");

    // 呼叫繪製y軸、調整y軸位置
    const yAxisGroup = svg.append("g")
        .call(yAxis)
        .attr("transform", `translate(${margin},0)`)

    // color palette
    var res = Array.from(valueByAge.keys()); // list of group names
    var color = d3.scaleOrdinal()
        .domain(res)
        .range(['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink'])


    svg.selectAll(".line")
        .data(valueByAge)
        .join("path")
        .attr('fill', 'none')
        .attr('stroke-width', 1.5)
        .attr('stroke', d => color(d[0]))
        .attr("d", d => {
            return d3.line()
                .x(d => xScale(parseInt(d['Time Period'])))
                .y(d => yScale(parseInt(d.Value)))
                (d[1]);
        });

    // Draw legend
    var legend_keys = ["18 - 29 years", "30 - 39 years", "40 - 49 years", "50 - 59 years", "60 - 69 years", "70 - 79 years", "80 years and above"]
    //var legend_keys = ["18 - 29 years"]


    var lineLegend = svg.selectAll(".lineLegend").data(legend_keys)
        .enter().append("g")
        .attr("class", "lineLegend")
        .attr("transform", function (d, i) {
            return `translate(100, ${(i + 1) * 20})`;
            //return `translate(${i * 150}, 10)`;
        });

    lineLegend.append("text").text(function (d) { return d; })
        .attr("transform", "translate(15, 6)"); //align texts with boxes

    lineLegend.append("rect")
        .attr("fill", d => color(d[0]))
        .attr("width", 12).attr('height', 5);

}

d3.select(window).on('resize', drawChartUnmet);


