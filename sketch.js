trial = 10000;
dsize = 10;
rolls = 2;

let sketch = function(p) {
  p.setup = function(){
    p.createCanvas(800,800);
    p.background(51);
    histogram(p,trial,dsize,rolls);
  }
};
new p5(sketch,'container');

function process(){
  var form = document.getElementById('theForm').elements;
  trial = int(form[0].value);
  dsize = int(form[1].value);
  rolls = int(form[2].value);
  histogram(sketch,trial,dsize,rolls);
}

function histogram(p,t,d,r){
  p.background(51);
  nums = [];
  size = d * r;
  for (var x = 0; x < size; x++){
    nums.push(0);
  }
  for(var x = 0; x < t; x++){
    var temp = 0;
    for(var y = 0; y < r; y++){
      temp += p.int(p.random(1,d+1));
    }
    nums[temp-1]++;
  }
  nums.forEach((x,y) => {p.rect(y*(p.width/size),p.height,p.width/size,-x*(p.height/t)*(d/2));})
}