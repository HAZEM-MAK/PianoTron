import Vex from 'vexflow';

export function test(ynote,on_int){
  
const VF = Vex.Flow;

// Create an SVG renderer and attach it to the DIV element named "vf".
const div = document.getElementById("vf")
const renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

// Configure the rendering context.
renderer.resize(1100, 500);
const context = renderer.getContext();

context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");

// Create a stave of width 400 at position 10, 40 on the canvas.
const stave1 = new VF.Stave(20, 40, 300);
const stave2 = new VF.Stave(320, 40, 250);
const stave3 = new VF.Stave(570, 40, 250);
const stave4 = new VF.Stave(820, 40, 250);
const stave5 = new VF.Stave(20, 125, 300);
const stave6 = new VF.Stave(320, 125, 250);
const stave7 = new VF.Stave(570, 125, 250);
const stave8 = new VF.Stave(820, 125, 250);
// Add a clef and time signature.
stave1.addClef("treble").addTimeSignature("4/4");
stave5.addClef("bass").addTimeSignature("4/4");
if(on_int==true){
// Connect it to the rendering context and draw!
stave1.setContext(context).draw();
stave2.setContext(context).draw();
stave3.setContext(context).draw();
stave4.setContext(context).draw();
stave5.setContext(context).draw();
stave6.setContext(context).draw();
stave7.setContext(context).draw();
stave8.setContext(context).draw();
}
var notes1 =[
    new VF.StaveNote({clef:"treble",keys:[ynote[0]],duration:"4"}),
    new VF.StaveNote({clef:"treble",keys:[ynote[1]],duration:"4"}),

    new VF.StaveNote({clef:"treble",keys:[ynote[2]],duration:"4"}),
    new VF.StaveNote({clef:"treble",keys:[ynote[3]],duration:"4"}), ];   
var notes2 =[
   new VF.StaveNote({clef:"treble",keys:[ynote[4]],duration:"16"}),
    new VF.StaveNote({clef:"treble",keys:[ynote[5]],duration:"16"}),
    new VF.StaveNote({clef:"treble",keys:[ynote[6]],duration:"8"}),
    new VF.StaveNote({clef:"treble",keys:[ynote[7]],duration:"4"}) ,

    new VF.StaveNote({clef:"treble",keys:[ynote[8]],duration:"4"}),
    new VF.StaveNote({clef:"treble",keys:[ynote[9]],duration:"4"}), ];   
var notes3 =[
    new VF.StaveNote({clef:"treble",keys:[ynote[10]],duration:"8"}),
    new VF.StaveNote({clef:"treble",keys:[ynote[11]],duration:"8"}),
    new VF.StaveNote({clef:"treble",keys:[ynote[12]],duration:"16"}),
    new VF.StaveNote({clef:"treble",keys:[ynote[13]],duration:"8"}) ,

    new VF.StaveNote({clef:"treble",keys:[ynote[14]],duration:"16"}),
    new VF.StaveNote({clef:"treble",keys:[ynote[15]],duration:"16"}),
    new VF.StaveNote({clef:"treble",keys:[ynote[16]],duration:"8"}),
    new VF.StaveNote({clef:"treble",keys:[ynote[17]],duration:"16"}),

    new VF.StaveNote({clef:"treble",keys:[ynote[18]],duration:"4"}),];  
var notes4 =[
    new VF.StaveNote({clef:"treble",keys:[ynote[19]],duration:"16"}),
    new VF.StaveNote({clef:"treble",keys:[ynote[20]],duration:"8"}),
    new VF.StaveNote({clef:"treble",keys:[ynote[21]],duration:"4"}),
    new VF.StaveNote({clef:"treble",keys:[ynote[22]],duration:"16"}) ,

    new VF.StaveNote({clef:"treble",keys:[ynote[23]],duration:"4"}),
    new VF.StaveNote({clef:"treble",keys:[ynote[24]],duration:"4"}), ];   
var notes5=[
    new VF.StaveNote({clef:"treble",keys:["b/4"],duration:"8"}),
    new VF.StaveNote({clef:"treble",keys:["e/4"],duration:"8"}),

    new VF.StaveNote({clef:"treble",keys:["c/4"],duration:"4"}),

    new VF.StaveNote({clef:"treble",keys:["b/4"],duration:"8"}),
    new VF.StaveNote({clef:"treble",keys:["e/4"],duration:"8"}),
    
    new VF.StaveNote({clef:"treble",keys:["d/4"],duration:"4"}), ];   
var notes6 =[
   new VF.StaveNote({clef:"treble",keys:["a/4"],duration:"16"}),
   new VF.StaveNote({clef:"treble",keys:["d/4"],duration:"4"}),
    new VF.StaveNote({clef:"treble",keys:["c/4"],duration:"8"}),
    new VF.StaveNote({clef:"treble",keys:["e/4"],duration:"4"}) ,
    new VF.StaveNote({clef:"treble",keys:["d/4"],duration:"16"}),
    
    new VF.StaveNote({clef:"treble",keys:["d/4"],duration:"4"}), ];   
var notes7 =[
    new VF.StaveNote({clef:"treble",keys:["e/4"],duration:"8"}),
    new VF.StaveNote({clef:"treble",keys:["g/4"],duration:"8"}) ,
    new VF.StaveNote({clef:"treble",keys:["b/4"],duration:"16"}),

    new VF.StaveNote({clef:"treble",keys:["a/4"],duration:"16"}),
    new VF.StaveNote({clef:"treble",keys:["e/4"],duration:"16"}),
    new VF.StaveNote({clef:"treble",keys:["e/4"],duration:"8"}),
    new VF.StaveNote({clef:"treble",keys:["d/4"],duration:"16"}),
    new VF.StaveNote({clef:"treble",keys:["f/4"],duration:"8"}),

    new VF.StaveNote({clef:"treble",keys:["d/4"],duration:"4"}),];  
var notes8 =[
    new VF.StaveNote({clef:"treble",keys:["d/4"],duration:"4"}),
    new VF.StaveNote({clef:"treble",keys:["d/4"],duration:"16"}) ,
    new VF.StaveNote({clef:"treble",keys:["e/4"],duration:"16"}),

    new VF.StaveNote({clef:"treble",keys:["e/4"],duration:"4"}),
    new VF.StaveNote({clef:"treble",keys:["a/4"],duration:"4"}), 
    new VF.StaveNote({clef:"treble",keys:["b/4"],duration:"8"}),
];  
    var voice1 =[
        new VF.Voice({num_beats:notes1.length,beat_value:notes1.length}).addTickables(notes1)];
    var voice2 =[
        new VF.Voice({num_beats:notes2.length,beat_value:notes2.length}).addTickables(notes2)];
    var voice3 =[
        new VF.Voice({num_beats:notes3.length,beat_value:notes3.length}).addTickables(notes3)];
    var voice4 =[
        new VF.Voice({num_beats:notes4.length,beat_value:notes4.length}).addTickables(notes4)];    
    var voice5 =[
        new VF.Voice({num_beats:notes5.length,beat_value:notes5.length}).addTickables(notes5)];
    var voice6 =[
        new VF.Voice({num_beats:notes6.length,beat_value:notes6.length}).addTickables(notes6)];
    var voice7 =[
        new VF.Voice({num_beats:notes7.length,beat_value:notes7.length}).addTickables(notes7)];
    var voice8 =[
        new VF.Voice({num_beats:notes8.length,beat_value:notes8.length}).addTickables(notes8)];    
    var formatter1=new VF.Formatter().joinVoices(voice1).format(voice1,250);
    var formatter2=new VF.Formatter().joinVoices(voice2).format(voice2,250);
    var formatter3=new VF.Formatter().joinVoices(voice3).format(voice3,250);
    var formatter4=new VF.Formatter().joinVoices(voice4).format(voice4,250);
    var formatter5=new VF.Formatter().joinVoices(voice5).format(voice5,250);
    var formatter6=new VF.Formatter().joinVoices(voice6).format(voice6,250);
    var formatter7=new VF.Formatter().joinVoices(voice7).format(voice7,250);
    var formatter8=new VF.Formatter().joinVoices(voice8).format(voice8,250);
    voice1.forEach(function(v){v.draw(context,stave1);})
    voice2.forEach(function(v){v.draw(context,stave2);})
    voice3.forEach(function(v){v.draw(context,stave3);})
    voice4.forEach(function(v){v.draw(context,stave4);})
    voice5.forEach(function(v){v.draw(context,stave5);})
    voice6.forEach(function(v){v.draw(context,stave6);})
    voice7.forEach(function(v){v.draw(context,stave7);})
    voice8.forEach(function(v){v.draw(context,stave8);})

}