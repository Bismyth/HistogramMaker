trial = 10000;
dsize = 10;
rolls = 2;
dice = [4,6,8,10,12,20,100];
let sketch = function(p) {
  p.setup = function(){
    p.createCanvas(800,800);
    p.background(51);
    histogram(p,trial,dsize,rolls,document.getElementById('theForm').elements);
  }
};
_p = new p5(sketch,'container');

function process(){
  var form = document.getElementById('theForm').elements;
  trial = parseInt(form[2].value);
  dsize = dice[parseInt(form[0].value)];
  rolls = parseInt(form[1].value);
  for(var x=0;x < form.length;x++){form[x].disabled=true;}
  setTimeout(function(){histogram(_p,trial,dsize,rolls,form)},5);
  
}

function histogram(p,t,d,r,f){
  p.background(51);
  size = ((d-1) * r)+1;
  var nums = new Array(size).fill(0);
  for(var x = 0; x < t; x++){
    var temp = 0;
    for(var y = 0; y < r; y++){
      temp += p.int(p.random(1,d+1));
    }
    nums[temp-r]++;
  }
  if (size > 600){
    p.stroke('white');
  }else{
    p.stroke('black');
  }
  var ma = Math.max.apply(null,nums);
  nums.forEach((x,y) => {p.rect(y*(p.width/size),p.height,p.width/size,-(x/ma)*600);})
  for(var x=0;x < f.length;x++){f[x].disabled=false;}
}

function diceUpdate(){
  var di = dice[document.getElementById('dice').value];
  document.getElementById('diceimg').src='diceImages/d'+di+'.png';
  document.getElementById('diceLabel').innerHTML = '(d'+di+')';
  process();
}
function rollUpdate(){
  document.getElementById('rollsLabel').innerHTML = document.getElementById('roll').value;
  process();
}
// function iterUpdate(){
//   document.getElementById('iterLabel').innerHTML = document.getElementById('iter').value;
//   process();
// }