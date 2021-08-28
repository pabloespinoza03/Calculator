let log = console.log;

//Creates the h2 that is going to hold the text inside the screen 
// this h2 is called display
var display =document.createElement("h2");
display.innerHTML="";

//Gets the screen from the HTML and apppends the display to it
var screen=document.querySelector("#screen");
screen.appendChild(display);

//selects the calculator 
var calculator =document.querySelector(".calculator");

var finalOperation="+";//here goes the final operation 

let result=false/* This is for when there is already 
					an answer on the screen and you want to type 
					a new expression so it stops showing the existing answer */


//adds an event of click to the calculator
calculator.addEventListener('click',function(event){

	if(event.target.className=="number"){
		/*
			shows the number that the user is currently writiing on the screen
			and adds this number to final operation as well,
		*/
		
		

		/**
		 * To do: if result is true (there is already an answer on screen)
		 * before starting to write the numbers on the display, delete the 
		 * existing answer
		 */

		if (result===true){
			display.innerHTML=event.target.innerText;
			finalOperation=finalOperation+event.target.innerText;
			result=false;
		}else{
			display.innerHTML=display.innerHTML+event.target.innerText;
		
			finalOperation=finalOperation+event.target.innerText;
		}
		console.log(finalOperation);
	}

	else if(event.target.className=="operator"){
		if (event.target.innerText=="="){
			/**
			 * When the user clicks on the equal button
			 * the display shows the answer which cames from a function
			 * result = true means that there is an answer on screen
			 */
			display.innerHTML=convertStringToOperation(finalOperation);
			finalOperation="+";
			result=true;
		}
		else if(event.target.innerText=="+"){
			/**
			 * Adds a "+" to the final operation and lets the user type the number
			 * to add
			 */
			finalOperation+="+";
			
			
			display.innerHTML="";
		}
		else if(event.target.innerText=="-"){
			/**
			 * Pretty much the same that with addition
			 */
			if (finalOperation==="+"){
				finalOperation="-";
				display.innerHTML="-";
			}else{
				finalOperation+="-";
			
				display.innerHTML="";
			}
			


		}
		else if (event.target.innerText=="÷"){
			/**
			 * Pretty much the same that with addition
			 */
			finalOperation+="/";

			display.innerHTML="";

		}
		else if(event.target.innerText=="x"){
			/**
			 * Pretty much the same that with addition
			 */
			finalOperation+="*";

			
			display.innerHTML="";
		}
	}
	else if(event.target.className=="c"){
		/**
		 * if the user clicks on the c button
		 * the final operations go back to start and 
		 * clears the display
		 */

		finalOperation="+";
		display.innerHTML="";
		
	}
	else if(event.target.className=="back"){
		/**
		 * If the user clicks the back button, it deletes the last number added to 
		 * the screen and the final operation
		 */
		if (display.innerHTML!=""){
			finalOperation=finalOperation.slice(0,-1);
			display.innerHTML=display.innerHTML.slice(0,-1);
		}
		

	}
});


/**
 * This is the main function of the calculator, the brain of the calculator
 */
