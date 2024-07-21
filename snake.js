let inputDirection={ x:0, y:0 };
let food={ x: Math.round( 1+(25-1)*Math.random()) ,  y: Math.round( 1+(21-1)*Math.random())};
let snakeArray=[ {x:18 ,y:15}];
let speed =5+snakeArray.length;
let myScore=document.querySelector('#myScore');
let hiScore=document.querySelector('#hiScore');
let upBtn =document.querySelector('#slideUP');
let downBtn =document.querySelector('#slideDown');
let leftBtn =document.querySelector('#slideLeft');
let rightBtn =document.querySelector('#slideRight');
let containerBox=document.querySelectorAll('.container');
let touchTrack =document.querySelector('#touchTrack');





const BackgroundMusic=new Audio('BackgroundMusic.mpeg');
// const startGame=new Audio('startGame.acc');
const foodEat=new Audio('foodEat.aac');
const DirectionChange=new Audio('DirectionChange.aac');
const gameOver=new Audio('gameOver.aac');

//chages in the position of food for resposieness on mobile.
// console.log('yes',window.innerWidth);
if(window.innerWidth <=600)
    {
        
        // alert('yes');
        snakeArray=[ {x:8 ,y:15}];
        let food={ x: Math.round( 1+(15-1)*Math.random()) ,  y: Math.round( 1+(21-1)*Math.random())};
    }
let lastPaintTime=0;
let snakeElement;
let snakeHead,snakeFood;
let startBtn = document.querySelector('#startBtn');
let snakeZone=document.querySelector('#snakeZone');
let startX,startY,DistX,DistY,touch;
let i=0,score=0,highScore;

myScore.innerHTML="myScore : 0";
if(localStorage.getItem('highScore')== null)
    {
        
        localStorage.setItem('highScore','0');
        highScore=0;

    }

    else{
        highScore=localStorage.getItem('highScore');
        hiScore.innerHTML="hiScore : "+highScore;
    }

function checkCollision(snakeArray){

    for(i=1;i<snakeArray.length;i++)
        {
            if( (snakeArray[0].x == snakeArray[i].x) && ( snakeArray[0].y ==  snakeArray[i].y))
                {
                   
                    return true;
                }

        }
        if(window.innerWidth <=600)
            {
                if( snakeArray[0].x<= 0 ||   snakeArray[0].x >= 17 ||snakeArray[0].y <= 0 ||snakeArray[0].y >= 22)
                    {
                                // console.log( "x = ",snakeArray[0].x,"y = ",snakeArray[0].y);         
                        return true;
                    }
    
                    else{
                        return false;
                    }
           
            }
            else
            {
                // console.log( "x = ",snakeArray[0].x,"y = ",snakeArray[0].y);       
                if( snakeArray[0].x<=0 ||   snakeArray[0].x >= 26 ||snakeArray[0].y <= 0 ||snakeArray[0].y >= 22)
           
                    {
                                      
                        return true;
                    }
    
                    else{
                        return false;
                    }
            }
          
        
}







startBtn.addEventListener('click',(e)=>{
    
    window.requestAnimationFrame(working);
    // startGame.play();

});

document.addEventListener('keydown',(e)=>{
   window.requestAnimationFrame(working);
//    startGame.play();

});





document.addEventListener('keydown',(event)=>{
    //  console.log(event.key);
     
    switch (event.key)
    {
        case 'ArrowUp':{
            inputDirection={ x:0, y:-1 };
            if(touchTrack.innerHTML != 'Drag Up')
            {
          ( lastPaintTime) =((lastPaintTime)/1000)-(1);
           DirectionChange.play();
           touchTrack.innerHTML="Drag Up";
           window.requestAnimationFrame(working);
            }
            break;
        }



        case 'ArrowDown':{
            inputDirection={ x:0, y:1 };
            if(touchTrack.innerHTML != 'Drag Down')
                {
            ( lastPaintTime) =((lastPaintTime)/1000)-(1);
            touchTrack.innerHTML="Drag Down";
            DirectionChange.play();  
            window.requestAnimationFrame(working);
                }
            break;
        }


        case 'ArrowLeft':{
            inputDirection={ x:-1, y:0 };
            if(touchTrack.innerHTML != 'Drag Left')
                {
            ( lastPaintTime) =((lastPaintTime)/1000)-(1);
            touchTrack.innerHTML="Drag Left";
            DirectionChange.play();            
            window.requestAnimationFrame(working);
                }
        break;
        }

        case 'ArrowRight':
            {
                inputDirection={ x:1, y:0 };
                if(touchTrack.innerHTML != 'Drag Right')
                    {
                ( lastPaintTime) =((lastPaintTime)/1000)-(1);
                touchTrack.innerHTML="Drag Right";
                DirectionChange.play();
                window.requestAnimationFrame(working);
                    }
                break;
            }
    }
});




