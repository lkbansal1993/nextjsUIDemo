import React, {useState} from 'react';
import Select from 'react-select'
import styled from "styled-components";


  const DropDownContainer = styled("div")`
  display: inline;
    float: left;
    width: 250px;
    margin-left: 20px;
`;

const RadioButton = styled("div")`
                    display: flex;
                        `;
var  UsersObj=[];
export async function getStaticProps(context) {
    // fetch the users data from the  API
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await res.json();
    
    return {
        props: { data} // props will be passed to the page
    };    
  }
const userslist = ({data}) => {

    const [toggleObj, setToggleObj] = useState([]);
    const [usersDataAfterFilter, setUsersDataAfterFilter] = useState([]);
    const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
    if (inputText.length > 0) {
        var obj = data.filter(currentObj =>{
            console.log('currentObj.username',currentObj.username.toLowerCase(),lowerCase)
            return currentObj.username.toLowerCase().includes(lowerCase) || currentObj.email.toLowerCase().includes(lowerCase);
          });
        console.log('obj',obj);
        setUsersDataAfterFilter(obj);
  };
}

  
    const toggleClick = (e,userId)=>{
        console.log('Hello ',userId);
        if(toggleObj[userId]){
            toggleObj[userId]=false;
        } else if(toggleObj[userId]===false){
            toggleObj[userId]=true;
        }else{
            toggleObj[userId]=true;
        }
        setToggleObj([...toggleObj,toggleObj[userId]]);``
        

    };
    console.log('usersDataAfterFilter',usersDataAfterFilter);
    if(!usersDataAfterFilter.length){
        setUsersDataAfterFilter(data);
    }
    return (<>
    <div>
    
        <div style={{width:"100%"}}>
            <h1 className="falcone">Users List</h1>
           <div className='userslist'>
           <input type="text" className='searchTerm' placeholder='search by username or email'  onChange={inputHandler}/>
           <div>
           {usersDataAfterFilter.map((currentObj,i) => (
                <div style={{'marginBottom':'3px'}} key={i} onClick={(e) => toggleClick(e,currentObj.id)}><b>{currentObj.name}</b><span style={{'marginLeft':'3px','color':'blue'}}>@{currentObj.username}</span>
                <br/>
               {toggleObj[currentObj.id]?(
                <div>Email: {currentObj.email}<br/>

                    Phone No:{currentObj.phone}<br/>
                    Website:{currentObj.website}
                </div>
                ):''}
                </div>
                ))}
            </div>
           </div>
        </div>
    

        </div>
        </>
    );
};

export default userslist;