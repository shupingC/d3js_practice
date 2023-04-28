(async function choroplethUSEducation() {
    try {
        //retrieve data from external datasource
        const educationDataset = await d3.json("https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/for_user_education.json");
        const mapDataset = await d3.json("https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/counties.json");

        //display text for title and description  
        d3.select("#title").text("2010 - 2014:   United States Education Level By County")
        d3.select("#description").text("Figure 4.  Percentage of adults age 25 and older with a bachelor's degree or higher as assessed during the years 2010 to 2014 Move the mouse over the graph for data.")


        //Create chart height, width, paddings
        const padding = { top: 32, right: 32, bottom: 160, left: 160 };
        const innerHeight = 1000 - padding.top - padding.bottom;
        const innerWidth = 1000 - padding.left - padding.right;
        svg = d3.select("#choropleth")
            .append("svg")
            .attr("height", innerHeight + padding.top + padding.bottom)
            .attr("width", innerWidth + padding.left + padding.right)
            .attr("class", "chart")

        // //find max and min of education level by county to use for color thresholds
        const bachelorDegree = educationDataset.map(d => d.bachelorsOrHigher * 100)
        const maxPercent = d3.max(bachelorDegree) / 100;//75.1
        const minPercent = d3.min(bachelorDegree) / 100; //2.6

        const color = d3.scaleSequential().interpolator(d3.interpolateViridis)
            .domain([2.6, 75.1])
        // //define tooltip which will include data for state, county name and % of people with bachelors degree or higher
        // const tooltip = d3.select("main").append("div")
        //     .attr("class", "dataTip")
        //     .attr("id", "tooltip")

        const path = d3.geoPath();	//given a geometry or feature object, d3.geoPath() generates the path data string suitable for the "d" attribute of an SVG path element  
        svg.append("g")
            .selectAll("path")
            .data(topojson.feature(mapDataset, mapDataset.objects.counties).features)//convert topojson to geojson
            //Returns the GeoJSON Feature or FeatureCollection for the specified object in the given topology. If the specified object is a GeometryCollection, a FeatureCollection is returned, and each geometry in the collection is mapped to a Feature. ...which is the 'd' for subsequent data retrieval
            .enter().append("path").attr("d", path)
            .attr("class", "county")
            .attr("data-fips", d => d.id)
            .attr("data-education", d => (educationDataset.filter(e => e.fips == d.id))[0].bachelorsOrHigher)
            .attr("fill", d => color((educationDataset.filter(e => e.fips == d.id))[0].bachelorsOrHigher))
            // .on("mouseover", function (d) {
            //     tooltip.transition()
            //         .style('opacity', 1)
            //     tooltip.html('State: ' + (educationDataset.filter(e => e.fips == d.id))[0].state
            //         + '<br>' + 'County:  ' + (educationDataset.filter(e => e.fips == d.id))[0].area_name
            //         + '<br>' + '% of People With Bachelors Degree or Higher: ' + (educationDataset.filter(e => e.fips == d.id))[0].bachelorsOrHigher)
            //         .style('left', (d3.event.pageX) + 'px')
            //         .style('top', (d3.event.pageY + 'px'))
            //         .attr('data-education', (educationDataset.filter(e => e.fips == d.id))[0].bachelorsOrHigher)
            //     d3.select(this).style('opacity', 0.5)})

        //     .on("mouseout", function (d) {
        //         tooltip.transition()
        //             .style('opacity', 0)
        //         d3.select(this).style('opacity', 1)
        //     })


        // svg.append("path")
        //     .datum(topojson.mesh(mapDataset, mapDataset.objects.states, (a, b) => a !== b))
        //     .attr("class", "states")
        //     .attr("d", path);

        // //legend
        // let tempVarArr = educationDataset.map(d => d.bachelorsOrHigher)
        // let tempVarSet = Array.from(new Set(tempVarArr))
        // let sortedTempVarSet = tempVarSet.sort((a, b) => a - b);

        // let legend = svg.selectAll(".legend")
        //     .data(color.domain())
        //     .enter().append("g")
        //     .attr("id", "legend")
        //     .attr("transform", (d, i) => `translate(${padding.left / 2}, ${innerHeight - padding.top - i * 2})`)

        // legend.selectAll().data(sortedTempVarSet)
        //     .enter().append("rect")
        //     .attr("x", (d, i) => i * 2)
        //     .attr("y", 0)
        //     .attr('width', 2)
        //     .attr('height', 20)
        //     .style("fill", d => color(d))
        //     .on("mouseover", function (d) {
        //         tooltip.transition()
        //             .style('opacity', 1)
        //         tooltip.html('% Bachelors Degrees: ' + d)
        //             .style('left', (d3.event.pageX) + 'px')
        //             .style('top', (d3.event.pageY + 'px'))
        //         d3.select(this).style('opacity', 0.5)
        //     })

        //     .on("mouseout", function (d) {
        //         tooltip.transition()
        //             .style('opacity', 0)
        //         d3.select(this).style('opacity', 1)
        //     })


    } catch (error) { console.log(error.name, error.message) }

})();//end of async function choroplethUSEducation