upBtn.addEventListener('click',()=>{
    inputDirection={ x:0, y:-1 };
    ( lastPaintTime) =((lastPaintTime)/1000)-(1);
    
    DirectionChange.play();
    window.requestAnimationFrame(working);
 
});

downBtn.addEventListener('click',()=>{
    inputDirection={ x:0, y:1 };
    ( lastPaintTime) =((lastPaintTime)/1000)-(1);
    DirectionChange.play();
    window.requestAnimationFrame(working);  

});

leftBtn.addEventListener('click',()=>{
    inputDirection={ x:-1, y:0 };
    (lastPaintTime) =((lastPaintTime)/1000)-1;
    DirectionChange.play();
    window.requestAnimationFrame(working);
 

});


rightBtn.addEventListener('click',()=>{
    inputDirection={ x:1, y:0 };
    (lastPaintTime) =((lastPaintTime)/1000)-(1);
    DirectionChange.play();
    window.requestAnimationFrame(working);
   

});


    document.addEventListener('touchstart',(e)=>{
    // alert("Touch start");
    e.preventDefault();
    touch=e.touches[0];
    startX=touch.clientX;
    startY=touch.clientY;




})


document.addEventListener('touchmove',(e)=>{
    // alert("Touch Move");
    touch=e.touches[0];
    e.preventDefault();
    DistX=startX-touch.clientX;
    DistY=startY-touch.clientY;

    if(Math.abs(DistX)> Math.abs(DistY))
        {
            if(DistX>0)
                {
                    // console.log("drag Right");
                    inputDirection={ x:-1, y:0 };
                   
                    if(touchTrack.innerHTML != 'Drag Left')
                        {
                            
                            DirectionChange.play();
                            touchTrack.innerHTML = 'Drag Left';
                        (lastPaintTime) =((lastPaintTime)/1000)-1;
                        window.requestAnimationFrame(working);
                      
                        }
                }
    
               else
                    {
                        // console.log("drag Left");
                        inputDirection={ x:1, y:0 };
                     
                        if(touchTrack.innerHTML != 'Drag Right')
                            {
                                
                                DirectionChange.play();
                                touchTrack.innerHTML='Drag Right';
                                (lastPaintTime) =((lastPaintTime)/1000)-1;
                            window.requestAnimationFrame(working);
                           
                            }
                    }
    
        }
    
    
        else {
            if(DistY>0)
                {
                    // console.log("drag Up");
                    inputDirection={ x:0, y:-1 };
                    
                    if(touchTrack.innerHTML != 'Drag Up')
                        {
                            
                            DirectionChange.play();
                            touchTrack.innerHTML='Drag Up';
                         (lastPaintTime) =((lastPaintTime)/1000)-1;
                        window.requestAnimationFrame(working);
                        
                        }
                }
    
               else
                    {
                        // console.log("drag Down");
                        inputDirection={ x:0, y:1 };
                       
                        if(touchTrack.innerHTML != 'Drag Down')
                            {
                                
                                DirectionChange.play();
                                touchTrack.innerHTML='Drag Down';
                            (lastPaintTime) =((lastPaintTime)/1000)-1;
                            window.requestAnimationFrame(working);
                          
                            }

                      
                    }
            
    
    
    
        }


        // (lastPaintTime) =((lastPaintTime)/1000)-1;
        // window.requestAnimationFrame(working);
    
    
    


})


// document.addEventListener('touchend',(e)=>{
//     // alert("Touch End");
//     e.preventDefault();
   
// //   if(Math.abs(DistX)> Math.abs(DistY))
// //     {
// //         if(DistX>0)
// //             {
// //                 // console.log("drag Right");
// //                 inputDirection={ x:-1, y:0 };
// //                 DirectionChange.play();
// //                 touchTrack.innerHTML="Drag Left";
// //             }

