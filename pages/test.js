import React, {useState} from 'react';
import Select from 'react-select'
import styled from "styled-components";

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]
  const DropDownContainer = styled("div")`
  display: inline;
    float: left;
    width: 250px;
    margin-left: 20px;
`;

const RadioButton = styled("div")`
                    display: flex;
                        `;
var  ObjectOptions=[];
var timeTakenTotalValue=[];
export async function getStaticProps(context) {
    // fetch the planets data from the  API
    const res = await fetch('https://findfalcone.herokuapp.com/planets');
    const data = await res.json();
    
   // fetch the vehicles from the  API
   const vehiclesRes = await fetch('https://findfalcone.herokuapp.com/vehicles');
   const vehiclesData = await vehiclesRes.json();
    
   
         // fetch the token from API
  
    
    const response = await fetch('https://findfalcone.herokuapp.com/token', {
        method: 'POST',
        body: '',
        headers: {
          'Accept': 'application/json'
        }
      })
      const tokenValue = await response.json();
    console.log('tokenValue==',tokenValue)   
    return {
        props: { data,vehiclesData,tokenValue } // props will be passed to the page
    };    
  }
const test = ({data,vehiclesData,tokenValue }) => {

    const [timeTaken, setTimeTaken] = useState(0);
    const [timeTakenRoute, setTimeTakenRoute] = useState([]);
    const [showOutput, setShowOutput] = useState(false);
    const [planetResult,setPlanetResult] = useState({});
    const [destination1Dd,setDestination1Dd] = useState({});
    const [destination2Dd,setDestination2Dd] = useState({});
    const [destination3Dd,setDestination3Dd] = useState({});
    const [destination4Dd,setDestination4Dd] = useState({});
    const [destination1Planet, setDestination1Planet] = useState('');
    const isValidD1Planet = destination1Planet != null && destination1Planet.trim().length > 0;
    const [destination2Planet, setDestination2Planet] = useState('');
    const isValidD2Planet = destination2Planet != null && destination2Planet.trim().length > 0;
    const [destination3Planet, setDestination3Planet] = useState('');
    const isValidD3Planet = destination3Planet != null && destination3Planet.trim().length > 0;
    const [destination4Planet, setDestination4Planet] = useState('');
    const isValidD4Planet = destination4Planet != null && destination4Planet.trim().length > 0;

    const [destination1Vehicle, setDestination1Vehicle] = useState('');
    const isValidD1Vehicle = destination1Vehicle != null && destination1Vehicle.trim().length > 0;
    const [destination2Vehicle, setDestination2Vehicle] = useState('');
    const isValidD2Vehicle = destination2Vehicle != null && destination2Vehicle.trim().length > 0;
    const [destination3Vehicle, setDestination3Vehicle] = useState('');
    const isValidD3Vehicle = destination3Vehicle != null && destination3Vehicle.trim().length > 0;
    const [destination4Vehicle, setDestination4Vehicle] = useState('');
    const isValidD4Vehicle = destination4Vehicle != null && destination4Vehicle.trim().length > 0;
    
        // setvehicleObj(vehiclesData);
const radioButtonClick =(e,currentObj,vehicleCat) =>{
var calculateTime ='';
        if(vehicleCat=='destination1Vehicle'){
            setDestination1Vehicle(e.currentTarget.value);
             calculateTime= data.filter((currElement)=>{
               if(currElement.name===destination1Planet){
                timeTakenTotalValue[vehicleCat]=currElement.distance/currentObj.speed;
                   return {"name":currElement.name,"timeTaken":currElement.distance/currentObj.speed};
               }
            })
            
           
           
        }
        if(vehicleCat=='destination2Vehicle'){
            setDestination2Vehicle(e.currentTarget.value);
             calculateTime= data.filter((currElement)=>{
                if(currElement.name==destination2Planet){
                    timeTakenTotalValue[vehicleCat]=currElement.distance/currentObj.speed;
                   
                    return {"name":currElement.name,"timeTaken":currElement.distance/currentObj.speed};
                }
             })
           
        }
        if(vehicleCat=='destination3Vehicle'){
            setDestination3Vehicle(e.currentTarget.value);
             calculateTime= data.filter((currElement)=>{
                if(currElement.name==destination3Planet){
                    timeTakenTotalValue[vehicleCat]=currElement.distance/currentObj.speed;
                   
                    return {"name":currElement.name,"timeTaken":currElement.distance/currentObj.speed};
                }
             })
            
        }
        if(vehicleCat=='destination4Vehicle'){
            setDestination4Vehicle(e.currentTarget.value);
             calculateTime= data.filter((currElement)=>{
                if(currElement.name==destination4Planet){
                    timeTakenTotalValue[vehicleCat]=currElement.distance/currentObj.speed;
                    return {"name":currElement.name,"timeTaken":currElement.distance/currentObj.speed};
                }
             })
            
        }
        var timeTaken =0;
        Object.keys(timeTakenTotalValue).forEach(key => {
            timeTaken=timeTaken+timeTakenTotalValue[key];
          });
        setTimeTaken(timeTaken);
}

const selectDestination =(e,planetCat) =>{
        if(planetCat=='destination1Planet'){
            setDestination1Planet(e.value);
           let destination2Arr= ObjectOptions.filter((currElement)=>{
               if(currElement.value!==e.value){
                return { value: currElement.name, label: currElement.name }
               }
           })
           setDestination2Dd(destination2Arr);
        }
        if(planetCat=='destination2Planet'){
            setDestination2Planet(e.value);
            let destination3Arr= destination2Dd.filter((currElement)=>{
                if(currElement.value!==e.value){
                 return { value: currElement.name, label: currElement.name }
                }
            })
            setDestination3Dd(destination3Arr);
        }
        if(planetCat=='destination3Planet'){
            setDestination3Planet(e.value);
            let destination4Arr= destination3Dd.filter((currElement)=>{
                if(currElement.value!==e.value){
                 return { value: currElement.name, label: currElement.name }
                }
            })
            setDestination4Dd(destination4Arr);
        }
        if(planetCat=='destination4Planet'){
            setDestination4Planet(e.value);
        }
}

    const searchCallAPI = async () => {
		try {
			const res = await fetch(
				`https://findfalcone.herokuapp.com/find`,{
                    method: 'POST',
                    body: JSON.stringify({
                        "token":tokenValue.token,
                        "planet_names":[destination1Planet,destination2Planet,destination3Planet,destination4Planet],
                        "vehicle_names":[destination1Vehicle,destination2Vehicle,destination3Vehicle,destination4Vehicle]
                        }),
                    headers: {
                      'Accept': 'application/json'
                    }
                  }
			);
            setShowOutput(true);
			setPlanetResult(await res.json());
		} catch (err) {
			console.log(err);
		}
	};

     ObjectOptions= data.map(function(key, index) {
       return { value: key.name, label: key.name }
      });
      

      function refreshPage() {
        window.location.reload(false);
      }
    return (<>
    <div>
    {!showOutput ? (
        <div style={{width:"100%"}}>
            <h1 className="falcone">Finding Falcon!</h1>
           <div className='dropDownBox'>
           Destination1
           <Select options={ObjectOptions} onChange={(e) => selectDestination(e,"destination1Planet")}/>
           <div>
           {vehiclesData.map((currentObj,i) => (
                <div className='radioButton' key={i}><input type="radio" value={currentObj.name} name="destination1Vehicle" onChange={(e) =>radioButtonClick(e, currentObj, "destination1Vehicle")}/> {currentObj.name}({currentObj.total_no})</div>
                ))}
            </div>
           </div>
           <div className='dropDownBox'>
           Destination2
           <Select options={destination2Dd} onChange={(e) => selectDestination(e,"destination2Planet")}/>
           <div>
           {vehiclesData.map((currentObj,i) => (
                <div className='radioButton' key={i}><input type="radio" value={currentObj.name} name="destination2Vehicle" onChange={(e) => radioButtonClick(e, currentObj, "destination2Vehicle")}/> {currentObj.name}({currentObj.total_no})</div>
                ))}
            </div>
           </div>
           <div className='dropDownBox'>
           Destination3
           <Select options={destination3Dd} onChange={(e) => selectDestination(e,"destination3Planet")}/>
           <div>
           {vehiclesData.map((currentObj,i) => (
                <div className='radioButton' key={i}><input type="radio" value={currentObj.name} name="destination3Vehicle" onChange={(e) => radioButtonClick(e, currentObj, "destination3Vehicle")}/> {currentObj.name}({currentObj.total_no})</div>
                ))}
            </div>
           </div>
           <div className='dropDownBox'>
           Destination4
           <Select options={destination4Dd} onChange={(e) => selectDestination(e,"destination4Planet")} />
           <div>
           {vehiclesData.map((currentObj,i) => (
                <div className='radioButton' key={i}><input type="radio" value={currentObj.name} name="destination4Vehicle"  onChange={(e) => radioButtonClick(e, currentObj, "destination4Vehicle")}/> {currentObj.name}({currentObj.total_no})</div>
                ))}

                
            </div>
           </div>
         
           <div style={{position:'relative',marginLeft:'160px',top:'160px'}}>
        <div style={{textAlign:'right',marginRight:'100px'}}>Time Taken: {timeTaken}</div>
        <div>  <button onClick={searchCallAPI} disabled={!(isValidD1Planet && isValidD2Planet && isValidD3Planet && isValidD4Planet && isValidD1Vehicle && isValidD2Vehicle && isValidD3Vehicle && isValidD4Vehicle)}>Find Falcone</button></div>
        </div>
            
       
       
        </div>
    ):(
        <div>
            <h1 className="falcone">Finding Falcon!</h1>
            <div style={{fontSize:'20px', textAlign:'center'}}>
            <div>Suceess! Congratulation on Finding Falcon. King Shan is mighty pleased.</div>
            <div>Time Taken: {timeTaken}</div>
            <div>Planet found: {planetResult.status!=="false"?planetResult.planet_name:'Not Found'}</div>
            <div><button onClick={refreshPage}> Start Again</button></div>
            </div>
        </div>
    )
}
        </div>
        </>
    );
};

export default test;