var accessor = function(row) {
    return {
        x: +row.x*10,
        y: +row.y*10,
        z: +row.z*10,
        fitness: +row.fitness,
        id: +row.id
    }
}


var coords = function(x, y, z) {
    return x + " " + y + " " + z
}

var load_landscape = function(filename1, filename2, filename3) {

    var scene = d3.select('a-scene')

    Promise.all([
        d3.csv(filename1, accessor),
        d3.csv(filename2, accessor),
        d3.text(filename3)
    ])
    .then(
        function(files) {
        landscape = files[0]
        lod = files[1]
        edges = files[2]

        var pts = scene.selectAll('data_point')
            .data(landscape, function(d){return d.x})
        
        
        var nodes = scene.selectAll('phylo_node')
            .data(lod, function(d){return d.id})
        

        const meshline_param = 'linewidth: 20; path: ' + edges + '; color: #000'

        var lod = scene.append('a-entity')
            .attr('meshline', meshline_param)

        var min = d3.min(landscape, function(d) {return d.fitness});
        var max = d3.max(landscape, function(d) {return d.fitness});

        var colScale = d3.scaleSequential(d3.interpolatePlasma);
        colScale.domain([min, max])

        var phyloScale = d3.scaleSequential(d3.interpolateViridis);
        phyloScale.domain([0, 10000])
        
        pts.enter()
            .append('a-box')
            .attr('class', 'data_point')
            .attr('color', function(d) {return colScale(d.fitness)})
            .attr('position', function(d) {return coords(d.x, d.y, d.z)})
            .attr('opacity', 1);
        
        nodes.enter()
            .append('a-box')
            .attr('class', 'phylo_node')
            .attr('color', function (d) {return phyloScale(d.id)})
            .attr('position', function(d) {return coords(d.x, d.y, d.z)})
            .attr('height', 0.2)
            .attr('depth', 0.2)
            .attr('width', 0.2)
        
        }
    )

}