// //            else
// //                 {
// //                     // console.log("drag Left");
// //                     inputDirection={ x:1, y:0 };
// //                     DirectionChange.play();
// //                     touchTrack.innerHTML="Drag Right";
// //                 }

// //     }


// //     else {
// //         if(DistY>0)
// //             {
// //                 // console.log("drag Up");
// //                 inputDirection={ x:0, y:-1 };
// //                 DirectionChange.play();
// //                 touchTrack.innerHTML="Drag Up";
// //             }

// //            else
// //                 {
// //                     // console.log("drag Down");
// //                     inputDirection={ x:0, y:1 };
// //                     DirectionChange.play();
// //                     touchTrack.innerHTML="Drag  Down";
// //                 }
        



// //     }
//     (lastPaintTime) =((lastPaintTime)/1000)-1;
//     window.requestAnimationFrame(working);


// })
















// 

// snake working function.

function working(ctime){

    window.requestAnimationFrame(working);
   if((ctime-lastPaintTime)/1000<(1/speed))
    {
        return;
    }

   
    lastPaintTime=ctime;
   
    snakeZone.innerHTML=""; 
    hiScore.innerHTML="hiScore : "+highScore;
    BackgroundMusic.play();
   


      //display the food.
      snakeFood=document.createElement('div');
      snakeFood.style.gridRowStart= food.y;
      snakeFood.style.gridColumnStart=food.x;
      snakeZone.appendChild(snakeFood);
      snakeFood.classList.add('food');


 
//motion of head of snake.




       
//motion of body of snake
   
            for(i=0;i<snakeArray.length;i++)
            {
            
               if(i==0)
                {
                    snakeHead=document.createElement('div');
                    snakeHead.style.gridRowStart=snakeArray[i].y;
                    snakeHead.style.gridColumnStart=snakeArray[i].x;
                    snakeZone.appendChild(snakeHead);
                    snakeHead.classList.add('snakeHead');
                    
                }
                else{
                    snakeElement=document.createElement('div');
                    snakeElement.style.gridRowStart=snakeArray[i].y;
                    snakeElement.style.gridColumnStart=snakeArray[i].x;
                    snakeZone.appendChild(snakeElement);
                    snakeElement.classList.add('snakeBody');
                }
              
        
            }
   
      
         
         if(checkCollision(snakeArray))
            {
    
                if(window.innerWidth <=600)
                    {
                        snakeArray=[ {x:10 ,y:15}];
                        food={ x: Math.round( 1+(15-1)*Math.random()) ,  y: Math.round( 1+(20-1)*Math.random())};
                    }
                    else{
                       
                          snakeArray=[ {x:18 ,y:15}];
                          food={ x: Math.round( 1+(24-1)*Math.random()) ,  y: Math.round( 1+(20-1)*Math.random())};
                           
                    }
           
                inputDirection={x:0,y:0};
                speed =5+snakeArray.length;
                BackgroundMusic.pause();
                gameOver.play();
                score=0;
                localStorage.setItem('highScore',highScore);
                myScore.innerHTML="myScore : 0";
                alert("game over");
               
            }


      

       


// Eating the food  .....displaying the next food ....increase snake body size


     

    if(food.x== snakeArray[0].x && food.y==  snakeArray[0].y  )
        {
            // console.log("Eaten food yummy");
            snakeArray.push({x:food.x ,y:food.y});
            // console.log(snakeArray);
            if( window.innerWidth<=600)
                {
                    food.x= Math.round( 1+(15-1)*Math.random()) ;
                }
                else{
                    food.x= Math.round( 1+(24-1)*Math.random()) ;
                }
           
            food.y= Math.round( 2+(20-2)*Math.random());
            speed =5+(snakeArray.length)/3;
                score++;
                myScore.innerHTML="myScore : "+score;
                if(score >= highScore)
                    {
                        
                        console.log("yes");
                        highScore=score;
                        // alert('working');
                    }
            foodEat.play();
            }

          

           
    
                    for(i=snakeArray.length-2;i>=0;i--)
                        {
                            snakeArray[i+1].x=snakeArray[i].x;
                            snakeArray[i+1].y=snakeArray[i].y;
                            // snakeArray[i+1]={...snakeArray[i]};
                          
                
                        }
                        snakeArray[0].x+=inputDirection.x;
                        snakeArray[0].y+=inputDirection.y;  

                 


        }


//to start the game
