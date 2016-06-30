/**
 * Created by dtx on 16/6/29.
 */
(function () {
    var body = d3.select("body");
    var div = body.selectAll("div");
    div.text("www.ourd3js.com");
    div.append("p").text("pp");
    body.insert("p","#div").text("ppp");
    var dataset = [ 2.5 , 2.1 , 1.7 , 1.3 , 0.9 ];
    var min = 0;
    var max = d3.max(dataset);
//线性比例尺
    var linear = d3.scale.linear()
        .domain([min,max])
        .range([0,250]);
    var xScale = d3.scale.ordinal()
        .domain(d3.range(dataset.length-1))
        .rangeRoundBands([100, 0]);
//坐标轴
    var xAxis = d3.svg.axis()
        .scale(linear)
        .orient("bottom")
        .ticks(7);
    var yAxis = d3.svg.axis()
        .scale(xScale)
        .orient("left")
        .ticks(4);

    var svg = body.append("svg");
    var g = svg.append("g");//创建为分组元素g添加坐标轴
    g.attr("transform","translate(20,130)")
        .call(xAxis);
    var g = svg.append("g");
    g.attr("transform","translate(20,25)")
        .call(yAxis);
    svg.attr("width",300)
        .attr("height",300)
        .append("rect");
    svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        //x：矩形左上角的 x 坐标
        .attr("x",20)
        //y：矩形左上角的 y 坐标
        .attr("y",function (d, i) {
            return i*25
        })
        .attr("width",function (d) {
            return linear(d);  //调用线性比例尺
        })
        .attr("height",23)
        .attr("fill","steelblue")
        .on("click",function () {
            alert("你点我了!!!");
        })

        //动画
        .transition()
        .duration(2000)//持续时间
        .ease("circle")//过度方式
        .delay(500)//延迟执行
        .attr("fill","red");

}());

(function () {
    var body = d3.select("body");
    var svg = body.append("svg");
    svg.attr("width",300)
        .attr("height",300);
    var dataset = [ 30 , 10 , 43 , 55 , 13 ];
    var pie = d3.layout.pie();  //定义布局(饼图)
    var pieData = pie(dataset); //转化数据
    var arc = d3.svg.arc()  //弧生成器,设置半径
        .innerRadius(0)
        .outerRadius(100);
    var arcs = svg.selectAll("g")  //创建分组,每个分组存放一段弧的相关元素
        .data(pieData)
        .enter()
        .append("g")
        .attr("transform","translate(150,100)")
        .on("click",function () {
            d3.event.path[1].attributes[0].nodeValue = "translate(120,100)";
            console.log(arcs);
            console.log(d3.event);
        });
    var color = d3.scale.category10();   //category10有十种颜色的颜色比例尺
    arcs.append("path")
        .attr("fill",function(d,i){
            return color(i);
        })
        .attr("d",function(d){
            return arc(d);   //调用弧生成器，得到路径值
        });
    arcs.append("text")
        .attr("transform",function(d){
            return "translate(" + arc.centroid(d) + ")";  //算出中心线
        })
        .attr("text-anchor","middle")
        .text(function(d){
            return d.data;
        });
}());


(function () {
    var nodes = [ { name: "桂林" }, { name: "广州" },
        { name: "厦门" }, { name: "杭州" },
        { name: "上海" }, { name: "青岛" },
        { name: "天津" } ];

    var edges = [ { source : 0 , target: 1 } , { source : 0 , target: 2 } ,
        { source : 0 , target: 3 } , { source : 1 , target: 4 } ,
        { source : 1 , target: 5 } , { source : 1 , target: 6 } ];
    //定义布局,力导图
    var force = d3.layout.force()
        .nodes(nodes)
        .links(edges)
        .size([300,300])    //作用范围
        .linkDistance(100)  //连接线长度
        .charge([-400]);  //作用力
    force.start();
    var body = d3.select("body");
    var svg = body.append("svg");
    svg.attr("width",300)
        .attr("height",300);

    //绘制连接线
    var svg_edges = svg.selectAll("line")
        .data(edges)
        .enter()
        .append("line")
        .style("stroke","#ccc")
        .style("stroke-width",1);

    var color = d3.scale.category20();

    //绘制节点
    var svg_nodes = svg.selectAll("circle")
        .data(nodes)
        .enter()
        .append("circle")
        .attr("r",20)
        .style("fill",function(d,i){
            return color(i);
        })
        .call(force.drag);  //使得节点能够拖动

    //添加描述节点的文字
    var svg_texts = svg.selectAll("text")
        .data(nodes)
        .enter()
        .append("text")
        .style("fill", "black")
        .attr("dx", 20)
        .attr("dy", 8)
        .text(function(d){
            return d.name;
        });
    force.on("tick", function(){ //对于每一个时间间隔
        //更新连线坐标
        svg_edges.attr("x1",function(d){ return d.source.x; })
            .attr("y1",function(d){ return d.source.y; })
            .attr("x2",function(d){ return d.target.x; })
            .attr("y2",function(d){ return d.target.y; });

        //更新节点坐标
        svg_nodes.attr("cx",function(d){ return d.x; })
            .attr("cy",function(d){ return d.y; });

        //更新文字坐标
        svg_texts.attr("x", function(d){ return d.x; })
            .attr("y", function(d){ return d.y; });
    });

}());
