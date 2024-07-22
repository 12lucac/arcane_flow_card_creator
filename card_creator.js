const canvas =document.getElementById('card_canvas');

//default settings
let descriptionText= 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'

let flowStrength= 365;
let flowShield= 20;
let shardLevel= 4;
let colorTemplate= 'green';
let cardName= 'Dayspell wizard';
let descriptionPxSize= 20;
let cardBorderColor= 'rgba(46, 49, 94, 0.5)';
let cardMainFillColor= 'rgba(46, 49, 94, 1)';
let essenceFillColor= 'rgb(0,255,0)';
let essenceType= "cyclespell";
let drawStatsTrue= true;
let customImage,customDescriptionFrame,customStatsFrame,customShardImage, customType,customDescBackdrop;

//loading input
const nameInput= document.getElementById('nameInput');
const imageInput= document.getElementById('imageInput');
const flowAffinityInput= document.getElementById('flowAffinityInput');
const flowLevelInput= document.getElementById('flowLevelInput');
const flowStrengthInput= document.getElementById('flowStrengthInput');
const flowShieldInput= document.getElementById('flowShieldInput');
const flowEssenceType= document.getElementById('flowEssenceInput');
const descriptionPxInput= document.getElementById('descriptionPxInput');
const descriptionInput= document.getElementById('descriptionInput');
const cardTypeInput= document.getElementById('cardTypeInput');




function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  let words = text.split(' ');
  let line = '';

  for(let n = 0; n < words.length; n++) {
      let testLine = line + words[n] + ' ';
      let metrics = ctx.measureText(testLine);
      let testWidth = metrics.width;
      
      if (testWidth > maxWidth && line !== '') {
          ctx.fillText(line, x, y);
          line = words[n] + ' ';
          y += lineHeight;
      } else {
          line = testLine;
      }
  }

  ctx.fillText(line, x, y);
}

function drawStats(ctx){
  let flowStrengthToText=`${flowStrength} strength`;
  let flowShieldToText=`${flowShield}  shield`;

  ctx.font = "35px Orbitron";
  ctx.fillStyle= 'orange'; 

  //half space is 375 each

  const strengthTextLength=ctx.measureText(flowStrengthToText)
  ctx.fillText(flowStrengthToText,375/2-strengthTextLength.width/2,950); //avaible space from 190 till 750
  
  ctx.fillStyle= 'cyan'; 
  const shieldTextLength=ctx.measureText(flowShieldToText)
  ctx.fillText(flowShieldToText,750/2+shieldTextLength.width/2,950); //avaible space from 190 till 750
}

function essenceRendering(ctx){
  ctx.font = "30px Orbitron";
  ctx.fillStyle =cardMainFillColor;
  const textWidth= ctx.measureText(essenceType).width;
  const cardWidth=750;
  ctx.beginPath();
  ctx.roundRect(cardWidth-50-textWidth, 20, textWidth+30, 50, 5); //end at 190  h=160-50
  ctx.fill();

  ctx.fillStyle= essenceFillColor;
  ctx.textBaseline = 'middle';
  
  ctx.fillText(essenceType,cardWidth-40-textWidth,45);
  ctx.textBaseline ='alphabetic';
  
}

function nameCardRendering(ctx){
  //card name text drawing
  ctx.fillStyle= `${colorTemplate}`;
  ctx.font = "50px Orbitron";
  ctx.lineWidth = 3;
  ctx.textBaseline='middle';
  ctx.textAlign='center';
  ctx.strokeText(cardName,375,120) //name border

  ctx.fillText(cardName,375,120); //avaible space from 190 till 750
  ctx.textBaseline='alphabetic';
  ctx.textAlign='start';
}


