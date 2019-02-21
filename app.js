var tau = 2 * Math.PI; // http://tauday.com/tau-manifesto

// http://bl.ocks.org/mbostock/5100636
function arcTween(newAngle, shape) {
  return function(d) {
    var interpolate = d3.interpolate(d.endAngle, newAngle);
    return function(t) {
      d.endAngle = interpolate(t);
      return shape(d);
    };
  }
}
var skew = 0.1;

var bigArc = d3.arc()
  .startAngle(-1 * skew)
  .innerRadius(90)
  .outerRadius(100);             

var smArc = d3.arc()
  .startAngle(skew)
  .innerRadius(80)
  .outerRadius(90);

// Build
var w = 300;
var h = 250;
const Data = 80;

var svgContainer = d3.select('#svg-container')
  .append('svg')
  .attr('height', h)
  .attr('width', w)
  .style('background', 'white');

var group = svgContainer.append('g')
  .attr('transform', 'translate(' + w/2 + ',' + h/2 + ')');

var large = group.append('path')
  .datum({endAngle: 0.12 * tau})
  .style('fill', 'orange')
  .attr('d', bigArc);

var small = group.append('path')
  .datum({endAngle: 0.2 * tau})
  .style('fill', 'navy')
  .attr('d', smArc);

group.append('circle')
  .attr('r', 0)
  .style('fill', '#efefef')
  .transition()
  .duration(1000)
  .attr('r', 80)

group.append('text')
  .text(Data + "%")
  .attr('x', '-40px')
  .attr('y', '15')
  .style('fill', 'transparent')
  .attr("font-family", "sans-serif")
  .attr("font-size", "45px")
  .transition()
  .duration(1000)
  .delay(500)
  .style('fill', 'navy')

// Transition
large.transition()
  .duration(1000)
  .attrTween("d", arcTween((-(Data/100) * tau) - skew, bigArc));

small.transition()
  .duration(750)
  .attrTween("d", arcTween((Data/100 * tau) + skew, smArc));