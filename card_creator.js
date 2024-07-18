const canvas =document.getElementById('card_canvas');

//default settings
let descriptionText= 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'

let flowStrength= 365;
let flowShield= 20;
let shardLevel= 4;
let colorTemplate= 'green';
let cardName= 'Dayspell wizard';
let descriptionPxSize= 20;
let customImage,customDescriptionFrame,customStatsFrame,customShardImage, customType;

//loading input
const nameInput= document.getElementById('nameInput');
const imageInput= document.getElementById('imageInput');
const flowTypeInput= document.getElementById('flowTypeInput');
const flowLevelInput= document.getElementById('flowLevelInput');
const flowStrengthInput= document.getElementById('flowStrengthInput');
const flowShieldInput= document.getElementById('flowShieldInput');
const flowArcheType= document.getElementById('flowArcheTypeInput');
const descriptionPxInput= document.getElementById('descriptionPxInput');
const descriptionInput= document.getElementById('descriptionInput');




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
  console
  ctx.fillText(flowStrengthToText,375/2-strengthTextLength.width/2,950); //avaible space from 190 till 750
  
  ctx.fillStyle= 'cyan'; 
  const shieldTextLength=ctx.measureText(flowShieldToText)
  ctx.fillText(flowShieldToText,750/2+shieldTextLength.width/2,950); //avaible space from 190 till 750
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

    let defaultColor= 'rgba(46, 49, 94, 0.5)';
    
    // Draw a red rectangle
    ctx.strokeStyle =  defaultColor;
    ctx.fillStyle = 'rgba(46, 49, 94,  1)';;
    ctx.lineWidth = 50; // Border thickness

    // Draw the border
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    
    //draw top-left rectangle with the flow level
    ctx.beginPath();
    ctx.roundRect(-10, -10, 200, 200, 20); //end at 190 
    ctx.fill();

    //draw shard level and the card name

    ctx.font = "78px Orbitron";
    ctx.fillStyle= `${colorTemplate}`; 
    ctx.fillText(shardLevel,110,155);
    
    ctx.font = "50px Orbitron";
    ctx.lineWidth = 5;
    ctx.strokeStyle= "rgba(255, 255, 255, 0.8)";
    ctx.strokeText(cardName,200,120)

    ctx.fillText(cardName,200,120); //avaible space from 190 till 750
    //ctx.fillText(cardName,200,120); //avaible space from 190 till 750
    

    //draw shardImage
    shardImage.onload=()=>{
        //ctx.filter = 'hue-rotate(180deg)';
        ctx.drawImage(shardImage, 30, 20, shardImage.naturalWidth/8, shardImage.naturalHeight/8);
        ctx.filter = 'none';
    }

    descBackdropImage.onload=()=>{
        //ctx.globalCompositeOperation = 'screen';
        ctx.drawImage(descBackdropImage, 0 ,525, 750,475);
        //ctx.globalCompositeOperation = 'source-over';

        drawStats(ctx)

        //draw text
        ctx.font =` ${descriptionPxSize}px Orbitron`;
        ctx.fillStyle= 'white'; 
        wrapText(ctx,descriptionText,20,725,720,30)

        
    }
    
    corniceImage.onload=()=>{
        xPos=750/2-corniceImage.naturalWidth/2
        yPos=600-corniceImage.naturalHeight/2
        ctx.drawImage(corniceImage, xPos , yPos, corniceImage.naturalWidth, corniceImage.naturalHeight)
    }
    corniceStatsImage.onload=()=>{
        xPos=750/2-corniceStatsImage.naturalWidth/2
        yPos=1000-corniceStatsImage.naturalHeight
        ctx.drawImage(corniceStatsImage, xPos , yPos, corniceStatsImage.naturalWidth, corniceStatsImage.naturalHeight)
    }

    //charging secondary element
    descBackdropImage.src='./description_background.png';
    corniceStatsImage.src= customStatsFrame?customStatsFrame:'./stats_frames/card_stats_green.png';
    shardImage.src= customShardImage?customShardImage: './shards/green_shard.png';
    corniceImage.src= customDescriptionFrame? customDescriptionFrame: './description_frames/cornice_card_green.png';

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

flowTypeInput.onchange= e=>{
  const selected= e.target.value;
  switch (selected){
    case 'power':
      colorTemplate="orange";
      customDescriptionFrame="./description_frames/cornice_card_orange.png";
      customShardImage="./shards/orange_shard.png";
      customStatsFrame="./stats_frames/card_stats_orange.png";
      createCard()
      break;
    case 'shield':
      colorTemplate="cyan"
      customDescriptionFrame="./description_frames/cornice_card_cyan.png";
      customShardImage="./shards/cyan_shard.png";
      customStatsFrame="./stats_frames/card_stats_cyan.png";
      createCard()
      break;
    case 'effect':
      colorTemplate="green"
      customDescriptionFrame="./description_frames/cornice_card_green.png";
      customShardImage="./shards/green_shard.png";
      customStatsFrame="./stats_frames/card_stats_green.png";
      createCard()
      break;
    case 'ascended':
      colorTemplate="purple"
      customDescriptionFrame="./description_frames/cornice_card_ascended.png";
      customShardImage="./shards/ascended_shard.png";
      customStatsFrame="./stats_frames/card_stats_ascended.png";
      createCard()
      break;
  }
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