function convertStringToOperation(string){
	
	let integer=0;//thi final result
	

	while (string.length>=1){
		/**
		 * a storages + or - 
		 * index_a storages the index at which that + or - was found
		 */
		let a;
		let index_a;

		/**
		 * b could storage a + or minus as well but since its only job its to
		 * tell if a pair was found to match a and solve inside the ++ +- -+ --
		 * it storages "pipi" if a pair was found
		 */
		let b;

		/**
		 * solve and storages what is inside the pair of ++ +- -+ --
		 * for example if the string was +3*99/4*22+8
		 * the first time in the loop it would storage 3*99/4*22
		 * and the second time it would storage 8
		 */
		let solveAnd;
		
		
		for (let x=0;x<string.length;x++){//Loops through each character of the string
			if (b==undefined){
				if(x===string.length-1&&b==undefined&&a!=undefined){
					//if it reached the end of the string: b= "Pipi", this does nothin but 
					//I kinda like it, since it didn't find a match for + or - the string should look like:
					//(+ or -)44*78/45/9*88/7*9
					
					solveAnd=string.slice(1);//so I want solveAnd to be the same string but without the + or -
					
				
					string='';//set the string to an empty string so the while doesn't run the next time
					
				}
				else if (a==undefined){
					//suppose string is +99*3-88/2
					//the first time a is going to be +, the second -
					//the first time index_a is going to be 0 and the second one 0 too (kinda useless index_a but...)
					if (string[x]=="+"){
						a="+";
						index_a=x;
					}
					else if(string[x]=="-"){
						a="-";
						index_a=x;
					}
				}
				else if(a!=undefined){
					//okay so we have that a is + and index_a is 0
					//let's find its match
					if (string[x]=="+"||string[x]=="-"){
						//if I find a match for the  + - 
						solveAnd=string.slice(1,x);//solve and is the string from the index 1; x characters to the right
						string=string.slice(x,string.length);//string now is the same string but without solveAnd
						
						b="pipi";
					}
				
					
				}
			}
			
			
			
			//Don't know if you noticed it but the first time a=a1 b=b1
			//the second time a1 does no longer exist in the string so a=b1 b=b2 
			// this goes forever until no match is find for a, so a=bn and b=undefined
		}			
		
		
		if (a=="+"){
			//if a=+ then solveInside solveAnd and add it to the integer
			integer+=solveInside(solveAnd);
		}
		else if(a=="-"){
			//if a=- then solveInside solveAnd and substract it to the integer
			
			integer-=solveInside(solveAnd);
		}
				
		};
	return integer;
}



/**
 * Solves the string solveAnd and returns the result
 * the string solveAnd looks like x*y/z*a*b/d/e...
 * it doesn't have + or - 
 */
var solveInside=function(solveAnd){
	
	let multiplications=[];
	
	
	for (let x =0;x<solveAnd.length;x++){
		if (solveAnd[x]=="*"||solveAnd[x]=="/"){
			let initial=solveAnd.slice(0,x);
			multiplications.push(Number(initial));
			solveAnd=solveAnd.slice(x,solveAnd.length);
			break;
		}
		else if(x==solveAnd.length-1){
			multiplications.push(Number(solveAnd));
			solveAnd="";
		}
	}
	
	while(solveAnd.length>1){


		let a;
		let b;
		let mult=false;
		let division=false;
		
		for (let i =0;i<solveAnd.length;i++){
			
			if (b==undefined){
				
					if (a==undefined){
						if (solveAnd[i]=="*"){
							mult=true;
							a=i;
						}
						else if(solveAnd[i]=="/"){
							division=true;
							a=i;
						}
					}
					else if (b==undefined&&a!=undefined){
						if (solveAnd[i]=="/"||solveAnd[i]=="*"){
							b=i;

						}
					}
			}
		
		}
		
		if (b!=undefined){
			if (mult==true){
				let trozo=solveAnd.slice(1,b);
				
				solveAnd=solveAnd.slice(b);
				multiplications.push(Number(trozo));
				mult=false;
			}
			else if(division==true){
				let trozo=solveAnd.slice(1,b);
			
				solveAnd=solveAnd.slice(b);
				let constant=1/Number(trozo);
				log(constant);	
				multiplications.push(constant);
				division=false;

			}
		}

		else if (b==undefined){
			if (mult==true){
				let trozo=solveAnd.slice(1);
			
				solveAnd="";
				multiplications.push(Number(trozo));
				mult=false;
			}
			else if(division==true){
				let trozo=solveAnd.slice(1);
				
				solveAnd="";
				let constant=1/Number(trozo);
				log(constant);
				multiplications.push(constant);
				division=false;

			}
		}
	};
	let result=1;
	log(multiplications,solveAnd);
	for (let nn of multiplications){
		result=result*nn;
		
	}
	return result;
}
