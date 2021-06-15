import React from 'react';
import {data} from '../data'
import NavBar from './NavBar'
import MovieCard from './MovieCard'
import {addMovies,setShowFavourites} from '../actions/index'
import { movies } from '../reducers';

class App extends React.Component { 
  componentDidMount (){
    // make api call
    // dispatch a action
    const {store} = this.props;

    store.subscribe(()=>{
      console.log("UPDATED");
      this.forceUpdate();
    })
    this.props.store.dispatch(addMovies(data));

    console.log("State",this.props.store.getState())
  }
  isMovieFavourite = (movie) =>{
    const {movies} = this.props.store.getState(); //{movies:{},search{}}
    const index = movies.favourites.indexOf(movie);

    if(index!=-1){
      // Found the movie
      return true;
    }

    return false;
  }
  onChangeTab = (val) =>{
    this.props.store.dispatch(setShowFavourites(val))
  }
  render(){
    const{movies} = this.props.store.getState(); //{movies:{},search{}}
    const {list,favourites,showFavourites} = movies;
    console.log("Rendered" , this.props.store.getState());

    const displayMovies  = showFavourites?favourites:list;
    return (
      <div className="App">
        <NavBar />
        <div className ="main">
          <div className="tabs">
              <div className={`tab ${showFavourites?'':'active-tab'}`} onClick={()=>this.onChangeTab(false)}>Movies</div>
              <div className={`tab ${showFavourites?'active-tab':''}`} onClick = {()=>this.onChangeTab(true)}>Favourites</div>
          </div>
          <div className="list">
            {displayMovies.map((movie,index) =>(
            <MovieCard movie={movie}
             key={`movies-${index}`}
             dispatch={this.props.store.dispatch} 
              isFavourite = {this.isMovieFavourite(movie)} 
              />
            ))}
          </div>
          {
            displayMovies.length == 0?<div className="no-movies">No Movies to show..</div>:null
          }
        </div>
      </div>
    );
   }
}

export default App;