//second iteration
function shardLevelRender(ctx,shardImage){
  //background flow level background
  ctx.beginPath();
  flowLevelBackgroundH=90;
  const flowBackgroundDistanceTop=525-45;
  ctx.fillStyle = cardMainFillColor;;
  ctx.roundRect(-10, flowBackgroundDistanceTop, 200, flowLevelBackgroundH, 20); //end at 190  h=160-50
  ctx.fill();
  const hBackgroundCenter=flowBackgroundDistanceTop+flowLevelBackgroundH/2;


  //draw shardImage
  shardImage.onload=()=>{
    console.log('ciao');
    const shardImageTop= hBackgroundCenter-shardImage.naturalHeight/22; //find the position of the hbackground center and remove halp of the heigth
    ctx.drawImage(shardImage, 20, shardImageTop, shardImage.naturalWidth/11, shardImage.naturalHeight/11);
    ctx.filter = 'none';
  }

  shardImage.src= customShardImage?customShardImage: './shards/green_shard.png';

  //shard level
  ctx.font = "65px Orbitron";
  ctx.lineWidth = 2;
  ctx.fillStyle= `${colorTemplate}`;
  ctx.strokeText(shardLevel,110,hBackgroundCenter+25)//shard border 
  ctx.fillText(shardLevel,110,hBackgroundCenter+25); 


}
function createCard(){
  const ctx = canvas.getContext("2d");
  const img = new Image();

  img.onload = () => {
    //creating secondary elements
    const shardImage= new Image();
    const corniceImage= new Image();
    const descBackdropImage= new Image();
    const corniceStatsImage= new Image();

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    
    // Draw the card border rectangle
    ctx.strokeStyle =  cardBorderColor;
    ctx.fillStyle = cardMainFillColor;;
    ctx.lineWidth = 50; // Border thickness
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    //gener text border color
    ctx.strokeStyle= "rgba(255, 255, 255, 1)";
    
    //render shardLevel


    //render card name
    nameCardRendering(ctx);

    //archetype rendering
    essenceRendering(ctx)


    descBackdropImage.onload=()=>{
        //ctx.globalCompositeOperation = 'screen';
        ctx.drawImage(descBackdropImage, 0 ,525, 750,475);
        //ctx.globalCompositeOperation = 'source-over';

        if(drawStatsTrue)drawStats(ctx);

        //draw text
        ctx.font =` ${descriptionPxSize}px Orbitron`;
        ctx.fillStyle= 'white'; 
        wrapText(ctx,descriptionText,20,725,720,30)
        
        corniceImage.onload=()=>{
          xPos=750/2-corniceImage.naturalWidth/2
          yPos=600-corniceImage.naturalHeight/2
          ctx.drawImage(corniceImage, xPos , yPos, corniceImage.naturalWidth, corniceImage.naturalHeight)
          shardLevelRender(ctx,shardImage)
        }

        corniceStatsImage.onload=()=>{
          xPos=750/2-corniceStatsImage.naturalWidth/2
          yPos=1000-corniceStatsImage.naturalHeight
          ctx.drawImage(corniceStatsImage, xPos , yPos, corniceStatsImage.naturalWidth, corniceStatsImage.naturalHeight)
        }
    

        corniceImage.src= customDescriptionFrame? customDescriptionFrame: './description_frames/cornice_card_green.png';
        corniceStatsImage.src= customStatsFrame?customStatsFrame:'./stats_frames/card_stats_green.png';

    }
    
    //charging secondary element
    descBackdropImage.src= customDescBackdrop?customDescBackdrop:'./description_background/description_background_creature.png';

  };
  //charging image
  img.src=customImage? customImage:'./default_image.jpg';

}

createCard()

nameInput.oninput= e=>{
  cardName=e.target.value;
  createCard()
}

imageInput.onchange= e=>{
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      customImage= e.target.result;
      createCard()
    };
    reader.readAsDataURL(file);
  }
}

flowAffinityInput.onchange= e=>{
  const selected= e.target.value;
  switch (selected){
    case 'power':
      colorTemplate="orange";
      essenceFillColor="orange";
      customDescriptionFrame="./description_frames/cornice_card_orange.png";
      customShardImage="./shards/orange_shard.png";
      customStatsFrame="./stats_frames/card_stats_orange.png";
      createCard()
      break;
    case 'shield':
      //colorTemplate="cyan";
      colorTemplate="rgb(15, 189, 189)";
      essenceFillColor="cyan";
      customDescriptionFrame="./description_frames/cornice_card_cyan.png";
      customShardImage="./shards/cyan_shard.png";
      customStatsFrame="./stats_frames/card_stats_cyan.png";
      createCard()
      break;
    case 'effect':
      colorTemplate="green";
      essenceFillColor="rgb(0,255,0)";
      customDescriptionFrame="./description_frames/cornice_card_green.png";
      customShardImage="./shards/green_shard.png";
      customStatsFrame="./stats_frames/card_stats_green.png";
      createCard()
      break;
    case 'ascended':
      colorTemplate="purple";
      essenceFillColor="purple";
      customDescriptionFrame="./description_frames/cornice_card_ascended.png";
      customShardImage="./shards/ascended_shard.png";
      customStatsFrame="./stats_frames/card_stats_ascended.png";
      createCard()
      break;
  }
}
cardTypeInput.onchange= e=>{
  const selected= e.target.value;
  switch (selected){
    case 'creature':
      cardBorderColor= 'rgba(46, 49, 94, 0.5)';
      cardMainFillColor= 'rgba(46, 49, 94, 1)';
      customDescBackdrop= "./description_background/description_background_creature.png"
      drawStatsTrue=true;
      createCard();
      break;
    case 'flow':
      cardBorderColor= 'rgba(0, 255, 255, 0.2)';
      cardMainFillColor= 'rgba(0, 155, 155, 1)';
      customDescBackdrop= "./description_background/description_background_cyan.png"
      drawStatsTrue=false;
      createCard();
      break;
    case 'array':
      cardBorderColor= 'rgba(255, 165, 0,0.3)';
      //cardMainFillColor= 'rgba(255, 222, 102, 1)';
      cardMainFillColor= '#ab533d';
      customDescBackdrop= "./description_background/description_background_orange.png"
      drawStatsTrue=false;
      createCard();
      break;
  }
}

flowEssenceType.onchange=e=>{
  essenceType= e.target.value;
  createCard();
}

flowLevelInput.oninput= e=>{
  shardLevel=e.target.value;
  createCard();
}

flowStrengthInput.oninput= e=>{
  flowStrength=e.target.value;
  createCard();
}

flowShieldInput.oninput= e=>{
  flowShield=e.target.value;
  createCard();
}

descriptionPxInput.oninput= e=>{
  descriptionPxSize=e.target.value;
  createCard();
}

descriptionPxInput.oninput= e=>{
  descriptionPxSize=e.target.value;
  createCard();
}

descriptionInput.oninput= e=>{
  console.log(e.target.value);
  descriptionText=e.target.value;
  createCard();
}
