import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Recipe from './Recipe';

import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';

function App() {
  const APP_ID = process.env.REACT_APP_Recipe_Id;
  const APP_KEY = process.env.REACT_APP_Recipe_Key;

  const [recipes,setRecipes] = useState([]);  //Storing the api data in this state
  const [inpvalue,setInpValue] = useState('')
  const [query,setQuery] = useState('')
  
  useEffect(()=>{
    getRecipe();
  },[query])

  const getRecipe = async ()=>{
    const response  = await axios.get(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    setRecipes(response.data.hits);
  }

  const updateinp = (e) => {
    setInpValue(e.target.value)
  }

  const submitQuery = (e) =>{
    e.preventDefault();
    setQuery(inpvalue);
  }

  return (
  <>
    <div className='main-container'>

    <center style = {{marginTop:20}}>
     <Paper
     
      onSubmit={submitQuery}
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400  }}
      >
     
      <InputBase
        type = "text" 
        value={inpvalue}
        onChange = {updateinp}
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Recipe"
        inputProps={{ 'aria-label': 'search Recipe' }}
      />
      <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    
      </Paper>
   </center>
     
     {/*------  Mapping the recipies -----------*/}

    <div style = {{margin:"10px"}}>

      <Grid container spacing={3}>
        {recipes.map((recipe)=>(
         <Grid item xs = {3}>
         <Recipe 
         key = {recipe.recipe.label}
         title = {recipe.recipe.label} 
          calories = {recipe.recipe.calories} 
          image = {recipe.recipe.image} 
          ingredients = {recipe.recipe.ingredients}
         />
         </Grid>
       
        ))}
      </Grid>
      </div>

     
      </div>
    </>
  );
}

export default App;
